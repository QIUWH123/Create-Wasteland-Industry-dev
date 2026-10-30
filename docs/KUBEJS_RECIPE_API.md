# CWI Recipe API Reference

This is the practical recipe reference for the installed CWI Minecraft 1.21.1
environment. It covers every recipe family currently authored by the pack,
the installed schemas behind them, and a small set of useful installed
extensions. A recipe type appearing in a removal filter does not mean the
pack creates or intends to use it.

Start with [the main reference](kubejs.md) for lifecycle, typed values and
[pack generators](kubejs.md#pack-recipe-helpers). Read
[CWI Core API](CWI_CORE_API.md) for native machine, hammer, fan and equipment
contracts. Use [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) when adding
support for another serializer; a schema does not implement a machine.

## Navigation

- [Recipe event and common operations](#recipe-event-and-common-operations)
- [Values, counts and JSON](#values-counts-and-json)
- [Vanilla crafting and cooking](#vanilla-crafting-and-cooking)
- [Create](#create)
- [Create Metallurgy](#create-metallurgy)
- [Vintage Improvements](#vintage-improvements)
- [Core addon compatibility schemas](#core-addon-compatibility-schemas)
- [Lychee](#lychee)
- [Available installed extensions](#available-installed-extensions)
- [Coverage and verification](#coverage-and-verification)

## Recipe Event And Common Operations

Register recipes inside `ServerEvents.recipes` in `kubejs/server_scripts/`.
`/reload` reloads server resources and recipes. New item, block or fluid
registrations require restarting the game.

```js
ServerEvents.recipes(event => {
    event.recipes.create.pressing('create:iron_sheet', 'minecraft:iron_ingot')
        .id('kubejs:example/iron_sheet')
})
```

The example demonstrates a builder, rather than adding a requested production
recipe. Use the installed schema directly for supported recipe types; do not
add a function that merely renames its constructor or wraps recipe JSON.
Keep generators that calculate recipes, create related families or enforce
optional-mod and machine-capacity rules. Give new recipes deliberate IDs and
preserve existing IDs; generated IDs can vary with recipe contents or order.

| Operation | Contract |
| --- | --- |
| `event.recipes.<mod>.<type>(...)` | Call the registered schema constructor. Argument order is schema-specific. |
| `event.custom(json)` | Supply the serializer's actual JSON, including `type`. It still passes through available KubeJS schema parsing. It is not an escape from invalid codecs or machine limits. |
| `event.remove(filter)` | Remove matching recipes. Prefer exact `id` for a specific recipe and `type` for an intentionally retired serializer family. |
| `event.replaceInput(filter, match, replacement)` | Replace inputs recognized by the schema. |
| `event.replaceOutput(filter, match, replacement)` | Replace outputs recognized by the schema. |
| `event.forEachRecipe(filter, recipe => ...)` | Inspect or edit each matching `KubeRecipe`. |
| `event.countRecipes(filter)`, `containsRecipe(filter)` | Count or test matching recipes. |
| `event.findRecipes(filter)`, `findRecipeIds(filter)` | Obtain recipes or IDs matching the filter. |
| `recipe.id(id)`, `group(name)` | Set the stable ID or recipe group. |
| `recipe.get(key)`, `set(key, value)` | Read or write schema fields; use the exact schema key. |
| `recipe.merge(json)` | Merge raw recipe data; verify the resulting serializer shape. |
| `recipe.remove()` | Remove this recipe. |

Useful filters include `{ id: 'mod:path' }`, `{ type: 'mod:type' }`,
`{ mod: 'mod' }`, `{ input: '#c:ingots/iron' }` and
`{ output: 'minecraft:iron_ingot' }`. Combined fields narrow a filter. Input
and output matching depend on schema roles; arbitrary nested JSON is not
automatically recognized as an ingredient or output. Check the match count
before a broad replacement. Tags must actually exist in the target instance;
do not invent `forge:` aliases.

`damageIngredient(slotFilter, amount)`, `keepIngredient(slotFilter)`,
`replaceIngredient(slotFilter, stack)`, `consumeIngredient(slotFilter)` and
`customIngredientAction(slotFilter, actionId)` exist on `KubeRecipe`.
They are crafting ingredient actions, not a universal machine-catalyst API.
Use the native serializer's mold, held-item, reusable-tool or equipment-upgrade
contract for those systems. `modifyResult(id)` names a registered result
handler; it is not the old inline result callback API.

## Values, Counts And JSON

Builder arguments and serialized JSON are different representations. Use
native item strings, typed stacks and ingredients at schema constructors;
reserve raw JSON for a serializer's actual data contract.

| Value | Builder-facing form | Common serialized form |
| --- | --- | --- |
| Item ingredient | `'minecraft:iron_ingot'`, `Ingredient.of('#c:ingots/iron')` | `{ "item": "minecraft:iron_ingot" }` or `{ "tag": "c:ingots/iron" }` |
| Ordinary output stack | `'2x minecraft:iron_ingot'` or `Item.of('minecraft:iron_ingot', 2)` | `{ "id": "minecraft:iron_ingot", "count": 2 }` |
| Create chance output | `CreateItem.of(Item.of('minecraft:flint'), 0.25)` | `{ "id": "minecraft:flint", "chance": 0.25 }` |
| Fluid output | `Fluid.of('minecraft:water', 250)` | `{ "id": "minecraft:water", "amount": 250 }` |
| Create single-fluid input | `Fluid.of('minecraft:water', 250)` converted through the integration | `{ "type": "neoforge:single", "fluid": "minecraft:water", "amount": 250 }` |
| Create fluid-tag input | `Fluid.sizedIngredientOf('#minecraft:water', 250)` | `{ "type": "neoforge:tag", "tag": "minecraft:water", "amount": 250 }` |

In mixed Create input lists, use `Ingredient.of('#item:tag')` when the tag
is an item choice. A bare `#tag` can be interpreted as a fluid ingredient.
`CreateItem.of` clamps its chance argument to the usual range; when preserving
existing authored data outside that range, Create's native `ProcessingOutput`
constructor retains it. Plain `{ id, chance }` arguments also pass through the
clamping wrapper. Compare the native serialized result when preserving such data.

These JSON examples describe the named boundary, not every serializer.
NeoEcoAE, for example, uses flat fluid ingredients without the same Create
envelope. Casting wraps its output. Core machines have their own counted
input/output types. Components belong to a stack/component codec, not an
arbitrary `nbt` field copied from 1.20.1.

Use `'2x minecraft:iron_ingot'` for counted item values where the receiver
supports that shorthand, and `Item.of(...)` when a typed stack or component
state is required. Do not copy an ingredient's `{ item: ... }` form into an
output that expects `{ id: ... }`.

Use `Fluid.of(id, amount)` for a fluid stack and
`Fluid.sizedIngredientOf('#tag', amount)` for a fluid-tag input. The author plans
Core support for `Fluid.of('#tag', amount)`; prefer that form after the installed
support is verified, and keep the current tag form until then. Keep amounts
explicit. A tag input is not a deterministic fluid output. The old `AddItem`,
`AddFluid` and `createRecipe*` conversion functions are retired; their
intermediate object shapes are not a new recipe-writing API.

Create's count spreading matters: three repeated item ingredients consume
three items; they are not three alternatives. An array within an ingredient
can instead represent alternatives. Preserve that nesting. Do not merge
repeated entries into raw `{ item, count }` JSON unless the native input
codec explicitly supports counted ingredients.

Unless stated otherwise, duration is in ticks and fluid amount is in mB.
Twenty ticks are one second at normal game speed. Lychee action `s` is in
seconds. A schema accepting many inputs does not prove that a machine has
enough physical slots, fluid tanks, output capacity or processing support.

## Vanilla Crafting And Cooking

These aliases are available directly on the recipe event. The corresponding
native factories also appear under `event.recipes.minecraft`.

By default `event.shaped` and `event.shapeless` select `kubejs:shaped` and
`kubejs:shapeless`, allowing KubeJS crafting controls and ingredient actions.
The native vanilla factories are
`event.recipes.minecraft.crafting_shaped(result, pattern, key)` and
`event.recipes.minecraft.crafting_shapeless(result, ingredients)`;
`event.vanillaShaped` and `event.vanillaShapeless` select those native schemas.
Do not assume native vanilla crafting executes KubeJS-only ingredient actions.

| Factory | Ordered constructor arguments | Optional fields and useful functions |
| --- | --- | --- |
| `event.shaped` | `result, pattern, key` | `noMirror()`, `noShrink()`, `noNotification()`, `buildingCategory()`, `redstoneCategory()`, `equipmentCategory()` |
| `event.shapeless` | `result, ingredients` | Sized ingredient spreading; recipe category defaults to `misc`. |
| `event.smelting`, `blasting`, `smoking`, `campfireCooking` | `result, ingredient, experience?, cookingtime?` | `xp(number)` / `experience(number)`; `time(ticks)` / `cookingTime(ticks)` |
| `event.stonecutting` | `result, ingredient` | Result is an ordinary stack. |
| `event.smithing` | `result, template, base, addition` | Three-argument `result, base, addition` constructor supplies the netherite upgrade template. |
| `event.smithingTrim` | `template, base, addition` | Trim behavior is native; there is no ordinary fixed `result` field. |

```js
ServerEvents.recipes(event => {
    event.shaped('minecraft:iron_bars', ['III', 'III'], {
        I: 'minecraft:iron_ingot'
    }).id('kubejs:example/iron_bars')

    event.smelting('minecraft:iron_ingot', 'minecraft:raw_iron')
        .xp(0.7)
        .cookingTime(200)
        .id('kubejs:example/iron_smelting')
})
```

The installed cooking schema defaults experience to `0` and cooking time to
`200`. Those are KubeJS schema defaults shared by these inherited schemas;
do not assume every vanilla/native cooking serializer has the same omitted
time. Specify intended production times.

Shaped defaults are mirror `true`, shrink `true`, category `misc`, and
show-notification `true`. Mirror/shrink and category/notification keys are
excluded from its main positional constructor. Mechanical crafting and
KubeJS crafting can permit patterns beyond the ordinary player grid;
preserve CWI's intentional automation recipes rather than treating every
large pattern as an error.

Core changes the smithing-transform template component to an optional
ingredient so an explicitly empty template can survive schema parsing.
Do not confuse this with the three-argument constructor, which supplies a
netherite template rather than an empty one.

## Create

The installed KubeJS Create integration supplies 21 JSON schema resources:
17 concrete types and four reusable `base/` parents. All factory paths below
are `event.recipes.create.<type>`.

### Shared Processing Schema

| Key, in constructor order | Role and accepted value | Schema default |
| --- | --- | --- |
| `results` | Output list of fluid stacks or `create:processing_output` | Required |
| `ingredients` | Input list of Create sized fluid ingredients or item ingredients; counted item arguments spread into repeated entries | Required |
| `processing_time` | Input, ticks | `100` |
| `heat_requirement` | Input, Create heat condition; excluded from positional constructor | `none` |

Use `.processingTime(ticks)`, `.heated()` and `.superheated()`. Generated IDs
use `results` as the unique field. `base/processing_with_time` always writes
`processing_time`, including the default; `base/processing_unwrapped` adds
no extra fields. Always-write does not mean a required positional argument.

| Concrete type | Parent or extra contract | Current pack use |
| --- | --- | --- |
| `pressing` | Shared processing | Builder calls |
| `milling`, `cutting`, `crushing` | Processing with always-written time | Builder calls |
| `mixing`, `compacting` | Processing unwrapped | Builder calls |
| `filling` | Shared processing | Direct builder calls |
| `splashing` | Shared processing | Builder calls |
| `deploying` | Item application parent | Builder calls |
| `item_application` | Item application parent | Builder calls |
| `sandpaper_polishing` | Shared processing | Builder calls |
| `emptying`, `haunting` | Shared processing | Available installed extensions |
| `basin`, `conversion` | Shared processing | Installed schemas; do not infer a new machine or progression route from their names |
| `mechanical_crafting` | Shaped schema plus `accept_mirrored` | Builder calls |
| `sequenced_assembly` | Separate contract below | Builder calls |

The item-application parent adds `keep_held_item`, default `false`, excluded
from the normal constructor. `.keepHeldItem()` sets it to true. Use that
serializer behavior for a reusable applied item; do not replace it with an
unrelated crafting ingredient action.

Mechanical crafting takes `result, pattern, key` and adds optional
`accept_mirrored = true`, always written. `.acceptMirrored(false)` sets the
native key. This differs from KubeJS crafting's `kubejs:mirror` flag.

### Sequenced Assembly

| Key, in order | Contract |
| --- | --- |
| `results` | List of Create processing item outputs; this schema does not use the fluid-or-item output union. |
| `ingredient` | One starting ingredient. |
| `sequence` | Ordered list of nested processing recipes. |
| `transitional_item` | Create processing output; schema default is `create:incomplete_precision_mechanism`. Set the pack's intended intermediate explicitly. |
| `loops` | Integer at least zero, default `5`. Set deliberately; do not inherit the historical four-loop assumption. |

Use `.transitionalItem(id)` and `.loops(number)` after the constructor.
Each step must accept and return the same transitional item while any applied
items or fluids retain their authored order. Do not sort the steps or replace
their outputs with the final product. Only serializers supported as sequence
steps will work; the generic nested-recipe component does not prove that every
recipe type can run on a belt.

For a current complete example, see the lockbox sequence in
[MechanicalAge.js](../kubejs/server_scripts/Progression/MechanicalAge.js).
Output chance uses `CreateItem.of(Item.of(id), chance)`, including Create
sequence outputs. The older `Item.of(...).withChance(...)` API is not this
integration's contract: installed KubeJS retains the method only to throw an
error stating that it is unsupported on Minecraft 1.21 and recommending
`CreateItem.of(item, chance)` for KubeJS Create.

For ordinary processing, `chance` describes that output's roll. In sequenced
assembly, the native result-pool code sums these values and selects one output
proportionally: they act as relative weights. A value of `0.8` does not by
itself guarantee an 80% final product if the complete pool sums to another
value. Preserve the whole authored result pool and output order.

## Create Metallurgy

The installed mod's `CreateMetallurgyKJS` plugin registers these schemas
programmatically. They are native integration support, not schemas to recreate
from the old tutorial.

| Factory under `event.recipes.createmetallurgy` | Ordered fields | Notes |
| --- | --- | --- |
| `alloying` | `results, ingredients, processing_time?`; heat excluded | Create shared processing contract. |
| `melting`, `grinding` | Same | Create processing with always-written time. `grinding` is an available installed extension. |
| `casting_in_table`, `casting_in_basin` | `result, ingredients, processing_time?, mold_consumed?` | Casting-output component and mold behavior below. |
| `bulk_melting` | `results, ingredients, processing_time?`; heat bounds excluded | Foundry with always-written time. |
| `entity_melting` | Foundry schema extended with the native entity ingredient | Installed extension; inspect a native entity fixture before adding a recipe. |

Casting time defaults to `100` in the schema and is always written;
`mold_consumed` defaults to `false`. The named `.moldConsumed()` function
sets true. Inspect the registered schema/typings before assuming a Boolean
setter overload. The casting serializer's omitted-time default is `0`,
different from the schema default; retain explicit CWI durations.

Casting raw JSON wraps the result stack:

```json
{
    "type": "createmetallurgy:casting_in_table",
    "ingredients": [
        { "type": "neoforge:single", "fluid": "createmetallurgy:molten_brass", "amount": 90 },
        { "item": "createmetallurgy:graphite_plate_mold" }
    ],
    "processing_time": 60,
    "result": { "item": { "id": "create:brass_sheet", "count": 1 } }
}
```

This is the installed brass-plate fixture's shape and values, not a rebalance
instruction. The native casting-output component creates the required
`result.item` wrapper from a supported stack/string argument. Do not add that
raw JSON envelope around an ordinary builder argument.

Foundry inputs/outputs use the processing item/fluid lists. The heat keys are
literally `minHeatRequirement` and `maxHeatRequirement`, schema defaults
`-25` and `50`, and excluded from the positional constructor. Do not change
them to snake case. Core additionally permits an empty `ingredients` list
for entity melting and writes that list explicitly.

The installed compatibility fix permits up to 36 foundry item ingredient
entries. This preserves repeated ingredient consumption; the physical basin
still has four slots of nine items. It does not authorize arbitrary counted
input JSON or change the machine's tank/output capacity. The main reference
and Core API describe the installed artifact, rather than a concurrent source
checkout.

## Vintage Improvements

The installed JAR has 14 JSON schema resources: 13 concrete types plus
`base/processing_without_time`. The seven types in the first seven rows are
authored through direct schema builders. The remaining types are available
installed extensions.

Unless noted, schemas inherit Create's processing fields. Extra keys follow
the inherited fields and are optional. Prefer named setters for extras instead
of relying on a long positional constructor.

| Type | Base | Extra keys and schema defaults |
| --- | --- | --- |
| `centrifugation` | Processing unwrapped | `minimal_rpm: 100` |
| `coiling` | Processing unwrapped | `spring_color: 10134685`, accepts integer or string |
| `curving` | Processing with time | `mode: 1`, `head_damage: 0`, `item_as_head: minecraft:air` |
| `hammering` | Processing unwrapped | `hammer_blows: 1`, `anvil_block: minecraft:air` |
| `polishing` | Processing with time | `speed_limits: 0`, `fragile: false` |
| `turning` | Processing with time | None |
| `vibrating` | Processing with time | None |
| `leaves_vibrating` | Processing with time | None; Core allows an empty output list. |
| `laser_cutting` | Processing unwrapped | `energy: 0`, `max_charge_rate: 0` |
| `pressurizing` | Processing with time | `secondary_fluid_output: {}`, `secondary_fluid_input: {}`; Core allows an empty primary output list. |
| `vacuumizing` | Processing with time | Same secondary fluid fields as pressurizing. |
| `auto_upgrade`, `auto_smithing` | Processing without time | Only `results` and `ingredients`; Core allows empty outputs. |

Multiword extra keys have snake/camel aliases in their resources, such as
`hammer_blows` / `hammerBlows` and `item_as_head` / `itemAsHead`.
`minimal_rpm` also declares the explicit alias `minimalRPM`. Inspect the schema
dump for generated setter names rather than changing the canonical JSON keys.

Current CWI coiling recipes explicitly set `.springColor('000000')`; omitting
it would use the schema's different default. Likewise, preserve authored
`.hammerBlows(...)`, `.speedLimits(...)`, `.itemAsHead(...)` and durations
when converting an existing recipe.

Secondary-fluid fields accept either an optional fluid stack or an integer
in the upstream schema. That type union alone does not establish what the
integer means to the native machine. Use the pack's existing shape or inspect
the serializer and fixture before introducing that alternative.

## Core Addon Compatibility Schemas

Core supplies fallback schemas for installed addons whose recipe types lack
dedicated schemas. These are Core integration features, not claims that every
upstream addon ships a KubeJS plugin. A fallback is registered only for an
unknown/missing schema and only with the relevant mod loaded. Separate Core
component patches refine selected existing schemas.

### Shared Fallback Processing Contract

`results, ingredients, [required extra fields], processing_time?` is the
common constructor order. `results` accepts a list or single value of fluid
stacks or Core's processing-output component. `ingredients` accepts a list or
single value of item or `cwi:create_fluid_ingredient` values and spreads
counted item arguments. Time defaults to `100`. Heat defaults to `none`, is
excluded from positional arguments, and has `.heated()` / `.superheated()`
functions. A type marked “writes time” always writes the optional default.

| Mod and factory | Fields beyond shared IO | Time behavior | Current usage |
| --- | --- | --- | --- |
| `createaddition:rolling` | None | Optional | Direct builder |
| `createaddition:charging` | Required `energy`, `max_charge_rate`, both integers | Optional | Direct builder |
| `createdieselgenerators:hammering`, `wire_cutting` | None | Optional | Direct builders |
| `createdieselgenerators:distillation` | None | Writes time | Direct builder |
| `createdieselgenerators:basin_fermenting`, `bulk_fermenting` | None | Writes time | Generated by `addFermentingRecipes` |
| `tfmg:coking`, `distillation` | None | Writes time | Direct builders |
| `tfmg:vat_machine_recipe` | Vat fields below | Writes time | Direct builder |
| `ratatouille:threshing` | None | Writes time | Direct builder |
| `ratatouille:demolding` | None | Optional | Direct builder |

`createaddition:liquid_burning` is different: constructor order is
`ingredients, burn_time, superheated?`. Its ingredients are fluid-only,
`burn_time` is a required integer, and `superheated` defaults to false.
`results` is excluded and forced to an always-written empty list. Do not
model liquid burning as a fluid-output recipe or use its duration field name
for other processing types.

TFMG vat extra fields are optional `min_size = 0` (nonnegative integer),
`heat_level = 0` (integer), `pressure = 0` (integer), `machines = []` (ID list
or single ID) and `allowed_vat_types = []` (ID list or single ID). They are
appended after the shared fields; prefer named setters such as
`.minSize(...)`, `.heatLevel(...)`, `.machines(...)` and `.allowedVatTypes(...)`
to avoid positional ambiguity. Current CWI recipes preserve numeric heat
levels 2 for the former `heated` argument and 3 for `superheated`. Use actual
vat type IDs instead of the former helper's legacy block-name inputs:
`tfmg:steel_vat` → `tfmg:steel`, `tfmg:firebrick_lined_vat` → `tfmg:fireproof`,
and `tfmg:cast_iron_vat` → `tfmg:cast_iron`. Those old names required explicit
translation; the native serializer does not promise universal aliases.

Fermentation retains the meaningful `addFermentingRecipes` generator. It
calls the `basin_fermenting` and `bulk_fermenting` schema builders, guards
optional mod availability and omits the bulk form when expanded item
ingredients exceed nine. Do not add an oversized bulk variant merely because
the schema parses it.

Core also patches existing smithing, Vintage, Metallurgy and Petrochem fields
as described in their respective sections. Compare emitted JSON, IDs,
components and machine behavior whenever changing an existing recipe's
construction method; schema defaults alone do not prove equivalence.

### Native CWI Recipe Families

The current pack calls all eight native families:
`cwi:blast_furnace_processing`, `cwi:mixing_vessel_mixing`, `cwi:incubating`,
`cwi:block_conversion`, `cwi:depot_conversion`, `cwi:equipment_upgrade`,
`cwi:corroding` and `cwi:sterilzing`. The last spelling is the actual installed
ID. Read [CWI Core API](CWI_CORE_API.md) for their exact schemas, constraints,
chance output types, catalyst tags, effects and examples. Do not duplicate
those native serializers with old MBD2 scripts or a second JS implementation.

## Lychee

Current scripts call the installed schema constructors directly in
[Lychee.js](../kubejs/server_scripts/Recipes/Lychee.js). Core provides schemas
for these four native Lychee recipe types and codecs for their native actions,
block predicates and sized ingredients.

| Factory under `event.recipes.lychee` | Ordered fields | Contract |
| --- | --- | --- |
| `item_inside` | `post, item_in, block_in?, time?` | Item input list or single value; block defaults to any; nonnegative integer `time` defaults to 0. |
| `item_burning` | `post, item_in` | One sized item ingredient. |
| `block_interacting` | `post, item_in, block_in?` | One or two optional sized ingredients, list or single value; block defaults to any. |
| `dripstone_dripping` | `post, source_block, target_block` | Two required native block predicates. |

`post` is an output-role action list or a single action and may be empty.
Factories take actions first, not the item first. Native block predicates
accept string IDs and structured objects; keep state restrictions such as
water `level: '0'` where authored.

Common optional fields are `hide_in_viewer = false`, `ghost = false`,
`group = 'default'`, and default-optional `comment`, `if` (alias `contextual`)
and `max_repeats`. Preserve the condition's native object/list shape rather
than treating it as an arbitrary JavaScript callback.

### Empty Hands And Actions

For `block_interacting`, `item_in: {}` is a deliberate empty-hand ingredient.
Core's optional native ingredient codec preserves it. Do not change it to
`minecraft:air`, drop the key or substitute a tag. Native decode/network and
interaction behavior are separate from Lychee's upstream JSON encoder, which
cannot encode this empty ingredient for a native recipe dump.

These `type` names inside `post` are actions, not recipe serializers:

| Action used by CWI | Important fields |
| --- | --- |
| `drop_item` | Stack `id`, optional `count` and native stack components; action conditions can appear under `contextual`. |
| `execute` | `command`; `hide` controls the action's viewer presentation. |
| `place` | `block` |
| `damage_item` | Optional `damage`; preserve authored defaults or explicit values. |
| `add_item_cooldown` | `s` in seconds |
| `delay` | `s` in seconds; its position in the action list matters. |
| `if` | `contextual` condition and ordered `then` actions |

`chance` and `is_sneaking` are contextual predicate types, not recipes.
The action component also accepts an item ID/string or native `ItemStack` as
a drop-item shortcut. Output matching and replacement inspect nested drop
actions; other action properties remain native behavior. Do not reorder
commands, damage, delays, chance checks or block changes as a style cleanup.

```js
ServerEvents.recipes(event => {
    event.custom({ "type": "lychee:item_inside", "item_in": { "item": "kubejs:dark_ash" }, "block_in": { "blocks": ["minecraft:water"], "state": { "level": "0" } }, "post": [{ "type": "drop_item", "id": "kubejs:ash", "contextual": { "type": "chance", "chance": 0.27 } }] })
        .id('kubejs:example/ash_inside_water')
})
```

This shortened shape omits the production recipe's particle and delay actions;
use the production script for an exact migration fixture. It is an API example,
not an equivalent replacement for that recipe.

## Available Installed Extensions

These programmatic integrations are present in installed JARs. Current pack
scripts do not author these recipe families; availability does not mean they
belong in progression or are a substitute for the selected CWI machines.

### Petrochem 1.3.3

| Factory under `event.recipes.petrochem` | Ordered schema keys | Defaults |
| --- | --- | --- |
| `electrolyzing` | `results, ingredients, heat_requirement?, processing_time?, energy?` | Heat is default-optional; time 100; energy 50, always written. |
| `pumpjack` | `results, biome` | Both required. Core's biome-reference component accepts an ID or `#tag`. |
| `distilling` | `results, ingredients, mode, processing_time?` | Mode required; time 100, always written. |

Outputs are lists of fluid stacks or Create processing outputs. Inputs are
lists of Create sized fluid ingredients or **flat native sized item
ingredients**. Their counted-item codec differs from Create's repeated-entry
spreading. Time is a long integer in the schema. A required-sounding internal
name such as `PROCESSING_TIME_REQUIRED` means always-written optional time,
not a required positional argument.

Do not guess valid distillation modes or energy consumption semantics from
these key names. Inspect a current native fixture and the relevant machine
before authoring a route. The JAR contains leftover `data/gearbox/...`
resources; those paths are not proof of a `gearbox` registration. The installed
plugin registers the `petrochem` recipe IDs listed above.

### Rubberworks 1.1.4

| Factory under `event.recipes.rubberworks` | Ordered schema keys |
| --- | --- |
| `sapping` | `results, ingredients` |
| `compressing` | `results, ingredients, processing_time?, heat_requirement?` |

Inputs/outputs use the same fluid/flat-sized-item distinction as Petrochem.
Compressing time defaults to 100 and is always written; heat is
default-optional. Do not carry the pack's retired rubber-to-resin conversion
back into production because sapping/compressing schemas exist.

### NeoEcoAE 21.2.12

`event.recipes.neoecoae.cooling(input, coolant, output, max_overclock?)`
has both three- and four-argument constructors. `input` is a flat sized fluid
ingredient. `coolant` is a required nonnegative integer. `output` is a required
optional-fluid-stack component: pass an empty stack/its native `{}` form when
there is no output. `max_overclock` is default-optional and nonnegative; the
schema does not supply a documented numeric default here. The installed water
fixture uses input `{ amount: 100, tag: 'minecraft:water' }`, coolant 1500,
output `{}` and max-overclock 2. Those are fixture values, not universal
defaults.

`event.recipes.neoecoae.integrated_working_station` orders the schema keys
as `energy, inputItems, inputFluid, itemOutput, fluidOutput, processingTicks`.
An explicit five-key constructor uses the first five fields. Energy is a
required nonnegative integer. IO keys are default-optional; item inputs are
optional flat sized ingredients, fluid input is an optional flat sized fluid
ingredient, and outputs are optional native item/fluid stacks.
`processingTicks` is at least 1 and defaults to 100.

The custom recipe class exposes `.require(sizedIngredient)` to append an item
input, `.requireFluid(sizedFluidIngredient)`, `.itemOutput(stack)`,
`.fluidOutput(stack)`, `.energy(number)` and `.processingTicks(number)`.
Keep these exact native camel-case JSON keys. The plugin does not register a
schema for `large_integrated_working_station`; do not infer its builder from
the ordinary workstation schema.

## Coverage And Verification

This reference classifies all current factory calls and custom serializer
families found in uncommented pack source. Guarded generators indicate authored
support, not proof that every route executes in a running game. Current recipe
source is primarily [BasicRecipe.js](../kubejs/server_scripts/Recipes/BasicRecipe.js),
[Chemistry.js](../kubejs/server_scripts/Recipes/Chemistry.js),
[MicrobesRecipe.js](../kubejs/server_scripts/Recipes/MicrobesRecipe.js), the
progression scripts and [native machine scripts](../kubejs/server_scripts/Machines/).

Search results that are not added recipe families are explicitly separated:

| Token or resource | Classification |
| --- | --- |
| `createdieselgenerators:compression_molding` | Current removal filter only; no pack recipe addition or builder contract is asserted. |
| `minecraft:blasting` in `Experience.js` | Existing-recipe mutation filter; the installed cooking schema is documented above. |
| `minecraft:linear` in loot data | Loot number provider, not a recipe type. |
| `neoforge:single`, `neoforge:tag` | Fluid ingredient codec types, not recipe types. |
| Lychee `execute`, `drop_item`, `place`, `damage_item`, `delay`, `if`, `add_item_cooldown` | Post actions. |
| Lychee `chance`, `is_sneaking` | Contextual predicates. |
| `create:base/...`, `vintageimprovements:base/...`, `minecraft:cooking` | Reusable schema parents, not a claim of a corresponding usable machine. |
| Vanilla special-crafting schemas | Native special handling; unused specialist serializers are deliberately omitted from the detailed writing guide. |
| Embedded Dank Storage / Extended Crafting schemas | KubeJS bundled support resources; not evidence that these mods are installed or used by CWI. |

Schema resources were read from the installed KubeJS
`2101.7.2-build.377`, KubeJS Create `2101.3.1-build.18` and Vintage
Improvements `0.0.0.8` JARs. Programmatic contracts were inspected in installed
Core, Create Metallurgy `1.0.3`, Lychee `6.7.2`, Petrochem `1.3.3`,
Rubberworks `1.1.4` and NeoEcoAE `21.2.12`. Core fallback targets also include
Create Addition `1.6.0`, Create Diesel Generators `1.3.15`, TFMG
`1.3.2a-community` and the installed Ratatouille integration. The main
reference records the current artifact baseline.

Evidence includes actual JSON resources, plugin registration bytecode,
schema keys/components, public Java signatures and current recipe source.
Examples and field tables are statically checked documentation. The production
schema migration separately passed the [native recipe comparison](kubejs.md#recipe-migration-verification);
that does not establish machine operation or recipe-viewer rendering.

Before changing a recipe family, dump the target registered schema with
`/kubejs recipe-schema-json <recipe-type>`, compare emitted JSON with a native
fixture, inspect fresh reload logs and exercise the recipe in its machine.
Refresh ProbeJS definitions after mod changes. Neither editor completion nor
Node syntax checking proves the native serializer or machine accepts a recipe.
