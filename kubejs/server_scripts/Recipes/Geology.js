ServerEvents.recipes(event => {
    const hasBiomancy = Platform.isLoaded('biomancy')


// Output Replacement

    event.replaceOutput({ output: 'minecraft:bone_meal' }, 'minecraft:bone_meal', 'kubejs:bone_powder')

// Shapeless

    event.shapeless('2x minecraft:lime_dye', 'createaddition:biomass_pellet')
    event.shapeless('2x minecraft:green_dye', 'ratatouille:compost_mass')
    event.shapeless('2x minecraft:brown_dye', 'ratatouille:compost_residue')
    event.shapeless('minecraft:white_dye', 'kubejs:bone_powder')
    event.shapeless('2x minecraft:stick', 'minecraft:bamboo')
    event.shapeless('createdieselgenerators:wood_chip', 'minecraft:stick')
    event.shapeless('2x rusticdelight:cotton_seeds', 'rusticdelight:cotton_boll')
    event.shapeless('3x rusticdelight:cotton_seeds', 'minersdelight:gossypium')

// Compacting

    event.recipes.create.compacting('createdieselgenerators:chip_wood_beam', '2x createdieselgenerators:chip_wood_block')
    event.recipes.create.compacting('kubejs:rubber', 'kubejs:sticky_resin')
    event.recipes.create.compacting('kubejs:sticky_resin', Fluid.of('kubejs:molten_sticky_resin', 100))

// Filling

    event.recipes.create.filling('minecraft:wet_sponge', [Fluid.of('minecraft:water', 1000), 'minecraft:sponge'])

// Cooking

    event.recipes.minecraft.campfire_cooking('kubejs:cooked_spider_meat', 'kubejs:spider_meat')
    event.recipes.minecraft.smoking('kubejs:cooked_spider_meat', 'kubejs:spider_meat')
    event.recipes.minecraft.smelting('kubejs:cooked_spider_meat', 'kubejs:spider_meat')

// Mixing

    event.recipes.create.mixing('minecraft:wheat_seeds', [Fluid.sizedIngredientOf('#cwi:water', 50), 'kubejs:dry_wheat_seeds']).processingTime(200)
    event.recipes.create.mixing('minecraft:melon_seeds', [Fluid.sizedIngredientOf('#cwi:water', 50), 'kubejs:dry_melon_seeds']).processingTime(200)
    event.recipes.create.mixing('minecraft:pumpkin_seeds', [Fluid.sizedIngredientOf('#cwi:water', 50), 'kubejs:dry_pumpkin_seeds']).processingTime(200)
    event.recipes.create.mixing('minecraft:beetroot_seeds', [Fluid.sizedIngredientOf('#cwi:water', 50), 'kubejs:dry_beetroot_seeds']).processingTime(200)
    event.recipes.create.mixing('farmersdelight:tomato_seeds', [Fluid.sizedIngredientOf('#cwi:water', 50), 'kubejs:dry_tomato_seeds']).processingTime(200)
    event.recipes.create.mixing('farmersdelight:cabbage_seeds', [Fluid.sizedIngredientOf('#cwi:water', 50), 'kubejs:dry_cabbage_seeds']).processingTime(200)

    event.recipes.create.mixing('farmersdelight:organic_compost', ['2x ratatouille:compost_residue', 'minecraft:dirt', Fluid.of('minecraft:water', 250)])
    if (hasBiomancy) event.recipes.create.mixing('3x minecraft:bone_meal', ['2x kubejs:bone_powder', 'biomancy:stone_powder'])

    event.recipes.create.mixing(Fluid.of('kubejs:molten_sticky_resin', 100), 'kubejs:sticky_resin').heated().processingTime(600)
    event.recipes.create.mixing(Fluid.of('createdieselgenerators:biodiesel', 100), [Fluid.of('createdieselgenerators:ethanol', 50), Fluid.of('createdieselgenerators:plant_oil', 50)])
    event.recipes.create.mixing('minecraft:bamboo', ['kubejs:muddy_bamboo', Fluid.sizedIngredientOf('#cwi:water', 500)])
    event.recipes.create.mixing('minecraft:sugar_cane', ['kubejs:muddy_sugar_cane', Fluid.sizedIngredientOf('#cwi:water', 500)])
    event.recipes.create.mixing('createaddition:biomass', ['#createaddition:plants', Fluid.of('createdieselgenerators:plant_oil', 100)]).heated()
    event.recipes.create.mixing('createaddition:biomass', ['#minecraft:saplings', Fluid.of('createdieselgenerators:plant_oil', 100)]).heated()
    event.recipes.create.mixing('createaddition:biomass', ['#minecraft:flowers', Fluid.of('createdieselgenerators:plant_oil', 100)]).heated()
    event.recipes.create.mixing('createaddition:biomass', ['#minecraft:leaves', Fluid.of('createdieselgenerators:plant_oil', 100)]).heated()
    event.recipes.create.mixing('2x createaddition:biomass', [Ingredient.of('#c:crops'), Fluid.of('createdieselgenerators:plant_oil', 100)]).heated()
    event.recipes.create.mixing('2x createaddition:biomass', ['#createaddition:plant_foods', Fluid.of('createdieselgenerators:plant_oil', 100)]).heated()
    event.recipes.create.mixing('kubejs:carbon-sealed_quartzite_base', ['kubejs:lapped_quartzite_base', 'kubejs:coal_powder', Fluid.sizedIngredientOf('#cwi:water', 100)]).heated().processingTime(1200)

    event.recipes.create.mixing(Fluid.of('minecraft:lava', 100), '#cwi:cobbled_stones').superheated()
    event.recipes.create.mixing(Fluid.of('createaddition:bioethanol', 250), ['minecraft:sugar', 'createaddition:biomass', Fluid.of('kubejs:distilled_water', 250)])
    event.recipes.create.mixing(Fluid.of('createaddition:bioethanol', 250), [Fluid.of('kubejs:syrup', 125), 'createaddition:biomass', Fluid.of('kubejs:distilled_water', 125)])
    event.recipes.create.mixing('createaddition:biomass', ['createaddition:biomass_pellet', Fluid.of('minecraft:water', 50)])
    event.recipes.create.mixing('minecraft:clay_ball', ['kubejs:clay_powder', Fluid.of('minecraft:water', 50)])
    event.recipes.create.mixing('3x minecraft:gunpowder', ['3x tfmg:nitrate_dust', '2x kubejs:sulfur_powder', 'kubejs:charcoal_powder'])
    event.recipes.create.mixing('minecraft:sugar', Fluid.of('create:honey', 100)).heated()

    event.recipes.create.mixing('kubejs:yeast_paste', ['2x kubejs:fermento_mycetes', Fluid.of('createdieselgenerators:ethanol', 50), Fluid.of('kubejs:distilled_water', 250)]).heated()

// Milling

    event.recipes.create.milling(['3x minecraft:lime_dye', CreateItem.of(Item.of('minecraft:light_gray_dye'), 0.1)], 'createaddition:biomass_pellet')
    event.recipes.create.milling(['3x minecraft:green_dye', CreateItem.of(Item.of('minecraft:brown_dye'), 0.1)], 'ratatouille:compost_mass')
    event.recipes.create.milling(['2x minecraft:white_dye', CreateItem.of(Item.of('minecraft:light_gray_dye'), 0.1)], 'kubejs:bone_powder')
    event.recipes.create.milling(['2x kubejs:ash', CreateItem.of(Item.of('kubejs:ash'), 0.75), CreateItem.of(Item.of('minersdelight:silverfish_eggs'), 0.03)], 'kubejs:depleted_dirt')
    event.recipes.create.milling('kubejs:powdered_fermento_mycetes', 'kubejs:dry_fermento_mycetes')
    event.recipes.create.milling('kubejs:powdered_carbofusor_spirillum', 'kubejs:dry_carbofusor_spirillum')
    event.recipes.create.milling('kubejs:powdered_putrelys_sporogenes', 'kubejs:dry_putrelys_sporogenes')
    if (hasBiomancy) event.recipes.create.milling('kubejs:bone_powder', 'biomancy:bone_fragments')
    event.recipes.create.milling(['2x minecraft:string', CreateItem.of(Item.of('minecraft:string'), 0.25)], 'minersdelight:gossypium')
    event.recipes.create.milling(['minecraft:string', CreateItem.of(Item.of('minecraft:string'), 0.5)], 'rusticdelight:cotton_boll')
    event.recipes.create.milling(['create:wheat_flour', CreateItem.of(Item.of('create:wheat_flour'), 0.5)], 'ratatouille:wheat_kernels')
    event.recipes.create.milling(['2x createaddition:biomass', CreateItem.of(Item.of('createaddition:biomass'), 0.25)], 'ratatouille:compost_residue')
    event.recipes.create.milling(['3x createdieselgenerators:wood_chip', CreateItem.of(Item.of('createdieselgenerators:wood_chip'), 0.25)], 'minecraft:bamboo')
    event.recipes.create.milling(['createdieselgenerators:wood_chip', CreateItem.of(Item.of('createdieselgenerators:wood_chip'), 0.5)], 'minecraft:stick')
    event.recipes.create.milling(['2x createdieselgenerators:wood_chip', CreateItem.of(Item.of('createdieselgenerators:wood_chip'), 0.75)], 'minecraft:dead_bush')

// Crushing

    event.recipes.create.crushing([CreateItem.of(Item.of('2x kubejs:darkslate_powder'), 0.75), CreateItem.of(Item.of('kubejs:darkslate_powder'), 0.57), CreateItem.of(Item.of('kubejs:dark_ash'), 0.27), CreateItem.of(Item.of('kubejs:acidolys_bacillus'), 0.83), CreateItem.of(Item.of('kubejs:acidolys_bacillus'), 0.73), CreateItem.of(Item.of('kubejs:dark_ash'), 0.58)], 'kubejs:acidified_darkslate')
    const claySedimentOutputs = [CreateItem.of(Item.of('2x kubejs:claystone_powder'), 0.75), CreateItem.of(Item.of('kubejs:claystone_powder'), 0.57), CreateItem.of(Item.of('kubejs:ash'), 0.27), CreateItem.of(Item.of('kubejs:dry_carbofusor_spirillum'), 0.58), CreateItem.of(Item.of('kubejs:dry_putrelys_sporogenes'), 0.73)]
    const drySedimentOutputs = [CreateItem.of(Item.of('2x kubejs:ash'), 0.75), CreateItem.of(Item.of('kubejs:ash'), 0.57), CreateItem.of(Item.of('kubejs:dust-covered_seeds'), 0.078), CreateItem.of(Item.of('kubejs:dry_fermento_mycetes'), 0.042)]
    const wetSedimentOutputs = [CreateItem.of(Item.of('ratatouille:compost_mass'), 0.37), CreateItem.of(Item.of('kubejs:muddy_sugar_cane'), 0.13), CreateItem.of(Item.of('kubejs:muddy_bamboo'), 0.17), CreateItem.of(Item.of('kubejs:nitrofix_rhizobium'), 0.11)]
    if (hasBiomancy) {
        claySedimentOutputs.push(CreateItem.of(Item.of('biomancy:bone_fragments'), 0.73))
        drySedimentOutputs.push(CreateItem.of(Item.of('biomancy:stone_powder'), 0.27), CreateItem.of(Item.of('biomancy:bone_fragments'), 0.43))
        wetSedimentOutputs.push(CreateItem.of(Item.of('biomancy:stone_powder'), 0.57), CreateItem.of(Item.of('biomancy:bone_fragments'), 0.43))
    }
    event.recipes.create.crushing(claySedimentOutputs, 'kubejs:claystone_biological_sediment')
    event.recipes.create.crushing(drySedimentOutputs, 'kubejs:dry_biological_sediment')
    event.recipes.create.crushing(wetSedimentOutputs, 'kubejs:wet_biological_sediment')
    event.recipes.create.crushing(['2x kubejs:ash', CreateItem.of(Item.of('kubejs:ash'), 0.75), CreateItem.of(Item.of('kubejs:ash'), 0.37), CreateItem.of(Item.of('kubejs:ash'), 0.11)], 'kubejs:depleted_dirt')

// Rubberworks Sapping

    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 25), ["minecraft:oak_log", "minecraft:oak_leaves"])
    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 50), ["minecraft:spruce_log", "minecraft:spruce_leaves"])
    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 40), ["minecraft:jungle_log", "minecraft:jungle_leaves"])
    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 50), ["minecraft:dark_oak_log", "minecraft:dark_oak_leaves"])
    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 60), ["minecraft:cherry_log", "minecraft:cherry_leaves"])
    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 40), ["minecraft:birch_log", "minecraft:birch_leaves"])
    event.recipes.rubberworksSapping(Fluid.of("kubejs:molten_sticky_resin", 40), ["minecraft:acacia_log", "minecraft:acacia_leaves"])

// Rubberworks Compressing

    event.recipes.rubberworksCompressing([CreateItem.of(Item.of('kubejs:stone_powder'), 0.35), CreateItem.of(Item.of('kubejs:rhyolite_powder'), 0.13), CreateItem.of(Item.of('kubejs:diorite_powder'), 0.16), CreateItem.of(Item.of('kubejs:granite_powder'), 0.21)], Fluid.of("minecraft:lava", 100))
    event.recipes.rubberworksCompressing([CreateItem.of(Item.of('minecraft:sugar'), 0.57), CreateItem.of(Item.of('minecraft:sugar'), 0.21)], Fluid.of("create:honey", 100))

// Distillation

    event.recipes.createdieselgenerators.distillation([ Fluid.of('minecraft:water', 400), Fluid.of('kubejs:methanol', 100) ], [ Fluid.of('kubejs:wood_vinegar', 500) ]).processingTime(200).heated()

// Threshing

    event.recipes.ratatouille.threshing(
        [
            '2x kubejs:ash',
            CreateItem.of(Item.of('kubejs:ash'), 0.5),
            CreateItem.of(Item.of('minersdelight:silverfish_eggs'), 0.09),
            CreateItem.of(Item.of('minersdelight:arthropod'), 0.03)
        ],
        [ 'kubejs:depleted_dirt' ]
    ).processingTime(100)

    event.recipes.ratatouille.threshing(
        [
            '2x rusticdelight:cotton_boll',
            CreateItem.of(Item.of('rusticdelight:cotton_boll'), 0.5)
        ],
        [ 'minersdelight:gossypium' ]
    ).processingTime(100)

// Centrifugation

    event.recipes.vintageimprovements.centrifugation(['kubejs:stone_powder', 'kubejs:clay_powder'], ['kubejs:claystone_powder', 'kubejs:claystone_powder']).processingTime(80)
    event.recipes.vintageimprovements.centrifugation(['kubejs:quartz_powder', 'kubejs:stone_powder'], ['kubejs:diorite_powder', 'kubejs:diorite_powder']).processingTime(80)
    event.recipes.vintageimprovements.centrifugation(['kubejs:diorite_powder', 'kubejs:stone_powder'], ['kubejs:andesite_powder', 'kubejs:andesite_powder']).processingTime(80)
    event.recipes.vintageimprovements.centrifugation(['kubejs:clay_powder', Fluid.of('minecraft:water', 50)], ['minecraft:clay_ball']).processingTime(300)

// Sequenced Assembly

    event.recipes.create.sequenced_assembly(
        'kubejs:whetstone',
        'minecraft:tuff',
        [
            event.recipes.vintageimprovements.polishing(['kubejs:incomplete_whetstone'], 'kubejs:incomplete_whetstone').speedLimits(2).processingTime(60),
            event.recipes.create.pressing('kubejs:incomplete_whetstone', 'kubejs:incomplete_whetstone'),
            event.recipes.create.pressing('kubejs:incomplete_whetstone', 'kubejs:incomplete_whetstone')
        ]
    )
    .transitionalItem('kubejs:incomplete_whetstone')
    .loops(3)

    event.recipes.create.sequenced_assembly(
        'kubejs:lapped_quartzite_base',
        'kubejs:cobbled_quartzite',
        [
            event.recipes.create.pressing('kubejs:incomplete_quartzite_base', 'kubejs:incomplete_quartzite_base'),
            event.recipes.create.cutting('kubejs:incomplete_quartzite_base', 'kubejs:incomplete_quartzite_base')
        ]
    )
    .transitionalItem('kubejs:incomplete_quartzite_base')
    .loops(1)

    event.recipes.create.sequenced_assembly(
        'kubejs:fine_whetstone',
        'kubejs:carbon-sealed_quartzite_base',
        [
            event.recipes.create.pressing('kubejs:incomplete_fine_whetstone', 'kubejs:incomplete_fine_whetstone'),
            event.recipes.create.filling('kubejs:incomplete_fine_whetstone', ['kubejs:incomplete_fine_whetstone', Fluid.sizedIngredientOf('#cwi:water', 100)]),
            event.recipes.create.filling('kubejs:incomplete_fine_whetstone', ['kubejs:incomplete_fine_whetstone', Fluid.sizedIngredientOf('#cwi:water', 100)]),
            event.recipes.vintageimprovements.polishing(['kubejs:incomplete_fine_whetstone'], 'kubejs:incomplete_fine_whetstone').speedLimits(2).processingTime(60)
        ]
    )
    .transitionalItem('kubejs:incomplete_fine_whetstone')
    .loops(3)

    event.recipes.create.sequenced_assembly(
        'kubejs:soaked_depleted_dirt',
        'kubejs:depleted_dirt',
        [
            event.recipes.create.filling('kubejs:wet_depleted_dirt', ['kubejs:wet_depleted_dirt', Fluid.of('minecraft:water', 250)]),
            event.recipes.create.filling('kubejs:wet_depleted_dirt', ['kubejs:wet_depleted_dirt', Fluid.of('minecraft:water', 250)]),
            event.recipes.create.filling('kubejs:wet_depleted_dirt', ['kubejs:wet_depleted_dirt', Fluid.of('minecraft:water', 250)])
        ]
    )
    .transitionalItem('kubejs:wet_depleted_dirt')
    .loops(1)

    event.recipes.create.sequenced_assembly(
        [
            CreateItem.of(Item.of('kubejs:dust-covered_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_beetroot_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_wheat_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_melon_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_pumpkin_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_tomato_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_cabbage_seeds'), 1),
            CreateItem.of(Item.of('kubejs:ash'), 3)
        ],
        'kubejs:dust-covered_seeds',
        [
            event.recipes.create.filling('kubejs:dust-covered_seeds', ['kubejs:dust-covered_seeds', Fluid.of('minecraft:water', 50)])
        ]
    )
    .transitionalItem('kubejs:dust-covered_seeds')
    .loops(3)

    event.recipes.create.sequenced_assembly(
        [
            CreateItem.of(Item.of('kubejs:dust-covered_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_beetroot_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_wheat_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_melon_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_pumpkin_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_tomato_seeds'), 1),
            CreateItem.of(Item.of('kubejs:dry_cabbage_seeds'), 1)
        ],
        'kubejs:dust-covered_seeds',
        [
            event.recipes.vintageimprovements.vibrating(['kubejs:dust-covered_seeds'], 'kubejs:dust-covered_seeds').processingTime(200)
        ]
    )
    .transitionalItem('kubejs:dust-covered_seeds')
    .loops(1)

})
