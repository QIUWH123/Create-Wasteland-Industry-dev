# CWI Documentation

This is the documentation index for the Minecraft 1.21.1 instance. Useful
research, author decisions and detailed reviews were transferred from CWI
1.20.1 on 27 October 2026. Runtime scripts, recipes, assets and configuration
were not changed by that transfer.

Read the version label at the top of each document. **Historical implementation
and validation are not evidence that a feature works in this instance.**
Original evidence payloads and fingerprints are retained with added `_porting`
metadata. Current API guidance is based on the installed target JARs; retained
external-game research has not been refreshed to newer releases.

## Development References

| Document | Use |
| --- | --- |
| [Development Standards](DEVELOPMENT_STANDARDS.md) | Required formatting, behavior safeguards, author decisions, privacy and validation rules for all contributors. |
| [KubeJS API Reference](kubejs.md) | Start here: current installed integrations, lifecycle, pack helpers, generated families, FTB integration and validation workflow. Replaces the historical `KUBEJS_ULTIMATE_GUIDE.md` and obsolete 2001.x signatures. |
| [Events And Builders](KUBEJS_EVENTS_AND_BUILDERS.md) | All current event-call paths; registry builders, components, tags, generated data, interactions, loot, tooltips and recipe viewers. |
| [Recipe API](KUBEJS_RECIPE_API.md) | Used and useful installed recipe schemas: constructor order, fields, defaults, codecs, units and limitations. |
| [Item And Fluid API Proposal](ITEM_FLUID_API_PROPOSAL.md) | Proposed callable recipe descriptors, native-stack boundaries, chance/weight semantics, Core adapters and migration checks; not an installed API. |
| [CWI Core API](CWI_CORE_API.md) | Native machine/hammer/upgrade/fan schemas, events, bindings, models, shadows, tags and addon compatibility. |
| [Recipe Schema Guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) | Mihono tutorial lessons, current 2101 schema registration, components, constructors and schema ownership. |
| [Tag Reference](TAG_REFERENCE.md) | Current item, equipment, block, fluid and other-registry tags: assignments, native effects, ingredient uses, dormant integrations and groups without identified consumers. |
| [Historical 2101 Port Plan](superpowers/plans/KUBEJS_2101_PORT_PLAN.md) | Earlier migration intent and constraints; not a current execution checklist or completion report. |

## Design And Production Research

These retain detailed research and 1.20.1 context. Proposals require a current
source/dependency review before implementation. Inclusion does not approve
rejected features, new schematics, or changes to accepted gameplay abstractions.

| Document | Use |
| --- | --- |
| [Factory Design Analysis](FACTORY_DESIGN_ANALYSIS.md) | CWI progression, production constraints, logistics and factory feedback. |
| [Factorio Design Analysis](FACTORIO_DESIGN_ANALYSIS.md) | Recurring demand, expansion, control, throughput and practical applications. |
| [Mindustry Design Analysis](MINDUSTRY_DESIGN_ANALYSIS.md) | Supply networks, pressure on production, useful upgrades and operating feedback. |
| [No Flesh Within Chest 2 Analysis](NO_FLESH_WITHIN_CHEST_2_ANALYSIS.md) | Detailed archive research and comparisons with CWI. |
| [Reference Modpack Design Analysis](REFERENCE_MODPACK_DESIGN_ANALYSIS.md) | Patterns across other packs and the limits of applying them here. |
| [Recipe Realism Audit](RECIPE_REALISM_AUDIT.md) | Chemistry/engineering findings, implemented historical fixes, retained target quantities and author-approved abstractions. |
| [Steel Production Design](STEEL_PRODUCTION_DESIGN.md) | Historical blast-furnace design, bootstrap constraints and metallurgical abstraction; MBD2 machines are absent in the target. |

## Quests And Story

The target does not yet contain `config/ftbquests`. These documents preserve the
writing requirements, confirmed facts, detailed rationale and narrative context
for that future port. They do not create quests or establish target gameplay.

| Document | Use |
| --- | --- |
| [Quest Fact Confirmations](QUEST_FACT_CONFIRMATIONS.md) | Author-confirmed facts, unresolved questions and writing constraints. |
| [Quest Writing Review](QUEST_WRITING_REVIEW.md) | Full quest-by-quest review, including 504 detailed rationale rows and intended effects. |
| [Stargate Story](STARGATE_STORY.md) | Accepted story, ambiguity, staff records and foreshadowing. |

## Retained Evidence

Current API evidence: [KubeJS API inventory](audit/KUBEJS_API_INVENTORY.json)
records 97 scripts, 31 distinct event-call paths, 51 direct recipe factory
types, 75 embedded schema resources, supporting JAR fingerprints and a
documentation coverage map. It is a static source/binary audit, not a live
registry dump or a claim that guarded branches execute.

Current tag evidence: [Tag inventory](audit/TAG_INVENTORY.json) contains
2,396 resolved server tags across 23 registries, exact memberships, inspected
consumer notes and current input fingerprints. Its scope is explained in the
[Tag Reference](TAG_REFERENCE.md).

The seven historical JSON files below retain original observations under their
source-version scope. Hashes identify the original source snapshots; they do
not certify the current target tree. The added `_porting` field explains
applicability.

- [Factory improvement evidence](audit/FACTORY_IMPROVEMENTS_EVIDENCE.json)
- [Factorio research evidence](audit/FACTORIO_DESIGN_EVIDENCE.json)
- [Mindustry research evidence](audit/MINDUSTRY_DESIGN_EVIDENCE.json)
- [No Flesh Within Chest 2 evidence](audit/NO_FLESH_WITHIN_CHEST_2_EVIDENCE.json)
- [Reference modpack evidence](audit/REFERENCE_MODPACK_DESIGN_EVIDENCE.json)
- [Native recipe evidence](audit/NATIVE_RECIPE_EVIDENCE.json)
- [Quest/story validation history](audit/QUEST_STORY_VALIDATION.json)

## Migration Map And Boundaries

All thirteen source subject documents are retained or integrated. The old
README is replaced by this index. Source `KUBEJS_ULTIMATE_GUIDE.md` is merged
into `kubejs.md`; the other subject documents retain their uppercase filenames.
Source `audit/native_recipe_evidence.json` and
`audit/quest_story_validation.json` are now uppercase to match the evidence
folder. The pre-existing dated port plan is renamed to uppercase snake case.
Root [AGENTS.md](../AGENTS.md) directs contributors to the current standards and
API reference.

The target uses Minecraft 1.21.1/NeoForge, KubeJS 2101, Rhino 2101 and Create 6.
Native CWI Core machine, hammer and equipment-upgrade recipes are now supplied
by KubeJS. Material/warning tooltips and recipe-viewer hiding are ported; budding
growth uses the supported spout hook. Custom budding/compound-mineral JEI pages,
Ponder scenes, quests and CWI worldgen/structures remain unported. MBD2 runtime
scripts remain excluded. A retained script or a command that
requests an absent structure does not prove its feature works. Disabled source
mods and legacy helper examples are not instructions to restore dependencies.
Read the current KubeJS guide and verify installed serializers, registrations,
removals and pre-steel dependencies before adapting historical recipes.
