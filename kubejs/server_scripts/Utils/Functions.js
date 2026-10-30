// priority: 1000

function random(min, max) {
    return Math.random() * (max - min) + min
}

function desaturateHex(hex, amount) {
    const value = parseInt(String(hex).replace('#', ''), 16)
    let red = (value >> 16) & 255
    let green = (value >> 8) & 255
    let blue = value & 255
    const average = (red + green + blue) / 3

    red = Math.round(red + amount * (average - red))
    green = Math.round(green + amount * (average - green))
    blue = Math.round(blue + amount * (average - blue))

    return '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)
}

function getGlobalEntry(mapName, entryId, type, nestedKey) {
    const map = global[mapName]
    if (!map) return null

    const entry = map[entryId]
    if (!entry) return null

    if (entry[type] !== undefined) return entry[type]

    const nested = nestedKey ? entry[nestedKey] : null
    if (nested && nested[type] !== undefined) return nested[type]

    return null
}

function getMaterial(materialId, type) {
    if (type === 'fluid') return getGlobalEntry('materialTypes', materialId, type)
    return getGlobalEntry('materialTypes', materialId, type, 'items')
}

function getStone(stoneId, type) {
    return getGlobalEntry('stoneTypes', stoneId, type, 'items')
}

