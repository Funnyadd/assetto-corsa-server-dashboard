const { spawn } = require('node:child_process')

const absoluteBasePath = "/Users/adam/assetto-server-test-files"
const executableFileName = process.env.RUNNING_OS === "mac" ? "./test.sh" : "acServer"
const screenInstancePrefix = "acs-"

const wordsToRemove = ["Cool", "with friends"]

exports.startServerScript = (server) => {
    const screenName = this.getShortServerName(server.name)

    if (server.isStarted) {
        throw { status: 400, message: "Server is already started" }
    }

    try {
        const command = `screen -dmS ${screenInstancePrefix}${screenName} ${executableFileName}`
        executeServerShellCommand(command, getServerFolderName(server))

        console.log(`[${screenName}] : server started on port: ${server.lastPort}`)
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
        const command = `screen -X -S ${screenInstancePrefix}${screenName} quit`
        executeServerShellCommand(command, getServerFolderName(server))

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
                    resolve([])
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
                        list[index] = line.trim().split(`.${screenInstancePrefix}`)[1]
                    })

                    resolve(serverListStr)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

exports.updateServerPortScript = (server) => {
    // 1520 is the difference between 8080 and 9600 which are the base numbers used for assetto corsa servers
    try {
        const tcpUdpPort = server.lastPort + 1520
        const command = `sed -i${process.env.RUNNING_OS === "mac" ? ".bak" : ""}`
                    + ` -e "s/HTTP_PORT=.*[0-9]/HTTP_PORT=${server.lastPort}/gI"`
                    + ` -e "s/TCP_PORT=.*[0-9]/TCP_PORT=${tcpUdpPort}/gI"`
                    + ` -e "s/UDP_PORT=.*[0-9]/UDP_PORT=${tcpUdpPort}/gI"`
                    + ` server_cfg.ini`
        executeServerShellCommand(command, `${getServerFolderName(server)}/cfg`)
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

const executeServerShellCommand = (command, folderName) => {
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
        }, 3000)
    }
    catch (error) {
        throw error
    }
}

const getServerFolderName = (server) => {
    return server.name.trim().toLowerCase().replaceAll(" ", "_")
}
