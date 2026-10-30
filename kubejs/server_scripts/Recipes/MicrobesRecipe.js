// Fermentation Variants Retain Optional-Mod Guards And The Bulk Fermenter's Nine-Slot Limit

function addFermentingRecipes(event, ingredients, results, processingTime, heatRequirement, types) {
    const unavailableMods = ['biomancy', 'geode_plus'].filter(mod => !Platform.isLoaded(mod))
    const ingredientIds = ingredients.map(ingredient => typeof ingredient === 'string' ? ingredient.replace(/^\d+x?\s+/, '') : String(ingredient.id || ''))
    if (ingredientIds.some(id => unavailableMods.some(mod => id.startsWith(mod + ':')))) return
    results = results.filter(result => {
        const id = typeof result === 'string' ? result.replace(/^\d+x?\s+/, '') : String(result.id || '')
        return !unavailableMods.some(mod => id.startsWith(mod + ':'))
    })
    if (results.length === 0) return

    const itemInputCount = ingredients.reduce((count, ingredient) => {
        if (typeof ingredient !== 'string') return count + (ingredient.count || 0)
        const amount = /^(\d+)x?\s+/.exec(ingredient)
        return count + (amount ? Number(amount[1]) : 1)
    }, 0)

    types.forEach(type => {
    // The Bulk Fermenter Has Nine Item Slots, So Larger Recipes Remain In The Basin
        if (type === 'bulk' && itemInputCount > 9) return
        const recipe = event.recipes.createdieselgenerators[type + '_fermenting'](results, ingredients, processingTime)
        if (heatRequirement) recipe.set('heat_requirement', heatRequirement)
    })
}

ServerEvents.recipes(function(event) {
    const buddingNamespace = Platform.isLoaded('cwi') ? 'cwi' : 'kubejs'

// General Recipes
    addFermentingRecipes(event,
        [
            'kubejs:raw_soil',
            'tfmg:nitrate_dust',
            'minecraft:bone_meal',
            '#cwi:basic_materials',
            Fluid.of('kubejs:distilled_water', 250)
        ],
        [
            'minecraft:dirt'
        ],
        600, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:raw_soil',
            Fluid.of('kubejs:nitrate_solution', 125),
            'minecraft:bone_meal',
            '#cwi:basic_materials',
            Fluid.of('kubejs:distilled_water', 125)
        ],
        [
            'minecraft:dirt'
        ],
        600, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:raw_soil',
            Fluid.of('kubejs:nitrogen_fertilizer', 100),
            '#cwi:basic_materials'
        ],
        [
            'minecraft:dirt'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:raw_brine', 500)
        ],
        [
            '3x ratatouille:salt',
            'biomancy:stone_powder'
        ],
        300, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:alkaline_brine', 500)
        ],
        [
            '2x ratatouille:salt',
            'kubejs:soda_powder',
            'biomancy:stone_powder'
        ],
        300, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('minecraft:water', 500)
        ],
        [
            CreateItem.of(Item.of('ratatouille:salt'), 0.13),
            { id: 'biomancy:stone_powder', chance: 0.6 }
        ],
        300, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:steam', 500)
        ],
        [
            Fluid.of('kubejs:distilled_water', 150)
        ],
        1200, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'ratatouille:compost_mass',
            Fluid.of('createdieselgenerators:plant_oil', 100)
        ],
        [
            'ratatouille:compost_residue',
            Fluid.of('ratatouille:bio_gas', 50),
            Fluid.of('ratatouille:compost_tea', 100)
        ],
        2400, undefined, ['basin', 'bulk']
    )

// Bulk Only
    addFermentingRecipes(event,
        [
            '#minecraft:logs'
        ],
        [
            'kubejs:charcoal_powder',
            Fluid.of('kubejs:wood_vinegar', 200),
            Fluid.of('ratatouille:bio_gas', 75)
        ],
        1800, 'heated', ['bulk']
    )

    addFermentingRecipes(event,
        [
            'createdieselgenerators:chip_wood_beam'
        ],
        [
            'kubejs:dark_ash',
            CreateItem.of(Item.of('kubejs:dark_ash'), 0.5),
            Fluid.of('kubejs:wood_vinegar', 60),
            Fluid.of('ratatouille:bio_gas', 30)
        ],
        1200, 'heated', ['bulk']
    )

    addFermentingRecipes(event,
        [
            'createdieselgenerators:chip_wood_block'
        ],
        [
            'kubejs:dark_ash',
            Fluid.of('kubejs:wood_vinegar', 30),
            Fluid.of('ratatouille:bio_gas', 15)
        ],
        900, 'heated', ['bulk']
    )

// Lichen
    addFermentingRecipes(event,
        [
            'kubejs:soaked_depleted_dirt',
            'minecraft:glow_lichen',
            Fluid.of('kubejs:distilled_water', 250)
        ],
        [
            'kubejs:raw_soil',
            'minecraft:glow_lichen'
        ],
        1500, undefined, ['basin', 'bulk']
    )

// Fermento Mycetes
    addFermentingRecipes(event,
        [
            'kubejs:powdered_fermento_mycetes',
            '3x #createdieselgenerators:fermentable',
            Fluid.of('kubejs:syrup', 250),
            Fluid.of('kubejs:distilled_water', 1000)
        ],
        [
            'kubejs:fermento_mycetes'
        ],
        1000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:powdered_fermento_mycetes',
            '3x #createdieselgenerators:fermentable',
            '2x minecraft:sugar',
            Fluid.of('kubejs:distilled_water', 1000)
        ],
        [
            'kubejs:fermento_mycetes'
        ],
        1000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '#createdieselgenerators:fermentable',
            'kubejs:fermento_mycetes',
            Fluid.of('kubejs:distilled_water', 500)
        ],
        [
            Fluid.of('createdieselgenerators:ethanol', 500),
            'kubejs:fermento_mycetes'
        ],
        600, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:syrup', 1),
            'kubejs:fermento_mycetes',
            Fluid.of('kubejs:distilled_water', 5)
        ],
        [
            Fluid.of('createdieselgenerators:ethanol', 5),
            'kubejs:fermento_mycetes'
        ],
        4, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:fermento_mycetes',
            Fluid.of('createdieselgenerators:ethanol', 10)
        ],
        [
            Fluid.of('kubejs:acetic_acid', 10),
            Fluid.of('minecraft:water', 2),
            'kubejs:fermento_mycetes'
        ],
        50, undefined, ['basin', 'bulk']
    )

// Acidolys Bacillus
    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:stone_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.47),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.23),
            { id: 'biomancy:stone_powder', chance: 0.13 },
            'kubejs:acidolys_bacillus'
        ],
        500, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'minecraft:gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.47),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.23),
            { id: 'biomancy:stone_powder', chance: 0.13 },
            'kubejs:acidolys_bacillus'
        ],
        750, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'minecraft:cobblestone'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.47),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.23),
            { id: 'biomancy:stone_powder', chance: 0.13 },
            'kubejs:acidolys_bacillus'
        ],
        1000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:deepslate_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.67),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.33),
            { id: 'biomancy:stone_powder', chance: 0.17 },
            'kubejs:acidolys_bacillus'
        ],
        500, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:deepslate_gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.67),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.33),
            { id: 'biomancy:stone_powder', chance: 0.17 },
            'kubejs:acidolys_bacillus'
        ],
        750, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'minecraft:cobbled_deepslate'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.67),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.33),
            { id: 'biomancy:stone_powder', chance: 0.17 },
            'kubejs:acidolys_bacillus'
        ],
        1000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'minecraft:deepslate'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.67),
            CreateItem.of(Item.of('kubejs:flint_powder'), 0.33),
            { id: 'biomancy:stone_powder', chance: 0.17 },
            'kubejs:acidolys_bacillus'
        ],
        1250, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:schist_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.50),
            { id: 'biomancy:stone_powder', chance: 0.20 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.15),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        650, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:schist_gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.50),
            { id: 'biomancy:stone_powder', chance: 0.20 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.15),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        975, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_schist'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.50),
            { id: 'biomancy:stone_powder', chance: 0.20 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.15),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:schist'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.50),
            { id: 'biomancy:stone_powder', chance: 0.20 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.15),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1625, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:gneiss_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.80),
            { id: 'biomancy:stone_powder', chance: 0.10 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        850, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:gneiss_gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.80),
            { id: 'biomancy:stone_powder', chance: 0.10 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1275, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_gneiss'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.80),
            { id: 'biomancy:stone_powder', chance: 0.10 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1700, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:gneiss'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.80),
            { id: 'biomancy:stone_powder', chance: 0.10 },
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:nickel_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        2125, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:rhyolite_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.90),
            { id: 'biomancy:stone_powder', chance: 0.05 },
            CreateItem.of(Item.of('kubejs:lithium_powder'), 0.05),
            'kubejs:acidolys_bacillus'
        ],
        850, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:rhyolite_gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.90),
            { id: 'biomancy:stone_powder', chance: 0.05 },
            CreateItem.of(Item.of('kubejs:lithium_powder'), 0.05),
            'kubejs:acidolys_bacillus'
        ],
        1275, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_rhyolite'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.90),
            { id: 'biomancy:stone_powder', chance: 0.05 },
            CreateItem.of(Item.of('kubejs:lithium_powder'), 0.05),
            'kubejs:acidolys_bacillus'
        ],
        1700, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:rhyolite'
        ],
        [
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.90),
            { id: 'biomancy:stone_powder', chance: 0.05 },
            CreateItem.of(Item.of('kubejs:lithium_powder'), 0.05),
            'kubejs:acidolys_bacillus'
        ],
        2125, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:shale_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.60),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:sulfur_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        350, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:shale_gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.60),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:sulfur_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        525, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_shale'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.60),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:sulfur_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        700, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:shale'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.60),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:sulfur_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        875, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:conglomerate_powder'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.20),
            'kubejs:acidolys_bacillus'
        ],
        450, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:conglomerate_gravel'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.20),
            'kubejs:acidolys_bacillus'
        ],
        675, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_conglomerate'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.20),
            'kubejs:acidolys_bacillus'
        ],
        900, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:conglomerate'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.20),
            'kubejs:acidolys_bacillus'
        ],
        1125, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:phyllite_powder'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        450, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:phyllite_gravel'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        675, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_phyllite'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        900, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:phyllite'
        ],
        [
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:quartz_powder'), 0.40),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1125, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            '4x kubejs:darkslate_powder'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:copper_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        750, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:darkslate_gravel'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:copper_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1125, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:cobbled_darkslate'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:copper_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1500, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:acidolys_bacillus',
            'kubejs:darkslate'
        ],
        [
            { id: 'biomancy:stone_powder', chance: 0.50 },
            CreateItem.of(Item.of('kubejs:clay_powder'), 0.30),
            CreateItem.of(Item.of('kubejs:iron_powder'), 0.20),
            CreateItem.of(Item.of('kubejs:copper_powder'), 0.10),
            'kubejs:acidolys_bacillus'
        ],
        1875, undefined, ['basin', 'bulk']
    )

// Carbofusor Spirillum
    addFermentingRecipes(event,
        [
            'kubejs:powdered_carbofusor_spirillum',
            '2x kubejs:yeast_paste',
            '6x kubejs:coal_powder',
            Fluid.of('kubejs:syrup', 250),
            Fluid.of('kubejs:distilled_water', 1000)
        ],
        [
            'kubejs:carbofusor_spirillum'
        ],
        3000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:powdered_carbofusor_spirillum',
            '2x kubejs:yeast_paste',
            '6x kubejs:coal_powder',
            '2x minecraft:sugar',
            Fluid.of('kubejs:distilled_water', 1000)
        ],
        [
            'kubejs:carbofusor_spirillum'
        ],
        3000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:carbofusor_spirillum',
            'minecraft:coal',
            Fluid.of('minecraft:water', 100)
        ],
        [
            Fluid.of('tfmg:crude_oil', 50),
            Fluid.of('kubejs:carbon_dioxide', 100),
            'kubejs:carbofusor_spirillum'
        ],
        150, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '4x kubejs:peat',
            'kubejs:carbofusor_spirillum'
        ],
        [
            '2x kubejs:lignite_item',
            CreateItem.of(Item.of('kubejs:lignite_item'), 0.37),
            Fluid.of('kubejs:methane', 50),
            'kubejs:carbofusor_spirillum'
        ],
        1200, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '4x kubejs:peat',
            'minecraft:clay',
            'kubejs:carbofusor_spirillum'
        ],
        [
            '2x kubejs:lignite_item',
            CreateItem.of(Item.of('kubejs:lignite_item'), 0.75),
            Fluid.of('kubejs:humic_acid_slurry', 100),
            'minecraft:clay',
            'kubejs:carbofusor_spirillum'
        ],
        1200, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '4x kubejs:peat',
            '4x minecraft:clay',
            'kubejs:carbofusor_spirillum'
        ],
        [
            '2x kubejs:lignite_item',
            CreateItem.of(Item.of('kubejs:lignite_item'), 0.75),
            Fluid.of('kubejs:humic_acid_slurry', 100),
            'minecraft:clay',
            'kubejs:carbofusor_spirillum'
        ],
        1200, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '4x kubejs:lignite_item',
            'kubejs:carbofusor_spirillum'
        ],
        [
            '2x kubejs:bituminous_coal',
            CreateItem.of(Item.of('kubejs:bituminous_coal'), 0.75),
            'kubejs:carbofusor_spirillum'
        ],
        1200, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '4x kubejs:bituminous_coal',
            'kubejs:carbofusor_spirillum'
        ],
        [
            '2x minecraft:coal',
            CreateItem.of(Item.of('minecraft:coal'), 0.75),
            Fluid.of('kubejs:methane', 100),
            'kubejs:carbofusor_spirillum'
        ],
        1800, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:syngas', 5),
            'kubejs:carbofusor_spirillum',
            'kubejs:iron_catalyst'
        ],
        [
            Fluid.of('kubejs:methanol', 5),
            'kubejs:carbofusor_spirillum',
            'kubejs:iron_catalyst'
        ],
        12, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:syngas', 5),
            'kubejs:carbofusor_spirillum',
            'kubejs:sulfur_copper_catalyst',
            'kubejs:nickel_catalyst'
        ],
        [
            Fluid.of('kubejs:methanol', 5),
            'kubejs:carbofusor_spirillum',
            'kubejs:sulfur_copper_catalyst',
            'kubejs:nickel_catalyst'
        ],
        6, 'heated', ['basin', 'bulk']
    )

// Nitrofix Rhizobium
    addFermentingRecipes(event,
        [
            Fluid.of('minecraft:water', 4),
            'kubejs:nitrofix_rhizobium'
        ],
        [
            Fluid.of('kubejs:ammonia_solution', 1),
            'kubejs:nitrofix_rhizobium'
        ],
        180, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('minecraft:water', 6),
            Fluid.of('kubejs:syrup', 1),
            'kubejs:nitrofix_rhizobium'
        ],
        [
            Fluid.of('kubejs:ammonia_solution', 3),
            Fluid.of('kubejs:carbon_dioxide', 1),
            'kubejs:nitrofix_rhizobium'
        ],
        60, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:ammonia_solution', 1),
            'kubejs:nitrofix_rhizobium'
        ],
        [
            Fluid.of('kubejs:nitrate_solution', 1),
            'kubejs:nitrofix_rhizobium'
        ],
        20, undefined, ['basin', 'bulk']
    )

// Crystallum Coccus
    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:redstone_acid', 1000),
            Fluid.of('kubejs:caustic_soda', 1000),
            'minecraft:budding_amethyst',
            'kubejs:crystallum_coccus'
        ],
        [
            `${buddingNamespace}:infected_budding_amethyst`
        ],
        2400, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:redstone_acid', 1000),
            Fluid.of('kubejs:caustic_soda', 1000),
            'geode_plus:budding_nether_quartz',
            'kubejs:crystallum_coccus'
        ],
        [
            `${buddingNamespace}:infected_budding_quartz`
        ],
        2400, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:amethyst_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'minecraft:amethyst_shard',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:quartz_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'minecraft:quartz',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:lapis_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'minecraft:lapis_lazuli',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:sulfur_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'kubejs:sulfur_item',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'minecraft:redstone',
            'kubejs:crystallum_coccus'
        ],
        [
            'kubejs:redstone',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:fluorite_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'kubejs:fluorite',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:flint_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'minecraft:flint',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.sizedIngredientOf('#cwi:water', 100),
            'kubejs:halite_powder',
            'kubejs:crystallum_coccus'
        ],
        [
            'kubejs:halite_item',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:raw_brine', 125),
            'kubejs:crystallum_coccus'
        ],
        [
            'kubejs:halite_item',
            'kubejs:crystallum_coccus'
        ],
        300, undefined, ['basin', 'bulk']
    )

// Putrelys Sporogenes
    addFermentingRecipes(event,
        [
            'kubejs:powdered_putrelys_sporogenes',
            '2x kubejs:yeast_paste',
            '3x ratatouille:compost_residue',
            Fluid.of('kubejs:syrup', 250),
            Fluid.of('kubejs:distilled_water', 1000)
        ],
        [
            'kubejs:putrelys_sporogenes'
        ],
        3000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:powdered_putrelys_sporogenes',
            '2x kubejs:yeast_paste',
            '3x ratatouille:compost_residue',
            '2x minecraft:sugar',
            Fluid.of('kubejs:distilled_water', 1000)
        ],
        [
            'kubejs:putrelys_sporogenes'
        ],
        3000, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'ratatouille:compost_mass',
            Fluid.of('createdieselgenerators:plant_oil', 100),
            'kubejs:putrelys_sporogenes'
        ],
        [
            'ratatouille:compost_residue',
            Fluid.of('ratatouille:bio_gas', 50),
            Fluid.of('ratatouille:compost_tea', 100),
            'kubejs:putrelys_sporogenes'
        ],
        600, undefined, ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'ratatouille:compost_residue',
            'kubejs:putrelys_sporogenes'
        ],
        [
            'kubejs:peat',
            Fluid.of('ratatouille:bio_gas', 25),
            'kubejs:putrelys_sporogenes'
        ],
        1200, undefined, ['basin', 'bulk']
    )

// Vulcan Thermus
    addFermentingRecipes(event,
        [
            'kubejs:vulcan_thermus',
            Fluid.of('createdieselgenerators:ethanol', 10),
            Fluid.of('kubejs:oxygen', 10)
        ],
        [
            Fluid.of('kubejs:acetic_acid', 10),
            Fluid.of('minecraft:water', 10),
            'kubejs:vulcan_thermus'
        ],
        5, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'minecraft:charcoal',
            Fluid.of('minecraft:water', 100),
            'kubejs:vulcan_thermus'
        ],
        [
            Fluid.of('kubejs:syngas', 100),
            'kubejs:vulcan_thermus'
        ],
        400, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:charcoal_powder',
            Fluid.of('minecraft:water', 100),
            'kubejs:vulcan_thermus'
        ],
        [
            Fluid.of('kubejs:syngas', 100),
            'kubejs:vulcan_thermus'
        ],
        300, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            'kubejs:sulfur_powder',
            Fluid.of('kubejs:oxygen', 100),
            'kubejs:vulcan_thermus'
        ],
        [
            Fluid.of('kubejs:sulfur_dioxide', 100),
            'kubejs:vulcan_thermus'
        ],
        200, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:hydrogen_sulfide', 100),
            Fluid.of('kubejs:oxygen', 150),
            'kubejs:vulcan_thermus'
        ],
        [
            Fluid.of('kubejs:sulfur_dioxide', 100),
            Fluid.of('minecraft:water', 100),
            'kubejs:vulcan_thermus'
        ],
        150, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:raw_brine', 500),
            'kubejs:vulcan_thermus'
        ],
        [
            '4x ratatouille:salt',
            Fluid.of('minecraft:water', 500),
            'kubejs:vulcan_thermus'
        ],
        200, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            Fluid.of('kubejs:alkaline_brine', 500),
            'kubejs:vulcan_thermus'
        ],
        [
            '3x ratatouille:salt',
            'kubejs:soda_powder',
            Fluid.of('minecraft:water', 500),
            'kubejs:vulcan_thermus'
        ],
        200, 'heated', ['basin', 'bulk']
    )
})
