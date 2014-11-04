#!/bin/sh
exec scala -optimize "$0" "$@"
!#
trait AST {
  def eval(): Double
}

case class VAL(eval: Double) extends AST

case class ADD(l: AST, r: AST) extends AST {
  def eval = l.eval + r.eval
}

case class SUBSTRACT(l: AST, r: AST) extends AST {
  def eval = l.eval - r.eval
}

case class MULTIPLY(l: AST, r: AST) extends AST {
  def eval = l.eval * r.eval
}

case class DEVIDE(l: AST, r: AST) extends AST {
  def eval = l.eval / r.eval
}

case class SUM(all: AST*) extends AST {
  def eval = {
    var sum = 0.0
    all.foreach{sum += _.eval}
    sum
  }
}

var ast = SUM(
  SUBSTRACT(ADD(DEVIDE(MULTIPLY(VAL(10),VAL(20)),VAL(30)),VAL(40)),VAL(50)),
  SUBSTRACT(ADD(DEVIDE(MULTIPLY(VAL(20),VAL(30)),VAL(40)),VAL(50)),VAL(60)),
  SUBSTRACT(ADD(DEVIDE(MULTIPLY(VAL(30),VAL(40)),VAL(50)),VAL(60)),VAL(70)),
  SUBSTRACT(ADD(DEVIDE(MULTIPLY(VAL(40),VAL(50)),VAL(60)),VAL(70)),VAL(80))
)

val start = System.currentTimeMillis
var sum = 0.0
var i = 0
while (i < 100000) {
  sum += ast.eval
  i += 1
}
val time  = System.currentTimeMillis - start

println(s"Time: $time milliseconds, that it ${time / 1000.0} seconds")

if (Math.abs(sum - 3900000) > 0.01) sys.error(s"Wrong sum $sum")
