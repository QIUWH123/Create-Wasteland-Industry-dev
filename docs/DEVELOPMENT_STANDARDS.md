# Development Standards

This document is the repository standard for KubeJS scripts, recipe data, configuration helpers, and project documentation. Apply it to new work and to existing files when they are intentionally reformatted. Formatting work must preserve gameplay behavior.

## Scope

- Keep runtime code, assets, and configuration in their existing functional directories.
- Do not rename KubeJS runtime files or directories as a style cleanup. Directory placement can affect KubeJS loading semantics.
- Do not format generated files, caches, assets, `.DS_Store` files, or machine-generated evidence unless the file has been deliberately included for review.
- Store project documentation, design proposals, audits, reviews, and working notes under `docs/`.
- Use uppercase snake case for all Markdown filenames under `docs/`, except `docs/README.md` (the index) and the author-approved `docs/kubejs.md` (the current KubeJS reference).
- Do not create new schematics unless the author explicitly changes that instruction.

## Development Environment

This instance targets Minecraft 1.21.1 and NeoForge 21.1.264. The older CWI
1.20.1 instance is a read-only source reference, not the active API baseline.

- Select Java 21 explicitly for this instance and standalone Rhino checks. Do not assume `java` or `javac` on `PATH` selects it. On macOS, inspect installed JDKs with `/usr/libexec/java_home -V` and select a verified Java 21 toolchain. A launcher-provided Java 21 runtime may run checks even if a full JDK is not installed.
- Use matching `java`, `javac`, and `javap` tools when inspecting or compiling Java. Locate a mod's source project and use its Gradle wrapper/toolchain configuration; an installed JAR does not imply that its source project or build dependencies are available.
- Read [the current KubeJS reference](kubejs.md) for the installed KubeJS 2101.7.2-build.377, Rhino 2101.2.7-build.85, KubeJS Create 2101.3.1-build.18, and Create 6.0.10 APIs. Inspect the actual installed JARs after any mod update.
- Node checks JavaScript syntax; also compile with the installed Rhino JAR. Neither check validates Minecraft registries, addon interop, recipe serializers, rendering, or machine behavior. Standalone Rhino may need launcher libraries such as Gson on its classpath.
- Temporary harnesses and caches may disappear. Recreate needed checks from known source instead of citing an unavailable temporary file or an older run as current evidence.
- Discover bundled Python/Node runtimes through the workspace-dependency tool when extra libraries are needed. Do not assume packages or editor command-line tools from a previous computer still exist.
- ProbeJS 8.0.3 exposes `/probejs` to open its dump interface. Generate fresh target-instance definitions after mod changes and inspect their actual output/configuration; do not reuse the 1.20.1 definitions or assume its `/probejs dump` command still applies. The current instance has no `kubejs/jsconfig.json`; create editor configuration only as authorized work after locating fresh generated definitions.
- Native CWI Core now owns machine processing, charged hammers and equipment upgrades. Production KubeJS recipes configure those systems; do not restore MBD2 runtime scripts or the old hammer release/conversion implementation alongside them. Client scripts, quests, worldgen and structures have not been ported wholesale. Keep the intentionally unimplemented arc furnace and storage-only solar behavior unchanged.
- Review fresh `logs/kubejs/startup.log`, `server.log`, and `client.log` after a target launch. A restart is required after registration changes. Do not launch Minecraft or alter unfinished gameplay merely to make a documentation update appear validated.

## File Formatting

- Use UTF-8, LF line endings, spaces only, no trailing whitespace, and exactly one final newline.
- Use four spaces for every JavaScript indentation level.
- Remove separator lines such as `----------` and `==========`.
- Add blank lines between top-level functions, event handlers, helper groups, and major recipe sections when they improve readability.
- Use consistent spacing around operators, commas, colons, braces, and chained calls.
- Do not introduce alignment padding that creates inconsistent whitespace.

## JavaScript Style

- Remove trailing semicolons from JavaScript statements.
- Use single quotes for ordinary JavaScript strings.
- Preserve template literals and strings whose escaping or embedded content would change if the quote style changed.
- Use `const` by default and `let` when reassignment is required. The installed Rhino also needs `let` at verified repeated-loop/callback sites that throw `redeclaration of var`; exercise the callback at runtime before choosing that workaround.
- Do not introduce new `var` declarations. Do not rename existing globals solely for style.
- Preserve public global names, including `global.outPutMaterial` and `global.materialTypes`, and names of retained family generators. Recipe-only wrappers and their obsolete conversion helpers were intentionally removed; do not recreate them.
- Keep KubeJS priority comments such as `// priority: 10000` as the exact first line of the file. Do not move, reword, or convert them to block comments.

## Comments

- Comments must be standalone and top-level: place them four spaces less indented than the code they describe.
- Replace underscores in comments with spaces.
- Capitalize the first letter of every word in ordinary comments.
- Remove Chinese comments.
- Remove separator comments and decorative comment banners.
- Add or clarify a comment only when it explains non-obvious logic, an intentional gameplay abstraction, a known uncertainty, or an important operating limitation.
- Do not add a repetitive lesson or speculative scientific explanation to every item or recipe.
- Preserve comments that document gameplay abstractions, narrative intent, known uncertainties, or required priorities.
- Category comments inside recipe lists follow these same rules. Do not over-categorize related vanilla items or recipes.

## Item.of Simplification

- Change `Item.of('id')` to `'id'` only when it has no extra method, NBT, tag, callback, or Java object requirement and the receiving API accepts the equivalent item ID.
- Change `Item.of('id', count)` to `'countx id'` only when the receiving API accepts that shorthand and the resulting stack is equivalent.
- Keep typed `Item.of(...)` values when the receiver needs an item stack, components, NBT predicates, callbacks, Java `ItemStack` behavior, or other complex data. In this Create integration, chance outputs use `CreateItem.of(Item.of(...), chance)`; do not restore the old `.withChance()` API or assume `.weakNBT()` is a current replacement for component predicates.
- Verify the receiving API before simplifying an `Item.of(...)` call. A visually shorter expression is not sufficient evidence of equivalence.

## Recipe Data And Helpers

- Keep `event.custom(...)` JSON objects on one line with spaces when doing so remains readable and preserves the custom schema.
- Prefer the installed `event.recipes.<mod>.<type>` schema builder. Use native item IDs/count strings, `Item.of`, `CreateItem.of`, `Fluid.of`, and `Fluid.sizedIngredientOf` according to its component contract. Do not add a wrapper that only simplifies or forwards recipe creation.
- Prefer `Fluid.of(id, amount)` for concrete fluids. The author plans Core support for fluid tags through the same call; migrate tag inputs only after that support is installed and verified. Until then, keep `Fluid.sizedIngredientOf('#tag', amount)` for tag inputs. Fluid tags remain input choices, not concrete outputs.
- Retain useful generators and calculations, such as material processing families, fermentation variants with optional-mod/capacity guards, and paired crafting recipes. Use `event.custom(...)` when the installed schema cannot represent the required data.
- Verify defaults, input count expansion, typed output wrappers and generated IDs when migrating a call. Preserve repeated ingredients and explicit settings where needed for equivalence.
- Match the installed serializer exactly. A 1.21.1 item-stack output commonly uses `{ "id": "namespace:path", "count": 2 }`, while an item ingredient uses `{ "item": "namespace:path" }`; wrappers and nesting vary by recipe type. Fluid ingredient and output layouts also differ. Do not copy the old `{ "item": ..., "count": ... }` output or `{ "fluid": ..., "amount": ... }` shape into every serializer.
- Keep custom schemas, Java or typed objects, and multiline data when flattening or helper conversion would reduce readability or change the schema.
- Preserve every recipe ID, namespace, path, count, chance, fluid, amount, processing time, heat requirement, stage, predicate, and output order.
- Never correct, rename, or normalize an existing resource ID during formatting.

## Recipe Ordering And Organization

- Group related recipes and helpers logically, with clear section comments.
- Do not reorder runtime files, event handlers, global definitions, material or ore arrays, recipe registrations, generated data maps, sequenced-assembly steps, outputs, or creative-tab entries without verifying that order is semantically irrelevant.
- `Object.values(...)` order, recipe conflict resolution, generated IDs, and event priority can depend on declaration order.
- Sort recipe IDs alphabetically by mod, recipe type, and path only in independent recipe-removal lists where order cannot affect behavior.
- Preserve all originally present non-empty removal IDs. Remove empty entries such as `event.remove({ id: '' })`.
- Combine repeated mod removals into arrays only when the resulting event behavior is identical.
- Keep category comments formatted consistently and do not sort recipe registrations merely to make a file look orderly.

## Naming And Documentation

- Keep resource IDs in lowercase `namespace:path` format.
- Use descriptive uppercase snake case for all Markdown files under `docs/`, for example `RECIPE_REALISM_AUDIT.md` and `STEEL_PRODUCTION_DESIGN.md`. Keep `docs/README.md` as the index and `docs/kubejs.md` as the author-approved current reference exceptions.
- Update `docs/README.md` and all internal links when a document is added, removed, or renamed.
- Prefer updating an existing document over creating duplicate dated reports.
- Keep temporary formatter reports outside the repository unless they are intentionally retained under `docs/audit/`.

### Documentation Privacy And Portability

- Use project-relative links and paths in retained documentation and evidence.
- Identify supplied archives by filename, version, and fingerprint when useful; do not record their personal filesystem locations.
- Do not include operating-system usernames, home-directory paths, temporary screenshot paths, personal timezone settings, or unrelated personal metadata.
- Keep dates or version information only when they help identify the reviewed state. Remove personal environment details from generated reports before retaining them.

## Behavior Safeguards

- Trace the active recipe-removal lists, generated recipes, hardcoded machine behavior, and intended progression before proposing a compatibility recipe, tag, or new byproduct consumer. A recipe or machine present in an installed mod may already be retired by the pack.
- Verify each product's actual uses, properties, processing routes, and progression role before calling it a duplicate. Similar names or source materials do not prove equivalence. Preserve distinct products and their supply routes unless the author approves combining them; Hardened Wood and Hardened Planks are different products.
- When the pack replaces a material or fluid, use its chosen ID directly in retained recipes and remove the retired version's production and consumption recipes. Do not add conversion recipes or shared compatibility tags merely to keep both versions useful. Resolve hardcoded sources explicitly before choosing a replacement.
- Preserve the author's native cinder-block crafting and fire-extinguisher availability decisions when adapting replaced ingredients. The historical extinguisher refill used 1,000 mB KubeJS carbon dioxide and `{fill_level:500}` state; retain that intent as source history, inspect the current item/component contract, and verify the target route before claiming it works. Do not remove the product merely to avoid migrating its ingredient.
- Do not restore removed machines as disposal routes or revive an abandoned progression path to give a byproduct a use. Leave an unfinished route explicit until an intended consumer is approved.
- Formatting changes must be functionally identical to the original code.
- Do not change recipe logic, values, chances, counts, fluids, outputs, event priorities, event order, load order, or helper semantics while applying style rules.
- Treat `Preload/Global.js`, `Fluids/fluid.js`, and other shared definition files as behavior-sensitive. Preserve their keys, order, and exported values unless the task explicitly changes them.
- Preserve KubeJS directory semantics: startup scripts load once, server scripts reload with server events, and client scripts reload with the client.
- If a requested simplification might affect behavior, keep the original form and record the reason in the review rather than guessing.

## Port-Specific Safeguards

- Define shared immutable pack data in startup `global`; server scripts may read it but must not assign new `global` values. Keep reload-local server variables in server scope and durable world state in the appropriate persistent data.
- Preserve the existing `global.stoneTypes` and material/ore generators. Add required IDs and textures to those systems; do not introduce a parallel registry or import entire source-mod families for blocks the pack does not use. Raw stone textures belong in `assets/kubejs/textures/block/stones/`.
- Keep `tfmg:air`, `tfmg:liquid_asphalt`, and `tfmg:liquid_concrete` as their selected canonical fluids. Preserve the existing crude/heavy oil IDs. Use the KubeJS replacements elsewhere according to current registrations. Do not register duplicate air, asphalt or concrete, or restore removed molten plastic/furnace gas/hot-air production.
- Keep liquid silicon and molten slag in the molten-fluid handling paths. Do not make unrelated fluid-phase changes based only on their names or a reference equation.
- For chemistry, preserve each registered substance's physical state. Register another ID before using a different state. Apply the stated 2 mB/mol gas and 1 mB/mol liquid conventions, define solid units and mixture composition where needed, balance reference equations, and separately check recipe quantities. Gameplay mixture/solution abstractions must be labeled rather than given an invented unique molecular equation.
- Keep the author's accepted gameplay simplifications: returned soda/limestone in glass batches, the retained nitrate-bath abstraction, and simplified leaching/disinfection. Do not turn historical realism-review candidates into authorization to change recipes.
- Do not restore rubber-to-resin reversal, dried Fermento/Carbofusor/Putrelys revival routes, firebox additions, removed blast-furnace diagnostics, duplicate-material bridge recipes, or new schematics.
- Treat `forge:` and `c:` tags case by case using the installed resources and current custom tags; a namespace-wide search-and-replace is unsafe.
- New shared tags use the verified modern common ID; pack-specific groups use `cwi:`. Do not introduce `forge:` tags or readers. `Tags/LegacyTags.js` removes legacy item, block and fluid tag definitions after other assignments; update supported data/configuration readers instead of editing Core or installed JARs.
- Prefer data components and installed recipe-result APIs over old `.nbt`/callback examples. Prefer `NativeEvents` and NeoForge classes over obsolete Forge event bridges. Check [kubejs.md](kubejs.md) and [the schema guide](KUBEJS_RECIPE_SCHEMA_GUIDE.md) before applying old examples.

## Validation

For documentation-only work, validate links, filenames, JSON evidence, privacy, and source/version labels, and verify runtime files are unchanged. For code/formatting batches:

1. Run `git diff --check`.
2. Check for remaining tabs, trailing whitespace, and missing final newlines.
3. Review changed literals and identifiers, especially recipe IDs, counts, chances, fluid amounts, processing times, heat, stages, priorities, and output order.
4. Compare recipe counts and important registration data before and after large edits.
5. Validate scripts with the actual KubeJS or Rhino reload when available. Node syntax checking alone does not validate KubeJS Java interop or runtime APIs.
6. Inspect the final diff for accidental behavior changes before moving to the next batch.

## Review Checklist

- [ ] Only the intended files changed.
- [ ] Formatting follows four-space indentation and has no trailing semicolons.
- [ ] Comments follow the top-level, Title Case, no-underscore rule.
- [ ] Priority comments, IDs, globals, retained generators, and runtime paths are preserved.
- [ ] `Item.of(...)` changes were verified against the receiving API.
- [ ] Recipe ordering changes are limited to behavior-independent removal lists.
- [ ] Schema builders and native item/fluid values preserve the serializer contract and behavior.
- [ ] `git diff --check` and runtime or Rhino validation were completed where available.
