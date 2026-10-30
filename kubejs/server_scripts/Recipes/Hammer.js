ServerEvents.recipes(event => {
    event.recipes.cwi.block_conversion()
        .input('minecraft:smooth_basalt')
        .requireStage(1)
        .drops([])
        .id('cwi:hammer/block/minecraft/smooth_basalt')
        .target('kubejs:cobbled_basalt')

    event.recipes.cwi.block_conversion()
        .input('minecraft:obsidian')
        .requireStage(1)
        .drops([])
        .id('cwi:hammer/block/minecraft/obsidian')
        .target('minecraft:obsidian')

    Object.values(global.stoneTypes).forEach(stone => {
        const it = stone.items
        event.recipes.cwi.block_conversion()
            .input(it.block)
            .requireStage(1)
            .drops([])
            .id('cwi:hammer/block/' + it.block.replace(':', '/'))
            .target(it.cobblestone)

        event.recipes.cwi.block_conversion()
            .input(it.cobblestone)
            .requireStage(1)
            .drops([])
            .id('cwi:hammer/block/' + it.cobblestone.replace(':', '/'))
            .target(it.gravel)

        event.recipes.cwi.block_conversion()
            .input(it.gravel)
            .requireStage(1)
            .drops([
                { item: it.powder, chance: 0.75, count: 4 }
            ])
            .id('cwi:hammer/block/' + it.gravel.replace(':', '/'))
    })

    global.oreTypes.forEach(([oreVariants, dropOreId, crushedOreId, powderOreId, isMore]) => {
        const dropCounts = isMore ? 3 : 2
        Object.values(global.variantSettings).forEach(ore => {
            if (oreVariants[ore.type]) {
                event.recipes.cwi.block_conversion()
                    .input(oreVariants[ore.type])
                    .requireStage(1)
                    .drops([
                        { item: dropOreId, chance: 1, count: dropCounts },
                        { item: dropOreId, chance: ore.dropChance, count: 1 }
                    ])
                    .id('cwi:hammer/block/' + oreVariants[ore.type].replace(':', '/'))
                    .target(ore.cobble)
            }
        })
    })

    event.recipes.cwi.block_conversion()
        .input('kubejs:dark_ash_stone')
        .requireStage(1)
        .drops([
            { item: 'kubejs:dark_ash', chance: 0.75, count: 4 }
        ])
        .id('cwi:hammer/block/kubejs/dark_ash_stone')

    event.recipes.cwi.block_conversion()
        .input('kubejs:ash_stone')
        .requireStage(1)
        .drops([
            { item: 'kubejs:ash', chance: 0.75, count: 4 }
        ])
        .id('cwi:hammer/block/kubejs/ash_stone')

    event.recipes.cwi.block_conversion()
        .input('kubejs:dark_ash_stone_quartz')
        .requireStage(1)
        .drops([
            { item: 'kubejs:dark_ash', chance: 0.75, count: 3 },
            { item: 'minecraft:quartz', chance: 0.65, count: 2 },
            { item: 'kubejs:quartz_powder', chance: 0.35, count: 2 }
        ])
        .id('cwi:hammer/block/kubejs/dark_ash_stone_quartz')

    event.recipes.cwi.block_conversion()
        .input('kubejs:dark_ash_stone_coal')
        .requireStage(1)
        .drops([
            { item: 'kubejs:dark_ash', chance: 0.75, count: 3 },
            { item: 'minecraft:coal', chance: 0.65, count: 2 },
            { item: 'kubejs:coal_powder', chance: 0.35, count: 2 }
        ])
        .id('cwi:hammer/block/kubejs/dark_ash_stone_coal')

    event.recipes.cwi.block_conversion()
        .input('kubejs:scrap_block')
        .requireStage(1)
        .drops([
            { item: 'tfmg:screw', chance: 0.45, count: 2 },
            { item: 'kubejs:ash', chance: 0.5, count: 3 },
            { item: 'kubejs:rubber', chance: 0.75, count: 3 },
            { item: 'tfmg:synthetic_string', chance: 0.75, count: 3 },
            { item: 'tfmg:synthetic_leather', chance: 0.45, count: 2 }
        ])
        .id('cwi:hammer/block/kubejs/scrap_block')
        .target('kubejs:small_scrap_block')

    event.recipes.cwi.block_conversion()
        .input('kubejs:small_scrap_block')
        .requireStage(1)
        .drops([
            { item: 'kubejs:rusted_iron_rod', chance: 0.3, count: 1 },
            { item: 'kubejs:rusted_iron_wire', chance: 0.3, count: 1 },
            { item: 'kubejs:rusted_iron_ingot', chance: 0.3, count: 1 },
            { item: 'kubejs:rusted_iron_sheet', chance: 0.3, count: 1 },
            { item: 'tfmg:rebar', chance: 0.25, count: 3 },
            { item: 'kubejs:ash', chance: 0.5, count: 2 }
        ])
        .id('cwi:hammer/block/kubejs/small_scrap_block')

    event.recipes.cwi.depot_conversion('create:crushed_raw_iron', 'minecraft:raw_iron')
        .requireStage(3)
        .id('cwi:hammer/depot/minecraft/raw_iron')

    event.recipes.cwi.depot_conversion('create:crushed_raw_gold', 'minecraft:raw_gold')
        .requireStage(3)
        .id('cwi:hammer/depot/minecraft/raw_gold')

    event.recipes.cwi.depot_conversion('create:crushed_raw_nickel', 'tfmg:raw_nickel')
        .requireStage(3)
        .id('cwi:hammer/depot/tfmg/raw_nickel')

    event.recipes.cwi.depot_conversion('create:crushed_raw_copper', 'minecraft:raw_copper')
        .requireStage(2)
        .id('cwi:hammer/depot/minecraft/raw_copper')

    event.recipes.cwi.depot_conversion('kubejs:crushed_raw_silver', 'kubejs:raw_silver')
        .requireStage(2)
        .id('cwi:hammer/depot/kubejs/raw_silver')

    event.recipes.cwi.depot_conversion('create:crushed_raw_lead', 'tfmg:raw_lead')
        .requireStage(2)
        .id('cwi:hammer/depot/tfmg/raw_lead')

    event.recipes.cwi.depot_conversion('tfmg:crushed_raw_lithium', 'tfmg:raw_lithium')
        .requireStage(1)
        .id('cwi:hammer/depot/tfmg/raw_lithium')

    event.recipes.cwi.depot_conversion('create:crushed_raw_zinc', 'create:raw_zinc')
        .requireStage(1)
        .id('cwi:hammer/depot/create/raw_zinc')

    event.recipes.cwi.depot_conversion('kubejs:crushed_raw_tin', 'kubejs:raw_tin')
        .requireStage(1)
        .id('cwi:hammer/depot/kubejs/raw_tin')
})
