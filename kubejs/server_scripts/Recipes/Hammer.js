ServerEvents.recipes(event => {
    const addBlockConversion = (input, target, stage, drops) => {
        const recipe = event.recipes.cwi.block_conversion()
            .input(input)
            .requireStage(stage || 1)
            .drops(drops || [])
            .id('cwi:hammer/block/' + input.replace(':', '/'))

        if (target !== 'air') recipe.target(target)
    }

    const addDepotConversion = (input, target, stage) => {
        event.recipes.cwi.depot_conversion(target, input)
            .requireStage(stage || 1)
            .id('cwi:hammer/depot/' + input.replace(':', '/'))
    }

    addBlockConversion('minecraft:smooth_basalt', 'kubejs:cobbled_basalt')
    addBlockConversion('minecraft:obsidian', 'minecraft:obsidian')

    Object.values(global.stoneTypes).forEach(stone => {
        const it = stone.items
        addBlockConversion(it.block, it.cobblestone)
        addBlockConversion(it.cobblestone, it.gravel)
        addBlockConversion(it.gravel, 'air', 1, [
            { item: it.powder, chance: 0.75, count: 4 }
        ])
    })

    global.oreTypes.forEach(([oreVariants, dropOreId, crushedOreId, powderOreId, isMore]) => {
        const dropCounts = isMore ? 3 : 2
        Object.values(global.variantSettings).forEach(ore => {
            if (oreVariants[ore.type]) {
                addBlockConversion(oreVariants[ore.type], ore.cobble, 1, [
                    { item: dropOreId, chance: 1, count: dropCounts },
                    { item: dropOreId, chance: ore.dropChance, count: 1 }
                ])
            }
        })
    })

    addBlockConversion('kubejs:dark_ash_stone', 'air', 1, [
        { item: 'kubejs:dark_ash', chance: 0.75, count: 4 }
    ])

    addBlockConversion('kubejs:ash_stone', 'air', 1, [
        { item: 'kubejs:ash', chance: 0.75, count: 4 }
    ])

    addBlockConversion('kubejs:dark_ash_stone_quartz', 'air', 1, [
        { item: 'kubejs:dark_ash', chance: 0.75, count: 3 },
        { item: 'minecraft:quartz', chance: 0.65, count: 2 },
        { item: 'kubejs:quartz_powder', chance: 0.35, count: 2 }
    ])

    addBlockConversion('kubejs:dark_ash_stone_coal', 'air', 1, [
        { item: 'kubejs:dark_ash', chance: 0.75, count: 3 },
        { item: 'minecraft:coal', chance: 0.65, count: 2 },
        { item: 'kubejs:coal_powder', chance: 0.35, count: 2 }
    ])

    addBlockConversion('kubejs:scrap_block', 'kubejs:small_scrap_block', 1, [
        { item: 'tfmg:screw', chance: 0.45, count: 2 },
        { item: 'kubejs:ash', chance: 0.5, count: 3 },
        { item: 'kubejs:rubber', chance: 0.75, count: 3 },
        { item: 'tfmg:synthetic_string', chance: 0.75, count: 3 },
        { item: 'tfmg:synthetic_leather', chance: 0.45, count: 2 }
    ])

    addBlockConversion('kubejs:small_scrap_block', 'air', 1, [
        { item: 'kubejs:rusted_iron_rod', chance: 0.3, count: 1 },
        { item: 'kubejs:rusted_iron_wire', chance: 0.3, count: 1 },
        { item: 'kubejs:rusted_iron_ingot', chance: 0.3, count: 1 },
        { item: 'kubejs:rusted_iron_sheet', chance: 0.3, count: 1 },
        { item: 'tfmg:rebar', chance: 0.25, count: 3 },
        { item: 'kubejs:ash', chance: 0.5, count: 2 }
    ])

    addDepotConversion('minecraft:raw_iron', 'create:crushed_raw_iron', 3)
    addDepotConversion('minecraft:raw_gold', 'create:crushed_raw_gold', 3)
    addDepotConversion('tfmg:raw_nickel', 'create:crushed_raw_nickel', 3)
    addDepotConversion('minecraft:raw_copper', 'create:crushed_raw_copper', 2)
    addDepotConversion('kubejs:raw_silver', 'kubejs:crushed_raw_silver', 2)
    addDepotConversion('tfmg:raw_lead', 'create:crushed_raw_lead', 2)
    addDepotConversion('tfmg:raw_lithium', 'tfmg:crushed_raw_lithium', 1)
    addDepotConversion('create:raw_zinc', 'create:crushed_raw_zinc', 1)
    addDepotConversion('kubejs:raw_tin', 'kubejs:crushed_raw_tin', 1)
})
