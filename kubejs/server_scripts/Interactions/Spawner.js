function goldenArmor() {
    return [
        { count: 1, id: 'minecraft:golden_boots' },
        { count: 1, id: 'minecraft:golden_leggings' },
        { count: 1, id: 'minecraft:golden_chestplate' },
        { count: 1, id: 'minecraft:golden_helmet' }
    ]
}

function goldenWeapons() {
    return [
        { count: 1, id: 'minecraft:golden_sword' },
        { count: 1, id: 'minecraft:golden_hoe' }
    ]
}

function spawnEntity(id, customName) {
    const entity = {
        id: id,
        ArmorItems: goldenArmor(),
        HandItems: goldenWeapons()
    }
    if (customName) {
        entity.CustomName = '{"text":"NAME"}'
        entity.Health = 20
    }
    return entity
}

BlockEvents.rightClicked('minecraft:spawner', event => {
    const { block, item } = event
    if (item.id !== 'minecraft:totem_of_undying') return
    if (typeof block.mergeEntityData !== 'function') return

    const spawnerEntityData = {
        Delay: 20,
        MaxNearbyEntities: 6,
        MaxSpawnDelay: 40,
        MinSpawnDelay: 20,
        RequiredPlayerRange: 16,
        SpawnCount: 4,
        SpawnRange: 4,

        SpawnData: {
            custom_spawn_rules: {
                block_light_limit: [0, 15],
                sky_light_limit: [0, 15]
            },
            entity: spawnEntity('minecraft:zombie', true)
        },

        SpawnPotentials: [
            {
                data: { entity: spawnEntity('minecraft:zombie', false) },
                weight: 1
            },
            {
                data: { entity: spawnEntity('minecraft:skeleton', false) },
                weight: 1
            }
        ]
    }

    block.mergeEntityData(spawnerEntityData)
})
