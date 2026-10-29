// Steel Refining Abstracts Air Or Oxygen Blowing, Limestone Flux And A Final Silicon Trim Into One Batch; Off-Gas Is Vented.
ServerEvents.recipes(event => {
    const blastFurnaceRecipes = [
        {
            id: 'cwi:industrial_blasting/quartz_to_silicon',
            duration: 300,
            heat: 'superheated',
            inputs: [{ item: 'minecraft:quartz' }],
            outputs: [{ fluid: 'kubejs:liquid_silicon', amount: 90 }]
        },
        {
            id: 'cwi:industrial_blasting/quartz_powder_to_silicon',
            duration: 200,
            heat: 'superheated',
            inputs: [{ item: 'kubejs:quartz_powder' }],
            outputs: [{ fluid: 'kubejs:liquid_silicon', amount: 90 }]
        },
        {
            id: 'cwi:industrial_blasting/magnetite_to_pig_iron',
            duration: 500,
            heat: 'superheated',
            inputs: [
                { item: 'kubejs:magnetite' },
                { item: 'kubejs:limestone_powder' },
                { item: 'tfmg:coal_coke_dust' }
            ],
            outputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 180 },
                { fluid: 'kubejs:molten_slag', amount: 200 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/iron_powder_to_pig_iron',
            duration: 300,
            heat: 'superheated',
            inputs: [
                { item: 'kubejs:iron_powder' },
                { item: 'kubejs:limestone_powder' },
                { item: 'tfmg:coal_coke_dust' }
            ],
            outputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 90 },
                { fluid: 'kubejs:molten_slag', amount: 20 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/iron_ingot_to_pig_iron',
            duration: 300,
            heat: 'superheated',
            inputs: [
                { item: 'minecraft:iron_ingot' },
                { item: 'kubejs:limestone_powder' },
                { item: 'tfmg:coal_coke_dust' }
            ],
            outputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 90 },
                { fluid: 'kubejs:molten_slag', amount: 20 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/crushed_iron_to_pig_iron',
            duration: 300,
            heat: 'superheated',
            inputs: [
                { item: 'create:crushed_raw_iron' },
                { item: 'kubejs:limestone_powder' },
                { item: 'tfmg:coal_coke_dust' }
            ],
            outputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 120 },
                { fluid: 'kubejs:molten_slag', amount: 100 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/raw_iron_to_pig_iron',
            duration: 300,
            heat: 'superheated',
            inputs: [
                { item: 'minecraft:raw_iron' },
                { item: 'kubejs:limestone_powder' },
                { item: 'tfmg:coal_coke_dust' }
            ],
            outputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 120 },
                { fluid: 'kubejs:molten_slag', amount: 200 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/hematite_to_pig_iron',
            duration: 400,
            heat: 'superheated',
            inputs: [
                { item: 'create:crimsite' },
                { item: 'kubejs:limestone_powder' },
                { item: 'tfmg:coal_coke_dust' }
            ],
            outputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 180 },
                { fluid: 'kubejs:molten_slag', amount: 200 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/pig_iron_to_steel_air',
            duration: 600,
            heat: 'superheated',
            inputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 900 },
                { item: 'kubejs:limestone_powder' },
                { fluid: 'tfmg:air', amount: 1500 },
                { fluid: 'kubejs:liquid_silicon', amount: 5 }
            ],
            outputs: [
                { fluid: 'kubejs:molten_steel', amount: 810 },
                { fluid: 'kubejs:molten_slag', amount: 180 }
            ]
        },
        {
            id: 'cwi:industrial_blasting/pig_iron_to_steel_oxygen',
            duration: 400,
            heat: 'superheated',
            inputs: [
                { fluid: 'kubejs:molten_pig_iron', amount: 1800 },
                { item: 'kubejs:limestone_powder' },
                { fluid: 'kubejs:oxygen', amount: 600 },
                { fluid: 'kubejs:liquid_silicon', amount: 10 }
            ],
            outputs: [
                { fluid: 'kubejs:molten_steel', amount: 1710 },
                { fluid: 'kubejs:molten_slag', amount: 180 }
            ]
        }
    ]

    blastFurnaceRecipes.forEach(recipe => {
        event.recipes.cwi.blast_furnace_processing()
            .itemInputs(recipe.inputs.filter(entry => entry.item).map(entry => ({ ingredient: entry.item, count: entry.count || 1 })))
            .fluidInputs(recipe.inputs.filter(entry => entry.fluid).map(entry => Fluid.of(entry.fluid, entry.amount)))
            .fluidOutputs(recipe.outputs.filter(entry => entry.fluid).map(entry => Fluid.of(entry.fluid, entry.amount)))
            .processingTime(recipe.duration)
            .heatRequirement(recipe.heat)
            .id(`${recipe.id}_${recipe.heat}`)
    })
})
