// priority: 1

function setModel(builder, parent, textures) {
    builder.parentModel(parent).textures(textures)
}

StartupEvents.registry('block', event => {
    Object.values(global.compoundOreTypes).forEach(ore => {
        const resistance = ore.resistance
        const hardness = ore.hardness
        const sound = ore.sound
        const deposit = event.create(`${ore.id}_deposit`)
            .soundType(sound)
            .hardness(hardness)
            .resistance(resistance)
            .requiresTool(true)
            .tagBlock('minecraft:mineable/pickaxe')
            .tagBlock(`minecraft:needs_diamond_tool`)
            .tagBoth('cwi:ores')
            .tagBoth('cwi:ore_deposit')
            .tagBoth('create_rns:deposit_blocks')
            .mapColor('#FFFFFF')
            .defaultCutout()
        setModel(deposit, 'kubejs:block/ore_deposit', { '1': ore.texture })

        if( ore.mod !== 'kubejs') return
        const block = event.create(ore.id)
            .soundType(sound)
            .hardness(hardness * 2)
            .resistance(resistance * 3)
            .requiresTool(true)
            .tagBlock('minecraft:mineable/pickaxe')
            .tagBlock(`minecraft:needs_${ore.requiredTool}_tool`)
            .tagBoth('cwi:ores')
            .mapColor('#FFFFFF')
        setModel(block, `kubejs:block/ores/${ore.colored ? ore.id + '0' : ore.id}`, {})
    })
})

BlockEvents.modification(event => {
    Object.values(global.compoundOreTypes).forEach(ore => {
        if( ore.mod === 'kubejs') return
        const resistance = ore.resistance
        const hardness = ore.hardness
        const sound = ore.sound
        event.modify(`${ore.mod}:${ore.realId}`, properties => {
            properties.setDestroySpeed(hardness)
            properties.setExplosionResistance(resistance)
            properties.setSoundType(sound)
            properties.setRequiresTool(true)
        })
    })
})

StartupEvents.registry('item', event => {
    event.create('flotation_reagent')
    event.create('precipitant')
    event.create('washing_residue')
    event.create('silicate_residue')
    Object.values(global.compoundOreTypes).forEach(ore => {
        if (ore.process) {
            event.create(`crushed_${ore.id}`).texture(`kubejs:item/ores/crushed_${ore.id}`)
        } else {
            event.create(ore.id + '_item').texture(ore.itemTexture)
        }
        event.create(`${ore.id}_powder`).texture(`kubejs:item/ores/${ore.id}_powder`)
        if (ore.process) {
            event.create(`${ore.id}_tailings`)
                .textures({
                    layer0: `kubejs:item/ores/${ore.id}_powder`,
                    layer1: 'kubejs:item/ores/tailings_overlay'
                })
            event.create(`stubborn_${ore.id}_tailings`)
                .textures({
                    layer0: `kubejs:item/ores/${ore.id}_powder`,
                    layer1: 'kubejs:item/ores/stubborn_tailings_overlay'
                })
            event.create(`leach_${ore.id}_residue`)
                .textures({
                    layer0: `kubejs:item/ores/small_${ore.id}_powder`,
                    layer1: 'kubejs:item/ores/leach_residue_overlay'
                })
        }
    })

    global.outPutMaterial.forEach(([id, _]) => {
        event.create(`${id}_crystal`).texture(`kubejs:item/ores/${id}_crystal`)
        event.create(`refined_${id}`).texture(`kubejs:item/ores/refined_${id}`)
    })
})

StartupEvents.registry('fluid', event => {
    Object.values(global.compoundOreTypes).forEach(ore => {
        if (!ore.process) return

        registerHeavyFLuid(event, `leach_${ore.id}_solution`, ore.color)
        registerHeavyFLuid(event, `purified_${ore.id}_solution`, ore.color)

    })
})

StartupEvents.registry('item', event => {
    global.oreTypes.forEach(([oreVariants, dropOreId, crushedOreId, powderOreId, isMore]) => {
        if(crushedOreId) event.create(powderOreId.split(':')[1]).texture(`kubejs:item/ores/${powderOreId.split(':')[1]}`)
    })
})
