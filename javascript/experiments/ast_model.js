'use strict';

var ADD       = 0;
var SUBSTRACT = 1;
var MULTIPLY  = 2;
var DIVIDE    = 3;
var SUM       = 4;
var VAL       = 5;

const MODEL = [
    [10, 20, 30, 40, 50],
    [20, 30, 40, 50, 60],
    [30, 40, 50, 60, 70],
    [40, 50, 60, 70, 80],
];

var functions = [];
functions[ADD]       = function(args) { return +args[0] + +args[1]; };
functions[SUBSTRACT] = function(args) { return +args[0] - +args[1]; };
functions[MULTIPLY]  = function(args) { return +args[0] * +args[1]; };
functions[DIVIDE]    = function(args) { return +args[0] / +args[1]; };
functions[VAL]       = function(args) { return MODEL[args[0]][args[1]]; };


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
    console.log('SUM is [%s]', sum);

    if ( !sum || ( Math.abs(+sum - 3900000) > 0.001 ) ) {
        throw 'WRONG SUM ' + sum;
    }
}

var ast = [ SUM,
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 0, 0], [VAL, 0, 1]],[VAL, 0, 2]],[VAL, 0, 3]],[VAL, 0, 4]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 1, 0], [VAL, 1, 1]],[VAL, 1, 2]],[VAL, 1, 3]],[VAL, 1, 4]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 2, 0], [VAL, 2, 1]],[VAL, 2, 2]],[VAL, 2, 3]],[VAL, 2, 4]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 3, 0], [VAL, 3, 1]],[VAL, 3, 2]],[VAL, 3, 3]],[VAL, 3, 4]],
];

function generateLargeAST(ast) {
    console.time('GENERATE LARGE AST');
    const largeAST = [SUM];
    
    for (var i = 0; i < 100000; i++) {
        largeAST.push(ast);
    }

    const copy = JSON.parse(JSON.stringify(largeAST));

    console.timeEnd('GENERATE LARGE AST');

    return copy;
}

const largeAST = generateLargeAST(ast);
console.time('COMPUTE AST');

const sum = evaluateAST(largeAST);

console.timeEnd('COMPUTE AST');
console.log('SUM is [%s]', sum);

console.time('COMPUTE AST');

const sum2 = evaluateAST(largeAST);

console.timeEnd('COMPUTE AST');
console.log('SUM is [%s]', sum2);


console.time('COMPUTE AST');

const sum3 = evaluateAST(largeAST);

console.timeEnd('COMPUTE AST');
console.log('SUM is [%s]', sum3);


console.time('COMPUTE AST');

const sum4 = evaluateAST(largeAST);

console.timeEnd('COMPUTE AST');
console.log('SUM is [%s]', sum4);



console.time('COMPUTE AST');

const sum5 = evaluateAST(largeAST);

console.timeEnd('COMPUTE AST');
console.log('SUM is [%s]', sum5);

// timeAST(largeAST);
