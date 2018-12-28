var file = process.argv[2];

function readFile(){
    if(file.substr(-3,3) === ".mw"){
        fileLex(file);
        console.log(file);
    }
    else {
        console.log("ERROR: Incorrect file extension.")
    }
}

function fileLex(f){
    const fs = require('fs')
    const contents = fs.readFileSync(f, 'utf8')
    var tape = []
    var token = ''

    for(let j = 0; j < contents.length; j++){
        token += contents[j]
        token.trim()
        console.log(token)

        if(token === 'motor'){
            console.log("MOTOR")
            tape.push['M']
            token = ''
        }

        else if(tape.pop() === 'M' && token[j-1] === ";"){
            console.log("MOTOR VARIABLE")
            tape.push['MV']
            token = ''
        }

        else if(token === 'print'){
            console.log("PRINT")
            tape.push['P']
            token = ''
        }

    }
}

readFile();