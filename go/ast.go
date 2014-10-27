package main

import (
	"fmt"
	"math"
	"time"
)

/*

This is NOT idiomatic Go code. You should never write Go code like this.

*/

const (
	ADD = iota
	SUBSTRACT
	MULTIPLY
	DEVIDE
	SUM
)

var functions = map[int]func(args []float64) float64{
	ADD: func(args []float64) float64 {
		return args[0] + args[1]
	},

	SUBSTRACT: func(args []float64) float64 {
		return args[0] - args[1]
	},

	MULTIPLY: func(args []float64) float64 {
		return args[0] * args[1]
	},

	DEVIDE: func(args []float64) float64 {
		return args[0] / args[1]
	},

	SUM: func(args []float64) float64 {
		sum := 0.0

		for _, arg := range args {
			sum += arg
		}

		return sum
	},
}

func evaluateAST(ast []interface{}) float64 {
	oper := ast[0].(int)
	funct := functions[oper]

	evaluatedArgs := make([]float64, 0, len(ast)-1) // 1. cuts 30%

	for _, v := range ast[1:] { // 2. cuts 10%
		if e, ok := v.([]interface{}); ok {
			evaluatedArgs = append(evaluatedArgs, evaluateAST(e))
		} else {
			evaluatedArgs = append(evaluatedArgs, float64(v.(int)))
		}
	}

	return funct(evaluatedArgs)
}

func timeAST(ast []interface{}) {
	iterations := 100000
	sum := 0.0

	time_start := time.Now()

	for i := 0; i < iterations; i++ {
		sum += evaluateAST(ast)
	}

	compute_time := time.Since(time_start)

	fmt.Printf("COMPUTED [%d] ITERATIONS IN [%f] SECONDS\n", iterations, compute_time.Seconds())

	if math.Abs(sum-3900000.0) > 0.001 {
		panic(fmt.Sprintf("WRONG SUM %f", sum))
	}
}

func main() {
	ast := []interface{}{SUM,
		[]interface{}{SUBSTRACT, []interface{}{ADD, []interface{}{DEVIDE, []interface{}{MULTIPLY, 10, 20}, 30}, 40}, 50},
		[]interface{}{SUBSTRACT, []interface{}{ADD, []interface{}{DEVIDE, []interface{}{MULTIPLY, 20, 30}, 40}, 50}, 60},
		[]interface{}{SUBSTRACT, []interface{}{ADD, []interface{}{DEVIDE, []interface{}{MULTIPLY, 30, 40}, 50}, 60}, 70},
		[]interface{}{SUBSTRACT, []interface{}{ADD, []interface{}{DEVIDE, []interface{}{MULTIPLY, 40, 50}, 60}, 70}, 80},
	}

	timeAST(ast)
}
