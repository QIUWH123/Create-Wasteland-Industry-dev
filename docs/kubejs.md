# CWI KubeJS 1.21.1 Reference

This is the KubeJS reference for the CWI Minecraft 1.21.1 instance. It is
based on the installed NeoForge jars, their embedded resources and bytecode,
the current `kubejs/` tree, and the latest available launch log. It is not a
generic "latest KubeJS" guide.

Useful coding lessons from the older CWI 1.20.1 guides are integrated here.
The companion [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) preserves the
Mihono tutorial lessons and explains the installed 2101 schema API. The older
Forge 2001.x signatures and examples remain historical evidence, not current
API instructions. Read [Development Standards](DEVELOPMENT_STANDARDS.md) before
changing scripts.

## Native Core Production Integration — 29 October 2026

This section supersedes the earlier migration exclusions and inventory below.
The installed CWI Core provides native serializers, machine behavior and JEI
categories. Production balance remains in KubeJS:

| Script | Production definitions |
| --- | --- |
| `server_scripts/Machines/BlastFurnace.js` | 10 original superheated recipes; original IDs including their `_superheated` suffix, IO, times and heat. |
| `server_scripts/Machines/MixingVessel.js` | 12 original recipes; original IO and times. Native Core handles RPM scaling. |
| `server_scripts/Machines/Incubator.js` | 28 cultures from startup `global.microbes`; original times, 64 RPM, feed order, yield and prepared-plate IO. |
| `server_scripts/Recipes/Hammer.js` | 87 block and 9 depot conversions; original stages, drop counts/chances and order. The four retired Darker Depths block IDs use the existing KubeJS stone replacements. |
| `server_scripts/Recipes/ToolArmorRecipe.js` | Restores the original small-hammer and ten material-hammer acquisition recipes, retaining patterns, ingredients and declaration order. |
| `server_scripts/Recipes/ToolArmorUpgrade.js` | 697 original native upgrades, including 76 hammer upgrades; existing material helpers, reusable tools, caps and durability costs. |
| `startup_scripts/Items/hammers.js` | 13 native charged material hammers with automatic models, stone's original first-charge texture and the entity-only steel pipe's manual model. Lead uses the successful `afterImpact` hook; its original neurotoxin provider is absent, so no substitute effect is invented. |
| `server_scripts/Interactions/Hammers.js` | Keeps the steel pipe out of hammer conversion catalysts. |
| `server_scripts/Starter.js` | Login and respawn use registered `cwi:player_spawn`; the pipe callback uses `CwiSounds.STEEL_PIPE.get()`. The pipe item remains `kubejs:steel_pipe`. |
| `startup_scripts/RecipeRegister/BuddingCatalyze.js`, `server_scripts/Recipes/MicrobesRecipe.js` | Original water/lava/caustic-soda growth attempts and chances; simulation is read-only. Direct block writes and native sound stay in the budding block's dimension. Fermenting outputs use Core's registered infected budding blocks. Quartz remains conditional on Geode Plus; amber stays excluded. |
| `server_scripts/Progression/IndustrialAge.js`, `PrecisionAge.js` | Restores original crafting/assembly access to the nine Core machine blocks/components, including the lava extractor and Stirling engine. |
| `client_scripts/tooltips.js`, `client_scripts/JEI/JEIHide.js` | Material formulas, hot/no-gravity warnings and original viewer entry hiding, guarded for absent registry entries. |

Use `event.create(id, 'hammer')`: the builder type is `kubejs:hammer`, while
production item IDs remain `minecraft:<material>_hammer`. Do not register
`cwi:hammer` or restore `global.releaseHammer`. Core performs the material
hammer release and model lifecycle; the pipe supplies its distinct release
callback and is excluded from conversion catalysts.

Use `.texture(...)` for automatic ordinary hammer models, with
`.chargedTexture(1, ...)` for stone's authored first-stage art. An explicit
`.modelGenerator(...)` owns the whole model and bypasses automatic charge
generation. Keep `.chargeModels(false)` on the steel pipe. `afterImpact`
runs only after successful native charged entity damage; it does not replace
the pipe's distinct `releaseUsing` callback.

Native recipe factories are `event.recipes.cwi.blast_furnace_processing`,
`mixing_vessel_mixing`, `incubating`, `block_conversion`, `depot_conversion`
and `equipment_upgrade`. Their schemas come from Core; do not add duplicate
schemas or copy illustrative test recipes into production. Equipment upgrades
use native crafting and native JEI rather than shapeless result callbacks.
Use `minecraft:sweeping_edge` directly. The installed Core JAR is the API
authority; a concurrently rebuilt source project can contain methods and fixes
that are not installed in this pack. Verification used
`cwi-0.1.0-dev+1.21.1.jar`, SHA-256
`891d70b31de86473f578cdce74ed6c5971aa7d0f5012cbbed4d5334d75232f73`.
Core preserves upgrade enchantment order in `cwi:enchantment_order` inside
custom data. Existing 1.21 items without stored order initialize by ID; their
lost historical order cannot be inferred.

`ItemEvents.modifyTooltips` replaces the old tooltip event. Its `add` takes a
list of components. Live tag warnings use a `dynamicTooltips` handler because
an unresolved empty ingredient can match every item before world tags load.
Viewer hiding uses `RecipeViewerEvents.removeEntries('item'|'fluid', ...)`.

Machine, hammer and upgrade JEI pages are native. The installed APIs do not
provide the old `JEIAddedEvents` category registration bridge, and Core does
not yet implement the budding-catalyst or compound-mineral custom category.
Those two displays and the old Ponder scenes remain outstanding. Budding's
actual spout processing is independent of that display gap. No MBD2 runtime,
arc-furnace implementation, firebox, diagnostics, dried-microbe revival or new
schematics are added.

Current compatibility contracts:

- Foundry validation accepts up to 36 item ingredient entries. The basin
  still has four physical input slots, each holding nine items. Repeated
  entries consume repeated items; do not merge them into unsupported counted
  ingredient JSON. All eight andesite-alloy recipes retain their original IO.
- Lychee block interactions use native `{}` for an empty hand. Core's schema
  accepts and re-encodes it; keep the original scrap recipe and sneaking
  condition. Lychee's upstream native JSON encoder cannot encode that empty
  ingredient, so avoid using it to dump empty-hand recipes; native decoding
  and network synchronization work.
- Chest loot uses outer `.group(...)` for independent rolls/chances and inner
  `.pool(...)` for isolated outputs and functions. Use `.setCount(...)`, not
  count clamping, to preserve authored stack counts. Dark ash retains its two
  original biome conditions; neither biome is currently ported, so that
  alternative fails and ordinary ash remains available.
- Industrial-iron, stainless-steel and lead material hammers still have no
  original acquisition route. No new acquisition recipes are invented.
  Automatic generation supplies industrial iron's charged models.

Validation compares complete generated recipe data with the read-only original:
50 machine recipes, 96 hammer conversions, 697 upgrades and 20 acquisition
recipes. All 95 JavaScript files pass Node and installed Rhino parsing.
Deterministic budding checks cover 2,400 scenarios; client checks cover 244
formula pairs, absent registries and both warning tags. The original instance's
2,383 KubeJS files retain their pre-task hashes.

An isolated Java 21 dedicated server loaded exact copies of 1,879 production
files and the installed Core JAR. All 843 native processing/conversion/upgrade
recipes, nine machine and eleven hammer acquisition recipes, hammer tags,
steel-pipe exclusion, mixing-vessel container tag and infected-amethyst
fermentation outputs pass actual recipe-manager checks on initial load and
after `/reload`. The registered spout handler was invoked in a temporary
Nether world: wrong or insufficient fluids return zero; simulation accepts
50 mB without changing air; a real 50 mB soda application reaches a cluster;
a full cluster accepts zero; the same Overworld coordinates remain unchanged.
This caught and verified the fix for the callback-local Rhino redeclaration.

The server used 110 dedicated-compatible JARs from the 117 installed JARs;
seven client-only JARs were excluded only in the temporary copy. A temporary
verification helper inspected native loot pools and generated models; it is
not installed in the pack. The final server stopped cleanly with zero KubeJS
errors and zero failed recipes on initial load and resource reload. Upstream
mod resource errors remain. No GUI, JEI rendering, audio audition or full
production-line operation acceptance is claimed from this run.

The compatibility update additionally verifies all eight alloy recipe bodies,
including repeated ingredients, heat, time and fluid amounts. Generated ID
suffixes are assigned by KubeJS and can differ between reloads; the test
compares all eight complete recipe bodies. Actual scrap interaction rejects
non-sneaking and occupied hands and converts the block only for a sneaking
empty hand. Its drops exposed a repeated-loop Rhino error in `ItemFalling.js`;
four loop-local declarations now use `let`, preserving effect order and timing.

Native capture compares all 20 chest tables, 318 independent groups, 320 pools,
254 chance conditions, 718 entries and every weight/count/damage function with
the original definitions, initially and after reload. The real startup
builders generate four models for each of 13 material hammers, preserve stone's
first-stage art and the pipe's manual model/release callback, and resolve both
native sound IDs. The absent neurotoxin provider safely leaves the lead hook
inactive.

The verified Core artifact retains all baseline resources and classes except
five class entries for the foundry limit and Lychee schema. An isolated
baseline-plus-fixes fixture passes `check` and all 101 required native GameTests,
including ingredient consumption/capacity boundaries and empty-hand JSON,
network and interaction contracts. Concurrent unfinished Core features were
preserved separately and are not part of this installed artifact.

## Reviewed Files And Evidence

The static audit covered:

- `mods/kubejs-neoforge-2101.7.2-build.377.jar`
- `mods/kubejs-create-neoforge-2101.3.1-build.18.jar`
- `mods/rhino-2101.2.7-build.85.jar`
- `mods/ProbeJS-8.0.3.jar`
- `kubejs/README.txt`
- every JavaScript file currently under `kubejs/`
- the KubeJS startup and client sections of `logs/debug.log`
- the older CWI instance's `kubejs/` tree: 111 JavaScript files, its `data/`,
  `assets/`, configuration, ProbeJS files and KubeJS logs

The jar inspection used `jar tf`, `unzip -p`, `shasum -a 256`, `javap -public`,
and `javap -c -p`. Public signatures prove that a class or method exists;
they do not prove that a callback is safe in a live world. The log is a runtime
snapshot, but several scripts are newer than that snapshot, so it cannot prove
the current tree is error-free.

## Installed Compatibility Baseline

| Component | Installed file | Version or requirement |
| --- | --- | --- |
| Minecraft | instance profile | 1.21.1 |
| Loader | NeoForge | 21.1.199 or newer is required by KubeJS metadata |
| KubeJS | `kubejs-neoforge-2101.7.2-build.377.jar` | 2101.7.2-build.377 |
| Rhino | `rhino-2101.2.7-build.85.jar` | 2101.2.7-build.85; KubeJS requires build 81 or newer |
| KubeJS Create | `kubejs-create-neoforge-2101.3.1-build.18.jar` | 2101.3.1-build.18 |
| Create | `create-1.21.1-6.0.10.jar` | 6.0.10; KubeJS Create requires 6.0.7 or newer |
| ProbeJS | `ProbeJS-8.0.3.jar` | 8.0.3 |
| Lychee | `Lychee-1.21.1-NeoForge-6.5.3.jar` | 6.5.3 |
| LootJS | installed NeoForge jar | 3.7.0 |
| PonderJS | installed jar | 2.4.0 |
| Create Metallurgy | installed jar | 1.0.3 |
| LDLib2 | installed jar | 2.2.44 |

KubeJS metadata also declares optional client integrations for JEI 19.25.0.322
or newer, REI 16.0.799 or newer, EMI 1.1.22 or newer, and Better Advanced
Tooltips 2101.1.0-build.1 or newer. An optional dependency being installed does
not mean that this pack currently has a script using it.

## Core KubeJS Jar

### Installed baseline

The core jar is mod `kubejs` under the JavaFML loader. It requires NeoForge
21.1.199 or newer and Rhino 2101.2.7-build.81 or newer. The installed build is
KubeJS 2101.7.2-build.377. The installed Create plugin requires KubeJS
2101.7.2-build.285 or newer and Create 6.0.7 or newer.

The core jar embeds 32 schemas covering vanilla/KubeJS shaped and shapeless
crafting, cooking, blasting, smoking, campfire cooking, smithing, stonecutting,
special crafting, plus optional Dank Storage and Extended Crafting schemas.
The exact files and serializer keys are versioned implementation details; use
`/kubejs recipe-schema-json <recipe-type>` or ProbeJS when developing a new
schema.

The mapping files map `dankstorage:upgrade` to `dankStorageUpgrade`, and
`extendedcrafting:shaped_table` / `extendedcrafting:shapeless_table` to
`extendedCraftingShaped` / `extendedCraftingShapeless`.

The embedded Minecraft schemas cover ordinary shaped, shapeless, cooking,
smithing, stonecutting, special, and special-crafting serializers. The shaped
and shapeless KubeJS factories support recipe keys, output uniqueness, hidden
KubeJS mirror/shrink/notification controls, crafting-book categories, and
sized ingredient spread. The cooking schema exposes optional experience and
cooking time aliases. The exact serializer remains authoritative.

### Script types and lifecycle

`ScriptType` defines three script managers:

| Directory | Manager | Intended work | Reload command |
| --- | --- | --- | --- |
| `kubejs/startup_scripts/` | `StartupScriptManager` | Registries, builders, startup hooks | `/kubejs reload startup-scripts` |
| `kubejs/server_scripts/` | `ServerScriptManager` | Recipes, tags, data, server events | `/kubejs reload server-scripts` or `/reload` for data resources |
| `kubejs/client_scripts/` | `ClientScriptManager` | Client events, tooltips, recipe viewers, assets | `/kubejs reload client-scripts`, or `F3+T` for assets |

`kubejs/README.txt` also documents `assets/` as a resource-pack directory,
`data/` as a datapack directory, `config/` as script-accessible configuration,
and `exported/` as the destination for data dumps. Startup reload exists, but
the README warns that registry objects may not rebuild safely; restart after
changing registered items, blocks, or fluids. Schema registration in this
build is a server resource lifecycle; use the server event and reload workflow
in the [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md).

At the implementation level, the server manager creates virtual KubeJS packs
around the mod packs, loads builders into generated registries, posts registry
events, and emits generated data and tags. That explains why directory choice
and startup/server separation are behavioral contracts rather than style.

### Event groups

The built-in core plugin registers these event groups and handlers. This is the
available 1.21.1 surface, not a statement that CWI uses every event.

| Group | Handlers |
| --- | --- |
| `StartupEvents` | `init`, `postInit`, `registry`, `modifyCreativeTab` |
| `ServerEvents` | `registry`, `generateData`, `loaded`, `unloaded`, `tick`, `tags`, `commandRegistry`, `command`, `basicCommand`, `basicPublicCommand`, `recipeMappingRegistry`, `recipeSchemaRegistry`, `recipes`, `afterRecipes`, `specialRecipeSerializers`, `compostableRecipes`, `modifyRecipeResult`, `modifyRecipeIngredient` |
| `ClientEvents` | `generateAssets`, `blockEntityRendererRegistry`, `entityRendererRegistry`, `menuScreenRegistry`, `loggedIn`, `loggedOut`, `tick`, `leftDebugInfo`, `rightDebugInfo`, `atlasSpriteRegistry`, `lang`, `particleProviderRegistry`, `highlight` |
| `BlockEvents` | `modification`, `rightClicked`, `leftClicked`, `placed`, `broken`, `drops`, detector changes, farmland trample, random tick, block-entity tick, falling, picked |
| `ItemEvents` | `modification`, `toolTierRegistry`, click/pickup/drop/interact/craft/smelt/food, tooltips, model properties, destroy |
| `EntityEvents` | `death`, `beforeHurt`, `afterHurt`, `checkSpawn`, `spawned`, `drops` |
| `PlayerEvents` | login/logout/clone/respawn/tick/chat/advancement, inventory and chest open/close/change, stage add/remove |
| `LevelEvents` | loaded, saved, unloaded, tick, before/after explosion |
| `NetworkEvents` | `dataReceived` |
| `KeyBindEvents` | registry, pressed, released, tick |
| `RecipeViewerEvents` | add/remove entries, grouping, information, subtypes, categories, recipes |

Other installed addons register their own groups. KubeJS Create adds
`CreateEvents`; Lychee, PonderJS, LootJS, and other plugins add their own
groups when their required mods are present.

### Commands

The core command class registers `/kubejs`; `/kjs` redirects to the same root.
The client command class adds client-only reload and browsing operations.

Core subcommands include:

```text
/kubejs help
/kubejs hand
/kubejs offhand
/kubejs inventory
/kubejs hotbar
/kubejs errors startup|server|client
/kubejs reload config|startup-scripts|server-scripts
/kubejs export debug|pack-zips|pack-folders
/kubejs recipe-schema-json <recipe-type>
/kubejs list-tag <registry> <tag>
/kubejs dump registry <registry>
/kubejs events
/kubejs stages add|remove|clear|list player <player> [stage]
/kubejs generate-typings
/kubejs packmode name
/kubejs persistent-data server|dimension|entity ...
/kubejs eval <code>
```

Some operations require operator permissions or single-player mode. The client
side additions are:

```text
/kubejs reload client-scripts|textures|lang|browse
```

`/kubejs eval` is deliberately single-player-only. Persistent data commands
also expose get, merge, remove, and scoreboard import/export branches.

### Registry builders

The core jar exposes `RegistryKubeEvent.create(...)`, `createCustom(...)`,
`add(...)`, and `created(...)`. Builders inherit from `BuilderBase<T>`, which
provides an ID, translation/display name, tags, data/assets generation,
language generation, object creation, and object transformation.

Important public builders include:

- `ItemBuilder`: data components, stack size, durability, burn time, container
  item, subtypes, rarity, group, tint, food, fire resistance, jukebox playable,
  repair policy, and item behavior callbacks.
- `BlockBuilder`: sound and map color, hardness/resistance, light, collision,
  tools, render/tint, item/no-item, shape, waterlogging, drops, movement
  factors, random ticks, spawn/suffocation/view/redstone behavior, state and
  placement callbacks, replacement, entity-inside/step/fall/explode callbacks,
  rotation/mirror, right-click, and block entities.
- `FluidBuilder`: fluid type, tint, still/flowing textures, render type,
  translucency, slope distance, level decrease, explosion resistance, tick rate,
  and optional bucket/block creation.
- Custom item builders for armor, pickaxes/axes/hoes/shovels, handheld items,
  shears, swords, and smithing templates.

`BlockEntityInfo` supports initial data, server/client ticking, tick frequency
and offset, synchronization, named attachments, event handlers, inventory
opening, and tank filling. Core attachment wrappers cover inventory, fluids,
energy, capabilities, and NBT persistence.

### Recipe API and schemas

`RecipesKubeEvent` exposes the original, added, and removed recipe collections;
the built-in vanilla functions (`shaped`, `shapeless`, `smelting`, `blasting`,
`smoking`, `campfireCooking`, `stonecutting`, `smithing`, and
`smithingTrim`); filtering, searching, removal, input/output replacement,
`custom(...)`, JSON parsing, ID allocation, staging, and type/example printing.

`RecipeSchema` and `RecipeSchemaRegistry` are the native schema API in this
build. `RecipeSchema` supports factories, type overrides, constructor key
orders, unique IDs, optional keys, functions, post-processors, deserialization,
and JSON serialization. `RecipeKey` supports optional/default values, aliases,
exclusion, function names, and `alwaysWrite()`.

The important 1.21.1 event placement is `ServerEvents.recipeSchemaRegistry`.
`RecipeSchemaStorage` loads JSON schemas, invokes installed plugin schema
registration, then posts this event to the server script manager. It runs
before recipe discovery in the resource reload. Put script registrations in
`kubejs/server_scripts/`; the old `StartupEvents.recipeSchemaRegistry` and
`event.getComponents()` examples do not apply to this build.

The core schema component system includes list, map, either, nested-recipe,
custom-object, simple, codec-backed, and parent components. Component roles are
part of recipe matching and replacement. A field that looks like an output from
its name alone may not be treated as an output by the schema.

The registry's verified public operations are `namespace(String)`,
`register(ResourceLocation, RecipeSchema)`, and
`register(ResourceLocation, RegistryAwareSchema)`. `RecipeNamespace` then
offers `register(path, schema)`, `registerBasic(...)`, `shaped(path)`,
`shapeless(path)`, `special(path)`, and `withExistingParent(...)`. Component
types expose `key(name, role)`, `inputKey(name)`, `outputKey(name)`, and
`otherKey(name)`. The component instances available to a script depend on the
active KubeJS bindings and addon plugins; this pack has no current schema
registration script to serve as a tested binding example.

Use the [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) for current
component mappings, resource examples and the historical helper semantics.
Verify the serializer, component roles, defaults and generated JSON before
changing a schema. Register a schema only when the target serializer already
exists, and check whether an installed integration already owns it.

### Core surface used by CWI

The installed core jar provides the public surfaces needed by this pack:
startup registries and custom builders, server recipe/tag/data events, client
asset and recipe-viewer events, item data components, `LevelBlock`, block/entity
predicates, block-entity attachments, stages, persistent data and Java/Rhino
wrappers. The jar also contains implementation mixins and tooling classes;
those are not stable modpack APIs and are omitted from the pack-facing map.

The detailed CWI behavior below is more useful than a class-count inventory:
it records which of those APIs the old pack actually called, what each file
changed, and which systems disappeared in the 1.21.1 tree.

### Built-in bindings and JavaScript wrappers

The built-in plugin binds `global`, `Platform`, `console`, `Java`, `Text`,
`Component`, `Item`, `Items`, `Block`, `Blocks`, `Fluid`, `Ingredient`, `NBT`,
`NBTIO`, `Direction`, `Facing`, `AABB`, `BlockPos`, `Vec3d`, `Vec3i`, `Vec3f`,
`Vec4f`, `Matrix3f`, `Matrix4f`, `Quaternionf`, `RotationAxis`, `Registry`,
`DataMap`, `EntitySelector`, `PlayerSelector`, `ItemPredicate`, `SlotFilter`,
`RecipeFilter`, `ReplacementMatch`, `ReplacementMatchInfo`, `BlockStatePredicate`,
`KubeResourceLocation`, `KubeColor`, `KubeIcon`, `TickDuration`, `Duration`,
`FluidAmounts`, `SECOND`, `MINUTE`, `HOUR`, `Color`, `Stats`, `ParticleOptions`,
`Notification`, `SizedIngredient`, `ID`, `JsonIO`, `JsonUtils`, `UUID`,
`StringUtils`, `Utils`, `KMath`, `NativeEvent`, `Tristate`, `setTimeout`,
`clearTimeout`, `setInterval`, and `clearInterval`. Event groups are bound as
the global objects listed in the event table above.

`Java.loadClass` is the escape hatch used by CWI. It returns a Java class only
when that class is available to the current script side and class loader.
Loading client-only classes from startup or server code can fail before the
callback runs. Use the exact NeoForge package name and keep imports in the
smallest script that needs them.

### Data components and item components

Minecraft 1.21.1 stores most mutable item state in data components. KubeJS
adds `ComponentFunctions` to component-bearing wrappers and
`ItemComponentFunctions` to item stacks/items. The core operations are:

| API family | Operations |
| --- | --- |
| Generic components | `kjs$get`, `kjs$override`, `kjs$set`, `kjs$remove`, `kjs$setUnit`, `kjs$patch`, `kjs$resetComponents`, `kjs$getComponentString` |
| Common item state | custom data, rarity, custom name, lore, custom model data, tooltip/glint flags, dyed color, potion contents/id, entity/profile data, banner color, block-state properties, lock and container loot table |
| Item limits | `kjs$setMaxStackSize`, `kjs$setMaxDamage`, `kjs$setDamage`, `kjs$setUnbreakable`, `kjs$setRepairCost` |
| Item behavior components | food and `modifyFood`, fire resistance, tool, map color, charged projectiles, bundle contents, bucket/block-entity data, instrument, fireworks, firework explosion, note-block sound |
| Attributes | get/set item attribute modifiers through `AttributeModifierFunctions` |

`DataComponentWrapper` converts Rhino values, maps and NBT/codec values into
`DataComponentMap` or `DataComponentPatch`. It can resolve component types,
filter values by their generated type information, print maps/patches and
produce a visual-only patch for recipe-viewer or client comparisons. Prefer a
typed component setter when one exists; use a raw map/patch only after checking
the component codec and the installed data-component type.

`ItemBuilder.component(type, value)` sets a component on a registered item.
The item builder also exposes `maxStackSize`, `unstackable`, `maxDamage`,
`burnTime`, `containerItem`, `subtypes`, `rarity`, `group`, `color`, `food`,
`fireResistant`, `jukeboxPlayable`, and `disableRepair`. `FoodBuilder` supports
nutrition, saturation, eating time, fast eating, conversion to another stack,
effects, removal of effects and an `eaten` callback.

### Registry builders in more detail

All builders extend `BuilderBase`. Common methods are `translationKey`,
`displayName`, `formattedDisplayName`, `tag`, `get`, `createTransformedObject`,
and generated language/data/assets. `ModelledBuilderBase` adds `texture`,
`textures`, `parentModel`, and a `modelGenerator` callback.

The built-in builder type registry includes sound events, blocks, items, fluids,
fluid types, mob effects, potions, particle types, custom stats, points of
interest, villagers/professions, creative tabs, armor materials, painting
variants, jukebox songs and attributes. It also registers custom IDs for thin
and thick fluids; swords, pickaxes, axes, shovels, hoes, shears, armor pieces,
animal armor and smithing templates; and detector, slab, stair, fence, wall,
fence gate, pressure plate, button, falling, crop, cardinal, carpet, door,
trapdoor and pillar blocks.

`BlockBuilder` covers sound/map color, hardness/resistance, light, opacity/full
block, tool requirements, render/tint, item/no-item, custom boxes, collision,
waterlogging, drops, slipperiness/speed/jump factors, random ticks, spawn and
redstone behavior, cutout/translucent rendering, instruments, block/item tags,
state and placement callbacks, replacement, entity-inside/step/fall/explode
callbacks, properties, rotation/mirror, right-click and block entities.
`SeedItemBuilder` connects a registered seed item to a crop block.

`FluidBuilder` creates a still/flowing fluid and optional block and bucket. It
supports tint, still/flowing textures, render type, translucency, tags, slope
distance, level decrease, explosion resistance, tick rate, `noBucket` and
`noBlock`. `FluidTypeBuilder` additionally controls overlays, motion, pushing,
swimming/drowning, fall distance, extinguishing, source conversion, boating,
path types, sounds, hydration, light, density, temperature, viscosity, rarity
and dripstone behavior. `ThickFluidBuilder` and `ThinFluidBuilder` are the
specialized fluid variants used by CWI's fluid helper.

Custom item builders cover armor pieces and animal armor, diggers (pickaxe,
axe, shovel and hoe), handheld items, shears, swords and smithing templates.
`ItemToolTierRegistryKubeEvent` can `add`, `addBasedOnExisting` or `addExisting`
tiers; a mutable tier exposes the usual level, uses, speed, attack damage,
enchantment value, repair ingredient and tag configuration.

### Block entities and capability attachments

`BlockBuilder.blockEntity(info => ...)` creates a KubeJS block entity. Its
`BlockEntityInfo` supports `initialData`, `serverTicking`, `clientTicking`,
`ticking`, `tickFrequency`, `tickOffset`, `enableSync`, numbered
`eventHandler`s, `rightClickOpensInventory(id)` and
`rightClickFillsTank(id)`. Attachments are declared with an ID, attachment
type, exposed directions and a factory.

The built-in attachment types are:

- `inventory`: width/height and an optional item filter; the wrapped handler
  implements NeoForge item-handler capabilities and serializes its stacks.
- `fluidTank`: capacity and an optional fluid ingredient predicate; the wrapped
  `FluidTank` exposes the NeoForge fluid-handler capability and persists NBT.
- `energyStorage`: capacity, max receive/extract and optional automatic output
  directions; the wrapped storage supports set/add/remove/use/receive/extract.
- `custom`: a `BlockCapability` plus arbitrary data supplied by the factory.

Every attachment has `getWrappedObject`, `getCapability`, serialization and
removal hooks as applicable. `KubeBlockEntity` tracks the block, position,
placer, tick cycle, arbitrary data and attachments, and can save/sync/send or
trigger an event. This is a real capability surface, but it is not used by any
current CWI startup script.

### World, block and predicate wrappers

`LevelBlock` is the common block-at-position wrapper passed to many callbacks.
It exposes dimension and coordinates, directional offsets (`getUp`, `getDown`,
`getNorth`, `getSouth`, `getWest`, `getEast`), block state/properties, set and
replace operations, block-entity ID/data, light and sky visibility, explosions,
entity/lightning/firework spawning, inventories, held item, drops, item
spawning, nearby players, biome ID and a block-state string. Cache a
`LevelBlock` only for a short callback; world state can change after caching.

`BlockStatePredicate` accepts a block state, can be built from a string or
wrapped from a JavaScript value, and can be converted to a world-generation
rule test. It can enumerate matching states, blocks and IDs. `BlockPredicate`
checks a `LevelBlock`; block-entity predicates add entity-data checks. These
predicates are used by Create's advanced boiler handler and spout/block APIs.

### Recipe matching, replacement and ingredient actions

`RecipesKubeEvent` keeps the original, added and removed recipe collections and
offers both stream-style and direct operations. The built-in filters are ID,
regular-expression ID, type, namespace/mod, group, input and output filters;
`AndFilter`, `OrFilter`, `NotFilter` and a constant filter compose them. The
event can count, test, find recipes or IDs, remove recipes, replace inputs or
outputs, allocate an ID with `takeId`, stage a recipe, print recipe types and
examples, parse JSON, and call the built-in recipe functions.

Replacement matching is a separate contract from filtering. `ItemMatch` can
match an `ItemStack`, `Ingredient` or item-like value; `FluidMatch` can match a
`FluidStack` or NeoForge `FluidIngredient`. `ReplacementMatch.wrap(...)`
converts a tag, ingredient, predicate or item/fluid-like value into a matcher.
`ReplacementMatchInfo` carries the input/output context used by `replaceInput`
and `replaceOutput`; do not assume a replacement matcher also matches recipe
IDs.

Ingredient actions describe what happens to a crafting ingredient after the
recipe runs. The core action types are `consume`, `keep`, `damage(amount)` and
`replace(itemStack)`, with a custom action registry available for addons. An
action transforms the stack at its grid index and can therefore preserve a
container, damage a tool or consume the input explicitly.

Recipe components are typed fields rather than unvalidated JSON keys. The jar
contains primitive/string/boolean/number-range/enum/list/map/either components,
item and fluid stacks, ingredients, sized ingredients, blocks/block states,
tags, registry/resource keys, time, book categories, nested schemas and custom
objects. A component can create `inputKey`, `outputKey` or `otherKey` roles,
wrap Rhino values, read/write JSON, match and replace values, validate them,
allow or reject empty values, build a unique ID, spread a list, turn into a
map/pattern key, combine with `or`, attach a codec, or create a component
builder. `ComponentRole` affects matching and replacement, so set the role
instead of relying on a field name such as `result` or `output`.

`RecipeSchema` composes these keys with optional/default values, aliases,
constructor order, unique-ID fields, schema functions and post-processors. The
installed function types include `set`, `addToList`, bundled/custom functions;
post-processors include key-pattern cleanup. `RecipeSchemaRegistry` and
`RecipeNamespace` register schemas and basic/shaped/shapeless/special schemas;
`RecipeMappingRegistry` maps an existing recipe type to a JavaScript function.
The JSON loader supports parent schemas, type overrides, excluded fields,
always-written fields and constructor variants. These are the complete native
building blocks behind the embedded schemas and KubeJS Create schemas.

### Tags, data maps, stages and virtual packs

`ServerEvents.tags` receives a `TagKubeEvent` for each registry. Its `get`,
`add`, `remove`, `removeAll`, `removeAllTagsFrom` and `getElementIds` methods
operate through `TagWrapper`; wrappers expose `add`, `remove`, `removeAll` and
`getObjectIds`. Pre-tag actions can queue additions/removals before a tag map
is finalized, and tag filters support IDs, namespaces, regexes, tag IDs and
boolean composition. CWI actively uses tag callbacks in
`kubejs/server_scripts/Tags/`, including generated material and stone tags.

`ServerEvents.compostableRecipes` is a data-map event with `add`, `addReplace`,
`replaceAll`, `remove` and `removeAll`, including a chance and optional
`canGrowWhenPlaced` flag. The same virtual-data machinery is used for generated
data and datamaps. `ServerScriptManager` builds virtual data/resource packs
around mod packs, loads generated registries/tags, posts registry events and
reloads server scripts. `VirtualDataPack`, `VirtualAssetPack`,
`VirtualDataMapFile`, `GeneratedData` and `GeneratedDataStage` are the backing
classes; they are implementation APIs but explain why server data belongs in
`server_scripts` or `data/`.

The server registry bridge can create JSON-backed entries for dimension types,
configured/placed features and carvers, structures and structure sets, processor
lists, template pools, biomes, multi-noise biome parameters, noise and density
functions, noise settings, world presets, flat-level presets, chat types, trim
patterns/materials, wolf variants, painting variants, damage types, banner
patterns, enchantments, enchantment providers and jukebox songs. These dynamic
registries use the installed registry codec and registry-aware JSON operations;
they are distinct from ordinary `StartupEvents.registry` builders.

`ScriptType` separates startup, server and client managers with different
directories, class filters, native-listener permissions and reload behavior.
`ScriptManager` tracks script packs, Rhino contexts and allowed classes, and
implements unload, reload, directory collection and additional-pack loading.
`KubeJSContext` supplies visible-to-script class loading, registry lookup,
value conversion, console output and type information. `Platform` exposes
loader/mod/version queries, loaded-mod checks, client/data-generation flags
and pack mode. This is why a startup script can define globals for later
registrations while a server script can see a live server but not client-only
classes.

### Using `global` in server scripts

In installed KubeJS `2101.7.2-build.377`, startup scripts receive the writable
shared map. Server and client scripts receive `GlobalUnmodifiableMap`: reading
`global.name` works, but assigning or deleting its keys throws
`'global' cannot be assigned to in client or server scripts`.

Define shared configuration in startup scripts, then read it in server scripts:

```js
// startup_scripts/Preload/Settings.js
global.cwiSettings = { tickInterval: 10 }

// server_scripts/Example.js
const tickInterval = global.cwiSettings.tickInterval
```

Existing material, stone, ore and microbe maps continue to use this pattern.
`global.debugUserName` is now defined with the other startup configuration, so
the development tools only read it.

Server script files share a top-level scope. Keep shared server helpers as
`function` declarations, use `const` for bindings that stay fixed, and use
`let` for mutable runtime state. Top-level names must be unique across server
files. CWI's tick counter is now:

```js
let globalTickCounter = 0
ServerEvents.tick(() => {
    globalTickCounter = (globalTickCounter + 1) % 1000
})
```

Other server handlers read `globalTickCounter` directly. This state resets when
server scripts reload. Store data that must survive a world restart in
`server.persistentData`, `level.persistentData`, or `player.persistentData`, as
appropriate. Do not move world-dependent state into startup configuration.
Changes to startup definitions require a full game restart.

Stages are available when the GameStages integration is present. Use
`StageEvents.get(player)` or `.create(player)` and then `has`, `add`, `remove`,
`set`, `toggle`, `clear`, `sync` or `replace`. `PlayerEvents.stageAdded` and
`stageRemoved` observe changes, and `/kubejs stages ...` manipulates them. A
stage implementation can be `NoStages` when the integration is absent.

### Event payloads and runtime wrappers

The event group table names handlers; the payload classes provide the useful
fields below. Most callbacks also expose `level`, `server`, `player`, `entity`
or a `LevelBlock` where the underlying event has one.

| Group | Payloads and notable operations |
| --- | --- |
| `BlockEvents` | right/left click: hand, item, face and hit result; placed/broken: player, item and state; drops: mutable drops, XP and tool; detector changes: ID/powered state; random tick/block-entity tick; falling and picked events; modification helper for hardness, resistance, sound and tool requirements |
| `ItemEvents` | click/interact/pickup/drop/craft/smelt/food/destroy payloads; `modifyTooltips` and `dynamicTooltips` line requirements/actions; model-property registration; modification helper for food, burn time, stack size, max damage, attributes and components |
| `EntityEvents` | death, before/after hurt (source, damage and `setDamage`), spawn checks (position/type/block/spawner), spawned and drops (`getDrops`, `eventDrops`, `addDrop(stack[, chance])`) |
| `PlayerEvents` | login/logout/clone/respawn, tick, chat username/message/component mutation, advancement, inventory/chest open-close/change, and stage add/remove; clone exposes old player and keep-data state |
| `LevelEvents` | loaded/saved/unloaded/tick and before/after explosion; explosion payload exposes position, block wrapper and exploder |
| `ServerEvents` | server lifecycle/tick, command registration/command interception, recipe mapping/schema/recipes/after-loaded, special recipes, compostables, recipe result/ingredient modification, tags and data generation |
| `NetworkEvents` | data received payloads for client/server packet channels |

`LevelBlock` is the common mutation surface in these payloads. `EntityArrayList`
and `EntityPotionEffectsJS` wrap entity collections/effects; `PlayerStatsJS`,
`KubeJSInventoryListener` and `KubePlayerEvent` expose player inventory and
statistics. `NativeEvents.onEvent` is the direct NeoForge bridge used by CWI's
portal cancellation script; it bypasses the higher-level payload wrappers.

### Client generation, GUI and recipe viewers

The jar has a complete client-side generation surface even though CWI currently
has no client scripts. `ClientEvents.generateAssets` can generate language,
models, blockstates, sounds and particles. The generators expose:

- `LangKubeEvent.add`, `addAll`, `renameItem`, `renameBlock`, `renameEntity`,
  `renameBiome` and `painting`.
- `ModelGenerator.parent`, `texture(s)`, `element`, `override` and `custom`.
- `VariantBlockStateGenerator.variant`/`simpleVariant` and
  `MultipartBlockStateGenerator.part`.
- `ParticleGenerator.texture`/`textures` and `SoundsGenerator.addSound`.
- renderer registries for block entities and entities, menu screen registry,
  atlas sprite registry, particle provider registry and highlight events.

`ParticleProviderRegistryKubeEvent` can register a default provider, a sprite
set provider, an animated-particle consumer or a special vanilla provider.
`KubeAnimatedParticle` exposes gravity, friction, color, physicality, speed,
light and `onTick`. `KeyBindEvents.registry` registers a key and category;
pressed, released and tick events operate on the resulting key.

`RecipeViewerEvents` has add/remove entries, complete removal, grouping,
information, subtype registration, category removal and recipe removal. JEI,
REI and EMI wrappers are present in the jar. CWI now uses entry hiding through
these events; custom machine/hammer/upgrade categories are provided by Core. `KubeJSGUI` and the chest-menu classes can create
server-synchronised inventories with rows, slots, click handlers, buttons,
player slots, close handling and captured inventory state. Tooltip text actions
support add/insert/remove/clear/dynamic changes and shift/ctrl/alt/advanced,
creative and stage requirements.

The core jar also contains a local HTTP/WebSocket server (`KJSHTTPServer`,
`KJSWSSession`, `LocalWebServer`) and a client image/render helper. These are
used by KubeJS tooling and web/editor integrations; they are not enabled by a
current CWI script and should not be treated as a gameplay dependency.

## KubeJS Create Jar

### Metadata and plugin registration

The addon declares mod id `kubejs_create`, MIT licensing, JavaFML loader `[2,)`,
KubeJS `>=2101.7.2-build.285`, and Create `>=6.0.7`, all loaded after their
dependencies. Its mixin configuration targets Create processing output and
fluid ingredient stack generation.

`KubeJSCreatePlugin` performs these registrations:

- `create:sequenced_assembly` and `create:sandpaper` item builder types
- `CreateItem` and `CreateProcessingOutput` script bindings
- a processing-output type wrapper for JavaScript values
- recipe components `create:processing_output`,
  `create:sized_fluid_ingredient`, and `create:heat_condition`
- Create data-component descriptions discovered from Create's public data
  component fields
- the `CreateEvents` event group

The plugin posts the three Create startup handlers during addon initialization:
`boilerHeatHandler`, `specialFluidHandler` (exposed as
`pipeFluidEffect`), and `specialSpoutHandler` (exposed as `spoutHandler`).

### Create events

The Java callback contracts are:

```js
CreateEvents.pipeFluidEffect(event => {
    event.add(fluidIngredient, (level, area, fluidStack) => {
        // return void; mutate or inspect the level/area as needed
    })
})

CreateEvents.spoutHandler(event => {
    event.add('namespace:block', blockPredicate, (block, fluid, simulate) => {
        // return the number of fluid units accepted
        return 0
    })
})

CreateEvents.boilerHeatHandler(event => {
    event.add(block, block => {
        // return heat as a float
        return 0
    })
})
```

The actual Java signatures are:

- `SpecialFluidHandlerEvent.add(FluidIngredient, PipeHandler)` where the
  handler receives `(Level, AABB, FluidStack)` and returns `void`.
- `SpecialSpoutHandlerEvent.add(ResourceLocation, BlockStatePredicate,
  SpoutHandler)` where the handler receives `(LevelBlock, FluidStack,
  boolean simulate)` and returns `long` fluid units accepted.
- `BoilerHeaterHandlerEvent.add(Block, BoilerHeaterCallback)` and
  `addAdvanced(BlockStatePredicate, BoilerHeaterCallback)` where the callback
  receives `LevelBlock` and returns `float` heat. Advanced predicates return
  `-1.0f` when they do not match.

Fluid handlers cache generated matching stacks and invalidate that cache when
tags update. Spout handlers test the block-state predicate before dispatching.
The `simulate` argument is part of the contract and must be honored by a
handler that can change inventories or fluid state.

In this exact KubeJS Create build, bytecode inspection shows that the first
`ResourceLocation` argument to `SpecialSpoutHandlerEvent.add(...)` is accepted
but never read. CWI passes IDs such as `cwi:mud` and `cwi:amethyst`; those IDs
are useful documentation but do not select or isolate a handler at runtime.
The block-state predicate and handler are the effective dispatch contract.
The special-fluid registry invalidates its cached tag lookup after a tags
update, so tag-based fluid ingredients are recalculated on the next lookup.

### Create recipe components and wrappers

`create:processing_output` wraps Create's `ProcessingOutput` and preserves item
chance. The `CreateItem` binding exposes the `KubeCreateOutput` wrapper, whose
`of(ItemStack, double)` overload clamps chance to `[0, 1]`. Its conversion path
also accepts item-like values and JSON/maps with `chance` and an `output` value.
Empty stacks and air become `ProcessingOutput.EMPTY`. The separate
`CreateProcessingOutput` binding is the Java class; it is not the wrapper
providing those `of(...)` helpers.

`create:sized_fluid_ingredient` wraps Create/NeoForge sized fluid ingredients.
`create:heat_condition` is an enum component for Create heat conditions.
`SequencedAssemblyItemBuilder` and `SandpaperItemBuilder` are registered under
the builder IDs listed above.

### Embedded Create schemas

The addon embeds 21 recipe-schema JSON files. The base processing schema defines:

| Key | Role | Shape/default |
| --- | --- | --- |
| `results` | output | list of either fluid stacks or `create:processing_output` |
| `ingredients` | input | list of either `create:sized_fluid_ingredient` or ordinary ingredients; sized ingredients are spread |
| `processing_time` | input | ticks, optional `100` |
| `heat_requirement` | input | `create:heat_condition`, optional `none`, excluded from the basic constructor |

The schema marks `results` as the unique field and provides `heated()` and
`superheated()` functions. `processing_with_time` makes `processing_time`
`always_write`. `processing_unwrapped` inherits processing without changing
keys. `item_application` adds excluded `keep_held_item`, with a
`keepHeldItem()` function.

Recipe types inheriting the processing schemas are:

```text
pressing, emptying, splashing, basin, filling, sandpaper_polishing,
conversion, haunting, milling, cutting, crushing, deploying, compacting,
mixing
```

`milling`, `cutting`, and `crushing` inherit `processing_with_time`.
`deploying` inherits `item_application`. `compacting` and `mixing` inherit
`processing_unwrapped`.

`sequenced_assembly` has `results`, `ingredient`, `sequence`, optional
`transitional_item` (defaulting to `create:incomplete_precision_mechanism`),
and optional non-negative `loops` (default `5`). `mechanical_crafting` inherits
the shaped schema and adds optional, always-written `accept_mirrored`, exposed
through `acceptMirrored()`.

## Coding Practices And Pack Helpers

### Choosing and checking a recipe API

Use vanilla KubeJS builders for vanilla recipes, installed addon builders for
supported mod recipes, and `event.custom(...)` for a serializer whose exact JSON
is clearer than a new abstraction. A schema describes an existing serializer;
it does not implement a machine. Add a helper when it removes repetition while
keeping inputs, outputs, amounts, heat and duration visible.

Use ID/type/mod/input/output filters when they express the intended change.
Before a broad removal or replacement, inspect `event.findRecipeIds(filter)`
and `event.countRecipes(filter)`. Installed recipes can already be retired by
`Recipes/RecipeDelete.js` or progression changes. Give maintained recipes an
explicit lowercase `namespace:path` ID so later edits target the same recipe.

Native builder values, ingredient JSON, stack JSON and custom output wrappers
are separate contracts. For example, the following is an illustrative current
Create builder call; this documentation does not install the recipe:

```js
ServerEvents.recipes(event => {
    event.recipes.create.milling([
        'minecraft:flint',
        CreateItem.of(Item.of('minecraft:flint'), 0.25)
    ], 'minecraft:gravel').processingTime(100).id('cwi:example/gravel_milling')
})
```

`CreateItem` is the installed `KubeCreateOutput` binding. Its `of(ItemStack,
double)` overload constructs a `ProcessingOutput` and clamps chance to `[0, 1]`.
`CreateProcessingOutput` is the Java class binding, not the wrapper with that
`of` overload. Do not port old `Item.of(...).withChance(...)` calls verbatim.
For raw Create processing JSON an item output instead uses a serialized stack
such as `{ id: 'minecraft:flint', count: 1, chance: 0.25 }`; the native Java
wrapper itself does not belong inside custom JSON. A different serializer may
require another shape, including nested output objects.

Keep `Item.of(...)` when it carries components, count, Java object behavior or
another receiving API requirement. Use an ID string or native `'3x id'` syntax
only when that API performs equivalent coercion. The old NBT wrappers
`OutputItem`, `.weakNBT()` and `.strongNBT()` are not a portable 2101 recipe
contract. Check the current ingredient/component codec for the matching rule
needed by a recipe. In this build `.modifyResult(name)` takes a string; register
the named callback with `ServerEvents.modifyRecipeResult(name, callback)` at
script load, as `Recipes/ToolArmorUpgrade.js` does. Preserve the source item's
component map when an upgrade should retain its state.

Create filling and deploying receive an input array, rather than separate
base/applied positional inputs. Sequence steps are nested recipe objects,
not IDs. Preserve the transitional item, step order, loops and output chances;
the installed assembly default is five loops. Native setters such as
`.processingTime(...)` and `.heatRequirement(...)` write current snake-case
JSON fields; the fluent spelling is not evidence for the raw JSON key.

### `AddItem`, `AddFluid` and serialization boundaries

The following are CWI helpers from
`kubejs/server_scripts/Recipes/BasicRecipe.js`, not built-in APIs:

| Helper | Current behavior and boundary |
| --- | --- |
| `AddItem(input, chance)` | A string ID becomes `{ item: id }`; `'3 namespace:item'` adds `count: 3`; `#` makes a tag object; an explicit chance is added for string input. Non-string input is returned unchanged, so a separate chance argument is ignored for an existing object. Counts at or below one are omitted. |
| `AddFluid(input)` | Produces a `FluidStack` for a concrete fluid, or a `SizedFluidIngredient` for `#tag`/`fluidTag:`. `'500 namespace:fluid'` supplies an amount; omitted or falsy amounts default to 1000. `fluid:` is accepted. Non-string values pass through unchanged. There is no current chance parameter. |
| `createRecipeInput` | Converts `AddItem` item/tag objects to native item/ingredient values for builders. |
| `createRecipeIngredients` | Expands counted item ingredients into separate JSON entries and flattens sized fluid ingredients. Supplies `neoforge:single` or `neoforge:tag` when the Create fluid codec requires a `type`. |
| `createRecipeOutput` / `createRecipeOutputs` | Converts helper item outputs from `item` to serialized `id`, preserving explicit count and chance; passes other values through. This does not choose every mod's outer result shape. |

Both string helpers parse numeric prefixes with `parseInt`; they do not strictly
validate quantities or prove that IDs exist. Their `'3 namespace:item'` syntax
is separate from native stack syntax `'3x namespace:item'`. A helper's
pass-through behavior is not validation of arbitrary Java objects or JSON.

The old 1.20.1 `AddFluid(input, chance)` emitted `{ fluid, amount }` or
`{ fluidTag, amount }` JSON. The current helper returns typed fluid values;
do not copy that historical return-shape description or chance argument into
new code. Use `Fluid.of(id, amount)` for a concrete fluid stack and
`Fluid.sizedIngredientOf('#namespace:tag', amount)` for a tagged input. A tag
selects acceptable inputs; choose a concrete fluid for outputs.

Inspect each wrapper's serializer before reusing its normalization. Current
casting helpers wrap outputs as `result: { item: serializedStack }`, ordinary
Create-style processing uses a `results` array, and TFMG vats use their own
vat/heat fields. This is why a blanket transformation of every `item`, `result`,
`fluid` or heat key is unsafe.

### Data-driven generators and loading order

`Utils/Functions.js` provides `getMaterial(id, type)` and `getStone(id, type)`.
They check direct entry fields before nested `items`; fluid material lookup
uses the direct field only. Missing maps, entries or fields return `null`.
Check downstream behavior before adding an incomplete entry.
`expandCountedIngredients` expands only a truthy count with a falsy chance;
zero chance is treated as absent. Its copies are shallow and omit `count`.
It is not a universal normalizer for all recipe families.

Keep the exact keys and order of `global.materialTypes`, `global.stoneTypes`,
`global.compoundOreTypes`, `global.productionMaps`, `global.outPutMaterial`,
`global.oreTypes`, `global.oreProcessing`, `global.apples` and related maps.
Trace registration, recipe, tag, loot, model/texture and language consumers
before changing one. The existing `Recipes/ProcessingLine.js/` path is a
runtime directory name; do not rename it as a formatting cleanup.

The installed `ScriptFile.compareTo` loads higher numeric priorities first,
then compares location paths case-insensitively for equal priorities. This is
within each manager, not a shared startup/server/client ordering. Current
startup imports use priority 10000, shared definitions 1000, item registration
10, and creative tabs -1. Server functions use 1000, removals 10, and
`BasicRecipe.js` 5. Keep an existing `// priority: ...` on the first line.
Changing registration order can affect IDs, conflicts and generated data.

### Rhino, Java objects and callbacks

KubeJS executes scripts with the installed Rhino, rather than a Node or browser
runtime. Java classes and collections retain their contracts across the bridge.
Verify a class with `Java.loadClass`, inspect signatures with `javap -public`,
and inspect annotations/bytecode when remapping, overload choice or defaults
matter. Quote Java nested-class names containing `$` in shell commands.
Do not concatenate a Java Set as though it were a JavaScript array; convert it
explicitly when array operations are needed. Keep lexical import names unique
within the script manager and client imports on the client side.

`JSON.parse(JSON.stringify(value))` is only a suitable copy for plain JSON data;
it can lose Java type, component, callback and recipe-object behavior. Preserve
existing game scheduling such as `server.scheduleInTicks`, including entity
validity checks after the delay. Preserve `simulate` in spout handlers: inspect
and return accepted quantity while simulating, and mutate the world only for
the real operation.

The installed Rhino 2101.2.7-build.85 reproduced `redeclaration of var`
for a `const` inside the budding catalyst's repeated loop and for the nested
ore-loot builder callback. Those sites use `let` without changing values or
control flow. Execute loops and callbacks repeatedly in the real engine:
Node checks and Rhino parsing alone did not expose these failures. This is a
verified local workaround, not a requirement to replace every `const`.
The old guide's `Text.join` overload ambiguity remains historical; verify
current overloads before adopting its workaround.

### Historical integration contracts worth retaining

The following findings came from the old 1.20.1 audit. MBD2, FluidJS and
KubeJS Additions are absent here. Selected tooltip/viewer scripts are now
ported using current APIs; the old custom-category bridge remains absent. These
contracts are retained for a future deliberate port; they are not current
runnable examples or proof of compatibility with installed PonderJS 2.4.0.

- Old MBD2 recipes used their machine `.rt`/`.mb` definitions and typed builder
  slots, duration, heat, RPM and per-tick data. Preserve the existing
  `sterilzing` spelling where that old recipe ID is referenced. A similarly
  named Create recipe cannot supply the same machine behavior.
- Old MBD callbacks exposed the underlying event with `event.getEvent()`.
  Furnace heat, temperature, parallel capacity and speed lived in
  `machine.customData`; replacing that per-machine persistent state with
  shared script globals would mix machines and alter persistence.
- The old MBD `FluidIngredientJS.of(Object)` accepted an actual MBD ingredient,
  but its string fallback treated values as fluid stacks. The working tagged
  input construction was the MBD class
  `com.lowdragmc.mbd2.api.recipe.ingredient.FluidIngredient` calling
  `fromJson(JsonIO.of({ amount: 500, value: { tag: 'cwi:water' } }))`, then
  `builder.inputFluids(ingredient)`. A string such as `'#cwi:water 500'` was
  unsupported there. That nested `value.tag` shape is specific to old MBD;
  current Create inputs use sized fluid ingredients instead.
- Old PonderJS 2.1.0/Ponder 1.0.92 remapped scene helpers `world`, `overlay`,
  `effects`, `special`, `debug` and utilities `select`, `grid`, `vector` to
  properties. The working form was
  `scene.world.showSection(util.select.layersFrom(1), direction.DOWN)`, rather
  than calls to `scene.world()` or `util.select()`. Inspect remap annotations
  and the real bridge; a mock that makes every helper callable hides the error.
- Applying old Ponder changes required `/kubejs reload client_scripts` followed
  by `/ponder reload`: the former refreshed callbacks, the latter rebuilt the
  scene registry. The old injection into `reloadClientScripts` was empty.
  These are historical commands; current KubeJS uses `client-scripts`, and a
  future port must verify the installed Ponder reload path and fresh log entries.
- An old explicit scene ID such as `cwi:glass_working_stock` retained its
  namespace, with header key `cwi.ponder.glass_working_stock.header`. Text keys
  followed `text_1`, `text_2` and later values in text-call order. Recheck both
  locales when calls are added, removed or reordered.
- Old `world.modifyBlock` callbacks received a KubeJS `BlockIDPredicate`, not
  a native `BlockState`. `state.with('powered', String(powered))` or
  `state.with('power', '15')` preserved other copied properties; that old
  descriptor had no `setValue`. Execute deferred callbacks during playback,
  seeking and repeated playback; scene registration cannot exercise them all.
- Old basin inventories used Forge item-handler compounds `InputItems` and
  `OutputItems`, not ordinary `Items` lists. Verify current block-entity
  serialization before a port. Scripted inventory/redstone snapshots explain
  a loop but do not prove sustained production; allow animation time to finish.
- Old custom JEI categories transformed shared recipe data for display. Keep
  chance, amounts and hidden ingredients synchronized with server recipes.
  The old base information event accepted an item ingredient/ID array for
  `addItem`, but only one `FluidStackJS` for `addFluid`; separate fluid entries
  were registered in a loop. That old overload observation is not evidence for
  current `RecipeViewerEvents`.

### Preserved material and availability decisions

The old author-approved audit retained native `tfmg:air`,
`tfmg:liquid_asphalt` and `tfmg:liquid_concrete` identities. Its rationale was
hardcoded air-intake output and concrete-hose behavior, plus native construction
routes. Retain the architectural lesson: inspect hardcoded sources as well as
recipes before replacing a fluid; do not invent dual-fluid tags or conversion
routes. Recheck the current mod implementation before claiming the old machine
contract still applies.

That audit also required native cinder block crafting and fire extinguisher
availability, distinct `kubejs:harden_wood`/`tfmg:hardened_planks` products, direct
`kubejs:sulfur_powder` output, and no revival of the retired TFMG firebox as a
fuel sink. Recipe changes should target only the replaced ingredient. These
are retained design decisions, not permission to restore removed progression.

The old extinguisher refill consumed 1000 mB KubeJS carbon dioxide and required
`{fill_level:500}` NBT. That NBT spelling is historical. The current
`Recipes/IndustrialSupplies.js` consumes the same fluid amount and writes the
1.21.1 output component `{ 'tfmg:amount': 500 }`; the installed TFMG native
filling resource confirms that component shape. It also replaces only the
crafting recipe's carbon dioxide bucket. Preserve the fill state when porting,
using the installed data component rather than copying old NBT. Current hardened
plank filling separately retains its 250 mB `kubejs:creosote` input.

## Development And Debugging Workflow

### ProbeJS and local evidence

The installed ProbeJS 8.0.3 registers the client command `/probejs`, gated by
permission level 2, which opens its dump screen. Use that screen to generate
current definitions after mod changes or schema changes, then reload the
editor. The older `/probe dump` and `/probejs dump` instructions belong to
other versions. The current tree has `kubejs/config/probe-settings.json` but no
checked-in generated declaration tree; do not present old `probe/generated` or
`local/kubejs/event_groups` snapshots as current typings.

Read generated definitions directly when available; no editor connection is
needed to search them. Confirm unfamiliar methods against the installed jars
and inspect `/kubejs recipe-schema-json <recipe-type>` or schema resources.
Completion proves an exposed type, not a valid fluid quantity or successful
machine operation. Record separately: parse checks, mock/registration capture,
serializer acceptance, and actual gameplay behavior.

### Safe recipe changes

1. Identify the exact installed mod and serializer, then inspect a known recipe
   resource or exported JSON. Check singular/plural fields, nesting, components,
   counts/chances, fluid amounts, units, heat, timing and defaults.
2. Check current removals, native machine code and intended progression. A
   hardcoded machine source may ignore recipe replacement. Similar product
   names do not prove equivalent uses, properties or progression roles.
3. Use the retained material/fluid identity directly. Do not add conversion
   recipes or shared tags just to keep a retired version useful, or restore a
   retired machine solely to consume a byproduct. Keep an unfinished consumer
   explicit. The old TFMG air/construction-fluid decisions illustrate this
   method; recheck current source before reusing any old value or NBT shape.
4. Choose the existing builder/helper or exact custom JSON and an explicit ID.
   Preserve output order, counts, chances, component state, heat and timing.
5. Run syntax checks, inspect the diff and reload the correct lifecycle.
   Startup registries need a restart; server recipes and schemas use `/reload`.
6. Inspect fresh `logs/kubejs/` errors and compare serialized JSON with the
   fixture. Test the recipe in the machine and check the recipe viewer.

Item, block and fluid tags are separate registries even when the tag ID matches.
Do not automatically rewrite every `forge:` tag to `c:`: inspect the installed
tag resources and current consumers, including pack-owned `cwi:` tags.

The current pack removes legacy `forge:` item, block and fluid tags in
`server_scripts/Tags/LegacyTags.js`, including nested references and tags
automatically assigned by Core or other mods. Knife readers use `c:tools/knife`;
steel armor blocks use `c:relocation_not_supported`. Dead legacy material and
fuel operations were deleted rather than enabling unrelated common-tag
behavior. The installed KubeJS stages tag edits in `PreTagKubeEvent`: direct
map edits must be deferred through a typed `java.util.function.Consumer` in
`event.actions`, then applied to the actual `TagKubeEvent`. `removeAll()` only
empties a tag; deleting its key requires `event.tags.keySet().removeIf(...)`.
See [Tag Reference](TAG_REFERENCE.md) for the current inventory and native
reader limitations. Do not edit Core or installed JARs for tag cleanup.

For loot claims, trace the real table and active modifiers; for worldgen, trace
structure/feature/placement references and test fresh chunks. Placement attempts
are not guaranteed deposits per chunk. Existing terrain does not regenerate
when a datapack reloads. Preserve unrelated loot rolls and data.

### Diagnosing a failure

| Symptom | Check first |
| --- | --- |
| Recipe absent | Correct server directory and serializer, lowercase unique ID, fresh server errors, later removal/replacement filters; inspect `event.printTypes()` / `event.printExamples(type)`. |
| Schema completion absent | Current `ServerEvents.recipeSchemaRegistry` or JSON schema path, exact component IDs and roles, existing plugin ownership, a fresh ProbeJS dump and editor reload. `Schema`/`simpleKey` are external helper names. |
| Machine rejects recipe | Final serialized JSON, output nesting, item versus fluid ingredient, required `type`, amount/count, component codec, heat/timing units, sequence transitional item and step order. |
| Callback fails after load | Actual payload class and return contract, Java overload/coercion, deferred entity validity, repeated execution and reload state. Registration success cannot execute every callback. |
| Viewer differs from server | Compare active server JSON with Core category/catalyst/display transformations. Budding and compound-mineral custom pages still lack a current category provider. |

FluidJS, KubeJS Additions, MBD2 and the old hammer server subsystem are absent
from the active target. Their old `FluidEvents`, `JEIAddedEvents` and
`JadeEvents` examples are historical. The current `event.recipes.cwi.*`
factories instead come from native CWI Core; see the production integration
section above. Existing Ponder assets do not mean scenes are registered.
Future client work must recheck the installed PonderJS remaps, deferred block
callbacks and localization keys; the old Forge inventory/NBT contracts and
reload instructions are not verified for the current client. No new schematic
is needed for documentation or recipe work.

## Historical CWI 1.20.1 Source Audit

This section records the historical audit of the older CWI 1.20.1 instance.
Paths in this section are relative to that old instance. It is source and
data inventory, not a description of the active 1.21.1 tree. The old tree contains 2,383
files: 111 JavaScript files and 21,561 JavaScript lines, plus 1,819 assets and
338 datapack files.

| Directory | JS files | Lines | Role in the old pack |
| --- | ---: | ---: | --- |
| `startup_scripts/` | 34 | 5,088 | registries, builders, fluids, materials and startup callbacks |
| `server_scripts/` | 63 | 15,023 | recipes, tags, loot, progression, machines and gameplay events |
| `client_scripts/` | 14 | 1,450 | JEI categories/info/hiding, Ponder scenes, tooltips and client imports |

The old `kubejs/README.txt` confirms the loading contract: startup scripts run
at game startup, server scripts run on `/reload`, client scripts run on `F3+T`,
`assets/` is a resource pack, `data/` is a datapack, and `config/` is the
script-accessible configuration directory.

The old runtime baseline was Minecraft 1.20.1 Forge with KubeJS
`2001.6.5-build.26`, Rhino `2001.2.3-build.10`, KubeJS Create
`2001.3.0-build.8`, Create 6.0.8, Lychee 5.2.1, LootJS 2.13.1, PonderJS 2.1.0
and MBD2 1.0.39. Those Forge-era and MBD2/JEI/Ponder signatures must not be
copied directly into the NeoForge 1.21.1 scripts.

### Old startup files

The old startup tree is the same shared registry base found in the current
guide, with two additional active files:

| File | Lines | Old-only behavior |
| --- | ---: | --- |
| `startup_scripts/Blocks/SuspiciousBlock.js` | 41 | Registers brushable `suspicious_depleted_dirt` and `suspicious_ash_dirt` blocks and their block items. |
| `startup_scripts/Enchantment.js` | 34 | Registers `health_stealing`, `antigravity`, `fluorescence` and `flying_weapon` enchantments, levels 1-5, with post-attack behavior. |

The other 32 startup paths are the paths documented in the current CWI map.
The old versions have small line-count differences: `Ores.js` 128,
`ToolsArmors.js` 139, `Stones.js` 111, `SpecialShape.js` 186,
`Fluids/fluid.js` 401, `Items/Microbes.js` 478 and `Items/hammers.js` 67.
The old portal script uses Forge `ForgeEvents.onEvent`; the current script was
ported to NeoForge `NativeEvents.onEvent`.

### Old server file map and behavior

The following map covers every old server script. Empty files are retained in
the inventory because they are part of the historical source tree.

| Area | Files and line counts |
| --- | --- |
| Hammer | `Hammer/HammerInteraction.js` (113), `Hammer/HammerRecipe.js` (102), `Hammer/HammerTick.js` (77) |
| Interactions | `Interactions/BlockEvents.js` (21), `DeploySerums.js` (45, disabled block comment), `ItemFalling.js` (353), `Lock.js` (157), `PipeTweak.js` (56), `PlayerEvents.js` (75), `Spawner.js` (138), `ToolsEffect.js` (26) |
| Loots | `Loots/Archaeology.js` (138), `Loots/Chest.js` (2,090), `Loots/Loots.js` (486) |
| MBD2 | `Multiblocked2/BlastFurnace.js` (401), `Incubator.js` (15), `LavaExtractor.js` (73), `MixingVessel.js` (189), `StirlingEngine.js` (86) |
| Progression | `Progression/ElectricAge.js` (18), `IndustrialAge.js` (658), `MechanicalAge.js` (941), `PrecisionAge.js` (890) |
| Recipes | `Recipes/BasicRecipe.js` (428), `Chemistry.js` (1,026), `Composting.js` (14), `CompoundMixing.js` (42), `Experience.js` (7), `FanCatalyst.js` (27), `Foods.js` (43), `Geology.js` (234), `GlassFix.js` (41), `IndustrialSupplies.js` (59), `Lychee.js` (602), `Metallurgy.js` (82), `MicrobesCulture.js` (47), `MicrobesRecipe.js` (1,217), `Misc.js` (76), `OreCrushing.js` (203), `RecipeDelete.js` (836), `Recycle.js` (28), `SpecialShape.js` (22), `Stones.js` (75), `ToolArmorRecipe.js` (270), `ToolArmorUpgrade.js` (319) |
| Recipe mods | `Recipes/Mods/AppliedEnergestic.js` (0), `ConstructionWand.js` (60), `Create.js` (336), `Delight.js` (28), `Storage.js` (510) |
| Processing lines | `Recipes/ProcessingLine.js/Glass.js` (76), `Ore.js` (199), `Paper.js` (50) |
| Bootstrap | `Starter.js` (79) |
| Tags | `Tags/BatchTags.js` (66), `CustomTags.js` (33), `tags.js` (564) |
| Utilities | `Utils/Constants.js` (0), `DevelopTools.js` (95), `DisplayName.js` (0), `Functions.js` (72), `GlobalTickCounter.js` (4), `WorldSeed.js` (5) |

The old server surface is functional, not just recipe data:

- `BasicRecipe.js` defines `AddItem`/`AddFluid` normalization and helper
  wrappers for Create, Create Addition, Vintage Improvements, Ratatouille and
  Create Metallurgy operations. Most recipe files use these wrappers.
- `Chemistry.js` defines distillation, advanced distillation, coking and vat
  helpers, then registers Create mixing and four chemical schema families.
- `MicrobesRecipe.js` and `MicrobesCulture.js` generate fermenting/culturing
  recipes from the global microbe definitions, including CDG basin/bulk
  processing and incubator inputs.
- `Geology.js`, `OreCrushing.js`, `ProcessingLine.js/*`, `Metallurgy.js`,
  `Stones.js`, `GlassFix.js` and `IndustrialSupplies.js` form the geology,
  ore, glass, paper, stone and industrial processing chains.
- `ToolArmorRecipe.js` and `ToolArmorUpgrade.js` build tools/armor and manual-labeled
  upgrade metadata. The latter writes `global.upgradeRecipes`, which the old
  JEI upgrade category reads.
- `RecipeDelete.js` removes conflicting recipes by ID, type, input, output and
  category. `Recycle.js`, `Foods.js`, `FanCatalyst.js`, `CompoundMixing.js`,
  `Experience.js`, `Composting.js`, `Misc.js` and `SpecialShape.js` fill in
  smaller balance and machine recipes.
- The four progression files group the pack's manual-labeled progression:
  Mechanical Age, Precision Age, Industrial Age and Electric Age. They add shaped,
  shapeless, smelting/blasting, Create processing and sequenced assemblies for
  CWI, Create, TFMG and Create Connected machines.

### Old load order and shared globals

The old server log shows `Utils/Functions.js` at priority 1000, then
`RecipeDelete.js` at priority 10 and `BasicRecipe.js` at priority 5. The
remaining interactions, hammer, utility, tag, recipe, progression, loot and
MBD2 files then run in filename order within their event phase. This ordering
matters: `BasicRecipe.js` supplies `AddItem`, `AddFluid` and machine helpers to
later recipe files, while `Functions.js` supplies `getMaterial`, `getStone` and
ingredient expansion.

Beyond the shared startup globals, the old tree creates `blockConversions`,
`depotConversions`, `upgradeRecipes`, `blastFurnaceRecipes`,
`mixingVesselRecipes`, `releaseHammer`, `seed`, `seed_int`, `debugUserName`,
`frameMaterials`, `stoneTextures` and `shouldModify`. `jeiRuntime` is created
on the client. These names explain why moving a single old file without its
producer causes a later script to load but fail when its event fires.

### Old tags, loot and gameplay events

`Tags/tags.js` is the old normalization layer. It replaces recipe inputs for
Create/Createdeco/Forge ingot, plate, nugget, dust, storage, string, leather and
feather tags; removes conflicting tags; and rebuilds CWI item, block and fluid
tags for materials, stones, tools, armor, gases, acids, bases, solvents,
rubbers, fuels and containers. `BatchTags.js` repairs mineable/needs-tool and
stone/ore tags from hardness. `CustomTags.js` adds no-gravity item behavior and
makes tagged item entities float with scheduled motion.

`Loots/Loots.js` rewrites entity and block drops for squid, glow squid,
silverfish, spiders, bats, stones, ash, scrap, pipes, ores and redstone.
`Loots/Chest.js` adds the themed CWI chest tables (food, materials, mining,
structures, underwater, ruins and progression tiers) with weighted pools, rolls,
alternatives and count/chance limits. `Loots/Archaeology.js` adds weighted CWI,
Darker Depths and Ad Astra archaeology tables. All three use `LootJS.modifiers`.

The interaction scripts implement old gameplay rules: hammer charging and
conversion, falling-item effects, chest/barrel lockpicking, Create pipe-side
toggling, hot-item/neurotoxin damage, spawner conversion with a totem, wrench
shock behavior and ash-brick particles. `Starter.js` sets first-load gamerules,
time, starter-bunker placement, first-player teleport/effects and respawn
effects. `WorldSeed.js` stores `global.seed` and `global.seed_int`; the global
tick counter supports ten-tick loops. `DevelopTools.js` is a username-gated
debug tool for chat, item and block inspection and should be treated as
development-only.

### Old MBD2 machine scripts

The old `Multiblocked2` folder depends on MBD2 classes that are not present in
the current 1.21.1 source surface. `BlastFurnace.js` handles structure formation,
counts reinforcement/hatches, computes parallel/armor/temperature/heat and
registers quartz, pig-iron and steel recipes. `MixingVessel.js` scales recipe
duration by RPM and stores `global.mixingVesselRecipes`. `Incubator.js` maps
microbe definitions to incubating recipes. `LavaExtractor.js` calculates lava
output from pump count and RPM. `StirlingEngine.js` adjusts machine speed from
Create passive boiler heaters and emits particles/sounds.

### Old client file map and behavior

The old client tree has 14 files: `LoadClass.js` (23), `tooltips.js` (19),
`Ponder/GlassWorkshop.js` (86), `Ponder/Logistics.js` (174), and these JEI
files: `AnvilHide.js` (11), `BuddingCatalyst.js` (164),
`CompoundMinerals.js` (266), `Hammer.js` (91), `Incubator.js` (129),
`JEIHide.js` (103), `MixingVessel.js` (171), `MysteriousConversion.js` (16),
`ProductionPlanning.js` (93) and `Upgrade.js` (104).

`LoadClass.js` imports Create and JEI rendering classes. The JEI scripts hide
items, fluids, categories and anvil recipes; add information pages for
mysterious conversion, production planning and upgrades; and register custom
categories, recipes and catalysts for compound minerals, hammers, budding
catalysts, incubators, mixing vessels and equipment upgrades. `tooltips.js`
adds material formulas and hot/no-gravity item hints.

The two Ponder scripts define `cwi:glass_batching` plus logistics scenes for
filtering, sharing, reserve priority and stockpile hysteresis. The old assets
include five matching Ponder NBT structures.

### Old data and configuration

The old `data/` directory contains 338 files, including 19 themed chest loot
tables, three archaeology tables, CWI worldgen biomes, configured/placed ore
and stone features, structures and structure sets, template pools, density
functions, starter-bunker structures, `cwi/planets/nether.json`, Create RNS
data, Ad Astra tags and Minecraft dimension/noise data. This is separate from
the JavaScript recipe/event layer and was not migrated wholesale. The current tree retains the 14 stone data
files listed in the migration matrix below.

The old `config/common.properties` enables JSON recipe matching, async streams,
reload announcements and the startup error GUI. `client.properties` controls
client presentation. `probejs.json` enables literal ID/registry resolution and
the ProbeJS websocket on port 7796. These settings explain old development
behavior but are not themselves gameplay scripts.

### Old runtime evidence

The old 25 October 2026 log loaded all 34 startup, 63 server and 14 client
scripts. The server recipe pass reported 9,491 discovered recipes and a final
KubeJS summary of 3,484 added, 3,723 removed, 740 modified and one failed
recipe. The failed recipe was `fluid:deploying/honeycomb_mold`, whose output
used an invalid item shape. Other recorded failures or warnings included a
malformed TFMG sulfuric-acid bucket tag, a missing `forge:tools/wrench`
reference, unsupported duration/heat or item-count shapes in some Create/TFMG
recipes, three Biomancy decomposing recipes with empty ingredients, and a
Ponder logistics scene `getWorld()` null error. These are historical 1.20.1
runtime findings; they do not establish the behavior of the 1.21.1 tree.

## CWI 1.20.1 -> 1.21.1 Migration Matrix

| Old 1.20.1 surface | 1.21.1 status | Consequence |
| --- | --- | --- |
| 34 startup scripts | 32 startup scripts | `SuspiciousBlock.js` and `Enchantment.js` are absent. Stones use the existing `global.stoneTypes` registration loop; no separate Darker Depths registry is needed. |
| Old `ItemEvents.armorTierRegistry` call | No current call | Armor materials/tool tiers were simplified during the startup port; verify armor behavior separately. |
| 63 server scripts | 61 current scripts | The initial 56-script port now includes native machine recipes, hammer conversions and a conditional lead hook. Old `Hammer/*` and `Multiblocked2/*` runtime files are replaced, not copied alongside Core. |
| 14 client scripts | Selected client scripts ported | Formulas, warnings and viewer hiding use current APIs. Native Core supplies machine/hammer/upgrade JEI; budding/compound-mineral custom pages and Ponder scripts remain absent. |
| `global.releaseHammer` from `HammerInteraction.js` | Replaced by native Core charged hammers | Preserve material data in startup; do not restore the old release implementation. The pipe retains its distinct entity-only release. |
| `global.blockConversions`, `depotConversions`, `upgradeRecipes` | Replaced by native recipe registrations | 96 conversions and 697 upgrades are registered through native Core schemas/JEI without server writes to startup globals. |
| `blastFurnaceRecipes`, `mixingVesselRecipes` and MBD2 callbacks | Production recipes use native Core | 50 furnace/mixer/incubator recipes retain original balance; MBD2 runtime remains excluded. |
| `ServerEvents.tags`, `LootJS.modifiers`, progression and recipe callbacks | Active in the ported server tree | Optional mod IDs and selected LootJS calls were adapted. Native loading still rejects the legacy chest-pool API; see the validation limits above. Ponder and the two remaining custom JEI pages need separate providers. |
| 338 old datapack files | Old datapack not ported wholesale; 14 stone data files retained | One raw-stone recipe, six block loot tables and seven stone tags remain. Old CWI worldgen, structures, archaeology tables and dimension data remain outside this port. |

The `manual_only` suffix in old recipe IDs is an ID convention, not a
GameStages enforcement system. The port preserves the old recipe, tag, loot,
progression and interaction intent where the installed 1.21.1 APIs and mods
provide an equivalent. Optional references are guarded for absent Biomancy,
Nature's Compass, Ad Astra, Clanging Howl, Construction Wand, Create RNS and
Geode Plus. Only Darker Depths stones are registered by the pack under `kubejs`;
nonstone registrations and their recipes, loot and interactions are excluded.
The old source audit remains the reference for original behavior; the native
production integration above supersedes the old hammer/machine exclusions.

## Current CWI 1.21.1 Script Surface

### File inventory

The earlier pre-native inventory contained 1,871 files under `kubejs`.
Its 88 JavaScript files comprised 32 startup and 56 server scripts, with no
client scripts. The current native integration adds three machine scripts,
hammer conversions, a lead effect hook and two client scripts; see the
production integration table above. The current script count is 95: 32 startup,
61 server and 2 client scripts.

- 1,757 files under `assets/`, including editor metadata
- 14 files under `data/`: one recipe, six block loot tables and seven tags
- configuration files, README, and editor metadata

The 32 startup scripts are grouped as follows:

| Location | JavaScript files |
| --- | ---: |
| `startup_scripts/Blocks/` | 8 |
| `startup_scripts/Items/` | 10 |
| `startup_scripts/RecipeRegister/` | 6 |
| `startup_scripts/Events/` | 2 |
| `startup_scripts/Preload/` | 2 |
| `startup_scripts/Fluids/` | 1 |
| `startup_scripts/` top level | 3 |

Before native integration, the startup source was 5,020 lines and the ported
server source was 13,745 lines. These line counts identify that older baseline,
not the current source sizes. The primary startup files are:

```text
startup_scripts/Preload/ImportStartup.js
startup_scripts/Preload/Global.js
startup_scripts/Items/ItemRegistry.js
startup_scripts/Items/MaterialsRegistry.js
startup_scripts/Items/ToolsArmors.js
startup_scripts/Blocks/BlockRegistry.js
startup_scripts/Fluids/fluid.js
startup_scripts/RecipeRegister/*.js
startup_scripts/CreativeTab.js
startup_scripts/Ores.js
startup_scripts/Effects.js
```

### Current active API patterns

The current pack actively uses:

- `StartupEvents.registry('item' | 'block' | 'fluid' | 'mob_effect' |
  'armor_material' | 'creative_mode_tab', ...)`
- `StartupEvents.modifyCreativeTab(...)`
- `BlockEvents.modification(...)`
- `ItemEvents.modification(...)`
- `ItemEvents.toolTierRegistry(...)`
- `CreateEvents.spoutHandler(...)`
- `LycheeEvents.customCondition(...)`
- `NativeEvents.onEvent(...)` for a NeoForge portal-spawn event
- `Java.loadClass(...)` from preload and specialized startup scripts
- `ServerEvents.generateData('after_mods', ...)` in
  `server_scripts/Items/ItemFuel.js`
- LootJS 3.7 `LootJS.modifiers(...)` with `addTableModifier`,
  `addBlockModifier`, `randomChanceWithEnchantment` and weighted
  `LootEntry.of(...).withWeight(...)`
- guarded optional-mod checks through `Platform.isLoaded(...)` and item
  existence checks before registering optional recipes, tags or interactions

`StartupEvents.postInit(...)` appears only inside the commented historical
fluid-interaction file; it is not an active current-pack pattern.

The registry callbacks use KubeJS builders such as `event.create(...)`,
`createCustom(...)`, textures, tags, max damage, food, and unstackable settings.
The preload files define shared Java imports and pack data including
`global.stoneTypes`, `global.compoundOreTypes`, `global.oreProcessing`,
`global.productionMaps`, `global.outPutMaterial`, `global.materialTypes`,
`global.oreTypes`, and other material/recipe maps. Preserve their keys and
declaration order when changing consumers.

### File-by-file startup map

The following is the current 1.21.1 source map. Line counts are the files on
disk at audit time and include comments and blank lines. "Commented-only"
means the file is parsed but its registration code is inside a block comment.

| File | Lines | Status and behavior |
| --- | ---: | --- |
| `Preload/Global.js` | 971 | Active, priority 1000. Defines `stoneTypes`, `compoundOreTypes`, `oreProcessing`, `productionMaps`, `outPutMaterial`, `materialTypes`, `oreTypes`, `variantSettings`, `colors`, `allTiers`, `apples` and `pipePileDefinitions`. It is data-only and must run before consumers. |
| `Preload/ImportStartup.js` | 10 | Active, priority 10000. Imports Rhino `Context`, `RecipeSchema`, `KubeJS`, `PotionBuilder`, AE2 storage/upgrades classes and NeoForge brewing registry into globals. |
| `Items/ItemRegistry.js` | 309 | Active, priority 10. Four item registry callbacks create basic materials, peat/coal and mold/disk items, industry/TFMG parts, machine parts and Create sequenced-assembly incomplete/damaged parts. |
| `Items/MaterialsRegistry.js` | 97 | Active. Loops `global.materialTypes` to create ingots, nuggets, sheets, rods, wires and springs, then heated and plain powder families with `cwi:<material>_ingots` and powder tags. |
| `Items/ToolsArmors.js` | 157 | Active, priority 2. Registers bronze/steel/stainless armor, nine tool families, mutable tool tiers, custom shields, hammers, whetstones and sequenced whetstone bases. |
| `Items/ItemModification.js` | 231 | Active, priority -10. Modifies food nutrition/effects, burn time, stack size, max damage, attack speed, armor durability, potion stack size and components through `DataComponents`. |
| `Items/Microbes.js` | 485 | Active. Defines seven microbe species with four traits each and registers dry/powder microbes, petri dishes, species, inoculated/processing dishes and agar plates. The radiotroph item is commented out. |
| `Items/foods.js` | 105 | Active. Registers six dry seed foods, spider/meat foods and normal/charged/enchanted apples from `global.apples`, filtering optional effects by loaded mods. |
| `Items/hammers.js` | Current native integration | Creates 13 native charged hammers with original models/balance, dummy hammer variants and the entity-only steel pipe. Core owns material release behavior. |
| `Items/Catalysts.js` | 41 | Active. Registers eight base-colored and three two-color catalyst powders with layered models and tint colors. |
| `Items/PlotItems.js` | 45 | Active. Registers roughly 25 plot/manual/log-note items and tags them `cwi:plot_items`. |
| `Items/Drinks.js` | 38 | Commented-only. Contains an older potion drink item/fluid generator for six drinks; no runtime registrations occur. |
| `Blocks/BlockRegistry.js` | 829 | Active, priority 1. Registers pack natural, debris, ore, industrial, machine, glass, casing and incomplete-part blocks. Includes the quartzite-deepslate and mossy-phyllite blocks required by existing processing recipes. |
| `Blocks/BlockModification.js` | 52 | Active. Modifies crafting-table/furnace stats, TFMG rebar requirements, Create New Age wire hardness/resistance/sound/tool rules without importing Darker Depths wood. |
| `Blocks/FanCatalyst.js` | 47 | Active. Helper creates seven Create fan catalyst blocks (smoking, haunting, splashing, blasting, corroding and sterilizing variants) for brass/iron/industrial iron/cast iron/steel/aluminum materials. |
| `Blocks/Logs.js` | 54 | Active. Registers eight ash/burnt log variants, including pillar builders and broken custom models with wood sound, hardness, tool tags and cutout/non-solid settings. |
| `Blocks/RandomTickBlocks.js` | 109 | Active. Registers forming/wet/pressed/dried web blocks and random-tick transitions. Adjacent growth logic imports `Direction`; infected budding amethyst/quartz fallback is gated by `!Platform.isLoaded('cwi')` and optional Geode Plus. |
| `Blocks/Stones.js` | 116 | Active. Uses `global.stoneTypes` to register custom raw/cobbled/gravel blocks, applies hardness, sound, color and tool tiers, then modifies vanilla stones. Raw stone textures use `block/stones/`. Powders are registered separately by `Items/MaterialsRegistry.js`. |
| `Blocks/SpecialShape.js` | 189 | Active. Registers TFMG frame panels/eaves, colored and rebar concrete eaves, special concrete/rebar shapes and three pipe-pile sizes from `global.pipePileDefinitions`; the runtime `panelDefinitions` array is empty. |
| `Blocks/StorageBlocks.js` | 41 | Active. Data-driven storage blocks for plastics, carbon/rubber, raw metals and metal blocks with hardness/resistance/sound/tool tags. |
| `Fluids/fluid.js` | 406 | Active. Helper families generate molten/heavy/chemical/normal/thick/thin/special/gas fluids: approximately 33 molten metals, 7 special, 24 thick, 8 thin, 38 normal, 13 chemical and 34 gas definitions. A modification callback sets light level 12 for molten/liquid silicon. |
| `Ores.js` | 106 | Active, priority 1. Generates compound ore deposits, ore blocks/items, flotation reagents/precipitants, crushed/powder/tailings/residues, crystal/refined outputs, heavy-leach/purified-solution fluids and extra `global.oreTypes` powders. |
| `RecipeRegister/BlockFilling.js` | 45 | Active. Registers four Create spout block transformations for mud, mushroom and obsidian-related conversions, with amounts, random mushroom output, sounds and particles. |
| `RecipeRegister/BuddingCatalyze.js` | Current native integration | Create spout growth for amethyst and optional Geode Plus quartz; preserves fluid amount/chance/multiplier and upgrades adjacent buds through direct writes in the target dimension. Callback-local bindings use `let` to avoid installed Rhino loop redeclarations. |
| `RecipeRegister/Lychee.js` | 41 | Active. Registers Lychee custom conditions `can_see_sky`, `is_noon`, `is_midnight` and `beacon_condition`. |
| `RecipeRegister/FluidInteraction.js` | 46 | Commented-only. Old Forge fluid interaction and acid-to-iron-ore generation; no callbacks run. |
| `RecipeRegister/Radiating.js` | 64 | Commented-only. Old ender-radiator tick/block registration; references an undefined historical meteor variable but is inert. |
| `RecipeRegister/VoidConvert.js` | 21 | Commented-only. Old entity-leave-level void conversion; no Forge callback runs. |
| `Events/PortalCancel.js` | 5 | Active. Loads NeoForge `BlockEvent$PortalSpawnEvent` and cancels every portal spawn through `NativeEvents.onEvent`. |
| `Events/FluidInteraction.js` | 31 | Commented-only. Old Forge fluid-place and Create pipe-collision cancellation handlers; no events run. |
| `CreativeTab.js` | 80 | Active, priority -1. Creates seven CWI creative tabs and modifies the KubeJS and Create tabs, including icons, names, removals and additions. |
| `Effects.js` | 8 | Active. Registers beneficial `reach` with the `minecraft:player.block_interaction_range` add-value attribute. |

The current target has 61 server JavaScript files, 32 startup files and two
client files. The server port includes native Core machine processing, hammer
conversions and equipment upgrades alongside interactions, progression, tags,
recipes, ore processing and utilities. The old `server_scripts/Hammer/` and
`server_scripts/Multiblocked2/` runtimes are replaced by Core rather than copied
alongside it. Core is installed; Biomancy is absent and remains guarded.
LootJS chest pools still require a separate current-API migration.
Darker Depths is also absent. Its stone families are registered locally, with
stone recipes retained; other Darker Depths content is excluded.
The installed Miners Delight mod ID is `minersdelight` (without an underscore);
all copied `miners_delight:` references were normalized to that 1.21.1 namespace.

### CWI globals and generated assets

The largest dependency chain is `Global.js` -> item/block/fluid/ore helpers.
Consumers assume the exact object keys and values declared there. The 15 stone
types include vanilla stones and custom replacements, including the renamed
Darker Depths raw stones; the 34 material types
cover alloys, metals, non-metals, metalloids and polymers; compound ores carry
processing maps and chance tables; `allTiers`, `colors`, `apples` and pipe-pile
definitions feed later registry callbacks. Rename a key only with a coordinated
change to every consumer.

`kubejs/assets` contains 1,757 files, including editor metadata. Required
stone textures live alongside the existing textures under
`assets/kubejs/textures/block/stones/`. Other namespaces retain existing Create,
TFMG, Vintage Improvements, Create Addition, Create Diesel Generators,
Geode Plus and CWI assets. CWI assets include language files, a bulk-fermenter
model, five existing Ponder NBT structures and README images. These file counts
do not establish that every historical asset is used.

### Inactive or historical-looking code

The three `ForgeEvents.onEvent(...)` sites found in the current source are
commented-out fluid and void-conversion code. They do not register callbacks.
The current tree contains active `ServerEvents.recipes` and `ServerEvents.tags`
handlers, LootJS modifiers, and progression/interaction handlers. MBD2 is not
present in the visible 1.21.1 mod set, and its old machine scripts are omitted
from this port.

Installed addon plugins can expose APIs that the current source does not use.
Do not describe an addon API as a current CWI convention until a script and a
runtime check demonstrate it.

The archaeology modifiers are syntactically ported, but their custom tables
(`cwi:archaeology/g`, `cwi:archaeology/ad`, and `cwi:archaeology/dd`) and
suspicious custom-block loot tables are not present in the target `data/` tree.
They remain dormant until those data/block dependencies are added.

## Stones And Darker Depths Textures

`global.stoneTypes` is the source of truth for raw, cobbled, gravel and powder
IDs. `Blocks/Stones.js` automatically registers custom raw/cobbled/gravel blocks
and modifies the existing vanilla blocks. `Items/MaterialsRegistry.js` registers
the powders, and `server_scripts/Recipes/Stones.js` generates their processing
recipes. Preserve the existing hardness, sound, map colors, tool tiers, falling
gravel behavior and recipe quantities.

| Source texture | Pack stone ID | Pack texture |
| --- | --- | --- |
| `aridrock` | `kubejs:quartzite` | `kubejs:block/stones/quartzite` |
| `grimestone` | `kubejs:phyllite` | `kubejs:block/stones/phyllite` |
| `duskrock` | `kubejs:conglomerate` | `kubejs:block/stones/conglomerate` |
| `darkslate` | `kubejs:darkslate` | `kubejs:block/stones/darkslate` |

These textures are copied into `assets/kubejs/textures/block/stones/`, beside
the existing stone textures. All four raw IDs already use `kubejs:` in
`global.stoneTypes`, so the ordinary loop registers them. No separate Darker
Depths registry, manifest, decorative-family generator, axis states or heat
states are needed. KubeJS generates the ordinary raw-stone models/blockstates.
Bricks, slabs, stairs, pillars, speleothems and other unused imported variants
and their resources/data are removed.

Two existing processing dependencies remain as ordinary blocks in
`Blocks/BlockRegistry.js`: quartzite deepslate is used by stone crushing/milling
and loot modifiers, and mossy phyllite is the brush transformation of
crystalized phyllite. Their textures also live in `block/stones/`. Existing
crystalized phyllite and acidified darkslate remain pack blocks. Their recipes
and loot behavior are preserved. No Darker Depths plants, wood, equipment,
world generation or special mechanics are imported.

## Runtime Verification Snapshot

The latest saved launch is from 27 October 2026, 12:24-12:28. It includes the
server-script port, but predates the compatibility fixes described here:

```text
Loaded 32/32 KubeJS startup scripts in 0.462 s with 0 errors and 0 warnings
Loaded 49/56 KubeJS server scripts in 0.104 s with 7 errors and 0 warnings
Loaded 0/0 KubeJS client scripts in 0.02 s with 0 errors and 0 warnings
Added 1981 recipes, removed 2303 recipes, modified 265 recipes, with 429 failed recipes
KubeJS errors found [1288]
```

Many errors repeat failures in shared recipe helpers. The fixes preserve the
old recipe definitions while adapting their output serialization, fluid
ingredients and renamed fields to the installed mods. Create chance outputs
use `CreateItem.of(Item.of(...), chance)` at native builder calls. Custom JSON
recipes require serialized stack objects rather than native processing-output
wrappers. Fluid tags are sized fluid ingredients, not fluid stacks.

Other corrected incompatibilities include server writes to `global`, Rhino
syntax failures, the creative-tab Java Set concatenation, Lychee item outputs
and actions. Equipment upgrades now use native Core crafting instead of
result callbacks.
The old `.nbt` stack API and callback form of `.modifyResult(...)` are absent
in this build. Native `cwi:equipment_upgrade` now preserves components and performs the
upgrade result/ingredient handling in Core.

The pre-cleanup compatibility audit recorded parser and mock checks for the
shared recipe helpers, equipment upgrades, armor durability, log placement,
hammer guards, oversized mixing recipes and fluid contacts. Those results
predate the stone-only cleanup and do not represent a fresh game launch.
The current cleanup is checked separately with Node and installed Rhino
syntax checks, registration capture for all stone types, local texture checks,
removed-ID scans and snapshot comparisons of existing processing recipes.
These checks do not establish in-game rendering or machine behavior.

Static checks must not be confused with an in-game result. Restart Minecraft
because startup scripts changed, then load a world and inspect fresh
`logs/kubejs/startup.log` and `logs/kubejs/server.log`. `/reload` alone does not
apply startup changes. Exercise crafting/upgrading, machine recipes, falling
items, lockpicking and loot callbacks after the scripts load.

The old hammer server implementation and MBD2 runtime remain excluded.
Native Core now supplies their supported behaviors using production recipe
data; see the current production integration section above.

## Porting Rules From CWI 1.20.1

Use the old CWI docs as a map of ideas, not as a 1.21.1 API snapshot.

1. Confirm the method or event with the installed 2101.x jar and ProbeJS 8.0.3.
2. Check whether the event belongs to `StartupEvents`, `ServerEvents`, or
   `ClientEvents` in this build before moving a script.
3. Inspect the target serializer JSON before using a recipe schema.
4. Preserve recipe IDs, output order, counts, chances, fluid amounts, timing,
   heat, and optional defaults during a port.
5. Use `Java.loadClass` only for classes verified in the active runtime and keep
   client-only classes out of common/startup code.
6. Restart for startup registry objects; use `/reload` for server recipes,
   schema registrations and datapack resources, and `F3+T` for client assets.
7. Treat a successful Rhino parse as weaker evidence than a KubeJS reload, and
   treat a reload as weaker evidence than exercising the recipe or machine.
8. When porting the old CWI files, convert Forge event names, Create/JEI/MBD2
   Java classes and recipe serializers one subsystem at a time. Do not move
   old `server_scripts` into `startup_scripts` just to make them load.

The historical tutorial's five Create Metallurgy examples remain useful as a
method for reading JSON shapes. The installed Create Metallurgy already has a
KubeJS plugin for those types; use its schemas and the Create resources listed
above. See the [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) before
attempting any registration or helper conversion.

This reference intentionally records the evidence boundary. Static jar
inspection establishes the available API and resource shapes; only a fresh
runtime reload and a machine/recipe test can establish that the current CWI
scripts execute correctly in game.
