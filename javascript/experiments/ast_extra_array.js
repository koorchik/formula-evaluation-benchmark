'use strict';

var ADD       = 0;
var SUBSTRACT = 1;
var MULTIPLY  = 2;
var DIVIDE    = 3;
var SUM       = 4;

var functions = {};
functions[ADD]       = function(args) { return +args[0] + +args[1]; };
functions[SUBSTRACT] = function(args) { return +args[0] - +args[1]; };
functions[MULTIPLY]  = function(args) { return +args[0] * +args[1]; };
functions[DIVIDE]    = function(args) { return +args[0] / +args[1]; };

functions[SUM] = function(args) {
    var sum = 0;
    for ( var i = 0; i < args.length; i++ ) {
        sum += +args[i];
    }
    return sum;
};


function evaluateAST(ast) {
    console.log(1);
    var oper = ast[0];
    var func = functions[oper];

    var evaluatedArgs = [];

    for (var i = 1; i < ast.length; i++) {
        if ( Array.isArray(ast[i]) && ast[i].length > 1 )  {
            evaluatedArgs.push( evaluateAST(ast[i]) );
        } else if (!Array.isArray(ast[i])) {
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

    if ( !sum || ( Math.abs(+sum - 3900000) > 0.001 ) ) {
        throw 'WRONG SUM ' + sum;
    }
}

var ast = [ SUM,
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,10,20, [1.1]],30, [1.1]],40, [1.1]],50, [1.1]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,20,30, [1.1]],40, [1.1]],50, [1.1]],60, [1.1]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,30,40, [1.1]],50, [1.1]],60, [1.1]],70, [1.1]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,40,50, [1.1]],60, [1.1]],70, [1.1]],80, [1.1]]
];


timeAST(ast);
