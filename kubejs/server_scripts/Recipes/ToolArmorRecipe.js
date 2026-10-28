ServerEvents.recipes(event => {

    const toolPatterns = {
        sword:     ['A', 'A', 'B'],
        axe:       ['AA', 'AB', ' B'],
        pickaxe:   ['AAA', ' B ', ' B '],
        shovel:    ['A', 'B', 'B'],
        hoe:       ['AA', ' B', ' B']
    }

    const armorPatterns = {
        helmet:     ['AAA', 'A A'],
        chestplate: ['A A', 'AAA', 'AAA'],
        leggings:   ['AAA', 'A A', 'A A'],
        boots:      ['A A', 'A A']
    }

    function addTools(material, outputPrefix) {
        for (let tool in toolPatterns) {
            if (toolPatterns.hasOwnProperty(tool)) {
                event.shaped(Item.of(outputPrefix + '_' + tool), toolPatterns[tool], {
                    A: material,
                    B:'minecraft:stick'
                })
            }
        }
    }

    function addArmor(material, outputPrefix) {
        for (let piece in armorPatterns) {
            if (armorPatterns.hasOwnProperty(piece)) {
                event.shaped(Item.of(outputPrefix + '_' + piece), armorPatterns[piece], {
                    A: material
                })
            }
        }
    }

    addTools('minecraft:cobblestone', 'minecraft:stone')

    addTools('kubejs:rusted_iron_sheet', 'kubejs:rusted_iron')

    addTools('create:iron_sheet', 'minecraft:iron')
    addArmor('create:iron_sheet', 'minecraft:iron')

    addTools('create:golden_sheet', 'minecraft:golden')
    addArmor('create:golden_sheet', 'minecraft:golden')

    addTools('kubejs:bronze_sheet', 'kubejs:bronze')
    addArmor('kubejs:bronze_sheet', 'kubejs:bronze')

    addTools('kubejs:industrial_iron_sheet', 'kubejs:industrial_iron')

    addTools('create:brass_sheet', 'kubejs:brass')

    addTools('create:copper_sheet', 'kubejs:copper')

    addTools('createaddition:zinc_sheet', 'kubejs:zinc')

    addTools('tfmg:heavy_plate', 'kubejs:steel')
    addArmor('tfmg:heavy_plate', 'kubejs:steel')

    addTools('kubejs:stainless_steel_sheet', 'kubejs:stainless_steel')
    addArmor('kubejs:stainless_steel_sheet', 'kubejs:stainless_steel')

})

ServerEvents.recipes(event => {

    event.shaped(
        'farmersdelight:iron_knife',
        [
            'A',
            'B'
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:stick'
        }
    )

    event.shaped(
        'farmersdelight:golden_knife',
        [
            'A',
            'B'
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:stick'
        }
    )

    event.shaped(
        'minecraft:shears',
        [
            ' A ',
            'CBA',
            ' C '
        ],
        {
            A: 'create:iron_sheet',
            B: '#cwi:rubbers',
            C: 'minecraft:stick',
        }
    )

    event.shaped(
        'minecraft:bucket',
        [
            'A A',
            ' A '
        ],
        {
            A: 'create:iron_sheet',
        }
    )

})
