ServerEvents.recipes(event => {

// Reagent Preparation

// Soda Is Divided Into Four Precipitant Doses, Not Converted Into Four Full Soda Portions
// Generic Precipitation And Subsequent Metal Recovery Remain The Ore Line's Gameplay Abstraction
    event.shapeless('4x kubejs:precipitant', ['kubejs:soda_powder'])
        .id('cwi:crafting/precipitant_from_soda')

// Oil And Alcohol Form A Simplified Collector And Frother Blend On A Clay Carrier
// This Unspecified Mixture Has No Unique Molecular Equation Or Universal Real World Selectivity
    event.recipes.create.mixing('4x kubejs:flotation_reagent', [
        'minecraft:clay_ball',
        Fluid.of('createdieselgenerators:plant_oil', 100),
        Fluid.of('createaddition:bioethanol', 50)
    ]).processingTime(100)
        .id('cwi:mixing/flotation_reagent')

// Washed Mineral Recovery

// Washed Silicate Fines Act As Aggregate And Filler, Compaction Also Abstracts Curing
    event.recipes.create.compacting('4x tfmg:concrete', [
        '2x kubejs:silicate_residue',
        'tfmg:cement',
        'minecraft:gravel',
        Fluid.sizedIngredientOf('#cwi:water', 250)
    ]).processingTime(100)
        .id('cwi:compacting/concrete_from_silicate_residue')

// Plank Treatment

    event.recipes.create.filling('tfmg:hardened_planks', [Ingredient.of('#minecraft:planks'), Fluid.of('kubejs:creosote', 250)])
        .id('cwi:filling/hardened_planks')

// Fire Extinguisher

    event.replaceInput({ id: 'tfmg:crafting/kinetics/fire_extinguisher' }, 'tfmg:carbon_dioxide_bucket', 'kubejs:carbon_dioxide_bucket')

    event.recipes.create.filling(
        Item.of('tfmg:fire_extinguisher', { 'tfmg:amount': 500 }),
        ['tfmg:fire_extinguisher', Fluid.of('kubejs:carbon_dioxide', 1000)]
    ).id('cwi:filling/fire_extinguisher')

// Lubricating Oil Supply

// Wax Oil Can Supply Lubricating Stock Instead Of Entering Catalytic Cracking
// Fractionation And Lubricant Finishing Are Combined, Petroleum Mixtures Have No Unique Molecular Equation
// Output Ratios Follow TFMG's Native Heavy Oil Distillation, With All Registered Liquid States Preserved
    event.recipes.tfmg.distillation(
        [
            Fluid.of('kubejs:residual_oil', 500),
            Fluid.of('kubejs:lubrication_oil', 125),
            Fluid.of('kubejs:diesel', 250),
            Fluid.of('kubejs:kerosene', 100),
            Fluid.of('kubejs:naphtha', 25)
        ],
        [Fluid.of('kubejs:wax_oil', 1000)]
    ).id('cwi:distillation/lubrication_oil_from_wax_oil')
})
