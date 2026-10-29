// Hammers

const $HammerAttributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
const $HammerEquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')
const $HammerLivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $HammerMobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')
const $HammerMobEffects = Java.loadClass('net.minecraft.world.effect.MobEffects')
const $HammerParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
const $HammerPlayer = Java.loadClass('net.minecraft.world.entity.player.Player')
const $HammerResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $HammerRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $HammerSounds = Java.loadClass('net.quiwh.cwi.sound.CwiSounds')
const $HammerSoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')
const $HammerSoundSource = Java.loadClass('net.minecraft.sounds.SoundSource')

global.hammers = [
    ['bronze_hammer', 'bronze', 12, 3, 4],
    ['industrial_iron_hammer', 'industrial_iron', 13, 3, 4],
    ['brass_hammer', 'brass', 13, 2, 3],
    ['steel_hammer', 'steel', 11, 3, 5],
    ['stainless_steel_hammer', 'stainless_steel', 10, 3, 6],
    ['iron_hammer', 'iron', 14, 3, 2],
    ['rusted_iron_hammer', 'rusted_iron', 16, 2, 1],
    ['stone_hammer', 'stone', 18, 1, 0],
    ['golden_hammer', 'gold', 8, 1, 0],
    ['zinc_hammer', 'zinc', 9, 1, 2],
    ['copper_hammer', 'copper', 15, 2, 1],
    ['lead_hammer', 'lead', 21, 1, 5],
    ['netherite_hammer', 'netherite', 9, 3, 0]
]

StartupEvents.registry('item', event => {
    global.hammers.forEach(([name, tier, requiredCharge, maxStage, attackDamageBaseline]) => {
        let hammer = event.create('minecraft:' + name, 'hammer')
            .tier(tier)
            .attackDamageBaseline(3 + attackDamageBaseline)
            .chargeTime(requiredCharge)
            .maxStage(maxStage)
            .unstackable()
            .tag('minecraft:hammers')
            .tag('forge:tools')
            .tag('minecraft:breaks_decorated_pots')
            .texture(`kubejs:item/tools/${name}`)

        if (name === 'stone_hammer') hammer.chargedTexture(1, 'kubejs:item/tools/charged_stone_hammer')

        if (name === 'lead_hammer') {
            hammer.afterImpact(impact => {
            // The Original Neurotoxin Requires Its Effect Provider To Be Installed

                let effect = $HammerRegistries.MOB_EFFECT.getHolder($HammerResourceLocation.parse('clanginghowl:neurotoxin'))
                if (effect.isEmpty()) return

                impact.target.addEffect(new $HammerMobEffectInstance(effect.get(), Math.round(Math.sqrt(impact.stage) * (100 + Math.random() * 100)), Math.round(Math.random() * 0.7), true, true))
            })
        }
    })

    event.create('minecraft:hammer_1')
    event.create('minecraft:hammer_2')
    event.create('minecraft:hammer_3')

    event.create('steel_pipe', 'hammer')
        .chargeModels(false)
        .tier('steel')
        .attackDamageBaseline(3)
        .chargeTime(40)
        .maxStage(3)
        .unstackable()
        .tag('forge:tools')
        .tag('minecraft:breaks_decorated_pots')
        .releaseUsing((itemStack, level, player, durationLeft) => {
            const stage = Math.min(Math.floor((100000 - durationLeft) / 40), 3)
            if (stage < 1 || level.isClientSide() || !(player instanceof $HammerPlayer)) return

            level.playSound(null, player.x, player.y, player.z, $HammerSoundEvents.TRIDENT_THROW, $HammerSoundSource.PLAYERS, 1, 1)
            const hit = player.rayTrace(5)
            if (!hit || !(hit.entity instanceof $HammerLivingEntity)) return

            const target = hit.entity
            const multiplier = Math.sqrt(stage)
            const targetY = target.y + target.getBbHeight() / 2
            target.attack(player.damageSources().playerAttack(player), player.getAttributeValue($HammerAttributes.ATTACK_DAMAGE) * stage)
            target.addEffect(new $HammerMobEffectInstance($HammerMobEffects.MOVEMENT_SLOWDOWN, 5 * stage, 255, true, true))
            target.addMotion(0, multiplier, 0)
            level.playSound(null, target.x, targetY, target.z, $HammerSounds.STEEL_PIPE.get(), $HammerSoundSource.NEUTRAL, 0.8 * multiplier, 1)
            level.sendParticles($HammerParticleTypes.CRIT, target.x, targetY, target.z, 16 * stage, 0.2, 0.2, 0.2, 0.6 * multiplier)
            player.getCooldowns().addCooldown(itemStack.getItem(), Math.floor(40 * multiplier))
            itemStack.hurtAndBreak(stage, player, player.getUsedItemHand().name() === 'MAIN_HAND' ? $HammerEquipmentSlot.MAINHAND : $HammerEquipmentSlot.OFFHAND)
        })
})
