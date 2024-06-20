
exports.getSteamUsername = async (steamId) => {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&format=json&steamids=${steamId}`
    
    return await fetch(url)
    .then(async response => {
        let body = await response.json()
        let userList = body.response.players

        if (userList[0]) {
            return userList[0].personaname
        }

        throw { status: 404, message: `Could not find Steam user with steamId: ${steamId}` }
    })
    .catch(error => {
        throw error
    })
}