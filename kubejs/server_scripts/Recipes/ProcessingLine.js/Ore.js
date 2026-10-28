ServerEvents.recipes(event => {

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
            AddItem(refinedMain, processing.vibratingChance),
            AddItem(tailings, 1.0)
        ]
        if (sulfur) vibOut.push(AddItem('kubejs:sulfur_powder', processing.vibratingChance))
        by.forEach(([metal, chance]) => vibOut.push(AddItem(`kubejs:refined_${metal}`, chance)))

        // Select The Most Likely Host-Rock Powder.
        if (hostRocks.length > 0) {
            let best = hostRocks.reduce((prev, curr) => {
                return curr[1] > prev[1] ? curr : prev
            })
            let rockPowder = getStone(best[0], 'powder')
            if (rockPowder) vibOut.push(AddItem(rockPowder, best[1] * 0.9))
        }
        vibrating(event, AddItem(powder), vibOut, 120)

        // Advanced Centrifuging.
        let centOut = [
            AddItem(refinedMain, processing.centrifugingChance),
            AddItem(tailings, 1.0)
        ]
        if (sulfur) centOut.push(AddItem('kubejs:sulfur_powder', processing.centrifugingChance))
        by.forEach(([metal, chance]) => centOut.push(AddItem(`kubejs:refined_${metal}`, chance * 1.4)))

        if (hostRocks.length > 0) {
            let best = hostRocks.reduce((prev, curr) => {
                return curr[1] > prev[1] ? curr : prev
            })
            let rockPowder = getStone(best[0], 'powder')
            if (rockPowder) centOut.push(AddItem(rockPowder, best[1] * 1.3))
        }
        centrifuging(event, [AddItem(powder)], centOut, 200)

        // Flotation.
        let flotationOut = [
            AddItem(refinedMain, processing.flotationChance),
            AddItem(stubborn, 1.0)
        ]
        by.forEach(([metal, chance]) => flotationOut.push(AddItem(`kubejs:refined_${metal}`, chance)))
        vatRecipe(event, null, ['tfmg:mixing'], ['tfmg:steel_vat'], 1,
            [
                AddItem(tailings),
                AddFluid('250 #cwi:water'),
                AddItem('kubejs:flotation_reagent')
            ],
            flotationOut,
            150
        )

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
        vatRecipe(event, 'heated', ['tfmg:mixing'], ['tfmg:steel_vat'], 1,
            [AddItem(powder), AddFluid('250 kubejs:sulfuric_acid')],
            [AddFluid(`100 ${leachSol}`), AddItem(leachRes, 1.0)],
            200
        )
        // Stubborn Tailings Leaching.
        vatRecipe(event, 'heated', ['tfmg:mixing'], ['tfmg:steel_vat'], 1,
            [AddItem(stubborn), AddFluid('300 kubejs:sulfuric_acid')],
            [AddFluid(`80 ${leachSol}`), AddItem(leachRes, 1.0)],
            300
        )

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
        vatRecipe(event, null, [], ['tfmg:steel_vat'], 1,
            [AddFluid(`100 ${leachSol}`), AddFluid('50 #cwi:water')],
            [
                AddFluid(`90 ${purifiedSol}`),
                AddItem('kubejs:washing_residue', 0.05)
            ],
            120
        )

        // Main And Byproduct Crystallization.
        let crystalOut = [
            AddItem(mainCrystal, 0.95)
        ]
        by.forEach(([metal, chance]) => {
            crystalOut.push(AddItem(`kubejs:${metal}_crystal`, chance * 0.9))
        })
        vatRecipe(event, null, [], ['tfmg:steel_vat'], 1,
            [AddFluid(`90 ${purifiedSol}`), AddItem('kubejs:precipitant')],
            crystalOut,
            160
        )

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
