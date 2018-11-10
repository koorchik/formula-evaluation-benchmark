my Int $ADD       = 0;
my Int $SUBSTRACT = 1;
my Int $MULTIPLY  = 2;
my Int $DIVIDE    = 3;
my Int $SUM       = 4;

my @functions;

@functions[$ADD] = sub (@args) {
    return @args[0] + @args[1];
};

@functions[$SUBSTRACT] = sub (@args) {
    return @args[0] - @args[1];
};

@functions[$MULTIPLY] = sub (@args) {
    return @args[0] * @args[1];
};

@functions[$DIVIDE] = sub (@args) {
    return @args[0] / @args[1];
};

@functions[$SUM] = sub (@args) {
    my $sum = 0;

    for  @args -> $arg {
        $sum += $arg;
    }

    return $sum;
};


sub evaluate_ast(@ast) {
    my $oper = @ast[0];
    my $func = @functions[$oper];

    my @evaluated_args;

    loop ( my $i = 1; $i < @ast.elems; $i++ ) {
        if ( @ast[$i] ~~ Array ) {
            @evaluated_args.push( evaluate_ast( @ast[$i] ) );
        } else {
            @evaluated_args.push( @ast[$i] );
        }
    }

    return $func(@evaluated_args);
}

sub time_ast(@ast) {
    my $t0 = time;

    my $sum = 0;
    my $iterations = 100_000;

    for (1..$iterations) {
        $sum += evaluate_ast(@ast);
    }

    my $compute_time = time - $t0;

    say "COMPUTED [$iterations] ITERATIONS IN [$compute_time] SECONDS";

    if (abs($sum - 3900000) > 0.001 ) {
        die "WRONG SUM $sum";
    }
}

my $ast = [$SUM,
    [$SUBSTRACT,[$ADD,[$DIVIDE,[$MULTIPLY,10,20],30],40],50],
    [$SUBSTRACT,[$ADD,[$DIVIDE,[$MULTIPLY,20,30],40],50],60],
    [$SUBSTRACT,[$ADD,[$DIVIDE,[$MULTIPLY,30,40],50],60],70],
    [$SUBSTRACT,[$ADD,[$DIVIDE,[$MULTIPLY,40,50],60],70],80]
];

time_ast($ast);
