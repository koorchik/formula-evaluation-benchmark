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

class Add {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a.calc() + this.b.calc();
    }
}

class Multiply {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a.calc() * this.b.calc();
    }
}

class Divide {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a.calc() / this.b.calc();
    }
}

class Substract {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a.calc() - this.b.calc();
    }
}

class Sum {
    constructor(...list) {
        this.list = list;
    }

    calc() {
        var list = this.list;
        var sum = 0;

        for ( var i = 0; i < list.length; i++ ) {
            sum += +list[i].calc();
        }

        return sum;
    }
}


class Val {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.value = MODEL[this.a][this.b];
    }

    calc() {
        return this.value;
    }
}


const classes = {
    [SUBSTRACT]: Substract,
    [ADD]: Add,
    [DIVIDE]: Divide,
    [MULTIPLY]: Multiply,
    [SUM]: Sum,
    [VAL]: Val
};


function timeAST(ast) {
    var sum = 0;
    var iterations = 100000;

    console.time('COMPUTE AST');

    for (var i = 0; i < iterations; i++) {
        sum += ast.calc();
    }

    console.timeEnd('COMPUTE AST');
    console.log('SUM is [%s]', sum);
    if ( !sum || ( Math.abs(+sum - 3900000) > 0.001 ) ) {
        throw 'WRONG SUM ' + sum;
    }
}

function makeASTInstance(args) {
    if ( ! Array.isArray(args) ) {
        return args;
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
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 0, 0], [VAL, 0, 1]],[VAL, 0, 2]],[VAL, 0, 3]],[VAL, 0, 4]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 1, 0], [VAL, 1, 1]],[VAL, 1, 2]],[VAL, 1, 3]],[VAL, 1, 4]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 2, 0], [VAL, 2, 1]],[VAL, 2, 2]],[VAL, 2, 3]],[VAL, 2, 4]],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,[VAL, 3, 0], [VAL, 3, 1]],[VAL, 3, 2]],[VAL, 3, 3]],[VAL, 3, 4]],
];


const ast = makeASTInstance(astData);

timeAST(ast);
