var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}
// REVER ISSO AQUI E TALVEZ TIRAR
function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;

    if (login == undefined) {
        res.status(400).send("Seu login está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(login, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("login e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var escolherGenero = req.body.generoServer;
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;
    var escolherPoke = req.body.escolherPokemonServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (escolherGenero == undefined) {
        res.status(400).send("Seu genero está undefined!");
    } else if (login == undefined) {
        res.status(400).send("Seu login está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (escolherPoke == undefined) {
        res.status(400).send("Sua avatar está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, escolherGenero, login, senha, escolherPoke)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

//CAPTURADO------------------------------------------
function capturado_sucesso(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idtreinadorLogado = req.body.idTreinadorLogadoServer;
    var pokemonCapturado = req.body.pokemonCapturadoServer;

    // Faça as validações dos valores
    if (idtreinadorLogado == undefined) {
        res.status(400).send("Seu treinador está undefined!");
    } else if (pokemonCapturado == undefined) {
        res.status(400).send("Sua pokemon está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.capturado_sucesso(idtreinadorLogado, pokemonCapturado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

//FUGIU--------------------------------------------
function capturado_fail(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idtreinadorLogado = req.body.idTreinadorLogadoServer;
    var pokemonCapturado = req.body.pokemonCapturadoServer;

    // Faça as validações dos valores
    if (idtreinadorLogado == undefined) {
        res.status(400).send("Seu treinador está undefined!");
    } else if (pokemonCapturado == undefined) {
        res.status(400).send("Sua pokemon está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.capturado_fail(idtreinadorLogado, pokemonCapturado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

//------------------------- ULTIMO POKEMON
function ultimo_capturado(req, res) {
    var id_home = req.params.id_home;
    usuarioModel.ultimo_capturado(id_home).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- TODOS OS POKEMON CAPTURADO POR SEMANA DO USUARIO CONECTADO
function capturado_semana(req, res) {
    var id_home = req.params.id_home;
    usuarioModel.capturado_semana(id_home).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- TODOS OS POKEMON QUE FUGIU POR SEMANA DO USUARIO CONECTADO
function fugiu_semana(req, res) {
    var id_home = req.params.id_home;
    usuarioModel.fugiu_semana(id_home).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- TODOS OS POKEMON DO USUARIO CONECTADO
function listar_all_pokemon_user(req, res) {
    var id_home = req.params.id_home;
    usuarioModel.listar_all_pokemon_user(id_home).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- % DE POKEMON CAPTURADO
function taxa_capturado(req, res) {
    var id_home = req.params.id_home;
    usuarioModel.taxa_capturado(id_home).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- % DE POKEMON NÃO CAPTURADO
function taxa_nao_capturado(req, res) {
    var id_home = req.params.id_home;
    usuarioModel.taxa_nao_capturado(id_home).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- TODOS OS DADOS GLOBAIS
function listar_all(req, res) {
    usuarioModel.listar_all().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- Contar os bulbasaurs escolhidos
function listar_bulbasaur(req, res) {
    usuarioModel.listar_bulbasaur().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- Contar os charmanders escolhidos
function listar_charmander(req, res) {
    usuarioModel.listar_charmander().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- Contar os squirtles escolhidos
function listar_squirtle(req, res) {
    usuarioModel.listar_squirtle().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//------------------------- listar a maior qtd de pokemon capturado por 1 treinador
function listar_lider(req, res) {
    usuarioModel.listar_lider().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    capturado_sucesso,
    capturado_fail,
    ultimo_capturado,
    listar_all,
    listar_bulbasaur,
    listar_charmander,
    listar_squirtle,
    listar_lider,
    listar_all_pokemon_user,
    taxa_capturado,
    taxa_nao_capturado,
    capturado_semana,
    fugiu_semana
}