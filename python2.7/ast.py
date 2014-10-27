import time
import sys

ADD         = 0
SUBSTRACT   = 1
MULTIPLY    = 2
DEVIDE      = 3
SUM         = 4

def list_sum(arr):
    result = 0

    for i in arr:
        result += i

    return result

functions = {
    ADD         : lambda args: args[0] + args[1],
    SUBSTRACT   : lambda args: args[0] - args[1],
    MULTIPLY    : lambda args: args[0] * args[1],
    DEVIDE      : lambda args: args[0] / args[1],
    SUM         : list_sum

}

def evaluate_AST(ast):
    oper = ast[0]
    func = functions[oper]

    evaluatedArgs = []

    for i in range(1, len(ast)):
        if isinstance(ast[i], list):
            evaluatedArgs.append(evaluate_AST(ast[i]))
        else:
            evaluatedArgs.append(ast[i])

    return func(evaluatedArgs)

def time_AST(ast):
    iterations = 100000
    result = 0
    time_start = time.time()

    for i in range(iterations):
        result += evaluate_AST(ast)

    compute_time = time.time() - time_start

    print "COMPUTED {} ITERATIONS IN {} SECONDS\n".format(iterations, compute_time)

    # if abs(result - 3900000 ) > 0.001:
    #     sys.exit("WRONG SUM {}".format(result))

ast = [SUM,
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,10,20],30],40],50],
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,20,30],40],50],60],
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,30,40],50],60],70],
    [ SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,40,50],60],70],80]
]

if __name__ == '__main__':
    time_AST(ast)