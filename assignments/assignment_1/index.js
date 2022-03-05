const { stdin, stdout } = require("process")

function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const data=process.argv
    return(data[data.length-1])
}

function getNameFromEnv() {
    // Write your code here
    return process.env.name
}

function getNameFromReadLine() {
    // Write your code here
    const readLine=require("readline")
    const rlinput=readLine.createInterface({input:stdin,output:stdout})
    rlinput.question("What's your name?",(answer)=>{return answer})
}
module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}