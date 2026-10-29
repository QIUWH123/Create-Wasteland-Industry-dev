ServerEvents.recipes(event => {
    const mixingVesselRecipes = [
        {
            id: 'cwi:mixing_vessel/sulfur_copper_catalyst',
            duration: 20,
            inputs: [
                { item: 'kubejs:sulfur_powder', count: 2 },
                { item: 'kubejs:copper_powder' }
            ],
            outputs: [{ item: 'kubejs:sulfur_copper_catalyst' }]
        },
        {
            id: 'cwi:mixing_vessel/chlorine_copper_catalyst',
            duration: 20,
            inputs: [
                { item: 'kubejs:copper_powder' },
                { fluid: 'kubejs:chlorine', amount: 250 }
            ],
            outputs: [{ item: 'kubejs:chlorine_copper_catalyst' }]
        },
        {
            id: 'cwi:mixing_vessel/nickel_catalyst_from_powder',
            duration: 20,
            inputs: [
                { item: 'kubejs:caustic_soda_powder', count: 2 },
                { item: 'kubejs:nickel_powder' }
            ],
            outputs: [{ item: 'kubejs:nickel_catalyst' }]
        },
        {
            id: 'cwi:mixing_vessel/nickel_catalyst_from_fluid',
            duration: 20,
            inputs: [
                { item: 'kubejs:nickel_powder' },
                { fluid: 'kubejs:caustic_soda', amount: 250 }
            ],
            outputs: [{ item: 'kubejs:nickel_catalyst' }]
        },
        {
            id: 'cwi:mixing_vessel/caustic_soda_fluid',
            duration: 20,
            inputs: [
                { item: 'kubejs:caustic_soda_powder' },
                { fluid: 'kubejs:distilled_water', amount: 125 }
            ],
            outputs: [{ fluid: 'kubejs:caustic_soda', amount: 125 }]
        },
        {
            id: 'cwi:mixing_vessel/salt_solution_fluid',
            duration: 20,
            inputs: [
                { item: 'ratatouille:salt' },
                { fluid: 'kubejs:distilled_water', amount: 125 }
            ],
            outputs: [{ fluid: 'kubejs:salt_solution', amount: 125 }]
        },
        {
            id: 'cwi:mixing_vessel/raw_brine_fluid_from_water',
            duration: 20,
            inputs: [
                { item: 'kubejs:halite_powder' },
                { fluid: 'minecraft:water', amount: 125 }
            ],
            outputs: [{ fluid: 'kubejs:raw_brine', amount: 125 }]
        },
        {
            id: 'cwi:mixing_vessel/raw_brine_fluid_from_distilled_water',
            duration: 20,
            inputs: [
                { item: 'kubejs:halite_powder' },
                { fluid: 'kubejs:distilled_water', amount: 125 }
            ],
            outputs: [{ fluid: 'kubejs:raw_brine', amount: 125 }]
        },
        {
            id: 'cwi:mixing_vessel/nitrate_solution_fluid',
            duration: 20,
            inputs: [
                { item: 'tfmg:nitrate_dust' },
                { fluid: 'kubejs:distilled_water', amount: 125 }
            ],
            outputs: [{ fluid: 'kubejs:nitrate_solution', amount: 125 }]
        },
        {
            id: 'cwi:mixing_vessel/bioethanol_sugar',
            duration: 20,
            inputs: [
                { item: 'minecraft:sugar' },
                { item: 'createaddition:biomass' },
                { fluid: 'kubejs:distilled_water', amount: 250 }
            ],
            outputs: [{ fluid: 'createaddition:bioethanol', amount: 250 }]
        },
        {
            id: 'cwi:mixing_vessel/bioethanol_syrup',
            duration: 20,
            inputs: [
                { item: 'createaddition:biomass' },
                { fluid: 'kubejs:distilled_water', amount: 125 },
                { fluid: 'kubejs:syrup', amount: 125 }
            ],
            outputs: [{ fluid: 'createaddition:bioethanol', amount: 250 }]
        },
        {
            id: 'cwi:mixing_vessel/biodiesel_fluid',
            duration: 20,
            inputs: [
                { fluid: 'createdieselgenerators:ethanol', amount: 50 },
                { fluid: 'createdieselgenerators:plant_oil', amount: 50 }
            ],
            outputs: [{ fluid: 'createdieselgenerators:biodiesel', amount: 100 }]
        }
    ]

    mixingVesselRecipes.forEach(recipe => {
        event.recipes.cwi.mixing_vessel_mixing()
            .itemInputs(recipe.inputs.filter(entry => entry.item).map(entry => ({ ingredient: entry.item, count: entry.count || 1 })))
            .fluidInputs(recipe.inputs.filter(entry => entry.fluid).map(entry => Fluid.of(entry.fluid, entry.amount)))
            .itemOutputs(recipe.outputs.filter(entry => entry.item))
            .fluidOutputs(recipe.outputs.filter(entry => entry.fluid).map(entry => Fluid.of(entry.fluid, entry.amount)))
            .processingTime(recipe.duration)
            .id(recipe.id)
    })
})
