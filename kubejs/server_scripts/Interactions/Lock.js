// Constants

const UNLOCKED = -1
const LOCKED = 1

// Basic Weapon Lockpicking Configs

const lockPickConfigs = {}
const lockPickToolChances = {
    sword: 0.2,
    axe: 0.4,
    pickaxe: 0.5,
    shovel: 0.3,
    hoe: 0.3
}

function lockItemExists(id) {
    try {
        return Item.exists(id)
    } catch (error) {
        return false
    }
}

function addLockPickConfigs(namespace, materials) {
    materials.forEach(material => {
        Object.keys(lockPickToolChances).forEach(tool => {
            const id = `${namespace}:${material}_${tool}`
            if (lockItemExists(id)) lockPickConfigs[id] = { successChance: lockPickToolChances[tool], durabilityCost: 3 }
        })
    })
}

addLockPickConfigs('minecraft', [
    'wooden',
    'stone',
    'iron',
    'golden',
    'diamond',
    'netherite'
])

addLockPickConfigs('kubejs', [
    'rusted_iron',
    'lead',
    'copper',
    'zinc',
    'brass',
    'bronze',
    'steel',
    'stainless_steel'
])

addLockPickConfigs('ae2', [
    'nether_quartz',
    'certus_quartz',
    'fluix'
])

if (lockItemExists('clanginghowl:advanced_chainsword')) {
    lockPickConfigs['clanginghowl:advanced_chainsword'] = { successChance: 1.0, durabilityCost: 3 }
}

// Core Lockpicking Event

function lockpickingFunction(player, block, level, event) {
    const blockEntityData = block.entityData
    if (!blockEntityData || !blockEntityData.LootTable) return

    const mainHand = player.getMainHandItem()
    const blockEntity = block.getEntity()
    if (!blockEntity) return
    const chestData = blockEntity.persistentData

    if (!chestData.contains('Lock')) {
        chestData.putInt('Lock', LOCKED)
    }

    const lockValue = chestData.getInt('Lock')

    if (lockValue === UNLOCKED) {
        level.sendParticles('minecraft:falling_dust{block_state:"minecraft:gravel"}', block.x + 0.5, block.y + 0.8, block.z + 0.5, 12, 0.25, 0.1, 0.25, 0)
        level.sendParticles('minecraft:campfire_cosy_smoke', block.x + 0.5, block.y + 0.8, block.z + 0.5, 3, 0.25, 0.1, 0.25, 0)

        if (Math.random() < 0.1) {
            const silverfish = level.createEntity('minecraft:silverfish')
            silverfish.setPosition(block.x + 0.5 + Math.random() / 4, block.y + 0.9, block.z + 0.5 + Math.random() / 4)
            silverfish.spawn()
        }
        return
    }

    const config = lockPickConfigs[mainHand.id]
    if (!config) {
        player.setStatusMessage(Component.translate('message.cwi.no_lockpick'))
        level.playSound(null, block.x + 0.5, block.y + 0.5, block.z + 0.5, 'minecraft:block.chain.break', 'neutral', 1.0, 0.8)
        event.cancel()
        return
    }

    const success = Math.random() < config.successChance

    if (success) {
        chestData.putInt('Lock', UNLOCKED)
        player.setStatusMessage(Component.translate('message.cwi.lockpick_success'))
        level.playSound(null, block.x + 0.5, block.y + 0.5, block.z + 0.5, 'minecraft:block.note_block.bell', 'neutral', 2.0, 1.2)
    } else {
        player.setStatusMessage(Component.translate('message.cwi.lockpick_failure'))
    }

    player.damageHeldItem('main_hand', config.durabilityCost)
    level.playSound(null, block.x + 0.5, block.y + 0.5, block.z + 0.5, 'minecraft:block.iron_trapdoor.close', 'neutral', 2.0, 1.2)
    event.cancel()
}

BlockEvents.rightClicked('minecraft:chest', event => {
    const { player, block, level } = event
    lockpickingFunction(player, block, level, event)
})

BlockEvents.rightClicked('minecraft:barrel', event => {
    const { player, block, level } = event
    lockpickingFunction(player, block, level, event)
})
