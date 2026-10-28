const infectedBuddingNamespace = Platform.isLoaded('cwi') ? 'cwi' : 'kubejs'

global.buddingGrowRecipes = [
    {
        id: "kubejs:amethyst_evolution",
        fluidInput: [
            { id: "minecraft:water", amount: 200, chance: 0.5, multiplier: 1 },
            { id: "minecraft:lava",  amount: 50,  chance: 0.75, multiplier: 2 },
            { id: "kubejs:caustic_soda", amount: 50, chance: 1, multiplier: 3 }
        ],
        blockInput: "minecraft:budding_amethyst",
        outputs: [
            "minecraft:small_amethyst_bud",
            "minecraft:medium_amethyst_bud",
            "minecraft:large_amethyst_bud",
            "minecraft:amethyst_cluster"
        ]
    },
    {
        id: "kubejs:infected_amethyst_evolution",
        fluidInput: [
            { id: "minecraft:water", amount: 200, chance: 0.5, multiplier: 2 },
            { id: "minecraft:lava",  amount: 50,  chance: 0.75, multiplier: 4 },
            { id: "kubejs:caustic_soda", amount: 50, chance: 1, multiplier: 6 }
        ],
        blockInput: infectedBuddingNamespace + ":infected_budding_amethyst",
        outputs: [
            "minecraft:small_amethyst_bud",
            "minecraft:medium_amethyst_bud",
            "minecraft:large_amethyst_bud",
            "minecraft:amethyst_cluster"
        ]
    }
];

if (Platform.isLoaded('geode_plus')) {
    global.buddingGrowRecipes.push({
        id: "kubejs:quartz_evolution",
        fluidInput: [
            { id: "minecraft:water", amount: 200, chance: 0.5, multiplier: 1 },
            { id: "minecraft:lava",  amount: 50,  chance: 0.75, multiplier: 2 },
            { id: "kubejs:caustic_soda", amount: 50, chance: 1, multiplier: 3 }
        ],
        blockInput: "geode_plus:budding_nether_quartz",
        outputs: [
            "geode_plus:small_nether_quartz_bud",
            "geode_plus:medium_nether_quartz_bud",
            "geode_plus:large_nether_quartz_bud",
            "geode_plus:nether_quartz_crystal"
        ]
    });

    global.buddingGrowRecipes.push({
        id: "kubejs:infected_quartz_evolution",
        fluidInput: [
            { id: "minecraft:water", amount: 200, chance: 0.5, multiplier: 2 },
            { id: "minecraft:lava",  amount: 50,  chance: 0.75, multiplier: 4 },
            { id: "kubejs:caustic_soda", amount: 50, chance: 1, multiplier: 6 }
        ],
        blockInput: infectedBuddingNamespace + ":infected_budding_quartz",
        outputs: [
            "geode_plus:small_nether_quartz_bud",
            "geode_plus:medium_nether_quartz_bud",
            "geode_plus:large_nether_quartz_bud",
            "geode_plus:nether_quartz_crystal"
        ]
    });
}

CreateEvents.spoutHandler(function(event) {
    const DIRECTIONS = ["up", "north", "west", "south", "east", "down"];
    const FACING = "facing";

    function buddingGrow(id, fluidInput, blockInput, outputs) {
        event.add(id, blockInput, function(block, fluid, simulate) {
            // 匹配流体
            let matched = null;
            for (let i = 0; i < fluidInput.length; i++) {
                const cfg = fluidInput[i];
                if (fluid.id === cfg.id && fluid.amount >= cfg.amount) {
                    matched = cfg;
                    break;
                }
            }
            if (!matched) return 0;

            const multiplier = matched.multiplier || 1;

            function getNextStageForDir(dirBlock, dir) {
                const id = dirBlock.id;
                if (id === "minecraft:air") {
                    return outputs[0] + "[" + FACING + "=" + dir + "]";
                }
                for (let stage = 0; stage < outputs.length; stage++) {
                    if (id === outputs[stage]) {
                        if (stage + 1 >= outputs.length) return null;
                        const face = dirBlock.properties.facing;
                        return outputs[stage + 1] + "[" + FACING + "=" + face + "]";
                    }
                }
                return null;
            }

            function findUpgradableDirections() {
                const upgradable = [];
                for (let i = 0; i < DIRECTIONS.length; i++) {
                    const dir = DIRECTIONS[i];
                    const tBlock = block[dir];
                    const nextCmd = getNextStageForDir(tBlock, dir);
                    if (nextCmd !== null) {
                        upgradable.push({
                            dir: dir,
                            block: tBlock,
                            nextCmd: nextCmd,
                            pos: tBlock.pos
                        });
                    }
                }
                return upgradable;
            }

            // 模拟检查
            if (simulate) {
                return findUpgradableDirections().length > 0 ? matched.amount : 0;
            }

            // 实际执行
            const upgradable = findUpgradableDirections();
            if (upgradable.length === 0) return 0;

            const pos = block.pos;
            const server = block.level.server;
            server.runCommandSilent("/playsound create:spout block @a " + pos.x + " " + pos.y + " " + pos.z);

            let attempt = 0;
            while (attempt < multiplier && upgradable.length > 0) {
                const randomIndex = Math.floor(Math.random() * upgradable.length);
                const selected = upgradable[randomIndex];
                const success = Math.random() < matched.chance;
                if (success) {
                    server.runCommandSilent(
                        "/setblock " + selected.pos.x + " " + selected.pos.y + " " + selected.pos.z + " " + selected.nextCmd
                    );
                    const freshBlock = block.level.getBlock(selected.pos);
                    const newNextCmd = getNextStageForDir(freshBlock, selected.dir);
                    if (newNextCmd !== null) {
                        selected.nextCmd = newNextCmd;
                        selected.block = freshBlock;
                    } else {
                        upgradable.splice(randomIndex, 1);
                    }
                }
                attempt++;
            }
            return matched.amount;
        });
    }

    const recipes = global.buddingGrowRecipes;
    if (recipes && Array.isArray(recipes)) {
        recipes.forEach(function(recipe) {
            buddingGrow(recipe.id, recipe.fluidInput, recipe.blockInput, recipe.outputs);
        })
    }
})
