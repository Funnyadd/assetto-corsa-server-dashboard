exports.getServerJsonData = async (port) => {
    const url = `${process.env.ASSETTO_SERVER_ENDPOINT}:${port}/JSON%7C`;

    return await fetch(url)
    .then(res => res.json())
    .catch(err => {
        console.error(err)
        return { status: 404, error: "No server running at this address" }
    })
}