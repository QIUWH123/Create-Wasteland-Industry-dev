ServerEvents.recipes(event => {

    event.recipes.create.mixing(Fluid.of('create:tea', 500), [Ingredient.of('#minecraft:leaves'), Fluid.of('minecraft:milk', 100), Fluid.of('kubejs:distilled_water', 400)]).heated()

    global.apples.forEach(([material]) => {
        const appleItem = `kubejs:${material}_apple`
        const chargedAppleItem = `kubejs:charged_${material}_apple`
        const enchantedAppleItem = `kubejs:enchanted_${material}_apple`
        const ingot = getMaterial(material, 'ingot')
        const sheet = getMaterial(material, 'sheet')
        const fluid = getMaterial(material, 'fluid')
        if (!ingot || !sheet || !fluid) return

        event.shaped(appleItem, ['AAA', 'ABA', 'AAA'], {
            A: ingot,
            B: 'minecraft:apple'
        })

        event.shaped(appleItem, ['AAA', 'ABA', 'AAA'], {
            A: sheet,
            B: 'minecraft:apple'
        })

        event.recipes.createaddition.charging(chargedAppleItem, appleItem, 10000, 100)

        addFermentingRecipes(event,
            [
                Fluid.of('kubejs:redstone_acid', 250),
                '2x kubejs:lapis_powder',
                '3x kubejs:amethyst_powder',
                chargedAppleItem
            ],
            [
                enchantedAppleItem
            ],
            2400, 'superheated', ['basin', 'bulk']
        )

        event.recipes.createmetallurgy.casting_in_table(appleItem, ['minecraft:apple', Fluid.of(fluid, 720)], 200).moldConsumed()
        event.recipes.createmetallurgy.casting_in_basin(appleItem, ['minecraft:apple', Fluid.of(fluid, 720)], 200).moldConsumed()
    })

})
