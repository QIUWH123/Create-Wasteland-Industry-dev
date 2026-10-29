ServerEvents.recipes(event => {
    global.microbes.forEach(microbe => {
        microbe.variants.forEach(variant => {
            const plate = `${variant.trait}_${microbe.name}_agar_plate`
            event.recipes.cwi.incubating()
                .itemInputs([{ ingredient: `kubejs:sealed_${plate}`, count: 1 }])
                .itemOutputs([{ item: `kubejs:cultured_${plate}` }])
                .processingTime(variant.time)
                .minimumRpm(64)
                .incubationDisplay({
                    microbe: `kubejs:${microbe.name}`,
                    yield_count: variant.count,
                    steps: variant.steps
                })
                .id(`cwi:incubating/${microbe.name}/${variant.trait}`)
        })
    })
})
