// The Pipe Is An Entity Weapon And Must Stay Outside Hammer Recipe Catalysts

ServerEvents.tags('item', event => {
    event.remove('minecraft:hammers', 'kubejs:steel_pipe')
})
