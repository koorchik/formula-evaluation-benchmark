
#include <iostream>
#include <time.h>
#include <stdlib.h>

using namespace std;

#define MAX_CHILDREN 50

#define ADD 0
#define SUBSTRACT 1
#define MULTIPLY 2
#define DIVIDE 3
#define SUM 4

#define NUMBER 10
#define STRING 11
#define OPERATOR 12

struct Node {
    int type;
    int oper;
    float number;
    int childrenLength;
    Node *arguments[MAX_CHILDREN];
};

float functions (int oper, float *args, int length) {
    switch ( oper ) {
        case ADD:
            return args[0] + args[1];
            break;
        case SUBSTRACT:
            return args[0] - args[1];
            break;
        case MULTIPLY:
            return args[0] * args[1];
            break;
        case DIVIDE:
            return args[0] / args[1];
            break;
        case SUM: {
            float sum = 0;
            for (int i = 0; i < length; i++) {
	            sum = sum + args[i];
            }
            return sum;
        }
		default:
        break;
    }
    return 0.1;
};

float evaluateAST(Node *Tree) {
    float args[50];
    int oper;
    if (Tree->arguments[0]) {
        oper = Tree->oper;
        switch (Tree->type) {
            case NUMBER: {
                args[1] = Tree->number;
                args[0] = evaluateAST(Tree->arguments[0]);
                return functions(oper, args, 2);
                break;
            }
            case OPERATOR: {
                for (int i = 0; i < Tree->childrenLength; i++) {
                    args[i] = evaluateAST(Tree->arguments[i]);
                }
                return functions(oper, args, 4);
                break ;
            }
        }
    } else {
        switch (Tree->type) {
            case NUMBER: {
                return Tree->number;
                break;
            }
        }
    }
}

int main() {
    Node tree0 = {NUMBER, MULTIPLY, 10, 0};
    Node tree1 = {NUMBER, MULTIPLY, 20, 1, &tree0};
    Node tree2 = {NUMBER, DIVIDE, 30, 1, &tree1};
    Node tree3 = {NUMBER, ADD, 40, 1, &tree2};
    Node tree4 = {NUMBER, SUBSTRACT, 50, 1, &tree3};

    Node tree01 = {NUMBER, MULTIPLY, 20, 0};
    Node tree11 = {NUMBER, MULTIPLY, 30, 1, &tree01};
    Node tree21 = {NUMBER, DIVIDE, 40, 1, &tree11};
    Node tree31 = {NUMBER, ADD, 50, 1, &tree21};
    Node tree41 = {NUMBER, SUBSTRACT, 60, 1, &tree31};

    Node tree02 = {NUMBER, MULTIPLY, 30, 0};
    Node tree12 = {NUMBER, MULTIPLY, 40, 1, &tree02};
    Node tree22 = {NUMBER, DIVIDE, 50, 1, &tree12};
    Node tree32 = {NUMBER, ADD, 60, 1, &tree22};
    Node tree42 = {NUMBER, SUBSTRACT, 70, 1, &tree32};

    Node tree03 = {NUMBER, MULTIPLY, 40, 0};
    Node tree13 = {NUMBER, MULTIPLY, 50, 1, &tree03};
    Node tree23 = {NUMBER, DIVIDE, 60, 1, &tree13};
    Node tree33 = {NUMBER, ADD, 70, 1, &tree23};
    Node tree43 = {NUMBER, SUBSTRACT, 80, 1, &tree33};

    Node tree = {OPERATOR, SUM, -99, 4,&tree43, &tree42, &tree41, &tree4};

    long tt = clock();
    float sum;
    for (long int i = 0; i < 100000; i++) {
	    sum += evaluateAST(&tree);
    }

    cout<< "Sum: " << sum << endl;
    cout << "time: " << (clock() - tt)/1000 << endl;

    return 0;
}
