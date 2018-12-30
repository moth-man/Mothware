var file = process.argv[2];
var tape = {}

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
    var token = ''
    var openQuote = false
    var openBrace = false
    var m = 0
    var mv = 0
    var p = 0
    var s = 0
    var sem = 0
    var f = 0
    var lp = 0
    var i = 0
    var iv = 0
    var ivu = 0
    var eq = 0
    var lt = 0
    var gt = 0
    var leq = 0
    var geq = 0

    for(let j = 0; j < contents.length; j++){
        token += contents[j]
        var endTape = tape[Object.keys(tape)[Object.keys(tape).length-1]]
        var endTape2 = tape[Object.keys(tape)[Object.keys(tape).length-2]]
        var endTape3 = tape[Object.keys(tape)[Object.keys(tape).length-3]]
        var endTape4 = tape[Object.keys(tape)[Object.keys(tape).length-4]]
        var vi = iv - 1
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

        else if(endTape === 'motor' && contents[j+1] === ';'){
        //else if(tape['M' + (m - 1)] === 'motor' && contents[j+1] === ';'){
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

        //ADD REGEX
        else if(endTape === "int" && contents[j+1] === '='){
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

        else if(endTape3 === 'int' && endTape === '=' && contents[j+1] === ';'){
            console.log("INTEGER VALUE")
            tape['IVU' + ivu] = token
            ivu++
            token = ''
        }

        else if(token === '<'){
            console.log("LESS THAN")
            tape['LT' + lt] = token
            lt++
            token = ''
        }

        else if(token === '>'){
            console.log("GREATER THAN")
            tape['GT' + gt] = token
            gt++
            token = ''
        }

        else if(token === '<='){
            console.log("LESS THAN OR EQUAL TO")
            tape['LEQ' + leq] = token
            leq++
            token = ''
        }

        else if(token === '>='){
            console.log("GREATER THAN OR EQUAL TO")
            tape['GEQ' + geq] = token
            geq++
            token = ''
        }

       //var vi = iv - 1
       else if(token === tape['IV' + vi]){
           console.log("REPEAT VARIABLE IV" + vi)
           token = ''
       }
    }

    console.log(tape)
    console.log("test")
    //var vi = "IV" + 3
    //console.log(vi)
    console.log(Object.size(tape))
    for(var i in tape){
        console.log(i + ": " + tape[i])
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

