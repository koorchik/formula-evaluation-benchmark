'use strict';

var ADD       = 0;
var SUBSTRACT = 1;
var MULTIPLY  = 2;
var DEVIDE    = 3;
var SUM       = 4;

var functions = [];
functions[ADD]       = function(args) { return +args[0] + +args[1]; };
functions[SUBSTRACT] = function(args) { return +args[0] - +args[1]; };
functions[MULTIPLY]  = function(args) { return +args[0] * +args[1]; };
functions[DEVIDE]    = function(args) { return +args[0] / +args[1]; };

functions[SUM] = function(args) {
    var sum = 0;
    for ( var i = 0; i < args.length; i++ ) {
        sum += +args[i];
    }
    return sum;
};


function evaluateAST(ast) {
    var oper = ast[0];
    var func = functions[oper];

    var evaluatedArgs = [];

    for (var i = 1; i < ast.length; i++) {
        if ( Array.isArray(ast[i]) )  {
            evaluatedArgs.push( evaluateAST(ast[i]) );
        } else {
            evaluatedArgs.push( ast[i] );
        }
    }

    return func(evaluatedArgs);
}

function timeAST(ast) {
    var sum = 0;
    var iterations = 100000;

    console.time('COMPUTE AST');

    for (var i = 0; i < iterations; i++) {
        sum += evaluateAST(ast);
    }

    console.timeEnd('COMPUTE AST');

    if ( Math.abs(sum - 3900000) > 0.001 ) throw 'WRONG SUM ' + sum;
}

var ast = [ SUM,
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,10,20],30],40],50],
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,20,30],40],50],60],
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,30,40],50],60],70],
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,40,50],60],70],80]
];


timeAST(ast);
