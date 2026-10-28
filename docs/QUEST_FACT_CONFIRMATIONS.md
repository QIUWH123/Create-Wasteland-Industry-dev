# Quest fact confirmations

> Ported documentation, 27 October 2026. The dated review, implementation statements, quest counts, baselines, hashes, and parser results below describe the **Minecraft 1.20.1 source instance**. They do not establish Minecraft 1.21.1 completion. This documentation migration copies no `config/ftbquests/` content or quest files and makes no runtime changes. The target quest book still needs its own implementation and validation.
>
> Author-confirmed writing constraints and accepted story decisions remain applicable. References to absent artifacts are labeled inline as historical source paths. Links to existing target code are navigation aids; their presence does not revalidate the source behavior or old line numbers against 1.21.1.

Source 1.20.1 audit date: 4 October 2026. All 504 source quest descriptions in all 15 source chapters were read. Claims were compared with KubeJS, configuration, structure contents, installed mod implementations, and configured resource packs. This document is for maintaining the pack; its author notes contain story spoilers.

Most questions from the initial audit are settled. The 6 October 1.20.1 quest revision implemented the accepted planetary-displacement story in prose; detailed gate and ending mechanics remain separate design work. Static file/parser checks do not establish every interaction or generation result in a running world.

## Writing constraints retained for 1.21.1

- Preserve the original preface message and its practical authorial voice.
- Keep Lost Logs hidden and optional. Essential identity, cause, and objective information belongs on visible progression; staff records offer details readers can connect and restrained foreshadowing.
- Explain uses and functions before discussing preparation. Leave ingredient lists, quantities, patterns, and routine assembly sequences to JEI. Avoid recipe padding, forced engineering, and claims that real-world science causes an unimplemented game effect.
- Keep warning text separate from control tooltips. Preserve the five protected precision warnings exactly, including `factured`. Control tooltips remain centered, cyan, and bounded by matching `---` separator lines; their actual alignment needs an in-game check.
- Vary manuals, reference notes, observations, and individual staff voices by purpose. Prior staff may be uncertain about future survival and recovery; established operating instructions stay dependable.
- Zinc is green and gray in this pack. Do not introduce a wooden crafting table or substitute the vanilla wooden recipe for the pack's crafting workstation.
- Do not restore the removed dried Fermento, Carbofusor, or Putrelys revival-plate recipes. The source's retained powdered Fermento route and propagation of already active cultures are historical facts to recheck in the target, not authorization to invent replacement activation routes.
- Retain the accepted planetary-displacement story. Gate control, preservation, astronomy, and the ending remain design and implementation work; this port adds no story rules.

## Source 1.20.1 confirmed facts and applied corrections

- **Pack colors only:** azurite and sphalerite descriptions use the pack's appearance. Actual model-linked PNGs were inspected: azurite is mottled blue with pale highlights and dark patches; sphalerite is gray with pale gray/off-white flecks. These also match the crushed and powder forms. No conflicting override was found in installed resource packs or mod assets. Zinc remains green and gray.
- **Sediment locations:** wet biological sediment occurs in lakes and oceans. Dry sediment occurs on rocky surfaces and may be buried beneath depleted dirt. Both descriptions reflect this author confirmation.
- **Culture activation — updated 11 October:** the added Fermento, Carbofusor, and Putrelys revival-plate routes were removed at the author's request. Quest descriptions no longer claim dried samples can start these incubator routes. Powdered Fermento fermentation remains; first activation of Carbofusor and Putrelys has no current recipe. Existing growth media propagate active cultures.
- **Lapis:** conventional lapis enchanting is inaccessible. Its description covers dye and implemented crystal reconstruction.
- **Emerald:** nobody else survives. The entry says emeralds were once used as trading currency; it does not offer current trading as a player activity.
- **Laboratory equipment:** machinery does not remain running upon awakening. The opening no longer describes a machinery hum or operating equipment.
- **Reference books:** the added sentence about damaged bindings was unnecessary and unsupported, so it was removed. The discovery entry identifies the books' subjects. No damaged condition is established as canon.
- **Lost Logs:** keep the chapter hidden. The records provide optional side information about the backstory through details readers can connect, as in a detective novel. Their role does not require revealing a normal quest chapter.
- **Quest progression:** completing quests does not gate gameplay. The preface now says quests record progress through each stage. Existing quest/manual dependencies are preserved.
- **Staff records:** the six staff-log incidents are approved fiction. Logs can span several pages and cover people's work and thoughts before, during, and after the Stargate incident. Small details should support inference and foreshadowing rather than directly explaining the mystery.
- **Player backstory:** the player was a Stargate developer and remembers standing at the gate. The player, or players in multiplayer, are the only eventual human survivors. On 6 October the author accepted planetary displacement and a rebuilt gate returning Earth home, superseding the earlier time-travel rescue mission. The transfer also destroyed the gate, and a long interval precedes awakening. See [Stargate story](STARGATE_STORY.md) for accepted facts and unresolved details.

## Remaining discussions

### Gasoline engine use — resolved

`tfmg:gasoline` is intended to power compatible engines and fluid-fed burners. The separate Create Diesel Generators fluid, `createdieselgenerators:gasoline`, is intentionally excluded from the pack's `forge:gasoline` fuel tag. [tags.js](../kubejs/server_scripts/Tags/tags.js) (1.20.1 source: `kubejs/server_scripts/Tags/tags.js:64`) now restores only TFMG's source and flowing fluids after clearing the inherited tag. The gasoline quest (1.20.1 source: `config/ftbquests/quests/chapters/petroleum.snbt:398`) names TFMG gasoline explicitly. The [fluid combustion recipe](../kubejs/server_scripts/Recipes/BasicRecipe.js) (1.20.1 source: `kubejs/server_scripts/Recipes/BasicRecipe.js:348`) and napalm feedstock remain implemented.

### Stargate cause and chronology — updated 6 October 2026

The author accepted planetary displacement: an uncontrolled expansion transports Earth into another solar system and destroys the gate. The player reconstructs it after a long interval, with the endgame goal of bringing Earth home. Meteorite showers are excluded from the essential explanation.

[Stargate story](STARGATE_STORY.md) records the accepted direction, retained engineer/memo/log background, and remaining decisions. The preceding time-travel rescue and temporal-preservation draft is superseded.

The current quest prose uses this magnetic explanation: Earth can retain its internally generated field while stronger stellar wind compresses and disturbs its magnetosphere. A permanent weakening of the geodynamo would require a separate fictional mechanism. Relocation alone does not establish it.

### Narrative agreement and implementation

The 6 October 1.20.1 update implemented the story in source quest prose. It does not implement gate, preservation, astronomical, or ending mechanics. Cascade boundaries, the safe return orbit, preservation duration and release, astronomical clues, and ending mechanics still need design. Keep proposals distinct from accepted facts, and verify implementation before describing a functioning system to players.

## Source 1.20.1 verification references for resolved questions

- **Colors (1):** azurite's `create:asurine` item points to Create's `asurine_1.png`, with block variants `asurine_0.png`–`asurine_3.png` in `create-1.20.1-6.0.8.jar`. Sphalerite uses the [KubeJS ore textures](../kubejs/assets/kubejs/textures/block/ores/sphalerite.png) and matching item textures. The [required resource-pack configuration](../config/resourcepackoverrides.json) (1.20.1 source: `config/resourcepackoverrides.json:22`) was included in override checks.
- **Sediments (2):** author confirmation supersedes the prior unverified cave-search advice; Typical Caves registration alone was not evidence of underground placement.
- **Activation (3–4):** the [culture definitions](../kubejs/startup_scripts/Items/Microbes.js), [culture preparation and recovery](../kubejs/server_scripts/Recipes/MicrobesCulture.js), and incubation (1.20.1 source: `kubejs/server_scripts/Multiblocked2/Incubator.js`) support propagation of active cultures. The added dried-sample revival variants have been removed; they no longer establish a first active Carbofusor or Putrelys sample.
- **Enchanting (6):** author confirmed no conventional access. The [recipe removal](../kubejs/server_scripts/Recipes/RecipeDelete.js) (1.20.1 source: `kubejs/server_scripts/Recipes/RecipeDelete.js:536`) and JEI hiding agree.
- **Trading, equipment, books (7–9):** resolved by author confirmation or removal of unnecessary added detail.
- **Hidden logs (10):** always-invisible flag (1.20.1 source: `config/ftbquests/quests/chapters/memories.snbt:2`) preserved according to author intent.
- **Progression (11):** preface wording (1.20.1 source: `config/ftbquests/quests/chapters/preface.snbt:163`) corrected to progress tracking; gameplay code and quest dependencies were preserved.

- **Fermento revival — updated 11 October:** [powdered fermentation](../kubejs/server_scripts/Recipes/MicrobesRecipe.js) (1.20.1 source: `kubejs/server_scripts/Recipes/MicrobesRecipe.js:170`) remains the initial activation route. The dedicated dried-inoculum plate added earlier has been removed; the quest now describes only the retained powdered route.
- **Lead inventory exposure (6 October):** [Neurotoxin tags](../kubejs/server_scripts/Tags/tags.js) (1.20.1 source: `kubejs/server_scripts/Tags/tags.js:233`) and [inventory exposure calculation](../kubejs/server_scripts/Interactions/PlayerEvents.js) (1.20.1 source: `kubejs/server_scripts/Interactions/PlayerEvents.js:11`) support the quantity-dependent handling limitation added to the lead entry. This is an implemented pack effect, not a claim that merely carrying solid lead causes that effect in real life.

## Earlier corrections established without questions

- **Industrial Crucible:** heat range, not minimum/maximum batch size. The recipe schema uses `minHeatRequirement` and `maxHeatRequirement`.
- **Gauge Attachment:** a visible heat indicator and a goggles thermal readout. Contents are separate crucible information available without the gauge.
- **Diamond Properties:** the verified local use is the construction-wand Angel Core; ordinary diamond gear recipes are removed.
- **Netherite:** dropped vanilla tools and armor resist fire/lava. The statement no longer covers every custom netherite item; hammer behavior remains deferred.
- **Sugar:** a food ingredient, rather than a directly edible item.
- **Copper, magnesium, polyethylene, zinc:** real industrial or physical context is explicitly labeled. Lead toxicity is implemented through the pack's Neurotoxin tags and inventory effect.

Parser, protected-text, and structural verification are recorded in [the writing review](QUEST_WRITING_REVIEW.md).
