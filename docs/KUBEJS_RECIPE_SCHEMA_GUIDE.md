# KubeJS Recipe Schema Guide

This guide carries the useful lessons from the CWI 1.20.1
[RecipesSchemaAdded tutorial](https://docs.mihono.cn/zh/modpack/kubejs/1.20.1/KubeJSCourse/KubeJSAdvanced/RecipesSchemaAdded)
into the installed Minecraft 1.21.1 environment. Read [KubeJS Reference](kubejs.md)
for the wider coding workflow and [Development Standards](DEVELOPMENT_STANDARDS.md)
for project rules. Historical helper names are identified below; they are not
current native APIs.

## Evidence And Scope

The current API descriptions were checked against these installed files:

- `mods/kubejs-neoforge-2101.7.2-build.377.jar`
- `mods/kubejs-create-neoforge-2101.3.1-build.18.jar`
- `mods/create-1.21.1-6.0.10.jar`
- `mods/createmetallurgy-1.0.3-1.21.1.jar`
- `mods/rhino-2101.2.7-build.85.jar`
- `mods/ProbeJS-8.0.3.jar`
- Current `kubejs/server_scripts/Recipes/BasicRecipe.js` and its consumers

Evidence consists of installed schema/recipe resources and Java signatures or
bytecode for `RecipeSchemaStorage`, `RecipeSchemaRegistry`, `RecipeSchema`,
`RecipeKey`, component types, Create wrappers, Create Metallurgy's plugin and
ProbeJS's command registration. No schemas, helpers or recipes were installed
by this documentation change, and no new game launch or machine test is claimed.

The old source guide records a full reading of the article and its linked
[prelude.js](https://github.com/Prunoideae/-recipes/blob/1.20.1/src/prelude.js),
revision `6f59cff`. The historical notes below preserve that audit; this port
did not re-fetch those external sources. The old audit could not retrieve the
linked `RecipesSchema.java` downloads from the
[download host](https://cloud.mihono.cn/s/FPCmZY3ibF5JyDD/download/RecipesSchema.java)
or [documentation host](https://docs.mihono.cn/Files/RecipesSchema.java).
Their full contents remain unverified.

## What A Schema Adds

A schema describes an existing mod recipe serializer. It gives KubeJS typed
fields, constructors, chained functions, recipe matching and replacement. It
does not create a serializer, machine, processing rule or new registry item.
The target serializer and its codecs remain authoritative.

Start with a known recipe from the exact installed mod. Record the type,
keys, nesting, singular/plural shape, item/fluid distinctions, ranges, units,
input/output roles and actual serializer defaults. A familiar field name is
not sufficient evidence for a component choice.

## Current 2101 Registration Model

In this build the script event is `ServerEvents.recipeSchemaRegistry`, placed
in `kubejs/server_scripts/`. During server resources loading,
`RecipeSchemaStorage` loads JSON schemas, lets installed plugins register their
schemas, then posts this server event before recipes are discovered. Reload
server resources with `/reload` after a schema change. Startup item/block/fluid
registry changes still require a full restart.

`RecipeSchemaRegistry` exposes `namespace(name)` and `register(id, schema)`;
registration can also accept a registry-aware schema. `RecipeNamespace`
provides `register`, `registerBasic`, `shaped`, `shapeless`, `special` and
`withExistingParent`. It does not expose the old `event.getComponents()` or
`event.mapRecipe(...)` methods. Mapping names is a separate
`ServerEvents.recipeMappingRegistry` event whose registry provides
`register(name, recipeType)`.

JSON schemas load from `data/<namespace>/kubejs/recipe_schema/<path>.json`.
In the pack, such a file belongs under
`kubejs/data/<namespace>/kubejs/recipe_schema/<path>.json`; its schema ID is
`<namespace>:<path>`. A recipe JSON resource instead belongs under
`kubejs/data/<namespace>/recipe/`. These are different resources. Use an
installed schema as a reference rather than creating the tutorial's misspelled
`starup_scripts` directory or assuming its `@recipes` folder is required.

### Components And Key Roles

The 2001 factory names cannot be copied into a 2101 `getComponents()` call.
Current schemas compose component types explicitly:

| Historical article name | Current component concept |
| --- | --- |
| `outputItem` | `item_stack` with an output role for an ordinary stack; Create chance output uses `create:processing_output`; casting has its own component. |
| `outputItemArray` | A `list` of the appropriate item output component, with an output role. |
| `inputItemArray` | A `list` of `ingredient`, with an input role; use `sized_ingredient`/spread only when the serializer supports that count behavior. |
| `inputFluidOrItemArray` | A `list` of `either` sized fluid ingredient or item ingredient. Create uses `create:sized_fluid_ingredient`. |
| `outputFluidOrItemArray` | A `list` of `either` `fluid_stack` or the relevant item output component. |
| `outputFluidArray` | A `list` of `fluid_stack`, with an output role. |
| `doubleNumber` | `double` with the required range, or `ticks`/`int` when the serializer expects tick/integer values. |
| `bool` | `boolean`. |
| `nonEmptyString` | `string` is non-empty in this jar; use an enum component such as `create:heat_condition` when values are restricted. |

For native Java construction, verified classes include
`ItemStackComponent.ITEM_STACK`, `IngredientComponent.INGREDIENT`,
`BooleanComponent.BOOLEAN`, `NumberComponent.INT` and `TimeComponent.TICKS`.
Component types have `.inputKey(name)`, `.outputKey(name)` and `.otherKey(name)`.
Instances can be combined with `.or(...)` and `.asList()`. A key's role affects
recipe matching/replacement; calling a key `result` does not assign that role.
Do not infer 2101 numeric range/codec behavior from the old guide's 2001
clamping or truncation observations.

### Constructors, Optional Keys And Functions

Key order controls generated positional arguments, subject to optional and
excluded keys. `RecipeSchema.constructor(...)` can specify another key order.
Changing the schema order can break callers even when serialized key names
remain identical. Preserve both the constructor contract and JSON fields.

Verified current key operations include `.optional(value)`,
`.defaultOptional()`, `.alt(...)`, `.exclude()`, `.noFunctions()`,
`.functionNames(...)` and `.alwaysWrite()`. The old `.noBuilders()` or
`.preferred(...)` names are not current `RecipeKey` methods.

`.optional(value)` supplies the schema's default. `.defaultOptional()` marks a
special default-optional value; it does not inspect a third-party serializer
to discover its default. Do not copy the old claim that it simply stores null
into this version. Use an explicit default when its value matters and check
what omitted fields actually serialize.

`always_write`/`.alwaysWrite()` controls writing an omitted optional field.
The installed Create `processing_with_time` schema sets it on
`processing_time`; this does not make duration a required positional argument.
Check both omitted and explicitly supplied default-valued fields in a fixture.

Current key-generated function names convert snake case to camel case:
`processing_time` becomes `.processingTime(...)`, and `mold_consumed` becomes
`.moldConsumed(...)`. Named schema functions may have different contracts:
Create Metallurgy explicitly registers `moldConsumed()` to set the flag true.
Do not assume the historical `.mold_consumed(false)` method exists in 2101.
Use the generated schema dump and typings to distinguish setters from named
functions before calling them.

## Installed Create And Create Metallurgy Schemas

Prefer an installed integration before adding a new schema. KubeJS Create
provides the 21 schema resources listed in [KubeJS Reference](kubejs.md).
For example, the installed `data/create/kubejs/recipe_schema/milling.json`
inherits `create:base/processing_with_time`. Its parent ultimately defines:

- `results`: output list of fluid stacks or Create processing outputs
- `ingredients`: input list of sized fluid ingredients or item ingredients,
  with sized item ingredient spreading
- `processing_time`: ticks, optional 100
- `heat_requirement`: Create heat enum, optional `none`, excluded from the
  basic constructor; `heated()` and `superheated()` set this key

The sequenced assembly schema uses nested recipes, `transitional_item`, and
five default loops. The old four-loop default and camel-case raw JSON keys
are historical values.

The installed Create Metallurgy JAR also contains `kubejs.plugins.txt` and
`CreateMetallurgyKJS`. With this installed KubeJS/Create integration it
registers all five tutorial recipe types, plus foundry/entity types:

| Type | Installed integration |
| --- | --- |
| `alloying` | Inherits `create:base/processing`. |
| `grinding`, `melting` | Inherit `create:base/processing_with_time`. |
| `casting_in_table`, `casting_in_basin` | Inherit `createmetallurgy:base/casting`, built by `CastingRecipeSchema`. |
| `bulk_melting` | Inherits the time-writing foundry schema; heat keys retain the mod's `minHeatRequirement`/`maxHeatRequirement` spelling. |
| `entity_melting` | Uses the mod's entity ingredient/foundry integration. |

Do not overwrite these schemas with the old tutorial's external helper.
Casting's `result` uses the mod's `CastingOutput` component, not an ordinary
item stack component. The installed casting schema orders result, ingredients,
processing time and mold flag; time defaults to 100 and is always written;
`mold_consumed` defaults to false in that schema. The actual
`CastingRecipeSerializer` codec defaults omitted `processing_time` to 0 and
omitted `mold_consumed` to false. The schema default and serializer default
therefore differ for time: always-written schema time prevents silent reliance
on the codec's zero. Preserve explicit CWI durations. These inspected values
are not universal defaults for every serializer.

### A Current Casting Fixture

This is the installed resource
`data/createmetallurgy/recipe/casting_in_table/brass/plate.json`:

```json
{
    "type": "createmetallurgy:casting_in_table",
    "ingredients": [
        {
            "type": "neoforge:single",
            "amount": 90,
            "fluid": "createmetallurgy:molten_brass"
        },
        { "item": "createmetallurgy:graphite_plate_mold" }
    ],
    "processing_time": 60,
    "result": {
        "item": { "count": 1, "id": "create:brass_sheet" }
    }
}
```

Compare it with the historical fixture below: the duration is 60 rather than
80, the fluid ingredient carries a codec type, and the casting result wraps a
stack under `item`. These are concrete resource observations, not instructions
to rebalance the old pack recipe to those values. Preserve CWI's intended
amounts and timing when porting it.

Current CWI `tableCasting`/`basinCasting` already use
`result: { item: createRecipeOutput(results) }`. `createRecipeOutput` changes
helper item outputs to serialized stacks with `id`. Native Create builders
instead accept `CreateItem.of(Item.of(id), chance)` for chance outputs. Keep
raw JSON and Java wrapper contracts separate.

## Historical Tutorial And Helper Lessons

This section records the 1.20.1 article. Its JSON and helper calls are historical
examples, not runnable current CWI instructions. The initial casting fixture
used `processingTime: 80`, `mold_consumed: false`, and
`result: { item: 'create:brass_sheet' }`; its ingredients were a graphite mold
and 90 mB molten brass without the current typed fluid ingredient envelope.
The useful lesson is to derive a schema from the serializer's exact shape.

The article's five examples used these ordered keys and old factories:

| Historical serializer | Ordered fields and old factories |
| --- | --- |
| `createmetallurgy:casting_in_basin` | `result`: `outputItem`; `ingredients`: `inputFluidOrItemArray`; `processingTime`: `doubleNumber`; `mold_consumed`: `bool`. |
| `createmetallurgy:casting_in_table` | Same as basin casting. |
| `createmetallurgy:grinding` | `results`: `outputItemArray`; `ingredients`: `inputItemArray`; `processingTime`: `doubleNumber`. |
| `createmetallurgy:alloying` | `results`: `outputFluidOrItemArray`; `ingredients`: `inputFluidOrItemArray`; `heatRequirement`: `nonEmptyString`; `processingTime`: `doubleNumber`. |
| `createmetallurgy:melting` | `results`: `outputFluidArray`; `ingredients`: `inputItemArray`; `heatRequirement`: `nonEmptyString`; `processingTime`: `doubleNumber`. |

### External `prelude.js` Semantics

`new Schema(type).simpleKey(...)`, `ComplexKey` and their methods came from the
linked helper. They are not native globals in either CWI tree. No such helper
is installed in the target. The old audited helper:

1. Used priority 100, imported `RecipeSchema`, `RecipeComponentBuilder` and
   `RegistryInfo`, and collected `Schema` declarations in an array.
2. Recorded `simpleKey(name, factoryName, optional, alwaysWrite)` entries.
3. Looked up old component factories with `event.components.get(factoryName)()`,
   then called `.key(name)` in `StartupEvents.recipeSchemaRegistry`.
4. Left a key required when its third argument was `undefined`; used
   `.optional(value)` for a non-null supplied value, or `.defaultOptional()`
   when it was null.
5. Applied `.alwaysWrite()` only when a third argument was supplied and the
   fourth argument was truthy. An explicit chained setter wrote its received
   value; omitted optional values were the important always-write case.
6. Skipped registration when the serializer ID was absent, then otherwise
   registered `new RecipeSchema(keys)` through `event.register(type, schema)`.

It also exposed `ComplexKey.addKey`, `Schema.complexKey` and `Schema.dynamicKey`.
The inspected helper did not forward the `input` parameter from `complexKey`
to `ComplexKey`; that parameter therefore did not prove an input role. Check
actual component roles and matching behavior before reusing this design.
These implementation lessons remain useful, but the event, component lookup,
key signature and imports require a deliberate rewrite for 2101.

### Misleading Article Expressions And Typos

- `false || true` evaluates to `true`; it does not mean two allowed Boolean
  values. The article's helper receives one optional default.
- `'superheated' || 'heated'` evaluates to `'superheated'`; it does not create
  an enum or constrain accepted heat names.
- A non-empty string component does not restrict a value to valid Create heat
  conditions. Use the actual enum or serializer validation.
- Historical `event.recipe` should be `event.recipes`; `ServerEvent.recipes`
  should be `ServerEvents.recipes`.
- `starup_scripts` is misspelled, and the tutorial's `@recipes` folder is only
  an organizational convention.
- The old suggested defaults 100, true and `superheated` describe what its
  example executes. They are not values to apply to every CWI recipe.
- Guessing a component from a name and retrying is inadequate for production;
  inspect a known-good recipe and serializer first.

## Applying The Lessons Safely

1. Inspect the exact installed serializer and a known recipe; establish keys,
   ranges, optional defaults, components and input/output roles.
2. Check native/addon support before adding a schema. In particular, the five
   tutorial Create Metallurgy types already have installed support.
3. For an unsupported serializer, first prove one exact `event.custom(...)`
   fixture, then describe that same shape with current components. Keep
   constructor order and explicit stable IDs.
4. Put new script schema registrations in the current server event, or use a
   JSON schema resource. Reload server resources and inspect fresh
   `logs/kubejs/server.log` errors; restart only when startup registries changed.
5. Use `/kubejs recipe-schema-json <recipe-type>` to inspect the registered
   schema. Run `/probejs` to open ProbeJS 8.0.3's dump screen (permission level
   2), generate fresh definitions, then reload the editor. `/probe dump` and
   `/probejs dump` are historical commands, not this jar's registration.
6. Compare emitted JSON with the fixture, including omitted and explicit
   default-valued fields, output nesting, count spreading, chance and fluids.
7. Exercise the recipe in its machine and check the recipe viewer. A schema
   dump, syntax check or editor completion cannot prove machine behavior.
8. Convert an existing helper family only after proving equivalent output and
   behavior. Preserve IDs, quantities, output order, heat, duration, mold use
   and item component state.

No native script-registration binding example is claimed as game-tested here.
The public API and installed schema resources above establish construction
options; a future schema change still needs serializer and gameplay checks.
The current `AddItem`, typed `AddFluid`, `tableCasting`, `basinCasting`,
`melting` and `alloying` helpers remain the active pack implementation until a
separate, tested conversion is requested.
