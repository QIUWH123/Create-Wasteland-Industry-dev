// priority: -10000

const PreTagKubeEvent = Java.loadClass('dev.latvian.mods.kubejs.server.tag.PreTagKubeEvent')
const TagCleanupConsumer = Java.loadClass('java.util.function.Consumer')

// Defer Map Changes Until KubeJS Has Loaded The Actual Tags
function removeLegacyTags(event) {
    if (event instanceof PreTagKubeEvent) {
        event.actions.add(new TagCleanupConsumer(removeLegacyTags))
        return
    }

// Remove Nested Legacy References Before Deleting The Tag Definitions
    event.tags.values().forEach(tag => {
        tag.entries.removeIf(source => {
            let location = source.entry().elementOrTag()
            return location.tag() && String(location.id().getNamespace()) === 'forge'
        })
    })

    event.tags.keySet().removeIf(id => String(id.getNamespace()) === 'forge')
}

const legacyTagRegistries = ['item', 'block', 'fluid']
legacyTagRegistries.forEach(registry => ServerEvents.tags(registry, removeLegacyTags))
