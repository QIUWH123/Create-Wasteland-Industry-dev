const ash = 'kubejs:ash'
const boneFragments = Platform.isLoaded('biomancy') ? 'biomancy:bone_fragments' : 'minecraft:bone'
const GRENADE = [
    LootEntry.of('tfmg:copper_grenade').withWeight(100),
    LootEntry.of('tfmg:zinc_grenade').withWeight(100),
    LootEntry.of('tfmg:thermite_grenade').withWeight(100)
]

const BANNER_PATTERNS = [
    LootEntry.of('minecraft:flower_banner_pattern').withWeight(100),
    LootEntry.of('minecraft:creeper_banner_pattern').withWeight(100),
    LootEntry.of('minecraft:skull_banner_pattern').withWeight(100),
    LootEntry.of('minecraft:mojang_banner_pattern').withWeight(100),
    LootEntry.of('minecraft:globe_banner_pattern').withWeight(100),
    LootEntry.of('minecraft:piglin_banner_pattern').withWeight(100)
]

const POLISH_EQUIPMENTS = [
    LootEntry.of('kubejs:fine_whetstone').withWeight(10),
    LootEntry.of('kubejs:small_hammer').withWeight(10),
    LootEntry.of('kubejs:whetstone').withWeight(30),
    LootEntry.of('create:sand_paper').withWeight(50)
]

const BOWS = [
    LootEntry.of('minecraft:bow').withWeight(60),
    LootEntry.of('minecraft:crossbow').withWeight(40)
]

const SWORDS_RICH = [
    LootEntry.of('kubejs:zinc_sword').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_sword').withWeight(40),
    LootEntry.of('kubejs:copper_sword').withWeight(20),
    LootEntry.of('kubejs:lead_sword').withWeight(10),
    LootEntry.of('minecraft:iron_sword').withWeight(20)
]

const SWORDS_NORMAL = [
    LootEntry.of('minecraft:stone_sword').withWeight(30),
    LootEntry.of('kubejs:zinc_sword').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_sword').withWeight(50),
    LootEntry.of('kubejs:copper_sword').withWeight(10)
]

const SWORDS_POOR = [
    LootEntry.of('minecraft:wooden_sword').withWeight(25),
    LootEntry.of('minecraft:stone_sword').withWeight(75)
]

const AXES_RICH = [
    LootEntry.of('kubejs:zinc_axe').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_axe').withWeight(40),
    LootEntry.of('kubejs:copper_axe').withWeight(20),
    LootEntry.of('kubejs:lead_axe').withWeight(10),
    LootEntry.of('minecraft:iron_axe').withWeight(20)
]

const AXES_NORMAL = [
    LootEntry.of('minecraft:stone_axe').withWeight(30),
    LootEntry.of('kubejs:zinc_axe').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_axe').withWeight(50),
    LootEntry.of('kubejs:copper_axe').withWeight(10)
]

const AXES_POOR = [
    LootEntry.of('minecraft:wooden_axe').withWeight(25),
    LootEntry.of('minecraft:stone_axe').withWeight(75)
]

const PICKAXES_RICH = [
    LootEntry.of('kubejs:zinc_pickaxe').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_pickaxe').withWeight(40),
    LootEntry.of('kubejs:copper_pickaxe').withWeight(20),
    LootEntry.of('kubejs:lead_pickaxe').withWeight(10),
    LootEntry.of('minecraft:iron_pickaxe').withWeight(20)
]

const PICKAXES_NORMAL = [
    LootEntry.of('minecraft:stone_pickaxe').withWeight(30),
    LootEntry.of('kubejs:zinc_pickaxe').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_pickaxe').withWeight(50),
    LootEntry.of('kubejs:copper_pickaxe').withWeight(10)
]

const PICKAXES_POOR = [
    LootEntry.of('minecraft:wooden_pickaxe').withWeight(25),
    LootEntry.of('minecraft:stone_pickaxe').withWeight(75)
]

const SHOVELS_RICH = [
    LootEntry.of('kubejs:zinc_shovel').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_shovel').withWeight(40),
    LootEntry.of('kubejs:copper_shovel').withWeight(20),
    LootEntry.of('kubejs:lead_shovel').withWeight(10),
    LootEntry.of('minecraft:iron_shovel').withWeight(20)
]

const SHOVELS_NORMAL = [
    LootEntry.of('minecraft:stone_shovel').withWeight(30),
    LootEntry.of('kubejs:zinc_shovel').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_shovel').withWeight(50),
    LootEntry.of('kubejs:copper_shovel').withWeight(10)
]

const SHOVELS_POOR = [
    LootEntry.of('minecraft:wooden_shovel').withWeight(25),
    LootEntry.of('minecraft:stone_shovel').withWeight(75)
]

const HOES_RICH = [
    LootEntry.of('kubejs:zinc_hoe').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_hoe').withWeight(40),
    LootEntry.of('kubejs:copper_hoe').withWeight(20),
    LootEntry.of('kubejs:lead_hoe').withWeight(10),
    LootEntry.of('minecraft:iron_hoe').withWeight(20)
]

const HOES_NORMAL = [
    LootEntry.of('minecraft:stone_hoe').withWeight(30),
    LootEntry.of('kubejs:zinc_hoe').withWeight(10),
    LootEntry.of('kubejs:rusted_iron_hoe').withWeight(50),
    LootEntry.of('kubejs:copper_hoe').withWeight(10)
]

const HOES_POOR = [
    LootEntry.of('minecraft:wooden_hoe').withWeight(25),
    LootEntry.of('minecraft:stone_hoe').withWeight(75)
]

const POTTERY_SHERDS = [
    LootEntry.of('minecraft:blade_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:explorer_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:heartbreak_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:snort_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:friend_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:mourner_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:arms_up_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:prize_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:brewer_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:skull_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:heart_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:danger_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:burn_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:shelter_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:angler_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:howl_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:miner_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:archer_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:sheaf_pottery_sherd').withWeight(100),
    LootEntry.of('minecraft:plenty_pottery_sherd').withWeight(100)
]

const SMITHING_TEMPLATES = [
    LootEntry.of('minecraft:sentry_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:vex_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:coast_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:ward_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:snout_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:wayfinder_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:shaper_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:raiser_armor_trim_smithing_template').withWeight(100),
    LootEntry.of('minecraft:host_armor_trim_smithing_template').withWeight(100),
]

// Keep Legacy Rolls Independent And Their Count And Damage Functions Isolated
LootJS.modifiers((event) => {
    const biomeRegistryKey = Java.loadClass('net.minecraft.core.registries.Registries').BIOME
    const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
    const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
    const ArrayList = Java.loadClass('java.util.ArrayList')
    const biomeHolders = new ArrayList()
    const biomeLookup = Java.loadClass('com.almostreliable.lootjs.LootJS').lookup().lookupOrThrow(biomeRegistryKey)
    const ashBiomes = ['cwi:smoldering_barren', 'cwi:molten_caves']

    ashBiomes.forEach(id => {
        biomeLookup.get(ResourceKey.create(biomeRegistryKey, ResourceLocation.parse(id)))
            .ifPresent(holder => biomeHolders.add(holder))
    })

    const darkAsh = LootEntry.of('kubejs:dark_ash')
        .matchBiome(Java.loadClass('net.minecraft.core.HolderSet')['direct(java.util.List)'](biomeHolders))

    event.addTableModifier('cwi:chests/food/rich')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cave_carrot')
                pool.apply(functions => {
                    functions.setCount([4, 9])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:baked_cave_carrot')
                pool.apply(functions => {
                    functions.setCount([3, 7])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:nutritional_bar')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:crunchy_bar')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:insect_stew_cup')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cooked_arthropod')
                pool.apply(functions => {
                    functions.setCount([1, 4])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:honey_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:glass_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:dried_kelp')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.75)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.01)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:name_tag')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.002)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/food/normal')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cave_carrot')
                pool.apply(functions => {
                    functions.setCount([3, 7])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:baked_cave_carrot')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:arthropod')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cooked_arthropod')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:silverfish_eggs')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:dried_kelp')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:spider_eye')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:glass_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:leather')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:feather')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:string')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/food/poor')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cave_carrot')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:baked_cave_carrot')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:arthropod')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cooked_arthropod')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:silverfish_eggs')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:spider_eye')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:string')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
    event.addTableModifier('cwi:chests/material/rich')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.8)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:rebar')
                pool.apply(functions => {
                    functions.setCount([4, 8])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.8)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:synthetic_string')
                pool.apply(functions => {
                    functions.setCount([3, 7])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([3, 7])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:shaft')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:synthetic_feather')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:belt_connector')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:steel_pipe')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:slag')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:cinderblock')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                GRENADE.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.003)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/material/normal')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:rebar')
                pool.apply(functions => {
                    functions.setCount([3, 6])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:synthetic_string')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:shaft')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:synthetic_feather')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:belt_connector')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:steel_pipe')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:slag')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:cinderblock')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.003)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/material/poor')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:rebar')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:synthetic_string')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:shaft')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:cinderblock')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:slag')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.05)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:silverfish_eggs')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.003)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.001)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
    event.addTableModifier('cwi:chests/tool/rich')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_ingot')
                pool.apply(functions => {
                    functions.setCount([3, 7])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_rod')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_wire')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                POLISH_EQUIPMENTS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.3, 0.7])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                BOWS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.damage([0.2, 0.8])
                    functions.setCount([13, 37])
                })
            })
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:arrow')
                pool.apply(functions => {
                    functions.setCount([13, 37])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                SWORDS_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                AXES_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                PICKAXES_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                SHOVELS_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                HOES_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flint_and_steel')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.4, 0.8])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:shield')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.4, 0.8])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bucket')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.03)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/tool/normal')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_ingot')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([1, 4])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_rod')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_wire')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                POLISH_EQUIPMENTS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                BOWS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.damage([0.1, 0.7])
                    functions.setCount([3, 23])
                })
            })
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:arrow')
                pool.apply(functions => {
                    functions.setCount([3, 23])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                SWORDS_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                AXES_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                PICKAXES_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                SHOVELS_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                HOES_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flint_and_steel')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.8])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bucket')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/tool/poor')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_ingot')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                SWORDS_POOR.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.3])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                AXES_POOR.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                PICKAXES_POOR.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                SHOVELS_POOR.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                HOES_POOR.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flint_and_steel')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.05, 0.2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.001)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
    event.addTableModifier('cwi:chests/empty')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.08)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.08)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(boneFragments)
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.05)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.05)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flint')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.04)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:clay_ball')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.03)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:glass_powder')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.002)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
    event.addTableModifier('cwi:chests/mine/tools')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:string')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                PICKAXES_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                PICKAXES_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.8])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                SHOVELS_RICH.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                SHOVELS_NORMAL.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.1, 0.8])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.8)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:torch')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:lantern')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flint_and_steel')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                    functions.damage([0.2, 0.6])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.03)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:name_tag')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.01)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.01)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/mine/repair')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:synthetic_string')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:rebar')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_ingot')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([1, 4])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:screw')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.03)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:name_tag')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rail')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:powered_rail')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:activator_rail')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:detector_rail')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:controller_rail')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/mine/ore')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:raw_iron')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:raw_copper')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:raw_gold')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:raw_zinc')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:raw_nickel')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:raw_lead')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:raw_lithium')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:raw_tin')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:raw_silver')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.8)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:crushed_raw_iron')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:crushed_raw_gold')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.8)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:crushed_raw_copper')
                pool.apply(functions => {
                    functions.setCount([1, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:crushed_raw_zinc')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:crushed_raw_nickel')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:crushed_raw_lead')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:coal')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:redstone')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:sulfur_item')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.01)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/mine/food')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:nutritional_bar')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:crunchy_bar')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:dried_kelp')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:coal')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:charcoal')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
    event.addTableModifier('cwi:chests/sealed/food')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:nutritional_bar')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:crunchy_bar')
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:honey_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:dried_kelp')
                pool.apply(functions => {
                    functions.setCount([1, 4])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:egg')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:insect_stew_cup')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cooked_arthropod')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minersdelight:cave_carrot')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:name_tag')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/sealed/electronics')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create_new_age:copper_wire')
                pool.apply(functions => {
                    functions.setCount([1, 4])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create_new_age:overcharged_golden_wire')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create_new_age:overcharged_iron_wire')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create_new_age:overcharged_diamond_wire')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:synthetic_string')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:cogwheel')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:steel_cogwheel')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:shaft')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:redstone')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('tfmg:screw')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:empty_schematic')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('create:schematic_and_quill')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })

    event.addTableModifier('cwi:chests/sealed/collectibles')
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.25)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                BANNER_PATTERNS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:name_tag')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bell')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:nautilus_shell')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.08)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:painting')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.08)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flower_pot')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.08)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:candle')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.05)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
    event.addTableModifier('cwi:chests/misc/rich')
        .group(group => {
            group.rolls(3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.randomChance(0.8)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.5)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:glass_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:glass_powder')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone_meal')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:coal_powder')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:charcoal_powder')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_rod')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_wire')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:leather')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:feather')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:string')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:clay_ball')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:brick')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:candle')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:flower_pot')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:painting')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.02)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.008)
            group.pool(pool => {
                pool.rolls(1)
                BANNER_PATTERNS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.003)
            group.pool(pool => {
                pool.rolls(1)
                SMITHING_TEMPLATES.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/misc/normal')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 3])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.7)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.4)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:glass_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:glass_powder')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone_meal')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:coal_powder')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:charcoal_powder')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_rod')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_wire')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:leather')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:feather')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:string')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:clay_ball')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:brick')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:candle')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.005)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })

    event.addTableModifier('cwi:chests/misc/poor')
        .group(group => {
            group.rolls(2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.alternative(darkAsh, ash))
                pool.apply(functions => {
                    functions.setCount([2, 5])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('createdieselgenerators:wood_chip')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.6)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:stick')
                pool.apply(functions => {
                    functions.setCount([1, 2])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.3)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:glass_bottle')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:glass_powder')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone_meal')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:coal_powder')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:charcoal_powder')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_nugget')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_rod')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rusted_iron_wire')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:rubber')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:leather')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:feather')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:string')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('kubejs:net')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.2)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:bone')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:rotten_flesh')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:clay_ball')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:brick')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.15)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry('minecraft:paper')
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
        .group(group => {
            group.rolls(1)
            group.randomChance(0.001)
            group.pool(pool => {
                pool.rolls(1)
                POTTERY_SHERDS.forEach(entry => pool.addEntry(entry))
                pool.apply(functions => {
                    functions.setCount([1, 1])
                })
            })
        })
})
