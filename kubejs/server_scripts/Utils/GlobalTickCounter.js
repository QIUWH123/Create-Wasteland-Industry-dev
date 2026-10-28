let globalTickCounter = 0

ServerEvents.tick(() => {
    globalTickCounter = (globalTickCounter + 1) % 1000
})

