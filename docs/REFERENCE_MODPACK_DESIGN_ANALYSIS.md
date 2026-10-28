# Reference Modpack Design Analysis

## Port Applicability — 1.21.1

Transferred on 27 October 2026 from the CWI 1.20.1 documentation. The retained
review below describes its original review date and source snapshot. CWI
implementation claims, installed-mod checks, recipe quantities, calculated
rates, quest counts, mocks, and validation results are **historical 1.20.1
evidence**, including any wording such as “current”, “now”, or “passes”. They
are not validation of this 1.21.1 port. External-game and archive observations
retain their original versions and dates; they were not refreshed during this
transfer.

The target currently has startup/server scripts, but no client scripts or MBD2
machine scripts; the server hammer interaction is also omitted. Quests,
worldgen, and structures have not been ported. A starter script that requests
bunker placement does not prove the missing templates
exist or that the opening works. JEI/Ponder teaching, furnace/incubator/mixing
vessel behavior, lava-extractor operation, and the historical quest projects
therefore remain unavailable or pending dependencies. Check the
[current KubeJS reference](kubejs.md) before adapting any API or gameplay claim.

Standing decisions still apply: refine the opening before Electrical Age;
quests inform rather than lock recipes; do not add trivial recipe repetition
to JEI; preserve the reusable glass additives and removed revival-route decisions.
Do not restore the rejected furnace diagnostic, revive the firebox, or add
conversion/shared-tag bridges for retired duplicates. Retain
`kubejs:sulfur_powder`, native `tfmg:air`, and native TFMG liquid asphalt and
concrete as the chosen identities. No new schematics are authorized; all
schematic files, bills, and suggested examples below are historical design
context, not ported assets or new deliverables. Recheck current sources and
observe operation before claiming any historical yield or rate is active.

## Retained Review — CWI 1.20.1

Original review date: 2026-10-25

## Purpose And Scope

This report studies five supplied CurseForge exports as design references for
CWI: CABIN 2.1.7, DeceasedCraft Beta 5.10.17, Desolate Planet 1.8.6.0, The
Legend Of 2900 1.3.2, and The Winter Rescue 0.6.0-rc8. The goal is to identify
design techniques CWI can adapt, failure modes it should avoid, and a practical
priority order for its own progression.

The review is source based. All 2,186 quest entries were parsed or reviewed;
KubeJS scripts, data files, selected configs, worldgen definitions, starter
structures, and localized text were examined at the level described in each
pack section. The exports reference many native mod jars without including
them, so native serializer behavior, machine registration, combat pacing,
worldgen frequency, performance, and multiplayer behavior were not proved. A
finding marked **configured** is present in supplied files; **design reading**
is an interpretation of its likely player effect; **runtime question** needs a
live world check.

CWI remains the reference point: an isolated recovery story built around
geography, geology, chemistry, biology, custom machinery, and eventual
restoration. Its quests explain and record progress without locking gameplay.
The intended blast-furnace steel bootstrap from 1.20.1, native `tfmg:air`
identity, deliberate recipe abstractions, author-removed revival routes, and
deferred mechanics remain design constraints. The blast furnace itself has not
been ported; its old recipe graph is not a working target capability.

No one reference pack is a universal winner, and source review alone cannot
prove CWI is better in play. CWI's strongest opportunity is to connect mechanics
that these packs often specialize separately: field exploration identifies a
material, geology and biology supply it, processing turns it into a useful
service, and restoration gives that service a purpose. The accepted Stargate
ending is not implemented yet, so the later payoff remains a design target.

## Executive Findings

The best shared pattern is **a constraint that becomes a useful capability**.
Winter Rescue turns heat into farming, clothing, travel, and machinery. Desolate
Planet turns exploration into access to damaged industrial equipment. CABIN turns
physical routing into digital relief. DeceasedCraft gives repeated expeditions a
reason to automate ammunition and power. Legend of 2900 makes geography and
structures feed metallurgy and equipment.

The best CWI version of this pattern is:

1. Let geology and field collection create a real early workshop problem.
2. Let chemistry and biology solve that problem in stages.
3. Make each new machine improve a visible service: safe processing, reliable
   tools, usable containers, agricultural recovery, or restoration stock.
4. Retain useful demand after an upgrade, while improving rate, yield, safety,
   storage, or handling.
5. Make every scarce input discoverable, recoverable, or explicitly marked as
   a future/unimplemented route.

The strongest things to avoid are opaque destructive failure, mandatory
administrative puzzles, quest books that confuse possession with operation,
unbounded parallel survival systems, and convenience rewards that silently
replace the factory the player was meant to build.

## Pack Reviews

### CABIN

**Observed structure.** The 1.20.1 Forge export contains 1,004 files, 486 FTB
quests, and 104 KubeJS scripts. A manual bootstrap makes the first kinetic
mechanism; machine frames repeatedly consume eight mechanisms. The certus/fluix
line circulates water and seeds, charged certus, redstone fluid, quartz, tubes,
and precision mechanisms. Ferns have a reserve-and-regeneration loop. Late
silicon feeds printed circuits and digital storage. An optional code-discovery /
Mastermind branch offers an alternate silicon route; deterministic silicon and
ordinary charged-tool laser processing still exist.

**What works.** Repeated intermediate demand gives early automation a purpose.
Material circulation makes the player protect starter stock instead of assuming
every recipe is a one-way sink. Byproducts and color outputs create actual
buffering and routing decisions. The 75% stop / 25% restart stock rule and a
central stalled-output concept are unusually practical operations guidance.
Quests are explicitly informational and use JEI, Ponder, and short tooltips for
different questions.

**What to adapt to CWI.** Write operating notes around bottlenecks, output
buffers, recovery, and restart conditions. Keep a culture/catalyst reserve where
the retained biology actually supports it. Reward early physical processing
with a useful service before digital storage becomes available. Use optional
experiments only when a deterministic core route remains clear.

**What to avoid.** A machine frame requiring eight mechanisms can become a tax
on every expansion. Sixteen press passes and a very large final matrix bill can
become waiting after the layout decision is solved. A divide-by-zero path that
creates a strong TNT-style destructive failure is memorable but hostile to a
factory-building pack. Laser damage is a good spatial planning idea only when
the hazard and shutdown method are visible.

**Evidence.** `cabin_review.md` and `cabin_evidence.json` in the review bundle;
notable supplied paths include `overrides/kubejs/server_scripts/`,
`overrides/config/ftbquests/`, and the custom processing recipes.

### DeceasedCraft

**Observed structure.** The export contains 5,873 files, 30 FTB chapters, 801
quests, 108 KubeJS scripts, 130 NPC dialog records, 149 trader offers, and
separate horde/infection/spawn configurations. The archive filename says
5.10.17, while its manifest says 5.10.16. Hordes are enabled, use a 15-day
per-player-time interval with zero configured variation, pause when the server
is empty, and scale for nearby players. Claims exist, but the config warns that
modded block breaking may bypass ordinary protections. The industrial route
supports repeated ammunition and expedition preparation. Farm output can be
converted into currency, and NPCs can sell metals, medicine, guns, blueprints,
and storage machinery.

**What works.** A predictable horde clock turns reserve manufacturing into a
meaningful preparation choice. Corpses and configured lava/void recovery reduce
the cost of learning dangerous exploration. Ammunition is a good example of a
consumable factory product whose value comes from repeated use rather than a
single quest hand-in. NPCs give multiplayer specialization and a bad-luck relief
route.

**What to adapt to CWI.** Give chemistry, tools, or biological cultures a
repeatable field use that justifies stock buffers. Use deterministic warnings and
recovery for hazards. A limited salvage allocation can fill an unlucky missing
input if it fits the recovery fiction. Model team/offline behavior as part of
the system, not as an afterthought.

**What to avoid.** The quest data contains 627 item tasks and 17 kill tasks;
possession is weak evidence that the player built or operated a line. Currency
can bypass much of the intended manufacturing if
farm prices and trader stock are generous. A cure route starts with a ten-apple
requirement while the later recipe needs Formula X; the export does not prove
that the bootstrap is available. Research-book and X-factor durability imply
reusable tools, but the supplied Create recipes omit explicit keep/damage
behavior, so copying the pattern without a runtime check is risky. NPC narrative
and native mod behavior are only partly reconstructable from the export.

**Evidence.** `deceasedcraft_evidence.json` and its index in the review bundle;
notable supplied paths include `overrides/config/hordes-common.toml`,
`overrides/kubejs/server_scripts/recipes/deceasedcraft/`,
`overrides/config/ftbquests/quests/`, and `overrides/customnpcs/`.

### Desolate Planet

**Observed structure.** The 1.20.1 Forge export contains 2,734 files, 144 HQM
quests across seven sets, 70 server scripts, 23 startup scripts, 11 client
scripts, 1,258 OpenLoader files, and 329 NBT structures. The MAT opening is an
explicit crash-survival report on planet T4L0S. The starter ship supplies a
centrifuge, bottler, empty energy cube, flux capacitor, sieve/mesh, tools,
weapon supplies, and a quest interface. The core arc moves from survival and
sieving through shared machine frames and PCB processing into power, nuclear
systems, AE2, and an explicitly unfinished space section. The quest system can
offer a short Create guide or an irreversible longer guide.

**What works.** Starter equipment demonstrates the first industrial verbs before
the player can craft them. A coherent MAT voice gives objectives without
pretending every side quest is the main route. The shared machine-frame/PCB arc
makes unrelated mods serve one recovery objective. Machine upgrades change the
kind of work the player can do instead of only increasing numbers. The short or
long guide choice respects different experience levels.

**What to adapt to CWI.** Use the laboratory wreckage as a teaching surface:
let the player inspect and operate one safe prototype before manufacturing its
replacement. Provide a compact practical route and optional deeper reference
pages. Tie custom machine families to one visible restoration service.

**What to avoid.** A starter structure can conceal whether the player learned
to build a system or merely inherited it. HQM's irreversible guide choice is a
poor fit for CWI's evolving quest prose. The pack is explicitly unfinished, and
its space arc should not be treated as a complete endgame. A late water
condensator gated by two AE2 256k components and a tooltip saying compressed
iron where the machine uses steel are examples of how late convenience can
become both opaque and inaccurate.

**Evidence.** `desolate_quests_resolved.txt`, `desolate_data_inventory.json`,
and `desolate_nbt_inventory.json` in the review bundle; notable supplied paths
include `overrides/config/hqm/`, `overrides/kubejs/server_scripts/`,
`overrides/kubejs/startup_scripts/`, and `overrides/config/openloader/data/`.

### The Legend Of 2900

**Observed structure.** The export contains 3,837 files, 14 quest chapters,
353 parsed quests, and 41 KubeJS scripts. Its post-nuclear island setting uses
villages, ocean/underground structures, Create metallurgy, Alex's Caves,
power armor, firearms, storage, magic, airships, and an optional Chaos
Deploying finale. Nether resources are displaced into overworld structures and
renewable routes. A hose pulley treats any fluid reaching 3,000 blocks as
bottomless (`hosePulleyBlockThreshold = 3000`, `bottomlessFluidMode =
ALLOW_ALL`). The custom acid line gives roughly six ingots per crushed iron,
copper, or zinc batch; gold has a separate exception. Steel is a semi-solid
iron/coal workpiece followed by 12 identical press loops.

**What works.** Geography has mechanical consequences: structures and biomes
feed material access, and a ruined Nether changes the resource map. The steel
route and acid route show how a material can carry a whole processing identity.
The Chaos finale seeds its correct silver/netherite sequence from the world seed,
preserves a wrong-route flag, and has a clear optional quest. The quest book
provides a general route while specialist chapters remain available.

**What to adapt to CWI.** Give deposits and structures a reason to be visited
that survives after the first sample: reserve cultures, host-rock differences,
or a missing service component. Use world-dependent experiments only as optional
content with readable clues and a deterministic route for the main restoration.
Make material exceptions visible in the manual or JEI rather than relying on
players to infer them from inconsistent yields.

**What to avoid.** Bottomless extraction of every fluid removes geography and
can erase the cost of transport. Twelve identical presses are a rate demand,
not twelve decisions. A 16% final product against 84% scrap can be a deliberate
postgame gamble, but is poor as a required progression gate. The bundled
`oreexcavation.js` is entirely commented; claims about unlimited ore should be
traced to active config/data rather than to an inactive script. Some chapter
descriptions are stale or overly generic, so a broad quest catalog does not
guarantee accurate guidance.

**Evidence.** `legend_2900_quests.json`; supplied paths include
`overrides/kubejs/startup_scripts/chaos_deploy.js`,
`overrides/kubejs/data/survial_island/recipes/chaos_deploying/creative_motor.json`,
`overrides/kubejs/server_scripts/ore_processing.js`,
`overrides/kubejs/server_scripts/steel.js`, and
`overrides/config/create-server.toml`.

### The Winter Rescue

**Observed structure.** The 1.20.1 Forge export contains 1,434 files, 15 FTB
chapters, 402 quests, 52 server scripts, 13 startup scripts, 18 client
scripts, 79 research definitions, and scenario/tip files. The opening provides
limited insulation, water, rations, gloves, a shovel, and magnesium through a
tutorial or skip path. Heat then connects shelter, farming, clothing, travel,
drinking, sauna recovery, and machinery. Primitive methods upgrade to steel,
aluminum, kilns, and electrolysis. Research can award prototypes and a repeatable
generator-core recovery route exists. The generator documents a 4x fuel cost for
2x temperature gain; gear tiers change stress impact values.

**What works.** The opening is protected enough to teach the first need. Weather
is forecast, so preparation is a choice rather than an unexplained ambush.
Upgrades have visible living effects: warmer soil, better crops, safer travel,
and more reliable equipment. Research, tips, archives, Ponder, JEI, and quests
split information by purpose.

**What to adapt to CWI.** Give the laboratory a short protected inspection
window and a finite starter stock. Let metallurgy or chemistry visibly expand the
safe working area, crop reliability, tool recovery, or restoration capacity.
Add qualitative feedback before demanding precise measurements. Make unique
startup resources replaceable after a real recovery effort.

**What to avoid.** The prologue says a storm arrives in three days while a
chapter says one day. Temperature, wetness, body-part clothing, nutrition,
thirst, fuel, and research all arrive early; this can overwhelm new players.
Research calculators and finite-use rubbing tools risk becoming recurring
administration. A single team generator may reinforce a town but constrain
multiplayer layouts. The export's rescue/town ending and T3/T4 generators are
unfinished, so they are not evidence of a complete final arc.

**Evidence.** `winter_rescue_review.md` and `winter_rescue_evidence.json` in the
review bundle; notable supplied paths include `overrides/config/fhscenario/`,
`overrides/config/ftbquests/`, `overrides/config/fhresearch/`, and
`overrides/kubejs/`.

## Cross-Pack Lessons For CWI

### Progression

- **Keep:** a small protected bootstrap; a real intermediate demand; upgrades
  that change a visible condition; late convenience earned through physical
  routing; optional side experiments with deterministic core routes.
- **Avoid:** making every system a prerequisite; a huge final bill that tests
  patience after solving the design; or rewards that remove the need for the
  factory.
- **CWI application:** early geology, simple chemistry, and one biological
  reserve should form the first service loop. Electrical Age should expand this
  loop only after the opening is stable, as already planned.

### Information And Quests

- Use quests for orientation, milestones, warnings, and operating limits.
- Use JEI for exact recipe ingredients and generated variants.
- Use manuals for why an item exists, what it changes, what can stop it, and how
  to recover. Do not add speculative real-world causation to explain gameplay.
- Use staff logs for uncertainty and foreshadowing; essential facts must remain
  available in practical text.
- Never treat an item possession check as proof that a factory is automated.

### Geography And Exploration

- Make a biome, host rock, structure, or height matter to a real supply route.
- Tell players enough before their first search to make a trip deliberate.
- Preserve a reserve or recovery path after the first find so exploration is
  meaningful without becoming permanent bad luck.
- Do not make every fluid bottomless or every material available everywhere.

### Machines And Feedback

- State input condition, output behavior, bottleneck, stop condition, and
  restart/recovery in one short operating note.
- Show qualitative feedback first and precise values later.
- Prefer rejected batches, alarms, safe stops, and repairable failure over
  unexplained destruction.
- Test output fullness, missing inputs, power loss, chunk unload, and restart
  behavior before increasing machine cost.

### Multiplayer And Recovery

- Check late joins, team changes, offline chunks, claims, corpse access, and
  shared research. Shared progress must not silently replace personal progress.
- A recovery-oriented pack should protect learning investment while retaining
  meaningful danger.
- CWI's isolated setting does not justify NPC economies or survivor rescue
  mechanics from other packs unless a future story revision explicitly adds
  them.

## Prioritized CWI Design Plan

### First: secure the opening

Define the protected laboratory, starter stock, first field trip, first ore or
material service, and first repeatable workshop output. Make the first failure
recoverable and explain the actual route to every unique culture or catalyst.
This has higher value than expanding Electrical Age.

### Second: make processing legible

Add compact operating information for the ore line, blast furnace, chemistry,
biology, and major byproducts. Keep exact ingredients in JEI. Show expected
yield and variance where those numbers change factory layout decisions.

### Third: make upgrades solve observed problems

Use later steel, oxygen, precision, storage, and electrical systems to reduce a
measured throughput, safety, handling, or recovery problem. Keep useful demand
for earlier materials where it supports factory identity.

### Fourth: finish geography-to-industry links

For each important material, document the relevant biome, height, host rock,
chance, usage, and reserve route. Avoid universal infinite extraction. Treat
unfinished routes as unfinished rather than inventing a disposal or conversion
bridge.

### Fifth: test before expanding

Run a fresh-world smoke pass for the opening, a complete steel batch, one ore
line through byproducts, one culture propagation loop, a filled-output stop, a
power/chunk restart, and a team/offline case. Record observed rates instead of
assuming source numbers are player experience.

## Evidence And Limitations

Archive hashes, coverage counts, and aggregate source anchors are retained in
[the historical evidence inventory](audit/REFERENCE_MODPACK_DESIGN_EVIDENCE.json).
They identify the original review; they were not recomputed from the archives
during this port. The raw extracted review
bundle is temporary and is not a CWI dependency. The review did not execute
archive scripts, load native mod jars, run a world, or inspect every texture,
sound, shader, binary, and generated native table. Conclusions are therefore
strongest for supplied KubeJS/data/config/quest design and weaker for native
runtime behavior.

No CWI gameplay, scripts, recipes, quests, or configuration were changed by
this analysis.
