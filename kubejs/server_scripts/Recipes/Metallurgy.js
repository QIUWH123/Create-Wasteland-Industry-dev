ServerEvents.recipes(event => {

// Material Data And Mold Setup

    const materials = Object.values(global.materialTypes)
    const moldTypes = ['terracotta', 'fireproof_brick']
    const shapes = ['sheet', 'rod', 'nugget', 'ingot']

    function calcTime(event, mat, shape) {
        const blockTime = mat.mp
        const ingotTime = Math.round(blockTime / 5)
        if (shape === 'block') return blockTime
        if (shape === 'sheet' || shape === 'ingot') return ingotTime
        if (shape === 'nugget') return Math.round(ingotTime / 5)
        if (shape === 'rod' || shape === 'wire' || shape === 'spring') return Math.round(ingotTime / 3)
        if (shape === 'powder') return Math.round(ingotTime * 0.75)
        return ingotTime
    }

// Auto Generated Casting Melting And Bulk Melting For Metals Alloys Metalloids And Polymers

    materials.forEach(mat => {
        if (!['metal', 'alloy', 'metalloid', 'polymer'].includes(mat.type)) return
        if (!mat.fluid) return
        moldTypes.forEach(moldPrefix => {
            if (moldPrefix === 'terracotta' && mat.mp >= 1200) return
            shapes.forEach(shape => {
                const moldItem = `kubejs:${moldPrefix}_${shape}_mold`
                const outputItem = mat.items[shape]
                if (!outputItem) return
                const amount = (shape === 'sheet' || shape === 'ingot') ? 90 : (shape === 'rod' ? 45 : 10)
                event.recipes.createmetallurgy.casting_in_table(outputItem, [moldItem, Fluid.of(mat.fluid, amount)]).processingTime(calcTime(event, mat, shape)).set('mold_consumed', false)
            })
        })

        if (mat.items.block) {
            event.recipes.createmetallurgy.casting_in_basin(mat.items.block, [Fluid.of(mat.fluid, 810)]).processingTime(calcTime(event, mat, 'block')).set('mold_consumed', false)
        }

        if (mat.mp > 2400) return

        const heat = mat.mp >= 1200 ? 'superheated' : 'heated'
        const bulkMin = heat === 'superheated' ? 9 : 4
        const bulkMax = 50
        const itemTypes = ['sheet', 'wire', 'spring', 'rod', 'powder', 'nugget', 'ingot', 'block']
        itemTypes.forEach(type => {
            const itemId = mat.items[type]
            if (!itemId) return
            const amount =
                (type === 'block') ? 810 :
                (type === 'wire' || type === 'rod' || type === 'spring') ? 45 :
                (type === 'nugget') ? 10 : 90
            event.recipes.createmetallurgy.melting(Fluid.of(mat.fluid, amount), itemId).processingTime(calcTime(event, mat, type)).heatRequirement(heat)
            event.recipes.createmetallurgy.bulk_melting(Fluid.of(mat.fluid, amount), itemId).processingTime(calcTime(event, mat, type)).minHeatRequirement(bulkMin).maxHeatRequirement(bulkMax)
        })
    })

// Auto Generated Pressing Milling And Rolling

    materials.forEach(mat => {
        if (!['metal', 'alloy', 'metalloid', 'polymer'].includes(mat.type)) return
        if (!mat.items) return

        const items = mat.items

        if (items.ingot && items.sheet && mat.stiffness < 400) event.recipes.create.pressing(items.sheet, items.ingot)
        if (items.ingot && items.powder && mat.stiffness < 400) event.recipes.create.milling(items.powder, items.ingot)
        if (items.sheet && items.powder && mat.stiffness < 400) event.recipes.create.milling(items.powder, items.sheet)
        if (items.powder && items.ingot && mat.mp < 1200) event.blasting(items.ingot, items.powder)
        if (items.powder && items.ingot && mat.mp < 800) event.smelting(items.ingot, items.powder)
        if (items.ingot && items.rod && mat.stiffness < 400) event.recipes.createaddition.rolling('2x ' + items.rod, items.ingot)
        if (items.sheet && items.wire && mat.stiffness < 400) event.recipes.createaddition.rolling('2x ' + items.wire, items.sheet)
        if (items.wire && items.spring && mat.stiffness < 400) event.recipes.vintageimprovements.coiling(items.spring, items.wire).springColor('000000').processingTime(7.5 * Math.sqrt(mat.stiffness))
        if (items.rod && items.spring && mat.stiffness < 300) event.recipes.vintageimprovements.coiling(items.spring, items.rod).springColor('000000').processingTime(10 * Math.sqrt(mat.stiffness))
        if (items.ingot && items.rod && mat.stiffness < 100) event.recipes.createdieselgenerators.wire_cutting('2x ' + items.rod, items.ingot)
        if (items.sheet && items.wire && mat.stiffness < 100) event.recipes.createdieselgenerators.wire_cutting('2x ' + items.wire, items.sheet)
        if (items.ingot && items.block && (items.ingot.startsWith('kubejs:') || items.block.startsWith('kubejs:') || items.ingot.startsWith('vintageimprovements:') || items.block.startsWith('vintageimprovements:'))) addStoragePair(event, items.block, items.ingot, 9)
        if (items.ingot && items.nugget && (items.ingot.startsWith('kubejs:') || items.nugget.startsWith('kubejs:') || items.ingot.startsWith('vintageimprovements:') || items.nugget.startsWith('vintageimprovements:'))) addStoragePair(event, items.ingot, items.nugget, 9)
    })

})
