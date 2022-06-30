CREATE DATABASE pokemon;
USE pokemon;

CREATE TABLE pokemon(
	idPokemon INT PRIMARY KEY AUTO_INCREMENT
    , nomePokemon VARCHAR(30)
    , tipo VARCHAR(20)
	, altura DOUBLE
    , peso DOUBLE
);

CREATE TABLE statusCaptura(
	idStatusCaptura INT PRIMARY KEY AUTO_INCREMENT
    , statusCaptura VARCHAR(20)
);

CREATE TABLE treinador(
	idTreinador INT PRIMARY KEY AUTO_INCREMENT
    , nome VARCHAR(60)
    , genero CHAR(1)
    , login VARCHAR(50) UNIQUE
    , senha VARBINARY(120)
    , pokemonInicial VARCHAR(20)
    , fkProfessor INT
    , FOREIGN KEY(fkProfessor) REFERENCES treinador(idTreinador)
);

CREATE TABLE capturar(
	idCapturar INT AUTO_INCREMENT
    , dataCaptura DATETIME
    , fkTreinador INT
	, FOREIGN KEY (fkTreinador) REFERENCES treinador(idTreinador)
	, fkPokemon INT
	, FOREIGN KEY (fkPokemon) REFERENCES pokemon(idPokemon)
    , fkStatusCaptura INT
    , FOREIGN KEY (fkStatusCaptura) REFERENCES statusCaptura(idStatusCaptura)
	, PRIMARY KEY (idCapturar, fkTreinador, fkPokemon, fkStatusCaptura)
);

-- CAMPOS PRÉ-DEFINIDOS
-- Inserindo um professor na tabela treinador(recursivo)
INSERT INTO treinador(nome, genero, login, senha, pokemonInicial, fkProfessor)
	VALUES('Carvalho', 'M', 'Professor_carvalho', aes_encrypt('carvalho123', 'pokemon'), null, null); -- Treinador = ID:1

-- Inserindo todos os Pokemon's da fase inicial
INSERT INTO pokemon(nomePokemon, tipo, altura, peso)
	VALUES('Bulbasaur', 'Planta', 0.7, 6.9)
		, ('Charmander', 'Fogo', 0.6, 8.5)
        , ('Squirtle', 'Água', 0.5, 9.0)
        , ('Caterpie', 'Inseto', 0.3, 2.9)
        , ('Weedle', 'Inseto', 0.3, 3.2)
        , ('Pidgey', 'Voador', 0.3, 1.8)
        , ('NidoranF', 'Venenoso', 0.4, 7.0)
        , ('NidoranM', 'Venenoso', 0.5, 9.0)
        , ('Eevee', 'Normal', 0.3, 6.5)
        , ('Abra', 'Psíquico', 0.9, 19.5)
        , ('Machop', 'Lutador', 0.8, 19.5)
        , ('Gastly', 'Fantasma', 1.3, 0.1)
        , ('Dratini', 'Dragão', 1.8, 3.3)
        , ('Mew', 'Psíquico', 0.4, 4.0)
        , ('Ditto', 'Normal', 0.3, 4.0);
  
-- Inserindo 2 Status da captura
    INSERT INTO statusCaptura(statusCaptura)
		VALUES('Capturado') -- 1
			, ('Fugiu'); -- 2

-- SELECT TODAS AS TABELAS            
	 SELECT * FROM treinador;
	 SELECT * FROM pokemon;
     SELECT * FROM capturar;	
     SELECT * FROM statusCaptura;
     
-- Mostrar todos o treinadores, data, pokemon e status
     SELECT idCapturar, treinador.nome AS 'Treinador', DATE_FORMAT(dataCaptura, '%d/%m/%Y %Hh%i') AS 'dataFormatada', 
		nomePokemon AS 'Pokemon', statusCaptura AS 'Status'
				FROM treinador JOIN capturar ON idTreinador = fkTreinador
					JOIN pokemon ON idPokemon = fkPokemon
						JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura ORDER BY idCapturar DESC;
                    
-- Mostrar o treinador, data, pokemon, status do ultimo pokemon que foi capturado por treinador X
     SELECT capturar.idCapturar, treinador.nome AS 'Treinador', dataCaptura AS 'Data Captura', 
		nomePokemon AS 'Pokemon', tipo, altura, peso, statusCaptura AS 'Status'
		FROM treinador JOIN capturar ON idTreinador = fkTreinador
			JOIN pokemon ON idPokemon = fkPokemon
				JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura
					WHERE idTreinador = 3 AND statusCaptura = 'Capturado' ORDER BY idCapturar DESC LIMIT 1;                    

-- Mostrar pokemon, data, e status do usuario conectado
	SELECT nomePokemon AS 'Pokemon', tipo, altura, peso, statusCaptura AS 'Status'
		FROM treinador JOIN capturar ON idTreinador = fkTreinador
			JOIN pokemon ON idPokemon = fkPokemon
				JOIN statusCaptura ON idStatusCaptura = fkStatusCaptura
					WHERE idTreinador = 2;

-- Mostrar a qtd de vezes que o pokemon inicial foi escolhido
SELECT COUNT(pokemonInicial) FROM treinador WHERE pokemonInicial LIKE '%Charmander%';

-- Treinador com a maior qtd de pokémon capturado
SELECT treinador.nome AS 'Treinador', COUNT(idCapturar) AS 'qtdCaptura'
	FROM treinador JOIN capturar ON idTreinador = fkTreinador
        JOIN statuscaptura ON idStatusCaptura = fkStatusCaptura
            WHERE statusCaptura LIKE 'Capturado' GROUP BY treinador.nome ORDER BY qtdCaptura DESC LIMIT 1;
            
-- Mostrar quantos pokemon foi capturado pelo dia da semana do usuario conectado		
SELECT COUNT(*) AS 'qtdPorDia' , date_format(dataCaptura, '%w') AS 'diaSemana'
	FROM capturar WHERE WEEK(dataCaptura) = week(current_timestamp()) 
		AND fkStatusCaptura = 2 AND fkTreinador = 2
			group BY day(dataCaptura);
            
-- Mostrar quantos pokemon fugiu pelo dia da semana do usuario conectado		
SELECT COUNT(*) AS 'qtdPorDia' , date_format(dataCaptura, '%w') AS 'diaSemana'
	FROM capturar WHERE WEEK(dataCaptura) = week(current_timestamp()) 
		AND fkStatusCaptura = 2 AND fkTreinador = 2
			group BY day(dataCaptura);

-- INSERIR DADOS PARA TESTAR OUTROS DIAS DA SEMANA
-- INSERT INTO capturar(dataCaptura, fkTreinador, fkPokemon, fkStatusCaptura)
-- VALUE('2022-06-11 12:00:00', 2, 1, 1);