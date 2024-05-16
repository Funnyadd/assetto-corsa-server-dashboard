const { spawn } = require('node:child_process')

const absoluteBasePath = "/Users/adam/assetto-server-test-files"
const executableFileName = "./test.sh" // For testing purposes
// const executableFileName = "acServer"

const wordsToRemove = ["Cool", "with friends"]

exports.startServerScript = (server) => {
    const screenName = this.getShortServerName(server.name)

    if (server.isStarted) {
        throw { status: 400, message: "Server is already started" }
    }

    try {
        const command = `screen -dmS acs-${screenName} ${executableFileName}`
        executeScreenCommand(command, getServerFolderName(server))

        console.log(`[${screenName}] : server started on port: ${server.currentPort}`)
        server.isStarted = true
    }
    catch (error) {
        throw error
    }
}

exports.stopServerScript = (server) => {
    const screenName = this.getShortServerName(server.name)

    if (!server.isStarted) {
        server.isStarted = false
        throw { status: 400, message: "Server is not started" }
    }

    try {
        const command = `screen -X -S acs-${screenName} quit`
        executeScreenCommand(command, getServerFolderName(server))

        console.log(`[${screenName}] : Server stopped`)
        server.isStarted = false
    }
    catch (error) {
        throw error
    }
}

exports.getActiveScreenList = async () => {
    console.log(`~ Executing command: screen -ls`)
    
    try {
        const execution = spawn("screen -ls",
        {
            detached: true,
            shell: true
        })

        return new Promise((resolve, reject) => {
            execution.stdout.on('data', output => {
                execution.kill()

                if (output.toString().includes("No Sockets found")) {
                    resolve("no server running")
                }
                else {
                    let serverListStr = output.toString()
                        .replace("There is a screen on:", "")
                        .replace("There are screens on:", "")
                        .replaceAll("(Detached)", "")
                        .split("Sockets in")[0]
                        .split("Socket in")[0]
                        .replaceAll("\t\n", "~")
                        .split("~")

                    serverListStr.splice(-1)

                    serverListStr.forEach((line, index, list) => {
                        list[index] = line.trim().split(".acs-")[1]
                    })

                    resolve(serverListStr)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

exports.getShortServerName = (str) => {
    str = str.replace("with more friends", "2")
    wordsToRemove.forEach(word => {
        str = str.replace(word, "")
    })
    return str.trim().replaceAll(" ", "-")
}

const executeScreenCommand = (command, folderName) => {
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
        }, 5000)
    }
    catch (error) {
        throw error
    }
}

const getServerFolderName = (server) => {
    return server.name.trim().toLowerCase().replaceAll(" ", "_")
}
