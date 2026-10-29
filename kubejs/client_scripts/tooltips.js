ItemEvents.modifyTooltips(event => {
    const addedFormulas = new Set()
    Object.values(global.materialTypes).forEach(material => {
        if (!material.items || !material.formula) return
        Object.values(material.items).forEach(itemId => {
            const key = itemId + '\n' + material.formula
            if (!itemId || !Item.exists(itemId) || addedFormulas.has(key)) return
            addedFormulas.add(key)
            event.add(itemId, [Text.of(material.formula).yellow()])
        })
    })

// Check Tags At Hover Time After Server Tags Have Loaded

    event.modifyAll(tooltip => tooltip.dynamic('cwi:item_warnings'))
})

ItemEvents.dynamicTooltips('cwi:item_warnings', event => {
    if (event.item.hasTag('cwi:hot_items')) {
        event.add([Text.translate('tooltip.kubejs.hot').red()])
    }
    if (event.item.hasTag('cwi:no_gravity_items')) {
        event.add([Text.translate('tooltip.kubejs.no_gravity').white()])
    }
})
