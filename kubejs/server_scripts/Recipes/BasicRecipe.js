// priority: 5

// AddItem Helper
function AddItem(input, chance) {
    if (typeof input === 'string') {
        const parts = input.trim().split(/\s+/)
        let count = 1
        let id
        if (parts.length === 1) {
            id = parts[0]
        } else if (parts.length === 2) {
            const num = parseInt(parts[0], 10)
            if (!isNaN(num)) {
                count = num
                id = parts[1]
            } else {
                id = input
            }
        } else {
            id = input
        }

        let obj
        if (id.startsWith('#')) {
            obj = { tag: id.substring(1) }
        } else {
            obj = { item: id }
        }

        if (count > 1) obj.count = count
        if (chance !== undefined) obj.chance = chance
        return obj
    }
    return input
}

// AddFluid Helper
function AddFluid(input) {
    if (typeof input === 'string') {
        const parts = input.trim().split(/\s+/)
        let amount
        let id
        if (parts.length === 1) {
            id = parts[0]
        } else if (parts.length === 2) {
            const num = parseInt(parts[0], 10)
            if (!isNaN(num)) {
                amount = num
                id = parts[1]
            } else {
                id = input
            }
        } else {
            id = input
        }

        let obj
        if (id.startsWith('#')) {
            obj = Fluid.sizedIngredientOf(id, amount || 1000)
        } else if (id.startsWith('fluidTag:')) {
            obj = Fluid.sizedIngredientOf('#' + id.substring(9), amount || 1000)
        } else if (id.startsWith('fluid:')) {
            obj = Fluid.of(id.substring(6), amount || 1000)
        } else {
            obj = Fluid.of(id, amount || 1000)
        }

        return obj
    }
    return input
}

// Custom recipe JSON uses id for outputs; native Create builders use Item/Ingredient wrappers.
function createRecipeOutput(output) {
    if (typeof output === 'string') output = AddItem(output)
    if (output && output.item) {
        const result = { id: output.item }
        if (output.count !== undefined) result.count = output.count
        if (output.chance !== undefined) result.chance = output.chance
        return result
    }
    return output
}

function createRecipeOutputs(outputs) {
    return (Array.isArray(outputs) ? outputs : [outputs]).map(createRecipeOutput)
}

function createRecipeInput(input) {
    if (input && input.item) return Item.of(input.item, input.count || 1)
    if (input && input.tag) return Ingredient.of('#' + input.tag)
    return input
}

function createRecipeIngredients(ingredients) {
    const result = []
    ;(Array.isArray(ingredients) ? ingredients : [ingredients]).forEach(ingredient => {
        if (ingredient.item || ingredient.tag) {
            for (let index = 0; index < (ingredient.count || 1); index++) {
                result.push(ingredient.item ? { item: ingredient.item } : { tag: ingredient.tag })
            }
        } else {
            const fluidIngredient = Fluid.sizedIngredientOf(ingredient).toFlatJson()
            // Create's recipe schema requires the type even for NeoForge's basic fluid/tag codecs.
            if (!fluidIngredient.has('type')) {
                fluidIngredient.addProperty('type', fluidIngredient.has('tag') ? 'neoforge:tag' : 'neoforge:single')
            }
            result.push(fluidIngredient)
        }
    })
    return result
}

function normalizeVatTypes(allowedVatTypes) {
    return (allowedVatTypes || []).map(type => {
        if (type === 'tfmg:steel_vat') return 'tfmg:steel'
        if (type === 'tfmg:firebrick_lined_vat') return 'tfmg:fireproof'
        if (type === 'tfmg:cast_iron_vat') return 'tfmg:cast_iron'
        return type
    })
}

function normalizeVatHeatLevel(heatRequirement) {
    if (heatRequirement === 'heated') return 2
    if (heatRequirement === 'superheated') return 3
    if (typeof heatRequirement === 'number') return heatRequirement
    return 0
}

// Custom Recipe Functions

function chiseling(event, ingredients, results) {
    return event.custom({
        "type": "createdieselgenerators:hammering",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results])
    })
}

function cutting(event, ingredients, results) {
    return event.custom({
        "type": "createdieselgenerators:wire_cutting",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results])
    })
}

function rolling(event, ingredients, results) {
    return event.custom({
        "type": "createaddition:rolling",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results])
    })
}

function centrifuging(event, ingredients, results, processingTime) {
    return event.custom({
        "type": "vintageimprovements:centrifugation",
        "ingredients": createRecipeIngredients(ingredients),
        "results": createRecipeOutputs(results),
        "processing_time": processingTime
    })
}

function polishing(event, speedLimits, ingredients, results, processingTime) {
    return event.custom({
        "type": "vintageimprovements:polishing",
        "speed_limits": speedLimits,
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs(results),
        "processing_time": processingTime
    })
}

function hammering(event, hammerBlows, ingredients, results) {
    return event.custom({
        "type": "vintageimprovements:hammering",
        "hammer_blows": hammerBlows,
        "ingredients": createRecipeIngredients(ingredients),
        "results": createRecipeOutputs(results)
    })
}

function liquidBurning(event, ingredients, processingTime, superheated) {
    return event.custom({
        "type": "createaddition:liquid_burning",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": [],
        "burn_time": processingTime,
        "superheated": superheated
    })
}

function charging(event, energy, maxChargeRate, ingredients, results) {
    return event.custom({
        "type": "createaddition:charging",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results]),
        "energy": energy,
        "max_charge_rate": maxChargeRate
    })
}

function turning(event, ingredients, results) {
    return event.custom({
        "type": "vintageimprovements:turning",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results])
    })
}

function demolding(event, ingredients, results) {
    return event.custom({
        "type": "ratatouille:demolding",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs(results)
    })
}

function curving(event, head, ingredients, results) {
    return event.custom({
        "type": "vintageimprovements:curving",
        "item_as_head": head,
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs(results)
    })
}

function vibrating(event, ingredients, results, processingTime) {
    return event.custom({
        "type": "vintageimprovements:vibrating",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs(results),
        "processing_time": processingTime
    })
}

function coiling(event, ingredients, results, processingTime) {
    return event.custom({
        "type":"vintageimprovements:coiling",
        "spring_color": "000000",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results]),
        "processing_time": processingTime
    })
}

function itemApplication(event, ingredients, results) {
    return event.custom({
        "type": "create:item_application",
        "ingredients": createRecipeIngredients(ingredients),
        "results": createRecipeOutputs(results)
    })
}

function sandpaperPolishing(event, ingredients, results) {
    return event.custom({
        "type": "create:sandpaper_polishing",
        "ingredients": createRecipeIngredients([ingredients]),
        "results": createRecipeOutputs([results])
    })
}

function threshing(event, ingredients, results, processingTime) {
    return event.custom({
        "type": "ratatouille:threshing",
        "ingredients": createRecipeIngredients(ingredients),
        "results": createRecipeOutputs(results),
        "processing_time": processingTime
    })
}

function tableCasting(event, moldConsumed, ingredients, processingTime, results) {
    return event.custom({
        "type": "createmetallurgy:casting_in_table",
        "mold_consumed": moldConsumed,
        "ingredients": createRecipeIngredients(ingredients),
        "processing_time": processingTime,
        "result": { item: createRecipeOutput(results) }
    })
}

function basinCasting(event, moldConsumed, ingredients, processingTime, results) {
    return event.custom({
        "type": "createmetallurgy:casting_in_basin",
        "mold_consumed": moldConsumed,
        "ingredients": createRecipeIngredients(ingredients),
        "processing_time": processingTime,
        "result": { item: createRecipeOutput(results) }
    })
}

function melting(event, heatRequirement, ingredients, processingTime, results) {
    return event.custom({
        "type": "createmetallurgy:melting",
        "heat_requirement": heatRequirement,
        "ingredients": createRecipeIngredients([ingredients]),
        "processing_time": processingTime,
        "results": createRecipeOutputs([results])
    })
}

function bulkMelting(event, minHeat, maxHeat, ingredients, processingTime, results) {
    return event.custom({
        "type": "createmetallurgy:bulk_melting",
        "ingredients": createRecipeIngredients([ingredients]),
        "maxHeatRequirement": maxHeat,
        "minHeatRequirement": minHeat,
        "processing_time": processingTime,
        "results": createRecipeOutputs([results])
    })
}

function alloying(event, heatRequirement, ingredients, processingTime, results) {
    let recipe = {
        "type": "createmetallurgy:alloying",
        "ingredients": createRecipeIngredients(ingredients),
        "processing_time": processingTime,
        "results": createRecipeOutputs([results])
    }
    if (heatRequirement) recipe.heat_requirement = heatRequirement
    return event.custom(recipe)
}

function addStoragePair(event, bigItem, smallItem, count) {
    const smallStack = count + 'x ' + smallItem
    event.shapeless(Item.of(bigItem), [smallStack])
    event.shapeless(Item.of(smallStack), [bigItem])
}

function slabPair(event, type, block, slab) {
    event.shaped(`6x ${slab}`, ['AAA'], { A: block })
    if (type == 'stone') event.stonecutting(`2x ${slab}`, block)
    if (type == 'wood') event.recipes.create.cutting(`2x ${slab}`, block)
}

function slabPairReverse(event, type, block, slab) {
    event.shaped(block, ['A', 'A'], { A: slab })
}

ServerEvents.recipes(event => {

    const hasFluid = Platform.isLoaded('fluid')
    const hasGeodePlus = Platform.isLoaded('geode_plus')

    // Deploying
    event.recipes.create.deploying('create:schedule', [createRecipeInput(AddItem('minecraft:paper')), createRecipeInput(AddItem('create:sturdy_sheet'))])
    event.recipes.create.deploying('vintageimprovements:recipe_card', [createRecipeInput(AddItem('minecraft:paper')), createRecipeInput(AddItem('#cwi:leathers'))])

    // Curving
    curving(event, 'minecraft:iron_ingot', AddItem('kubejs:clay_disk'), [AddItem('kubejs:clay_ingot_mold')])
    curving(event, 'minecraft:iron_nugget', AddItem('kubejs:clay_disk'), [AddItem('kubejs:clay_nugget_mold')])
    curving(event, 'create:iron_sheet', AddItem('kubejs:clay_disk'), [AddItem('kubejs:clay_sheet_mold')])
    curving(event, 'createaddition:iron_rod', AddItem('kubejs:clay_disk'), [AddItem('kubejs:clay_rod_mold')])

    // Turning
    turning(event, AddItem('create:industrial_iron_block'), AddItem('vintageimprovements:w_shaped_curving_head'))
    turning(event, AddItem('create:industrial_iron_block'), AddItem('vintageimprovements:v_shaped_curving_head'))
    turning(event, AddItem('create:industrial_iron_block'), AddItem('vintageimprovements:concave_curving_head'))
    turning(event, AddItem('create:industrial_iron_block'), AddItem('vintageimprovements:convex_curving_head'))
    turning(event, AddItem('kubejs:industrial_iron_ingot'), AddItem('createdieselgenerators:engine_piston'))
    turning(event, AddItem('kubejs:industrial_iron_ingot'), AddItem('kubejs:industrial_iron_blade'))
    turning(event, AddItem('kubejs:industrial_iron_ingot'), AddItem('kubejs:industrial_iron_drill_head'))
    turning(event, AddItem('create:sturdy_sheet'), AddItem('createmetallurgy:sturdy_whisk'))
    turning(event, AddItem('minecraft:iron_ingot'), AddItem('create:whisk'))
    turning(event, AddItem('minecraft:iron_ingot'), AddItem('create:propeller'))
    turning(event, AddItem('create:andesite_alloy'), AddItem('kubejs:andesite_bearing'))
    turning(event, AddItem('kubejs:fireproof_brick_disk'), AddItem('kubejs:fireproof_brick_ingot_mold'))
    turning(event, AddItem('kubejs:fireproof_brick_disk'), AddItem('kubejs:fireproof_brick_nugget_mold'))
    turning(event, AddItem('kubejs:fireproof_brick_disk'), AddItem('kubejs:fireproof_brick_sheet_mold'))
    turning(event, AddItem('kubejs:fireproof_brick_disk'), AddItem('kubejs:fireproof_brick_rod_mold'))
    turning(event, AddItem('kubejs:terracotta_disk'), AddItem('kubejs:terracotta_ingot_mold'))
    turning(event, AddItem('kubejs:terracotta_disk'), AddItem('kubejs:terracotta_nugget_mold'))
    turning(event, AddItem('kubejs:terracotta_disk'), AddItem('kubejs:terracotta_sheet_mold'))
    turning(event, AddItem('kubejs:terracotta_disk'), AddItem('kubejs:terracotta_rod_mold'))

    // Cutting
    cutting(event, AddItem('minecraft:dead_bush'), AddItem('2 minecraft:stick'))
    cutting(event, AddItem('stick'), AddItem('2 createdieselgenerators:wood_chip', 0.75))

    // Chiseling
    chiseling(event, AddItem('create:brass_sheet'), AddItem('kubejs:brass_circuit_board'))
    chiseling(event, AddItem('minecraft:glass'), AddItem('minecraft:glass_pane'))

    // Pressing
    event.recipes.create.pressing('2x kubejs:broken_burnt_log', 'kubejs:burnt_log')
    event.recipes.create.pressing('2x kubejs:stripped_broken_burnt_log', 'kubejs:stripped_burnt_log')
    event.recipes.create.pressing('2x kubejs:broken_ash_log', 'kubejs:ash_log')
    event.recipes.create.pressing('2x kubejs:stripped_broken_ash_log', 'kubejs:stripped_ash_log')

    // Item Application
    itemApplication(event, [AddItem('createdieselgenerators:chip_wood_block'), AddItem('kubejs:andesite_alloy_sheet')], [AddItem('create:andesite_casing')])
    itemApplication(event, [AddItem('createdieselgenerators:chip_wood_block'), AddItem('#cwi:rubbers')], [AddItem('kubejs:sealed_wood')])
    itemApplication(event, [AddItem('kubejs:sealed_wood'), AddItem('create:copper_sheet')], [AddItem('create:copper_casing')])
    itemApplication(event, [AddItem('kubejs:quality_sealed_wood'), AddItem('create:brass_sheet')], [AddItem('create:brass_casing')])
    itemApplication(event, [AddItem('create:brass_casing'), AddItem('kubejs:industrial_iron_sheet')], [AddItem('kubejs:industrial_casing')])
    itemApplication(event, [AddItem('kubejs:harden_wood'), AddItem('tfmg:heavy_plate')], [AddItem('tfmg:steel_casing')])
    itemApplication(event, [AddItem('kubejs:mechanical_arm_base'), AddItem('kubejs:robot_hand')], [AddItem('create:mechanical_arm')])
    if (hasFluid) itemApplication(event, [AddItem('kubejs:mechanical_arm_base'), AddItem('kubejs:robot_pipette')], [AddItem('fluid:pipette')])
    itemApplication(event, [AddItem('kubejs:mechanical_arm_base'), AddItem('#cwi:chemical_sprayer')], [AddItem('createdieselgenerators:chemical_turret')])

    // Sandpaper Polishing
    sandpaperPolishing(event, AddItem('kubejs:sealed_wood'), AddItem('kubejs:polished_sealed_wood'))
    if (hasGeodePlus) sandpaperPolishing(event, AddItem('geode_plus:nether_quartz_crystal_block'), AddItem('minecraft:quartz_block'))

    // Liquid Burning
    liquidBurning(event, AddFluid('1 kubejs:gasoline'), 48, true)
    liquidBurning(event, AddFluid('1 kubejs:diesel'), 32, true)
    liquidBurning(event, AddFluid('1 kubejs:kerosene'), 32, false)
    liquidBurning(event, AddFluid('1 kubejs:methane'), 16, false)
    liquidBurning(event, AddFluid('1 createdieselgenerators:plant_oil'), 4, false)

    // Conversion
    addStoragePair(event, 'kubejs:industrial_rubber_block', 'tfmg:rubber_sheet', 9)
    addStoragePair(event, 'kubejs:rubber_block', 'kubejs:rubber', 9)
    addStoragePair(event, 'kubejs:raw_tin_block', 'kubejs:raw_tin', 9)
    addStoragePair(event, 'kubejs:raw_silver_block', 'kubejs:raw_silver', 9)
    addStoragePair(event, 'createmetallurgy:refractory_mortar', 'createmetallurgy:refractory_mortar_ball', 4)

    // Slab
    slabPair(event, 'normal', 'kubejs:depleted_dirt', 'kubejs:depleted_dirt_slab')
    slabPairReverse(event, 'normal', 'kubejs:depleted_dirt', 'kubejs:depleted_dirt_slab')

    // Special Melting And Casting
    alloying(event, 'superheated', [
        AddItem('kubejs:andesite_powder'), AddItem('kubejs:andesite_powder'), AddItem('kubejs:andesite_powder'), AddItem('kubejs:andesite_powder'),
        AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder')
    ], 360, AddFluid('300 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('kubejs:andesite_powder'), AddItem('kubejs:andesite_powder'), AddItem('kubejs:andesite_powder'), AddItem('kubejs:andesite_powder'),
        AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball')
    ], 360, AddFluid('300 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('kubejs:andesite_gravel'),
        AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder')
    ], 360, AddFluid('350 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('kubejs:andesite_gravel'),
        AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball')
    ], 360, AddFluid('350 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('kubejs:cobbled_andesite'),
        AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder')
    ], 360, AddFluid('400 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('kubejs:cobbled_andesite'),
        AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball')
    ], 360, AddFluid('400 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('minecraft:andesite'),
        AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder'), AddItem('kubejs:clay_powder')
    ], 360, AddFluid('400 kubejs:molten_andesite_alloy'))

    alloying(event, 'superheated', [
        AddItem('minecraft:andesite'),
        AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball'), AddItem('minecraft:clay_ball')
    ], 360, AddFluid('400 kubejs:molten_andesite_alloy'))

    basinCasting(event, false, [AddFluid('1000 kubejs:molten_slime')], 43, AddItem('minecraft:slime_block'))
    basinCasting(event, false, [AddFluid('1000 kubejs:molten_slag')], 1482, AddItem('tfmg:slag_block'))

    // Alloying Recipes
    alloying(event, null, [AddFluid('30 kubejs:molten_gold'), AddFluid('10 kubejs:molten_silver')], 4, AddFluid('40 kubejs:molten_electrum'))
    alloying(event, null, [AddFluid('30 kubejs:molten_copper'), AddFluid('10 kubejs:molten_nickel')], 4, AddFluid('40 kubejs:molten_constantan'))
    alloying(event, null, [AddFluid('40 kubejs:molten_copper'), AddFluid('10 kubejs:molten_tin')], 5, AddFluid('50 kubejs:molten_bronze'))
    alloying(event, null, [AddFluid('10 kubejs:molten_copper'), AddFluid('10 kubejs:molten_zinc')], 2, AddFluid('20 kubejs:molten_brass'))

    alloying(event, 'heated', [AddFluid('30 kubejs:molten_gold'), AddFluid('10 kubejs:molten_silver')], 4, AddFluid('40 kubejs:molten_electrum'))
    alloying(event, 'heated', [AddFluid('30 kubejs:molten_copper'), AddFluid('10 kubejs:molten_nickel')], 4, AddFluid('40 kubejs:molten_constantan'))
    alloying(event, 'heated', [AddFluid('40 kubejs:molten_copper'), AddFluid('10 kubejs:molten_tin')], 5, AddFluid('50 kubejs:molten_bronze'))
    alloying(event, 'heated', [AddFluid('10 kubejs:molten_copper'), AddFluid('10 kubejs:molten_zinc')], 2, AddFluid('20 kubejs:molten_brass'))

    alloying(event, 'superheated', [AddFluid('30 kubejs:molten_gold'), AddFluid('10 kubejs:molten_silver')], 4, AddFluid('40 kubejs:molten_electrum'))
    alloying(event, 'superheated', [AddFluid('30 kubejs:molten_copper'), AddFluid('10 kubejs:molten_nickel')], 4, AddFluid('40 kubejs:molten_constantan'))
    alloying(event, 'superheated', [AddFluid('40 kubejs:molten_copper'), AddFluid('10 kubejs:molten_tin')], 5, AddFluid('50 kubejs:molten_bronze'))
    alloying(event, 'superheated', [AddFluid('10 kubejs:molten_copper'), AddFluid('10 kubejs:molten_zinc')], 2, AddFluid('20 kubejs:molten_brass'))
})
