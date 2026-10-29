const sound = (id, volume, pitch) => ({ type: 'sound', id: id, volume: volume, pitch: pitch })
const blockParticle = (particleType, data, dx, dy, dz, speed, count) => ({
    type: 'particle', particleType: particleType, data: data, dx: dx, dy: dy, dz: dz, speed: speed, count: count
})
const simpleParticle = (particleType, dx, dy, dz, speed, count) => ({
    type: 'particle', particleType: particleType, dx: dx, dy: dy, dz: dz, speed: speed, count: count
})
const discard = () => ({ type: 'discard' })
const replaceItem = item => ({ type: 'replaceItem', item: item })
const setBlock = block => ({ type: 'setBlock', block: block })
const explode = (strength, causesFire, explosionMode) => ({
    type: 'explosion', strength: strength, causesFire: causesFire, explosionMode: explosionMode
})

const fallItemsConfig = [
    {
        inputItem: 'kubejs:ash',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('block.sand.place', 2, 2),
                blockParticle('minecraft:falling_dust', 'minecraft:gravel', 0.5, 0.3, 0.5, 0.1, 16),
                discard()
            ]
        }]
    },
    {
        inputItem: 'kubejs:dark_ash',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('block.sand.place', 2, 2),
                blockParticle('minecraft:falling_dust', 'minecraft:deepslate', 0.5, 0.3, 0.5, 0.1, 16),
                discard()
            ]
        }]
    },
    {
        inputItem: 'create:polished_rose_quartz',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('minecraft:block.amethyst_block.break', 0.8, 1.2),
                simpleParticle('minecraft:electric_spark', 0.3, 0.3, 0.3, 0.1, 4),
                replaceItem('kubejs:damaged_polished_rose_quartz')
            ]
        }]
    },
    {
        inputItem: 'create:precision_mechanism',
        effects: [{
            spaceBetween: 3,
            events: [
                sound('minecraft:block.chain.break', 0.6, 1.2),
                simpleParticle('minecraft:ash', 0.3, 0.3, 0.3, 0.1, 12),
                replaceItem('kubejs:damaged_precision_mechanism')
            ]
        }]
    },
    {
        inputItem: 'naturescompass:naturescompass',
        effects: [{
            spaceBetween: 3,
            events: [
                sound('minecraft:block.glass.break', 0.4, 1.8),
                simpleParticle('minecraft:electric_spark', 0.3, 0.3, 0.3, 0.1, 4),
                replaceItem('kubejs:damaged_natures_compass')
            ]
        }]
    },
    {
        inputItem: 'create_connected:control_chip',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('minecraft:block.comparator.click', 0.5, 1.5),
                simpleParticle('minecraft:electric_spark', 0.3, 0.3, 0.3, 0.1, 4),
                replaceItem('kubejs:damaged_control_chip')
            ]
        }]
    },
    {
        inputItem: 'create:electron_tube',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('minecraft:block.glass.break', 0.4, 1.8),
                simpleParticle('minecraft:electric_spark', 0.3, 0.3, 0.3, 0.1, 4),
                replaceItem('kubejs:damaged_electron_tube')
            ]
        }]
    },
    {
        inputItem: 'minecraft:glass',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('block.glass.break', 1, 1),
                blockParticle('minecraft:block', 'minecraft:glass', 0.3, 0.3, 0.3, 0.1, 20),
                discard()
            ]
        }]
    },
    {
        inputItem: 'kubejs:devitrified_glass',
        effects: [
            {
                spaceBetween: 4,
                events: [
                    sound('block.glass.break', 1, 1),
                    blockParticle('minecraft:block', 'minecraft:glass', 0.3, 0.3, 0.3, 0.1, 20),
                    discard()
                ]
            },
            {
                spaceBetween: 2,
                events: [
                    sound('block.glass.break', 1, 1),
                    blockParticle('minecraft:block', 'minecraft:glass', 0.3, 0.3, 0.3, 0.1, 20),
                    replaceItem('kubejs:cracked_glass')
                ]
            }
        ]
    },
    {
        inputItem: 'kubejs:cracked_glass',
        effects: [{
            spaceBetween: 2,
            events: [
                sound('block.glass.break', 1, 1),
                blockParticle('minecraft:block', 'minecraft:glass', 0.3, 0.3, 0.3, 0.1, 20),
                discard()
            ]
        }]
    },
    {
        inputItem: 'minecraft:tnt',
        effects: [{
            spaceBetween: 6,
            events: [
                sound('minecraft:entity.generic.explode', 1, 1),
                simpleParticle('minecraft:explosion', 0.5, 0.5, 0.5, 0.1, 10),
                explode(2, false, 'BREAK'),
                discard()
            ]
        }]
    },
    {
        inputItem: 'ae2:tiny_tnt',
        effects: [{
            spaceBetween: 6,
            events: [
                sound('minecraft:entity.generic.explode', 0.5, 1),
                simpleParticle('minecraft:explosion', 0, 0, 0, 0, 1),
                explode(1, false, 'DESTROY'),
                discard()
            ]
        }]
    },
    {
        inputItem: 'minecraft:gunpowder',
        effects: [{
            spaceBetween: 4,
            events: [
                sound('block.sand.place', 2, 2),
                blockParticle('minecraft:falling_dust', 'minecraft:gravel', 0.5, 0.3, 0.5, 0.1, 16),
                setBlock('minecraft:fire'),
                discard()
            ]
        }]
    }
]

function itemExists(id) {
    try {
        return Item.exists(id)
    } catch (error) {
        return false
    }
}

const fallItemsMap = {}
fallItemsConfig
    .filter(configEntry => itemExists(configEntry.inputItem) && configEntry.effects.every(effect =>
        effect.events.every(event => event.type !== 'replaceItem' || itemExists(event.item))
    ))
    .forEach(configEntry => {
        fallItemsMap[configEntry.inputItem] = configEntry.effects.slice().sort((a, b) => b.spaceBetween - a.spaceBetween)
    })

const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $BlockParticleOption = Java.loadClass('net.minecraft.core.particles.BlockParticleOption')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const $Optional = Java.loadClass('java.util.Optional')
const $Float = Java.loadClass('java.lang.Float')
const $FallingItemBoolean = Java.loadClass('java.lang.Boolean')
const $ExplosionProperties = Java.loadClass('dev.latvian.mods.kubejs.level.ExplosionProperties')
const $ExplosionInteraction = Java.loadClass('net.minecraft.world.level.Level$ExplosionInteraction')

function resourceLocation(id) {
    const separator = id.indexOf(':')
    const namespace = separator >= 0 ? id.substring(0, separator) : 'minecraft'
    const path = separator >= 0 ? id.substring(separator + 1) : id
    return $ResourceLocation.fromNamespaceAndPath(namespace, path)
}

const soundCache = {}
const particleCache = {}
const blockParticleCache = {}

function getSoundEvent(id) {
    if (!soundCache[id]) soundCache[id] = $BuiltInRegistries.SOUND_EVENT.get(resourceLocation(id))
    return soundCache[id]
}

function getSimpleParticle(id) {
    if (!particleCache[id]) particleCache[id] = $BuiltInRegistries.PARTICLE_TYPE.get(resourceLocation(id))
    return particleCache[id]
}

function getBlockParticleOptions(type, blockId) {
    if (typeof Block.exists === 'function' && !Block.exists(blockId)) return null
    const cacheKey = type + ':' + blockId
    if (!blockParticleCache[cacheKey]) {
        const block = Block.getBlock(blockId)
        if (!block) return null
        const particleType = type === 'minecraft:falling_dust' ? $ParticleTypes.FALLING_DUST : $ParticleTypes.BLOCK
        blockParticleCache[cacheKey] = new $BlockParticleOption(particleType, block.defaultBlockState())
    }
    return blockParticleCache[cacheKey]
}

function resolveParticleOptions(config) {
    if (config.particleType === 'minecraft:falling_dust' || config.particleType === 'minecraft:block') {
        return getBlockParticleOptions(config.particleType, config.data)
    }
    return getSimpleParticle(config.particleType)
}

function selectBestEffect(effects, fallDistance) {
    for (let index = 0; index < effects.length; index++) {
        if (effects[index].spaceBetween <= fallDistance) return effects[index]
    }
    return null
}

function getBlockStateForPlacement(id) {
    try {
        const block = Block.getBlock(id)
        if (block) return block.defaultBlockState()
    } catch (error) {
        // Try the fluid registry below when this is not a block id.
    }

    try {
        if (typeof Fluid.exists === 'function' && !Fluid.exists(id)) return null
        const fluid = typeof Fluid.getType === 'function' ? Fluid.getType(id) : Fluid.getFluid(id)
        if (fluid) return fluid.defaultFluidState().createLegacyBlock()
    } catch (error) {
        return null
    }
    return null
}

function applyEvent(entity, event, fallDistance) {
    switch (event.type) {
        case 'sound': {
            const soundEvent = getSoundEvent(event.id)
            if (soundEvent) entity.level.playSound(null, entity.x, entity.y, entity.z, soundEvent, 'blocks', event.volume, event.pitch)
            break
        }
        case 'particle': {
            const options = resolveParticleOptions(event)
            if (!options) break
            const distance = Math.max(fallDistance, 1)
            const factorXZ = Math.pow(distance, 0.25)
            const factorY = Math.pow(distance, 0.15)
            entity.level.sendParticles(
                options,
                entity.x,
                entity.y + 0.2,
                entity.z,
                event.count,
                event.dx * factorXZ,
                event.dy * factorY,
                event.dz * factorXZ,
                event.speed * factorXZ
            )
            break
        }
        case 'explosion': {
            const mode = event.explosionMode === 'BREAK'
                ? $ExplosionInteraction.TNT
                : event.explosionMode === 'DESTROY'
                    ? $ExplosionInteraction.BLOCK
                    : $ExplosionInteraction.NONE
            const properties = new $ExplosionProperties(
                null,
                null,
                null,
                $Optional.of($Float.valueOf(event.strength)),
                $Optional.of($FallingItemBoolean.valueOf(event.causesFire)),
                mode,
                $Optional.of($FallingItemBoolean.TRUE),
                null,
                null,
                null
            )
            entity.level.explode(entity.x, entity.y, entity.z, properties)
            break
        }
        case 'setBlock': {
            const blockState = getBlockStateForPlacement(event.block)
            if (!blockState) break
            const position = new $BlockPos(Math.floor(entity.x), Math.floor(entity.y), Math.floor(entity.z))
            entity.level.setBlockAndUpdate(position, blockState)
            break
        }
        case 'replaceItem':
            entity.item = Item.of(event.item, entity.item.count)
            break
        case 'discard':
            entity.discard()
            break
    }
}

function applyEffect(entity, effect, fallDistance) {
    effect.events.forEach(event => applyEvent(entity, event, fallDistance))
}

let trackedItems = []

EntityEvents.spawned('item', event => {
    const entity = event.entity
    const effects = fallItemsMap[entity.item.id]
    if (!effects) return

    trackedItems.push({
        entity: entity,
        dimension: String(entity.level.dimension),
        startY: entity.y,
        effects: effects
    })
})

ServerEvents.tick(() => {
    const tick = typeof globalTickCounter === 'number' ? globalTickCounter : 0
    if (tick % 2) return

    let compactNeeded = false
    for (let index = trackedItems.length - 1; index >= 0; index--) {
        let data = trackedItems[index]
        let entity = data.entity

        if (!entity || !entity.isAlive() || entity.isRemoved()) {
            trackedItems[index] = null
            compactNeeded = true
            continue
        }

        if (!entity.onGround()) continue

        let fallDistance = Math.abs(data.startY - entity.y)
        let effect = selectBestEffect(data.effects, fallDistance)
        if (effect) applyEffect(entity, effect, fallDistance)

        trackedItems[index] = null
        compactNeeded = true
    }

    if (compactNeeded) trackedItems = trackedItems.filter(item => item !== null)
})

LevelEvents.unloaded(event => {
    const unloadedDimension = String(event.level.dimension)
    trackedItems = trackedItems.filter(data => data.dimension !== unloadedDimension)
})
