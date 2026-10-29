# CWI Tag Reference

Current Minecraft 1.21.1 audit, 29 October 2026. This document explains the
pack's assigned tags and relevant inherited tags. The accompanying
[Tag Inventory](audit/TAG_INVENTORY.json) lists **all 2,396 resolved server tags
and their exact members across 23 registries**. The tables below explain the
pack-specific assignments and important native behavior; they are not an
individual behavior review of every vanilla and third-party tag.

## How To Read The List

- **Behavior:** identified script or native code changes behavior for members.
- **Ingredient/category:** used by recipes, repair ingredients, JEI or creative tabs.
- **No consumer found:** assigned, but no current reader was identified in active
  scripts, installed resources or inspected native code. This is a cleanup
  candidate, not proof that an external datapack or player filter cannot use it.
- **Dormant:** a reader exists, but its optional mod or relevant mode is absent.
- **Empty:** no resolved members; this may be a deliberate restriction or extension point.

Tags are sets, not properties. A name such as `acid`, `unbreakable`, `hammers`
or `fluid_container` only does something when code reads it. Item, block and
fluid tags with the same ID are separate sets. In recipe ingredients, `#`
means a tag reference; it is not part of the stored tag ID.

Counts below are complete resolved membership, including native contributions,
unless explicitly described as pack additions. JSON has the full lists where
a table uses a family name or abbreviation.

## Legacy Forge Namespace Removal

All 12 previously resolved `forge:` tag keys are removed. The low-priority
[cleanup script](../kubejs/server_scripts/Tags/LegacyTags.js) waits until KubeJS
has loaded the actual item/block/fluid definitions, removes nested references
to the legacy namespace, then deletes its keys. This removes the definitions
rather than leaving empty legacy tags. Startup and resource reload were checked.

Live tool membership and relocation protection are preserved through common
`c:` tags. The only membership change outside the removed namespace is adding
the two AE2 cutting knives to `c:tools/knife`; `c:tools` remains at 193 members.
Lychee interactions and the [backpack compatibility overrides](../kubejs/data/sophisticatedbackpacks/registry/compat/farmersdelight)
use `c:tools/knife`; the backpack's cutting-board shear selection uses
`c:tools/shear`. Previously empty recipe references now use the installed
`c:crops`, `c:obsidians` and `c:ingots/gold` categories.

Obsolete fuel/material operations were deleted without substituting different
modern fuel or material behavior. Third-party JARs can still contain literal
`forge:` strings because their code/resources are unchanged. For example,
Create Stuff & Additions armor repair still hardcodes `forge:ingots/brass`;
that missing repair ingredient was already ineffective before this cleanup.
The cleanup neither restores it nor makes it a common brass category.

## Weapons, Tools And Equipment

The pack registers 45 ordinary tools: nine materials × sword, axe, pickaxe,
shovel and hoe. It also registers 12 armor pieces: bronze, steel and stainless
steel × four equipment slots.

| Item tag(s) | Assigned items | Current use or effect |
| --- | --- | --- |
| `minecraft:swords`, `axes`, `pickaxes`, `shovels`, `hoes` | Corresponding nine custom tools per type | Standard tool classification, nested enchantment categories and mod compatibility. Axes also match the incomplete-crafting-table Lychee interaction. Attack damage and mining speed are separate properties. |
| `minecraft:cluster_max_harvestables` | All nine custom pickaxes, plus native members; 18 total | Maximum amethyst-cluster harvest eligibility. Added automatically by the installed KubeJS pickaxe builder. |
| `c:tools/mining_tool` | All nine custom pickaxes; 22 total | Common mining-tool grouping, also inherited from the KubeJS builder. |
| `minecraft:head_armor`, `chest_armor`, `leg_armor`, `foot_armor` | Three custom armor pieces per corresponding slot | Nested armor, enchantment and trim classification. Added by the armor builders. Defense and toughness come from the armor material. |
| `minecraft:enchantable/sword`, `sharp_weapon`, `weapon`, `fire_aspect`, `durability`, `vanishing` | Custom swords and all material hammers, plus steel pipe | Enchantment eligibility through nested sword tags. Membership does not apply enchantments. |
| `minecraft:enchantable/mining`, `mining_loot`, `durability`, `vanishing` | Ordinary custom mining tools | Mining-enchantment eligibility. Axes also enter sharp-weapon/weapon families. |
| `minecraft:enchantable/armor`, `equippable`, slot-specific armor tags, `durability`, `vanishing`; `minecraft:trimmable_armor`; `c:armors` | The 12 armor pieces, each in its applicable slot subset | Armor enchantment, equipment, trim and common-category matching. |
| `minecraft:breaks_decorated_pots` | Ordinary tools through category nesting; hammers, pipe and two AE2 cutting knives explicitly | Enables decorated-pot shattering behavior. |
| `c:tools`, `c:enchantables` | Relevant tools/equipment through nested tags; `c:tools` has 193 members | Common compatibility groups. Hammer, pipe and AE2-knife memberships are preserved without the former legacy bridge. |
| `minecraft:hammers` | 13 material hammers | Core JEI hammer catalysts/icons. Hammer charging and conversions are implemented by the item class and recipes; tagging an ordinary item does not create those features. |
| `c:tools/knife` | Five Farmer's Delight knives + two AE2 cutting knives; seven total | Pack Lychee dead-bush/dead-leaf interactions and backpack tool-swap compatibility. Both knife families now match these interactions. |
| `c:tools/shear` | Vanilla shears | Backpack cutting-board tool-swap compatibility; replaces its obsolete shears-tag reference. |
| `farmersdelight:tools/knives`, `farmersdelight:straw_harvesters` | Five native knives + two AE2 knives; seven each | Cutting-board tool matching, knife enchantment families and straw harvesting conditions. |
| `functionalstorage:armory_cabinet_insertable`, `lodestone:enchantable/*` | Applicable custom tools/armor through native nesting | Storage acceptance and additional enchantment classification. Exact per-item memberships are in the inventory. |

Core's hammer builder automatically adds `minecraft:swords`,
`minecraft:hammers`, `forge:tools` and `minecraft:breaks_decorated_pots`.
The server removes `minecraft:hammers` from `kubejs:steel_pipe`, and the
namespace cleanup removes the builder's legacy tag definition. The pipe keeps
sword/common-tool and sword-enchantment memberships, while its separate
release callback supplies its combat behavior.

The material hammers are
`minecraft:{brass,bronze,copper,golden,industrial_iron,iron,lead,netherite,rusted_iron,stainless_steel,steel,stone,zinc}_hammer`.
Their namespace is intentional.

**No resolved item tags:** `kubejs:steel_shield`,
`kubejs:stainless_steel_shield`, `kubejs:small_hammer`, `kubejs:whetstone`
and `kubejs:fine_whetstone`. The shields still have native shield behavior;
the other items still work where recipes select their exact IDs. Being a
ShieldItem does not automatically add `c:tools/shield` or durability-enchantment tags.

**Undefined creative-tab source:** `startup_scripts/CreativeTab.js` requests
`#minecraft:tools`, which is absent. That tab's tag-backed content source is
empty; the separate live `c:tools` group has 193 members.

Tool statistics, armor values, zero material enchantability, charge models,
equipment-upgrade enchantments and durability costs are properties, components
or code behavior, not tags. Upgrade recipes select explicit item IDs.

## Tags With Direct Item Effects

| Item tag | Members | Actual behavior |
| --- | --- | --- |
| `cwi:hot_items` | 40: all 33 molten bucket items + lava bucket, magma block, blaze rod, blaze powder, heated powdered obsidian and two heated ingots | Every ten server ticks, carrying any matching item anywhere counted by the player's inventory triggers an `inFire` damage attempt of 1. Adds the hot-item warning tooltip. Damage immunity still applies normally. |
| `cwi:moltens` | 33 bucket items | Nested into `cwi:hot_items`. This **item** tag supplies hot-bucket exposure; the same-name fluid tag is separate. Includes liquid silicon. |
| `cwi:no_gravity_items` | `minecraft:nether_star` | Dropped item gets no gravity. Every ten ticks its age resets, horizontal velocity becomes zero and vertical motion gently oscillates; normal age-based despawning is postponed while this loop runs. Adds the floating tooltip. Optional crystal addition is skipped because Clanging Howl is absent. |
| `cwi:neurotoxin` | 13 lead forms: ingot, sheet, nugget, rod, powder, spring, wire, five ordinary tools and lead hammer | Inventory exposure bookkeeping runs. Actual neurotoxin debuffs and attack effects require the absent Clanging Howl provider, so those effects are dormant. |
| `cwi:neurotoxin_lv2` | Five lead tools + lead hammer; six total | Adds nine extra exposure counts, giving these items tenfold weighting overall. Stronger attack-effect branch is also dormant. |

The native hammer impact slowdown, steel-pipe launch, sounds and particles
come from native item behavior/callbacks, not these category tags.

## Item Ingredients And Organization

| Item tag(s) | Members or family | Current use |
| --- | --- | --- |
| `cwi:ingots` 34, `sheets` 32, `nuggets` 28, `powders` 34, `wires` 28, `rods` 28, `blocks` 32 | Populated fields of `global.materialTypes` | Materials creative tab and nested Vintage Improvements curving-head selection. `cwi:sheets` also filters pressing-recipe removal. |
| `cwi:all_powders` | 84 mineral/material/chemical/polymer powders | Dust creative tab. Broader than the 34-member material `cwi:powders` group. |
| `cwi:{bronze,stainless_steel,industrial_iron,rusted_iron}_ingots` | One matching ingot each | Repair ingredients for current custom tool/armor materials. Other generated singleton ingot tags are listed below. |
| `cwi:containers` | All 186 custom buckets | Fluids creative tab; removes them from the generic KubeJS tab. |
| `cwi:plot_items` | 26 manuals, notes, logs, packages and lockboxes | Plot-items creative tab. No tag-driven quest or dialogue behavior found. |
| `cwi:petri_dish` | 101 plain/inoculated/processing dishes and agar-plate states | Native incubator plate-slot filter and culture creative tab. |
| `cwi:fan_catalysts` | 42 catalyst/frame items | Fan-catalyst creative tab. The block processing rules use different block tags. |
| `cwi:string` | String + TFMG synthetic string | Global replacement of vanilla-string recipe ingredients. Biomancy sinew addition is conditional and inactive. |
| `cwi:leathers` | Leather + TFMG synthetic leather | Global leather replacement and other crafting/deploying ingredients. |
| `cwi:feathers` | Feather + synthetic feather | Global feather replacement. |
| `cwi:rubbers`, `cwi:rubber_blocks` | Two rubber/sheet alternatives; two rubber blocks | Machinery, progression and tool recipes. |
| `cwi:coal_powders` | Coal powder, charcoal powder, TFMG coke dust | Mechanical-age recipe ingredient. |
| `cwi:basic_materials` | Sulfur, limestone and caustic-soda powders | Microbe preparations. |
| `cwi:sticky_materials` | Sticky resin + slime ball | Mechanical-age crafting ingredient. |
| `cwi:chemical_sprayer` | CDG sprayer + sprayer lighter | Mechanical-arm item-application recipe for the chemical turret. |
| `cwi:cobbled_stones`; `minecraft:stone_crafting_materials`; `minecraft:stone_tool_materials` | Same 15 cobbled stone variants | Crafting/repair alternatives and pack lava-production ingredients. Vanilla stone-material sets are intentionally replaced. |
| `cwi:glass1`, `cwi:glass2` | Glass + tempered glass; tempered glass only | Mechanical/precision versus industrial recipe requirements. |
| `vintageimprovements:curving_heads` | Native heads plus seven material groups, two rubber blocks and capping head | Curving-head selection. |
| `ratatouille:mold` | Adds forming fabric | Mold ingredient category. |
| `cwi:coke` | Create Metallurgy coke + TFMG coke, coke dust and coke block; four total | Native blast-furnace inventory admission/routing to slots 4–7. Does not provide furnace heat by itself. |

### Item Groups With No Current Consumer Found

| Item tag(s) | Count | Assessment |
| --- | --- | --- |
| `cwi:charcoals`, `cwi:coals` | Two each | Assigned only; ordinary fuel/recipe behavior comes from the items themselves. |
| `cwi:deoxidizer` | Three | Silicon/aluminum/magnesium powders; existing reactions select exact IDs. |
| `cwi:waxes` | Two | Contains **honeycomb and lead axe**. No current wax/tag reader found; membership does not give the axe wax behavior. |
| `cwi:normal_logs` | 40 | Snapshot of item `minecraft:logs`; no current reader found. |
| `cwi:glass3` | Zero | Empty future tier. |
| `cwi:inoculated_petri_dish` | 14 | Culture-state classification. |
| `cwi:inoculated_agar_plate` | 84 | Culture-state classification. |
| `cwi:sealed_agar_plate` | 56 | Culture-state classification. |
| `cwi:before_sterilizing_agar_plate`, `cwi:cultured_agar_plate` | 28 each | Culture-state classification. Current recipes enumerate IDs; incubator reads parent `cwi:petri_dish`. |
| `cwi:{chromium,cobalt,magnesium,molybdenum,platinum,silver,tin,titanium,polyethylene,polypropylene,polyvinyl_chloride,polybenzimidazole}_ingots` | One each | Automatically generated singleton groups without corresponding current tool/armor repair consumers. Polymer members use their actual polymer IDs. |
| `cwi:ores`, `cwi:ore_deposit` | 29 / 18 | Ore/deposit classification; no current item-tag reader identified. |
| `cwi:frame_panel`, `cwi:upper_eaves`, `cwi:lower_eaves`, `cwi:eaves` | 9 / 43 / 9 / 52 | Shape classification; current crafting uses explicit IDs. |
| `create_rns:deposit_blocks` | 18 | Old RNS integration; provider is not installed. Separate block set also exists. |
| Bucket `cwi:heavy_fluids`, `chemical_fluids`, `normal_fluids`, `thick_fluids`, `thin_fluids`, `special_fluids`, `gasses` | See fluid-family table | No direct readers found. Every bucket independently has the live `cwi:containers` tag. |

The optional `c:tools/wrench` and `create:chain_rideable` additions for
Clanging Howl's industrial wrench are skipped. `cwi:serums` is not defined;
the serum-deployment script is entirely commented out.

## Blocks With Special Behavior

| Block tag | Pack assignment/change | Current effect |
| --- | --- | --- |
| `create:wrench_pickup` | 17 casing, sealed-wood, machine and incomplete-component additions; 101 total members | Sneaking with a Create wrench uses the generic pickup fallback, returning normal block loot to inventory. Exact spelling is **wrench_pickup**, not `wrench_pick_up`. Native `IWrenchable` behavior takes precedence. |
| `create:fan_processing_catalysts/blasting`, `smoking`, `splashing`, `haunting` | Six custom material catalysts per mode | Select the corresponding Create fan-processing mode. Final counts: 10 / 12 / 8 / 11 respectively. |
| `create:fan_processing_catalysts/corroding`, `sterilizing` | Six custom catalysts per mode | Active native Core fan modes and JEI catalyst selection. `sterilizing` is the tag spelling. |
| `create:fan_transparent` | All 42 catalyst/frame blocks and 27 metal frame-panel/eave blocks | Allows fan airflow through them. Also bypasses one solid-face rejection in Create open-ended-pipe checks; other checks still apply. |
| `create:windmill_sails` | Cleared and rebuilt to only `create:white_sail` | Controls sail-area counting. Other old sails no longer match this group. |
| `create:passive_boiler_heaters` | Removes `create:blaze_burner`; ten resolved members remain | Passive boiler/basin heating and native Core heat-source checks. Direct lit-burner/heat-level branches are separate. |
| `create:non_movable` | Three steel armor blocks | Rejects Create contraption movement. Six total members. |
| `c:relocation_not_supported` | Three steel armor blocks added directly; 53 total members | Create movement checks and AE2 spatial blacklist consume this common set. Its membership and protection are unchanged after removing the legacy bridge. |
| `minecraft:wither_immune`, `dragon_immune` | Three steel armor blocks | Protects against the respective bosses' block-destruction rules; not general explosion immunity. |
| `minecraft:geode_invalid_blocks` | Three steel armor blocks | Geode-generation rejection near sampled positions; not blanket worldgen protection. |
| `minecraft:soul_fire_base_blocks` | Reinforced deepslate, sculk and sculk catalyst | Permits soul-fire support. |
| `minecraft:mineable/pickaxe`, `axe`, `shovel` | Generated stone/ore/storage/building tags; crafting table moved from axe to pickaxe; rebar added to pickaxe | Tool effectiveness and correct-tool rules. `requiresTool` remains a separate block property. |
| `minecraft:needs_stone_tool`, `needs_iron_tool`, `needs_diamond_tool` | Generated from stone hardness/ore definitions | Feed nested `minecraft:incorrect_for_*_tool` sets. Those blacklist tags drive 1.21.1 drop eligibility, including the pack's custom tool tiers. |
| `cwi:cast_iron_reinforcement`, `steel_reinforcement`, `fireproof_bricks`, `reinforced_fireproof_bricks` | Four / two / two / one members | Native Core blast-furnace structure/material checks. Includes native and optional compatible block IDs. |
| `cwi:lava_extractor_floor` | Native + KubeJS eruptive bedrock | Native lava-extractor floor validation. |

CWI machines derived from `MachineBlock` receive wrench rotation/removal
through `MachineBlock → KineticBlock → IRotate → IWrenchable`, even without
the pickup tag. This does not cover the furnace hatch, which uses a different
base class. Shaft connections come from `hasShaftTowards`, and fluid storage
comes from registered capabilities. None of those are granted by a generic
classification tag.

### Block Worldgen And Placement Tags

| Block tag(s) | Pack additions | Reader/effect |
| --- | --- | --- |
| `minecraft:stone_ore_replaceables`, `deepslate_ore_replaceables` | Custom stones, cobbles and gravels; data JSON also adds darkslate, phyllite, quartzite, conglomerate, mossy phyllite and packed mud | Vanilla ore-feature `TagMatchTest` replacement sets. These do not generate an ore unless a feature runs. |
| `minecraft:base_stone_overworld` | Darkslate | Common base-stone replacement group, also nested into carver replacements. |
| `minecraft:overworld_carver_replaceables` | Stone/terracotta/ore groups, assorted vanilla blocks and two depleted dirts | Eligible replacement by configured overworld carvers. |
| `minecraft:lush_ground_replaceable` | Quartzite, phyllite, mossy phyllite and conglomerate | Ground replacement used by lush vegetation feature configurations. |
| `minecraft:dead_bush_may_place_on` | Depleted dirt + ashen depleted dirt | Dead-bush placement support. |
| `minecraft:moss_replaceable` | Same two depleted dirts | Moss/vegetation-patch replacement eligibility. |
| `minecraft:sculk_replaceable_world_gen` | Same two depleted dirts | Worldgen sculk replacement; separate from normal runtime sculk spreading. |

### Block Groups With No Current Consumer Found

| Block tag(s) | Count | Assessment |
| --- | --- | --- |
| `minecraft:needs_wooden_tool` | 32 | Vanilla does not read this minimum-tier name. `requiresTool` and real mineable/incorrect-for tags still matter independently. |
| `minecraft:needs_netherite_tool` | Zero | Only touched by the tier-removal loop; no current vanilla minimum-tier semantic under this name. |
| `kubejs:unbreakable` | Three | Marker on steel armor blocks. No reader found; their hardness is finite (100/120). This is different from `.unbreakable()`, which sets hardness to -1. |
| `cwi:fluid_container` | Eight | Container marker only; no reader found. Three requested `fluid:*` IDs are absent. Does not grant fluid capabilities. |
| `create:fan_processing_catalysts/frame` | Six | Empty frames have this generated tag, but no fan processing mode reads it. |
| `cwi:bedrocks` | Two | Bedrock + eruptive bedrock classification. Lava extractor uses `cwi:lava_extractor_floor` instead. |
| `cwi:normal_logs` | 40 | Snapshot of block logs; no reader found. |
| `cwi:cobbled_stones` | 15 | No block reader found; the separate item set is used by recipes. |
| `cwi:fan_catalysts` | 42 | No block reader found; item counterpart feeds creative tab, individual mode tags drive fans. |
| `cwi:ores`, `cwi:ore_deposit` | 29 / 18 | Ore/deposit classification. |
| `create_rns:deposit_blocks` | 18 | Absent RNS integration. |
| `kubejs:arid_ground`, `kubejs:grime_ground` | 33 each | Nest the two ore-replacement groups; associated pack worldgen consumers are not ported. |
| `minecraft:depleted_dirt` | Two | Custom-named classification; no vanilla behavior follows from the `minecraft:` namespace. |

## Fluids And Their Buckets

Startup `FluidBuilder.tag(...)` adds both source and flowing forms. Tags
called after `.bucketItem` belong to the **item** builder. Server fluid-tag
additions add exactly the written IDs, with no automatic flowing counterpart.

| Family tag | Fluid members | Bucket members | Actual use of these tags |
| --- | ---: | ---: | --- |
| `cwi:moltens` | 66 | 33 | Bucket set feeds hot-item damage. No fluid-set reader found. |
| `cwi:heavy_fluids` | 60 | 30 | Leach/purified solutions; no family-tag reader found. |
| `cwi:chemical_fluids` | 26 | 13 | Chemical-fluid classification; no reader found. |
| `cwi:normal_fluids` | 76 | 38 | Normal-fluid classification; no reader found. |
| `cwi:thick_fluids` | 48 | 24 | Thick-fluid classification; no reader found. |
| `cwi:thin_fluids` | 16 | 8 | Thin-fluid classification; no reader found. |
| `cwi:special_fluids` | 14 | 7 | Special-fluid classification; no reader found. |
| `cwi:gasses` | 68 | 34 | Fluid set feeds live `cwi:gases`; no direct bucket reader found. |

There are 186 distinct custom buckets. Liquid silicon is in both special and
molten sets, so the family counts overlap. Every bucket has `cwi:containers`.
Viscosity, density, lighting, gas rendering, swimming and drowning behavior
are set by the fluid builders/properties, not by these tags.

### Live Fluid Tags

| Fluid tag | Current members | Reader/effect |
| --- | --- | --- |
| `cwi:water` | Vanilla water source + distilled-water source | Pack recipe alternatives for washing, quenching, filling, mixing and machine recipes. No flowing forms. |
| `minecraft:water`, `c:water` | Vanilla source + flowing water only | Rebuilt intentionally. Vanilla water behavior and native validators use these sets; distilled water is excluded despite being accepted by pack recipes. |
| `cwi:gases` | 70: 68 custom gas forms + TFMG air/hydrogen | Core blast-furnace tank filters: tanks 0–1 reject gases, 2–3 accept gases, 4+ have unrestricted phase acceptance. |
| `cwi:gasses` | 68 custom gas forms | Nested into `cwi:gases`. This spelling remains a live ID. |
| `kubejs:gas` | 21 source forms | Also nested into `cwi:gases`; current members already enter through `cwi:gasses`, making this contribution redundant today. |
| `tfmg:blast_stove_fuel` | KubeJS creosote source only | Native blast-stove insertion filter. The old hot-air recipe is removed; valid insertion alone does not supply a production route. |
| `create:bottomless/allow` | Vanilla water + lava source | Current Create hose-pulley infinite-draining eligibility. |
| `tfmg:exhaustable`, `tfmg:flammable`, `c:fuel`, `c:air`, `c:crude_oil`, `c:lubrication_oil`, `c:cooling_fluid` | Native resolved forms; exact lists in JSON | Native exhaust/smokestack, flarestack/gas-lamp, air-intake/tank separation, pumpjack, oil-can and cooling-bottle validators respectively. Custom category tags do not automatically add these capabilities. |
| `tfmg:firebox_fuel`, `tfmg:hot_air` | Native forms | Installed firebox/blast-hatch validators still read them. This is native behavior evidence, not a proposal to restore those machines or production routes. |

**Bottomless mode matters:** current `config/create-server.toml` uses
`ALLOW_BY_TAG`, threshold 10,000 blocks. Clearing `create:bottomless/deny`
therefore has no effect in the current mode; it does not make every molten
fluid or fuel infinitely drainable. It would matter in `DENY_BY_TAG` mode.

### Fluid Tags With No Current Consumer Or Ineffective Integration

| Fluid tag(s) | Count | Finding |
| --- | --- | --- |
| `kubejs:molten_hot` | 21 | No reader found. Requested `kubejs:molten_glass` is absent. |
| `kubejs:acid`, `kubejs:base`, `kubejs:organic_solvent`, `kubejs:normal_fluids` | 11 / 3 / 26 / 12 | No readers found. Requested `kubejs:origin_blood` is absent. Separate from the `cwi:` family sets. |
| `tfmg:gas` | 90 | Registration/classification found, but no current reader identified. It does not grant gas physics, flammability or Core gas-tank acceptance. |
| `tfmg:gasoline`, `diesel`, `naphtha`, `kerosene`, `lpg` | One each | Installed TFMG engine-fuel definitions read **`c:` fuel tags** instead. Those modern sets contain no KubeJS fuel IDs in this snapshot. |
| `tfmg:crude_oil`, `tfmg:heavy_oil` | One each | No reader found for these legacy tags; modern TFMG uses common `c:` sets. The native fluids themselves remain valid in their common groups. |
| `create_sa:fuel_fluid` | Two | Plant oil + biodiesel. Installed CSA capability validators read vanilla lava/water tags instead, so this assignment does not enable those fuels. |
| `create_sa:water_fluid` | One | Distilled water. Same issue: native validators read `minecraft:water`, which excludes it. |
| `createmetallurgy:molten_material` | 46 | Native registration classification; no current reader identified. Separate from `cwi:moltens`. |

KubeJS fuels still have explicitly authored CreateAddition liquid-burning
recipes. Those direct-ID recipes are independent of TFMG engine acceptance.
Obsolete legacy fuel operations were deleted without adding the KubeJS fluids
to modern `c:` fuel sets. This cleanup does not change engine-fuel acceptance.

**Actual contact hazards use hardcoded FluidType lists** in
`Interactions/PlayerEvents.js`, not `kubejs:acid` or `kubejs:molten_hot`.
The molten list attempts lava damage, fire and slowness; the acid list attempts
per-fluid magic damage. Source and flowing variants share their FluidType.
Chromatic waste is tagged acid but not in that damage list, and 12 newer
molten-family names are outside the current molten contact list. Membership
alone is not evidence that a fluid causes damage.

## Other Registries

No current KubeJS tag writer or pack tag JSON targets registries outside
items, blocks and fluids. Native mods still provide 329 tags in 20 other
registries, including the following relevant examples.

| Registry | Tag / members | Use |
| --- | --- | --- |
| Recipe serializer | `create:automation_ignore`: `cwi:equipment_upgrade` | Core resource plus Create's `AllRecipeTypes.shouldIgnoreInAutomation` prevents automatic crafting of equipment-upgrade recipes. |
| TFMG engine fuel type | `tfmg:large_engine`: diesel, furnace gas, kerosene, naphtha fuel **types** | Native large-engine fuel selection/modifiers. These are registry entries, not actual fluid IDs. |
| TFMG engine type | `tfmg:upgrades_on_side`: `tfmg:i`, `tfmg:u` | Selects side-mounted upgrade rendering. |
| TFMG engine type | `tfmg:schematic_cycle_blacklist`: radial, turbine | Restricts native engine schematic cycling. It does not require creating a schematic. |
| Entity type | `create:blaze_burner_capturable`: blaze | Native burner capture eligibility. |
| Entity type | `create_power_loader:chunk_loader_capturable`: ghast | Native power-loader capture eligibility. |
| Biome | `createdieselgenerators:oil_biomes`: 16 vanilla biomes | Native oil-generation classification. |
| Enchantment | Vanilla availability and exclusive-set tags; common enchantment families | Enchantment selection/grouping and compatibility. Separate from item `enchantable/*` tags. |
| Damage type | Vanilla/NeoForge damage groups | Determines damage handling such as armor/invulnerability bypass where the relevant native damage code reads the group. Tagging an item with a similar name does not create that damage type. |
| Game event | Five vanilla tags | Vibration listeners, sneak exclusions, allay/warden/shrieker event groups. |

Native empty extension points, such as `create:ignore_seat` and
`c:capturing_not_supported`, are not automatically useless: a native consumer
can exist while no current entity triggers its rule.

## Intentional Clearing And Optional Integrations

Fourteen item tags are intentionally emptied:

- `tfmg:spools`
- `ae2:quartz_sword`, `quartz_axe`, `quartz_pickaxe`, `quartz_shovel`, `quartz_hoe`, `quartz_wrench`
- `create:crushed_raw_materials`, `create:create_ingots`
- `ae2:metal_ingots`
- `vintageimprovements:small_springs`, `vintageimprovements:springs`
- `createaddition:spools`
- `createmetallurgy:graphite_molds`

These clears restrict category consumers; they do not unregister items.
Many default recipe consumers are also removed separately. They should not
be conflated with unused tag additions.

The `accessories:back` clear is conditional on absent Accessories, so it does
not execute: seven other-mod items remain in that resolved tag. Ad Astra
clears/removals are also skipped. Obsolete legacy material/fuel operations
were deleted; modern common material and fuel sets were left unchanged.
Vanilla stone crafting/tool-material tags and fluid water tags are deliberately
cleared and then repopulated, as described above.

## Evidence And Scope

The [inventory](audit/TAG_INVENTORY.json) contains sorted, resolved memberships,
review notes for inspected tag families, source references and installed-JAR
fingerprints. Source definitions alone are not treated as final membership:
nesting, optional missing IDs, removals and namespace bridges were checked
against the actual server registries.

Membership capture used an isolated Java 21 dedicated server with matching
production startup/server/data scripts and 110 installed dedicated-compatible
JARs. Seven client-only JARs were excluded; none contains tag JSON resources.
The server started, completed resource reload and stopped cleanly. KubeJS
script loading reported zero errors; existing third-party recipe/loot errors
remain outside this cleanup. The inventory is a server-data snapshot; client
visuals, combat outcomes and complete factory operation were not playtested
by this audit.

| Source | What it establishes |
| --- | --- |
| [Tag assignments](../kubejs/server_scripts/Tags/tags.js), [batch assignments](../kubejs/server_scripts/Tags/BatchTags.js), [floating-item logic](../kubejs/server_scripts/Tags/CustomTags.js), [legacy namespace cleanup](../kubejs/server_scripts/Tags/LegacyTags.js) | Authored additions/removals, recipe replacements, floating behavior and removal of legacy definitions/nested references. |
| [Tool and armor registration](../kubejs/startup_scripts/Items/ToolsArmors.js), [hammer registration](../kubejs/startup_scripts/Items/hammers.js) | Explicit categories, material repair groups, native builder selection and pipe exclusion intent. |
| [Material registration](../kubejs/startup_scripts/Items/MaterialsRegistry.js), [microbes](../kubejs/startup_scripts/Items/Microbes.js), [creative tabs](../kubejs/startup_scripts/CreativeTab.js) | Generated item categories and readers. |
| [Fluid registration](../kubejs/startup_scripts/Fluids/fluid.js), [player effects](../kubejs/server_scripts/Interactions/PlayerEvents.js), [tool effects](../kubejs/server_scripts/Interactions/ToolsEffect.js), [tooltips](../kubejs/client_scripts/tooltips.js) | Fluid/bucket separation and actual hazard readers. |
| [Stone registration](../kubejs/startup_scripts/Blocks/Stones.js), [fan catalysts](../kubejs/startup_scripts/Blocks/FanCatalyst.js), [special shapes](../kubejs/startup_scripts/Blocks/SpecialShape.js), [ore registration](../kubejs/startup_scripts/Ores.js), [pack tag data](../kubejs/data/minecraft/tags) | Generated block memberships and data-only replacement sets. |
| Installed Core `HammerBuilder`, `HammerJeiCategory`, `IncubatorBlockEntity`, `BlastFurnaceBlockEntity`, `LavaExtractorBlockEntity`, `CwiFanProcessingType` | Native consumers; checked from installed bytecode/resources, not assumed from newer source. |
| Installed Create `WrenchItem`, `IWrenchable`, `BlockMovementChecksImpl`, `AllFanProcessingTypes`, `AirCurrent`, `AllRecipeTypes`, `FluidManipulationBehaviour` | Wrench, movement, fan, automation and bottomless rules. |
| Installed TFMG `TFMGTags`, engine-fuel JSON, `LargeEngineBlockEntity`; CSA capability validators | Modern fuel-tag names and native fluid acceptance. |
| Installed vanilla/NeoForge tag JSON, tier/tool code and former legacy bridges | Transitive tool/enchantment membership, mining tiers and dependencies that the cleanup preserves. |

The cleanup changes pack scripts, configuration and compatibility data. All
12 resolved `forge:` tag keys are removed. Core source and installed JARs are
unchanged; recipe counts, chances, durations and outputs are unchanged.
