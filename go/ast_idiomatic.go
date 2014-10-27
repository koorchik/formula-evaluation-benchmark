package main

import (
	"fmt"
	"math"
	"time"
)

type Node interface {
	Calc() float64
}

type Const float64

func (n Const) Calc() float64 {
	return float64(n)
}

type Add struct {
	a, b Node
}

func (n Add) Calc() float64 {
	return n.a.Calc() + n.b.Calc()
}

type Sub struct {
	a, b Node
}

func (n Sub) Calc() float64 {
	return n.a.Calc() - n.b.Calc()
}

type Mul struct {
	a, b Node
}

func (n Mul) Calc() float64 {
	return n.a.Calc() * n.b.Calc()
}

type Div struct {
	a, b Node
}

func (n Div) Calc() float64 {
	return n.a.Calc() / n.b.Calc()
}

type Sum []Node

func (n Sum) Calc() float64 {
	sum := 0.0

	for _, arg := range n {
		sum += arg.Calc()
	}

	return sum
}

func timeAST(ast Node) {
	iterations := 100000
	sum := 0.0

	time_start := time.Now()

	for i := 0; i < iterations; i++ {
		sum += ast.Calc()
	}

	compute_time := time.Since(time_start)

	fmt.Printf("COMPUTED [%d] ITERATIONS IN [%f] SECONDS\n", iterations, compute_time.Seconds())

	if math.Abs(sum-3900000.0) > 0.001 {
		panic(fmt.Sprintf("WRONG SUM %f", sum))
	}
}

func main() {
	ast := Sum{
		Sub{Add{Div{Mul{Const(10.0), Const(20.0)}, Const(30.0)}, Const(40.0)}, Const(50.0)},
		Sub{Add{Div{Mul{Const(20.0), Const(30.0)}, Const(40.0)}, Const(50.0)}, Const(60.0)},
		Sub{Add{Div{Mul{Const(30.0), Const(40.0)}, Const(50.0)}, Const(60.0)}, Const(70.0)},
		Sub{Add{Div{Mul{Const(40.0), Const(50.0)}, Const(60.0)}, Const(70.0)}, Const(80.0)},
	}

	timeAST(ast)
}
