// priority: -1

function getItemsFromTags(tags) {
	const items = []
	tags.forEach(tag => {
		const iterator = Ingredient.of(tag).itemIds.iterator()
		while (iterator.hasNext()) items.push(iterator.next())
	})
	return items
}

StartupEvents.registry("creative_mode_tab", (event) => {
	function addCreativeTab(name) {
		return event.create(`cwi:${name}`)
	}

	addCreativeTab("fan_catalysts")
		.icon(() => Item.of("kubejs:brass_fan_blasting_catalyst"))
		.content(() => getItemsFromTags(["#cwi:fan_catalysts"]))
		
	addCreativeTab("fluids")
		.icon(() => Item.of("kubejs:oxygen_bucket"))
		.content(() => getItemsFromTags(["#cwi:containers"]))
		
	addCreativeTab("dusts")
		.icon(() => Item.of("kubejs:gold_powder"))
		.content(() => getItemsFromTags(["#cwi:all_powders"]))
		
	addCreativeTab("tools")
		.icon(() => Item.of("minecraft:iron_pickaxe"))
		.content(() => getItemsFromTags(["#minecraft:tools"]))
		
	addCreativeTab("materials")
		.icon(() => Item.of("kubejs:bronze_ingot"))
		.content(() => getItemsFromTags([
			"#cwi:ingots",
			"#cwi:sheets",
			"#cwi:nuggets",
			"#cwi:powders",
			"#cwi:wires",
			"#cwi:rods",
			"#cwi:blocks"
		]))

	addCreativeTab("plot_items")
		.icon(() => Item.of("kubejs:material_note"))
		.content(() => getItemsFromTags(["#cwi:plot_items"]))
		
	addCreativeTab("culture_plates")
		.icon(() => Item.of("kubejs:sterile_petri_dish"))
		.content(() => getItemsFromTags(["#cwi:petri_dish"]))

})

StartupEvents.modifyCreativeTab('kubejs:tab', event => {

    event.setIcon("kubejs:rusted_industrial_aluminum_casing")
    event.setDisplayName('CWI')

	event.remove(getItemsFromTags([
		"#cwi:fan_catalysts",
		"#cwi:containers",
		"#cwi:powders",
		"#cwi:plot_items",
		"#cwi:petri_dish"
	]))

})

StartupEvents.modifyCreativeTab("create:base", (event) => {

	event.add([
		"create:chromatic_compound",
		"create:shadow_steel",
		"create:refined_radiance",
		"create:shadow_steel_casing",
		"create:refined_radiance_casing"
	])
	
})
