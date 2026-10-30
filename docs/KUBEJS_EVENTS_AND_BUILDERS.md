# KubeJS Events, Builders And Runtime API

This reference covers the registration, event, world-interaction, tooltip and
loot APIs used by CWI 1.21.1, plus nearby APIs useful for extending those
systems. Recipe factories and their JSON fields are documented in
[Recipe API](KUBEJS_RECIPE_API.md) and
[Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md). Native machines, hammers,
shadow properties and registration filters are documented in
[CWI Core API](CWI_CORE_API.md). Start with [the main reference](kubejs.md) for
pack helpers, file placement and the complete coverage inventory.

## Evidence And Scope

The API baseline is the installed JARs and the current scripts, inspected on
29–30 October 2026. Signatures and important implementation details were
checked with public-class and bytecode inspection. This document does not
claim a new Minecraft launch, client rendering test or interaction playtest.
Examples illustrate API shapes; they are not additional pack registrations.

| Provider | Inspected version | Relevant surface |
| --- | --- | --- |
| KubeJS | `2101.7.2-build.377` | Registries, events, wrappers, tags, components, generated data, recipe viewer |
| Rhino | `2101.2.7-build.85` | JavaScript engine and Java interop |
| KubeJS Create | `2101.3.1-build.18` | Create recipes, spout handlers, pipe effects and boiler heat handlers |
| Create | `6.0.10` | Native processing and scene objects used by integrations |
| LootJS | `3.7.0` | Loot modifiers, conditions, pools, entries and functions |
| Lychee | `6.7.2` | In-world recipes and scripted contextual conditions |
| PonderJS | `2.4.0` | Client scene registration; installed, with no current pack scenes |
| ProbeJS | `8.0.3` | Definitions and inspection workflow |

Version-specific distinctions below matter. Older `2001.x` KubeJS, Forge
events, legacy JEI category bridges and old item-NBT tutorials are not the
baseline. Installed methods marked as unused are available extension points,
not evidence that CWI already uses them.

## Contents

- [Script contexts and event registration](#script-contexts-and-event-registration)
- [Registry builders and resource names](#registry-builders-and-resource-names)
- [Items, foods, models and components](#items-foods-models-and-components)
- [Blocks and modifications](#blocks-and-modifications)
- [Tool tiers, armor and effects](#tool-tiers-armor-and-effects)
- [Creative tabs](#creative-tabs)
- [Fluids](#fluids)
- [Tags and generated server data](#tags-and-generated-server-data)
- [Runtime events and world state](#runtime-events-and-world-state)
- [Create event integration](#create-event-integration)
- [LootJS](#lootjs)
- [Lychee custom conditions](#lychee-custom-conditions)
- [Client tooltips and recipe viewers](#client-tooltips-and-recipe-viewers)
- [PonderJS and ProbeJS](#ponderjs-and-probejs)
- [Migration traps and source map](#migration-traps-and-source-map)

## Script Contexts And Event Registration

Paths in this document are relative to the instance root.

| Context | Directory | Put here | Applying changes |
| --- | --- | --- | --- |
| Startup | `kubejs/startup_scripts/` | Registry builders, item/block modifications, tiers, startup addon handlers and native event subscriptions | Fully restart after registration changes |
| Server | `kubejs/server_scripts/` | Recipes, tags, loot, server data generation and gameplay interactions | `/reload` for resource-dependent changes; reload server scripts separately when appropriate |
| Client | `kubejs/client_scripts/` | Tooltip actions and recipe-viewer edits | Reload client scripts; resource changes may also require `F3+T` |

Reloading JavaScript and reloading resources are different operations. A
server-script reload does not by itself prove that recipes, tags, data maps or
client assets have been rebuilt. Registry objects cannot be added safely by a
normal server reload. Check the corresponding startup/server/client log.

The usual registration forms are:

```js
ServerEvents.loaded(event => {
    console.info('Server Loaded')
})

BlockEvents.rightClicked('minecraft:chest', event => {
    console.info(event.block.id)
})
```

An optional target narrows the handler to an item, block or entity type. It is
not a recipe ingredient predicate. Use the event's documented target type;
an item-targeted event does not accept arbitrary block predicates. Some
installed events require a target, so do not generalize the optional form to
every event.

Many Java getters are exposed as Rhino properties: `event.getBlock()` becomes
`event.block`, and `block.getLevel()` becomes `block.level`. A property that
already holds an object is not callable. Inspect the receiver before using
old chains such as `scene.world()`.

### Results And Cancellation

KubeJS events inherit `cancel()`, `success()` and `exit()`, with typed-value
overloads on suitable events. These use KubeJS control-flow exits. `return`
only leaves the current JavaScript callback; it does not cancel the game's
action. Do not catch and discard the exit thrown by `event.cancel()`.

Result support belongs to the specific event registration. For example,
`BlockEvents.rightClicked`, `broken` and `placed`, and
`ItemEvents.rightClicked`, support results in this build.
`ItemEvents.rightClicked` has an item-stack result type. A tick notification
is not a general cancellation mechanism merely because its payload implements
the base event interface.

Native NeoForge events use their own contract. CWI's portal handler is a
startup subscription:

```js
const $PortalSpawnEvent = Java.loadClass('net.neoforged.neoforge.event.level.BlockEvent$PortalSpawnEvent')

NativeEvents.onEvent($PortalSpawnEvent, event => {
    event.setCanceled(true)
})
```

The installed overloads are `NativeEvents.onEvent(eventClass, callback)` and
`NativeEvents.onEvent(priority, eventClass, callback)`. Only cancel native
events that implement the appropriate cancellable contract. Do not restore
the old `ForgeEvents` bridge.

### Complete Current Event-Call Inventory

This table accounts for every distinct event-call path found in current
uncommented script source. A source occurrence may be guarded or dormant; it
does not prove that the handler executed in a running game.

| Event | Context in CWI | Purpose / destination |
| --- | --- | --- |
| `StartupEvents.registry` | Startup | Item, block, fluid, armor material, mob effect and creative-tab registries |
| `StartupEvents.modifyCreativeTab` | Startup | Tab contents, icon and title |
| `ItemEvents.modification` | Startup | Default item properties, components and Core shadow properties |
| `ItemEvents.toolTierRegistry` | Startup | Custom tool tiers |
| `BlockEvents.modification` | Startup | Existing block properties and Core shadow properties |
| `CreateEvents.spoutHandler` | Startup | Block filling and budding catalysts |
| `LycheeEvents.customCondition` | Startup | Sky, time and beacon predicates |
| `NativeEvents.onEvent` | Startup | NeoForge portal-spawn cancellation |
| `CwiEvents.blockRegistration` | Startup | Native block registration filters; see [Core API](CWI_CORE_API.md) |
| `ServerEvents.recipes` | Server resources | All recipe families; see [Recipe API](KUBEJS_RECIPE_API.md) |
| `ServerEvents.tags` | Server resources | Item, block and fluid tags |
| `ServerEvents.generateData` | Server resources | `after_mods` furnace-fuel data |
| `ServerEvents.compostableRecipes` | Server resources | Composting chances |
| `ServerEvents.loaded` | Server | Starter/world initialization and seed handling |
| `ServerEvents.tick` | Server | Periodic server work |
| `PlayerEvents.loggedIn` | Server | Initial entry and development utilities |
| `PlayerEvents.respawned` | Server | Respawn behavior |
| `PlayerEvents.tick` | Server | Player conditions and effects |
| `PlayerEvents.chat` | Server | Development chat commands |
| `BlockEvents.rightClicked` | Server | Locks, pipes, spawner and development interactions |
| `BlockEvents.broken` | Server | Break behavior, including ash bricks |
| `BlockEvents.placed` | Server | Ash-brick placement behavior |
| `ItemEvents.rightClicked` | Server | Development item interactions |
| `EntityEvents.spawned` | Server | Dropped-item behavior and custom entity tags |
| `EntityEvents.hurt` | Dormant legacy source | Unsupported event name in installed KubeJS; guarded by the absent `clanginghowl` mod |
| `LevelEvents.tick` | Server | Per-level work |
| `LevelEvents.unloaded` | Server | Per-level cleanup of falling-item state |
| `LootJS.modifiers` | Server resources | Chest, archaeology and block loot |
| `ItemEvents.modifyTooltips` | Client | Formula lines and dynamic tooltip registration |
| `ItemEvents.dynamicTooltips` | Client | Tag-based warnings evaluated while hovering |
| `RecipeViewerEvents.removeEntries` | Client | Item/fluid viewer entry hiding |

The supported damage events are `EntityEvents.beforeHurt` and
`EntityEvents.afterHurt`. The former is a result-bearing pre-damage hook; the
latter is a notification after damage processing. For Core charged-hammer
effects that require a successful impact, use its native `afterImpact` hook
instead of replacing that contract with a broad entity event.

## Registry Builders And Resource Names

`StartupEvents.registry(registry, callback)` exposes:

| Method | Meaning |
| --- | --- |
| `event.create(id)` | Create an object with the registry's default builder |
| `event.create(id, builderType)` | Choose a registered builder type |
| `event.createCustom(id, supplier)` | Supply a native object rather than a standard builder |

An unqualified object ID uses the `kubejs` namespace. `event.create('example')`
registers `kubejs:example`; it does not register `cwi:example`. An explicitly
qualified ID retains its namespace. Builder type IDs and object IDs are
separate: Core's hammer builder is `kubejs:hammer`, but the pack intentionally
registers material hammer items as `minecraft:<material>_hammer`.

Common inherited methods are `displayName(component)`, `translationKey(key)`
and `tag(...tagIds)`. Model-capable builders also provide `texture(path)`,
`textures(map)`, `parentModel(id)` and `modelGenerator(callback)`.

KubeJS generates the normal English name from the ID. Do not add redundant
`en_us` entries for names such as `Item 1 Abc`. Override a display name or
translation only for an intentional spelling, abbreviation or special title.
Other languages use their normal language files.

`kubejs:item/ores/pyrite_powder` means
`kubejs/assets/kubejs/textures/item/ores/pyrite_powder.png`. Texture references
omit `textures/` and `.png`. A model resource and its texture resource are
different IDs. Cross-mod texture references are valid only if the installed
asset actually exists.

Registry data shared across generators is defined in startup `global`. Extend
the existing `global.materialTypes`, `global.stoneTypes`, ore and microbe data;
do not register the same family a second time in a parallel generator.

## Items, Foods, Models And Components

### Item Builder Types Used By CWI

The second argument to `event.create(id, builderType)` selects the registered
item class. These are the practical types used by current registrations:

| Builder type | Provider / behavior |
| --- | --- |
| Omitted | KubeJS's ordinary `ItemBuilder` |
| `sword`, `pickaxe`, `axe`, `shovel`, `hoe` | KubeJS tool builders; full IDs use `kubejs:` |
| `helmet`, `chestplate`, `leggings`, `boots` | KubeJS armor builders; full IDs use `kubejs:` |
| `hammer` / `kubejs:hammer` | CWI Core's native hammer builder; see [Core API](CWI_CORE_API.md) |
| `create:sequenced_assembly` | KubeJS Create builder for Create's native incomplete assembly item |

`create:sequenced_assembly` creates a `SequencedAssemblyItem`, which is
unstackable and reads Create's sequenced-assembly component for its progress
bar. CWI uses it for incomplete mechanisms, tools and other transitional
items. It does not create a recipe or choose steps, loops or results; those
belong to the [sequenced-assembly recipe](KUBEJS_RECIPE_API.md#sequenced-assembly).
Keep the transitional item and recipe definitions consistent.

### Item Builder

The standard item builder's practical surface is:

| Method | Argument / use |
| --- | --- |
| `texture(path)` | Base item texture |
| `parentModel(id)` | Parent model resource |
| `modelGenerator(model => ...)` | Explicit model generation |
| `maxStackSize(count)` | Maximum stack size |
| `unstackable()` | Stack size of one |
| `maxDamage(durability)` | Maximum durability; coordinate with stack size |
| `burnTime(ticks)` | Startup burn-time override |
| `containerItem(id)` | Crafting remainder item |
| `rarity(value)` | Minecraft rarity |
| `fireResistant()` / `fireResistant(boolean)` | Fire-resistance component |
| `disableRepair()` | Disable ordinary repair behavior |
| `component(componentType, value)` | Typed default data component |
| `color(tint)` / `color(index, tint)` | Tint callback/value accepted by the tint wrapper |
| `food(callback)` | Configure a food builder |
| `food(nutrition, saturationModifier)` | Short food configuration |
| `tag(...ids)` | Add item-tag membership |

Useful inherited behavior hooks have different callback contracts:

| Hook | Callback contract |
| --- | --- |
| `useAnimation(animation)` | Configure the use animation |
| `useDuration(callback)` | `(stack, livingEntity) => ticks` |
| `use(callback)` | `(level, player, hand) => boolean` |
| `finishUsing(callback)` | `(stack, level, livingEntity) => resultStack` |
| `releaseUsing(callback)` | `(stack, level, livingEntity, remainingTicks) => void` |
| `hurtEnemy(predicate)` | `context => boolean`; context exposes `item`, `target`, `attacker` |
| `foodEaten(callback)` | Food-eaten event payload |
| `craftingRemainingItem(callback)` | `stack => remainderStack` |
| `getEntityLifespan(ticksOrCallback)` | Fixed ticks or `(stack, level) => ticks` |

Do not transplant one hook's callback into another. A release callback is not
a recipe or a guaranteed successful-hit callback; Core hammers provide their
own impact lifecycle.

Other useful item behavior settings are `tooltip(component)`, `glow(boolean)`,
`barColor(callback)`, `barWidth(callback)`, `canPerformAction(predicate)`,
`canBeHurtBy(predicate)`, `onlyHurtBy(damageTypeKeys)` and
`immuneTo(damageTypeKeys)`. Native item abilities and tags have different
readers; adding a tool tag alone does not implement every tool ability.

### Food Builder

```js
StartupEvents.registry('item', event => {
    event.create('example_food')
        .food(food => {
            food.nutrition(4)
                .saturation(0.5)
                .alwaysEdible()
                .effect('minecraft:regeneration', 100, 0, 1)
        })
})
```

| Method | Meaning |
| --- | --- |
| `nutrition(int)` | Hunger points, not food-icon pairs |
| `saturation(float)` | Saturation modifier; build applies vanilla's nutrition/modifier calculation |
| `alwaysEdible()` / `alwaysEdible(boolean)` | Permit use when hunger is full |
| `eatSeconds(float)` | Eating duration in seconds |
| `fastToEat()` | Fast-eating preset |
| `usingConvertsTo(stack)` | Result after consuming the food |
| `effect(id, durationTicks, amplifier, probability)` | Possible effect; amplifier starts at zero, probability is numeric |
| `removeEffect(effect)` | Remove the specified existing effect |
| `eaten(callback)` | Food-eaten callback |

The fourth `effect` argument is the effect probability, not a particles flag.
Names of local variables or imported global-array columns do not change that
signature. The apple generator currently calls this API from `global.apples`;
use that generator when adding apple variants rather than creating duplicate
items. Verify optional effect providers before referencing their IDs.

### Models

For a normal generated item, prefer `texture(...)`. For authored layers:

```js
StartupEvents.registry('item', event => {
    event.create('example_layered_item')
        .modelGenerator(model => {
            model.parent('minecraft:item/generated')
            model.texture('layer0', 'kubejs:item/foods/apples/iron_apple')
            model.texture('layer1', 'kubejs:item/foods/apples/apple_charged_overlay')
        })
})
```

For Core hammers, an explicit model generator owns the whole model and bypasses
automatic charged-model generation. Ordinary material hammers therefore use
`texture(...)`, stone retains `chargedTexture(1, ...)`, and the distinct steel
pipe uses `chargeModels(false)` with its authored model. See
[Core API](CWI_CORE_API.md) before editing hammer registration.

### Item Modification

`ItemEvents.modification` runs at startup and changes default behavior of
existing items:

```js
ItemEvents.modification(event => {
    event.modify('minecraft:potion', item => {
        item.setMaxStackSize(16)
    })
})
```

The modification object provides `setBurnTime(ticks)`,
`setCraftingRemainder(item)`, `setTier(tier => ...)`, `setNameKey(key)` and
`disableRepair()`, plus the component and item-behavior methods above.
Useful component setters include `setMaxStackSize`, `setMaxDamage`,
`setDamage`, `setFood`, `modifyFood`, `setFireResistant`, `setTool`,
`setAttributeModifiers` and the attack attribute helpers.

These are item defaults. They are distinct from editing one player's current
stack. Existing stacks can have component overrides, so a default edit does
not imply every saved stack will behave identically without testing.

### Data Components

Minecraft 1.21.1 item state uses data components. KubeJS's component extensions
are remapped from internal `kjs$...` methods to ordinary script names. Their
practical operations are:

| Operation | Purpose |
| --- | --- |
| `get(componentType)` | Read a typed component |
| `set(componentType, value)` | Set a component using the target codec/wrapper |
| `set(componentMap)` | Apply a component map |
| `remove(componentType)` | Remove a component |
| `setUnit(componentType)` | Set a unit-valued component |
| `patch(componentPatch)` | Apply a typed component patch |
| `resetComponents()` | Reset component overrides |
| `componentString` | Inspect the component representation |
| `customData` / `setCustomData(tag)` | Custom-data component, separate from the other components |
| `setCustomName`, `setLore`, `setCustomModelData`, `setGlintOverride` | Common visual metadata |
| `setPotionContents`, `setDyedColor`, `setBlockStateProperties` | Structured typed state |

The pack loads native component keys with
`Java.loadClass('net.minecraft.core.component.DataComponents')`. For example,
`$DataComponents.MAX_DAMAGE` is a component type, not an item ID. Use a value
accepted by that specific component; a plain object is not automatically a
valid replacement for every native Java record or holder.

Do not port old `stack.nbt`, `.weakNBT()` or NBT result callbacks by analogy.
Recipe output encodings are serializer-specific; see the
[Recipe API](KUBEJS_RECIPE_API.md). Core equipment upgrades also preserve
their own ordered enchantment data; do not replace them with ad hoc stack
mutation callbacks.

## Blocks And Modifications

### Block Builder

| Method | Meaning |
| --- | --- |
| `copyPropertiesFrom(block)` | Copy a native block's base properties |
| `hardness(float)` | Destroy speed |
| `resistance(float)` | Explosion resistance |
| `unbreakable()` | Unbreakable preset |
| `soundType(value)` | Native sound-type wrapper, such as `stone` or `gravel` |
| `mapColor(value)` | Map-color wrapper |
| `lightLevel(float)` | Builder light fraction; distinguish from the modification API below |
| `requiresTool()` / `requiresTool(boolean)` | Require a correct tool for drops |
| `texture(path)` / `textures(map)` | Generated model textures |
| `opaque(boolean)`, `fullBlock(boolean)` | Geometry/render assumptions |
| `renderType(value)` | Block render type |
| `defaultCutout()`, `defaultTranslucent()` | Standard render presets |
| `noCollision()`, `notSolid()` | Collision/solid behavior settings |
| `box(x1, y1, z1, x2, y2, z2[, collision])` | Add a builder shape box |
| `waterlogged()` / `setWaterlogged(boolean)` | Waterlogging support |
| `slipperiness(float)`, `speedFactor(float)`, `jumpFactor(float)` | Surface movement properties |
| `item(itemBuilder => ...)`, `noItem()` | Configure or suppress the block item |
| `drops(supplier)`, `noDrops()` | Generated block loot |
| `tagBlock(...ids)` | Block tags |
| `tagItem(...ids)` | Block-item tags |
| `tagBoth(...ids)` | Both registries |
| `randomTick(callback)` | Builder random-tick callback |
| `property(property)` | Add a native block-state property |
| `defaultState(callback)`, `placementState(callback)` | Configure state defaults/placement |
| `entityInside`, `steppedOn`, `fallenOn`, `afterFallenOn`, `exploded`, `rightClick` | Block behavior callbacks |

The builder also has `tag(...)`; use explicit `tagBlock`, `tagItem` or
`tagBoth` when the intended registry matters. A block's item is not the block
registry entry, and item tags do not control block mining requirements.

The current block registrations use the following KubeJS builder types.
Their short forms resolve to the same named `kubejs:` builder types:

| Builder type | Behavior / current use |
| --- | --- |
| Omitted | Basic KubeJS block; ordinary materials, ores, casings and custom model shapes |
| `falling` / `kubejs:falling` | Falling block; generated gravel, dead leaves and ash-like material |
| `cardinal` / `kubejs:cardinal` | Horizontal facing; scrap/pipe piles, machine models, eaves and fabric stages |
| `pillar` / `kubejs:pillar` | Axis-oriented block; the log generator's intact logs |
| `slab` / `kubejs:slab` | Slab states and behavior; depleted-dirt slab |
| `pressure_plate` / `kubejs:pressure_plate` | Pressure-plate states and behavior; pebbles |

Nearby installed building types include `stairs`, `fence`, `fence_gate` and
`wall`, all in `kubejs:`. They are available extension points, not current
pack registrations. A custom model or collision `box(...)` does not select
one of these behavioral types by itself. There is no built-in `iron_bars`
builder type in this installed plugin.

Core registers the hammer item builder, not a separate machine-block builder.
Its native machines are registered by Core itself. An arbitrary class name is
not a builder type.
`blockEntity(callback)` is available but does not replace native Core machines.
Do not recreate their inventories, ticking or processing in KubeJS.

### Existing Blocks

`BlockEvents.modification(event => event.modify(id, properties => ...))`
exposes these installed setters:

- `setDestroySpeed(float)`, `setExplosionResistance(float)`
- `setRequiresTool(boolean)`, `setHasCollision(boolean)`
- `setSoundType(value)`, `setNameKey(key)`
- `setFriction(float)`, `setSpeedFactor(float)`, `setJumpFactor(float)`
- `setLightEmission(int)`, using Minecraft's `0..15` light scale
- `setIsRandomlyTicking(boolean)`, `setRandomTickCallback(callback)`

Core extends the builders/modification objects with shadow settings such as
`shadowAmount` and `shadowColor`; use [its API chapter](CWI_CORE_API.md) for
the installed signatures and semantics.

### Stone Generation Contract

`startup_scripts/Blocks/Stones.js` derives raw stone, cobblestone and gravel
registrations/properties from `global.stoneTypes`. Custom IDs use the existing
KubeJS generator; vanilla IDs are modified. Textures are selected through
`global.stoneTextures`. Custom gravel uses the `falling` builder. Powders and
processing routes are supplied by the related material/recipe generators.

To extend stones, add the data and the required assets in the existing
families, including `assets/kubejs/textures/block/stones/` for pack stone
textures. Do not import an entire retired mod's block family or manually
register IDs that the generator already creates. Tool suitability requires
the relevant block tags as well as `requiresTool`.

## Tool Tiers, Armor And Effects

### Tool Tiers

The installed `ItemEvents.toolTierRegistry` event offers:

| Method | Purpose |
| --- | --- |
| `event.add(name, callback)` | Add a custom mutable tier |
| `event.addBasedOnExisting(name, parentName, callback)` | Derive from an existing tier |
| `event.addExisting(name, nativeTier)` | Register a native tier under a script name |

The callback receives a `MutableToolTier` with `setUses(int)`,
`setSpeed(float)`, `setAttackDamageBonus(float)`, `setEnchantmentValue(int)`,
`setRepairIngredient(Ingredient)` and
`setIncorrectBlocksForDropsTag(resourceId)`.

```js
ItemEvents.toolTierRegistry(event => {
    event.add('example_tier', tier => {
        tier.setUses(500)
        tier.setSpeed(7)
        tier.setAttackDamageBonus(0)
        tier.setEnchantmentValue(0)
        tier.setIncorrectBlocksForDropsTag('minecraft:incorrect_for_iron_tool')
        tier.setRepairIngredient(Ingredient.of('minecraft:iron_ingot'))
    })
})
```

The 1.21.1 tier contract uses an **incorrect-for-drops block tag**. A numeric
`level` column in pack data is a local mapping to those tags; it is not proof
that the old mutable-tier `.level(...)` API still exists. Tool builders choose
the registered tier with `.tier(name)`. Existing pack tools also use
`.attackDamageBaseline(value)`; the tier's damage bonus and player attribute
base must be considered before describing a number as final damage.

### Armor Materials And Items

Armor material registration is separate from armor item registration:

| Registry / builder | Practical methods |
| --- | --- |
| `StartupEvents.registry('armor_material', ...)` | `defense(map)`, `enchantmentValue(int)`, `repairIngredient(supplier)`, `toughness(float)`, `knockbackResistance(float)`, `equipSound(holder)`, `layers(nativeLayers)` |
| Item builders `helmet`, `chestplate`, `leggings`, `boots` | `material(materialId)`, `maxDamage(int)`, ordinary item texture/properties |

`defense` receives a Java map keyed by `ArmorItem.Type`, as constructed by the
pack's `armorDefense` helper in `Items/ToolsArmors.js`. Repair ingredients are
suppliers because tags/registries must be resolved at the proper time. Armor
durability is configured on each item; do not copy the old material durability
shortcut or infer durability directly from defense values.

### Mob Effects

`StartupEvents.registry('mob_effect', ...)` exposes `color(value)`,
`beneficial()`, `harmful()`, `category(value)`, `instant([boolean])`,
`effectTick(callback)` and:

```text
modifyAttribute(attributeId, modifierResourceId, amount, operation)
```

The second argument is a resource location in this build, not the old UUID
object contract. Prefer a stable, descriptive namespaced ID for new modifiers.
The current reach effect changes the block-interaction-range attribute; an
effect's color or display text does not itself add gameplay behavior.

At runtime, living entities expose `potionEffects` with `clear()`,
`isActive(effect)`, `getDuration(effect)`, `getActive(effect)` and
`add(effect[, durationTicks[, amplifier[, ambient, particles]]])`. Resolve
only installed effects. A missing neurotoxin provider is not authorization to
invent another lead-hammer effect.

## Creative Tabs

Create a tab with `StartupEvents.registry('creative_mode_tab', ...)` and a
fully qualified tab ID where intended. `icon(() => stack)` and
`content(showRestrictedItems => itemPredicate)` defer lookup to the
tab-building phase. The content argument is a boolean indicating restricted
item visibility. The result is wrapped as an `ItemPredicate`; the lists used
by CWI are accepted through that wrapper, not through an arbitrary inventory
mutation callback.

Modify a tab with `StartupEvents.modifyCreativeTab(tabId, callback)`:

| Method | Purpose |
| --- | --- |
| `setDisplayName(component)`, `setIcon(stack)` | Title/icon |
| `add(stacks[, visibility])` | Append entries |
| `addBefore(anchorStack, stacks[, visibility])` | Insert before an anchor |
| `addAfter(anchorStack, stacks[, visibility])` | Insert after an anchor |
| `remove(predicate)` | Remove from parent and search according to the API |
| `removeFromParent(predicate)`, `removeFromSearch(predicate)` | Target one visibility collection |

These edit presentation; they do not delete items, recipes or tag membership.
The pack's `getItemsFromTags` iterates `Ingredient.of(tag).itemIds` with a
Java iterator. That collection is not necessarily a JavaScript array: do not
assume `.concat`, `.map` or other array operations work on every Java result.
Preserve intended tab and entry order.

## Fluids

Fluid registration has distinct objects: the source-fluid builder, flowing
fluid, NeoForge fluid type, optional placed block and optional bucket item.
Changing one does not automatically implement every behavior on the others.

| Fluid builder | Meaning |
| --- | --- |
| `event.create(id[, builderType])` | Source fluid registration |
| `type(type => ...)` | Configure NeoForge fluid-type properties |
| `tint(color)` | Rendering tint |
| `stillTexture(id)`, `flowingTexture(id)` | Texture resources |
| `renderType(value)`, `translucent()` | Render configuration |
| `slopeFindDistance(int)`, `levelDecreasePerBlock(int)` | Flow behavior |
| `explosionResistance(float)`, `tickRate(int)` | Placed-fluid properties |
| `noBucket()`, `noBlock()` | Suppress the corresponding generated object |
| `bucketItem`, `block`, `flowingFluid`, `fluidType` | Nested builders |

The fluid-type callback's useful properties are:

| Method family | Parameters |
| --- | --- |
| Physical metadata | `density(int)`, `viscosity(int)`, `temperature(int)` |
| Light/rendering | `lightLevel(int)`, texture/overlay setters, `tint`, `renderType` |
| Entity movement | `motionScale(double)`, `canPushEntity(boolean)`, `canSwim(boolean)`, `canDrown(boolean)`, `fallDistanceModifier(float)` |
| Environmental behavior | `canExtinguish(boolean)`, `canHydrate(boolean)`, `canConvertToSource(boolean)`, `supportsBoating(boolean)` |
| Other properties | `pathType`, `adjacentPathType`, `sound(soundAction, soundEvent)`, `rarity` |

These are Minecraft/NeoForge simulation properties, not a complete physical
model. A negative density plus no placed block does not implement gas pressure,
diffusion or buoyancy in every tank/pipe mod. Recipe quantities remain mB.
Preserve the registered phase when writing chemistry recipes.

Use CWI's fluid-family helpers in `startup_scripts/Fluids/fluid.js`; the main
reference documents their signatures. The pack also uses the installed
`kubejs:thick` and `kubejs:thin` builder types. Fluid tags belong on the fluid;
`builder.bucketItem.tag(...)` tags the container item. Molten handling must
include liquid silicon and molten slag through the existing shared paths.

Keep the chosen native `tfmg:air`, `tfmg:liquid_asphalt` and
`tfmg:liquid_concrete`, and the existing crude/heavy oil IDs. Do not recreate
their retired KubeJS duplicates or removed molten-plastic/furnace-gas routes.

## Tags And Generated Server Data

### Tag Events

```js
ServerEvents.tags('item', event => {
    event.add('cwi:example_group', 'minecraft:iron_ingot')
    event.add('cwi:example_group', '#c:ingots/copper')
    event.remove('cwi:example_group', 'minecraft:iron_ingot')
})
```

| API | Meaning |
| --- | --- |
| `event.add(tagId, ...values)` | Add elements or nested `#tag` references |
| `event.remove(tagId, ...values)` | Remove selected entries |
| `event.removeAll(tagId)` | Empty a tag's entries |
| `event.removeAllTagsFrom(...values)` | Remove selected elements from tags |
| `event.get(tagId)` | Get its mutable tag wrapper |
| `event.getElementIds()` | Registry element IDs exposed by the event |
| `event.get(tagId).getObjectIds()` | Resolve the wrapper's object IDs |

The first argument is the tag ID without `#`; a nested tag in the values uses
`#`. The item, block and fluid registries are separate, even for identically
spelled tag IDs. A tag groups elements; it does not grant an effect unless a
game/mod/script reader checks it. See [Tag Reference](TAG_REFERENCE.md) for
the pack's consumers, affected types and special behavior.

### Legacy Tag Cleanup

`server_scripts/Tags/LegacyTags.js` runs at priority `-10000` for item, block
and fluid tags. It removes nested references to the `forge` namespace, then
deletes those tag definitions from the final map. When invoked as a
`PreTagKubeEvent`, it queues the cleanup action until the actual tag maps exist.

This is deliberately stronger than `removeAll`, which empties a definition
without deleting its key. The low-level `event.tags` and `PreTagKubeEvent`
implementation is specific to this installed KubeJS build; use normal tag APIs
for ordinary changes. Cleanup occurs during resource loading/reloading. It
does not modify JARs on disk, translate old readers to `c:`, or fix a hardcoded
Java consumer still requesting a removed tag.

New common tags use a verified modern ID, and pack groups use `cwi:`. Do not
perform a namespace-wide `forge:` → `c:` replacement: naming and tag structure
can differ. Check the actual reader before removing or replacing a tag.

### `ServerEvents.generateData`

The script-visible stages are `before_mods`, `after_mods` and `last`. These
select the generated data pack's resource priority. `after_mods` does not mean
"an arbitrary initialization callback after all mods have started."

The callback receives a KubeJS data generator. Practical methods include:

| Method | Meaning |
| --- | --- |
| `setFurnaceFuel(itemPredicate, ticks)` | Add/update NeoForge furnace-fuel data |
| `removeFurnaceFuel(itemPredicate)` | Remove furnace-fuel entries |
| `setCompostable(itemPredicate, chance, canVillagerCompost)` | Set compostable data |
| `removeCompostable(itemPredicate)` | Remove compostable entries |
| `dataMap(dataMapType, callback)` | Configure a typed NeoForge data map |

CWI's fuel-removal pattern is therefore intentional:

```js
ServerEvents.generateData('after_mods', event => {
    const nonFuelItems = ['minecraft:lava_bucket', 'minecraft:blaze_rod']

    nonFuelItems.forEach(id => event.removeFurnaceFuel(id))
})
```

`removeFurnaceFuel` writes removals into NeoForge's `FURNACE_FUELS` data map.
It does not remove smelting recipes, unregister the items, or prove that every
custom machine uses vanilla furnace fuels. Later data packs or separate native
fuel logic may have their own behavior. The startup `setBurnTime` override and
resource-data-map approach are different control paths; inspect both when
auditing fuel behavior.

### Composting

`ServerEvents.compostableRecipes` edits NeoForge's compostable data map rather
than creating an ordinary crafting or machine recipe. CWI's current entries
are in `server_scripts/Recipes/Composting.js`.

```js
ServerEvents.compostableRecipes(event => {
    event.add('minecraft:apple', 0.65)
})
```

| Method | Contract |
| --- | --- |
| `add(itemPredicate, chance[, canVillagerCompost])` | Add a compostable entry; the two-argument overload uses `false` for villager composting |
| `addReplace(itemPredicate, chance[, canVillagerCompost])` | Add with the data-map entry's replace flag; the omitted boolean is also `false` |
| `remove(itemPredicate)` | Remove matching items or a recognized tag entry |
| `replaceAll()` | Set the data map's replace-all flag |
| `removeAll()` | Clear entries authored in this event and set replace-all |

`chance` is the probability of advancing the composter level, normally `0–1`;
it is not an output stack count. Item predicates can represent IDs, tags or
other supported matches. `addReplace` replaces an entry, while `replaceAll`
affects the whole inherited data map. Use the latter only when intentionally
replacing composting across the pack.

## Runtime Events And World State

### Payloads Used By CWI

| Event | Useful payload | Important limitation |
| --- | --- | --- |
| `ServerEvents.loaded`, `ServerEvents.tick` | `server` | A server tick runs once for the server, not once for every dimension |
| `PlayerEvents.loggedIn`, `tick` | `player`, `entity`, `level`, `server` | A player tick runs for each player |
| `PlayerEvents.respawned` | Player payload and `endConquered` boolean | End return and ordinary death respawn are different cases; do not assume login initialization should repeat |
| `PlayerEvents.chat` | `player`, `username`, `message`, mutable `component` | Message string and display component are different fields |
| `BlockEvents.rightClicked` | `player`, `entity`, `block`, `hand`, `item`, `facing`, `hitResult` | Check held item, hand and intended interaction before consuming anything |
| `BlockEvents.broken` | `player`, `block` | It does not expose an arbitrary mutable `drops` list |
| `BlockEvents.placed` | `entity`, `level`, `block` | Placing entity is not guaranteed to be a player |
| `ItemEvents.rightClicked` | `player`, `hand`, `item`, `target` | Target is a ray-trace wrapper, not always a block |
| `EntityEvents.spawned` | `entity`, `level` | `spawned('item', ...)` targets item entities, not all entity types |
| `LevelEvents.tick`, `LevelEvents.unloaded` | `level` | Each dimension has its own lifecycle and cleanup |

Common interaction events are registered as common-side APIs in KubeJS. The
pack's gameplay mutations live in server scripts. A handler moved to client
scripts must not also consume items or replace world blocks independently.
Check player/target validity rather than assuming every callback is a normal
survival-player interaction.

Installed nearby events include `ItemEvents.canPickUp`, `pickedUp`, `dropped`,
`crafted`, `smelted`, `foodEaten`, `entityInteracted`, `EntityEvents.death`,
`drops`, `checkSpawn`, `LevelEvents.loaded`, `saved`, `beforeExplosion` and
`afterExplosion`. They are useful extension points, not current replacements
for the pack's native machine or hammer behavior. Optional old injector code
does not make its absent provider part of the active baseline.

### Level Blocks

`event.block` is a `LevelBlock`, tying a position to its actual level:

| Read / operation | Meaning |
| --- | --- |
| `level`, `pos`, `dimension`, `x`, `y`, `z` | World and location |
| `id`, `blockState`, `properties` | Block identity/state |
| `up`, `down`, `north`, `south`, `east`, `west` | Neighbor wrappers |
| `offset(direction[, distance])`, `offset(x, y, z)` | Relative position |
| `set(block[, properties[, flags]])` | Replace the block |
| `setBlockState(state[, flags])` | Set an already constructed native state |
| `entity`, `entityId`, `entityData` | Block entity and saved data |
| `mergeEntityData(tag)` | Merge block-entity data through the wrapper |
| `inventory`, `getInventory(direction)` | Inventory access where supported |
| `getDrops([entity, toolStack])` | Calculate drops for the supplied context |
| `popItem(stack)`, `popItemFromFace(stack, direction)` | Spawn item drops |
| `light`, `skyLight`, `blockLight`, `canSeeSky`, `biomeId` | Environmental queries |

Use the target's `block.level` for changes, sounds and particles. A command
executed without dimension context can affect the same coordinates in a
different world. Calculating drops does not automatically remove a block,
spawn those drops or account for every later global-loot modifier.

### Items And Inventories At Runtime

These wrappers operate on live stacks and inventories. They are different
from the startup item builder and from a recipe's ingredient definition.

| Receiver / operation | Contract |
| --- | --- |
| `player.inventory`, `player.craftingGrid` | Player inventory and crafting-grid wrappers |
| `player.mainHandItem`, `player.offHandItem`, `player.getHeldItem(hand)` | Held stacks; setters and `setHeldItem(hand, stack)` replace the held stack |
| `stack.id`, `stack.count`, `stack.hasTag(tagId)` | Identity, current quantity and tag membership |
| `stack.withCount(count)` | Return a stack with the requested count; distinguish this from mutating `stack.count` |
| `inventory.slots`, `getStackInSlot(slot)`, `setStackInSlot(slot, stack)` | Indexed access; slot indexes start at zero |
| `inventory.count([predicate])` | Total item quantity matching the predicate |
| `inventory.countNonEmpty([predicate])` | Number of matching nonempty slots, not total quantity |
| `inventory.find([predicate])`, `allItems`, `clear([predicate])` | Locate a slot, enumerate stacks or clear matching content |
| `inventory.insertItem([slot,] stack, simulate)` | Insert and return the uninserted remainder |
| `inventory.extractItem(slot, amount, simulate)` | Return the extracted stack; simulation does not remove it |
| `player.give(stack)`, `giveInHand(stack)` | Give through the player helper rather than assuming free inventory space |
| `player.sendInventoryUpdate()` | Synchronize an inventory update when the chosen mutation path needs it |

Check inventory mutability and validity before writing. Insertion returning a
nonempty remainder is not a successful full insertion; decide where that
remainder goes. A simulation result is a preview, not ownership of new items.
Do not mutate a recipe prototype or shared definition as though it were a
player's live stack.

### Entities, Players And Server Utilities

The ordinary script names below are remapped from KubeJS's internal
`kjs$...` extensions. Native Minecraft/NeoForge methods such as
`damageSources()` remain available on their native objects.

| Receiver / operation | Contract |
| --- | --- |
| `entity.level`, `entity.server`, `entity.type` | Owning world/server and entity-type ID |
| `entity.isPlayer()`, `isLiving()`, `isItem()`, `isAlive()` | Check the receiver before using player, living-entity or item-entity fields |
| `entity.attack(damageSource, amount)` | Apply damage and return success; source, defenses and invulnerability still matter |
| `entity.damageSources().inFire()`, `.lava()`, `.magic()`, `.playerAttack(player)` | Native sources used by the pack; choose the actual damage context |
| `entity.potionEffects.add(effect, ticks, amplifier, ambient, particles)` | Living-entity effect; zero-based amplifier and tick duration |
| `level.createEntity(type)`, `entity.setPosition(x, y, z)`, `entity.spawn()` | Construct, configure and then add a new entity to the world |
| `entity.discard()` | Remove this entity; it does not grant its item stack to a player |
| `entity.teleportTo(x, y, z[, yaw, pitch])` | Teleport within the current level |
| `entity.teleportTo(dimensionId, x, y, z, yaw, pitch)` | Server dimension teleport; returns success and requires a valid target level |
| `entity.setRotation(yaw, pitch)`, `setDeltaMovement(x, y, z)` | Rotation in degrees or native movement vector |
| `itemEntity.item`, `lifespan`, `ticksUntilDespawn` | Dropped stack and despawn controls; distinguish the entity from its contained stack |
| `level.getAllEntities()` | Entity collection used by existing pack scans; avoid adding duplicate every-tick scans |
| `server.getLevel(dimensionId)`, `server.players`, `getPlayer(selector)` | Resolve the intended dimension/player |
| `server.runCommandSilent(command)`, `player.runCommandSilent(command)`, `level.runCommandSilent(command)` | Run with that receiver's command context and suppressed output; returns no result value |
| `server.gameRules.set(name, stringValue)` | Change a game rule; read with `getBoolean`, `getInt` or `getString` |
| `server.scheduleInTicks(ticks, scheduledEvent => ...)` | Delayed server callback; returned scheduled event provides `clear()` and `reschedule([delay])` |

Entity creation alone does not spawn it. `spawn()` here is the newly created
entity path, not an instruction to respawn an existing player. Hold command
execution to the correct receiver/dimension; silent execution still performs
the command. Scheduling does not preserve a vanished entity or unloaded level.
Validate delayed targets again before using them.

### Shared And Persistent State

| Store | Appropriate use | Lifetime |
| --- | --- | --- |
| Startup `global` | Shared pack definitions and helpers | Restart/rebuild with startup scripts; server/client top-level map is read-only |
| Server-script variables | Reload-local caches and working state | Lost/recreated when that script context reloads |
| `server.persistentData` | Saved world/server flags | Saved world data |
| `level.persistentData` | Dimension-specific saved state | Saved level data |
| `player.persistentData` | Player-specific saved flags | Saved player data; inspect death/clone behavior when designing persistence |

Persistent data is a `CompoundTag`; use typed operations such as
`contains(key)`, `getBoolean(key)`, `putBoolean(key, value)`, `getInt(key)` and
`putInt(key, value)`. A missing numeric/boolean key may read as its default;
test `contains` when absence has a separate meaning. Do not write new server
definitions into the startup `global` map during reload. This read-only view
does not recursively freeze nested arrays or objects; treat shared nested
definitions as immutable too, so one consumer cannot silently alter another.

Starter flags such as `first_loaded`, `first_player_enter` and `first_enter`
have different scopes. Preserve that distinction to avoid granting starter
items every login or treating one player's progress as global progress.

`server.scheduleInTicks(ticks, callback)` schedules delayed server work.
Before using a delayed entity reference, recheck that it still exists and
belongs to the intended level. Clear level-specific caches on unload. Ticking
every item/entity in every dimension can become expensive; preserve existing
interval checks and avoid duplicating native processing loops.

## Create Event Integration

These are startup registration events from KubeJS Create, separate from
`event.recipes.create.*`.

### Spout Handlers

```text
CreateEvents.spoutHandler(callback)
event.add(handlerId, blockStatePredicate, (block, fluidStack, simulate) => acceptedMb)
```

The callback receives a `LevelBlock`, a NeoForge fluid stack and a simulation
flag. Return `0` for rejection or the accepted fluid amount in mB. Never accept
more than is offered. Validate block state, fluid ID/tag, amount and growth
stage before returning a positive value.

Simulation must be read-only: no block writes, item consumption, sounds,
particles or irreversible random decisions. Real application must perform the
same validation and consume only the amount returned. CWI's budding helper
also keeps all block writes and sounds in the target block's dimension.

In this installed KubeJS Create implementation, the supplied `handlerId` is
accepted by the public method but not read by its body. Effective routing is
through the block-state predicate and registered handler logic. Do not rely on
the ID to isolate overlapping handlers or deduplicate registrations.

Current sources are `RecipeRegister/BlockFilling.js` and
`RecipeRegister/BuddingCatalyze.js`. The latter configures native Core infected
budding blocks; its processing works independently of whether a custom JEI
category has been ported.

### Available Nearby Hooks

| Event | Registration | Status |
| --- | --- | --- |
| `CreateEvents.pipeFluidEffect` | `event.add(fluidIngredient, (level, area, fluidStack) => ...)` | Installed; no current pack registration |
| `CreateEvents.boilerHeatHandler` | `event.add(block, levelBlock => heat)` | Installed; no current pack registration |
| `CreateEvents.boilerHeatHandler` | `event.addAdvanced(blockStatePredicate, levelBlock => heat)` | Installed advanced selection; unmatched advanced handlers fall through |

The advanced boiler callback uses a negative unmatched value in the inspected
implementation. Check the exact accepted heat contract before adding a new
heat source. Neither this hook nor a generic fluid effect authorizes restoring
the removed firebox route.

## LootJS

### Event And Selectors

`LootJS.modifiers(callback)` belongs in server scripts and is rebuilt with
server resources. The event supports:

| Selector / control | Purpose |
| --- | --- |
| `addTableModifier(...tableFilters)` | Select named loot tables or supported filters |
| `addBlockModifier(blockFilter)` | Select block loot |
| `addEntityModifier(entityHolderSet)` | Select entity loot |
| `addTypeModifier(...lootTypes)` | Deprecated; installed implementation recommends `addTableModifier` with `LootType` instead |
| `removeGlobalModifiers(...idFilters)` | Remove selected global modifiers |
| `disableLootModification(...idFilters)` | Exclude selected tables/filters from modification |
| `enableLogging()` | Debug modifier behavior |

The installed methods accept typed filter wrappers; literal IDs shown in
current scripts are convenient supported cases. A selector's type is not
interchangeable with a recipe filter or an arbitrary JavaScript predicate.

### Actions And Grouping

Modifier/group action methods include `addLoot(...entries)`,
`removeLoot(itemFilter)`, `replaceLoot(itemFilter, entry[, preserveCount])`,
`modifyLoot(itemFilter, callback)`, `dropExperience(numberProvider)`,
`customAction(callback)`, `group(callback)` and `pool(callback)`.

The extended `replaceLoot` overload additionally accepts a component-type
array to preserve selected components. Its Boolean argument preserves the
stack count, not all metadata. `customAction` receives `(lootContext,
lootBucket)`; `playerAction` receives the selected server player.

`addAlternativesLoot(...entries)` and `addSequenceLoot(...entries)` **do exist**
on the installed inherited `LootActionContainer` interface. An older runtime
failure does not justify declaring them absent from LootJS 3.7.0. Resolve the
actual receiver/version/interop when diagnosing such a failure.

For CWI's authored chest rolls, keep the existing explicit outer `group` and
inner `pool` structure. Group conditions and rolls define independent action
boundaries; pool entries/functions define a separate selection boundary.
Flattening them can change probabilities or apply functions to unrelated loot.

```js
LootJS.modifiers(event => {
    event.addTableModifier('minecraft:chests/simple_dungeon')
        .group(group => {
            group.randomChance(0.25)
            group.pool(pool => {
                pool.rolls(1)
                pool.addEntry(LootEntry.of('minecraft:iron_ingot').setCount([1, 3]).withWeight(3))
                pool.addEntry(LootEntry.of('minecraft:gold_ingot').setCount(1).withWeight(1))
            })
        })
})
```

This illustrative group has a 25% chance to run its one pool roll; the iron
and gold entries then have relative weights 3:1. A weight of three is not a
3% chance. Multiple independent groups are not equivalent to a single pool
with many alternatives.

`group.rolls(provider)` repeats the group's actions. A group also supports
`containsLoot(filter[, boolean])` and the shared conditions/functions.
Pools support `rolls`, `bonusRolls`, `name`, `when(conditions => ...)`,
`apply(functions => ...)`, `addEntry`, `modifyEntry` and `removeEntry`.
Preserve both the group's and pool's roll counts.

### Entries, Functions And Conditions

| Entry factory | Meaning |
| --- | --- |
| `LootEntry.of(stack)` | Item entry |
| `LootEntry.empty()` | Explicit empty alternative |
| `LootEntry.reference(tableId)` | Another loot table |
| `LootEntry.tag(tagId[, expand])` | Tag entry |
| `LootEntry.alternative(...entries)` | Alternatives, respecting entry conditions |
| `LootEntry.sequence(...entries)` | Sequence composite |
| `LootEntry.group(...entries)` | Group composite |

Simple entries support `withWeight(int)`, `withQuality(int)`,
`when(conditions => ...)` and `apply(functions => ...)`. Useful loot functions
include:

| Function | Important distinction |
| --- | --- |
| `setCount(numberProvider)` | Assign a stack count |
| `limitCount(minProvider, maxProvider)` | Clamp an existing count; does not assign the authored count |
| `damage(numberProvider)` | Native item-damage loot function, not entity damage |
| `enchantRandomly`, `enchantWithLevels`, `enchant` | Native enchantment functions |
| `applyOreBonus`, `applyEnchantmentBonus`, `applyBinomialDistributionBonus` | Native bonus distributions |
| `smelt()`, `simulateExplosionDecay()` | Smelting/explosion loot functions |
| `setName`, `addLore`, `replaceLore`, `setCustomData` | Metadata/functions applied to selected loot |
| `jsonFunction(json)` | Native loot-function JSON when needed |

The pack uses numeric providers and `[minimum, maximum]` ranges. Keep the
provider's intended distribution and count function. Do not replace
`setCount([2, 4])` with `limitCount(2, 4)`. Entries/builders are mutable;
reusing one and later changing functions/weight can unintentionally couple
otherwise independent loot definitions.

Frequently useful conditions are `randomChance(provider)`,
`randomChanceWithEnchantment(enchantmentHolder, chances)`,
`matchMainHand(filter)`, `matchOffHand(filter)`, `matchHead`/`matchChest`/
`matchLegs`/`matchFeet`, `survivesExplosion()`, `matchDimension(...ids)`,
`matchBlock(block[, statePredicate])`, `matchBiome(biomeHolderSet)`,
`killedByPlayer()`, `matchPlayerCustom(predicate)`,
`matchEntityCustom(predicate)` and `matchCustomCondition(json)`.

Biome matching takes a **holder set** in this build, not a guaranteed raw-ID
varargs shortcut. Use the current pack's registry-resolution helper. If a
required biome is not ported, do not silently treat that condition as true.
CWI's dark-ash alternative retains its original absent-biome conditions, so
that alternative currently fails while ordinary ash remains possible.

Conditions on a group are evaluated before its actions. An already-added
guaranteed drop and a conditional later bonus should remain in separate
groups when the authored logic requires that. See `Loots/Loots.js`,
`Loots/Chest.js` and `Loots/Archaeology.js` before changing rolls.

## Lychee Custom Conditions

Lychee's recipe JSON/factories are covered in [Recipe API](KUBEJS_RECIPE_API.md).
Its scripted condition extension is a startup API:

```js
LycheeEvents.customCondition('can_see_sky', event => {
    event.condition.testFunc = (recipe, ctx, times) => {
        const block = ctx.level.getBlock(ctx.getParam('lychee:block_pos'))
        return block.canSeeSky ? times : 0
    }
})
```

The payload contains `id`, `condition` and JSON `data`. It also exposes
`setTestFunc(predicate)` and `setTestInTooltipsFunc(callback)`; assigning
`event.condition.testFunc` is the current pack's native-condition path.

The test receives `(recipe, context, times)` and returns the permitted integer
execution count. Return `times` to pass all offered executions or `0` to
reject; do not replace this batching contract with an assumed Boolean result.
Use only context parameters supplied by that recipe type. For example,
`lychee:block_pos` is a block-position parameter, whereas `this_entity` is
used by the pack's item-entity beacon condition.

Current conditions in `RecipeRegister/Lychee.js` are:

| ID | Behavior |
| --- | --- |
| `can_see_sky` | Tests sky visibility at Lychee's block position |
| `is_noon` | Day-time range `5500..6500`, modulo `24000` |
| `is_midnight` | Day-time range `17500..18500`, modulo `24000` |
| `beacon_condition` | Searches downward from the context entity for a beacon with a nonempty beam section list |

These are CWI's chosen conditions, not claims about every Lychee recipe's
context. The beacon scan is an explicit pack abstraction; it should not be
described as a full native beacon-effect test.

## Client Tooltips And Recipe Viewers

### Static Tooltip Actions

`ItemEvents.modifyTooltips` replaces the historical tooltip event. Its useful
forms are:

```text
event.add(ingredient, componentList)
event.add(ingredient, requirements, componentList)
event.modify(ingredient, [requirements,] actionBuilderCallback)
event.modifyAll([requirements,] actionBuilderCallback)
```

The action builder supports `add(componentList)`,
`insert(index, componentList)`, `removeLine(index)`, `removeText(component)`,
`removeExactText(component)`, `clear()` and `dynamic(handlerId)`.
`add` takes a component list; do not pass an old variadic string signature.
Avoid hardcoded line numbers unless the entire affected tooltip is controlled
by the pack.

### Dynamic Tooltip Actions

```js
ItemEvents.modifyTooltips(event => {
    event.modifyAll(tooltip => tooltip.dynamic('cwi:example_warning'))
})

ItemEvents.dynamicTooltips('cwi:example_warning', event => {
    if (event.item.hasTag('cwi:hot_items')) {
        event.add([Text.translate('tooltip.kubejs.hot').red()])
    }
})
```

The dynamic payload exposes `item`, `lines`, `startup`, `advanced`,
`creative`, `shift`, `ctrl` and `alt`, plus `add(componentList)`. It can inspect
the hovered stack and current tag state.

CWI attaches formula lines statically, guarding each ID with `Item.exists` and
deduplicating item/formula pairs. Hot and no-gravity warnings are dynamic,
because resolving a tag ingredient before world tags load can produce an
empty ingredient with unexpectedly broad matching. Keep tag membership checks
inside the hover callback for these warnings.

`Text.of(value)` creates literal text; `Text.translate(key)` uses language
resources. Formatting such as `.yellow()`, `.gold()`, `.red()` and `.white()`
sets text style. A renderer's shadow/lighting can still change perceived color;
identical color names do not prove identical drawing calls.

The API does not override the author's editorial rules. Preserve original
warnings, keep centered `---` interaction guidance where authored, and do not
add recipe walkthroughs that merely repeat JEI.

### Recipe Viewer Events

```js
RecipeViewerEvents.removeEntries('item', event => {
    if (Item.exists('tfmg:sulfur')) event.remove('tfmg:sulfur')
})
```

The same entry-type target can be `'fluid'`, guarded with `Fluid.exists`.
Hiding an entry only changes recipe-viewer presentation. It does not unregister
an item/fluid or remove its production/consumption recipes. Use server recipe
removals when retiring a duplicate material.

The installed viewer event family also has entry addition, information,
recipe removal and category removal surfaces. Use the current generated
definitions for the relevant callback type; these are distinct from creating
a custom category. The old `JEIAddedEvents` custom-category bridge is not the
API used by this pack. Core owns native machine, hammer and upgrade categories.
Budding-catalyst and compound-mineral custom displays remain separate porting
work, not proof that processing recipes are absent.

## PonderJS And ProbeJS

### PonderJS

PonderJS 2.4.0 registers the client events `Ponder.registry` and `Ponder.tags`.
There are no current pack Ponder scripts. Installed scene-entry methods are:

```text
event.create(ingredient) -> ponderBuilder
event.remove(ingredient)
ponderBuilder.tag(...tagIds)
ponderBuilder.scene(id, title, storyboard)
ponderBuilder.scene(id, title, structureId, storyboard, ...extraComponents)
```

The short scene overload uses PonderJS's built-in basic structure. A native
storyboard receives Create/Ponder scene objects; inspect their actual types
and property mappings before porting scene operations. A builder object is
not a live client world, and a scene's world may not exist during registration.
Do not reuse the old failing `scene.world()` chains or dereference scene
world state before initialization. No new schematics are authorized.

### ProbeJS

ProbeJS 8.0.3 exposes `/probejs` to open its dump interface. Generate
definitions from this exact instance after mod/API changes, then inspect the
startup, server and client declarations for the appropriate script context.
Do not reuse the old 1.20.1 dumps or assume `/probejs dump` is the current CLI.

Use editor definitions to discover overloads and callback parameter types;
use the installed JAR's plugin registration, public classes, codecs and
implementation to settle ambiguous or generic declarations. Definitions alone
do not prove that a registry object exists or a runtime recipe loads. The
instance currently has no `kubejs/jsconfig.json`; adding editor configuration
is separate work from writing API documentation.

## Migration Traps And Source Map

| Tempting assumption | Correct check |
| --- | --- |
| A source call exists, so its API is supported | Inspect registration and guards; dormant `EntityEvents.hurt` is a counterexample |
| A mod is installed, so all of its original recipes remain | Trace current removals and replacements |
| `after_mods` is a general late-startup hook | It is a generated server-data priority stage |
| A `c:`/`forge:` tag grants behavior by itself | Find the actual game/mod/script reader |
| Hiding a viewer entry deletes the material | Remove the relevant recipes separately when intended |
| A bucket tag is also a fluid tag | Item and fluid registries are separate |
| `food.effect` ends with a particles flag | It ends with probability |
| A tier's old numeric level is the native current contract | Use incorrect-for-drops block tags |
| A block-modification light value is a builder fraction | `setLightEmission` uses integer `0..15` |
| `limitCount` and `setCount` are equivalent | One clamps; the other assigns |
| A successful spout simulation may change the world | Simulation must be read-only |
| A Core source checkout proves the installed API | Inspect the installed JAR fingerprint |
| Node parsing proves Rhino/Java interop | Validate with installed Rhino and, when changing behavior, the target runtime |

Useful current sources, all under `kubejs/`:

| Source | Consult for |
| --- | --- |
| `startup_scripts/Preload/Global.js` | Shared material, stone and progression data |
| `startup_scripts/Items/ItemRegistry.js`, `MaterialsRegistry.js`, `foods.js` | Ordinary items and generated families |
| `startup_scripts/Items/ToolsArmors.js`, `hammers.js` | Tiers, armor and native hammer builders |
| `startup_scripts/Items/ItemModification.js`, `Blocks/BlockModification.js` | Existing-object edits |
| `startup_scripts/Blocks/Stones.js`, `Ores.js` | Generated stone and mineral registrations |
| `startup_scripts/Fluids/fluid.js` | Fluid families and their nested builders |
| `startup_scripts/CreativeTab.js`, `Effects.js` | Tabs and mob effects |
| `startup_scripts/RegistrationBlock.js`, `ShadowDrop.js` | Core registration/shadow extensions |
| `startup_scripts/RecipeRegister/BlockFilling.js`, `BuddingCatalyze.js`, `Lychee.js` | Addon startup handlers |
| `startup_scripts/Events/PortalCancel.js` | Native NeoForge subscription |
| `server_scripts/Tags/`, `Items/ItemFuel.js` | Tags and data maps |
| `server_scripts/Starter.js`, `Interactions/`, `Utils/` | Runtime event payloads and state |
| `server_scripts/Loots/` | Loot selectors, independent groups and functions |
| `client_scripts/tooltips.js`, `JEI/JEIHide.js` | Current client APIs |

Read [Development Standards](DEVELOPMENT_STANDARDS.md) before implementation.
Keep this reference aligned with installed versions when those JARs change.
