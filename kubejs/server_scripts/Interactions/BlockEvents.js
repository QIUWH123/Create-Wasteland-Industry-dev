BlockEvents.broken(event => {
    if ((
        event.block.id === 'kubejs:steel_armor_block' ||
        event.block.id === 'kubejs:steel_armor_penetrated' ||
        event.block.id === 'kubejs:steel_armor_safe'
    ) && !(
        event.player.isCreative() ||
        event.player.getMainHandItem().id === 'create_sa:portable_drill'
    )) {
        event.cancel()
    }
})

function spawnAshBrickParticles(event, spread) {
    const { block, level } = event
    level.sendParticles(
        'minecraft:falling_dust{block_state:"minecraft:gravel"}',
        block.x + 0.5,
        block.y + 0.8,
        block.z + 0.5,
        Math.floor(random(3, 8)),
        spread,
        0.2,
        spread,
        0
    )
    level.sendParticles(
        'minecraft:campfire_cosy_smoke',
        block.x + 0.5,
        block.y + 0.5,
        block.z + 0.5,
        Math.floor(random(0, 2)),
        0.3,
        0.3,
        0.3,
        0
    )
}

BlockEvents.broken('kubejs:ash_bricks', event => spawnAshBrickParticles(event, 0.55))
BlockEvents.placed('kubejs:ash_bricks', event => spawnAshBrickParticles(event, 0.45))
