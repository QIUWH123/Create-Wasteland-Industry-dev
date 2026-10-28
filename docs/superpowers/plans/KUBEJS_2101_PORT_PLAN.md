# CWI KubeJS 1.21.1 Port Implementation Plan

> Historical planning snapshot from 26 October 2026, retained for context.
> Its unchecked tasks are not a current task list, its proposed APIs are not
> authoritative, and its validation steps have not been rerun by this
> documentation transfer. Do not execute it without a current authorized task.
> Use [the current API reference](../../kubejs.md) and
> [development standards](../../DEVELOPMENT_STANDARDS.md) instead.
>
> The target now contains startup/server code, while hammer server behavior,
> MBD2 machines, client scripts, quests, worldgen and structures are not ported
> wholesale. Startup `global` data is readable by server scripts; server scripts
> must not assign new `global` values. Later decisions supersede this plan.

**Goal:** Port the old CWI KubeJS startup registrations and shared globals into the 1.21.1 instance using the installed KubeJS 2101.7.2, Rhino 2101.2.7, KubeJS Create 2101.3.1, and NeoForge APIs.

**Architecture:** Keep startup-time ordinary registry builders and shared globals in `startup_scripts`. Keep datapack registry work in `server_scripts`. Adapt only APIs removed by KubeJS 2101 or Forge-to-NeoForge changes, preserving IDs and behavior where the target mod set supports them.

**Tech Stack:** Minecraft 1.21.1, NeoForge 21.1.264, KubeJS 2101.7.2-build.377, Rhino 2101.2.7-build.85, KubeJS Create 2101.3.1-build.18, JavaScript/Rhino.

**Spec:** User request to port the old registrations/globals/startup scripts without modifying the old CWI instance.

## Global Constraints

- Never modify the original CWI 1.20.1 instance.
- Modify only the target CWI 1.21.1 instance.
- Preserve registry IDs, recipes, and gameplay behavior whenever the target runtime exposes the required dependency.
- Do not claim success until target KubeJS logs show scripts loaded and no migration errors.

### Task 1: Verify the runtime API map

**Files:**
- Read: a temporary decompilation of the installed KubeJS classes (not retained)
- Read: `mods/kubejs-neoforge-2101.7.2-build.377.jar`

- [ ] Confirm script lifecycle, globals, script metadata, registry split, model/fluid/item/block builders, NativeEvents, recipe schemas, and KubeJS Create handlers against the decompiled sources.
- [ ] Record target API replacements before editing scripts.

### Task 2: Migrate startup API calls

**Files:**
- Modify: `kubejs/startup_scripts/Preload/ImportStartup.js`
- Modify: `kubejs/startup_scripts/Events/FluidInteraction.js`
- Modify: `kubejs/startup_scripts/Events/PortalCancel.js`
- Modify: `kubejs/startup_scripts/RecipeRegister/FluidInteraction.js`
- Modify: `kubejs/startup_scripts/RecipeRegister/VoidConvert.js`
- Modify: `kubejs/startup_scripts/Items/foods.js`
- Modify: `kubejs/startup_scripts/Items/Drinks.js`
- Modify: `kubejs/startup_scripts/Fluids/fluid.js`

- [ ] Replace Forge event bridge/classes with `NativeEvents.onEvent` and NeoForge classes.
- [ ] Replace removed fluid methods with `tint`, `stillTexture`, `flowingTexture`, and `renderType`/typed fluid builders.
- [ ] Replace food `.hunger` with `.nutrition`.
- [ ] Preserve mod-specific callbacks only when their target classes exist and are loaded.

### Task 3: Migrate item, armor, and block registrations

**Files:**
- Modify: `kubejs/startup_scripts/Items/ToolsArmors.js`
- Modify: `kubejs/startup_scripts/Items/hammers.js`
- Modify: `kubejs/startup_scripts/Items/ItemModification.js`
- Modify: `kubejs/startup_scripts/Items/Microbes.js`
- Modify: `kubejs/startup_scripts/Items/Catalysts.js`
- Modify: `kubejs/startup_scripts/Ores.js`
- Modify: `kubejs/startup_scripts/Blocks/BlockModification.js`
- Modify: `kubejs/startup_scripts/Blocks/FanCatalyst.js`
- Modify: `kubejs/startup_scripts/Blocks/Logs.js`
- Modify: `kubejs/startup_scripts/Blocks/SpecialShape.js`

- [ ] Keep `ItemEvents.toolTierRegistry`; replace armor tier registration with `StartupEvents.registry('armor_material')` and `.material(...)` armor item builders.
- [ ] Replace block/item modification property assignments with target setter methods.
- [ ] Replace direct model/blockstate JSON fields with `modelGenerator`, `textures`, `parentModel`, and generated state APIs.
- [ ] Preserve generated model JSON semantics, including custom elements and texture keys.

### Task 4: Handle datapack enchantments

**Files:**
- Modify: `kubejs/startup_scripts/Enchantment.js`
- Create: `kubejs/server_scripts/Registries/Enchantment.js`

- [ ] Register enchantments through the target `ServerEvents.registry('enchantment')` direct codec using valid 1.21.1 JSON.
- [ ] Recreate the four gameplay effects through target server/item/entity events where the removed startup enchantment builder cannot attach callbacks.
- [ ] Keep enchantment IDs and level ranges unchanged.

### Task 5: Runtime validation

**Files:**
- Read: `logs/kubejs/startup.log`
- Read: `logs/kubejs/server.log`
- Read: `logs/kubejs/client.log`

- [ ] Launch or reload the target instance.
- [ ] Confirm startup and server script counts are nonzero and all migrated files load.
- [ ] Fix only errors reported by the target logs, repeating validation after each focused change.
- [ ] Hash the old startup tree before and after to prove it was unchanged.
