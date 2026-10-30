# CWI KubeJS API Reference

This is the scripting reference for **CWI on Minecraft 1.21.1 / NeoForge**.
It covers the APIs used by this pack, the installed recipe integrations, and
useful related APIs for continuing development. Exact signatures come from the
installed JARs and the current scripts, inspected on **30 October 2026**.

Start here, then follow the topic links. Method tables specify the script side,
argument order, data format, and important limitations. The examples illustrate
API usage; they do not authorize new recipes or changes to progression.

## Find An API

| Work | Reference |
| --- | --- |
| Decide where a script belongs, choose a schema, extend a generated family | This document |
| Register or modify items, blocks, fluids, food, armor, effects or creative tabs | [Events And Builders](KUBEJS_EVENTS_AND_BUILDERS.md) |
| Handle player, block, entity, server or native events; edit loot; add tooltips | [Events And Builders](KUBEJS_EVENTS_AND_BUILDERS.md) |
| Write vanilla, Create or addon recipes; inspect fields, defaults and constructors | [Recipe API](KUBEJS_RECIPE_API.md) |
| Add a schema for an unsupported serializer | [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) |
| Use CWI machines, hammers, upgrades, registration blocking or item shadows | [CWI Core API](CWI_CORE_API.md) |
| Inspect a tag's membership, effect or consumer | [Tag Reference](TAG_REFERENCE.md) |
| Apply formatting, chemistry rules, exclusions and author decisions | [Development Standards](DEVELOPMENT_STANDARDS.md) |
| Check which source/JAR inputs and calls this reference covers | [API Inventory](audit/KUBEJS_API_INVENTORY.json) |

## Version And Evidence Contract

The installed binary is the API authority. A source checkout or an older guide
can describe methods that are absent from the installed mod. The inventory
records relative input paths, SHA-256 fingerprints, actual embedded schemas,
plugin declarations, event call sites and recipe factory call sites.

| Component | Installed version |
| --- | --- |
| KubeJS | 2101.7.2-build.377 |
| Rhino | 2101.2.7-build.85 |
| KubeJS Create | 2101.3.1-build.18 |
| Create | 6.0.10 |
| CWI Core | `cwi-0.1.0-dev+1.21.1.jar`; fingerprint below |
| Lychee | **6.7.2**, superseding the old guide's 6.5.3 |
| LootJS | 3.7.0 |
| ProbeJS | 8.0.3 |
| PonderJS | 2.4.0 |
| JEI | 19.64.0.455 |
| Create Metallurgy | 1.0.3 |
| Create Diesel Generators | 1.3.15 |
| Vintage Improvements | 0.0.0.8 |
| Create Addition | 1.6.0 |
| TFMG | 1.3.2a-community |
| Ratatouille | 1.4.0; recipe namespace `ratatouille` |
| Petrochem / Rubberworks | 1.3.3 / 1.1.4 |
| NeoEcoAE | 21.2.12 |
| FTB Quests / Teams / XMod Compat | 2101.1.37 / 2101.1.11 / 21.1.13 |
| LDLib2 | 2.2.44 |

Current Core SHA-256:

```text
aa68c21b5b16b17596f8de2017a49101779a5e75cf594cf61b5ea61d6c4de825
```

The earlier `891d70...` Core fingerprint identifies a previous artifact, not
this baseline. This documentation refresh inspects signatures, schema resources,
bytecode and source usage. It does **not** launch Minecraft or certify every
example in a world. Older runtime results belong to their original inputs.

The source inventory contains **97 JavaScript files**: 34 startup, 61 server,
and two client files. Eight are empty or comment-only. A call behind a mod guard
is recorded as a source call, not proof that its callback currently executes.
The 75 embedded schema JSON files include base schemas and optional-mod
resources; they are not 75 active recipe types. Java plugins register additional
schemas that have no JSON resource.

## Script Side, Lifecycle And Reload

| Location | Put this here | Apply changes |
| --- | --- | --- |
| `kubejs/startup_scripts/` | Registry definitions, tool tiers, item/block modifications, custom builders, Create spout handlers | Restart after registry or startup behavior changes |
| `kubejs/server_scripts/` | Recipes, tags, generated datapack data, loot modifiers, server/world/player interactions | `/reload` for datapack work; `/kubejs reload server-scripts` reloads scripts but is not a substitute for rebuilding all data |
| `kubejs/client_scripts/` | Tooltips, viewer entry hiding, client event handlers | `/kubejs reload client-scripts`; `F3+T` refreshes resource assets |
| `kubejs/assets/<namespace>/` | Textures, models, blockstates, translations, existing Ponder assets | Resource reload; restart when generated registry assets also changed |
| `kubejs/data/<namespace>/` | Recipes, tags, loot, registry compatibility JSON and other datapack resources | `/reload`; some registry resources require a restart |
| `kubejs/config/` | Script configuration | Follow the code reading that file |
| `kubejs/exported/` | Command-generated inspection dumps | Development output, not a production data directory |

`/kubejs reload startup-scripts` exists, but cannot safely reconstruct already
registered Minecraft objects. Use a restart for new items, blocks or fluids.
Schema registration belongs to `ServerEvents.recipeSchemaRegistry`; do not move
it to startup merely because older examples did so.

A script **location** controls its lifecycle. A handler's logical Minecraft side
is a separate question: for example, native event bridges can observe different
sides, and client classes must stay out of common startup/server imports.

### Loading Order And Shared State

Priority comments belong on the first line and are parsed as metadata:

```js
// priority: 5
```

Higher-priority scripts load earlier within their script manager. Current shared
imports use priority 10000; startup data and server utility helpers use 1000;
`Recipes/BasicRecipe.js` uses 5; the legacy tag cleanup uses -10000. Preserve
existing order rather than assuming filename order is the dependency contract.

Top-level variables/functions are shared within their script manager. The
startup and server managers do not share ordinary top-level lexical variables.
Use startup `global` for immutable pack definitions consumed across managers.
Server and client see a read-only top-level global map. Nested objects are not
recursively frozen; treat shared definitions as immutable and keep server state
out of `global`.

| State lifetime | Storage |
| --- | --- |
| Immutable shared definitions | Startup `global.stoneTypes`, `global.materialTypes`, etc. |
| Reload-local tracking, queues and caches | Server `let`, arrays, maps and helper functions |
| Saved world state | `event.server.persistentData` |
| Saved player state | `event.player.persistentData` |
| Saved block-entity state | The actual block entity's `persistentData`, when it exists |

For example, `Utils/GlobalTickCounter.js` defines a server variable that wraps
modulo 1000. It is not a durable world clock. `Starter.js` persists its world and
player flags; a reload does not reset those flags. An ordinary block without a
block entity has no block-entity storage to write.

## Installed Integrations And Coverage

A mod can be used through its item IDs and vanilla data formats without having
a special KubeJS plugin. Conversely, finding a plugin in a JAR does not mean
its optional dependency is installed or a production script uses its API.

| Integration | Practical surface and where it is documented |
| --- | --- |
| KubeJS / NeoForge / Minecraft | Events, builders, wrappers, components, tags, generated data and vanilla recipes; [events](KUBEJS_EVENTS_AND_BUILDERS.md), [recipes](KUBEJS_RECIPE_API.md) |
| Rhino | Java interop, collections, overloads and callback behavior; [interop](#rhino-and-java-interop) |
| CWI Core | Eight native JSON schemas, additional schema constructors/components, three event hooks, machine/hammer/upgrade behavior, shadow settings, registration prevention; [Core](CWI_CORE_API.md) |
| Create + KubeJS Create | Native processing factories, typed chance outputs, sequenced assembly and spout handlers; [recipes](KUBEJS_RECIPE_API.md), [events](KUBEJS_EVENTS_AND_BUILDERS.md) |
| Create Metallurgy | Melting, bulk melting, alloying, table/basin casting and specialized output wrappers; [recipes](KUBEJS_RECIPE_API.md) |
| Vintage Improvements | Centrifugation, polishing, hammering, curving, coiling, turning, vibrating and additional installed schemas; [recipes](KUBEJS_RECIPE_API.md) |
| Create Diesel Generators | Hammering/wire cutting, distillation, fermenting, compression molding and plugin events; [recipes](KUBEJS_RECIPE_API.md), [events](KUBEJS_EVENTS_AND_BUILDERS.md) |
| Create Addition | Rolling, charging and liquid burning; [recipes](KUBEJS_RECIPE_API.md) |
| TFMG | Distillation, coking and vat machines, including Core schema/compatibility support; [recipes](KUBEJS_RECIPE_API.md), [Core](CWI_CORE_API.md) |
| Ratatouille | Demolding and threshing; [recipes](KUBEJS_RECIPE_API.md) |
| Lychee | In-world recipes, conditions and post actions; [recipes](KUBEJS_RECIPE_API.md), [events](KUBEJS_EVENTS_AND_BUILDERS.md) |
| LootJS | Loot modifiers, independent groups/pools, count/damage/weight/conditions; [events](KUBEJS_EVENTS_AND_BUILDERS.md) |
| JEI / KubeJS recipe viewer | Entry hiding and tooltips; native Core categories; [events](KUBEJS_EVENTS_AND_BUILDERS.md), [Core](CWI_CORE_API.md) |
| ShadowDrop | Item shadow behavior through Core's integration; [Core](CWI_CORE_API.md) |
| Petrochem / Rubberworks / NeoEcoAE | Installed processing schemas available for future recipes; availability is distinguished from current pack calls; [recipes](KUBEJS_RECIPE_API.md) |
| FTB Quests / Teams | Installed events and quest-progress wrappers; currently no quest scripts; [FTB integration](#ftb-quests-and-teams) |
| ProbeJS | Generate fresh editor definitions and inspect types; [development workflow](#development-workflow) |
| PonderJS | Available but current pack Ponder scripts are unported; [events](KUBEJS_EVENTS_AND_BUILDERS.md) |
| LDLib2 | Installed UI integration; no current script consumes its specialized UI API. Its widget/editor internals are outside this reference's practical scope. |
| AE2, Farmer's Delight, storage mods, Create decoration/power addons and other item providers | Use ordinary recipe IDs, components, tags and data overrides unless a specific documented plugin applies. Importing an AE2 class alone does not establish an active AE2 scripting feature. |
| AllTheLeaks / Architectury integration classes | Compatibility infrastructure; not an additional pack authoring API merely because a class matches the inventory scan. |

FluidJS, KubeJS Additions, MBD2 and the old `JEIAddedEvents` bridge are absent.
Do not copy their 1.20.1 APIs into new scripts. Old `ForgeEvents` examples are
commented historical code. Guarded recipe branches for Biomancy, Geode Plus,
Ad Astra and other absent mods do not install those mods or their API.

The reference excludes optional Dank Storage/Extended Crafting schemas without
installed targets, unused GUI widget internals, arbitrary rendering internals,
and disabled historical machine implementations. The inventory retains their
resource/class presence where useful for auditing; presence is not endorsement.

## Values, IDs And Recipe Data

| Value | Use |
| --- | --- |
| `'minecraft:iron_ingot'` | Item ID where the receiving API accepts a string |
| `'3x minecraft:iron_ingot'` | KubeJS counted-stack shorthand where supported |
| `'#c:ingots/iron'` | Item ingredient tag; omit `#` when assigning a tag itself |
| `Item.of('minecraft:iron_ingot', 3)` | Typed stack for native methods, components or chance wrappers |
| `Ingredient.of('#c:ingots/iron')` | Typed ingredient; not an output stack |
| `Fluid.of('minecraft:water', 250)` | Concrete fluid stack, normally in mB |
| `Fluid.sizedIngredientOf('#cwi:water', 250)` | Sized fluid ingredient accepting a tag; not a concrete fluid output |
| `{ item: 'minecraft:iron_ingot' }` | Common item ingredient JSON |
| `{ id: 'minecraft:iron_ingot', count: 3 }` | Common 1.21.1 item stack JSON; wrappers vary by serializer |
| `CreateItem.of(Item.of('minecraft:flint'), 0.25)` | Create probabilistic output; chance is a 0–1 fraction |

There is no universal recipe JSON shape. Create mixed item/fluid arrays,
Create Metallurgy casting results, Lychee post actions and Core machine IO have
different codecs. Use the exact [recipe contract](KUBEJS_RECIPE_API.md) or the
receiving schema; do not replace every output with an `item` object.

A recipe ID, serializer type, input item and output item are different IDs.
For example, a recipe can have ID `cwi:mixing/soda_powder_from_sodium_carbonate_solution`,
serializer `create:mixing`, and output `kubejs:soda_powder`. Changing one does
not rename the others. Add explicit recipe IDs for new definitions when they
need stable removal/replacement; preserve existing IDs during maintenance.

The ordinary registered-item translation namespace remains `kubejs`, even if
`Utils/DisplayName.js` changes the displayed mod name to CWI. KubeJS derives an
English title from an ID such as `item_1_abc` → `Item 1 Abc`. Add `en_us` entries
only for intentional special spelling, acronyms or other non-default names.

### Registry Lookups And Mod Guards

| Call used by the pack | Installed contract |
| --- | --- |
| `Platform.isLoaded(modId)` | Test the exact mod ID before using optional registrations or classes. |
| `Platform.getInfo(modId)` | Mod metadata. Changing its displayed `name` does not rename registry IDs or language keys. |
| `Item.exists(id)`, `Fluid.exists(id)` | Test those registries; a loaded namespace alone does not prove an individual ID exists. |
| `Fluid.getType(id)` | Return the native Minecraft fluid, not a fluid stack. Its NeoForge `getFluidType()` is another distinct object. |
| `Block.getBlock(id)` | Return a native block; registry fallback behavior is not an existence test. |
| `Ingredient.of(value).itemIds` | Enumerate matching item IDs after the relevant tags exist; a Java collection is not a JS array. |

`Block.exists` and `Fluid.getFluid` are guarded compatibility probes in
`Interactions/ItemFalling.js`, not methods supplied by this installed KubeJS
build. New code uses an actual registry membership check for blocks and
`Fluid.getType` for a native fluid. The commented historical `Utils.server`
call in `RecipeRegister/Radiating.js` is not a current server-access contract.
Use the callback's server or level instead.

## Pack Recipe Helpers

Use the installed `event.recipes.<mod>.<type>` schemas directly. Recipe-only
wrappers and their `AddItem` / `AddFluid` / `createRecipe*` converters have been
removed. Do not recreate a function that only forwards arguments to a schema.
The [Recipe API](KUBEJS_RECIPE_API.md) documents constructor order, fields,
defaults and serializer-specific constraints.

### Native Recipe Values

```js
ServerEvents.recipes(event => {
    event.recipes.createaddition.rolling('createaddition:copper_rod', 'minecraft:copper_ingot')
        .id('cwi:example/copper_rod')

    event.recipes.create.mixing(
        CreateItem.of(Item.of('minecraft:flint'), 0.25),
        ['2x minecraft:gravel', Fluid.sizedIngredientOf('#cwi:water', 250)]
    ).processingTime(100)
})
```

These examples illustrate APIs, not approved gameplay additions. Use ordinary
IDs or counted `Nx id` strings where the schema accepts them; `Item.of(...)`
for components or native stack requirements; `CreateItem.of(...)` for Create
chance outputs; and `Fluid.of(...)` or `Fluid.sizedIngredientOf(...)` for fluids.
Prefer `Fluid.of(id, amount)` for concrete fluids. The author plans Core support
for tag inputs through `Fluid.of('#tag', amount)`; use that form only after the
installed implementation is verified. Until then, tag inputs retain
`Fluid.sizedIngredientOf(...)`.
A fluid tag is an input choice, not a concrete output. In mixed Create schemas,
use `Ingredient.of('#item:tag')` to identify an item tag explicitly; a bare
`#tag` can be interpreted as a fluid ingredient.

Do not compact repeated inputs unless the receiving component expands counted
consumption identically. Preserve output order, assembly steps, explicit
processing settings and existing IDs. For example, the migrated coiling recipes
still specify `.springColor('000000')`, and casting retains its mold-consumption
flag. Generic `event.custom(...)` remains appropriate for unsupported schema
fields or data contracts that cannot be represented by the installed builder.

### Fermentation Variant Generator

`addFermentingRecipes(event, ingredients, results, processingTime,
heatRequirement, types)` remains a pack function in
[MicrobesRecipe.js](../kubejs/server_scripts/Recipes/MicrobesRecipe.js). It creates
a recipe for each requested `basin` / `bulk` variant through the installed
Diesel Generators schemas, using native item/fluid values. It returns no recipe.

The generator skips item inputs from absent Biomancy or Geode Plus, removes
their absent item outputs, and skips empty results. It also skips `bulk` variants
above nine counted item inputs. This guard does not reduce quantities or split
an oversized recipe. Optional outputs must remain unresolved strings or
`{ id, chance }` data until this filter runs; constructing an absent item stack
before filtering would lose the optional-mod behavior.

Keep functions that generate a family, enforce a shared constraint or calculate
pack data. Casting/melting loops, fermentation variants, storage/slab pairs and
material lookups perform work beyond a schema constructor.

### Crafting Pairs And Lookup Utilities

| Function | Contract |
| --- | --- |
| `addStoragePair(event, bigItem, smallItem, count)` | Adds two shapeless compression/decompression recipes; `count` small items per big item; returns nothing. |
| `slabPair(event, type, block, slab)` | Three blocks → six slabs; adds stonecutting for `stone`, or Create cutting for `wood`; returns nothing. |
| `getGlobalEntry(mapName, entryId, type, nestedKey?)` | Looks for `entry[type]`, then an optional nested key; returns `null` when missing. |
| `getMaterial(materialId, type)` | Looks up top-level `fluid` or a material form in `items`; missing → `null`. |
| `getStone(stoneId, type)` | Looks up a stone entry or its `items` form; missing → `null`. |
| `random(min, max)` | Floating-point value in `[min, max)` for normal ordered bounds; not an integer selector. |
| `desaturateHex(hex, amount)` | Blends RGB channels toward their average; amount 0 retains the color, 1 is gray; caller supplies sensible bounds. |

```js
const ironSheet = getMaterial('iron', 'sheet')
const slateGravel = getStone('darkslate', 'gravel')
```

Check for `null` before creating a recipe that requires an optional form.
The utility's return does not prove the registry ID exists. Helpers local to
interaction handlers—particle resolvers, pipe toggles, lockpicking state and
loot-table construction—remain implementation details; their source paths and
named functions are indexed in the machine-readable inventory.

## Extend The Pack's Data Systems

Prefer the existing data map and generator over registering the same family in
a parallel script. Shared data order also affects creative tabs, generated
recipes and IDs. Preserve the spelling of exported keys, including
`global.outPutMaterial` and `registerHeavyFLuid`.

| Definition | Important shape / consumers |
| --- | --- |
| `global.stoneTypes` | `{ id, hardness, sound, color, items: { block, cobblestone, gravel, powder } }`; [stone registry](../kubejs/startup_scripts/Blocks/Stones.js), material powders, stone recipes, hardness-derived tags |
| `global.materialTypes` | `{ id, type, formula, mp, stiffness, fluid?, items: { ingot?, nugget?, sheet?, rod?, wire?, spring?, powder?, block? } }`; material/item generators, metallurgy, upgrades, formula tooltips |
| `global.compoundOreTypes` | `{ id, realId, mod, colored, hardness, resistance, sound, requiredTool, process, color?, texture?, itemTexture? }`; ore registration, processing and tags |
| `global.productionMaps` | Per ore: `main`, `sulfur`, `leachable`, `hostRocks: [[stone, chance]]`, `by: [[material, chance]]`; processing decisions and output rolls |
| `global.oreProcessing` | Shared powder counts and separation probabilities; values are pack balance, not an API default |
| `global.outPutMaterial` | Ordered `[materialId, flag]` pairs used by generated refining routes and outputs; inspect each consumer before changing the flag |
| `global.oreTypes` | Existing ore variant/drop/crushed/powder definitions consumed by compatibility processing |
| `global.microbes` | Species name/colors and `variants` with trait, time, count and ordered deploying/filling `steps`; incubator recipes and item families |
| `global.apples` | Material apple definitions and their normal/charged/enchanted food effects; see [foods.js](../kubejs/startup_scripts/Items/foods.js) |
| `global.hammers` | Native hammer material stats, tiers and cooldowns; [Core API](CWI_CORE_API.md) |
| `global.buddingGrowRecipes` | Fluid amount, growth chance and multiplier definitions for the registered Create spout handler |
| `global.pipePileDefinitions`, `global.frameMaterials`, `global.variantSettings`, `global.colors` | Generated building shapes, frame material lists and variants; definitions alone do not imply independent mechanics |
| `global.moltenMetals`, `specialFluids`, `thickFluids`, `thinFluids`, `normalFluids`, `chemicalFluids`, `gases` | Ordered fluid-family definitions consumed by [fluid.js](../kubejs/startup_scripts/Fluids/fluid.js) |
| `global.stoneTextures`, `global.shouldModify`, `global.allTiers` | Texture overrides and existing-block/tool-tag rules; preserve alongside the stone generator |

The root map is [Preload/Global.js](../kubejs/startup_scripts/Preload/Global.js).
Microbes, hammers, fluids and budding define their data in their respective
startup files. `mp`, stiffness, formula and narrative mineral properties affect
only the consumers that read them; they do not automatically implement real
thermodynamics, strength, worldgen or chemical reactions.

### Stones And Textures

For a new stone family, extend `global.stoneTypes`, add the required texture
assets, and let the existing loops create KubeJS-owned forms. Existing
`minecraft:` raw/cobbled/gravel IDs are modified rather than registered twice.
Powders are registered separately by
[MaterialsRegistry.js](../kubejs/startup_scripts/Items/MaterialsRegistry.js).
The raw stone texture directory is `assets/kubejs/textures/block/stones/`.

| Replaced source texture family | Current raw stone |
| --- | --- |
| Darker Depths aridrock | `kubejs:quartzite` |
| Darker Depths grimestone | `kubejs:phyllite` |
| Darker Depths duskrock | `kubejs:conglomerate` |
| Darker Depths darkslate | `kubejs:darkslate` |

Do not import those mods' decorative/wood/plant families just to obtain these
four stones. Existing quartzite deepslate, mossy/crystalized phyllite and
acidified darkslate are separate pack blocks with existing consumers.
A texture namespace is a resource lookup, not proof that the named mod or
worldgen exists; some retained stone assets refer to `tfc:` resources.

### Fluid Family Helpers

The startup helpers create registrations; they **do not return a builder**.
Use the existing definition arrays for an ordinary new fluid. Use raw builders
only when the family helper cannot represent the intended properties.

| Function | Definition / tag |
| --- | --- |
| `registerMoltenMetal(event, name, color)` | Metal textures, fireproof bucket art, `cwi:moltens` |
| `registerHeavyFLuid(event, name, color)` | Heavy texture family, `cwi:heavy_fluids` |
| `registerChemicalFLuid(event, name, color)` | Chemical texture family, `cwi:chemical_fluids` |
| `registerNormalFLuid(event, name, color)` | Normal texture family, `cwi:normal_fluids` |
| `registerThickFLuid(event, name, color)` | `kubejs:thick` builder, `cwi:thick_fluids` |
| `registerThinFLuid(event, name, color)` | `kubejs:thin` builder, `cwi:thin_fluids` |
| `registerSpecialFLuid(event, name, overrides)` | Explicit `still`/`flowing`, optional `tags` and `textureJson`, `cwi:special_fluids` |
| `registerGas(event, name, color)` | Density -1000, viscosity 100, swimming/drowning disabled, no world block, `cwi:gasses` and `tfmg:gas` |
| `registerFluids(event, name, color, type, overrides?)` | Dispatches `molten`, `heavy`, `chemical`, `normal`, `thick`, `thin`, `special` or `gas`; an unknown type creates nothing |

Family helpers add the appropriate bucket/container tags as written. An extra
fluid tag in a special definition is not automatically an item tag on its
bucket. Heavy/chemical/normal are primarily family conventions; their names
alone do not impose additional density or gameplay effects.

Preserve `tfmg:air`, `tfmg:liquid_asphalt`, `tfmg:liquid_concrete`, and the
selected crude/heavy oil IDs. Liquid silicon uses special art and participates
in molten handling; molten slag also belongs there. Do not recreate the removed
KubeJS air/asphalt/concrete duplicates, molten plastic, furnace gas or hot air.

### Other Registration Helpers

`armorDefense(boots, leggings, chestplate, helmet)` creates the Java enum-keyed
defense map. `armorMaterial(event, name, defense, toughness,
knockbackResistance, repair)` registers the material, using a `cwi:` material
ingot tag when repair names a KubeJS material. Tool tiers use the installed
incorrect-blocks-for-drops tag API; old numeric mining levels are not a complete
1.21.1 tool implementation. See [Events And Builders](KUBEJS_EVENTS_AND_BUILDERS.md).

`setModel(builder, parent, textures)` configures an ore model. The shape
helpers inside `Blocks/SpecialShape.js` are local to that registration callback.
`getItemsFromTags(tags)` enumerates ingredient item IDs for creative content;
tag availability depends on lifecycle, so do not generalize that lookup to an
early startup decision about future server tags.

The following helpers are local to existing callback registrations. Extend
their existing definition lists rather than calling them from an unrelated
script scope:

| Local helper | Existing contract |
| --- | --- |
| `blockFilling(id, blockID, fluidInput, outputList)` | In `RecipeRegister/BlockFilling.js`; `{ id, amount }` fluid requirement, uniform choice from output block IDs on real application; simulation returns the required amount without changing the world. |
| `buddingGrow(id, fluidInput, blockInput, outputs)` | In `RecipeRegister/BuddingCatalyze.js`; catalyst entries `{ id, amount, chance, multiplier }`, ordered growth stages; consumes the matched amount for a real accepted operation even if its chance rolls fail. |
| `registerCatalysts(material, hardness, resistance)` | In `Blocks/FanCatalyst.js`; generates the existing frame and six processing catalyst families with their models and tags. |

`growthHandler(chance, map)` and `changeHandler(chance, finalBlock)` are
top-level random-tick callback factories in `Blocks/RandomTickBlocks.js`.
The first evaluates adjacent faces independently and maps the current block ID
to its next stage; the second rolls once for the ticking block. Their chance is
per callback opportunity, not a guaranteed wall-clock delay. Native Core owns
infected budding registrations while installed. Retained command-based
fallback callbacks do not establish correct dimension context for new code.

## FTB Quests And Teams

These APIs are **installed extension points**, not current quest implementation.
The target has no `config/ftbquests` tree and no current `FTBQuestsEvents` or
`FTBTeamsEvents` handlers. XMod Compat supplies the following integrations when
its corresponding mod is loaded; absent FTB Chunks/Filter System integrations
are outside this reference.

### Quest Events

| Call | Side / target | Payload and purpose |
| --- | --- | --- |
| `FTBQuestsEvents.customTask(code, event => {})` | Server; custom task code string | `task`; setters `setCheck(callback)`, `setCheckTimer(int)`, `setEnableButton(boolean)`, `setMaxProgress(long)` |
| `FTBQuestsEvents.customReward(code, event => {})` | Server; custom reward code string | Reward recipient via `getEntity()`, `reward`, `notify` |
| `FTBQuestsEvents.completed(target, event => {})` | Server; uppercase 16-digit object hex ID or `#quest_tag` | `object`, `data`, `notifiedPlayers`, `onlineMembers`, and nullable `player` |
| `FTBQuestsEvents.started(target, event => {})` | Server; same target forms as completion | Same team/object wrapper pattern as completion |
| `FTBQuestsEvents.customFilterItem(event => {})` | Client | Specialized quest item filter setup; no current caller |

Custom task/reward targets are configured code strings. Completion/start
dispatches first to the object's `toString()` value, its uppercase 16-digit
hex code, then separately to `#<tag>` for each quest-object tag. These are quest
tags from quest configuration, not Minecraft item tags. Copy the real object
code or authored tag; do not use a recipe ID or JavaScript numeric ID. Registering
both a matching ID handler and a matching tag handler can handle the same
transition twice.

`setCheck` expects a callback `(data, serverPlayer) => { ... }`, matching
`CustomTask.Check`; it is not a boolean predicate callback. Configure the task's
progress through its data contract. Only custom task/reward registrations have
a result-capable handler in this integration; completion notification is not
a cancellable rollback of the completed quest.

### Quest Progress Wrappers

`FTBQuests` is the plugin's wrapper binding. Its useful entry points are:

| Method | Return / use |
| --- | --- |
| `getFile(level)` | Quest file for the level's logical side |
| `getData(player)` | Native quest `TeamData` for a player |
| `getData(level, playerUuid)` | Native team data resolved through FTB Teams |
| `getObject(level, objectId)` | Native object resolved by the quest file |
| `getServerDataFromPlayer(player)` | Script-facing progress wrapper, or `null` on failed attachment lookup |
| `getServerDataFromSource(commandSource)` | Script-facing wrapper for a player command source, or `null` |

A script-facing progress wrapper supports `addProgress(objectId, long)`,
`changeProgress(objectId, callback)`, `reset(objectId)`, `complete(objectId)`,
`isCompleted(objectId)`, `isStarted(objectId)`, `canStartQuest(objectId)`,
`getRelativeProgress(objectId)`, `getTaskProgress(objectId)`, `getLocked()`,
`setLocked(boolean)` and `getOnlineMembers()`. `addProgress` returns a boolean;
`getTaskProgress` returns a long. The wrapper represents **team quest progress**,
even when it was obtained from one player. Use actual quest-file IDs, preserving
hex strings instead of losing precision by converting them to JavaScript numbers.

For a future server handler with a real `player` and quest ID:

```js
function hasCompletedQuest(player, questId) {
    const progress = FTBQuests.getServerDataFromPlayer(player)
    return progress !== null && progress.isCompleted(questId)
}
```

This helper illustrates a read; it does not create a quest or award progress.
The plugin also attaches its data under the player's `ftbquests` attachment;
prefer the documented wrapper entry points over assuming attachment internals.

### Team Events

`FTBTeamsEvents.playerJoinedParty(event => {})` and
`FTBTeamsEvents.playerLeftParty(event => {})` are server events. The payload
has the player through `getEntity()`, `currentTeam` and `prevTeam`. Team wrappers
expose `id` (UUID), `name`, and `isPartyTeam()`. Inspect nullable previous/current
teams before use; do not treat every party transition as a new solo player.

Sources inspected: XMod Compat's `FTBQuestsKubeJSPlugin`,
`FTBQuestsKubeJSEvents`, `FTBQuestsKubeJSWrapper`,
`FTBQuestsKubeJSTeamData`, `CustomTaskKubeEvent`, `CustomRewardKubeEvent`,
`QuestObjectCompletedKubeEvent`, `FTBTeamsKubeJSEvents` and `PlayerTeamKubeEvent`.

## Rhino And Java Interop

Use `Java.loadClass('fully.qualified.Class')` when a native API is necessary.
The inventory lists every uncommented Java import. Prefer KubeJS wrappers for
ordinary items, ingredients, fluids and world access; a Java import is not a
reason to bypass supported events or duplicate Core behavior.

| Interop issue | Current rule |
| --- | --- |
| Java bean properties | A getter can surface as `object.property`; do not assume `object.property()` is callable. Inspect the actual wrapper, especially Create/Ponder APIs. |
| Java collections | A Java Set/Map is not a JS array/object. Use its iterator/collection methods or convert deliberately; array `.concat` is not Java collection concatenation. |
| Java maps with enum keys | Use a Java map, such as the armor defense helper's `HashMap<ArmorItem.Type, Integer>`. |
| Overloaded methods | Use the installed parameter types. An item ingredient, item stack, fluid ingredient and fluid stack are different values. |
| Nullable Java values | Check registry lookups and optional wrappers before dereferencing. |
| Repeated callback locals | Installed Rhino has thrown `redeclaration of var` in specific repeated-loop callbacks; those verified sites use `let`. Do not mechanically change every `const`. |
| Mutable startup `global` | Define shared data in startup; server/client receive a read-only top-level map. Treat nested definitions as immutable. |
| Classloader side | Keep client-only classes in client code. A dedicated-server load cannot validate client rendering or audio. |
| Import-only code | AE2 storage/upgrade classes and `BrewingRecipeRegistry` are imported but currently unused by active production logic. Do not document those imports as an implemented feature. |

World writes, particles and sounds must use the correct level/dimension. A
server command without an explicit execution dimension can act in the wrong
world. The budding spout handler uses direct writes in the block's own level;
use that current implementation as the example rather than old command-based
fallback growth code.

Important current native classes include `ResourceLocation`, `BlockPos`,
`Direction`, `BuiltInRegistries`, `DataComponents`, particles/sounds and
NeoForge's `BlockEvent.PortalSpawnEvent`. The event/builders chapter shows their
relevant wrappers and access patterns. Do not copy `net.minecraftforge` imports
into this NeoForge target.

## Development Workflow

1. Find the current pack caller and its schema or generator. Check recipe-removal lists and
   progression before extending it.
2. Consult the relevant page above. If the mod changed, compare its installed
   fingerprint and inspect the new schema/classes before reusing an old call.
3. Generate fresh ProbeJS 8.0.3 definitions from `/probejs` after mod changes.
   Use its actual dump interface and generated location; old 1.20.1 definitions
   are not target types. Connect the editor to those definitions once generated.
4. Make a narrow change preserving original values, priorities and event order.
5. Run `git diff --check`, JavaScript parsing and schema/JSON checks. Compile
   with the installed Rhino as well as Node where a harness is available.
6. Apply the correct reload/restart and inspect fresh KubeJS logs. Exercise the
   actual callback, recipe or machine before reporting runtime success.

Use a verified **Java 21** runtime for Minecraft and runtime harnesses. A newer
JDK's `javap` can inspect class signatures, but that does not prove the pack runs
on that newer Java version. Avoid recording personal runtime paths in docs.

Useful KubeJS commands include `/kubejs hand`, its held/fluid inspection
commands, and `/kubejs recipe-schema-json <type>`. Check the installed command
tree or ProbeJS when the exact command changed. Dumps are development artifacts;
a dump succeeding is weaker evidence than actual crafting or machine operation.

### Validation Levels

| Evidence | Establishes | Does not establish |
| --- | --- | --- |
| Static script inventory | Call sites, helpers, priority and literal references | Guarded branch execution or generated counts |
| Schema JSON / `javap` | Installed keys, defaults, overloads and implementation conditions | Successful live callback behavior |
| Node / installed Rhino parsing | Syntax accepted by that engine | Registry existence, Java overload selection or recipes loading |
| Fresh startup and resource reload | Registrations/recipes/callback setup under that input set | GUI rendering or production-line throughput |
| Native callback/recipe tests | The tested behavior and boundary cases | Every untested interaction |
| Client/world acceptance | Rendering, controls, machine operation and observed gameplay | Unrelated systems |

### Recipe Migration Verification

The schema migration compared **11,645 encodable native recipes** before and
after on both initial load and resource reload using isolated copies of the
installed JARs. Recipe payloads, ID sets and payloads within each generated ID
family matched. The comparison included counted inputs, nested assembly steps,
fluid amounts, chances, time, heat, mold flags and coiling color.

Generated numeric ID suffixes already permuted across baseline loads/reloads;
this migration preserves the generated name families without claiming stable
suffix-to-recipe assignments. Five fuel recipes explicitly retain their former
hash IDs. One unchanged empty-hand Lychee recipe cannot be encoded by the
installed recipe codec, so it is excluded from the payload comparison. This is
recipe-data and load/reload verification, not a machine or client playtest.

### Common Failure Lookups

| Symptom | Inspect first |
| --- | --- |
| Wrong `item` / `id` error | Output stack codec and wrapper nesting in [Recipe API](KUBEJS_RECIPE_API.md) |
| Fluid tag cannot become output | Sized ingredient versus concrete fluid stack |
| `... is not a function` | Actual bean property/method and installed class signature |
| `redeclaration of var` | Repeated-loop/callback local bindings; reproduce the callback with Rhino |
| Ingredient count rejected | Schema entry limits versus physical machine slots; counted inputs versus repeated entries |
| Every item gets a tooltip | A tag ingredient resolved before tags loaded; use a dynamic tooltip with the right lifecycle |
| Legacy tag reappears | Mod/datapack tag loading and [LegacyTags.js](../kubejs/server_scripts/Tags/LegacyTags.js) deferred cleanup |
| No drops / changed loot odds | LootJS group/pool isolation, conditions, weights, set-count versus count clamping |
| Recipe in scripts but absent in JEI | Registry IDs, guard/removal order, native serializer, category support and recipe manager |
| GUI/inventory item shadow renders differently | Core shadow hooks/configuration; these apply in GUI display context |
| Particles or growth occur in another dimension | Command execution context versus direct level access |

## Boundaries For Future Work

CWI Core owns supported machines, charged hammers and upgrades. Do not restore
parallel MBD2 or old release/conversion runtimes. Schemas are data contracts;
adding one does not implement a new machine. Arc-furnace operation, custom
compound-mineral/budding viewer categories and the full old Ponder/quest/worldgen
port are not supplied by this reference. A command requesting a structure is
not proof that the structure data exists.

Retain the author's decisions: no new schematics, no revived firebox or removed
blast-furnace diagnostics, no dried-microbe revival, no reverse rubber-to-resin
recipe, no duplicate-material bridge recipes, and no speculative fixes to
accepted chemistry/gameplay simplifications. These are development constraints,
not APIs to work around. The [standards](DEVELOPMENT_STANDARDS.md) hold the
complete rules.

The historical [2101 Port Plan](superpowers/plans/KUBEJS_2101_PORT_PLAN.md),
[Recipe Realism Audit](RECIPE_REALISM_AUDIT.md) and schema tutorial retain prior
context. Their historical signatures, test counts or proposed features do not
supersede this installed API baseline.
