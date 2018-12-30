var file = process.argv[2];

function readFile(){
    if(file.substr(-3,3) === ".mw"){
        fileLex(file);
    }
    else {
        console.log("ERROR: Incorrect file extension.")
    }
}

function fileLex(f){
    const fs = require('fs')
    const contents = fs.readFileSync(f, 'utf8')
    var tape = {}
    var token = ''
    var openQuote = false
    var m = 0
    var mv = 0
    var p = 0
    var s = 0
    var sem = 0
    var f = 0
    var lp = 0
    var i = 0
    var iv = 0

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
            tape['P' + p] = token
            token = ''
        }

        else if(token === '"' && openQuote === false){
            openQuote = true
        }

        else if(token.charAt(token.length-1) === '"' && openQuote === true){
            console.log("STRING")
            tape['S' + s] = token
            s++
            token = ''
            openQuote = false
        }

        else if(token === "for"){
            console.log("FOR-LOOP")
            tape['F' + f] = token
            f++
            token = ''
        }

        else if(token === "("){
            console.log("LEFT-PARENTHESIS")
            tape['LP' + lp] = token
            lp++
            openParenthesis = true
            token = ''
        }

        else if(token === "int"){
            console.log("INTEGER")
            tape['I' + i] = token
            i++
            token = ''
        }

        else if(tape[Object.size(tape)-1] === "int"){
            console.log("INTEGER VARIABLE")
            tape['IV' + iv] = token
            iv++
            token = ''
        }

        else if(token === '='){
            console.log("EQUALS")
            tape['EQ' + eq] = token
            eq++
            token = ''
        }
    }

    console.log(tape)
    console.log(valueOf())
    console.log("test")
    for(var i in tape){
        console.log(i + ": " + tape[i])
    }
}

function valueOf(array,val){
    for(var count in array){
        if(count === val){
            return array[count]
        }
    }
}

Object.size = function(tape){
    var size = 0
    for(var q in tape){
        size++
    }
    return size
}

readFile();

