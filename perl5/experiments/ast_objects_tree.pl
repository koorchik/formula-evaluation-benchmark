use strict;
use warnings;
use Time::HiRes qw/gettimeofday tv_interval/;

package Add {
    sub new {
        my ($class, @args) = @_;
        return bless \@args, $class;
    }

    sub calc {
        my $self = shift;
        return +$self->[0]->calc() + +$self->[1]->calc();
    }
}

package Substract {
    sub new {
        my ($class, @args) = @_;
        return bless \@args, $class;
    }

    sub calc {
        my $self = shift;
        return +$self->[0]->calc() - +$self->[1]->calc();
    }
}

package Multiply {
    sub new {
        my ($class, @args) = @_;
        return bless \@args, $class;
    }

    sub calc {
        my $self = shift;
        return +$self->[0]->calc() * +$self->[1]->calc();
    }
}


package Divide {
    sub new {
        my ($class, @args) = @_;
        return bless \@args, $class;
    }

    sub calc {
        my $self = shift;
        return +$self->[0]->calc() / +$self->[1]->calc();
    }
}


package Sum {
    sub new {
        my ($class, @args) = @_;
        return bless \@args, $class;
    }

    sub calc {
        my $self = shift;
        my $sum = 0;

        foreach my $arg (@$self) {
            $sum += +$arg->calc();
        }

        return $sum;
    }
}

package Val {
    sub new {
        my ($class, $val) = @_;
        return bless \$val, $class;
    }

    sub calc {
        my $self = shift;
        return $$self;
    }
}



sub time_ast {
    my $ast = shift;
    my $t0 = [gettimeofday];

    my $iterations = 100_000;
    my $sum = 0;

    for (1..$iterations) {
        $sum += $ast->calc();
    }

    my $compute_time = tv_interval($t0);

    print "COMPUTED [$iterations] ITERATIONS IN [$compute_time] SECONDS\n";

    die "WRONG SUM $sum" if abs( $sum - 3900000) > 0.001; # ensure that code was executed
}

my $ast = Sum->new(
    Substract->new( Add->new( Divide->new( Multiply->new(Val->new(10), Val->new(20)), Val->new(30)), Val->new(40)), Val->new(50) ),
    Substract->new( Add->new( Divide->new( Multiply->new(Val->new(20), Val->new(30)), Val->new(40)), Val->new(50)), Val->new(60) ),
    Substract->new( Add->new( Divide->new( Multiply->new(Val->new(30), Val->new(40)), Val->new(50)), Val->new(60)), Val->new(70) ),
    Substract->new( Add->new( Divide->new( Multiply->new(Val->new(40), Val->new(50)), Val->new(60)), Val->new(70)), Val->new(80) )
);


time_ast($ast);
