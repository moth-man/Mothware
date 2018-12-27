var file = process.argv[2];

function readFile(){
    if(file.substr(-3,3) === ".mw"){
        console.log(file);
    }
    else {
        console.log("ERROR: Incorrect file extension.")
    }
}

readFile();