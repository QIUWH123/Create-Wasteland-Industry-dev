/* Disabled temporarily; keep this implementation for a later serum-deployer fix.
ItemEvents.entityInteracted('biomancy:injector', event => {
    let { item, player, level, target } = event
    let serum = item.nbt.inventory.Item
    let fac = player.facing
    // checks block above deployer
    let BLOCK = player.block.offset('up', 1).offset(fac, -2)
    if (!player.isFake) return
    // Fill an empty bioinjector from a chute or hopper above the deployer.
    if (!serum || !item.nbt.inventory) {
        if (BLOCK.id == 'create:chute' || BLOCK.id == 'create:smart_chute' || BLOCK.id == 'minecraft:hopper') {
            BLOCK.getInventory().allItems.forEach(item => {
                if (!item.id.match(/^.*serum$|^bio.*cure$|^bio.*stimulant$|^bio.*boost$/)) return
                let Pot = item.getNbt()
                BLOCK.getInventory().extractItem(1, 1, false)
                if (!Pot) {
                    event.item.nbt.merge({ inventory: { Item: { count: 1, id: item.id }, ItemAmount: 1 } })
                } else {
                    event.item.nbt.merge({ inventory: { Item: { count: 1, id: item.id, tag: Pot }, ItemAmount: 1 } })
                }
            })
        }
    // If the bioinjector has 1 to 15 serums, look for a matching serum above it.
    } else if (serum.count >= 0) {
        let plus1 = serum.count + 1
        if (BLOCK.id == 'create:chute' || BLOCK.id == 'create:smart_chute' || BLOCK.id == 'minecraft:hopper') {
            BLOCK.getInventory().allItems.forEach(item => {
                if (item.id == serum.id && serum.count < 16) {
                    let Pot = item.getNbt()
                    BLOCK.getInventory().extractItem(BLOCK.getInventory().find(serum.id), 1, false)
                    if (!Pot) {
                        event.item.nbt.merge({ inventory: { Item: { count: plus1, id: item.id }, ItemAmount: plus1 } })
                    } else {
                        event.item.nbt.merge({ inventory: { Item: { count: plus1, id: item.id, tag: Pot }, ItemAmount: plus1 } })
                    }
                }
            })
        }
        // Trigger the bioinjector.
        Java.loadClass('com.github.elenterius.biomancy.item.injector.InjectorItem').tryInjectLivingEntity(level, target.block.pos, item)
    }
})
*/
