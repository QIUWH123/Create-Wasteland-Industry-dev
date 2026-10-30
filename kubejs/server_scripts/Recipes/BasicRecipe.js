// priority: 5

function addStoragePair(event, bigItem, smallItem, count) {
    const smallStack = count + 'x ' + smallItem
    event.shapeless(Item.of(bigItem), [smallStack])
    event.shapeless(Item.of(smallStack), [bigItem])
}

function slabPair(event, type, block, slab) {
    event.shaped(`6x ${slab}`, ['AAA'], { A: block })
    if (type == 'stone') event.stonecutting(`2x ${slab}`, block)
    if (type == 'wood') event.recipes.create.cutting(`2x ${slab}`, block)
}

ServerEvents.recipes(event => {

    const hasFluid = Platform.isLoaded('fluid')
    const hasGeodePlus = Platform.isLoaded('geode_plus')

    // Deploying
    event.recipes.create.deploying('create:schedule', ['minecraft:paper', 'create:sturdy_sheet'])
    event.recipes.create.deploying('vintageimprovements:recipe_card', ['minecraft:paper', Ingredient.of('#cwi:leathers')])

    // Curving
    event.recipes.vintageimprovements.curving(['kubejs:clay_ingot_mold'], 'kubejs:clay_disk').itemAsHead('minecraft:iron_ingot')
    event.recipes.vintageimprovements.curving(['kubejs:clay_nugget_mold'], 'kubejs:clay_disk').itemAsHead('minecraft:iron_nugget')
    event.recipes.vintageimprovements.curving(['kubejs:clay_sheet_mold'], 'kubejs:clay_disk').itemAsHead('create:iron_sheet')
    event.recipes.vintageimprovements.curving(['kubejs:clay_rod_mold'], 'kubejs:clay_disk').itemAsHead('createaddition:iron_rod')

    // Turning
    event.recipes.vintageimprovements.turning('vintageimprovements:w_shaped_curving_head', 'create:industrial_iron_block')
    event.recipes.vintageimprovements.turning('vintageimprovements:v_shaped_curving_head', 'create:industrial_iron_block')
    event.recipes.vintageimprovements.turning('vintageimprovements:concave_curving_head', 'create:industrial_iron_block')
    event.recipes.vintageimprovements.turning('vintageimprovements:convex_curving_head', 'create:industrial_iron_block')
    event.recipes.vintageimprovements.turning('createdieselgenerators:engine_piston', 'kubejs:industrial_iron_ingot')
    event.recipes.vintageimprovements.turning('kubejs:industrial_iron_blade', 'kubejs:industrial_iron_ingot')
    event.recipes.vintageimprovements.turning('kubejs:industrial_iron_drill_head', 'kubejs:industrial_iron_ingot')
    event.recipes.vintageimprovements.turning('createmetallurgy:sturdy_whisk', 'create:sturdy_sheet')
    event.recipes.vintageimprovements.turning('create:whisk', 'minecraft:iron_ingot')
    event.recipes.vintageimprovements.turning('create:propeller', 'minecraft:iron_ingot')
    event.recipes.vintageimprovements.turning('kubejs:andesite_bearing', 'create:andesite_alloy')
    event.recipes.vintageimprovements.turning('kubejs:fireproof_brick_ingot_mold', 'kubejs:fireproof_brick_disk')
    event.recipes.vintageimprovements.turning('kubejs:fireproof_brick_nugget_mold', 'kubejs:fireproof_brick_disk')
    event.recipes.vintageimprovements.turning('kubejs:fireproof_brick_sheet_mold', 'kubejs:fireproof_brick_disk')
    event.recipes.vintageimprovements.turning('kubejs:fireproof_brick_rod_mold', 'kubejs:fireproof_brick_disk')
    event.recipes.vintageimprovements.turning('kubejs:terracotta_ingot_mold', 'kubejs:terracotta_disk')
    event.recipes.vintageimprovements.turning('kubejs:terracotta_nugget_mold', 'kubejs:terracotta_disk')
    event.recipes.vintageimprovements.turning('kubejs:terracotta_sheet_mold', 'kubejs:terracotta_disk')
    event.recipes.vintageimprovements.turning('kubejs:terracotta_rod_mold', 'kubejs:terracotta_disk')

    // Cutting
    event.recipes.createdieselgenerators.wire_cutting('2x minecraft:stick', 'minecraft:dead_bush')
    event.recipes.createdieselgenerators.wire_cutting(CreateItem.of(Item.of('2x createdieselgenerators:wood_chip'), 0.75), 'stick')

    // Chiseling
    event.recipes.createdieselgenerators.hammering('kubejs:brass_circuit_board', 'create:brass_sheet')
    event.recipes.createdieselgenerators.hammering('minecraft:glass_pane', 'minecraft:glass')

    // Pressing
    event.recipes.create.pressing('2x kubejs:broken_burnt_log', 'kubejs:burnt_log')
    event.recipes.create.pressing('2x kubejs:stripped_broken_burnt_log', 'kubejs:stripped_burnt_log')
    event.recipes.create.pressing('2x kubejs:broken_ash_log', 'kubejs:ash_log')
    event.recipes.create.pressing('2x kubejs:stripped_broken_ash_log', 'kubejs:stripped_ash_log')

    // Item Application
    event.recipes.create.item_application(['create:andesite_casing'], ['createdieselgenerators:chip_wood_block', 'kubejs:andesite_alloy_sheet'])
    event.recipes.create.item_application(['kubejs:sealed_wood'], ['createdieselgenerators:chip_wood_block', Ingredient.of('#cwi:rubbers')])
    event.recipes.create.item_application(['create:copper_casing'], ['kubejs:sealed_wood', 'create:copper_sheet'])
    event.recipes.create.item_application(['create:brass_casing'], ['kubejs:quality_sealed_wood', 'create:brass_sheet'])
    event.recipes.create.item_application(['kubejs:industrial_casing'], ['create:brass_casing', 'kubejs:industrial_iron_sheet'])
    event.recipes.create.item_application(['tfmg:steel_casing'], ['kubejs:harden_wood', 'tfmg:heavy_plate'])
    event.recipes.create.item_application(['create:mechanical_arm'], ['kubejs:mechanical_arm_base', 'kubejs:robot_hand'])
    if (hasFluid) event.recipes.create.item_application(['fluid:pipette'], ['kubejs:mechanical_arm_base', 'kubejs:robot_pipette'])
    event.recipes.create.item_application(['createdieselgenerators:chemical_turret'], ['kubejs:mechanical_arm_base', Ingredient.of('#cwi:chemical_sprayer')])

    // Sandpaper Polishing
    event.recipes.create.sandpaper_polishing('kubejs:polished_sealed_wood', 'kubejs:sealed_wood')
    if (hasGeodePlus) event.recipes.create.sandpaper_polishing('minecraft:quartz_block', 'geode_plus:nether_quartz_crystal_block')

    // Liquid Burning
    event.recipes.createaddition.liquid_burning(Fluid.of('kubejs:gasoline', 1), 48, true).id('createaddition:kjs/9gtjxwxf7vjdfkn1rfjqdiex2')
    event.recipes.createaddition.liquid_burning(Fluid.of('kubejs:diesel', 1), 32, true).id('createaddition:kjs/13vvbuh0xwaudz8bndd6im70f')
    event.recipes.createaddition.liquid_burning(Fluid.of('kubejs:kerosene', 1), 32, false).id('createaddition:kjs/3dgbz6m9b14goerwaj9r5tuib')
    event.recipes.createaddition.liquid_burning(Fluid.of('kubejs:methane', 1), 16, false).id('createaddition:kjs/5eddm1fsvcrvm36commt0aiqm')
    event.recipes.createaddition.liquid_burning(Fluid.of('createdieselgenerators:plant_oil', 1), 4, false).id('createaddition:kjs/7n1zff564wb322l0nsgz11blt')

    // Conversion
    addStoragePair(event, 'kubejs:industrial_rubber_block', 'tfmg:rubber_sheet', 9)
    addStoragePair(event, 'kubejs:rubber_block', 'kubejs:rubber', 9)
    addStoragePair(event, 'kubejs:raw_tin_block', 'kubejs:raw_tin', 9)
    addStoragePair(event, 'kubejs:raw_silver_block', 'kubejs:raw_silver', 9)
    addStoragePair(event, 'createmetallurgy:refractory_mortar', 'createmetallurgy:refractory_mortar_ball', 4)

    // Slab
    slabPair(event, 'normal', 'kubejs:depleted_dirt', 'kubejs:depleted_dirt_slab')
    event.shaped('kubejs:depleted_dirt', ['A', 'A'], { A: 'kubejs:depleted_dirt_slab' })

    // Special Melting And Casting
    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 300),
        [
            'kubejs:andesite_powder', 'kubejs:andesite_powder', 'kubejs:andesite_powder', 'kubejs:andesite_powder',
            'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 300),
        [
            'kubejs:andesite_powder', 'kubejs:andesite_powder', 'kubejs:andesite_powder', 'kubejs:andesite_powder',
            'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 350),
        [
            'kubejs:andesite_gravel',
            'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 350),
        [
            'kubejs:andesite_gravel',
            'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 400),
        [
            'kubejs:cobbled_andesite',
            'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 400),
        [
            'kubejs:cobbled_andesite',
            'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 400),
        [
            'minecraft:andesite',
            'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder', 'kubejs:clay_powder'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.alloying(
        Fluid.of('kubejs:molten_andesite_alloy', 400),
        [
            'minecraft:andesite',
            'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball'
        ]
    ).processingTime(360).superheated()

    event.recipes.createmetallurgy.casting_in_basin('minecraft:slime_block', [Fluid.of('kubejs:molten_slime', 1000)]).processingTime(43).set('mold_consumed', false)
    event.recipes.createmetallurgy.casting_in_basin('tfmg:slag_block', [Fluid.of('kubejs:molten_slag', 1000)]).processingTime(1482).set('mold_consumed', false)

    // Alloying Recipes
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_electrum', 40), [Fluid.of('kubejs:molten_gold', 30), Fluid.of('kubejs:molten_silver', 10)]).processingTime(4)
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_constantan', 40), [Fluid.of('kubejs:molten_copper', 30), Fluid.of('kubejs:molten_nickel', 10)]).processingTime(4)
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_bronze', 50), [Fluid.of('kubejs:molten_copper', 40), Fluid.of('kubejs:molten_tin', 10)]).processingTime(5)
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_brass', 20), [Fluid.of('kubejs:molten_copper', 10), Fluid.of('kubejs:molten_zinc', 10)]).processingTime(2)

    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_electrum', 40), [Fluid.of('kubejs:molten_gold', 30), Fluid.of('kubejs:molten_silver', 10)]).processingTime(4).heated()
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_constantan', 40), [Fluid.of('kubejs:molten_copper', 30), Fluid.of('kubejs:molten_nickel', 10)]).processingTime(4).heated()
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_bronze', 50), [Fluid.of('kubejs:molten_copper', 40), Fluid.of('kubejs:molten_tin', 10)]).processingTime(5).heated()
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_brass', 20), [Fluid.of('kubejs:molten_copper', 10), Fluid.of('kubejs:molten_zinc', 10)]).processingTime(2).heated()

    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_electrum', 40), [Fluid.of('kubejs:molten_gold', 30), Fluid.of('kubejs:molten_silver', 10)]).processingTime(4).superheated()
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_constantan', 40), [Fluid.of('kubejs:molten_copper', 30), Fluid.of('kubejs:molten_nickel', 10)]).processingTime(4).superheated()
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_bronze', 50), [Fluid.of('kubejs:molten_copper', 40), Fluid.of('kubejs:molten_tin', 10)]).processingTime(5).superheated()
    event.recipes.createmetallurgy.alloying(Fluid.of('kubejs:molten_brass', 20), [Fluid.of('kubejs:molten_copper', 10), Fluid.of('kubejs:molten_zinc', 10)]).processingTime(2).superheated()
})
