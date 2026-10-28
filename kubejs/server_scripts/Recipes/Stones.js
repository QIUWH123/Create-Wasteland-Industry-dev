ServerEvents.recipes(event => {


// Stones processing

    event.recipes.create.crushing(['minecraft:cobbled_deepslate', CreateItem.of(Item.of('kubejs:quartzite_powder'), 0.75)], 'kubejs:quartzite_deepslate')
    event.recipes.create.milling(['3x kubejs:deepslate_powder', CreateItem.of(Item.of('kubejs:deepslate_powder'), 0.75), CreateItem.of(Item.of('kubejs:quartzite_powder'), 0.75)], 'kubejs:quartzite_deepslate')
    event.recipes.create.milling(['3x kubejs:tuff_powder', CreateItem.of(Item.of('kubejs:tuff_powder'), 0.75)], 'minecraft:tuff')
    event.recipes.create.milling(['3x kubejs:calcite_powder', CreateItem.of(Item.of('kubejs:calcite_powder'), 0.75)], 'minecraft:calcite')
    event.recipes.create.milling(['3x kubejs:limestone_powder', CreateItem.of(Item.of('kubejs:limestone_powder'), 0.75)], 'create:limestone')
    event.recipes.create.crushing('kubejs:cobbled_basalt', 'minecraft:smooth_basalt')
    event.recipes.create.milling(['3x kubejs:basalt_powder', CreateItem.of(Item.of('kubejs:basalt_powder'), 0.75)], 'minecraft:smooth_basalt')
    event.recipes.create.milling(CreateItem.of(Item.of('kubejs:stone_powder'), 0.95), 'kubejs:pebbles')

    Object.values(global.stoneTypes).forEach(entry => {
        const { block: raw, cobblestone: cobbled, gravel, powder: dust } = entry.items
        event.recipes.create.crushing(cobbled, raw)
        event.recipes.create.crushing(gravel, cobbled)
        const dustOutputs = [`3x ${dust}`, CreateItem.of(Item.of(dust), 0.75)]
        event.recipes.create.milling(dustOutputs, raw)
        event.recipes.create.milling(dustOutputs, cobbled)
        event.recipes.create.milling(dustOutputs, gravel)
        event.recipes.create.compacting(gravel, `4x ${dust}`)
        event.recipes.create.compacting(cobbled, gravel).heated()
        event.recipes.create.compacting(raw, cobbled).superheated()
    })

// Recipes

    event.shapeless(
        Item.of('kubejs:granite_powder', 3),
        [
            '2x kubejs:diorite_powder',
            '2x kubejs:quartz_powder'
        ]
    ).id('cwi:crafting_table/granite_powder_mixing_manual_only')

    event.recipes.create.mixing('2x kubejs:granite_powder', ['kubejs:quartz_powder', 'kubejs:diorite_powder']).processingTime(50)

    event.shapeless(
        Item.of('kubejs:diorite_powder', 3),
        [
            '2x kubejs:stone_powder',
            '2x kubejs:quartz_powder'
        ]
    ).id('cwi:crafting_table/diorite_powder_mixing_manual_only')

    event.recipes.create.mixing('2x kubejs:diorite_powder', ['kubejs:stone_powder', 'kubejs:quartz_powder']).processingTime(50)

    event.shapeless(
        Item.of('kubejs:andesite_powder', 3),
        [
            '2x kubejs:stone_powder',
            '2x kubejs:diorite_powder'
        ]
    ).id('cwi:crafting_table/andesite_powder_mixing_manual_only')

    event.recipes.create.mixing('2x kubejs:andesite_powder', ['kubejs:stone_powder', 'kubejs:diorite_powder']).processingTime(50)

    event.recipes.create.compacting(['kubejs:rhyolite_gravel', CreateItem.of(Item.of('kubejs:rhyolite_powder'), 0.37)], ['kubejs:granite_gravel', 'minecraft:flint', Fluid.of('minecraft:lava', 250)]).superheated()

    event.recipes.create.sequenced_assembly(
        [
            CreateItem.of(Item.of('minecraft:deepslate'), 0.63),
            CreateItem.of(Item.of('minecraft:stone'), 0.37)
        ],
        'minecraft:stone',
        [
            event.recipes.create.pressing('kubejs:compressed_stone', 'kubejs:compressed_stone'),
            event.recipes.create.pressing('kubejs:compressed_stone', 'kubejs:compressed_stone'),
            event.recipes.create.pressing('kubejs:compressed_stone', 'kubejs:compressed_stone'),
        ]
    )
    .transitionalItem('kubejs:compressed_stone')
    .loops(3)

})
