ServerEvents.recipes(event => {
// Item Inside

    event.recipes.lychee.item_inside([
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.1 0.1 0.1 0.03 3", "hide": true },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.27 } },
        { "type": "delay", "s": 3 }
    ], { "item": "kubejs:dark_ash" }, { "blocks": ["water"], "state": { "level": "0" } })
        .id('lychee:kjs/4pt10q4gzno26tm80b1c4iyxb')

// Item Burning

    event.recipes.lychee.item_burning([
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.1 0.1 0.1 0.03 3", "hide": true },
        { "type": "drop_item", "id": "kubejs:dark_ash", "contextual": { "type": "chance", "chance": 0.67 } },
        { "type": "delay", "s": 3 }
    ], { "item": "kubejs:ash" })
        .id('lychee:kjs/f3j84fhl6v8dzbrtay6va128i')

// Block Interacting - Claystone Clump

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item" },
        { "type": "execute", "command": "setblock ~ ~ ~ kubejs:ash_brick_base", "hide": true }
    ], { "tag": "minecraft:pickaxes" }, "kubejs:reinforced_ash_brick")
        .id('lychee:kjs/f0bk54nxunbhs8max4l77qo2e')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item", "damage": 1 },
        { "type": "execute", "command": "setblock ~ ~ ~ kubejs:ash_brick_base", "hide": true }
    ], { "tag": "minecraft:shovels" }, "kubejs:reinforced_ash_brick")
        .id('lychee:kjs/17uivsq51zujiwgs5z9gk7yz')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 2", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "execute", "command": "damage @s 1 minecraft:generic", "hide": true },
        {
            "type": "if",
            "contextual": { "type": "chance", "chance": 0.87 },
            "then": [
                { "type": "execute", "command": "setblock ~ ~ ~ kubejs:ash_brick_base", "hide": true },
                { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 4", "hide": true },
                { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 3", "hide": true }
            ]
        }
    ], { "item": "minecraft:flint" }, "kubejs:reinforced_ash_brick")
        .id('lychee:kjs/4lck6dou50z2jpii7t1wz07e5')

// Block Interacting - Ash Brick Base

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item" },
        { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_furnace", "hide": true }
    ], { "tag": "minecraft:pickaxes" }, "kubejs:ash_brick_base")
        .id('lychee:kjs/d6ulm6ohn5c4dya889jsr0bw0')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item", "damage": 2 },
        { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_furnace", "hide": true }
    ], { "tag": "minecraft:shovels" }, "kubejs:ash_brick_base")
        .id('lychee:kjs/c8koqza9rag4m51201t73emjh')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 2", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "execute", "command": "damage @s 1 minecraft:generic", "hide": true },
        {
            "type": "if",
            "contextual": { "type": "chance", "chance": 0.87 },
            "then": [
                { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_furnace", "hide": true },
                { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 4", "hide": true },
                { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 3", "hide": true }
            ]
        }
    ], { "item": "minecraft:flint" }, "kubejs:ash_brick_base")
        .id('lychee:kjs/9cbqudc3m2ey7igvo042n82uw')

// Block Interacting - Incomplete Furnace

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item" },
        { "type": "execute", "command": "setblock ~ ~ ~ minecraft:furnace[lit=false]{BurnTime:0,CookTime:0,CookTimeTotal:0}", "hide": true }
    ], { "tag": "minecraft:pickaxes" }, "kubejs:incomplete_furnace")
        .id('lychee:kjs/5etcm8p9yz2v9fwpjqa79rbt8')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item", "damage": 2 },
        { "type": "execute", "command": "setblock ~ ~ ~ minecraft:furnace[lit=false]{BurnTime:0,CookTime:0,CookTimeTotal:0}", "hide": true }
    ], { "tag": "minecraft:shovels" }, "kubejs:incomplete_furnace")
        .id('lychee:kjs/2jbagd05o94502glsmanrcw4i')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 2", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "execute", "command": "damage @s 1 minecraft:generic", "hide": true },
        {
            "type": "if",
            "contextual": { "type": "chance", "chance": 0.87 },
            "then": [
                { "type": "execute", "command": "setblock ~ ~ ~ minecraft:furnace[lit=false]{BurnTime:0,CookTime:0,CookTimeTotal:0}", "hide": true },
                { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 4", "hide": true },
                { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 3", "hide": true }
            ]
        }
    ], { "item": "minecraft:flint" }, "kubejs:incomplete_furnace")
        .id('lychee:kjs/zg4gvifr71x3b2i9qdokhjly')

// Block Interacting - Crafting Table

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_crafting_table", "hide": true }
    ], { "tag": "cwi:leathers" }, "kubejs:ash_brick_base")
        .id('lychee:kjs/ewy535mljm9ygrk33nqhwaek9')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"kubejs:incomplete_crafting_table\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "execute", "command": "setblock ~ ~ ~ minecraft:crafting_table", "hide": true }
    ], { "item": "minecraft:flint" }, "kubejs:incomplete_crafting_table")
        .id('lychee:kjs/93z712uzd98ns06bk3ddzo932')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"kubejs:incomplete_crafting_table\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "damage_item" },
        { "type": "execute", "command": "setblock ~ ~ ~ minecraft:crafting_table", "hide": true }
    ], { "tag": "minecraft:axes" }, "kubejs:incomplete_crafting_table")
        .id('lychee:kjs/5zbup9tk08eob68t955advlzv')

// Block Interacting - Dead Leaves

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "place", "block": "air" },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "minecraft:stick", "count": 2 },
        { "type": "drop_item", "id": "minecraft:stick", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "minecraft:stick", "contextual": { "type": "chance", "chance": 0.43 } },
        { "type": "drop_item", "id": "farmersdelight:straw", "contextual": { "type": "chance", "chance": 0.37 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.27 } },
        { "type": "drop_item", "id": "kubejs:charcoal_powder", "contextual": { "type": "chance", "chance": 0.13 } },
        { "type": "drop_item", "id": "minersdelight:arthropod", "contextual": { "type": "chance", "chance": 0.07 } },
        { "type": "drop_item", "id": "minersdelight:silverfish_eggs", "contextual": { "type": "chance", "chance": 0.05 } }
    ], { "tag": "c:tools/knife" }, "kubejs:dead_leaves")
        .id('lychee:kjs/ap591ceyd1mlelv8nuyhzehjc')

// Block Interacting - Scrap Block

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 16", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 12", "hide": true },
        { "type": "place", "block": "kubejs:small_scrap_block" },
        { "type": "add_item_cooldown", "s": 0.75 },
        { "type": "drop_item", "id": "tfmg:screw", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "kubejs:rubber", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "kubejs:rubber", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "tfmg:synthetic_string", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "tfmg:synthetic_string", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "tfmg:synthetic_leather", "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.5 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.5 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.5 } },
        { "type": "execute", "command": "damage @s 1 minecraft:generic", "hide": true, "contextual": { "type": "chance", "chance": 0.5 } }
    ], {}, "kubejs:scrap_block")
        .set('if', { "type": "is_sneaking" })
        .id('lychee:kjs/d9ia6gerk2i5unox2n418yx9u')

// Block Interacting - Dead Bush

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.1 0.1 0.1 0.03 3", "hide": true },
        { "type": "add_item_cooldown", "s": 0.3 },
        { "type": "place", "block": "air" },
        { "type": "damage_item" },
        {
            "type": "if",
            "contextual": { "type": "is_sneaking" },
            "then": [
                { "type": "drop_item", "id": "minecraft:dead_bush" }
            ],
            "else": [
                { "type": "drop_item", "id": "minecraft:stick" },
                { "type": "drop_item", "id": "minecraft:stick", "contextual": { "type": "chance", "chance": 0.75 } },
                { "type": "drop_item", "id": "minecraft:stick", "contextual": { "type": "chance", "chance": 0.37 } },
                { "type": "drop_item", "id": "farmersdelight:straw", "contextual": { "type": "chance", "chance": 0.17 } },
                { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.13 } }
            ]
        }
    ], { "tag": "c:tools/knife" }, "minecraft:dead_bush")
        .id('lychee:kjs/23kjr9blgwtd8xfoo6wes0ih2')

// Block Interacting - Crystalized Phyllite

    event.recipes.lychee.block_interacting([
        {
            "type": "if",
            "contextual": { "type": "chance", "chance": 0.23 },
            "then": [
                { "type": "execute", "command": "setblock ~ ~ ~ kubejs:mossy_phyllite", "hide": true },
                { "type": "drop_item", "id": "kubejs:crystallum_coccus" }
            ]
        },
        { "type": "execute", "command": "particle minecraft:electric_spark ~ ~ ~ 0.1 0.1 0.1 0.02 2", "hide": true },
        { "type": "execute", "command": "particle minecraft:glow ~ ~ ~ 0.3 0.3 0.3 0.05 4", "hide": true },
        { "type": "add_item_cooldown", "s": 0.75 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "minecraft:redstone", "contextual": { "type": "chance", "chance": 0.13 } },
        { "type": "drop_item", "id": "kubejs:quartz_powder", "contextual": { "type": "chance", "chance": 0.27 } }
    ], { "item": "minecraft:brush" }, "kubejs:crystalized_phyllite")
        .set('if', { "type": "is_sneaking" })
        .id('lychee:kjs/4ivas3hgunace7aogy4chfvo1')

// Block Interacting - Burnt Logs

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound item.axe.strip block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "playsound block.sand.place block @a ~ ~ ~ 0.8 0.5", "hide": true },
        { "type": "execute", "command": "particle minecraft:large_smoke ~ ~ ~ 0.1 0.1 0.1 0.02 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:block kubejs:burnt_log ~ ~ ~ 0.35 0.35 0.35 0.05 30", "hide": true },
        { "type": "place", "block": "kubejs:stripped_burnt_log" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "kubejs:dark_ash", "count": 2 },
        { "type": "drop_item", "id": "kubejs:dark_ash", "contextual": { "type": "chance", "chance": 0.57 } },
        { "type": "drop_item", "id": "kubejs:dark_ash", "contextual": { "type": "chance", "chance": 0.23 } }
    ], { "tag": "minecraft:axes" }, "kubejs:burnt_log")
        .id('lychee:kjs/evqdrumngnszpkrpo4rnd3dvp')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound item.axe.strip block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "playsound block.sand.place block @a ~ ~ ~ 0.8 0.5", "hide": true },
        { "type": "execute", "command": "particle minecraft:large_smoke ~ ~ ~ 0.1 0.1 0.1 0.02 2", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 4", "hide": true },
        { "type": "execute", "command": "particle minecraft:block kubejs:broken_burnt_log ~ ~ ~ 0.35 0.35 0.35 0.05 30", "hide": true },
        { "type": "place", "block": "kubejs:stripped_broken_burnt_log" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "kubejs:dark_ash" },
        { "type": "drop_item", "id": "kubejs:dark_ash", "contextual": { "type": "chance", "chance": 0.73 } }
    ], { "tag": "minecraft:axes" }, "kubejs:broken_burnt_log")
        .id('lychee:kjs/6o5ir4nyzpnv0e7cdl0qzqnr5')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound block.wood.break block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "particle minecraft:large_smoke ~ ~ ~ 0.1 0.1 0.1 0.02 1", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:block kubejs:stripped_burnt_log ~ ~ ~ 0.35 0.35 0.35 0.05 30", "hide": true },
        { "type": "place", "block": "kubejs:stripped_broken_burnt_log" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 5 },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 3, "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "kubejs:dark_ash", "count": 2, "contextual": { "type": "chance", "chance": 0.73 } }
    ], { "tag": "minecraft:axes" }, "kubejs:stripped_burnt_log")
        .id('lychee:kjs/2nuv5j48jj7g14odixumphtds')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound block.wood.break block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "particle minecraft:large_smoke ~ ~ ~ 0.1 0.1 0.1 0.02 1", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 3", "hide": true },
        { "type": "place", "block": "air" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 3 },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 1, "contextual": { "type": "chance", "chance": 0.75 } },
        { "type": "drop_item", "id": "kubejs:dark_ash", "count": 2, "contextual": { "type": "chance", "chance": 0.73 } }
    ], { "tag": "minecraft:axes" }, "kubejs:stripped_broken_burnt_log")
        .id('lychee:kjs/6tidqn1s3znlpbrm1pwyzkfd5')

// Block Interacting - Ash Logs

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound item.axe.strip block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "playsound block.sand.place block @a ~ ~ ~ 0.3 0.3", "hide": true },
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
        { "type": "execute", "command": "particle minecraft:block kubejs:ash_log ~ ~ ~ 0.35 0.35 0.35 0.05 30", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "place", "block": "kubejs:stripped_ash_log" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "kubejs:ash" },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.73 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.27 } }
    ], { "tag": "minecraft:axes" }, "kubejs:ash_log")
        .id('lychee:kjs/69q3i5yr53ymy3jzvv0gy9iq4')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound item.axe.strip block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "playsound block.sand.place block @a ~ ~ ~ 0.3 0.3", "hide": true },
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 4", "hide": true },
        { "type": "execute", "command": "particle minecraft:block kubejs:broken_ash_log ~ ~ ~ 0.35 0.35 0.35 0.05 30", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "place", "block": "kubejs:stripped_broken_ash_log" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.63 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.13 } }
    ], { "tag": "minecraft:axes" }, "kubejs:broken_ash_log")
        .id('lychee:kjs/5eje2c4sv2hmvljra94fev2lx')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound block.wood.break block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.3 0.3 0.3 0.01 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:block kubejs:stripped_ash_log ~ ~ ~ 0.35 0.35 0.35 0.05 30", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "place", "block": "kubejs:stripped_broken_ash_log" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 6 },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 4, "contextual": { "type": "chance", "chance": 0.85 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.53 } }
    ], { "tag": "minecraft:axes" }, "kubejs:stripped_ash_log")
        .id('lychee:kjs/dcte7opnxihfjva4hbyvr5nmq')

    event.recipes.lychee.block_interacting([
        { "type": "execute", "command": "playsound block.wood.break block @a ~ ~ ~ 1 1", "hide": true },
        { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.3 0.3 0.3 0.01 3", "hide": true },
        { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
        { "type": "place", "block": "air" },
        { "type": "add_item_cooldown", "s": 0.2 },
        { "type": "damage_item" },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 3 },
        { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 2, "contextual": { "type": "chance", "chance": 0.85 } },
        { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.53 } }
    ], { "tag": "minecraft:axes" }, "kubejs:stripped_broken_ash_log")
        .id('lychee:kjs/o512qq88aoennpk1m0aya1yk')

// Dripstone Dripping

    event.recipes.lychee.dripstone_dripping([{ "type": "place", "block": "wet_sponge" }], "water", "sponge")
        .id('lychee:kjs/7w7w95lsqxmxyfkdw9gnvlqdt')

    event.recipes.lychee.dripstone_dripping([{ "type": "place", "block": "kubejs:soaked_depleted_dirt" }], "water", "kubejs:depleted_dirt")
        .id('lychee:kjs/c16t3bouaeu7ko0uvo87qi9gh')

})
