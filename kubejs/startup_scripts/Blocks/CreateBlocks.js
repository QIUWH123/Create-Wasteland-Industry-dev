StartupEvents.registry('block', event => {
    const materials = [
        { id: 'wooden', sound: 'wood', hardness: 1.5, resistance: 6, tool: 'axe', requiresTool: false, tier: null, color: '#8F7748' },
        { id: 'andesite_alloy', sound: 'stone', hardness: 3, resistance: 6, tool: 'pickaxe', requiresTool: true, tier: 'stone', color: '#7F7F7F' },
        { id: 'copper', sound: 'metal', hardness: 3, resistance: 6, tool: 'pickaxe', requiresTool: true, tier: 'stone', color: '#D37A50' },
        { id: 'brass', sound: 'metal', hardness: 3, resistance: 6, tool: 'pickaxe', requiresTool: true, tier: 'stone', color: '#C5A94E' },
        { id: 'industrial_iron', sound: 'metal', hardness: 3, resistance: 6, tool: 'pickaxe', requiresTool: true, tier: 'stone', color: '#686868' },
        { id: 'stainless_steel', sound: 'metal', hardness: 6, resistance: 12, tool: 'pickaxe', requiresTool: true, tier: 'iron', color: '#BEC6CA' }
    ]

    const variants = [
        { type: 'cogwheel', rotating: 'cogwheel_shaftless' },
        { type: 'large_cogwheel', rotating: 'large_cogwheel_shaftless' },
        { type: 'shaftless_cogwheel', rotating: 'cogwheel_shaftless' },
        { type: 'large_shaftless_cogwheel', rotating: 'large_cogwheel_shaftless' }
    ]

    materials.forEach(material => {
        const models = `kubejs:block/cogwheels/${material.id}/`

        variants.forEach(variant => {
            const block = event.create(`${material.id}_${variant.type}`, variant.type)
                .model('cogwheel', `${models}${variant.rotating}`)
                .soundType(material.sound)
                .hardness(material.hardness)
                .resistance(material.resistance)
                .requiresTool(material.requiresTool)
                .tagBlock(`minecraft:mineable/${material.tool}`)
                .mapColor(material.color)
                .noValidSpawns(true)

            if (material.tier !== null) {
                block.tagBlock(`minecraft:needs_${material.tier}_tool`)
            }
        })
    })

    event.create('industrial_casing', 'casing')
        .casingTextures('kubejs:block/casings/industrial')
        .cogwheelCasing()
        .shaftCasing()
        .fluidCasing()
        .soundType('metal')
        .hardness(3)
        .resistance(6)
        .requiresTool(true)
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('minecraft:needs_stone_tool')
        .mapColor('#FF5500')

    event.create('stainless_steel_casing', 'casing')
        .casingTextures('kubejs:block/casings/stainless_steel')
        .cogwheelCasing()
        .shaftCasing()
        .fluidCasing()
        .soundType('metal')
        .hardness(6)
        .resistance(12)
        .requiresTool(true)
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .mapColor('#FF5500')

    for (const material of ['industrial_iron', 'stainless_steel']) {
        for (const type of ['gearbox', 'vertical_gearbox', 'six_way_gearbox']) {
            event.create(`${material}_${type}`, type)
                .replaceTexture('casing', `kubejs:block/casings/${material}_casing`)
                .replaceTexture('gearbox', `kubejs:block/casings/${material}_gearbox`)
        }
    }
})
