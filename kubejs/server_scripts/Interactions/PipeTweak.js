// Java Boolean Class For Pipe Toggle

const $PipeBoolean = Java.loadClass('java.lang.Boolean')

// Inverse Direction Map For Pipe Toggle

const inversedDirectionUpper = {
    WEST: 'EAST',
    SOUTH: 'NORTH',
    NORTH: 'SOUTH',
    EAST: 'WEST',
    UP: 'DOWN',
    DOWN: 'UP'
}

function pipeDirection(event) {
    let face = event.facing.toString().toUpperCase()
    if (event.player.shiftKeyDown) face = inversedDirectionUpper[face]
    return face
}

function togglePipeConnection(event, limitConnections) {
    if (event.item.id !== 'minecraft:air' || event.hand !== 'MAIN_HAND') return

    const blockState = event.block.blockState
    const position = event.block.pos
    event.entity.swing()
    event.block.level.playSound(null, event.block.x, event.block.y, event.block.z, 'minecraft:block.copper.place', 'blocks', 0.6, 1.2)
    const face = pipeDirection(event)
    const property = BlockProperties[face]
    if (!property) return

    if (limitConnections) {
        const properties = event.block.properties
        const connectionCount = [properties.west, properties.east, properties.south, properties.north, properties.up, properties.down]
            .filter(value => value === 'true').length
        if (connectionCount <= 2 && blockState.getValue(property)) return
    }

    const connected = blockState.getValue(property)
    event.level.setBlockAndUpdate(position, blockState.setValue(property, connected ? $PipeBoolean.FALSE : $PipeBoolean.TRUE))
}

// Create is optional in this pack; do not register handlers for missing blocks.
if (Platform.isLoaded('create')) {
    BlockEvents.rightClicked('create:fluid_pipe', event => togglePipeConnection(event, true))
}

if (Platform.isLoaded('create')) {
    BlockEvents.rightClicked('create:encased_fluid_pipe', event => togglePipeConnection(event, false))
}
