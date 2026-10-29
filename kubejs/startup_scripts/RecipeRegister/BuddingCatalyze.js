const infectedBuddingNamespace = Platform.isLoaded('cwi') ? 'cwi' : 'kubejs'

global.buddingGrowRecipes = [
    {
        id: 'kubejs:amethyst_evolution',
        fluidInput: [
            { id: 'minecraft:water', amount: 200, chance: 0.5, multiplier: 1 },
            { id: 'minecraft:lava', amount: 50, chance: 0.75, multiplier: 2 },
            { id: 'kubejs:caustic_soda', amount: 50, chance: 1, multiplier: 3 }
        ],
        blockInput: 'minecraft:budding_amethyst',
        outputs: [
            'minecraft:small_amethyst_bud',
            'minecraft:medium_amethyst_bud',
            'minecraft:large_amethyst_bud',
            'minecraft:amethyst_cluster'
        ]
    },
    {
        id: 'kubejs:infected_amethyst_evolution',
        fluidInput: [
            { id: 'minecraft:water', amount: 200, chance: 0.5, multiplier: 2 },
            { id: 'minecraft:lava', amount: 50, chance: 0.75, multiplier: 4 },
            { id: 'kubejs:caustic_soda', amount: 50, chance: 1, multiplier: 6 }
        ],
        blockInput: infectedBuddingNamespace + ':infected_budding_amethyst',
        outputs: [
            'minecraft:small_amethyst_bud',
            'minecraft:medium_amethyst_bud',
            'minecraft:large_amethyst_bud',
            'minecraft:amethyst_cluster'
        ]
    }
]

if (Platform.isLoaded('geode_plus')) {
    global.buddingGrowRecipes.push({
        id: 'kubejs:quartz_evolution',
        fluidInput: [
            { id: 'minecraft:water', amount: 200, chance: 0.5, multiplier: 1 },
            { id: 'minecraft:lava', amount: 50, chance: 0.75, multiplier: 2 },
            { id: 'kubejs:caustic_soda', amount: 50, chance: 1, multiplier: 3 }
        ],
        blockInput: 'geode_plus:budding_nether_quartz',
        outputs: [
            'geode_plus:small_nether_quartz_bud',
            'geode_plus:medium_nether_quartz_bud',
            'geode_plus:large_nether_quartz_bud',
            'geode_plus:nether_quartz_crystal'
        ]
    })

    global.buddingGrowRecipes.push({
        id: 'kubejs:infected_quartz_evolution',
        fluidInput: [
            { id: 'minecraft:water', amount: 200, chance: 0.5, multiplier: 2 },
            { id: 'minecraft:lava', amount: 50, chance: 0.75, multiplier: 4 },
            { id: 'kubejs:caustic_soda', amount: 50, chance: 1, multiplier: 6 }
        ],
        blockInput: infectedBuddingNamespace + ':infected_budding_quartz',
        outputs: [
            'geode_plus:small_nether_quartz_bud',
            'geode_plus:medium_nether_quartz_bud',
            'geode_plus:large_nether_quartz_bud',
            'geode_plus:nether_quartz_crystal'
        ]
    })
}

CreateEvents.spoutHandler(function(event) {
    let DIRECTIONS = ['up', 'north', 'west', 'south', 'east', 'down']

    function buddingGrow(id, fluidInput, blockInput, outputs) {
        event.add(id, blockInput, function(block, fluid, simulate) {
        // Match The Catalyst Before Checking Growth
            let matched = null
            for (let i = 0; i < fluidInput.length; i++) {
                let cfg = fluidInput[i]
                if (fluid.id === cfg.id && fluid.amount >= cfg.amount) {
                    matched = cfg
                    break
                }
            }
            if (!matched) return 0

            let multiplier = matched.multiplier || 1

            function getNextStageForDir(dirBlock, dir) {
                let id = dirBlock.id
                if (id === 'minecraft:air') {
                    return { id: outputs[0], facing: dir }
                }
                for (let stage = 0; stage < outputs.length; stage++) {
                    if (id === outputs[stage]) {
                        if (stage + 1 >= outputs.length) return null
                        let face = dirBlock.properties.facing
                        return { id: outputs[stage + 1], facing: face }
                    }
                }
                return null
            }

            function findUpgradableDirections() {
                let upgradable = []
                for (let i = 0; i < DIRECTIONS.length; i++) {
                    let dir = DIRECTIONS[i]
                    let tBlock = block[dir]
                    let nextStage = getNextStageForDir(tBlock, dir)
                    if (nextStage !== null) {
                        upgradable.push({
                            dir: dir,
                            block: tBlock,
                            nextStage: nextStage,
                            pos: tBlock.pos
                        })
                    }
                }
                return upgradable
            }

        // Simulation Does Not Roll Chances Or Change The World
            if (simulate) {
                return findUpgradableDirections().length > 0 ? matched.amount : 0
            }

        // Each Attempt Can Advance One Available Face
            let upgradable = findUpgradableDirections()
            if (upgradable.length === 0) return 0

            let pos = block.pos
            AllSoundEvents.SPOUTING.playOnServer(block.level, pos)

            let attempt = 0
            while (attempt < multiplier && upgradable.length > 0) {
                let randomIndex = Math.floor(Math.random() * upgradable.length)
                let selected = upgradable[randomIndex]
                let success = Math.random() < matched.chance
                if (success) {
                // Write Directly To The Budding Block's Dimension
                    selected.block.set(selected.nextStage.id, { facing: selected.nextStage.facing })
                    let freshBlock = block.level.getBlock(selected.pos)
                    let newNextStage = getNextStageForDir(freshBlock, selected.dir)
                    if (newNextStage !== null) {
                        selected.nextStage = newNextStage
                        selected.block = freshBlock
                    } else {
                        upgradable.splice(randomIndex, 1)
                    }
                }
                attempt++
            }
            return matched.amount
        })
    }

    let recipes = global.buddingGrowRecipes
    if (recipes && Array.isArray(recipes)) {
        recipes.forEach(function(recipe) {
            buddingGrow(recipe.id, recipe.fluidInput, recipe.blockInput, recipe.outputs)
        })
    }
})
