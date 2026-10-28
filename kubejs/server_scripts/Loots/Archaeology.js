
//give @s minecraft:suspicious_gravel{BlockEntityTag:{LootTable:"cwi:archaeology/g"}}
//give @s kubejs:suspicious_ash_dirt{BlockEntityTag:{LootTable:"cwi:archaeology/ad"}}
//give @s kubejs:suspicious_depleted_dirt{BlockEntityTag:{LootTable:"cwi:archaeology/dd"}}

const addArchaeologyWeightedLoot = (pool, entries) => {
    entries.forEach(([item, weight]) => {
        pool.addEntry(LootEntry.of(item).withWeight(weight))
    })
}

LootJS.modifiers((event) => {

    event.addTableModifier("cwi:archaeology/g")
        .pool(pool => {
            addArchaeologyWeightedLoot(pool, [
                ["kubejs:net", 100],
                ["tfmg:rebar", 200],
                ["kubejs:rubber", 200],
                ["minecraft:glass_bottle", 100],
                ["minecraft:name_tag", 50],
                ["tfmg:copper_grenade", 20],
                ["tfmg:zinc_grenade", 20],
                ["tfmg:thermite_grenade", 20],
                ["minecraft:blade_pottery_sherd", 1],
                ["minecraft:explorer_pottery_sherd", 1],
                ["minecraft:heartbreak_pottery_sherd", 1],
                ["minecraft:snort_pottery_sherd", 1],
                ["minecraft:friend_pottery_sherd", 1],
                ["minecraft:mourner_pottery_sherd", 1],
                ["minecraft:arms_up_pottery_sherd", 1],
                ["minecraft:prize_pottery_sherd", 1],
                ["minecraft:brewer_pottery_sherd", 1],
                ["minecraft:skull_pottery_sherd", 1],
                ["minecraft:heart_pottery_sherd", 1],
                ["minecraft:danger_pottery_sherd", 1],
                ["minecraft:burn_pottery_sherd", 1],
                ["minecraft:shelter_pottery_sherd", 1],
                ["minecraft:angler_pottery_sherd", 1],
                ["minecraft:howl_pottery_sherd", 1],
                ["minecraft:miner_pottery_sherd", 1],
                ["minecraft:archer_pottery_sherd", 1],
                ["minecraft:sheaf_pottery_sherd", 1],
                ["minecraft:plenty_pottery_sherd", 1],
                ["minecraft:sentry_armor_trim_smithing_template", 1],
                ["minecraft:vex_armor_trim_smithing_template", 1],
                ["minecraft:coast_armor_trim_smithing_template", 1],
                ["minecraft:ward_armor_trim_smithing_template", 1],
                ["minecraft:snout_armor_trim_smithing_template", 1],
                ["minecraft:wayfinder_armor_trim_smithing_template", 1],
                ["minecraft:shaper_armor_trim_smithing_template", 1],
                ["minecraft:raiser_armor_trim_smithing_template", 1],
                ["minecraft:host_armor_trim_smithing_template", 1]
            ])
        })

    event.addTableModifier("cwi:archaeology/dd")
        .pool(pool => {
            addArchaeologyWeightedLoot(pool, [
                ["kubejs:net", 100],
                ["tfmg:rebar", 200],
                ["kubejs:rubber", 200],
                ["minecraft:glass_bottle", 100],
                ["minecraft:name_tag", 50],
                ["tfmg:copper_grenade", 20],
                ["tfmg:zinc_grenade", 20],
                ["tfmg:thermite_grenade", 20],
                ["minecraft:blade_pottery_sherd", 1],
                ["minecraft:explorer_pottery_sherd", 1],
                ["minecraft:heartbreak_pottery_sherd", 1],
                ["minecraft:snort_pottery_sherd", 1],
                ["minecraft:friend_pottery_sherd", 1],
                ["minecraft:mourner_pottery_sherd", 1],
                ["minecraft:arms_up_pottery_sherd", 1],
                ["minecraft:prize_pottery_sherd", 1],
                ["minecraft:brewer_pottery_sherd", 1],
                ["minecraft:skull_pottery_sherd", 1],
                ["minecraft:heart_pottery_sherd", 1],
                ["minecraft:danger_pottery_sherd", 1],
                ["minecraft:burn_pottery_sherd", 1],
                ["minecraft:shelter_pottery_sherd", 1],
                ["minecraft:angler_pottery_sherd", 1],
                ["minecraft:howl_pottery_sherd", 1],
                ["minecraft:miner_pottery_sherd", 1],
                ["minecraft:archer_pottery_sherd", 1],
                ["minecraft:sheaf_pottery_sherd", 1],
                ["minecraft:plenty_pottery_sherd", 1],
                ["minecraft:sentry_armor_trim_smithing_template", 1],
                ["minecraft:vex_armor_trim_smithing_template", 1],
                ["minecraft:coast_armor_trim_smithing_template", 1],
                ["minecraft:ward_armor_trim_smithing_template", 1],
                ["minecraft:snout_armor_trim_smithing_template", 1],
                ["minecraft:wayfinder_armor_trim_smithing_template", 1],
                ["minecraft:shaper_armor_trim_smithing_template", 1],
                ["minecraft:raiser_armor_trim_smithing_template", 1],
                ["minecraft:host_armor_trim_smithing_template", 1]
            ])
        })

    event.addTableModifier("cwi:archaeology/ad")
        .pool(pool => {
            addArchaeologyWeightedLoot(pool, [
                ["kubejs:net", 100],
                ["tfmg:rebar", 200],
                ["kubejs:rubber", 200],
                ["minecraft:glass_bottle", 100],
                ["minecraft:name_tag", 50],
                ["tfmg:copper_grenade", 20],
                ["tfmg:zinc_grenade", 20],
                ["tfmg:thermite_grenade", 20],
                ["minecraft:blade_pottery_sherd", 1],
                ["minecraft:explorer_pottery_sherd", 1],
                ["minecraft:heartbreak_pottery_sherd", 1],
                ["minecraft:snort_pottery_sherd", 1],
                ["minecraft:friend_pottery_sherd", 1],
                ["minecraft:mourner_pottery_sherd", 1],
                ["minecraft:arms_up_pottery_sherd", 1],
                ["minecraft:prize_pottery_sherd", 1],
                ["minecraft:brewer_pottery_sherd", 1],
                ["minecraft:skull_pottery_sherd", 1],
                ["minecraft:heart_pottery_sherd", 1],
                ["minecraft:danger_pottery_sherd", 1],
                ["minecraft:burn_pottery_sherd", 1],
                ["minecraft:shelter_pottery_sherd", 1],
                ["minecraft:angler_pottery_sherd", 1],
                ["minecraft:howl_pottery_sherd", 1],
                ["minecraft:miner_pottery_sherd", 1],
                ["minecraft:archer_pottery_sherd", 1],
                ["minecraft:sheaf_pottery_sherd", 1],
                ["minecraft:plenty_pottery_sherd", 1],
                ["minecraft:sentry_armor_trim_smithing_template", 1],
                ["minecraft:vex_armor_trim_smithing_template", 1],
                ["minecraft:coast_armor_trim_smithing_template", 1],
                ["minecraft:ward_armor_trim_smithing_template", 1],
                ["minecraft:snout_armor_trim_smithing_template", 1],
                ["minecraft:wayfinder_armor_trim_smithing_template", 1],
                ["minecraft:shaper_armor_trim_smithing_template", 1],
                ["minecraft:raiser_armor_trim_smithing_template", 1],
                ["minecraft:host_armor_trim_smithing_template", 1]
            ])
        })


})
