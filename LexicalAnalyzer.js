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
    var openQuote = false
    var m = 0
    var mv = 0
    var p = 0
    var s = 0
    var sem = 0

    for(let j = 0; j < contents.length; j++){
        token += contents[j]
        console.log(token)

        if(token === ' ' || token === '\n'){
            token = ''
        }

        else if(token === ';'){
            console.log("SEMICOLON")
            tape['SEM' + sem] = token
            sem++
            token = ''
        }

        else if(token === 'motor'){
            console.log("MOTOR")
            tape['M' + m] = token
            m++
            token = ''
        }

        else if(tape['M' + (m - 1)] === 'motor' && contents[j+1] === ';'){
            console.log("MOTOR VARIABLE")
            tape['MV' + mv] = token
            mv++
            token = ''
        }

        else if(token === 'print'){
            console.log("PRINT")
            tape['P'] = token
            token = ''
        }

        else if(token === '"' && openQuote === false){
            openQuote = true
        }

        else if(token.charAt(token.length-1) === '"' && openQuote === true){
            console.log("STRING")
            tape['S'] = token
            token = ''
            openQuote = false
        }
    }

    console.log(tape)
    console.log(tape.keys.length)
}

readFile();

