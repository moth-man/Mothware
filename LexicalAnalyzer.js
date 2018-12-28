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

    for(let j = 0; j < contents.length; j++){
        token += contents[j]
        console.log(token)

        if(token === ' ' || token === '\n'){
            token = ''
        }

        else if(token === 'motor'){
            console.log("MOTOR")
            tape['M'] = token
            //tape.push('M')
            token = ''
        }

        else if(tape['M'] === 'motor' && token.charAt(token.length-1) === ';'){
        //else if(tape[tape.length-1] === 'M' && token.charAt(token.length-1) === ";"){
            console.log("MOTOR VARIABLE")
            //tape.push('MV')
            tape['MV'] = token
            token = ''
        }

        else if(token === 'print'){
            console.log("PRINT")
            //tape.push('P')
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
            //tape.push('S')
        }
    }
    console.log(tape['M'])
    tape['M'] = "motor2"
    console.log(tape)
    console.log(tape.length)
}

readFile();

