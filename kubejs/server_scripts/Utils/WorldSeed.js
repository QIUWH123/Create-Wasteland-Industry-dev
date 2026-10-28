ServerEvents.loaded(event => {
    let seedValue

    try {
        seedValue = event.server.overworld().getSeed()
    } catch (error) {
        try {
            seedValue = event.server.worldData.worldGenOptions().seed()
        } catch (fallbackError) {
            console.error('[CWI] Could not read the world seed: ' + fallbackError)
            return
        }
    }

    console.log('[CWI] World seed: ' + seedValue)
})

