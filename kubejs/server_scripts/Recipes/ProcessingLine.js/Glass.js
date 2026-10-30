ServerEvents.recipes(event => {
    const hasBiomancy = Platform.isLoaded('biomancy')

    event.recipes.create.mixing(['kubejs:glass_batch', 'kubejs:soda_powder', 'kubejs:limestone_powder'], ['2x minecraft:sand', 'kubejs:soda_powder', 'kubejs:limestone_powder'])
    event.recipes.create.mixing(['kubejs:ion_exchanged_glass_blank', Fluid.of('kubejs:molten_potassium_sodium_nitrate', 100)], ['kubejs:heated_glass', Fluid.of('kubejs:molten_saltpeter', 100)]).processingTime(800)
    if (hasBiomancy) event.recipes.create.mixing(Fluid.of('kubejs:molten_saltpeter', 100), ['biomancy:stone_powder', Fluid.of('kubejs:molten_potassium_sodium_nitrate', 100)]).processingTime(800).heatRequirement('superheated')

    event.smelting('kubejs:sintered_glass_blank', 'kubejs:glass_batch')
    event.blasting('kubejs:sintered_glass_blank', 'kubejs:glass_batch')

    event.smelting('kubejs:heated_glass', 'minecraft:glass')
    event.blasting('kubejs:heated_glass', 'minecraft:glass')

    event.recipes.create.compacting('kubejs:pressed_glass_blank', 'kubejs:sintered_glass_blank')

// Four Glass Powder Portions Reclaim One Blank, Matching The Maximum Powder Yield Of One Glass Block
    event.recipes.create.compacting('kubejs:sintered_glass_blank', '4x kubejs:glass_powder')
        .heated()
        .id('cwi:compacting/glass_blank_from_cullet')

    event.recipes.create.sequenced_assembly(
        [
            CreateItem.of(Item.of('minecraft:glass'), 0.76),
            CreateItem.of(Item.of('kubejs:devitrified_glass'), 0.13),
            CreateItem.of(Item.of('kubejs:cracked_glass'), 0.11)
        ],
        'kubejs:pressed_glass_blank',
        [
            event.recipes.create.filling('kubejs:quenched_glass_blank', ['kubejs:quenched_glass_blank', Fluid.sizedIngredientOf('#cwi:water', 1000)])
        ]
    )
    .transitionalItem('kubejs:quenched_glass_blank')
    .loops(1)

    event.recipes.create.sequenced_assembly(
        [
            CreateItem.of(Item.of('kubejs:tempered_glass'), 0.86),
            CreateItem.of(Item.of('kubejs:devitrified_glass'), 0.09),
            CreateItem.of(Item.of('kubejs:cracked_glass'), 0.05)
        ],
        'kubejs:ion_exchanged_glass_blank',
        [
            event.recipes.create.filling('kubejs:quenched_tempered_glass_blank', ['kubejs:quenched_tempered_glass_blank', Fluid.sizedIngredientOf('#cwi:water', 1000)])
        ]
    )
    .transitionalItem('kubejs:quenched_tempered_glass_blank')
    .loops(1)

    event.recipes.tfmg.vat_machine_recipe([
        'kubejs:ion_exchanged_glass_blank',
        Fluid.of('kubejs:molten_potassium_sodium_nitrate', 100)
    ], [
        'kubejs:heated_glass',
        Fluid.of('kubejs:molten_saltpeter', 100)
    ], 600)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:cast_iron', 'tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

    if (hasBiomancy) {
        event.recipes.tfmg.vat_machine_recipe([
            Fluid.of('kubejs:molten_saltpeter', 100)
        ], [
            Fluid.of('kubejs:molten_potassium_sodium_nitrate', 100),
            'biomancy:stone_powder'
        ], 600)
            .set('min_size', 1)
            .set('allowed_vat_types', ['tfmg:cast_iron', 'tfmg:steel', 'tfmg:fireproof'])
            .set('machines', [])
            .set('heat_level', 3)
    }

    event.recipes.create.milling(['2x kubejs:glass_powder', CreateItem.of(Item.of('kubejs:glass_powder'), 0.75), CreateItem.of(Item.of('kubejs:glass_powder'), 0.25)], 'minecraft:glass')
    event.recipes.create.milling(['2x kubejs:glass_powder', CreateItem.of(Item.of('kubejs:glass_powder'), 0.75), CreateItem.of(Item.of('kubejs:glass_powder'), 0.25)], 'kubejs:tempered_glass')
    event.recipes.create.milling(['2x kubejs:glass_powder', CreateItem.of(Item.of('kubejs:glass_powder'), 0.75), CreateItem.of(Item.of('kubejs:glass_powder'), 0.25)], 'kubejs:cracked_glass')
    event.recipes.create.milling(['2x kubejs:glass_powder', CreateItem.of(Item.of('kubejs:glass_powder'), 0.75), CreateItem.of(Item.of('kubejs:glass_powder'), 0.25)], 'kubejs:devitrified_glass')

})
