BlockEvents.modification(event => {

// Crafting Table And Furnace

    event.modify('minecraft:crafting_table', block => {
        block.setDestroySpeed(3)
        block.setSoundType('polished_deepslate')
        block.setRequiresTool(true)
        block.setExplosionResistance(5)
    })

    event.modify('minecraft:furnace', block => {
        block.setDestroySpeed(3)
        block.setSoundType('polished_deepslate')
        block.setRequiresTool(true)
        block.setExplosionResistance(5)
    })

// Rebar Blocks

    const rebar = [
        'tfmg:rebar_block',
        'tfmg:rebar_floor',
        'tfmg:rebar_wall',
        'tfmg:rebar_pile',
        'tfmg:rebar_stairs',
        'tfmg:rebar_pillar'
    ]
    rebar.forEach(id => {
        event.modify(id, block => {
            block.setRequiresTool(true)
        })
    })

// Wire Block

    const wireBlock = [
        'create_new_age:copper_wire_block',
        'create_new_age:overcharged_iron_wire_block',
        'create_new_age:overcharged_golden_wire_block',
        'create_new_age:overcharged_diamond_wire_block'
    ]
    wireBlock.forEach(id => {
        event.modify(id, block => {
            block.setRequiresTool(true)
            block.setDestroySpeed(4)
            block.setExplosionResistance(6)
            block.setSoundType('metal')
        })
    })

})
