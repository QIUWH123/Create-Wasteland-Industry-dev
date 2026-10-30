# CWI Core KubeJS API

This reference documents the script-facing API of the installed CWI Core for Minecraft 1.21.1. Read [the main KubeJS reference](kubejs.md) for navigation, [events and builders](KUBEJS_EVENTS_AND_BUILDERS.md) for the surrounding KubeJS APIs, [addon recipe APIs](KUBEJS_RECIPE_API.md) for non-Core recipe fields, [development standards](DEVELOPMENT_STANDARDS.md) for pack conventions, and [the schema guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) for schema authoring.

The reference was checked against `mods/cwi-0.1.0-dev+1.21.1.jar` on 30 October 2026. SHA-256: `aa68c21b5b16b17596f8de2017a49101779a5e75cf594cf61b5ea61d6c4de825`. Its 182 Core class files matched the available compiled development classes byte for byte, allowing source inspection to supplement installed bytecode and resources. These checks establish the installed API; examples have not been exercised in a new Minecraft launch.

## Contents

- [Ownership and script placement](#ownership-and-script-placement)
- [Core globals](#core-globals)
- [Custom events](#custom-events)
- [Item shadow extensions](#item-shadow-extensions)
- [Hammer item builder](#hammer-item-builder)
- [Native machine recipes](#native-machine-recipes)
- [Incubator preparation display](#incubator-preparation-display)
- [Hammer conversion recipes](#hammer-conversion-recipes)
- [Equipment upgrade recipes](#equipment-upgrade-recipes)
- [Material-based equipment upgrade event](#material-based-equipment-upgrade-event)
- [Fan processing recipes](#fan-processing-recipes)
- [Native blocks, sounds and tag readers](#native-blocks-sounds-and-tag-readers)
- [Addon compatibility supplied by Core](#addon-compatibility-supplied-by-core)
- [Assets and migration boundaries](#assets-and-migration-boundaries)
- [Evidence and update procedure](#evidence-and-update-procedure)

## Ownership And Script Placement

Core owns machine execution, charged hammer actions, equipment-upgrade crafting and their native JEI categories. KubeJS defines the recipes, registered hammer items, selected per-item callbacks, tags and pack assets. Do not install a second scripted implementation of an action already executed by Core.

| API | Script directory | Reload boundary |
| --- | --- | --- |
| `StartupEvents.registry('item', ...)` with builder type `'hammer'` | `startup_scripts/` | Full restart for registry changes |
| `CwiEvents.blockRegistration(...)` | `startup_scripts/` | First startup load only; full restart |
| `.shadowAmount(...)` / `.shadowColor(...)` on builders and modification objects | `startup_scripts/` | Registration/modification lifecycle |
| `CwiEvents.shadowDrop(...)` | `client_scripts/` | Client script load |
| `CwiEvents.equipmentUpgrades(...)` | `server_scripts/` | Fresh definitions each server resource reload |
| `event.recipes.cwi.*(...)` | Inside `ServerEvents.recipes(...)` | Server recipe reload |

The installed JAR includes eight recipe-schema JSON resources: `blast_furnace_processing`, `mixing_vessel_mixing`, `incubating`, `block_conversion`, `depot_conversion`, `equipment_upgrade`, `corroding` and **`sterilzing`**. The last ID is intentionally spelled exactly as registered.

## Core Globals

Core exposes these Java classes without a separate `Java.loadClass(...)` call:

| Binding | Class or purpose |
| --- | --- |
| `Cwi` | `net.quiwh.cwi.CwiCore`; exposes `ID`, `MODID`, `NAME`, `LOGGER`, `REGISTRATE`, `FAN_TYPES`, `loadResource(path)` |
| `RegistryType` | KubeJS registry types |
| `LocalDateTime` | Java time class; does not provide Minecraft world time |
| `Player`, `Level`, `InteractionHand`, `Rarity` | Minecraft types/enums |
| `ItemTags`, `BlockTags`, `FluidTags` | Vanilla tag constants |
| `NeoForgeTags`, `NeoForgeTags$Items`, `NeoForgeTags$Blocks`, `NeoForgeTags$Fluids` | NeoForge common tag constants |
| `ForgeTags`, `ForgeTags$Items`, `ForgeTags$Blocks`, `ForgeTags$Fluids` | Compatibility aliases for those same NeoForge classes |
| `ChatFormatting` | Minecraft text colors/styles |
| `NeoForgeRegistries`, `BuiltInRegistries` | Registry access classes |
| `ParticleTypes` | Vanilla particle constants |
| `Item$Properties`, `BlockBehaviour$Properties`, `BlockItem` | Native item/block construction types |
| `AllSoundEvents`, `AllParticleTypes` | Create sound/particle constants |
| `TooltipHelper`, `CreateLang` | Create tooltip/language utilities |

For example, `Cwi.loadResource('incubating')` returns a resource location for `cwi:incubating`. `Cwi` is a Java class binding, not a recipe builder or mutable pack data object. The `ForgeTags` aliases do not create `forge:` tag definitions; new code should use the `NeoForgeTags` names and the pack's selected tag IDs.

`CwiSounds` is not a supplied global. Current scripts load `net.quiwh.cwi.sound.CwiSounds` explicitly when a native `SoundEvent` object is required.

## Custom Events

All three events belong to `CwiEvents`. Their callbacks configure Core; no cancellable form of these events is registered.

### Block Registration

```js
CwiEvents.blockRegistration(event => {
    event.prevent('tfmg:steel_mechanism')
    event.prevent('tfmg:fireproof_bricks')
})
```

This reproduces the blocked IDs in [the registration rules](../kubejs/startup_scripts/RegistrationBlock.js). It prevents registration rather than merely hiding an item or removing recipes.

| Method | Effect |
| --- | --- |
| `event.prevent('mod:id')` | Block both the block ID and its item ID |
| `event.preventBlock('mod:id')` | Block only the block registry entry |
| `event.preventItem('mod:id')` | Block only the item registry entry |

Methods return the event for chaining. IDs must be valid, exact, namespaced resource IDs; tags and wildcards are not accepted. An entry already registered cannot be blocked by this event. This especially matters for vanilla and mods registering before the hook.

Core gathers the rules once after startup scripts load, then closes the configuration. A later startup-script reload cannot reconfigure registries; restart the game. Do not save this event for delayed calls. Removing a registry entry also requires checking recipes, tags, references and saved content that used it; the event does not rewrite them.

### Global Item Shadow Defaults

```js
CwiEvents.shadowDrop(event => {
    event.amount(0.15)
    event.color('#203040')
})
```

This is an illustrative style, not a request to change the current defaults.

| Method | Accepted value |
| --- | --- |
| `.amount(value)` | Finite number from `0` through `1`; zero disables the shadow and one is fully opaque |
| `.color('#RRGGBB')` | Exactly six hexadecimal color digits |
| `.color(0xRRGGBB)` | Finite integer from `0` through `0xFFFFFF` |

Rules are rebuilt after each client script load and the event closes after configuration. They change in-memory defaults; they do not write the Shadow Drop configuration file. An omitted channel inherits its previous native/configuration default.

### Equipment Upgrade Definitions

`CwiEvents.equipmentUpgrades(event => { ... })` defines materials and upgrade rules before ordinary recipe loading. See [the complete event reference below](#material-based-equipment-upgrade-event). Current production upgrades use the direct recipe schema instead; both interfaces feed the same native recipe implementation.

## Item Shadow Extensions

Core adds two fluent methods to existing KubeJS item builders, block builders, item modification objects and block modification objects:

| Method | Meaning |
| --- | --- |
| `.shadowAmount(value)` | Item-specific opacity, with the same finite `0..1` bounds as the global event |
| `.shadowColor('#RRGGBB')` / `.shadowColor(0xRRGGBB)` | Item-specific RGB shadow color |

```js
ItemEvents.modification(event => {
    event.modify('minecraft:glass', item => {
        item.shadowAmount(0.15)
        item.shadowColor('#203040')
    })
})
```

This example only demonstrates the API. Color affects the shadow, not the item's texture or tint. A block's shadow setting applies to its inventory item, not its placed-world geometry. Applying it to a block with no item is rejected.

Each channel inherits independently: native/configuration defaults → `CwiEvents.shadowDrop` → per-item style. Setting only opacity preserves the inherited color. A block-item builder's explicit style can override the style forwarded from its block builder. Rendering requires Shadow Drop to be installed; these extensions do not replace it.

## Hammer Item Builder

Registered builder type: **`kubejs:hammer`**, normally selected with `'hammer'`.

```js
StartupEvents.registry('item', event => {
    event.create('minecraft:stone_hammer', 'hammer')
        .tier('stone')
        .chargeTime(18)
        .maxStage(1)
        .unstackable()
        .tag('minecraft:hammers')
        .texture('kubejs:item/tools/stone_hammer')
        .chargedTexture(1, 'kubejs:item/tools/charged_stone_hammer')
})
```

This is an abbreviated pattern from [the hammer registrations](../kubejs/startup_scripts/Items/hammers.js), not an additional item registration to paste beside them.

### Builder Methods

| Method | Default / contract |
| --- | --- |
| `.chargeTime(ticks)` | `12`; positive integer held-use ticks per stage |
| `.maxStage(stage)` | `3`; positive integer maximum charged stage |
| `.chargeModels(enabled)` | `true`; generate normal charged models automatically |
| `.chargedTexture(stage, texture)` | Full replacement texture for visual stage `1`, `2` or `3` |
| `.afterImpact(callback)` | Callback after successful charged entity damage on the server |

It inherits `HandheldItemBuilder`: `.tier(...)`, `.modifyTier(...)`, `.attackDamageBaseline(...)`, `.speedBaseline(...)`, `.attackDamageBonus(...)`, `.speed(...)`, and ordinary item-builder methods/callbacks. Its initial attack-damage baseline is `3`, with attack speed `-2.4` before pack overrides.

The native builder adds `minecraft:swords`, `forge:tools` and `minecraft:breaks_decorated_pots`. Production adds `minecraft:hammers`; [legacy tag cleanup](../kubejs/server_scripts/Tags/LegacyTags.js) subsequently removes legacy `forge:` definitions. Do not infer final tag membership solely from builder defaults.

### Model Generation

Use `.texture(...)` for the base image. Automatic generation writes the base model plus `namespace:item/<item path>/charged_1`, `charged_2` and `charged_3`. Normal stages add `cwi:item/tools/charged_overlay_1..3` as a second texture layer. `.chargedTexture(...)` replaces a stage's complete image and removes the overlay layer.

The model overrides use the `minecraft:custom_model_data` component. Visual stages are limited to the three generated models even though `.maxStage(...)` accepts any positive integer. The current pack uses stages at most three.

An explicit `.modelGenerator(...)` takes ownership of the model and bypasses automatic charged-model generation. `.chargeModels(false)` leaves model handling to normal/custom assets. The steel pipe intentionally uses this mode; the stone hammer intentionally retains its dedicated stage-one texture.

### Impact Callback

```js
hammer.afterImpact(impact => {
    console.info(`Hammer hit at stage ${impact.stage}: ${impact.damage}`)
})
```

The example logs an impact and assumes `hammer` is the builder already being configured. It is not a standalone registration.

| Context property | Value |
| --- | --- |
| `impact.item` | Hammer `ItemStack` |
| `impact.level` | Hit level |
| `impact.player` | Attacking player |
| `impact.target` | Successfully damaged living entity |
| `impact.hand` | Used `InteractionHand` |
| `impact.stage` | Charged stage |
| `impact.damage` | Native damage argument |

`.afterImpact(...)` adds behavior without replacing native damage, effects, wear or cooldown. It runs once after a successful server-side charged entity hit. Callback exceptions are logged; native wear and cooldown still follow. Use this hook for an additional hit effect, rather than moving it into an unconditional pre-damage callback.

The lead hammer's original neurotoxin provider is absent. Current code checks the effect registry before applying it; do not invent a substitute effect.

### Native Release Behavior

- Stage is `min(floor(held ticks / chargeTime), maxStage)`; a release below stage one does nothing.
- Successful charged entity damage uses the player's attack-damage attribute multiplied by stage. Native effects, durability cost of `stage`, and cooldown `max(1, floor(chargeTime * sqrt(stage)))` follow.
- Block conversion can perform up to `stage` successive blows, looking up the resulting block again after every blow. The chain stops when no conversion matches.
- A top-face depot hit tries a depot conversion first. It processes one input item per activation and checks output capacity.
- Conversion matching prefers the highest required stage the charged hammer can satisfy. Equal-stage ties use the lexicographically greatest recipe ID.
- Replaced blocks use their target block's default state; input block-state properties are not copied.
- The native action checks the player's interaction permission.

An inherited `.releaseUsing(...)` callback **replaces** the native release implementation. The current steel pipe deliberately does this for its distinct entity-only action. Do not add such a callback to ordinary material hammers merely to add another effect.

Pack hammer IDs are `minecraft:<material>_hammer`, while the pipe item remains `kubejs:steel_pipe`. A native sound ID does not rename its associated item.

## Native Machine Recipes

### Factories And Constructors

```js
event.recipes.cwi.blast_furnace_processing()
event.recipes.cwi.mixing_vessel_mixing()
event.recipes.cwi.incubating()
```

All three also support the standard `(outputs, inputs)` constructor. Single entries or lists are accepted. For mixed item/fluid lists, use `Fluid.of(...)` for fluids so the wrapper can distinguish them from item IDs.

```js
ServerEvents.recipes(event => {
    event.recipes.cwi.mixing_vessel_mixing(
        Fluid.of('kubejs:caustic_soda', 125),
        ['kubejs:caustic_soda_powder', Fluid.of('kubejs:distilled_water', 125)]
    )
        .processingTime(20)
        .id('cwi:mixing_vessel/caustic_soda_fluid')
})
```

This expresses an existing [mixing-vessel recipe](../kubejs/server_scripts/Machines/MixingVessel.js) using the convenience constructor. It should replace that definition only during an intentional refactor; it must not be registered twice.

The fluent `.input(...)` / `.inputs(...)` methods replace the entire input side, and `.output(...)` / `.outputs(...)` replace the entire output side. They do **not** append. On mixed sides, this replaces both item and fluid channels. Explicit channel setters below change only their own channel.

### Fields And Setters

| Saved key | Fluent setter | Available on | Default / bounds |
| --- | --- | --- | --- |
| `item_inputs` | `.itemInputs(list)` | All three | `[]`; at most 64 entries |
| `fluid_inputs` | `.fluidInputs(list)` | Furnace, mixer | `[]`; at most 64 entries |
| `item_outputs` | `.itemOutputs(list)` | Mixer, incubator | `[]`; at most 64 entries |
| `fluid_outputs` | `.fluidOutputs(list)` | Furnace, mixer | `[]`; at most 64 entries |
| `processing_time` | `.processingTime(ticks)` | All three | `100`; positive integer |
| `minimum_rpm` | `.minimumRpm(rpm)` | Mixer, incubator | `0`; finite nonnegative number |
| `minimum_heat` | `.minimumHeat(value)` | Furnace | `0`; nonnegative integer |
| `heat_requirement` | `.heatRequirement(value)` | Furnace | `'none'`; `'none'`, `'heated'` or `'superheated'` |
| `incubation_display` | `.incubationDisplay(object)` | Incubator | Absent; see display reference |

At least one input is required. The schema's 64-entry bound is a serialization limit, not a promise of 64 distinct physical slots/tanks. A recipe must fit the actual machine. Furnace output is fluid-only and it cannot require RPM. Mixer/incubator cannot require furnace heat. Incubator has no tanks and requires exactly one item-input entry with count one and `per_tick: false`.

| Physical storage | Installed capacity / automation rule |
| --- | --- |
| Mixing vessel | Six item slots, external insertion into the first four; three 1,000 mB tanks |
| Incubator | Eight independent single-plate lanes and eight single-item output slots; external insertion into plate slots only; no tanks |
| Blast furnace | Eight item slots, with four routed for coke and four for other items; four 3,000 mB input tanks split into two nongas and two gas tanks, plus two 3,000 mB output tanks |

Furnace hatches expose inputs; the controller's front exposes fluid outputs. The incubator's plate tag and the furnace's gas/coke tags affect insertion independently of ingredient matching. Recipes should be designed for these physical routes rather than only their schema bounds.

### Registered Core Recipe Components

| Component ID | Meaning |
| --- | --- |
| `cwi:machine_item_input` | Counted ingredient, consumption chance and per-tick flag |
| `cwi:machine_fluid_input` | Sized fluid ingredient, consumption chance and per-tick flag |
| `cwi:machine_item_output` | Item stack, output chance and per-tick flag |
| `cwi:machine_fluid_output` | Fluid stack, output chance and per-tick flag |
| `cwi:incubation_display` | Microbe/preparation metadata |
| `cwi:hammer_drop` | Item-stack drop with per-item chance |
| `cwi:upgrade_ingredient` | Counted crafting ingredient with consume/reuse and damage policy |
| `cwi:processing_output` | Native Create rollable item output |

These component IDs can be referenced by schema definitions when the Core plugin is present. Their JS wrappers and native serialized representations remain different contracts. Core also registers addon-specific components used by [its compatibility schemas](KUBEJS_RECIPE_API.md).

### JavaScript IO Entries

| Channel | Simple value | Structured value |
| --- | --- | --- |
| Item input | `'2x minecraft:iron_ingot'` | `{ ingredient: '#c:ingots/iron', count: 2, chance: 1, per_tick: false }` |
| Item input | `'minecraft:iron_ingot'` | `{ item: 'minecraft:iron_ingot', count: 2 }` |
| Fluid input | `Fluid.of('minecraft:water', 250)` | `{ ingredient: Fluid.of('minecraft:water', 250), amount: 250, chance: 1, per_tick: false }` |
| Item output | `'2x minecraft:iron_ingot'` | `{ item: 'minecraft:iron_ingot', count: 2, chance: 0.5, per_tick: false }` |
| Item output | `Item.of('minecraft:iron_ingot', 2)` | `{ stack: Item.of('minecraft:iron_ingot', 2), chance: 0.5 }` |
| Fluid output | `Fluid.of('minecraft:water', 250)` | `{ stack: Fluid.of('minecraft:water', 250), chance: 1, per_tick: false }` |

Counts and fluid amounts must be positive integers. `chance` defaults to `1` and must be finite in `0..1`. `per_tick` defaults to `false`. Provide `amount` explicitly for a structured fluid input; the outer value supplies its required quantity.

Use these wrappers rather than assuming every legacy fluid JSON shape is native codec JSON. A map containing an `amount`/`fluid` key or a typed fluid object is classified as fluid on a mixed side. An ordinary string is classified as an item first.

### Saved JSON Shapes

KubeJS convenience values above are converted into these native entry shapes:

```json
{
    "ingredient": { "item": "minecraft:iron_ingot" },
    "count": 2,
    "chance": 1.0,
    "per_tick": false
}
```

That is an item input. An item output instead uses a stack:

```json
{
    "stack": { "id": "minecraft:iron_ingot", "count": 2 },
    "chance": 0.5,
    "per_tick": false
}
```

A fluid output also uses a stack, with `amount` instead of `count`:

```json
{
    "stack": { "id": "minecraft:water", "amount": 250 },
    "chance": 1.0,
    "per_tick": false
}
```

A fluid input has a native NeoForge `FluidIngredient` under `ingredient`, plus an outer `amount`, `chance` and `per_tick`. Use `Fluid.of(...)` in KubeJS instead of guessing its ingredient codec representation. Optional defaults may be omitted by native serialization.

### Chance, Consumption And Transactions

An ordinary entry acts at batch completion. A `per_tick` entry acts on each successful working tick. Machine chance rolls apply once to the complete entry for each batch copy: an output of two ingots at `0.5` chance produces either two or zero for that roll. This differs from hammer drops, which roll per individual item.

An input with `chance: 0` is a presence requirement: its matching amount must be available, but none is consumed. A chance below one still requires the full matching input to be available. Output space and input allocation are simulated before a transaction is committed; failed simulation does not partially consume inputs or create outputs.

Core recipe components participate in KubeJS matching/replacement. A plain replacement ID preserves the old count/amount, chance and `per_tick` fields. An explicit structured replacement is wrapped as a new entry and uses its own supplied/default metadata. Review replacement shapes when using `replaceInput` or `replaceOutput`.

### Time, RPM And Heat

| Machine | Execution rule |
| --- | --- |
| Mixing vessel | Accepts either rotation direction; finite speed, no overstress, `max(1, minimum_rpm) <= abs(RPM) <= 256`. Duration is `max(1, floor(processing_time * 256 / abs(RPM)))`; up to four batch copies |
| Incubator | Accepts either direction; finite speed, no overstress, `max(64, minimum_rpm) <= abs(RPM) <= 256`. Duration stays `processing_time`; extra speed does not accelerate it |
| Blast furnace | Native formed furnace and valid heat required; no kinetic input. Required heat is the greater of `minimum_heat` and the named heat-stage threshold |

Furnace named thresholds are `none: 0`, `heated: 1200`, `superheated: 1900` in Core's internal furnace-temperature units. Do not relabel these numbers as real-world Celsius without separately establishing that interpretation. `minimumHeat(...)` is an absolute threshold, distinct from Create's named burner stage.

Native fingerprints include semantic recipe contents. Changing a recipe during reload invalidates saved processing progress for its older contents.

### Furnace Definition Pattern

```js
ServerEvents.recipes(event => {
    event.recipes.cwi.blast_furnace_processing()
        .itemInputs([
            'kubejs:iron_powder',
            'kubejs:limestone_powder',
            'tfmg:coal_coke_dust'
        ])
        .fluidOutputs([
            Fluid.of('kubejs:molten_pig_iron', 90),
            Fluid.of('kubejs:molten_slag', 20)
        ])
        .processingTime(300)
        .heatRequirement('superheated')
        .id('cwi:industrial_blasting/iron_powder_to_pig_iron')
})
```

This abbreviates an existing [furnace recipe](../kubejs/server_scripts/Machines/BlastFurnace.js), preserving its quantities. Ingredient coke and the furnace's native fuel behavior are separate mechanisms; defining a recipe input does not configure a new fuel system.

## Incubator Preparation Display

Production [incubator registrations](../kubejs/server_scripts/Machines/Incubator.js) use this pattern:

```js
ServerEvents.recipes(event => {
    global.microbes.forEach(microbe => {
        microbe.variants.forEach(variant => {
            const plate = `${variant.trait}_${microbe.name}_agar_plate`

            event.recipes.cwi.incubating()
                .itemInputs([{ ingredient: `kubejs:sealed_${plate}`, count: 1 }])
                .itemOutputs([{ item: `kubejs:cultured_${plate}` }])
                .processingTime(variant.time)
                .minimumRpm(64)
                .incubationDisplay({
                    microbe: `kubejs:${microbe.name}`,
                    yield_count: variant.count,
                    steps: variant.steps
                })
                .id(`cwi:incubating/${microbe.name}/${variant.trait}`)
        })
    })
})
```

Do not copy this beside the existing generator. `incubation_display` supplies JEI preparation metadata; it does not make the incubator consume these extra feeds or execute deploying/filling actions.

| Display field | Contract |
| --- | --- |
| `microbe` | Nonempty item stack; a string ID works in the JS wrapper |
| `yield_count` | Positive integer, default `1` |
| `steps` | Required array; zero through 64 steps |

Each step is one of these forms:

```js
const deployingStep = { type: 'deploying', item: 'minecraft:sugar', count: 2 }
const fillingStep = { type: 'filling', fluid: Fluid.of('minecraft:water', 50), count: 1 }
```

`deploying` requires an item and rejects a fluid field; `filling` requires a fluid and rejects an item field. `count` defaults to one and repeats that unit for display totals. A filling step can additionally specify a positive `amount` to override its fluid quantity.

Native JEI indexes every preparation item/fluid as an invisible input, so its uses can find this page. The displayed microbe is also indexed as input and output. The actual sealed plate remains the physical incubator input, and actual preparation recipes still define the deploying/filling consumption. Keep display data consistent with those recipes instead of using it as a second recipe definition.

## Hammer Conversion Recipes

### Shared API

```js
event.recipes.cwi.block_conversion(target, input)
event.recipes.cwi.depot_conversion(target, input)
```

Both also support an empty constructor followed by setters.

| Saved key | Setters | Contract |
| --- | --- | --- |
| `input` | `.input(value)`, `.ingredient(value)` | Nonempty item ingredient; required by native recipe |
| `target` | `.target(value)`, `.output(value)` | Item stack; a block target must be a block item |
| `stage` | `.requireStage(value)`, `.requiredStage(value)` | Positive integer, default `1` |
| `drops` | `.drops(list)`, `.outputs(list)` | Block conversion only; default `[]`, at most 64 |

The schema's `default_optional` flags allow the fluent empty constructor. They do not waive native required-field validation.

For block conversion, an omitted target means the result is air. Do not pass a normal item ID as a placed block, and do not rely on `'air'` as an output stack. Depot conversion requires a nonempty target and does not process block-drop lists.

### Block Removal And Drops

```js
ServerEvents.recipes(event => {
    event.recipes.cwi.block_conversion()
        .input('kubejs:ash_stone')
        .requireStage(1)
        .drops([{ item: 'kubejs:ash', count: 4, chance: 0.75 }])
        .id('cwi:hammer/block/kubejs/ash_stone')
})
```

This is an existing [hammer conversion](../kubejs/server_scripts/Recipes/Hammer.js) expressed directly. Each of the four ash items rolls its own `0.75` chance. JS drop wrappers accept `{ item, count, chance }` or `{ stack: Item.of(...), chance }`; saved JSON is `{ "stack": { "id": "kubejs:ash", "count": 4 }, "chance": 0.75 }`.

### Depot Conversion

```js
ServerEvents.recipes(event => {
    event.recipes.cwi.depot_conversion('create:crushed_raw_iron', 'minecraft:raw_iron')
        .requireStage(3)
        .id('cwi:hammer/depot/minecraft/raw_iron')
})
```

One raw-iron item is processed on a successful depot activation; a stack does not imply processing the entire stack. Conversion stage and charged-stage chaining are native behavior described in [the hammer section](#native-release-behavior).

## Equipment Upgrade Recipes

### Direct Factory

```js
event.recipes.cwi.equipment_upgrade(input, ingredients, enchantment, maxLevel, durabilityMultiplier)
```

An empty constructor with fluent setters is also available. Production uses the direct factory in [ToolArmorUpgrade.js](../kubejs/server_scripts/Recipes/ToolArmorUpgrade.js).

| Saved key | Setter | Contract |
| --- | --- | --- |
| `input` | `.input(ingredient)` | Required, nonempty equipment ingredient |
| `ingredients` | `.ingredients(list)` | Required; one through eight upgrade entries |
| `enchantment` | `.enchantment(id)` | Required registered enchantment ID |
| `max_level` | `.maxLevel(level)` | Required integer `1..255` |
| `durability_multiplier` | `.durabilityCost(value)`, `.durabilityMultiplier(value)` | Required finite nonnegative number |
| `output` | `.output(stack)` | Optional; explicit output must contain exactly one item |

Use `minecraft:sweeping_edge`, the actual current enchantment ID. The compatibility schema does not restore the obsolete `minecraft:sweeping` name.

### Ingredient Entries

```js
const parts = [
    { item: 'kubejs:small_hammer', consume: false },
    { item: 'minecraft:iron_ingot', consume: true }
]
```

An ingredient can be a simple ingredient string, `{ item: 'id', ... }`, or `{ ingredient: 'id-or-tag', ... }`. Fields are:

| Field | Default / bounds |
| --- | --- |
| `ingredient` or ingredient-shaped item/tag fields | Nonempty ingredient |
| `count` | `1`; integer `1..8` |
| `consume` | `true` |
| `damage` | `1`; nonnegative integer |

Count represents separate occupied crafting slots, not several items consumed from one stacked slot. Expanded upgrade parts must total at most eight slots; the equipment occupies the ninth. A reusable part (`consume: false`) returns its stack, damages it if damageable, and breaks it at its maximum damage. Consumable parts respect normal crafting remainders.

Saved ingredient entries use `{ "ingredient": { "item": "minecraft:iron_ingot" }, "count": 1, "consume": true, "damage": 1 }` rather than the JS convenience wrapper.

### Result And Durability Semantics

Each craft raises the selected enchantment by one level up to the recipe cap. Other enchantments and item components are retained. An omitted `output` copies the original equipment; an explicit output changes the item type while preserving original components through native stack transmutation. It does not blindly apply all components from an output template.

Core records enchantment order as `cwi:enchantment_order` inside custom data. Previously upgraded items without that metadata are initialized using their existing enchantment IDs. This order affects the durability cost, so do not replace the native result implementation with an old `.modifyResult(...)` callback.

For damageable equipment with durability remaining, the native added damage is based on:

```text
floor(remaining durability * durability multiplier * sqrt(target enchantment index + 2))
```

The index is its recorded zero-based position; a new enchantment uses `-1`. The cost is at least one when durability remains and is clamped so damage does not exceed `maxDamage - 1`. Therefore a multiplier of zero is not a guarantee of zero wear on damageable equipment.

Native JEI owns the dynamic result display, retained enchantments and reusable-ingredient presentation. No extra client category or scripted result callback is needed for these recipes.

## Material-Based Equipment Upgrade Event

This higher-level API can generate many direct upgrade recipes from material/equipment definitions. It is available in the installed Core but is not the current production upgrade generator. Refactoring production to it requires an explicit behavior-preserving comparison.

### Materials

```js
CwiEvents.equipmentUpgrades(event => {
    event.material('example_iron')
        .tier(2)
        .durabilityMultiplier(1)
        .equipment('pickaxe', 'minecraft:iron_pickaxe')
        .component('ingot', 'minecraft:iron_ingot')

    event.upgrade('example_unbreaking')
        .enchantment('minecraft:unbreaking')
        .maxLevel(3)
        .minimumTier(1)
        .types('pickaxe')
        .materials('example_iron')
        .durabilityCost(0.02)
        .component('ingot', 1, true, 1)
        .tool('kubejs:small_hammer', 1)
})
```

This is an illustrative generator, not an additional production route. It creates one iron-pickaxe rule with cap two (`min(3, tier 2)`).

`event.material(id)` creates a material; IDs without a namespace default to `cwi:`. Duplicate IDs are rejected.

| Material method | Default / contract |
| --- | --- |
| `.tier(value)` | `1`; integer at least one |
| `.durabilityMultiplier(value)` | `1`; finite nonnegative multiplier |
| `.equipment(type, ingredient)` | Equipment ingredient for a named equipment type |
| `.component(name, ingredient)` | Material-dependent ingredient for a named component |

Equipment and component names must be nonempty valid resource paths. Their ingredients must be nonempty. Reusing a name in the same material replaces its mapped value.

### Upgrade Rules

`event.upgrade(id)` creates a rule; unnamespaced IDs default to `cwi:` and duplicates are rejected.

| Upgrade method | Default / contract |
| --- | --- |
| `.enchantment(id)` | Required registered enchantment |
| `.maxLevel(value)` | `1`; integer `1..255` |
| `.minimumTier(value)` | `1`; integer at least one |
| `.fixedMax(value)` | `false`; if true, do not cap maximum level by material tier |
| `.durabilityCost(value)` | `0`; finite nonnegative base cost, multiplied by the material's durability multiplier |
| `.types(...names)` | Select material equipment types |
| `.materials(...ids)` | Restrict material IDs; selected materials must exist |
| `.input(ingredient)` | Supply a direct equipment ingredient |
| `.output(stack)` | Optional nonempty single-item output |
| `.ingredient(ingredient, count)` | Add a consumable fixed ingredient |
| `.tool(ingredient, damage)` | Add one reusable tool |
| `.ingredients(...)` | Add entries through the same upgrade-ingredient wrapper; prefer the explicitly shaped `.ingredient`, `.tool` and `.component` methods in new examples |
| `.component(name, count, consume, damage)` | Resolve an ingredient from each material's named component |

Ingredient counts/damage and total slot bounds are the same as the native upgrade recipe. Missing required material components, unknown selected materials, invalid enchantments and duplicate generated IDs are rejected before generated recipes are inserted.

### Expansion And IDs

- A direct `.input(...)` with no type/material selectors generates once, without a material context.
- Otherwise, rules expand across selected materials meeting `minimumTier`. Typed rules skip material/type pairs with no equipment mapping.
- A direct input plus material selection applies that input for each matching material, using the type path `direct`.
- Without `fixedMax(true)`, the cap is `min(maxLevel, material tier)`. With no material context, it is `maxLevel`.

Generated IDs are:

```text
<rule namespace>:equipment_upgrade/<rule path>_manual_only
<rule namespace>:equipment_upgrade/<rule path>/<material namespace>/<material path>/<type>_manual_only
```

Definitions are recreated each server resource reload. Keep them reload-local; do not save the event or definitions into startup `global` state.

## Fan Processing Recipes

Core supplies two native Create fan processes:

| Recipe factory / serializer | Activating block tag |
| --- | --- |
| `event.recipes.cwi.corroding(...)` / `cwi:corroding` | `create:fan_processing_catalysts/corroding` |
| `event.recipes.cwi.sterilzing(...)` / `cwi:sterilzing` | `create:fan_processing_catalysts/sterilizing` |

The recipe name is `sterilzing`, while the catalyst tag is correctly spelled `sterilizing`. Preserve both exact IDs.

```js
ServerEvents.recipes(event => {
    event.recipes.cwi.sterilzing('kubejs:sterile_petri_dish', 'kubejs:petri_dish')
})
```

This is the production [petri-dish sterilizing pattern](../kubejs/server_scripts/Recipes/MicrobesCulture.js). Constructors use `(outputs, inputs[, processingTime])`.

| Saved key | Component / default |
| --- | --- |
| `results` | List of `cwi:processing_output`; required |
| `ingredients` | List of item ingredients; required |
| `processing_time` | Tick duration; default `100` |

Native limits are one item input and at most 12 item outputs. Processing outputs accept item strings, `ItemStack`, Create `ProcessingOutput`, `{ stack: Item.of(...), chance: ... }`, or normalized item-output objects. For a typed chance output, use `CreateItem.of(Item.of('id', count), chance)` when that binding is available through KubeJS Create; do not restore `Item.of(...).withChance(...)`.

The fluid-like catalyst is a **tagged block in the fan airflow**, not an additional recipe ingredient. Do not add an acid bucket to every corroding recipe. [Fan catalyst blocks](../kubejs/startup_scripts/Blocks/FanCatalyst.js) and [their construction recipes](../kubejs/server_scripts/Recipes/FanCatalyst.js) handle the pack's catalyst items separately. Native fan effects and particles need no duplicate scripted simulation.

## Native Blocks, Sounds And Tag Readers

### Registered IDs Used By Scripts

| Group | Native IDs |
| --- | --- |
| Recipe machines | `cwi:blast_furnace`, `cwi:furnace_hatch`, `cwi:mixing_vessel`, `cwi:incubator` |
| Other machines/components | `cwi:stirling_engine`, `cwi:lava_extractor_head`, `cwi:lava_extractor_pump`, `cwi:lava_extractor_stress_input`, `cwi:lava_extractor_pump_blade`, `cwi:solar_evaporator` |
| Furnace/foundation materials | `cwi:fireproof_bricks`, `cwi:cast_iron_blast_furnace_reinforcement`, `cwi:steel_blast_furnace_reinforcement`, `cwi:eruptive_bedrock` |
| Budding blocks | `cwi:infected_budding_amethyst`, `cwi:infected_budding_quartz` |
| Custom sound events | `cwi:steel_pipe`, `cwi:player_spawn` |

These existing native blocks are recipe ingredients/results, not new KubeJS builder types. Native random-tick infected-budding growth is distinct from the pack's KubeJS spout-handler catalyst growth. [BuddingCatalyze.js](../kubejs/startup_scripts/RecipeRegister/BuddingCatalyze.js) still defines that spout behavior. Quartz targets resolve conditionally against Geode Plus; do not assume that registering the infected quartz block installs the optional target mod.

Only furnace, mixer and incubator machine recipe serializers are registered. The lava extractor and Stirling engine use native behavior. The solar evaporator remains storage-only in this implementation; there is no native evaporation recipe factory to document. An arc-furnace API is not supplied.

### Native Tag Readers

| Tag | Registry | Reader / meaning |
| --- | --- | --- |
| `cwi:fireproof_bricks` | Block | Blast-furnace structure brick classification |
| `cwi:cast_iron_reinforcement` | Block | Blast-furnace cast reinforcement classification |
| `cwi:steel_reinforcement` | Block | Blast-furnace steel reinforcement classification |
| `cwi:reinforced_fireproof_bricks` | Block | Reinforced-brick structure classification |
| `cwi:lava_extractor_floor` | Block | Valid foundation for the lava extractor |
| `cwi:coke` | Item | Furnace coke-item routing; native code also recognizes its explicit TFMG coke IDs |
| `cwi:petri_dish` | Item | Incubator dish handling; recipe-specific plate inputs still apply |
| `cwi:gases` | Fluid | Furnace gas routing/classification |
| `create:passive_boiler_heaters` | Block | Passive heating recognized by the furnace and Stirling engine |
| `create:fan_processing_catalysts/corroding` | Block | Corroding fan catalyst selection |
| `create:fan_processing_catalysts/sterilizing` | Block | Sterilizing fan catalyst selection |

Tag membership does not grant a recipe or guarantee a complete machine structure. Core's shipped tag resources include optional legacy/third-party IDs so absent integrations do not force registration. The active pack may add or remove members later; inspect [the server tag scripts](../kubejs/server_scripts/Tags/) for final assignments.

## Addon Compatibility Supplied By Core

Core supplies conditional schema fallbacks or corrections when the corresponding addon is installed. A known dedicated schema is preserved rather than overwritten. These are addon recipe factories under their own namespaces, not additional `cwi:` serializers.

| Integration | Core coverage |
| --- | --- |
| Create Crafts & Additions | `rolling`, `charging`, `liquid_burning`; rolling can be an assembly step |
| Create Diesel Generators | `hammering`, `wire_cutting`, `distillation`, `basin_fermenting`, `bulk_fermenting` |
| TFMG | `coking`, `distillation`, `vat_machine_recipe` |
| Ratatouille | `threshing`, `demolding` |
| Lychee | Native codec-backed `item_inside`, `item_burning`, `block_interacting`, `dripstone_dripping`; empty-hand `{}` remains representable |
| Vintage Improvements | Schema corrections for `pressurizing`, `leaves_vibrating`, `auto_upgrade`, `auto_smithing` |
| Create Metallurgy | Empty-input support for `entity_melting`; native foundry input-capacity extension |
| Petrochem | Pumpjack biome selector accepts a biome ID or tag |
| Minecraft | Optional template handling for `smithing_transform` |

Core-backed schema presence does not prove the pack retains a mod's inherited production route. Check active removals and pack recipes before using one as a gameplay option.

### Physical And Serialization Compatibility

| Native patch | Installed behavior relevant to recipe writers |
| --- | --- |
| Foundry basin | Up to 36 item-ingredient entries; four physical nine-item input stacks still constrain distinct inputs |
| TFMG vat | Up to eight item input/output entries; physical inventory/allocation still matters |
| Vintage centrifugation | Up to nine item outputs |
| Vintage vibrating | Up to nine item outputs |
| Rubberworks compressor | Up to six item outputs |
| Direct output machines | Capacity simulation reserves possible outputs cumulatively before consuming inputs |
| Vintage pressurizing | Preserves secondary-fluid index encoding across serialization instead of duplicating that fluid |
| Native JEI compatibility | Updated output layouts for affected centrifugation, vibrating, compressing and chemical-vat categories |

An output-entry limit is not a guarantee that every combination fits the physical inventory. Count/chance changes still need machine execution checks. The foundry extension belongs to the installed Core; do not edit Core or the JAR when changing a pack recipe.

### Native Conversion Restrictions

Core also changes conversion behavior without introducing a KubeJS event:

- Create empty blaze burners do not capture living blazes or spawner contents through their original capture interactions.
- Power Loader empty chunk loaders do not capture ghasts through the original living-entity interaction.
- Power Grid lightning conversion does not turn dropped andesite alloy into magnets.
- Related native mysterious-conversion JEI registrations are adjusted alongside those disabled interactions.

Do not recreate these conversions in a separate event handler merely because an inherited mod recipe or an old JEI page suggested they exist.

## Assets And Migration Boundaries

Core promotes completed KubeJS client asset packs after ordinary mod resource packs, allowing pack assets to override mod textures/models/language resources. It preserves ordering within those groups. Its handling includes KubeJS virtual/file packs and internal language assets. `BEFORE_MODS` is intentionally left at lower priority and `LAST` retains its intended role. This concerns **client resources**, not server datapack ordering, so it is not a reason to put recipe edits in `generateData('after_mods', ...)`.

No script call is needed to activate this priority behavior. Continue using the normal `kubejs/assets/<namespace>/...` locations. An ordinary KubeJS registered item receives a generated English display name from its ID; only add an explicit English language entry when a special spelling is needed.

Core's supported machine, hammer and equipment-upgrade JEI categories are native. It does not supply the old `JEIAddedEvents` custom-category bridge, the old MBD2 machine runtime, or a complete replacement for every historical custom client category. Budding/compound-mineral presentation must use a verified current provider before being described as available.

Do not restore `global.releaseHammer`, old global conversion/upgrade execution tables, dried-microbe revival routes, the removed firebox, or new schematics when using this API. The former data can be useful for comparison, but the current native contract and the author's exclusions govern new work.

## Evidence And Update Procedure

The installed JAR is the implementation authority. Relevant entries inside it are:

| API area | Installed evidence |
| --- | --- |
| Plugin, globals and lifecycle | `net/quiwh/cwi/compat/CwiKubeJSPlugin.class` |
| Event group | `net/quiwh/cwi/compat/CwiKubeJSEvents.class` |
| Events | `RegistrationBlockEvent.class`, `ShadowDropEvent.class`, `EquipmentUpgradeEvent.class` under the same package |
| Shadow extensions | `ShadowConfigurable.class` and `net/quiwh/cwi/mixin/shadow/kubejs/` |
| Hammer builder / context | `net/quiwh/cwi/kubejs/HammerBuilder.class`, `HammerImpactContext.class`, `HammerItem.class` |
| Schema resources | `data/cwi/kubejs/recipe_schema/*.json` |
| Convenience constructors | `net/quiwh/cwi/compat/CwiMachineRecipeSchemas.class` |
| IO wrappers | `CwiMachineRecipeComponents.class`, `CwiHammerRecipeComponents.class`, `CwiUpgradeIngredientComponent.class`, `CwiProcessingOutputComponent.class` |
| Native machine validity | `net/quiwh/cwi/machine/recipe/MachineRecipe.class`, `MachineRecipeValidation.class` and machine block entities |
| Native upgrade semantics | `net/quiwh/cwi/equipment/EquipmentUpgradeRecipe.class`, `UpgradeIngredient.class`, `UpgradeEnchantmentOrder.class` |
| Addon schema compatibility | `net/quiwh/cwi/compat/CwiAddonRecipeSchemas.class`, `CwiLycheeRecipeSchemas.class` |
| Native data readers | `data/cwi/tags/`, `data/create/tags/`, corresponding block entities and fan types |

After a Core update, compare its fingerprint, schema JSON, public plugin/builder/event methods and active script call sites. Then update this reference and inspect a fresh target-instance launch/reload for registry, recipe, interop and JEI errors. Static inspection and syntax checks alone cannot establish in-game recipe execution or rendering correctness. Documentation work does not authorize modifying or rebuilding Core.
