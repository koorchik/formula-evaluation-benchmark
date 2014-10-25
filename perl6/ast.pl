my $ADD       = 0;
my $SUBSTRACT = 1;
my $MULTIPLY  = 2;
my $DEVIDE    = 3;
my $SUM       = 4;

my %functions = (
    $ADD => sub (@args) {
        return @args[0] + @args[1];
    },

    $SUBSTRACT => sub (@args) {
        return @args[0] - @args[1];
    },

    $MULTIPLY => sub (@args) {
        return @args[0] * @args[1];
    },

    $DEVIDE => sub (@args) {
        return @args[0] / @args[1];
    },

    $SUM => sub (@args) {
        my $sum = 0;

        for  @args -> $arg {
            $sum += $arg;
        }

        return $sum;
    }
);

sub evaluate_ast(@ast) {
    my $oper = @ast[0];
    my $func = %functions{$oper};

    my @evaluated_args;

    loop ( my $i = 1; $i < @ast.elems; $i++ ) {
        if ( @ast[$i].isa('Array') ) {
            @evaluated_args.push( evaluate_ast( @ast[$i] ) );
        } else {
            @evaluated_args.push( @ast[$i] );
        }
    }

    return $func(@evaluated_args);
}

sub timeAST(@ast) {
    my $t0 = time;

    my $sum = 0;
    my $iterations = 10_000;

    for (0..$iterations) {
        $sum += evaluate_ast(@ast);
    }

    my $compute_time = time - $t0;

    say "COMPUTED [$iterations] ITERATIONS IN [$compute_time] SECONDS";

    if (abs($sum - 3900039) > 0.001 ) {
        die "WRONG SUM $sum";
    }
}

my $ast = [$SUM,
    [$SUBSTRACT,[$ADD,[$DEVIDE,[$MULTIPLY,10,20],30],40],50],
    [$SUBSTRACT,[$ADD,[$DEVIDE,[$MULTIPLY,20,30],40],50],60],
    [$SUBSTRACT,[$ADD,[$DEVIDE,[$MULTIPLY,30,40],50],60],70],
    [$SUBSTRACT,[$ADD,[$DEVIDE,[$MULTIPLY,40,50],60],70],80]
];

timeAST($ast);
