// Keep the old base + looting level chance, including levels above Looting III.
const linearLootingChance = (chance) => {
    return {
        condition: 'minecraft:random_chance_with_enchanted_bonus',
        unenchanted_chance: chance,
        enchanted_chance: {
            type: 'minecraft:linear',
            base: chance + 1,
            per_level_above_first: 1
        },
        enchantment: 'minecraft:looting'
    }
}

// LootJS 3 checks a group's conditions before its actions. Nested groups keep
// earlier guaranteed drops and each successful bonus when a later chance fails.
LootJS.modifiers((event) => {

// Entity: Squid

    event.addTableModifier("minecraft:entities/squid")
        .removeLoot("minersdelight:squid")
        .addLoot("minersdelight:squid")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.9))
                .addLoot("minersdelight:tentacles")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.7))
                        .addLoot("minersdelight:tentacles")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.5))
                                .addLoot("minersdelight:tentacles")
                                .group(bonus4 => {
                                    bonus4.matchCustomCondition(linearLootingChance(0.3))
                                        .addLoot("minersdelight:tentacles")
                                })
                        })
                })
        })

    event.addTableModifier("minecraft:entities/squid")
        .matchMainHand("#farmersdelight:tools/knives")
        .matchCustomCondition(linearLootingChance(0.9))
        .addLoot("minersdelight:tentacles")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minersdelight:tentacles")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.5))
                        .addLoot("minersdelight:tentacles")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.3))
                                .addLoot("minersdelight:tentacles")
                        })
                })
        })

// Entity: Glow Squid

    event.addTableModifier("minecraft:entities/glow_squid")
        .matchCustomCondition(linearLootingChance(0.9))
        .addLoot("minersdelight:tentacles")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minersdelight:tentacles")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.5))
                        .addLoot("minersdelight:tentacles")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.3))
                                .addLoot("minersdelight:tentacles")
                        })
                })
        })

    event.addTableModifier("minecraft:entities/glow_squid")
        .matchMainHand("#farmersdelight:tools/knives")
        .matchCustomCondition(linearLootingChance(0.9))
        .addLoot("minersdelight:tentacles")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minersdelight:tentacles")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.5))
                        .addLoot("minersdelight:tentacles")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.3))
                                .addLoot("minersdelight:tentacles")
                        })
                })
        })

// Entity: Silverfish

    event.addTableModifier("minecraft:entities/silverfish")
        .removeLoot("minersdelight:silverfish_eggs")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.5))
                .addLoot("minersdelight:silverfish_eggs")
        })

    event.addTableModifier("minecraft:entities/silverfish")
        .matchMainHand("#farmersdelight:tools/knives")
        .matchCustomCondition(linearLootingChance(0.7))
        .addLoot("minersdelight:silverfish_eggs")

// Entity: Spider

    event.addTableModifier("minecraft:entities/spider")
        .removeLoot("minersdelight:arthropod")
        .removeLoot("minecraft:spider_eye")
        .removeLoot("minecraft:string")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("minecraft:spider_eye")
        })

    event.addTableModifier("minecraft:entities/spider")
        .addLoot("minecraft:string")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minecraft:string")
        })

    event.addTableModifier("minecraft:entities/spider")
        .matchMainHand("#farmersdelight:tools/knives")
        .matchCustomCondition(linearLootingChance(0.7))
        .addLoot("minecraft:string")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minecraft:string")
        })

// Entity: Cave Spider

    event.addTableModifier("minecraft:entities/cave_spider")
        .removeLoot("minersdelight:arthropod")
        .removeLoot("minecraft:spider_eye")
        .removeLoot("minecraft:string")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("minecraft:spider_eye")
        })

    event.addTableModifier("minecraft:entities/cave_spider")
        .addLoot("minecraft:string")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minecraft:string")
        })

    event.addTableModifier("minecraft:entities/cave_spider")
        .matchMainHand("#farmersdelight:tools/knives")
        .matchCustomCondition(linearLootingChance(0.7))
        .addLoot("minecraft:string")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minecraft:string")
        })

// Entity: Bat

    event.addTableModifier("minecraft:entities/bat")
        .removeLoot("minersdelight:bat_wing")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minersdelight:bat_wing")
        })

    event.addTableModifier("minecraft:entities/bat")
        .matchMainHand("#farmersdelight:tools/knives")
        .matchCustomCondition(linearLootingChance(0.7))
        .addLoot("minersdelight:bat_wing")

// Blocks: Dead Leaves

    event.addBlockModifier('kubejs:dead_leaves')
        .replaceLoot('kubejs:dead_leaves', 'minecraft:stick')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("minecraft:stick")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.7))
                        .addLoot("minecraft:stick")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.5))
                                .addLoot("minecraft:stick")
                        })
                })
        })

// Blocks: Stone Variants (Replace With Cobbled)

    event.addBlockModifier('minecraft:granite')
        .replaceLoot('minecraft:granite', 'kubejs:cobbled_granite')

    event.addBlockModifier('minecraft:granite')
        .replaceLoot('minecraft:granite', 'kubejs:cobbled_granite')

    event.addBlockModifier('minecraft:diorite')
        .replaceLoot('minecraft:diorite', 'kubejs:cobbled_diorite')

    event.addBlockModifier('minecraft:andesite')
        .replaceLoot('minecraft:andesite', 'kubejs:cobbled_andesite')

    event.addBlockModifier('minecraft:basalt')
        .replaceLoot('minecraft:basalt', 'kubejs:cobbled_basalt')

    event.addBlockModifier('kubejs:claystone')
        .replaceLoot('kubejs:claystone', 'kubejs:cobbled_claystone')

    event.addBlockModifier('kubejs:schist')
        .replaceLoot('kubejs:schist', 'kubejs:cobbled_schist')

    event.addBlockModifier('kubejs:gneiss')
        .replaceLoot('kubejs:gneiss', 'kubejs:cobbled_gneiss')

    event.addBlockModifier('kubejs:rhyolite')
        .replaceLoot('kubejs:rhyolite', 'kubejs:cobbled_rhyolite')

    event.addBlockModifier('kubejs:shale')
        .replaceLoot('kubejs:shale', 'kubejs:cobbled_shale')

    event.addBlockModifier('kubejs:conglomerate')
        .replaceLoot('kubejs:conglomerate', 'kubejs:cobbled_conglomerate')

    event.addBlockModifier('kubejs:phyllite')
        .replaceLoot('kubejs:phyllite', 'kubejs:cobbled_phyllite')

    event.addBlockModifier('kubejs:quartzite')
        .replaceLoot('kubejs:quartzite', 'kubejs:cobbled_quartzite')

    event.addBlockModifier('kubejs:crystalized_phyllite')
        .replaceLoot('kubejs:crystalized_phyllite', 'kubejs:cobbled_phyllite')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("kubejs:crystallum_coccus")
        })

    event.addBlockModifier('kubejs:quartzite_deepslate')
        .replaceLoot('minecraft:deepslate', 'minecraft:cobbled_deepslate')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.5))
                .addLoot("kubejs:quartzite_powder")
        })

// Blocks: Ashen Depleted Dirt

    event.addBlockModifier('kubejs:ashen_depleted_dirt')
        .replaceLoot('kubejs:ashen_depleted_dirt', 'kubejs:depleted_dirt')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.7))
                .addLoot("kubejs:dark_ash")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.5))
                        .addLoot("kubejs:dark_ash")
                })
        })

// Blocks: Ash Dirt

    event.addBlockModifier('kubejs:ash_dirt')
        .replaceLoot('kubejs:ash_dirt', 'kubejs:dark_ash')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.9))
                .addLoot("kubejs:dark_ash")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.7))
                        .addLoot("kubejs:dark_ash")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.5))
                                .addLoot("kubejs:dark_ash")
                        })
                })
        })

// Blocks: Ash Stone

    event.addBlockModifier('kubejs:ash_stone')
        .replaceLoot('kubejs:ash_stone', 'kubejs:ash')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.9))
                .addLoot("kubejs:ash")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.7))
                        .addLoot("kubejs:ash")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.5))
                                .addLoot("kubejs:ash")
                        })
                })
        })

// Blocks: Dark Ash Stone

    event.addBlockModifier('kubejs:dark_ash_stone')
        .replaceLoot('kubejs:dark_ash_stone', 'kubejs:dark_ash')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.9))
                .addLoot("kubejs:dark_ash")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.7))
                        .addLoot("kubejs:dark_ash")
                        .group(bonus3 => {
                            bonus3.matchCustomCondition(linearLootingChance(0.5))
                                .addLoot("kubejs:dark_ash")
                        })
                })
        })

// Blocks: Scrap Block (Multiple Modifiers)

    event.addBlockModifier('kubejs:scrap_block')
        .removeLoot("kubejs:scrap_block")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.45))
        .addLoot("tfmg:screw")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.45))
        .addLoot("tfmg:screw")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_sheet")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_rod")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_ingot")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_wire")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.25))
        .addLoot("tfmg:rebar")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.25))
        .addLoot("tfmg:rebar")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.25))
        .addLoot("tfmg:rebar")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:ash")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:ash")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:ash")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.75))
        .addLoot("kubejs:rubber")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.75))
        .addLoot("kubejs:rubber")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.75))
        .addLoot("kubejs:rubber")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.75))
        .addLoot("tfmg:synthetic_string")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.75))
        .addLoot("tfmg:synthetic_string")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.75))
        .addLoot("tfmg:synthetic_string")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.45))
        .addLoot("tfmg:synthetic_leather")

    event.addBlockModifier('kubejs:scrap_block')
        .matchCustomCondition(linearLootingChance(0.45))
        .addLoot("tfmg:synthetic_leather")

// Repeated block (original duplication)

    event.addBlockModifier('kubejs:small_scrap_block')
        .removeLoot("kubejs:small_scrap_block")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_sheet")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_rod")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_ingot")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.3))
        .addLoot("kubejs:rusted_iron_wire")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.25))
        .addLoot("tfmg:rebar")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.25))
        .addLoot("tfmg:rebar")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.25))
        .addLoot("tfmg:rebar")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:ash")

    event.addBlockModifier('kubejs:small_scrap_block')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:ash")

// Blocks: Dark Ash Stone Quartz

    event.addBlockModifier('kubejs:dark_ash_stone_quartz')
        .replaceLoot('kubejs:dark_ash_stone_quartz', 'kubejs:dark_ash')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.9))
                .addLoot("kubejs:dark_ash")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.5))
                        .addLoot("kubejs:dark_ash")
                })
        })

    event.addBlockModifier('kubejs:dark_ash_stone_quartz')
        .addLoot("minecraft:quartz")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("minecraft:quartz")
        })

    event.addBlockModifier('kubejs:dark_ash_stone_quartz')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:quartz_powder")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("kubejs:quartz_powder")
        })

// Blocks: Dark Ash Stone Coal

    event.addBlockModifier('kubejs:dark_ash_stone_coal')
        .replaceLoot('kubejs:dark_ash_stone_coal', 'kubejs:dark_ash')
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.9))
                .addLoot("kubejs:dark_ash")
                .group(bonus2 => {
                    bonus2.matchCustomCondition(linearLootingChance(0.5))
                        .addLoot("kubejs:dark_ash")
                })
        })

    event.addBlockModifier('kubejs:dark_ash_stone_coal')
        .addLoot("minecraft:coal")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("minecraft:coal")
        })

    event.addBlockModifier('kubejs:dark_ash_stone_coal')
        .matchCustomCondition(linearLootingChance(0.5))
        .addLoot("kubejs:coal_powder")
        .group(bonus1 => {
            bonus1.matchCustomCondition(linearLootingChance(0.3))
                .addLoot("kubejs:coal_powder")
        })

})

LootJS.modifiers((event) => {

    event.addBlockModifier(`kubejs:small_pile_of_shafts`)
        .replaceLoot(`kubejs:small_pile_of_shafts`, 'create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')

    event.addBlockModifier(`kubejs:pile_of_shafts`)
        .replaceLoot(`kubejs:pile_of_shafts`, 'create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')

    event.addBlockModifier(`kubejs:large_pile_of_shafts`)
        .replaceLoot(`kubejs:large_pile_of_shafts`, 'create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')
        .addLoot('create:shaft')

    global.pipePileDefinitions.forEach(([pipeId, texturePath, hardness, resistance, soundType, miningType, toolLevel, pipes]) => {
        event.addBlockModifier(`kubejs:small_pile_of_${pipeId}_pipes`)
        .replaceLoot(`kubejs:small_pile_of_${pipeId}_pipes`, pipes)
        .addLoot(pipes)
        event.addBlockModifier(`kubejs:pile_of_${pipeId}_pipes`)
        .replaceLoot(`kubejs:pile_of_${pipeId}_pipes`, pipes)
        .addLoot(pipes)
        .addLoot(pipes)
        event.addBlockModifier(`kubejs:large_pile_of_${pipeId}_pipes`)
        .replaceLoot(`kubejs:large_pile_of_${pipeId}_pipes`, pipes)
        .addLoot(pipes)
        .addLoot(pipes)
        .addLoot(pipes)
    })

// OreTypeLoot

    global.oreTypes.forEach(([oreVariants, dropOreId, crushedOreId, powderOreId, isMore]) => {
        const dropCounts = isMore ? 3 : 2

        Object.values(global.variantSettings).forEach(ore => {
            const type = ore.type
            if (oreVariants[type]) {
                const builder = event.addBlockModifier(oreVariants[type])

                builder.dropExperience(0)
                builder.removeLoot(oreVariants[type])
                builder.removeLoot(dropOreId)

                for (let i = 0; i < dropCounts; i++) {
                    builder.addLoot(dropOreId)
                }

                builder.group(extraOre => {
                    extraOre.matchCustomCondition(linearLootingChance(ore.dropChance))
                        .addLoot(dropOreId)
                        .group(firstDust => {
                            firstDust.matchCustomCondition(linearLootingChance(0.35))
                                .addLoot(ore.dust)
                                .group(secondDust => {
                                    secondDust.matchCustomCondition(linearLootingChance(0.25))
                                        .addLoot(ore.dust)
                                })
                        })
                })
            }
        })
    })

    Object.values(global.compoundOreTypes).forEach(ore => {
        const oreId = `${ore.mod}:${ore.realId}`
        const depositOreId = `kubejs:${ore.id}_deposit`

        event.addBlockModifier(depositOreId)
            .replaceLoot(depositOreId, oreId)
            .addLoot(oreId)
            .addLoot(oreId)
            .group(bonus1 => {
                bonus1.matchCustomCondition(linearLootingChance(0.5))
                    .addLoot(oreId)
            })
    })

// Additional Fix

    event.addBlockModifier('minecraft:redstone_ore').removeLoot('minecraft:redstone')
    event.addBlockModifier('minecraft:deepslate_redstone_ore').removeLoot('minecraft:redstone')

})
