StartupEvents.registry('block', event => {
    const logTypes = [
        'ash_log',
        'stripped_ash_log',
        'broken_ash_log',
        'stripped_broken_ash_log',
        'burnt_log',
        'stripped_burnt_log',
        'broken_burnt_log',
        'stripped_broken_burnt_log'
    ]

    function createLogBlock(event, id) {
        // The custom broken-log model uses three texture slots and cannot be
        // emitted by the built-in pillar model generator. Keep it on a basic
        // builder with axis blockstates in assets; normal logs use the native
        // pillar builder for axis placement and model rotation.
        const builder = id.includes('broken') ? event.create(id) : event.create(id, 'pillar')
        builder
            .soundType('wood')
            .hardness(2)
            .resistance(2)
            .requiresTool(true)
            .tagBlock('minecraft:mineable/axe')
            .tagBlock('minecraft:needs_wooden_tool')
            .mapColor('#FF5500')

        if (id.includes('broken')) {
            builder
                .redstoneConductor(false)
                .suffocating(false)
                .defaultCutout()
                .property(BlockProperties.AXIS)
                .placementState(event => event.setValue(BlockProperties.AXIS, event.clickedFace.axis))
            builder.modelGenerator(model => {
                model.parent('kubejs:block/broken_logs')
                model.textures({
                    "0": `kubejs:block/logs/${id.replace("broken_", "")}_inner`,
                    "1": `kubejs:block/logs/${id.replace("broken_", "")}_top`,
                    "2": `kubejs:block/logs/${id.replace("broken_", "")}`,
                    "particle": `kubejs:block/logs/${id.replace("broken_", "")}_inner`
                })
            })
        } else {
            builder
                .textures({
                    end: `kubejs:block/logs/${id}_top`,
                    side: `kubejs:block/logs/${id}`
                })
        }
    }

    logTypes.forEach(id => createLogBlock(event, id))
})
