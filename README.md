Language runtime performance benchmark.
--------------------------------------

The benchmark was written for real life task: computing excel formulas. I understand that in real life there will be not only integers and that the benchmark is syntethic. But in any case the results are representetive enough.

We do calculation of abstract syntax tree that represents simple mathematical formula:

    [SUM,
        [SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,10,20],30],40],50],
        [SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,20,30],40],50],60],
        [SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,30,40],50],60],70],
        [SUBSTRACT,[ADD,[DIVIDE,[MULTIPLY,40,50],60],70],80]
    ]

We do 100000 iterations and after comleting check the sum of all results to ensure that the calculations were not skipped by optimizer.

## Notes

SUM should be implemented using loop. Do not use built-in "sum". Using external "sum" will be unfair for the following reasons: 

1. built-in "sum" is native and does not show language performance.
2. real "SUM" will have more complex logic and will check values while iterating them and this requires loop to be written.


## Results

Here is the result for Macbook Pro 2013:

1. NodeJS 0.11.14 - 0.11 sec
2. NodeJS 0.10.33 - 0.18 sec
3. PHP 5.5.14 - 2.9 sec
4. Perl 5.20.1 - 3.2 sec
5. Perl 6 (Rakudo Moar VM) - 110 sec (2015 May)
6. Perl 6 (Rakudo Moar VM) - 85 sec (2015 October)
6. Perl 6 (Rakudo JVM) - 160 sec
7. Perl 6 (Rakudo Parrot) - ~810 sec
8. Go 1.3.3 (unidiomatic version) - 0.25 sec
9. Go 1.3.3 (idiomatic version) - 0.026 sec
10. Python 2.7.8 - 3.1 sec