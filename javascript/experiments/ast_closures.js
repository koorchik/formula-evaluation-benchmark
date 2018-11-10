'use strict';

var ADD       = 0;
var SUBSTRACT = 1;
var MULTIPLY  = 2;
var DIVIDE    = 3;
var SUM       = 4;
var VAL       = 5;


function Add(a, b) {
    return function() {
        return a() + b()
    }
}

function Multiply(a, b) {
    return function() {
        return a() * b()
    }
}

function Divide(a, b) {
    return function() {
        return a() / b()
    }
}


function Substract(a, b) {
    return function() {
        return a() - b()
    }
}

function Sum(...list) {
    return function() {
        var sum = 0;

        for ( var i = 0; i < list.length; i++ ) {
            sum += +list[i]();
        }

        return sum;
    }
}

function Val(a) {
    return function() {
        return a
    }
}

function timeAST(ast) {
    var sum = 0;
    var iterations = 100000;

    console.time('COMPUTE AST');

    for (var i = 0; i < iterations; i++) {
        sum += ast();
    }

    console.timeEnd('COMPUTE AST');
    console.log('SUM is [%s]', sum);
    if ( !sum || ( Math.abs(+sum - 3900000) > 0.001 ) ) {
        throw 'WRONG SUM ' + sum;
    }
}

const classes = {
    [SUBSTRACT]: Substract,
    [ADD]: Add,
    [DIVIDE]: Divide,
    [MULTIPLY]: Multiply,
    [SUM]: Sum
};



function makeASTInstance(args) {
    if ( ! Array.isArray(args) ) {
        return new Val(args);
    }

    const [functionConstant, ...functionArgs] = args;

    const argsInstances = [];
    for ( const arg of functionArgs ) {
        argsInstances.push( makeASTInstance(arg) );
    }

    const className = classes[functionConstant];
    return new className(...argsInstances);
} 

var astData = [ SUM,
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,10,20],30],40],50],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,20,30],40],50],60],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,30,40],50],60],70],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,40,50],60],70],80]
];


const ast = makeASTInstance(astData);

timeAST(ast);
