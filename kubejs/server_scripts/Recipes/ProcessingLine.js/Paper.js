ServerEvents.recipes(function(event) {

    addFermentingRecipes(event,
        [
            '8x createdieselgenerators:wood_chip',
            Fluid.sizedIngredientOf('#cwi:water', 500)
        ],
        [
            '2x create:pulp',
            CreateItem.of(Item.of('create:pulp'), 0.5)
        ],
        800, 'heated', ['basin', 'bulk']
    )

    addFermentingRecipes(event,
        [
            '4x #create:pulpifiable',
            Fluid.sizedIngredientOf('#cwi:water', 500)
        ],
        [
            '2x create:pulp',
            CreateItem.of(Item.of('create:pulp'), 0.5)
        ],
        800, 'heated', ['basin', 'bulk']
    )

    event.shaped(
        'kubejs:forming_fabric',
        [
            'ABA',
            'BCB',
            'ABA'
        ],
        {
            A: 'kubejs:andesite_alloy_rod',
            B: 'minecraft:stick',
            C: 'farmersdelight:canvas'
        }
    )

    event.recipes.create.mixing(Fluid.of('kubejs:pulp', 500), ['create:pulp', Fluid.sizedIngredientOf('#cwi:water', 500)]).processingTime(200)
    event.recipes.create.mixing(Fluid.of('kubejs:fine_pulp', 500), Fluid.of('kubejs:pulp', 500)).processingTime(200)

    event.recipes.create.filling('kubejs:wet_web', ['kubejs:forming_fabric', Fluid.of('kubejs:fine_pulp', 100)])

    event.recipes.create.pressing('kubejs:pressed_wet_web', 'kubejs:wet_web')
    event.recipes.create.pressing(['minecraft:paper', 'kubejs:forming_fabric'], 'kubejs:dried_web')

    event.recipes.minecraft.smoking('kubejs:dried_web', 'kubejs:pressed_wet_web')
})
