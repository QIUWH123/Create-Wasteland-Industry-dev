# Steel Production — Historical Design

## Port Applicability — 1.21.1

This is the retained CWI 1.20.1 design and implementation record. The target
instance currently has no `kubejs/server_scripts/Multiblocked2/BlastFurnace.js`
or `ldlib/assets/mbd2/` machine definitions. The recipes, tanks, heat thresholds,
reinforcement requirements, bunker salvage and validation below therefore do
**not** describe a working 1.21.1 steel line. They have not been reimplemented
or playtested as part of the documentation transfer.

The author's standing requirement is first steel through the blast furnace,
with its complete pre-steel dependency chain checked first. The industrial
mixer and its blade must not become prerequisites for making their own steel.
Reuse of a machine as both a reducing furnace and an oxidising refining vessel
must be explained as a deliberate gameplay abstraction, as in the source text.

Treat the exact batches below as historical balance values, not a newly
approved design. In particular, the author later rejected added furnace
features/diagnostics and asked to leave further furnace work for later.
This document does not authorize restoring those changes, the firebox, or any
new schematic. Check the current machine implementation and obtain the
applicable design direction before resuming steel work.

For any future port, use current registered identities: native `tfmg:air`,
`kubejs:liquid_silicon`, and the existing molten-fluid handling for silicon and
slag. The source `tfmg:liquid_silicon` name and hot-air tank allowance below are
historical; do not restore a duplicate silicon fluid or hot-air production.
Current APIs are documented in [kubejs.md](kubejs.md). The
[realism audit](RECIPE_REALISM_AUDIT.md) retains the reasoning and accepted
simplifications around this design.

## Retained Design And Implementation Record — CWI 1.20.1


Steel is produced by the existing `cwi:blast_furnace`. The recipes are in
`kubejs/server_scripts/Multiblocked2/BlastFurnace.js`, alongside the existing pig-iron
and silicon recipes.

## Production flow

```text
iron feed + limestone + coke dust
        |
        v
superheated blast furnace -> molten pig iron + slag
                                    |
air + limestone + liquid silicon ---+
                                    v
                   superheated blast furnace, refining batch
                                    |
                                    +--> molten steel + slag
                                    |
                                    v
                   existing fireproof casting -> steel parts
```

An installation can switch between ironmaking and refining, or use separate
furnaces for continuous production. Drain its pig iron and slag before switching
to refining: these share the furnace's two output tanks with steel and refining
slag. Return the collected pig iron through a furnace hatch as an input.

## Batches

Both recipes require the existing `superheated` state (temperature at least
1900), and inherit the furnace's parallel capacity and temperature-based speed.
Each batch also consumes one `kubejs:limestone_powder` and one
`tfmg:coal_coke_dust` as its explicit charge.

| Route | Pig iron | Gas | Liquid silicon | Steel | Slag | Base duration |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| Air | 900 mB | 1,500 mB `tfmg:air` | 5 mB | 810 mB | 180 mB | 600 ticks |
| Oxygen | 1,800 mB | 600 mB `kubejs:oxygen` | 10 mB | 1,710 mB | 180 mB | 400 ticks |

Registered IDs:

- `cwi:industrial_blasting/pig_iron_to_steel_air_superheated`
- `cwi:industrial_blasting/pig_iron_to_steel_oxygen_superheated`

The quantities and durations are balance values. They represent 90% and 95%
metal recovery; they do not define an exact composition or chemical mass balance.
The two steel outputs cast into nine or nineteen ingots at the pack's existing
90 mB per ingot.

## First steel and progression

The furnace controller and hatch use cast iron and fireproof bricks. Existing
cast-iron production, air-intake construction, limestone milling, and fireproof
mold machining require no steel. A powered `tfmg:air_intake` produces the air
for the first refining batch. Quartz or quartz powder processed in the same
superheated blast furnace supplies `tfmg:liquid_silicon`.

Reinforcement for the first furnace can be salvaged from the starter bunker.
Both fresh and rusted reinforcement blocks drop themselves and require a
stone-tier pickaxe. The existing heat model needs at least 11 heater points and
33 armor points to exceed the superheated threshold. Pre-steel biodiesel can
superheat burners; reinforcement alone does not supply heat.

The industrial mixer and mixer blade retain their native steel recipes. The
oxygen route becomes available after steel vats and air-distillation equipment
can be constructed. It improves recovery and processing rate without being a
prerequisite for first steel.

## Furnace inputs and outputs

The multiblock definition is `ldlib/assets/mbd2/multiblock/blast_furnace.mb`.
The existing furnace hatches proxy its input traits.

- The liquid input now has two 3,000 mB tanks for pig iron and liquid silicon.
  A supplied fluid fills only one tank, preserving room for the other ingredient.
- The separate 6,000 mB gas tank accepts air and oxygen, alongside its existing
  hot-air allowance. These gases are excluded from the liquid input tanks.
- The two existing 3,000 mB molten output tanks hold steel and slag.
- The recipe display now shows all three fluid inputs and both outputs.

Use separate input pipes for pig iron, silicon, and the selected gas. Filter
steel and slag extraction into their own lines. When switching between air and
oxygen, empty the previous gas from the gas tank first. Existing hot air is
accepted by the machine but does not satisfy either steel recipe.

Off-gas is treated as vented, represented by the furnace's existing smoke.
There is no stored exhaust fluid or third output tank. The previous converter
recipes, cast-iron mixer shortcuts, and converter-exhaust registration have been
removed.

## Metallurgical abstraction

Real blast furnaces make carbon-rich pig iron in a reducing atmosphere.
Steelmaking subsequently oxidises excess carbon and impurities. Here the same
multiblock represents both operations through different batches: ore reduction
first, then an oxidising refining batch with an explicit air or oxygen input.
It is a shared machine abstraction, not a claim that an ordinary reducing blast
furnace directly refines steel.

Limestone stands in for slag-forming flux. Coke dust is now an explicit carbon
charge in every pig-iron recipe; the furnace's separate coke-filtered fuel slot
still supplies furnace fuel and heat. Silicon represents a deoxidising
addition after blowing, although all inputs are consumed in a single recipe.
The implementation does not add quicklime, a separate converter, carbon grades,
or a refractory-lining chemistry model. The existing ironmaking recipes and
external heater model remain as implemented; no new coke or hot-blast
consumption is added to them.

## Validation and playtest

Static checks cover script parsing and recipe registration, ingredient IDs,
heat requirements, casting compatibility, input filters and capacities, output
count, and recipe-display slots. The NBT editor roundtrips the original machine
files byte for byte and verifies only the intended fields changed.

Restart Minecraft to reload the MBD2 machine and recipe-display definitions.
In-game verification remains necessary: feed one complete air batch through
formed furnace hatches, extract steel and slag, and cast an ingot. Then verify
continuous liquid supply, parallel batches, blocked output tanks, gas switching,
and the oxygen upgrade.
