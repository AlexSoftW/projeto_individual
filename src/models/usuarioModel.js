var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARUI MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM treinador;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(login, senha) {
    console.log("ACESSEI O treinador MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", login, senha)
    var instrucao = `
        SELECT * FROM treinador WHERE login = '${login}' AND senha = aes_encrypt('${senha}', 'pokemon');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, escolherGenero, login, senha, escolherPoke) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, escolherGenero, login, senha, escolherPoke);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO treinador (nome, genero, login, senha, pokemonInicial, fkProfessor) 
            VALUES ('${nome}', '${escolherGenero}', '${login}', aes_encrypt('${senha}', 'pokemon'), '${escolherPoke}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturado_sucesso(idtreinadorLogado, pokemonCapturado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function capturado_sucesso():", idtreinadorLogado, pokemonCapturado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO capturar(dataCaptura, fkTreinador, fkPokemon, fkStatusCaptura)
	    VALUES(NOW() , ${idtreinadorLogado}, ${pokemonCapturado} , 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturado_fail(idtreinadorLogado, pokemonCapturado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function capturado_fail():", idtreinadorLogado, pokemonCapturado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO capturar(dataCaptura, fkTreinador, fkPokemon, fkStatusCaptura)
	    VALUES(NOW() , ${idtreinadorLogado}, ${pokemonCapturado}, 2);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

//DASHBOARD USUARIO
function ultimo_capturado(id_home) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ultimo_capturado()");
    var instrucao = `
    SELECT capturar.idCapturar, treinador.nome AS 'Treinador', dataCaptura AS 'Data Captura', 
		nomePokemon AS 'Pokemon', tipo, altura, peso, statusCaptura AS 'Status'
		FROM treinador JOIN capturar ON idTreinador = fkTreinador
			JOIN pokemon ON idPokemon = fkPokemon
				JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura
					WHERE idTreinador = ${id_home} AND statusCaptura = 'Capturado' ORDER BY idCapturar DESC LIMIT 1;   
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturado_semana(id_home) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_all_pokemon_user()");
    var instrucao = `
    SELECT COUNT(*) AS 'qtdPorDia' , date_format(dataCaptura, '%w') AS 'diaSemana'
        FROM capturar WHERE WEEK(dataCaptura) = week(current_timestamp()) 
            AND fkStatusCaptura = 1 AND fkTreinador = ${id_home}
                group BY day(dataCaptura);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function fugiu_semana(id_home) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_all_pokemon_user()");
    var instrucao = `
    SELECT COUNT(*) AS 'qtdPorDia' , date_format(dataCaptura, '%w') AS 'diaSemana'
        FROM capturar WHERE WEEK(dataCaptura) = week(current_timestamp()) 
            AND fkStatusCaptura = 2 AND fkTreinador = ${id_home}
                group BY day(dataCaptura);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_all_pokemon_user(id_home) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_all_pokemon_user()");
    var instrucao = `
    SELECT capturar.idCapturar, nomePokemon AS 'Pokemon', tipo, altura, peso, statusCaptura AS 'Status'
		FROM treinador JOIN capturar ON idTreinador = fkTreinador
			JOIN pokemon ON idPokemon = fkPokemon
				JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura
					WHERE idTreinador = ${id_home} order by idCapturar DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function taxa_capturado(id_home) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_all_pokemon_user()");
    var instrucao = `
    SELECT COUNT(idCapturar) AS 'porcento' FROM capturar
	JOIN treinador ON idTreinador = fkTreinador
		JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura
			WHERE idTreinador = ${id_home} AND statusCaptura = 'Capturado' GROUP BY statusCaptura;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function taxa_nao_capturado(id_home) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_all_pokemon_user()");
    var instrucao = `
    SELECT COUNT(idCapturar) AS 'porcento' FROM capturar
	JOIN treinador ON idTreinador = fkTreinador
		JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura
			WHERE idTreinador = ${id_home} AND statusCaptura = 'Fugiu' GROUP BY statusCaptura;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// DADOS GLOBAIS
function listar_all() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_all()");
    var instrucao = `
    SELECT idCapturar, treinador.nome AS 'Treinador', DATE_FORMAT(dataCaptura, '%d/%m/%Y %Hh%i') AS 'DataCaptura', 
    nomePokemon AS 'Pokemon', statusCaptura AS 'Status'
            FROM treinador JOIN capturar ON idTreinador = fkTreinador
                JOIN pokemon ON idPokemon = fkPokemon
                    JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura ORDER BY idCapturar DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_bulbasaur(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_bulbasaur()");
    var instrucao = `
        SELECT COUNT(pokemonInicial) AS 'Bulbasaur' FROM treinador WHERE pokemonInicial LIKE '%Bulbasaur%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_charmander(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_charmander()");
    var instrucao = `
        SELECT COUNT(pokemonInicial) AS 'Charmander' FROM treinador WHERE pokemonInicial LIKE '%Charmander%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_squirtle(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_squirtle()");
    var instrucao = `
        SELECT COUNT(pokemonInicial) AS 'Squirtle' FROM treinador WHERE pokemonInicial LIKE '%Squirtle%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_lider(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_lider()");
    var instrucao = `
    SELECT treinador.nome AS 'Treinador', genero, COUNT(idCapturar) AS 'qtdCaptura'
	FROM treinador JOIN capturar ON idTreinador = fkTreinador
        JOIN statuscaptura ON idStatusCaptura = fkStatusCaptura
            WHERE statusCaptura LIKE 'Capturado' GROUP BY treinador.nome ORDER BY qtdCaptura DESC LIMIT 1;    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
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
};