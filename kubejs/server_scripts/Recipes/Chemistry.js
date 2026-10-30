// Every Registered Substance Must Retain Its Defined Physical State Across Recipes
// Reference Reaction Conditions Must Not Override A Substance's Registered State
// Register A Separate Form With Its Own ID Before Using A Different Physical State
// Mole Accounting Uses 2 mB Per Mol For Registered Gases And 1 mB Per Mol For Registered Liquids
// Define Moles Per Item For Each Solid Material And Use That Value Consistently Across Recipes
// Balance Reaction Equations And Convert Coefficients Using These Mole Accounting Rules
// Mixtures Require Defined Compositions Before A Unique Molecular Equation Can Be Written
// Reference Equations Do Not Prove Current Recipe Quantities Are Balanced, Flag Any Mismatches


ServerEvents.recipes(event => {

// Create Mixing And Catalyst Preparation

// Pyrite Preparation: Fe + 2 S -> FeS2
// Formal Composition Equation Only, Not Proof Of Selective Pyrite Formation
    event.recipes.create.mixing('kubejs:pyrite_powder', [
        '2x kubejs:sulfur_powder',
        'kubejs:iron_powder'
    ]).heated()

// Caustic-soda Recovery: NaOH(aq) -> NaOH(s)
// Solvent Evaporation Is Implicit
    event.recipes.create.mixing('kubejs:caustic_soda_powder', Fluid.of('kubejs:caustic_soda', 125)).heated()

// Salt Recovery: Na+(aq) + Cl-(aq) -> NaCl(s)
// Solvent Evaporation Is Implicit
    event.recipes.create.mixing('ratatouille:salt', Fluid.of('kubejs:salt_solution', 125)).heated()

// Soda Recovery: Na2CO3(aq) -> Na2CO3(s)
// Solution Uses 1 mB Per Mol Of Na2CO3, Soda Powder Represents 125 Mol Per Item
// Carrier Water And Solvent Evaporation Are Implicit
    event.recipes.create.mixing('kubejs:soda_powder', Fluid.of('kubejs:sodium_carbonate_solution', 125))
        .heated()
        .id('cwi:mixing/soda_powder_from_sodium_carbonate_solution')

// Sugar Recovery: C12H22O11(aq) -> C12H22O11(s)
// Sucrose Reference Only, Sugar Composition Is Not Defined
    event.recipes.create.mixing('minecraft:sugar', Fluid.of('kubejs:syrup', 125)).heated()

// Nitrate Recovery: Dissolved Nitrate Salt -> Solid Nitrate Salt
// Nitrate Counter Ion Is Unspecified, No Unique Molecular Equation
    event.recipes.create.mixing('tfmg:nitrate_dust', Fluid.of('kubejs:nitrate_solution', 125)).heated()

// Caustic-soda Dissolution: NaOH(s) -> Na+(aq) + OH-(aq)
    event.recipes.create.mixing(Fluid.of('kubejs:caustic_soda', 125), [
        'kubejs:caustic_soda_powder',
        Fluid.of('kubejs:distilled_water', 125)
    ])

// Syrup Preparation: C12H22O11(s) -> C12H22O11(aq)
// Sucrose Reference Only, Sugar Composition Is Not Defined
    event.recipes.create.mixing(Fluid.of('kubejs:syrup', 125), [
        Fluid.of('kubejs:distilled_water', 125),
        'minecraft:sugar'
    ])

// Salt-solution Preparation: NaCl(s) -> Na+(aq) + Cl-(aq)
    event.recipes.create.mixing(Fluid.of('kubejs:salt_solution', 125), [
        Fluid.of('kubejs:distilled_water', 125),
        'ratatouille:salt'
    ])

// Halite Dissolution: NaCl(s) -> Na+(aq) + Cl-(aq)
    event.recipes.create.mixing(Fluid.of('kubejs:raw_brine', 125), [
        Fluid.sizedIngredientOf('#cwi:water', 125),
        'kubejs:halite_powder'
    ])

// Ferric-chloride Synthesis: 2 Fe + 3 Cl2 -> 2 FeCl3
    event.recipes.create.mixing(Fluid.of('kubejs:ferric_chloride', 125), [
        Fluid.of('kubejs:chlorine', 375),
        'kubejs:iron_powder'
    ])

// Nitrate-solution Preparation: Solid Nitrate Salt -> Dissolved Nitrate Salt
// Nitrate Counter Ion Is Unspecified, No Unique Molecular Equation
    event.recipes.create.mixing(Fluid.of('kubejs:nitrate_solution', 125), [
        Fluid.of('kubejs:distilled_water', 125),
        'tfmg:nitrate_dust'
    ])

// Chlorine-copper Catalyst Preparation: Cu + Cl2 -> CuCl2
// Reference If The Catalyst Represents Copper(II) Chloride
    event.recipes.create.mixing('kubejs:chlorine_copper_catalyst', [
        'kubejs:copper_powder',
        Fluid.of('kubejs:chlorine', 250)
    ]).heated()

// Nickel Catalyst Preparation: Nickel Powder + Alumina -> Supported Nickel Catalyst
// Supported Ni/Al2O3 Assembly, Not A New Molecular Compound
    event.recipes.create.mixing('kubejs:nickel_catalyst', [
        'kubejs:nickel_powder',
        'kubejs:alumina_powder'
    ]).heated()

// Cobalt Catalyst Preparation: Cobalt Powder + Alumina -> Supported Cobalt Catalyst
// Supported Co/Al2O3 Assembly, Activation Is Unspecified
    event.recipes.create.mixing('kubejs:cobalt_catalyst', [
        'kubejs:cobalt_powder',
        'kubejs:alumina_powder'
    ]).heated()

// Iron Catalyst Preparation: Iron Powder + Alumina + Potassium Powder -> Promoted Iron Catalyst
// Supported Iron With Potassium Promoter, Active Phases Are Unspecified
    event.recipes.create.mixing('kubejs:iron_catalyst', [
        'kubejs:iron_powder',
        'kubejs:alumina_powder',
        'kubejs:potassium_powder'
    ]).heated()

// Platinum Catalyst Preparation: Platinum Powder + Alumina -> Supported Platinum Catalyst
// Supported Pt/Al2O3 Assembly, Not A New Molecular Compound
    event.recipes.create.mixing('kubejs:platinum_catalyst', [
        'kubejs:platinum_powder',
        'kubejs:alumina_powder'
    ]).heated()

// Sulfur-copper Catalyst Preparation: Copper Powder + Zinc Powder + Sulfur Powder -> Sulfur-copper Catalyst
// Catalyst Composition Is Unspecified, No Unique Molecular Equation
    event.recipes.create.mixing('kubejs:sulfur_copper_catalyst', [
        'kubejs:copper_powder',
        'kubejs:zinc_powder',
        'kubejs:sulfur_powder'
    ]).heated()

// Dehydrogenation Catalyst Preparation: Iron Oxide + Chromium Oxide -> Mixed-oxide Catalyst
// Mixed Oxide Catalyst Assembly, Exact Oxide Phases Are Unspecified
    event.recipes.create.mixing('kubejs:dehydrogenation_catalyst', [
        'kubejs:iron_oxide_powder',
        'kubejs:chromium_oxide_powder'
    ]).heated()

// Oxidation Catalyst Preparation: Cobalt Powder + Manganese Powder -> Oxidation Catalyst
// Catalyst Assembly, Active Oxidation States Are Unspecified
    event.recipes.create.mixing('kubejs:oxidation_catalyst', [
        'kubejs:cobalt_powder',
        'kubejs:manganese_powder'
    ]).heated()

// Silver Catalyst Preparation: Silver Powder + Alumina -> Supported Silver Catalyst
// Supported Ag/Al2O3 Assembly, Not A New Molecular Compound
    event.recipes.create.mixing('kubejs:silver_catalyst', [
        'kubejs:silver_powder',
        'kubejs:alumina_powder'
    ]).heated()

// Phosphoric-acid Catalyst Preparation: Ca3(PO4)2 + 3 H2SO4 -> 2 H3PO4 + 3 CaSO4
// Reference Only If Phosphate Represents Ca3(PO4)2, Sulfate Byproduct Is Omitted
    event.recipes.create.mixing('kubejs:phosphoric_acid_catalyst', [
        'kubejs:phosphate_powder',
        Fluid.of('kubejs:sulfuric_acid', 50)
    ]).heated()

// Zeolite Catalyst Preparation: Zeolite Powder + Alumina -> Zeolite/alumina Catalyst
// Variable Zeolite Composition, Catalyst Assembly Rather Than A Defined Reaction
    event.recipes.create.mixing('kubejs:zeolite_catalyst', [
        'kubejs:zeolite_powder',
        'kubejs:alumina_powder'
    ]).heated()

// Alumina Synthesis: 4 Al + 3 O2 -> 2 Al2O3
    event.recipes.create.mixing('kubejs:alumina_powder', [
        '2x kubejs:aluminum_powder',
        Fluid.of('kubejs:oxygen', 375)
    ]).heated()

// Water Boiling

// Distilled-water Boiling, Heated: H2O(l) -> H2O(g)
    event.recipes.createdieselgenerators.distillation([Fluid.of('kubejs:steam', 250)], [Fluid.of('kubejs:distilled_water', 125)], 150).heated()

// Distilled-water Boiling, Superheated: H2O(l) -> H2O(g)
    event.recipes.createdieselgenerators.distillation([Fluid.of('kubejs:steam', 250)], [Fluid.of('kubejs:distilled_water', 125)], 75).superheated()

// Water Boiling, Heated: H2O(l) -> H2O(g)
    event.recipes.createdieselgenerators.distillation([Fluid.of('kubejs:steam', 250)], [Fluid.of('minecraft:water', 125)], 200).heated()

// Water Boiling, Superheated: H2O(l) -> H2O(g)
    event.recipes.createdieselgenerators.distillation([Fluid.of('kubejs:steam', 250)], [Fluid.of('minecraft:water', 125)], 100).superheated()

// Tower Physical Separation

// Tower Water Boiling: H2O(l) -> H2O(g)
    event.recipes.tfmg.distillation([Fluid.of('kubejs:steam', 4000)], [Fluid.of('minecraft:water', 2000)])

// Tower Distilled-water Boiling: H2O(l) -> H2O(g)
    event.recipes.tfmg.distillation([Fluid.of('kubejs:steam', 4000)], [Fluid.of('kubejs:distilled_water', 2000)])

// Liquid-air Fractionation: Liquid Air Mixture -> O2(g) + Ar(g) + N2(g)
// Physical Separation, Output Proportions Are Gameplay Values
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:oxygen', 800),
        Fluid.of('kubejs:argon', 125),
        Fluid.of('kubejs:nitrogen', 3075)
    ], [Fluid.of('kubejs:condensed_air', 2000)])

// Helium Recovery From Natural Gas: Natural Gas Containing Helium -> Helium-depleted Natural Gas + He
// Physical Separation, Natural Gas Composition Is Unspecified
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:natural_gas_depleted', 1925),
        Fluid.of('kubejs:helium', 75)
    ], [Fluid.of('kubejs:natural_gas', 2000)])

// Condensed Natural Gas Fractionation: Condensed Natural Gas Mixture -> C3H8(g) + C2H6(g) + CH4(g)
// Physical Separation Of A Mixture, Not Molecular Synthesis
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:propane', 600),
        Fluid.of('kubejs:ethane', 1000),
        Fluid.of('kubejs:methane', 2400)
    ], [Fluid.of('kubejs:condensed_natural_gas', 2000)])

// Crude-oil Fractionation: Crude Oil -> Residual Oil + Wax Oil + Diesel + Kerosene + Naphtha
// Physical Separation, Petroleum Fractions Have No Single Formula
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:residual_oil', 950),
        Fluid.of('kubejs:wax_oil', 500),
        Fluid.of('kubejs:diesel', 250),
        Fluid.of('kubejs:kerosene', 200),
        Fluid.of('kubejs:naphtha', 100)
    ], [Fluid.of('tfmg:crude_oil', 2000)])

// FCC-effluent Fractionation: FCC Effluent -> Slurry Oil + Diesel + Gasoline + LPG + Propylene + Dry Gas
// Physical Separation, Petroleum Fractions Have No Single Formula
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:slurry_oil', 700),
        Fluid.of('kubejs:diesel', 350),
        Fluid.of('kubejs:gasoline', 700),
        Fluid.of('kubejs:lpg', 150),
        Fluid.of('kubejs:propylene', 100),
        Fluid.of('kubejs:dry_gas', 250)
    ], [Fluid.of('kubejs:fcc_effluent', 2000)])

// Visbreaker-effluent Fractionation: Visbreaker Effluent -> Visbreaker Residue + Heavy Fuel Oil + Diesel + Naphtha + Cracked Gas
// Physical Separation, Petroleum Fractions Have No Single Formula
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:visbreaker_residue', 1600),
        Fluid.of('kubejs:heavy_fuel_oil', 50),
        Fluid.of('kubejs:diesel', 200),
        Fluid.of('kubejs:naphtha', 100),
        Fluid.of('kubejs:cracked_gas', 100)
    ], [Fluid.of('kubejs:visbreaker_effluent', 2000)])

// Cracked Naphtha Fractionation: Condensed Cracked Naphtha -> Pyrolysis Gasoline + C3H8 + C3H6 + C2H6 + C2H4
// Physical Separation, Feed And Pyrolysis Gasoline Are Mixtures
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:pyrolysis_gasoline', 250),
        Fluid.of('kubejs:propane', 50),
        Fluid.of('kubejs:propylene', 100),
        Fluid.of('kubejs:ethane', 100),
        Fluid.of('kubejs:ethylene', 250)
    ], [Fluid.of('kubejs:condensed_cracked_naphtha', 500)])

// Aromatic Mixture Separation: Aromatic Mixture -> C8H10 (Xylenes) + C7H8 (Toluene) + C6H6 (Benzene)
// Physical Separation Preserves 600 Mol: 200 Mol Of Each Aromatic Gas
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:xylene', 400),
        Fluid.of('kubejs:toluene', 400),
        Fluid.of('kubejs:benzene', 400)
    ], [Fluid.of('kubejs:aromatic_mix', 600)])

// Xylene Isomer Separation: Mixed C8H10 -> Separated o-C8H10 + m-C8H10 + p-C8H10 Fractions
// Combined Isomer Separation Preserves 200 Mol Across Registered Gas And Liquid Forms
    event.recipes.tfmg.distillation([
        Fluid.of('kubejs:orthoxylene', 75),
        Fluid.of('kubejs:metaxylene', 50),
        Fluid.of('kubejs:paraxylene', 75)
    ], [Fluid.of('kubejs:xylene', 400)])

// Vat Processes And Reactions

// Steam Condensation: H2O(g) -> H2O(l)
    event.recipes.tfmg.vat_machine_recipe([Fluid.of('kubejs:distilled_water', 500)], [Fluid.of('kubejs:steam', 1000)], 400)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Steam Condensation With Blue Ice: H2O(g) -> H2O(l)
// Blue Ice To Ice Is A Cooling Item Conversion
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:distilled_water', 500),
        'minecraft:ice'
    ], [
        Fluid.of('kubejs:steam', 1000),
        'minecraft:blue_ice'
    ], 150)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Natural Gas CO2 Scrubbing: CO2 + 2 NaOH -> Na2CO3 + H2O
// Pack Feed Model Contains 10 Mol Percent CO2, The Remaining Gas Passes Through
// Caustic Soda Uses 1 mB Per Mol Of NaOH, With Carrier Water Implicit
// Sodium Carbonate Solution Uses 1 mB Per Mol Of Na2CO3, With Carrier Water Implicit
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:purified_natural_gas', 900),
        Fluid.of('kubejs:sodium_carbonate_solution', 50),
        Fluid.of('kubejs:distilled_water', 50)
    ], [
        Fluid.of('kubejs:natural_gas', 1000),
        Fluid.of('kubejs:caustic_soda', 100)
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])
        .id('cwi:vat_machine_recipe/natural_gas_scrubbing')

// Natural-gas Liquefaction: Purified Natural Gas(g) -> Condensed Natural Gas(l)
// Mixture Phase Change, Blue Ice Represents Fictional Cryogenic Cooling
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:condensed_natural_gas', 250),
        'minecraft:ice'
    ], [
        'minecraft:blue_ice',
        Fluid.of('kubejs:purified_natural_gas', 500)
    ], 100)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Hydrogen-chloride Preparation: NaCl + H2SO4 -> NaHSO4 + HCl
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:muriatic_acid', 125),
        'kubejs:sodium_bisulfate_powder'
    ], [
        'ratatouille:salt',
        Fluid.of('kubejs:sulfuric_acid', 125)
    ], 90)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Deacon Chlorine Recovery: 4 HCl + O2 -> 2 Cl2 + 2 H2O
// Overall Deacon Reaction, Copper Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        'kubejs:chlorine_copper_catalyst',
        Fluid.of('kubejs:chlorine', 1000),
        Fluid.of('minecraft:water', 500)
    ], [
        'kubejs:chlorine_copper_catalyst',
        Fluid.of('kubejs:muriatic_acid', 1000),
        Fluid.of('kubejs:oxygen', 500)
    ], 60)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Deacon Chlorine Recovery, Larger Batch: 4 HCl + O2 -> 2 Cl2 + 2 H2O
// Overall Deacon Reaction, Copper Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        'kubejs:chlorine_copper_catalyst',
        Fluid.of('kubejs:chlorine', 4000),
        Fluid.of('minecraft:water', 2000)
    ], [
        'kubejs:chlorine_copper_catalyst',
        Fluid.of('kubejs:muriatic_acid', 4000),
        Fluid.of('kubejs:oxygen', 2000)
    ], 100)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Haber Ammonia Synthesis: N2 + 3 H2 <=> 2 NH3
// Iron Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:ammonia', 400),
        'kubejs:iron_catalyst'
    ], [
        'kubejs:iron_catalyst',
        Fluid.of('kubejs:nitrogen', 200),
        Fluid.of('kubejs:hydrogen', 600)
    ], 240)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Haber Ammonia Synthesis, Two Catalyst Items: N2 + 3 H2 <=> 2 NH3
// Extra Catalyst Changes Duration, Not Stoichiometry
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:ammonia', 400),
        'kubejs:iron_catalyst',
        'kubejs:iron_catalyst'
    ], [
        'kubejs:iron_catalyst',
        'kubejs:iron_catalyst',
        Fluid.of('kubejs:nitrogen', 200),
        Fluid.of('kubejs:hydrogen', 600)
    ], 120)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Ostwald Nitric-acid Synthesis: NH3 + 2 O2 -> HNO3 + H2O
// Overall Ostwald Route, Oxidation And Absorption Stages Are Combined
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:nitric_acid', 50),
        Fluid.of('minecraft:water', 50),
        'kubejs:platinum_catalyst'
    ], [
        Fluid.of('kubejs:ammonia', 100),
        Fluid.of('kubejs:oxygen', 200),
        'kubejs:platinum_catalyst'
    ], 100)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Kerosene/diesel Processing To Paraffin And Dewaxed Oil: Kerosene + Diesel -> Paraffin Oil + Dewaxed Oil
// Mixture Processing, Feed And Product Compositions Are Unspecified
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:paraffin_oil', 150),
        Fluid.of('kubejs:dewaxed_oil', 300),
        'kubejs:zeolite_catalyst'
    ], [
        Fluid.of('kubejs:kerosene', 200),
        Fluid.of('kubejs:diesel', 250),
        'kubejs:zeolite_catalyst'
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])

// Wax-oil Catalytic Cracking: Wax Oil -> FCC Effluent
// Mixture Cracking, No Unique Balanced Molecular Equation
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:fcc_effluent', 2000),
        'kubejs:zeolite_catalyst'
    ], [
        Fluid.of('kubejs:wax_oil', 1000),
        'kubejs:zeolite_catalyst'
    ], 240)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Residual-oil Visbreaking: Residual Oil -> Visbreaker Effluent
// Mixture Thermal Cracking, No Unique Balanced Molecular Equation
    event.recipes.tfmg.vat_machine_recipe([Fluid.of('kubejs:visbreaker_effluent', 2000)], [Fluid.of('kubejs:residual_oil', 2000)], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Naphtha Catalytic Reforming: Naphtha -> Reformate + H2 + Coke Oil Cut
// Mixture Reforming, No Unique Balanced Molecular Equation
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:reformate', 925),
        Fluid.of('kubejs:hydrogen', 50),
        Fluid.of('kubejs:coke_oil', 50),
        'kubejs:platinum_catalyst'
    ], [
        Fluid.of('kubejs:naphtha', 1000),
        'kubejs:platinum_catalyst'
    ], 350)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Aromatic Extraction: Reformate -> Aromatic Extract + Raffinate
// Physical Solvent Extraction, Ethylene Glycol Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:aromatic_mix', 600),
        Fluid.of('kubejs:raffinate', 325),
        Fluid.of('kubejs:ethylene_glycol', 100)
    ], [
        Fluid.of('kubejs:reformate', 925),
        Fluid.of('kubejs:ethylene_glycol', 100)
    ], 150)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])

// Naphtha Steam Cracking: Naphtha -> Cracked Naphtha
// Mixture Steam Cracking, Steam Is Returned As Diluent
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:cracked_naphtha', 1000),
        Fluid.of('kubejs:steam', 200)
    ], [
        Fluid.of('kubejs:naphtha', 500),
        Fluid.of('kubejs:steam', 200)
    ], 180)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Cracked-naphtha Condensation: Cracked Naphtha(g) -> Condensed Cracked Naphtha(l)
// Mixture Phase Change, Blue Ice To Ice Is A Cooling Conversion
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:condensed_cracked_naphtha', 500),
        'minecraft:ice'
    ], [
        'minecraft:blue_ice',
        Fluid.of('kubejs:cracked_naphtha', 1000)
    ], 100)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Air Liquefaction: Air(g) -> Liquid Air
// Mixture Phase Change, Blue Ice Represents Fictional Cryogenic Cooling
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:condensed_air', 500),
        'minecraft:ice'
    ], [
        'minecraft:blue_ice',
        Fluid.of('tfmg:air', 1000)
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Benzene Hydrogenation: C6H6 + 3 H2 -> C6H12
// Gas Benzene Uses 2 mB Per Mol And Liquid Cyclohexane Uses 1 mB Per Mol
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:cyclohexane', 250),
        'kubejs:nickel_catalyst'
    ], [
        Fluid.of('kubejs:benzene', 500),
        Fluid.of('kubejs:hydrogen', 1500),
        'kubejs:nickel_catalyst'
    ], 250)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Cyclohexane Oxidation To Alcohol/ketone Mixture: 4 C6H12 + 3 O2 -> 2 C6H12O + 2 C6H10O + 2 H2O
// Combined Cyclohexanol And Cyclohexanone Branches, Cobalt Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:cyclohexanol', 500),
        Fluid.of('kubejs:cyclohexanone', 500),
        Fluid.of('minecraft:water', 500),
        'kubejs:cobalt_catalyst'
    ], [
        Fluid.of('kubejs:cyclohexane', 1000),
        Fluid.of('kubejs:oxygen', 1500),
        'kubejs:cobalt_catalyst'
    ], 300)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Cyclohexanol Oxidation To Adipic Acid: C6H12O + 2 HNO3 -> C6H10O4 + N2O + 2 H2O
// Aggregate Oxidation Equation, Solution Carrier Water Is Unspecified
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:adipic_acid_solution', 500),
        Fluid.of('kubejs:nitrous_oxide', 1000),
        Fluid.of('minecraft:water', 1000)
    ], [
        Fluid.of('kubejs:cyclohexanol', 500),
        Fluid.of('kubejs:nitric_acid', 1000)
    ], 100)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])

// Adiponitrile Formation: C6H10O4 + 2 NH3 -> C6H8N2 + 4 H2O
// Aggregate Amidation And Dehydration Equation
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:adiponitrile', 500),
        Fluid.of('minecraft:water', 2000)
    ], [
        Fluid.of('kubejs:adipic_acid_solution', 500),
        Fluid.of('kubejs:ammonia', 2000)
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])
        .set('heat_level', 2)

// Adiponitrile Hydrogenation: C6H8N2 + 4 H2 -> C6H16N2
// Nickel Catalyst Is Returned, Solution Carrier Water Is Unspecified
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:hexamethylenediamine_solution', 500),
        'kubejs:nickel_catalyst'
    ], [
        Fluid.of('kubejs:adiponitrile', 500),
        Fluid.of('kubejs:hydrogen', 4000),
        'kubejs:nickel_catalyst'
    ], 250)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])
        .set('heat_level', 2)

// Nylon Salt Formation: C6H16N2 + C6H10O4 -> C12H26N2O4
// Hexamethylenediammonium Adipate Salt, No Condensation Water Yet
    event.recipes.tfmg.vat_machine_recipe([ '4x kubejs:nylon_salt_crystal' ], [
        Fluid.of('kubejs:hexamethylenediamine_solution', 500),
        Fluid.of('kubejs:adipic_acid_solution', 500)
    ], 120)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])
        .set('heat_level', 2)

// Cumene Route To Phenol And Acetone: C6H6 + C3H6 + O2 -> C6H6O + C3H6O
// Gas Reactants Use 2 mB Per Mol And Liquid Products Use 1 mB Per Mol
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:phenol', 250),
        Fluid.of('kubejs:acetone', 250),
        Fluid.of('kubejs:sulfuric_acid', 50)
    ], [
        Fluid.of('kubejs:benzene', 500),
        Fluid.of('kubejs:propylene', 500),
        Fluid.of('kubejs:oxygen', 500),
        Fluid.of('kubejs:sulfuric_acid', 50)
    ], 240)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Bisphenol-A Synthesis: 2 C6H6O + C3H6O -> C15H16O2 + H2O
// Acid Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        '2x kubejs:bisphenol_a',
        Fluid.of('minecraft:water', 250),
        Fluid.of('kubejs:sulfuric_acid', 50)
    ], [
        Fluid.of('kubejs:phenol', 500),
        Fluid.of('kubejs:acetone', 250),
        Fluid.of('kubejs:sulfuric_acid', 50)
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Epichlorohydrin Aggregate Route: C3H6 + 2 Cl2 + 3 NaOH -> C3H5ClO + 3 NaCl + 2 H2O
// Aggregate Allyl Chloride And Dichlorohydrin Route Including HCl Neutralization
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:epichlorohydrin', 125),
        Fluid.of('kubejs:salt_solution', 375),
        Fluid.of('minecraft:water', 250)
    ], [
        Fluid.of('kubejs:caustic_soda', 375),
        Fluid.of('kubejs:chlorine', 500),
        Fluid.of('kubejs:propylene', 250)
    ], 280)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', [])

// Epoxy-resin Production: n C15H16O2 + n C3H5ClO + n NaOH -> [C18H20O3]n + n NaCl + n H2O
// Formal Repeat Unit Model Ignoring Chain Ends, Resin Grade Is Unspecified
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:epoxy_resin', 250),
        Fluid.of('kubejs:salt_solution', 250),
        Fluid.of('minecraft:water', 250)
    ], [
        '2x kubejs:bisphenol_a',
        Fluid.of('kubejs:epichlorohydrin', 250),
        Fluid.of('kubejs:caustic_soda', 250)
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])

// Polyethylene Formation: n C2H4 -> [CH2-CH2]n
// Addition Polymerization, Quantities Represent Repeat Units
    event.recipes.tfmg.vat_machine_recipe([Fluid.of('kubejs:molten_polyethylene', 100)], [Fluid.of('kubejs:ethylene', 200)], 80)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Polyethylene Formation, Zinc Variant: n C2H4 -> [CH2-CH2]n
// Same Repeat Equation, Returned Zinc Does Not Establish A Suitable Initiator
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:molten_polyethylene', 100),
        'kubejs:zinc_powder'
    ], [
        Fluid.of('kubejs:ethylene', 200),
        'kubejs:zinc_powder'
    ], 50)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Polypropylene Formation: n C3H6 -> [CH2-CH(CH3)]n
// Addition Polymerization, Suitable Catalyst Conditions Are Implicit
    event.recipes.tfmg.vat_machine_recipe([Fluid.of('kubejs:molten_polypropylene', 100)], [Fluid.of('kubejs:propylene', 200)], 120)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Polyvinyl Chloride Production

// Ethylene Dichlorination: C2H4 + Cl2 -> C2H4Cl2
// EDC Is 1,2 Dichloroethane, Iron Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:edc', 500),
        'kubejs:iron_catalyst'
    ], [
        Fluid.of('kubejs:ethylene', 1000),
        Fluid.of('kubejs:chlorine', 1000),
        'kubejs:iron_catalyst'
    ], 120)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// EDC Cracking To Vinyl Chloride: C2H4Cl2 -> C2H3Cl + HCl
// EDC Cracking Produces Vinyl Chloride And HCl
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:vinyl_chloride_monomer', 500),
        Fluid.of('kubejs:muriatic_acid', 500)
    ], [Fluid.of('kubejs:edc', 500)], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// PVC Formation: n C2H3Cl -> [CH2-CHCl]n
// Addition Polymerization, This Equation Does Not Validate The Catalyst System
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:molten_polyvinyl_chloride', 1000),
        'kubejs:sulfur_copper_catalyst'
    ], [
        Fluid.of('kubejs:vinyl_chloride_monomer', 1000),
        'kubejs:sulfur_copper_catalyst'
    ], 150)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// PVC Formation, Zinc Variant: n C2H3Cl -> [CH2-CHCl]n
// Same Repeat Equation, This Equation Does Not Validate The Catalyst System
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:molten_polyvinyl_chloride', 1000),
        'kubejs:sulfur_copper_catalyst',
        'kubejs:zinc_powder'
    ], [
        Fluid.of('kubejs:vinyl_chloride_monomer', 1000),
        'kubejs:sulfur_copper_catalyst',
        'kubejs:zinc_powder'
    ], 90)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Terephthalic-acid Synthesis: C8H10 + 3 O2 -> C8H6O4 + 2 H2O
// Para Xylene Oxidation, Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        'kubejs:terephthalic_acid',
        Fluid.of('minecraft:water', 250),
        'kubejs:oxidation_catalyst'
    ], [
        Fluid.of('kubejs:paraxylene', 125),
        Fluid.of('kubejs:oxygen', 750),
        'kubejs:oxidation_catalyst'
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Ethylene-glycol Aggregate Synthesis: 2 C2H4 + O2 + 2 H2O -> 2 C2H6O2
// Aggregate Ethylene Oxide Formation And Hydration
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:ethylene_glycol', 500),
        'kubejs:silver_catalyst'
    ], [
        Fluid.of('kubejs:ethylene', 1000),
        Fluid.of('kubejs:oxygen', 500),
        Fluid.of('minecraft:water', 500),
        'kubejs:silver_catalyst'
    ], 180)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// PET Formation: n C8H6O4 + n C2H6O2 -> [C10H8O4]n + 2n H2O
// Bulk Condensation Equation Ignores Chain Ends
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:molten_pet', 250),
        Fluid.of('minecraft:water', 500)
    ], [
        '2x kubejs:terephthalic_acid',
        Fluid.of('kubejs:ethylene_glycol', 250)
    ], 350)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// PET Formation, Larger Batch: n C8H6O4 + n C2H6O2 -> [C10H8O4]n + 2n H2O
// Bulk Condensation Equation Ignores Chain Ends
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:molten_pet', 500),
        Fluid.of('minecraft:water', 1000)
    ], [
        '4x kubejs:terephthalic_acid',
        Fluid.of('kubejs:ethylene_glycol', 500)
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Byproduct Chemical Processing

// Slurry-oil Coking: Slurry Oil -> Coke + Diesel + Naphtha + Cracked Gas
// Mixture Coking, Feed Composition Is Unspecified
    event.recipes.tfmg.vat_machine_recipe([
        'tfmg:coal_coke_dust',
        Fluid.of('kubejs:diesel', 125),
        Fluid.of('kubejs:naphtha', 125),
        Fluid.of('kubejs:cracked_gas', 250)
    ], [Fluid.of('kubejs:slurry_oil', 500)], 300)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Visbreaker-residue Coking: Visbreaker Residue -> Coke + Diesel + Naphtha + Cracked Gas
// Mixture Coking, Feed Composition Is Unspecified
    event.recipes.tfmg.vat_machine_recipe([
        'tfmg:coal_coke_dust',
        Fluid.of('kubejs:diesel', 125),
        Fluid.of('kubejs:naphtha', 125),
        Fluid.of('kubejs:cracked_gas', 250)
    ], [Fluid.of('kubejs:visbreaker_residue', 500)], 280)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Pyrolysis Gasoline Hydrogen Treatment And Aromatic Recovery: Pyrolysis Gasoline + H2 -> Benzene + Toluene + Xylenes + Raffinate
// Combined Hydrogen Treatment And Separation, No Unique Molecular Equation
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:benzene', 150),
        Fluid.of('kubejs:toluene', 100),
        Fluid.of('kubejs:xylene', 100),
        Fluid.of('kubejs:raffinate', 150),
        'kubejs:nickel_catalyst'
    ], [
        Fluid.of('kubejs:pyrolysis_gasoline', 450),
        Fluid.of('kubejs:hydrogen', 100),
        'kubejs:nickel_catalyst'
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)

// Ethane Steam Cracking: C2H6 -> C2H4 + H2
// Steam Is Returned As Diluent
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:ethylene', 500),
        Fluid.of('kubejs:hydrogen', 500),
        Fluid.of('kubejs:steam', 100)
    ], [
        Fluid.of('kubejs:ethane', 500),
        Fluid.of('kubejs:steam', 100)
    ], 120)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Toluene Hydrodealkylation: C7H8 + H2 -> C6H6 + CH4
// All Four Reacting Fluids Are Registered Gases And Use Equal Mole Quantities
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:benzene', 200),
        Fluid.of('kubejs:methane', 200),
        'kubejs:dehydrogenation_catalyst'
    ], [
        Fluid.of('kubejs:toluene', 200),
        Fluid.of('kubejs:hydrogen', 200),
        'kubejs:dehydrogenation_catalyst'
    ], 200)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Propane Dehydrogenation: C3H8 -> C3H6 + H2
// Dehydrogenation Catalyst Is Returned
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:propylene', 500),
        Fluid.of('kubejs:hydrogen', 500),
        'kubejs:dehydrogenation_catalyst'
    ], [
        Fluid.of('kubejs:propane', 500),
        'kubejs:dehydrogenation_catalyst'
    ], 250)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 3)

// Diesel Hydrogen Processing: Diesel + H2 -> Aromatic Solvent + Naphtha
// Mixture Hydrogen Processing, No Unique Balanced Molecular Equation
    event.recipes.tfmg.vat_machine_recipe([
        Fluid.of('kubejs:aromatic_solvent', 300),
        Fluid.of('kubejs:naphtha', 100),
        'kubejs:nickel_catalyst'
    ], [
        Fluid.of('kubejs:diesel', 500),
        Fluid.of('kubejs:hydrogen', 200),
        'kubejs:nickel_catalyst'
    ], 220)
        .set('min_size', 1)
        .set('allowed_vat_types', ['tfmg:steel', 'tfmg:fireproof'])
        .set('machines', ['tfmg:mixing'])
        .set('heat_level', 2)
})
