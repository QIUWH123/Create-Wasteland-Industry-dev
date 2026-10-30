CwiEvents.blockRegistration(event => {

    const blocksAndItems = []
    blocksAndItems.forEach(id => event.prevent(id))

    const itemsOnly = []
    itemsOnly.forEach(id => event.preventItem(id))

    const blocksOnly = []
    blocksOnly.forEach(id => event.preventBlock(id))

})