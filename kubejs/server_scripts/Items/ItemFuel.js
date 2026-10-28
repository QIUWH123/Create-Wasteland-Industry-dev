ServerEvents.generateData('after_mods', event => {
    const nonFuelItems = [
        'minecraft:dried_kelp_block',
        'minecraft:smithing_table',
        'minecraft:jukebox',
        'minecraft:note_block',
        'minecraft:chest',
        'minecraft:crafting_table',
        'minecraft:trapped_chest',
        'minecraft:daylight_detector',
        'minecraft:barrel',
        'minecraft:blaze_rod',
        'minecraft:lava_bucket',
        'create:blaze_cake',
        'create:creative_blaze_cake',
        'createmetallurgy:coke',
        'ratatouille:bio_gas_bucket'
    ]

    nonFuelItems.forEach(id => event.removeFurnaceFuel(id))
})
