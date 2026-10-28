// priority: 2

const $ArmorType = Java.loadClass('net.minecraft.world.item.ArmorItem$Type')
const $HashMap = Java.loadClass('java.util.HashMap')

function armorDefense(boots, leggings, chestplate, helmet) {
    const defense = new $HashMap()
    defense.put($ArmorType.BOOTS, boots)
    defense.put($ArmorType.LEGGINGS, leggings)
    defense.put($ArmorType.CHESTPLATE, chestplate)
    defense.put($ArmorType.HELMET, helmet)
    return defense
}

function armorMaterial(event, name, defense, toughness, knockbackResistance, repair) {
    const repairIngredient = repair.startsWith('kubejs:')
        ? `#cwi:${name}_ingots`
        : repair
    event.create(name)
        .defense(defense)
        .enchantmentValue(0)
        .repairIngredient(() => Ingredient.of(repairIngredient))
        .toughness(toughness)
        .knockbackResistance(knockbackResistance)
}

StartupEvents.registry('armor_material', event => {
    armorMaterial(event, 'bronze', armorDefense(3, 6, 8, 3), 1, 0.05, 'kubejs:bronze_ingot')
    armorMaterial(event, 'steel', armorDefense(4, 8, 10, 4), 2, 0.15, 'tfmg:steel_ingot')
    armorMaterial(event, 'stainless_steel', armorDefense(5, 9, 11, 5), 3, 0.2, 'kubejs:stainless_steel_ingot')
})

// Armors
StartupEvents.registry('item', event => {
    const armors = ['bronze', 'steel', 'stainless_steel']
    const equipments = ['helmet', 'chestplate', 'leggings', 'boots']
    const durabilityMultipliers = {
        bronze: 51,
        steel: 78,
        stainless_steel: 97
    }
    const slotDurability = {
        helmet: 11,
        chestplate: 16,
        leggings: 15,
        boots: 13
    }
    
    armors.forEach(mat => {
        equipments.forEach(part => {
            event.create(`${mat}_${part}`, part)
                .material(`kubejs:${mat}`)
                .maxDamage(slotDurability[part] * durabilityMultipliers[mat])
                .texture(`kubejs:item/armors/${mat}_${part}`)
                .unstackable()

        })
    })
})

// Tools
StartupEvents.registry('item', event => {
    const stats = {
        stainless_steel: {sword:9, axe:12, pickaxe:6.5, shovel:7,   hoe:1},
        steel:           {sword:8, axe:11, pickaxe:6,   shovel:6.5, hoe:1},
        bronze:          {sword:7, axe:10, pickaxe:5,   shovel:5.5, hoe:1},
        industrial_iron: {sword:7, axe:10, pickaxe:5,   shovel:5.5, hoe:1},
        brass:           {sword:6, axe:9,  pickaxe:4,   shovel:4.5, hoe:1},
        zinc:            {sword:5, axe:8,  pickaxe:3.5, shovel:4,   hoe:1},
        copper:          {sword:5, axe:8,  pickaxe:3.5, shovel:4,   hoe:1},
        lead:            {sword:8, axe:11, pickaxe:6,   shovel:6.5, hoe:1},
        rusted_iron:     {sword:4, axe:7,  pickaxe:3,   shovel:3.5, hoe:1}
    }
    Object.entries(stats).forEach(([material, tools]) => {
        Object.entries(tools).forEach(([tool, dmg]) => {
            event.create(`${material}_${tool}`, tool)
                .texture(`kubejs:item/tools/${material}_${tool}`)
                .tier(material)
                .attackDamageBaseline(dmg)
                .unstackable()
                .tag(`minecraft:${tool}s`)
        })
    })
})

// ToolTiers
ItemEvents.toolTierRegistry(event => {
    const tiers = {
        steel:           [1257, 10, 3, 0, 'tfmg:steel_ingot'],
        stainless_steel: [1593, 11, 4, 0, 'kubejs:stainless_steel_ingot'],
        bronze:          [861,  8,  2, 0, 'kubejs:bronze_ingot'],
        industrial_iron: [927,  9,  2, 0, 'kubejs:industrial_iron_ingot'],
        brass:           [673,  7,  2, 0, 'create:brass_ingot'],
        zinc:            [187,  5,  1, 0, 'create:zinc_ingot'],
        copper:          [381,  5,  2, 0, 'minecraft:copper_ingot'],
        lead:            [154,  1,  2, 0, 'tfmg:lead_ingot'],
        rusted_iron:     [287,  4,  2, 0, 'kubejs:rusted_iron_ingot']
    }
    Object.entries(tiers).forEach(([name,[uses,speed,level,bonus,repair]]) => {
        event.add(name, tier => {
            const miningTiers = ['wooden', 'stone', 'iron', 'diamond', 'netherite']
            tier.setUses(uses)
            tier.setSpeed(speed)
            tier.setAttackDamageBonus(bonus)
            tier.setIncorrectBlocksForDropsTag(`minecraft:incorrect_for_${miningTiers[level]}_tool`)
            tier.setEnchantmentValue(0)
            const repairIngredient = repair.startsWith('kubejs:')
                ? `#cwi:${name}_ingots`
                : repair
            tier.setRepairIngredient(Ingredient.of(repairIngredient))
        })
    })
})

// Misc
const $ShieldItem = Java.loadClass('net.minecraft.world.item.ShieldItem')
const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')

StartupEvents.registry('item', event => {

    event.createCustom('steel_shield', () => { return new $ShieldItem(new $ItemProperties().durability(1257))})
    event.createCustom('stainless_steel_shield', () => { return new $ShieldItem(new $ItemProperties().durability(1593))})

    event.create('small_hammer')
        .unstackable()
        .maxDamage(143)

    event.create('whetstone')
        .unstackable()
        .maxDamage(37)
        .texture('kubejs:item/whetstone/whetstone')

    event.create('fine_whetstone')
        .unstackable()
        .maxDamage(73)
        .texture('kubejs:item/whetstone/fine_whetstone')

    event.create('incomplete_whetstone', 'create:sequenced_assembly')
        .unstackable()
        .texture('kubejs:item/whetstone/incomplete_whetstone')

    event.create('incomplete_fine_whetstone', 'create:sequenced_assembly')
        .unstackable()
        .texture('kubejs:item/whetstone/incomplete_fine_whetstone')

    event.create('carbon-sealed_quartzite_base')
        .unstackable()
        .texture('kubejs:item/whetstone/carbon-sealed_quartzite_base')

    event.create('incomplete_quartzite_base', 'create:sequenced_assembly')
        .unstackable()
        .texture('kubejs:item/whetstone/incomplete_quartzite_base')

    event.create('lapped_quartzite_base')
        .unstackable()
        .texture('kubejs:item/whetstone/lapped_quartzite_base')
})
