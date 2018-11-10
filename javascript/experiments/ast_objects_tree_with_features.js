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


class Base {
    constructor() {
        this.calcMethod = 'calc';
    }

    calcWithDebug() {
        this.calcMethod = 'calcWithDebug';
        const result = this.calc();

        console.log(`EVAL: ${this.toString()} = ${result}`);

        return result;
    }
}

class Add extends Base {
    constructor([a, b]) {
        super();
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a[this.calcMethod]() + this.b[this.calcMethod]();
    }

    toString() {
        return `(${this.a.toString()} + ${this.b.toString()})`;
    }
}

class Multiply extends Base {
    constructor([a, b]) {
        super();
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a[this.calcMethod]() * this.b[this.calcMethod]();
    }

    toString() {
        return `(${this.a.toString()} * ${this.b.toString()})`;
    }
}

class Divide extends Base {
    constructor([a, b]) {
        super();
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a[this.calcMethod]() / this.b[this.calcMethod]();
    }

    toString() {
        return `(${this.a.toString()} / ${this.b.toString()})`;
    }
}

class Substract extends Base {
    constructor([a, b]) {
        super();
        this.a = a;
        this.b = b;
    }

    calc() {
        return this.a[this.calcMethod]() - this.b[this.calcMethod]();
    }

    toString() {
        return `(${this.a.toString()} - ${this.b.toString()})`;
    }
}

class Sum extends Base {
    constructor(list) {
        super();
        this.list = list;
    }

    calc() {
        var list = this.list;
        var sum = 0;

        for ( var i = 0; i < list.length; i++ ) {
            sum += +list[i][this.calcMethod]();
        }

        return sum;
    }

    toString() {
        return `SUM(${this.list.map( l => l.toString() ).join('; ')})`;
    }
}

class Val extends Base {
    constructor([a, b]) {
        super();
        this.a = a;
        this.b = b;
        this.value = MODEL[this.a][this.b];
    }

    calc() {
        return this.value;
    }

    // calcWithDebug() {
    //     return this.calc();
    // }

    toString() {
        return `${this.a}:${this.b}`;
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
    return new className(argsInstances);
} 

var astData = [ SUM,
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

const largeASTData = generateLargeAST(astData);

console.time('MAKE AST INSTANCES');
const ast = makeASTInstance(largeASTData);
console.timeEnd('MAKE AST INSTANCES');

console.time('COMPUTE AST');

// console.log('EVALUATE STEP BY STEP: ', ast.toString());
const sum = ast.calc();

console.timeEnd('COMPUTE AST');
console.log('SUM is [%s]', sum);

console.time('COMPUTE AST 2');

// console.log('EVALUATE STEP BY STEP: ', ast.toString());
const sum2 = ast.calc();

console.timeEnd('COMPUTE AST 2');
console.log('SUM is [%s]', sum2);


console.time('COMPUTE AST 3');

// console.log('EVALUATE STEP BY STEP: ', ast.toString());
const sum3 = ast.calc();

console.timeEnd('COMPUTE AST 3');
console.log('SUM is [%s]', sum3);


console.time('COMPUTE AST 4');

// console.log('EVALUATE STEP BY STEP: ', ast.toString());
const sum4 = ast.calc();

console.timeEnd('COMPUTE AST 4');
console.log('SUM is [%s]', sum4);