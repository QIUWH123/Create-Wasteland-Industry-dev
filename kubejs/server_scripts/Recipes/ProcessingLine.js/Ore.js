ServerEvents.recipes(event => {

// Native Processing Outputs Preserve The Existing Chances Above One
    const ProcessingOutput = Java.loadClass('com.simibubi.create.content.processing.recipe.ProcessingOutput')
    const processing = global.oreProcessing

    // Process Each Configured Ore.
    Object.values(global.compoundOreTypes).forEach(ore => {
        if (!ore.process) return
        const id = ore.id
        if (!global.productionMaps || !global.productionMaps[id]) return
        const map = global.productionMaps[id]

        const main = map.main
        const by = map.by || []
        const sulfur = map.sulfur
        const canLeach = map.leachable
        const hostRocks = map.hostRocks || []

        // Build Recipe IDs.
        const oreBlock = `${ore.mod}:${ore.realId}`
        const crushed = `kubejs:crushed_${id}`
        const powder = `kubejs:${id}_powder`
        const tailings = `kubejs:${id}_tailings`
        const stubborn = `kubejs:stubborn_${id}_tailings`
        const leachRes = `kubejs:leach_${id}_residue`
        const leachSol = `kubejs:leach_${id}_solution`
        const purifiedSol = `kubejs:purified_${id}_solution`
        const refinedMain = `kubejs:refined_${main}`

        // Resolve Material Outputs.
        const mainPowder = getMaterial(main, 'powder')
        const mainNugget = getMaterial(main, 'nugget')
        const mainCrystal = `kubejs:${main}_crystal`

        // Primary Crushing.
        let crushOut = [
            Item.of(crushed, processing.powderCount),
            CreateItem.of(Item.of(crushed, 1), processing.extraPowderChance)
        ]
        hostRocks.forEach(([rock, chance]) => {
            let rockPowder = getStone(rock, 'powder')
            if (rockPowder) crushOut.push(CreateItem.of(Item.of(rockPowder), chance))
        })
        event.recipes.create.crushing(crushOut, oreBlock)

        // Primary Milling.
        let millOutOre = [
            Item.of(powder, processing.powderCount),
            CreateItem.of(Item.of(powder, 1), processing.extraPowderChance)
        ]
        hostRocks.forEach(([rock, chance]) => {
            let rockPowder = getStone(rock, 'powder')
            if (rockPowder) millOutOre.push(CreateItem.of(Item.of(rockPowder), chance))
        })
        event.recipes.create.milling(millOutOre, oreBlock)

        // Crushed Ore Milling.
        event.recipes.create.milling(
            [Item.of(powder, 1)],
            crushed
        ).processingTime(80)

        // Advanced Crushing Placeholder.
        // TODO

        // Tailings Regrinding.
        event.recipes.create.milling(
            [CreateItem.of(Item.of(powder), processing.regrindingChance)],
            stubborn
        ).processingTime(200)

        // Vibrating Separation.
        let vibOut = [
            CreateItem.of(Item.of(refinedMain), processing.vibratingChance),
            CreateItem.of(Item.of(tailings), 1.0)
        ]
        if (sulfur) vibOut.push(CreateItem.of(Item.of('kubejs:sulfur_powder'), processing.vibratingChance))
        by.forEach(([metal, chance]) => vibOut.push(CreateItem.of(Item.of(`kubejs:refined_${metal}`), chance)))

        // Select The Most Likely Host-Rock Powder.
        if (hostRocks.length > 0) {
            let best = hostRocks.reduce((prev, curr) => {
                return curr[1] > prev[1] ? curr : prev
            })
            let rockPowder = getStone(best[0], 'powder')
            if (rockPowder) vibOut.push(CreateItem.of(Item.of(rockPowder), best[1] * 0.9))
        }
        event.recipes.vintageimprovements.vibrating(vibOut, powder).processingTime(120)

        // Advanced Centrifuging.
        let centOut = [
            CreateItem.of(Item.of(refinedMain), processing.centrifugingChance),
            CreateItem.of(Item.of(tailings), 1.0)
        ]
        if (sulfur) centOut.push(CreateItem.of(Item.of('kubejs:sulfur_powder'), processing.centrifugingChance))
        by.forEach(([metal, chance]) => centOut.push(CreateItem.of(Item.of(`kubejs:refined_${metal}`), chance * 1.4)))

        if (hostRocks.length > 0) {
            let best = hostRocks.reduce((prev, curr) => {
                return curr[1] > prev[1] ? curr : prev
            })
            let rockPowder = getStone(best[0], 'powder')
        // Preserve Authored Host Rock Chances Above One Without Wrapper Clamping
            if (rockPowder) centOut.push(new ProcessingOutput(Item.of(rockPowder), best[1] * 1.3))
        }
        event.recipes.vintageimprovements.centrifugation(centOut, [powder]).processingTime(200)

        // Flotation.
        let flotationOut = [
            CreateItem.of(Item.of(refinedMain), processing.flotationChance),
            CreateItem.of(Item.of(stubborn), 1.0)
        ]
        by.forEach(([metal, chance]) => flotationOut.push(CreateItem.of(Item.of(`kubejs:refined_${metal}`), chance)))
        event.recipes.tfmg.vat_machine_recipe(
            flotationOut,
            [
                tailings,
                Fluid.sizedIngredientOf('#cwi:water', 250),
                'kubejs:flotation_reagent'
            ]
        ).machines(['tfmg:mixing']).allowedVatTypes(['tfmg:steel']).minSize(1).processingTime(150)

        if (!canLeach) return

        // Simple Air Leaching.
        if (event.recipes.cwi && typeof event.recipes.cwi.corroding === 'function') {
            event.recipes.cwi.corroding(
                [
                    CreateItem.of(Item.of(mainPowder), 0.32),
                    CreateItem.of(Item.of(mainNugget), 0.10)
                ],
                [powder]
            )
        }

        // Formal Leaching.
        // Powder Leaching.
        event.recipes.tfmg.vat_machine_recipe([Fluid.of(leachSol, 100), CreateItem.of(Item.of(leachRes), 1.0)], [powder, Fluid.of('kubejs:sulfuric_acid', 250)]).machines(['tfmg:mixing']).allowedVatTypes(['tfmg:steel']).minSize(1).processingTime(200).heatLevel(2)
        // Stubborn Tailings Leaching.
        event.recipes.tfmg.vat_machine_recipe([Fluid.of(leachSol, 80), CreateItem.of(Item.of(leachRes), 1.0)], [stubborn, Fluid.of('kubejs:sulfuric_acid', 300)]).machines(['tfmg:mixing']).allowedVatTypes(['tfmg:steel']).minSize(1).processingTime(300).heatLevel(2)

        // Leach Residue Washing.
        event.recipes.create.splashing(
            [
                CreateItem.of(Item.of('kubejs:silicate_residue'), 0.37),
                CreateItem.of(Item.of(mainPowder), 0.63),
                CreateItem.of(Item.of('kubejs:washing_residue'), 0.05)
            ],
            leachRes
        )

        // Solution Purification.
        event.recipes.tfmg.vat_machine_recipe(
            [
                Fluid.of(purifiedSol, 90),
                CreateItem.of(Item.of('kubejs:washing_residue'), 0.05)
            ],
            [Fluid.of(leachSol, 100), Fluid.sizedIngredientOf('#cwi:water', 50)]
        ).machines([]).allowedVatTypes(['tfmg:steel']).minSize(1).processingTime(120)

        // Main And Byproduct Crystallization.
        let crystalOut = [
            CreateItem.of(Item.of(mainCrystal), 0.95)
        ]
        by.forEach(([metal, chance]) => {
            crystalOut.push(CreateItem.of(Item.of(`kubejs:${metal}_crystal`), chance * 0.9))
        })
        event.recipes.tfmg.vat_machine_recipe(crystalOut, [Fluid.of(purifiedSol, 90), 'kubejs:precipitant']).machines([]).allowedVatTypes(['tfmg:steel']).minSize(1).processingTime(160)

        // Electrolytic Refining Placeholder.
        // TODO
    })
})

ServerEvents.recipes(event => {

    global.outPutMaterial.forEach(([material, canProcess]) => {
        if (!canProcess) return
        event.smelting(getMaterial(material, 'ingot'), `kubejs:refined_${material}`)
        event.blasting(getMaterial(material, 'ingot'), `kubejs:refined_${material}`)
        event.smelting(getMaterial(material, 'ingot'), `kubejs:${material}_crystal`)
        event.blasting(getMaterial(material, 'ingot'), `kubejs:${material}_crystal`)
    })

    event.recipes.create.crushing(['2x kubejs:lignite_item', CreateItem.of(Item.of('kubejs:lignite_item'), 0.75), CreateItem.of(Item.of('kubejs:claystone_powder'), 0.63), CreateItem.of(Item.of('kubejs:shale_powder'), 0.37)], 'tfmg:lignite')
    event.recipes.create.milling(['2x kubejs:lignite_powder', CreateItem.of(Item.of('kubejs:lignite_powder'), 0.75), CreateItem.of(Item.of('kubejs:claystone_powder'), 0.63), CreateItem.of(Item.of('kubejs:shale_powder'), 0.37)], 'tfmg:lignite')
    event.recipes.create.crushing(['2x kubejs:halite_item', CreateItem.of(Item.of('kubejs:halite_item'), 0.75), CreateItem.of(Item.of('kubejs:calcite_powder'), 0.73), CreateItem.of(Item.of('kubejs:shale_powder'), 0.27)], 'kubejs:halite')
    event.recipes.create.milling(['2x kubejs:halite_powder', CreateItem.of(Item.of('kubejs:halite_powder'), 0.75), CreateItem.of(Item.of('kubejs:calcite_powder'), 0.73), CreateItem.of(Item.of('kubejs:shale_powder'), 0.27)], 'kubejs:halite')
})
