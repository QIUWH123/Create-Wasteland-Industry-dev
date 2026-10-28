const $PortalSpawnEvent = Java.loadClass("net.neoforged.neoforge.event.level.BlockEvent$PortalSpawnEvent")

NativeEvents.onEvent($PortalSpawnEvent, event=>{
    event.setCanceled(true)
})
