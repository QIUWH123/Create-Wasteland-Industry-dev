# Callable Item And Fluid Recipe API Proposal

**Status: proposed, not implemented or verified in Minecraft.**
Targets CWI's Minecraft 1.21.1 / KubeJS 2101 environment. This document specifies
work for the Core maintainer. It does not change Core, installed JARs or recipes.
The [current API reference](kubejs.md) remains the authority for writing scripts
until an implementation is installed and validated.

## Version Boundary

The Core artifacts inspected on 30 October 2026 have different item-output
behavior. A version name alone does not distinguish them:

| Core artifact | SHA-256 | Native item-output roll |
| --- | --- | --- |
| Installed pack JAR | `4a7159dd43337a358830aba8f2dc98f73b68486f82b31d89caa821b01277a989` | Whole entry per batch copy. |
| Reviewed newer local JAR | `32577ff3e5135b6a99885b2f08a098458ce05467965534864f9a093b01ad522b` | Per item; matches the inspected newer source. |

The API adapts to the selected build's native behavior; it does not choose or
change the probability model. Record a fresh fingerprint and transaction tests
for the actual implementation build. Installing a Core update with a different
roll model is a separate behavior change, not evidence of an equivalent API
migration. The earlier API guides describe older inspected artifacts; compare
their fingerprints before applying Core-specific behavior claims.

## Recommended Design

Make `Item(...)` and `Fluid(...)` construct immutable **recipe descriptors**:
values describing an ingredient or result, its quantity and supported recipe
options. Keep `Item.of(...)` and `Fluid.of(...)` creating actual game stacks.

```js
Item('2x kubejs:ash').withChance(0.25)
Fluid('250x minecraft:water').withChance(0.25)

Item('2x #c:ingots/iron')
Fluid('250x #cwi:water')
```

This replaces the recipe-value role of the retired `AddItem` and `AddFluid`
helpers. It does not restore recipe-forwarding functions or replace Minecraft's
stack APIs. A consistent spelling cannot make every recipe support every option.

| Approach | Assessment |
| --- | --- |
| Callable descriptors with existing static methods preserved | Recommended: explicit item/fluid identity, tags and recipe metadata without changing stack behavior. |
| Change `.of()` to sometimes return a descriptor | Avoid: callers and Java overloads can no longer rely on getting a native stack. |
| Attach recipe chance to native stacks | Avoid: ingredients can be tags, chance belongs to a recipe entry, and different processors interpret it differently. |

## Public Contract

| Call | Proposed meaning |
| --- | --- |
| `Item('namespace:id')` | Concrete item descriptor, count 1. |
| `Item('2x namespace:id')` | Concrete item descriptor, count 2. |
| `Item('2x #namespace:tag')` | Counted item-tag ingredient; never a concrete result. |
| `Item('namespace:id', 2)` | Equivalent explicit-count form. |
| `Item(nativeIngredient)` | Unsized item ingredient, count 1. |
| `Item(nativeSizedIngredient)` | Preserve the existing item ingredient and count. |
| `Fluid('250x namespace:id')` | Concrete fluid descriptor, amount 250 mB. |
| `Fluid('250x #namespace:tag')` | Sized fluid-tag ingredient. |
| `Fluid('namespace:id', 250)` | Equivalent explicit-amount form. |
| `Item(nativeStack)` / `Fluid(nativeStack)` | Copy its identity, quantity and data components into a descriptor. |
| `Item(nativeIngredient, count)` | Preserve an existing item ingredient, including alternatives or component predicates, with an explicit count. |
| `Fluid(nativeSizedIngredient)` | Preserve the existing fluid ingredient and its amount. |
| `Fluid(nativeFluidIngredient, 250)` | Preserve an unsized fluid predicate with an explicit amount. |
| `Item(itemDescriptor)` / `Fluid(fluidDescriptor)` | Independent copy retaining quantity, supplied options and explicit-option markers. Opposite-kind descriptors are rejected. |
| `.withChance(p)` | Return a new descriptor with a probability, interpreted only by a supporting recipe field. |
| Item descriptor `.withWeight(w)` | Set a strictly positive relative weight, supported only by assembly final results in the first release. Fluid descriptors do not expose this method. |
| `.perTick(enabled = true)` | Set Core machine timing explicitly; accepts only a boolean. `false` restores batch timing on a copied descriptor. |
| `.toStack()` | Copy a concrete descriptor into an actual stack when it has no recipe-only metadata. |

Keep the initial API small. Existing stack builders and ingredient APIs provide
enchantments, components and complex predicates; the new factories wrap their
results rather than forwarding every stack method.

Parsing rules:

- Canonical counted tags are `2x #c:ingots/iron` and `250x #cwi:water`.
  Accept the earlier requested `#2x c:ingots/iron` / `#250x cwi:water` as
  compatibility aliases, normalizing to the canonical form.
- A bare item ID or item tag defaults to count 1. Fluid amount is mandatory;
  do not invent a default bucket size.
- Reject two quantity declarations, such as `Item('2x kubejs:ash', 3)`.
  A source stack or sized ingredient already supplies its quantity.
- Counts and mB amounts must be positive integers within the receiving native
  type's range. Reject fractions, overflow, malformed IDs and unknown syntax.
  Do not clamp or truncate. The descriptor need not fit one inventory slot;
  the receiving recipe's actual limits still apply.
- `#` selects a tag in the descriptor's registry. Never guess from tag members.
  In this pack `#cwi:water` is a fluid tag containing water and distilled water;
  `cwi:water` is not a concrete registered fluid. Registering an item does not
  automatically create an identically named tag.
- A factory must copy mutable native values. A descriptor's methods return
  independent copies; modifying the source stack later must not alter a recipe.
- Repeating the same option replaces it immutably. Chance and weight together
  are an error in either call order. Unsupported explicit options are rejected
  at their receiving field, even `.withChance(1)` or `.perTick(false)`.
- Reject empty/malformed values and ambiguous raw arrays/objects. Use the
  appropriate native ingredient builder for alternatives or complex predicates,
  then wrap that value. Factories do not guess a serializer from arbitrary JSON.

## Descriptors And Actual Stacks

A native stack is the game's concrete item/fluid object: one registered type,
quantity and component data. Inventories, entity drops, creative-tab icons and
many Java callbacks need that object, not a tag or a probabilistic recipe entry.

```js
const result = Item('2x kubejs:ash')
const stack = result.toStack()

const original = Item.of('kubejs:ash', 2)
```

Both `stack` and `original` above are actual stacks. `result` remains a recipe
descriptor. `.toStack()` must return a fresh stack each time and reject:

- Tags, ingredient alternatives and input-only predicates.
- Explicit `.withChance(...)`, `.withWeight(...)` or `.perTick()` metadata,
  including otherwise default-valued options. Conversion must not erase intent.

Keep current native-stack sites native. Examples in this pack include
`startup_scripts/CreativeTab.js`, entity-item assignment in
`server_scripts/Interactions/ItemFalling.js`, enchanted drill construction in
the progression scripts, and component-bearing extinguisher stacks in
`server_scripts/Recipes/IndustrialSupplies.js`, all under `kubejs/`.

Do not add fake inventory, entity or Java-stack behavior to descriptors. A stack
with recipe chance is not an inventory item that carries a chance to exist.

## Chance And Weight

Use the processor's existing behavior. Do not change its random rolls to make
the new spelling appear uniform.

| Receiver | Meaning and required behavior |
| --- | --- |
| Ordinary Create item processing output | Native roll per item: count 2 at 25% can produce 0, 1 or 2 items. |
| Core machine item output, installed artifact above | Whole-entry roll: count 2 at 25% produces 0 or 2. |
| Core machine item output, reviewed newer artifact above | Per-item rolls: count 2 at 25% can produce 0, 1 or 2. |
| Core machine fluid output, both reviewed artifacts | Whole-entry roll: 250 mB at 25% produces 0 or 250 mB per batch copy. |
| Core hammer drops | Preserve the native per-item rolls. |
| Core machine item/fluid input | Consumption probability; the full matching quantity must still be available. Chance 0 means required presence without consumption. |
| Create sequenced-assembly final result | Relative weight, using `.withWeight(w)`; one result is selected according to all result weights. |
| Create assembly transitional item | Concrete intermediate, count 1; reject chance, weight and timing metadata. Its schema output role does not make it a weighted result. |
| Ordinary Create fluid result | Deterministic fluid stack. Reject `.withChance(...)`; adding probabilistic fluid execution would be a separate gameplay/runtime feature. |
| Ordinary crafting, ordinary ingredients and other deterministic fields | Reject explicit chance unless that particular serializer and runtime support it. |

Descriptor probabilities must be finite numbers in `0..1`. Weights must be
finite and strictly positive; zero-weight descriptors are not supported in the
first release. Receiver codecs can impose tighter limits:

- Create 6.0.10 processing outputs require positive native floats for both
  chance and weight. Reject explicit zero; do not silently delete the output,
  which can change result ordering, the displayed primary result and IDs.
- Create processing-output counts are `1..99`, including weighted results.
  Do not split an oversized output automatically. Other receivers retain their
  own stack codec and capacity limits, not a universal count limit of 99.
- Validate before and after native float conversion. Reject positive values
  that become zero and values that become infinity. Normal float rounding is
  allowed; truncation, clamping and meaning-changing normalization are not.
- Validate assembly totals in their existing order using native float
  accumulation; the total must remain finite and positive. Do not reorder
  results to change rounding or clamp weights to `0..1`.

Thus `.withChance(0)` remains useful for Core input catalysts, while a Create
output rejects it with its own field-specific explanation. These stricter
descriptor checks do not retroactively change existing native `CreateItem`
calls or repair existing recipe data.

For an assembly result with no option, use native default weight 1. Reject
explicit `.withChance(...)` there and direct the writer to `.withWeight(...)`.
Existing `CreateItem` calls remain valid and unchanged. Nested processing steps
keep their ordinary processing rules; they do not become weighted final results
merely because they are inside an assembly.

Do not roll randomness while parsing, serializing, displaying, simulating or
reloading recipes. Native execution owns rolls and transactions. Input
consumption chance and output chance are independent entry properties. Per-tick
entries repeat their native roll on successful working ticks; this does not
create a different probability model.

## Components, Tags And Complex Inputs

Preserve stack data components using the installed Minecraft 1.21.1 codecs.
Wrapping a customized native stack is the primary route for component-bearing
outputs; do not introduce an arbitrary legacy `nbt` field.

Input matching is explicit in the first release:

- Concrete descriptors without explicit component patches match the registered item/fluid
  type, using the receiver's ordinary ingredient semantics.
- Stack descriptors with explicit component patches are output values. Reject them as inputs
  in the first release; require a wrapped explicit native ingredient predicate
  for component matching. Do not inherit differing stack-to-ingredient defaults
  from KubeJS and Core by accident.
- Wrapped ingredient predicates retain their exact/partial matching,
  alternatives, component removals and symbolic tag identities. Publish the
  tested predicate codecs; do not reduce them to lists of matching IDs.

Inherited default components do not themselves make an ordinary ID or native
stack an explicitly component-bearing input. Inspect the component patch,
including removals, rather than whether the item has any default components.

Promise snapshot immutability only for verified codec-round-trippable native
stacks and registered ingredient predicates. Encode a private deep snapshot
with the proper registry ops and reconstruct fresh native values at adapter
boundaries. Never keep exposed mutable stacks, maps, ingredient arrays or
resolved tag-member caches. Preserve tag references in the snapshot.

Opaque callbacks, stateful custom predicates and values without a verified copy
contract are rejected by the descriptor factory; their existing native APIs
remain available. If registry context is required to snapshot a native value,
construct that descriptor in the recipe event; ordinary ID/tag descriptors can
remain unresolved until then. Do not advertise arbitrary custom ingredient
support or defer a mutable native reference until later.

Tags stay symbolic ingredients through loading and reload. Never resolve a tag
to its first member, including for outputs or `.toStack()`. Tag results are
rejected; this proposal adds no preferred-member selection policy. Components
on tag inputs require a real supported ingredient predicate, not an invented
tagged stack.

Preserve alternative ingredients, repeated slots and counted-input expansion.
For example, two consumed items, two crafting-grid slots and two ingredient
alternatives are different requests. Expand a counted descriptor only where
the receiving schema already supports equivalent count spreading; otherwise
reject it or retain the native representation. Check the effective list/grid
and machine limits before allocating or expanding repeated entries. A valid
32-bit count must not trigger billions of allocations.

Molds, tool damage, held-item conditions, equipment transmutation and Lychee
actions retain their own recipe fields and APIs. They are not all variants of
chance or consumption count.

## Core Implementation Boundary

Expose callable `Item` and `Fluid` bindings that delegate existing properties
and methods to the original KubeJS bindings. Preserve `Item.of`, `Item.exists`,
`Fluid.of`, `Fluid.exists`, `Fluid.getType`, `Fluid.ingredientOf`,
`Fluid.sizedIngredientOf` and every existing overload. Do not replace their
native stack converters with descriptor converters.

This is feasible from the inspected Rhino function/binding interfaces, but the
delegation has not been implemented or exercised in the target runtime.
Preserve saved method references, overload selection and access in startup,
server and client script managers; property names alone are not sufficient.
Install the decoration after the native binding exists, without wrapping it
again on reload. Preserve exposed constructor, `hasInstance` and Java-class
unwrap behavior. These globals wrap KubeJS utility interfaces, not Minecraft's
item/fluid classes: do not redefine `stack instanceof Item`, or introduce
`new Item(...)` / `new Fluid(...)` as extra descriptor factory aliases.
Include ProbeJS definitions for callable signatures, delegated static methods
and distinct descriptor/native-stack return types.

The new tag spelling belongs to `Fluid(...)`. This proposal recommends leaving
`Fluid.of(...)` as the native-stack API instead of making it sometimes return
a tag ingredient. That supersedes the earlier planned fluid-tag overload only
if this design is adopted; current guides still describe installed behavior.

Use explicit descriptor types and recipe-component adapters. Each adapter knows
the component, recipe type, exact field, input/output role, nesting/spreading
context, codec and supported metadata. An output role or Java class alone
cannot distinguish an assembly result from its transitional item.

Route mixed lists by descriptor identity before coercion or alternative-branch
selection. An item descriptor always selects the item branch; a fluid descriptor
always selects the fluid branch, even if both registries have the same tag name.
Fix priority selection as well as wrappers: the inspected KubeJS either-component
does not retry another branch after a prioritized branch throws. An unsupported
fluid chance must retain its fluid-field error, not fall through to item parsing.

Apply adaptation consistently at positional constructors, generated setters,
custom schema functions such as `.input()`/`.output()`, `recipe.set` and
replacement-value arguments. Some schema functions run `Context.jsToJava` from
their `TypeInfo` before calling a component wrapper. Intercept descriptor values
at that recipe boundary before information is lost; wrapping components alone
does not establish setter support. Keep non-descriptor argument conversion
unchanged and do not alter global native-stack converters.

## First Release Field Matrix

The initial release covers the exact fields below. All quantities, chance and
timing remain subject to codec, recipe and machine validation. `Chance` means
the native probability rules above; `timing` means Core `per_tick`.

| Recipe type | Field | Descriptor and quantity | Allowed explicit metadata |
| --- | --- | --- | --- |
| `cwi:mixing_vessel_mixing` | `item_inputs`, `fluid_inputs` | Item ingredient/count; fluid ingredient/mB; no spreading. | Chance, timing. |
| `cwi:mixing_vessel_mixing` | `item_outputs`, `fluid_outputs` | Concrete item/count or fluid/mB. | Chance, timing. |
| `cwi:blast_furnace_processing` | `item_inputs`, `fluid_inputs` | Item ingredient/count; fluid ingredient/mB; no spreading. | Chance, timing. |
| `cwi:blast_furnace_processing` | `fluid_outputs` | Concrete fluid/mB; item outputs remain forbidden. | Chance, timing. |
| `cwi:incubating` | `item_inputs` | Exactly one item ingredient, count 1; no fluids. | Chance; timing forbidden. |
| `cwi:incubating` | `item_outputs` | Concrete item/count; no fluids. | Chance, timing, subject to native execution tests. |
| `create:mixing` | `ingredients` | Item ingredients with bounded count spreading; fluid ingredients/mB. | None. |
| `create:mixing` | `results` | Concrete items/count or fluids/mB. | Chance on items only. |
| `create:filling` | `ingredients` | One item ingredient/count 1 and one sized fluid ingredient. | None. |
| `create:deploying` | `ingredients` | Two item ingredient entries, operated item then applied item, each count 1; no fluids or count spreading between these positions. Preserve held-item rules. | None. |
| `create:pressing` | `ingredients` | One item ingredient/count 1; no fluids. | None. |
| `create:filling`, `create:deploying`, `create:pressing` | `results` | Concrete items/count only; maximum result entries 1, 4 and 2 respectively. | Chance on item processing outputs only. |
| `create:sequenced_assembly` | `ingredient` | One item ingredient, count 1. | None. |
| `create:sequenced_assembly` | `results` | Concrete item/count, native output bounds. | Weight only. |
| `create:sequenced_assembly` | `transitional_item` | Concrete item, count 1. | None. |
| `create:sequenced_assembly` | `sequence` | Adapt the named filling/deploying/pressing step fields above; preserve nested recipe objects and order. | Ordinary step rules; final-result weights never apply here. |

Core mixed `inputs`/`outputs` constructor aliases and their `.input()`/`.output()`
setters route to the listed native fields. Core counts remain counted entries;
they do not spread into repeated ingredient slots. The incubator plate's
render-only preparation data is outside this API.

The inspected Core limit is 64 entries per native item/fluid channel. Create
mixing permits up to 64 item ingredient entries after spreading and two fluid
inputs, with up to four item result entries and two fluid results. These codec/
recipe limits do not promise that quantities fit the physical basin inventory
or tanks. Keep native capacity/transaction checks. For deploying, do not merge
the operated and applied ingredient positions even when both use the same ID.

All input rows use the explicit predicate/component policy above. All output
rows reject tags and ingredient predicates. This matrix does not expand native
slot/tank capacities or permit unsupported fluids. If the precise receiver limit
cannot be established, that adapter is not ready to ship.

Implement shared machinery where useful, but certify each listed field and
entry path. Unlisted descriptor uses produce an unsupported-field error, even
if they happen to share a component. Existing native values remain available.
Add explicit rows and acceptance fixtures before extending to vanilla crafting,
other Create types, Create Metallurgy, Vintage, Core hammer/fan/upgrades and
other addon schemas. This is a staged API release, not a promise that the first
release can migrate every pack recipe.

Lychee is deferred from the first release. Later support must target the
installed 6.7.2 contract; Core's older private 6.5.3 test dependency cannot
establish compatibility. Keep contextual conditions, empty-hand inputs and post
actions native; a generic stack descriptor does not replace those APIs.

`event.custom(...)` still follows its serializer's JSON contract. A descriptor
is not universal JSON and must not produce an arbitrary `toJSON()` shape. Use
a supported schema builder or the exact native JSON where no adapter exists.
Recipe matching and serialization must see the adapted ingredient or output
with its count, components, chance, weight and per-tick settings.

## Replacement Policy

New descriptor replacements replace the **complete matched entry**. They are
not patches. Quantity comes from the descriptor; omitted chance defaults to 1,
omitted assembly weight to 1, and omitted timing to batch (`per_tick: false`).
Use the descriptor's component data or explicit predicate; do not inherit old
component patches. Required shape and metadata are checked against the destination
field before modifying that matched entry. This promises no whole-operation
rollback of earlier matches if a later match fails.

Plain ID and existing native/structured replacements keep their existing
receiver-specific behavior. Do not globally change those APIs to make their
semantics match the new descriptor rule. Descriptor handling must run before
converting it into a native stack, which could select the wrong legacy path.

Examples start from an item result with count 4 and chance 0.25 at batch timing,
or count 4 and weight 0.25 for assembly:

| Replacement value | Core machine item output | Ordinary Create item result | Assembly final result |
| --- | --- | --- | --- |
| Plain `'namespace:new'`, a different item ID | Count 4, chance 0.25, batch. | Count 1, chance 0.25 in inspected KubeJS Create 18. | Count 1, weight 0.25 in inspected KubeJS Create 18. |
| `Item('namespace:new')` | Count 1, chance 1, batch. | Count 1, chance 1. | Count 1, weight 1. |
| `Item('2x namespace:new')` | Count 2, chance 1, batch. | Count 2, chance 1. | Count 2, weight 1. |
| `Item('namespace:new').withChance(1)` | Count 1, chance 1, batch. | Count 1, chance 1. | Reject probability metadata; use weight. |
| `Item('namespace:new').withWeight(2)` | Reject weight. | Reject weight. | Count 1, weight 2. |
| `Item('namespace:new').perTick()` | Count 1, chance 1, per tick. | Reject timing. | Reject timing. |

Apply the same complete-entry rule to item inputs and fluid inputs/outputs.
For example, replacing a 250 mB/chance-0.25 Core entry with
`Fluid('100x minecraft:water')` yields 100 mB, chance 1 and batch timing; a plain
fluid-ID replacement retains its existing native inheritance rules. All
descriptor input predicates are replaced, not intersected with the old predicate.
No new merge/patch API is needed for the first release. For a partial change,
retain the existing native replacement form or specify the full desired entry.
The plain-ID examples do not promise to preserve old component patches. Existing
native replacement behavior, including a same-item no-op, stays unchanged.
Same-ID descriptor replacements still apply their complete new entry, including
changed quantity or options; do not accidentally use a legacy same-item no-op.

## Validation And Error Policy

Validate syntax and numeric options immediately. Validate registry membership,
required nonempty tags and serializer constraints when the relevant registries
and tags exist. Preserve optional-mod guards: absent optional results must be
filtered before descriptors that require those registrations are constructed.
Do not resolve tags or retain registry-dependent caches across resource reloads.

Reject unsupported information rather than silently dropping it. For example,
an error should identify the recipe ID when available, recipe type, field and
entry index, and explain that `create:mixing` fluid outputs do not support chance
or that an output cannot be an item tag. Preserve a useful script source location.
A later chained `.id(...)` cannot identify an earlier constructor failure; show
the available type, field/index and source location instead. Preserve that
diagnostic through list, spreading and either-component adapters.

Empty-hand conditions and empty results retain their schema-specific native
representations; do not turn invalid/empty descriptor values into air or an
empty stack as a fallback.

## Delivery And Migration

1. Core maintainer implements factories, immutable values, binding delegation,
   ProbeJS types and focused adapter tests without migrating pack recipes.
2. Test against the installed dependency versions and publish a capability list
   matching the exact first-release fields and entry paths, including rejected
   options. Extra schemas require additional explicit capability rows.
3. Install the approved Core build and verify startup, server reload, client
   access and representative execution before using it in production scripts.
4. Migrate recipe arguments in small groups. Keep `.of()` for actual stacks and
   retain native values wherever an adapter is unavailable. Do not globally
   replace `Item.of`, `Fluid.of`, `CreateItem.of` or sized ingredients.
5. Compare native serialized recipes before/after on initial load and reload.
   Update the current API reference and standards only for verified support.

Preserve IDs, input/output order, components, quantities, probabilities,
assembly weights, time, heat, molds, consumption rules and generated families.
Keep optional-mod/capacity guards and actual family generators. Existing scripts
must continue working before migration; this feature must not require everyone
to adopt the new spelling at once.

## Acceptance Checks

- Existing static calls, overloads and saved method references work in each
  script manager. Creative icons, drops and inventory/equipment callbacks still
  receive actual native stacks. Optional hooks do not prevent Core loading
  without KubeJS or absent optional addons; no new mandatory dependencies.
- Canonical/alias syntax, explicit quantities, native-stack copies, complex
  ingredients and mixed item/fluid lists serialize to the expected native data.
  Compare constructors, generated setters, custom schema functions, `recipe.set`
  and replacements, including scalar/list values and nested assembly steps.
- Reusing a descriptor or modifying its source stack cannot mutate other recipes.
  Component predicates retain their intended exact/partial matching and removals.
  Opaque predicates and component-bearing concrete input descriptors are rejected.
- Tags remain live across reloads; tag outputs, invalid quantities, missing
  required registrations and unsupported metadata produce useful errors.
  Identical item/fluid tag names route by descriptor kind. Fluid metadata errors
  survive union dispatch. Count bounds are checked before spreading allocations.
- Create probabilities/weights reject zero, native float underflow/overflow and
  result count 100; counts 1 and 99 pass that codec boundary. Core chance 0 keeps
  its native supported meaning. Test ordered assembly float totals and reject
  weighted/transitional metadata at the wrong field.
- Create per-item rolls and the selected Core build's documented item roll model,
  whole-entry fluid/input rolls and per-tick IO retain their native behavior.
  Failed simulations and repeated reloads never consume inputs or generate rolls.
  Test native behavior before/after adaptation against the same Core artifact.
- Recipe lookup and plain ID replacement preserve their receiver-specific rules;
  descriptor replacements follow the complete-entry table and reject invalid
  destination metadata before modifying a recipe.
  Native recipe payloads and ID sets match the baseline, allowing only separately
  demonstrated pre-existing generated suffix permutations.
- ProbeJS dumps expose callable signatures, delegated static overloads and
  distinct descriptor/stack types. Validate generated declarations; Java
  reflection alone does not establish correct editor support.
- Client recipe display and representative machine/crafting execution agree
  with serialized data; successful parsing alone does not establish this.

## References And Evidence Limit

The inspected baseline is KubeJS 2101.7.2-build.377, Rhino 2101.2.7-build.85,
KubeJS Create 2101.3.1-build.18 and Create 6.0.10. The installed KubeJS stack
`.withChance()` deliberately throws on this version; `CreateItem.of(...)`
currently provides Create processing outputs. This proposal does not change
that existing method.

Review validation reran the existing standalone native either-dispatch, Create
codec and count-boundary probes. They confirmed three branch-routing cases,
zero/float-range rejection, and counts 1/99/100 on encode/decode. Core source,
installed/reviewed JAR fingerprints and existing roll evidence were also checked.
These checks exercise native infrastructure, not the unimplemented descriptor
bindings, adapters or their client presentation. No game launch was performed.

See [Recipe API](KUBEJS_RECIPE_API.md), [CWI Core API](CWI_CORE_API.md),
[Events And Builders](KUBEJS_EVENTS_AND_BUILDERS.md) and
[Development Standards](DEVELOPMENT_STANDARDS.md) for the inspected current
contracts. Source/binary inspection supports the design; implementation tests
and runtime acceptance are still required. Creating this proposal performs no
Core modification, recipe migration, gameplay change or new schematic work.
