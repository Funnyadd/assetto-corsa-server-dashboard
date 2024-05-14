const { spawn } = require('node:child_process')

// const serverBasePath = "../../assetto-server-test-files"

const absoluteBasePath = "/Users/adam/assetto-server-test-files"
const executableFileName = "./test.sh" // For testing purposes
// const executableFileName = "acServer"

const wordsToRemove = ["Cool", "with friends", "with more friends"]

exports.startServerScript = (server) => {
    const screenName = getShortServerName(server.name)

    if (server.isStarted) {
        throw { status: 400, message: "Server is already started" }
    }

    try {
        const command = `screen -dmS acs-${screenName} ${executableFileName}`
        executeCommand(command, getServerFolderName(server))

        console.log(`[${screenName}] : server started on port: ${server.currentPort}`)
        server.isStarted = true
    }
    catch (error) {
        console.error("Error: " + error)
    }
}

exports.stopServerScript = (server) => {
    const screenName = getShortServerName(server.name, wordsToRemove)

    if (!server.isStarted) {
        server.isStarted = false
        throw { message: "Server is not started" }
    }

    try {
        const command = `screen -X -S acs-${screenName} quit`
        executeCommand(command, getServerFolderName(server))

        console.log(`[${screenName}] : Server stopped`)
        server.isStarted = false
    }
    catch (error) {
        console.error("Error: " + error)
    }
}

const executeCommand = (command, folderName) => {
    console.log(`~ Executing command: ${command}`)

    try {
        const execution = spawn(command,
        {
            cwd: `${absoluteBasePath}/${folderName}`,
            detached: true,
            shell: true
        })
        
        setTimeout(() => {  
            execution.kill()
        }, 5000);
    }
    catch (error) {
        throw error
    }
}

const getServerFolderName = (server) => {
    return server.name.trim().toLowerCase().replaceAll(" ", "_")
}

const getShortServerName = (str) => {
    wordsToRemove.forEach((word) => {
        str = str.replaceAll(word, "")
    })
    return str.trim().replaceAll(" ", "-")
}