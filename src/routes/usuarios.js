var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Mostra na home_page do usuario conectado o ultimo pokemon que ele capturou
router.get("/ultimo_capturado/:id_home", function (req, res) {
    usuarioController.ultimo_capturado(req, res);
 });

 //Mostra quantos bulbasaurs foram escolhidos como poke inicial(global)
 router.get("/listar_bulbasaur", function (req, res) {
    usuarioController.listar_bulbasaur(req, res);
 });

 //Mostra quantos charmanders foram escolhidos como poke inicial(global)
 router.get("/listar_charmander", function (req, res) {
    usuarioController.listar_charmander(req, res);
 });

 //Mostra quantos squirtles foram escolhidos como poke inicial(global)
 router.get("/listar_squirtle", function (req, res) {
    usuarioController.listar_squirtle(req, res);
 });

//Mostrar todos os pokemons capturado na semana pelo usuario conectado 
router.get("/capturado_semana/:id_home", function (req, res) {
   usuarioController.capturado_semana(req, res);
});

//Mostrar todos os pokemons que fugiu na semana pelo usuario conectado 
router.get("/fugiu_semana/:id_home", function (req, res) {
   usuarioController.fugiu_semana(req, res);
});

 //Mostrar todos os pokemons capturado pelo usuario conectado
 router.get("/listar_all_pokemon_user/:id_home", function (req, res) {
    usuarioController.listar_all_pokemon_user(req, res);
 });

 //Mostra a taxa de captura(SUCESSO) do usuario conectado
 router.get("/taxa_capturado/:id_home", function (req, res) {
    usuarioController.taxa_capturado(req, res);
 });

 //Mostra a taxa de captura(FAIL) do usuario conectado
 router.get("/taxa_nao_capturado/:id_home", function (req, res) {
    usuarioController.taxa_nao_capturado(req, res);
 });

 // Mostra todos os pokemons, data e quem capturou globalmente
 router.get("/listar_all", function (req, res) {
    usuarioController.listar_all(req, res);
 });

 //Mostra o lider treinador que mais capturou pokemon com sucesso
 router.get("/listar_lider", function (req, res) {
    usuarioController.listar_lider(req, res);
 });

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

//Envia os dados do game pokemon em INSERT(capturado)
router.post("/capturado_sucesso", function (req, res) {
    usuarioController.capturado_sucesso(req, res);
})

//Envia os dados do game pokemon em INSERT(Fugiu)
router.post("/capturado_fail", function (req, res) {
    usuarioController.capturado_fail(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;