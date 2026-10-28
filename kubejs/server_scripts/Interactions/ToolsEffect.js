// Clanging Howl is optional in this instance. Keep the interaction dormant
// unless the item/effect provider is actually loaded.
if (Platform.isLoaded('clanginghowl')) {
    const industrialWrenchId = 'clanginghowl:industrial_adjustable_wrench'
    let hasIndustrialWrench = false
    try {
        hasIndustrialWrench = Item.exists(industrialWrenchId)
    } catch (error) {
        hasIndustrialWrench = false
    }
    const hasCreateAddition = Platform.isLoaded('createaddition')

    EntityEvents.hurt(event => {
        const { entity, source } = event
        const player = source.getPlayer()
        if (!player) return

        const item = player.mainHandItem
        const isIndustrialWrench = hasIndustrialWrench && item.id === industrialWrenchId
        const isNeurotoxinItem = item.hasTag('cwi:neurotoxin')
        if (!isIndustrialWrench && !isNeurotoxinItem) return

        const level = entity.level

        if (isIndustrialWrench) {
            if (hasCreateAddition) {
                entity.potionEffects.add('createaddition:shocking', 30, 0, true, true)
            }
            level.playSound(null, entity.x, entity.y + entity.getBbHeight() / 2, entity.z, 'clanginghowl:electric_shock', 'players', 0.5, 2)
            level.sendParticles('minecraft:electric_spark', entity.x, entity.y + entity.getBbHeight() / 2, entity.z, 5, 0.4, 0.3, 0.4, 0)
            if (Platform.isLoaded('create_rns')) {
                level.sendParticles('create_rns:stabilizing_resonance', entity.x, entity.y + entity.getBbHeight() / 2 - 1, entity.z, 5, 0.4, 0.3, 0.4, 0)
            }
        }

        if (isNeurotoxinItem) {
            if (item.hasTag('cwi:neurotoxin_lv2')) {
                if (random(0, 1) > 0.6) {
                    entity.potionEffects.add('clanginghowl:neurotoxin', Math.round(random(0, 200)), Math.round(random(0, 0.7)), true, true)
                }
            } else if (random(0, 1) > 0.8) {
                entity.potionEffects.add('clanginghowl:neurotoxin', Math.round(random(0, 100)), 0, true, true)
            }
        }
    })
}
