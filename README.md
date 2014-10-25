Language runtime performance benchmark.
--------------------------------------

The benchmark was written for real life task: computing excel formulas. I understand that in real life there will be not only integers and that the benchmark is syntethic. But in any case the results are representetive enough.

We do calculation of abstract syntax tree that represents simple mathematical formula:

    [SUM,
        [SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,10,20],30],40],50],
        [SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,20,30],40],50],60],
        [SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,30,40],50],60],70],
        [SUBSTRACT,[ADD,[DEVIDE,[MULTIPLY,40,50],60],70],80]
    ]

We do 100000 iterations and after comleting check the sum of all results to ensure that calculations were not skipped by optimizator.

## Results

Here is the results for Macbook Pro 2013:

1. NodeJS 0.11.14 - 0.11 sec
2. NodeJS 0.10.33 - 0.18 sec
3. PHP 5.5.14 - 2.9 sec
4. Perl 5.20.1 - 3.2 sec
5. Perl 6 (Rakudo Moar VM) - 392 sec (several months ago was ~500 sec)
6. Perl 6 (Rakudo JVM) - 426 sec
7. Perl 6 (Rakudo Parrot) - 2440 sec
