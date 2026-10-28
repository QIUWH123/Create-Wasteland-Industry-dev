ServerEvents.recipes(event => {
    const addLycheeRecipe = recipe => event.custom(recipe)

// Item Inside

    addLycheeRecipe({
        "type": "lychee:item_inside",
        "item_in": { "item": "kubejs:dark_ash" },
        "block_in": { "blocks": ["water"], "state": { "level": "0" } },
        "post": [
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.1 0.1 0.1 0.03 3", "hide": true },
            { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.27 } },
            { "type": "delay", "s": 3 }
        ]
    })

// Item Burning

    addLycheeRecipe({
        "type": "lychee:item_burning",
        "item_in": { "item": "kubejs:ash" },
        "post": [
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.1 0.1 0.1 0.03 3", "hide": true },
            { "type": "drop_item", "id": "kubejs:dark_ash", "contextual": { "type": "chance", "chance": 0.67 } },
            { "type": "delay", "s": 3 }
        ]
    })

// Block Interacting - Claystone Clump

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:pickaxes" },
        "block_in": "kubejs:reinforced_ash_brick",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item" },
            { "type": "execute", "command": "setblock ~ ~ ~ kubejs:ash_brick_base", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:shovels" },
        "block_in": "kubejs:reinforced_ash_brick",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item", "damage": 1 },
            { "type": "execute", "command": "setblock ~ ~ ~ kubejs:ash_brick_base", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "item": "minecraft:flint" },
        "block_in": "kubejs:reinforced_ash_brick",
        "post": [
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
        ]
    })

// Block Interacting - Ash Brick Base

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:pickaxes" },
        "block_in": "kubejs:ash_brick_base",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item" },
            { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_furnace", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:shovels" },
        "block_in": "kubejs:ash_brick_base",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item", "damage": 2 },
            { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_furnace", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "item": "minecraft:flint" },
        "block_in": "kubejs:ash_brick_base",
        "post": [
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
        ]
    })

// Block Interacting - Incomplete Furnace

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:pickaxes" },
        "block_in": "kubejs:incomplete_furnace",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item" },
            { "type": "execute", "command": "setblock ~ ~ ~ minecraft:furnace[lit=false]{BurnTime:0,CookTime:0,CookTimeTotal:0}", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:shovels" },
        "block_in": "kubejs:incomplete_furnace",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 7", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item", "damage": 2 },
            { "type": "execute", "command": "setblock ~ ~ ~ minecraft:furnace[lit=false]{BurnTime:0,CookTime:0,CookTimeTotal:0}", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "item": "minecraft:flint" },
        "block_in": "kubejs:incomplete_furnace",
        "post": [
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
        ]
    })

// Block Interacting - Crafting Table

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "cwi:leathers" },
        "block_in": "kubejs:ash_brick_base",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "execute", "command": "setblock ~ ~ ~ kubejs:incomplete_crafting_table", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "item": "minecraft:flint" },
        "block_in": "kubejs:incomplete_crafting_table",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"kubejs:incomplete_crafting_table\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "execute", "command": "setblock ~ ~ ~ minecraft:crafting_table", "hide": true }
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:incomplete_crafting_table",
        "post": [
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"kubejs:incomplete_crafting_table\"} ~ ~ ~ 0.4 0.3 0.4 0.03 3", "hide": true },
            { "type": "add_item_cooldown", "s": 0.3 },
            { "type": "damage_item" },
            { "type": "execute", "command": "setblock ~ ~ ~ minecraft:crafting_table", "hide": true }
        ]
    })

// Block Interacting - Dead Leaves

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "forge:tools/knives" },
        "block_in": "kubejs:dead_leaves",
        "post": [
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
        ]
    })

// Block Interacting - Scrap Block

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": {},
        "block_in": "kubejs:scrap_block",
        "contextual": { "type": "is_sneaking" },
        "post": [
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
        ]
    })

// Block Interacting - Dead Bush

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "forge:tools/knives" },
        "block_in": "minecraft:dead_bush",
        "post": [
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
        ]
    })

// Block Interacting - Crystalized Phyllite

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "item": "minecraft:brush" },
        "block_in": "kubejs:crystalized_phyllite",
        "contextual": { "type": "is_sneaking" },
        "post": [
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
        ]
    })

// Block Interacting - Burnt Logs

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:burnt_log",
        "post": [
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
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:broken_burnt_log",
        "post": [
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
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:stripped_burnt_log",
        "post": [
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
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:stripped_broken_burnt_log",
        "post": [
            { "type": "execute", "command": "playsound block.wood.break block @a ~ ~ ~ 1 1", "hide": true },
            { "type": "execute", "command": "particle minecraft:large_smoke ~ ~ ~ 0.1 0.1 0.1 0.02 1", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 3", "hide": true },
            { "type": "place", "block": "air" },
            { "type": "add_item_cooldown", "s": 0.2 },
            { "type": "damage_item" },
            { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 3 },
            { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 1, "contextual": { "type": "chance", "chance": 0.75 } },
            { "type": "drop_item", "id": "kubejs:dark_ash", "count": 2, "contextual": { "type": "chance", "chance": 0.73 } }
        ]
    })

// Block Interacting - Ash Logs

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:ash_log",
        "post": [
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
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:broken_ash_log",
        "post": [
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
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:stripped_ash_log",
        "post": [
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
        ]
    })

    addLycheeRecipe({
        "type": "lychee:block_interacting",
        "item_in": { "tag": "minecraft:axes" },
        "block_in": "kubejs:stripped_broken_ash_log",
        "post": [
            { "type": "execute", "command": "playsound block.wood.break block @a ~ ~ ~ 1 1", "hide": true },
            { "type": "execute", "command": "particle minecraft:falling_dust{block_state:\"minecraft:gravel\"} ~ ~ ~ 0.3 0.3 0.3 0.01 3", "hide": true },
            { "type": "execute", "command": "particle minecraft:smoke ~ ~ ~ 0.3 0.3 0.3 0.05 5", "hide": true },
            { "type": "place", "block": "air" },
            { "type": "add_item_cooldown", "s": 0.2 },
            { "type": "damage_item" },
            { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 3 },
            { "type": "drop_item", "id": "createdieselgenerators:wood_chip", "count": 2, "contextual": { "type": "chance", "chance": 0.85 } },
            { "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.53 } }
        ]
    })

// Dripstone Dripping

    addLycheeRecipe({
        "type": "lychee:dripstone_dripping",
        "source_block": "water",
        "target_block": "sponge",
        "post": [{ "type": "place", "block": "wet_sponge" }]
    })

    addLycheeRecipe({
        "type": "lychee:dripstone_dripping",
        "source_block": "water",
        "target_block": "kubejs:depleted_dirt",
        "post": [{ "type": "place", "block": "kubejs:soaked_depleted_dirt" }]
    })

})
