<?php

const ADD       = 0;
const SUBSTRACT = 1;
const MULTIPLY  = 2;
const DIVIDE    = 3;
const SUM       = 4;

$functions = array(
    ADD => function($args) {
        return $args[0] + $args[1];
    },

    SUBSTRACT => function($args) {
        return $args[0] - $args[1];
    },

    MULTIPLY => function($args) {
        return $args[0] * $args[1];
    },

    DIVIDE => function($args) {
        return $args[0] / $args[1];
    },

    SUM => function($args) {
        $sum = 0;

        foreach ($args as $arg) {
            $sum += $arg;
        }

        return $sum;
    }
);

function evaluateAST($ast) {
    global $functions;
    $oper = $ast[0];
    $func = $functions[$oper];

    $evaluatedArgs = [];

    for ($i = 1; $i < count($ast); $i++) {
        if (is_array($ast[$i])) {
            array_push( $evaluatedArgs,  evaluateAST($ast[$i]) );
        } else {
            array_push( $evaluatedArgs, $ast[$i] );
        }
    }

    return $func($evaluatedArgs);
}

function timeAST($ast) {
    $iterations = 100000;
    $sum = 0;

    $time_start = microtime(true);

    for ($i =0; $i < $iterations; $i++ ) {
        $sum += evaluateAST($ast);
    }

    $compute_time = microtime(true) - $time_start;

    echo "COMPUTED [$iterations] ITERATIONS IN [$compute_time] SECONDS\n";

    if ( abs($sum - 3900000 ) > 0.001 ) {
        die( "WRONG SUM $sum" );
    }
}

$ast = [SUM,
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,10,20],30],40],50],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,20,30],40],50],60],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,30,40],50],60],70],
    [ SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,40,50],60],70],80]
];

timeAST($ast);

?>
