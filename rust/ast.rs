use std::time::SystemTime;

fn main() {
    let ast: N =
        N {
            oper: Oper::Sum,
            args: vec![
                N {
                    oper: Oper::Substract,
                    args: vec![
                        N {
                            oper: Oper::Add,
                            args: vec![
                                N {
                                    oper: Oper::Divide,
                                    args: vec![
                                        N {
                                            oper: Oper::Multiply,
                                            args: vec![
                                                N {num: 10.0, ..b()},
                                                N {num: 20.0, ..b()}
                                            ],
                                            ..b()
                                        },
                                        N {num: 30.0, ..b()}
                                    ], ..b()
                                },
                                N {num: 40.0, ..b()}
                            ], ..b()
                        },
                        N {num: 50.0, ..b()}
                    ], ..b()
                },
                N {
                    oper: Oper::Substract,
                    args: vec![
                        N {
                            oper: Oper::Add,
                            args: vec![
                                N {
                                    oper: Oper::Divide,
                                    args: vec![
                                        N {
                                            oper: Oper::Multiply,
                                            args: vec![
                                                N {num: 20.0, ..b()},
                                                N {num: 30.0, ..b()}
                                            ],
                                            ..b()
                                        },
                                        N {num: 40.0, ..b()}
                                    ], ..b()
                                },
                                N {num: 50.0, ..b()}
                            ], ..b()
                        },
                        N {num: 60.0, ..b()}
                    ], ..b()
                },
                N {
                    oper: Oper::Substract,
                    args: vec![
                        N {
                            oper: Oper::Add,
                            args: vec![
                                N {
                                    oper: Oper::Divide,
                                    args: vec![
                                        N {
                                            oper: Oper::Multiply,
                                            args: vec![
                                                N {num: 30.0, ..b()},
                                                N {num: 40.0, ..b()}
                                            ],
                                            ..b()
                                        },
                                        N {num: 50.0, ..b()}
                                    ], ..b()
                                },
                                N {num: 60.0, ..b()}
                            ], ..b()
                        },
                        N {num: 70.0, ..b()}
                    ], ..b()
                },
                N {
                    oper: Oper::Substract,
                    args: vec![
                        N {
                            oper: Oper::Add,
                            args: vec![
                                N {
                                    oper: Oper::Divide,
                                    args: vec![
                                        N {
                                            oper: Oper::Multiply,
                                            args: vec![
                                                N {num: 40.0, ..b()},
                                                N {num: 50.0, ..b()}
                                            ],
                                            ..b()
                                        },
                                        N {num: 60.0, ..b()}
                                    ], ..b()
                                },
                                N {num: 70.0, ..b()}
                            ], ..b()
                        },
                        N {num: 80.0, ..b()}
                    ], ..b()
                }
            ], ..b()
        };

        benchmark(&ast);
}

enum Oper {
    Multiply,
    Divide,
    Add,
    Substract,
    Sum,
    Value
}

struct N {
    oper: Oper,
    args: Vec<N>,
    num: f32
}


fn b() -> N {
    return N {oper: Oper::Value, num: 0.0, args: vec![] };
}

fn add(args: Vec<f32>) -> f32 {
    return args[0] + args[1];
}

fn divide(args: Vec<f32>) -> f32 {
    return args[0] / args[1];
}

fn multiply(args: Vec<f32>) -> f32 {
    return args[0] * args[1];
}

fn substract(args: Vec<f32>) -> f32 {
    return args[0] - args[1];
}

fn sum(args: Vec<f32>) -> f32 {
    let mut total_sum = 0.0;

    for arg in args {
        total_sum += arg;
    }

    return total_sum;
}

fn evaluate(ast: &N) -> f32 {
    let mut evaluated_args: Vec<f32> = vec![];

    for arg in &ast.args {
        evaluated_args.push(evaluate(&arg));
    }

    return match ast.oper {
        Oper::Add       => add(evaluated_args),
        Oper::Multiply  => multiply(evaluated_args),
        Oper::Divide    => divide(evaluated_args),
        Oper::Substract => substract(evaluated_args),
        Oper::Sum       => sum(evaluated_args),
        Oper::Value     => ast.num
    }
}

fn benchmark(ast: &N) {
    let mut total_sum = 0.0;
    let iterations = 100_000;

    let start = SystemTime::now();

    for x in 0..iterations {
        total_sum += evaluate(ast);
    }

    match start.elapsed() {
        Ok(elapsed) => {
            let spent: f32 = elapsed.as_secs() as f32 + (elapsed.subsec_nanos() as f32 / 1000_000_000.0 ) as f32;

            println!("Total Sum {:?}", total_sum);
            println!("COMPUTED [{}] ITERATIONS IN [{}] SECONDS", iterations, spent);
        }
        Err(e) => {
            println!("Error: {:?}", e);
        }
    }
}
