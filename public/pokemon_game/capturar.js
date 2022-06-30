var pokebolas = 10;
var chance_captura = 0;
var change_treinador = "";

// BOTÃO DE CAPTURAR
function capturar() {
   if (idPokemon == 0) {
      alert("👷‍♂️: Escolha 1 pokémon antes de capturar!");
   } else {
      p_frase_pokebolas.innerHTML = `x${(pokebolas -= 1)} Pokebolas`;
      if (pokebolas < 0) {
         alert("👷‍♂️: Suas pokebolas acabaram! 😢");
         p_frase_pokebolas.innerHTML = `x0 Pokebolas`;
      } else {
         if (idPokemon == 14) {
            esperando_capturar_mew();
         } else {
            esperando_capturar();
         }
      }
   }
}

function alternar_treinador() {
   var genero_home = sessionStorage.GENERO_USUARIO;

   if (genero_home == "M") {
      change_treinador = "boy_game";
   } else if (genero_home == "F") {
      change_treinador = "girl_game";
   } else {
      alert("erro no avatar");
   }
}

function esperando_capturar_mew() {
   alternar_treinador();
   chance_captura = Math.floor(Math.random() * 100 + 1);
   detalhes.innerHTML = "";
   treinador.innerHTML = `<img src="../assets/img/pokemon/treinador/${change_treinador}.gif">`;

   console.log(chance_captura);

   setTimeout(() => {
      treinador.innerHTML = `<img src="../assets/img/pokemon/treinador/${change_treinador}.png">`;
   }, 700);

   intervalo = setInterval(() => {
      pedra_evoluir.disabled = true;
      capturar_poke.disabled = true;
      contador += 1;
      if (contador >= 65 && contador < 100) {
         pokemon.innerHTML = `<img src="efeitos/jogar_pokebola.gif">`;
      } else if (contador >= 100 && contador < 130) {
         pokemon.innerHTML = `<img src="efeitos/pokebola1.gif">`;
      } else if (contador >= 130 && contador < 400) {
         pokemon.innerHTML = `<img src="efeitos/pokebola2.gif">`;
         frase_evolution.innerHTML = `<img src="frases/esperando.png">`;
         if (contador == 399 && chance_captura >= 1 && chance_captura <= 94) {
            capturado_fail();
         } else if (
            contador == 399 &&
            chance_captura > 94 &&
            chance_captura <= 100
         ) {
            capturado_sucesso();
         }
      }
   }, 25);
}

function esperando_capturar() {
   alternar_treinador();
   chance_captura = Math.floor(Math.random() * (9 + 1) + 1);
   detalhes.innerHTML = "";
   treinador.innerHTML = `<img src="../assets/img/pokemon/treinador/${change_treinador}.gif">`;

   setTimeout(() => {
      treinador.innerHTML = `<img src="../assets/img/pokemon/treinador/${change_treinador}.png">`;
   }, 700);

   intervalo = setInterval(() => {
      pedra_evoluir.disabled = true;
      capturar_poke.disabled = true;
      contador += 1;
      if (contador >= 65 && contador < 100) {
         pokemon.innerHTML = `<img src="efeitos/jogar_pokebola.gif">`;
      } else if (contador >= 100 && contador < 130) {
         pokemon.innerHTML = `<img src="efeitos/pokebola1.gif">`;
      } else if (contador >= 130 && contador < 400) {
         pokemon.innerHTML = `<img src="efeitos/pokebola2.gif">`;
         frase_evolution.innerHTML = `<img src="frases/esperando.png">`;
         if (contador == 399 && chance_captura >= 1 && chance_captura <= 6) {
            capturado_sucesso();
         } else if (
            contador == 399 &&
            chance_captura >= 7 &&
            chance_captura <= 10
         ) {
            capturado_fail();
         }
      }
   }, 25);
}

function capturado_sucesso() {
   audiopoke.innerHTML = `<audio preload="auto" autoplay>
                              <source src="audio/efeitos/capture_sucess.mp3" type="audio/mpeg">
                           </audio>`;
   pokemon.innerHTML = `<img src="efeitos/pokebola3.gif">`;
   frase_evolution.innerHTML = `<img src="frases/capturado.png">`;

   var idTreinadorLogadoVar = sessionStorage.ID_USUARIO;
   var pokemonCapturadoVar = localStorage.pokemon;

   fetch("/usuarios/capturado_sucesso", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         // crie um atributo que recebe o valor recuperado aqui
         // Agora vá para o arquivo routes/usuario.js
         idTreinadorLogadoServer: idTreinadorLogadoVar,
         pokemonCapturadoServer: pokemonCapturadoVar,
      }),
   })
      .then(function (resposta) {
         porcento_capturado();
         listar_capturado_semana();

         if (resposta.ok) {
         } else {
            window.alert("Houve um erro ao tentar realizar o cadastro!❌");
         }
      })
      .catch(function (resposta) {
         console.log(`#ERRO: ${resposta}`);
      });

   return false;
}

function capturado_fail() {
   audiopoke.innerHTML = `<audio preload="auto" autoplay>
                              <source src="audio/efeitos/capture_fail.mp3" type="audio/mpeg">
                           </audio>`;
   pokemon.innerHTML = `<img src="icons/pokeFail.png" width="70px">`;
   frase_evolution.innerHTML = `<img src="frases/failCapturado.png">`;

   var idTreinadorLogadoVar = sessionStorage.ID_USUARIO;
   var pokemonCapturadoVar = localStorage.pokemon;

   fetch("/usuarios/capturado_fail", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         // crie um atributo que recebe o valor recuperado aqui
         // Agora vá para o arquivo routes/usuario.js
         idTreinadorLogadoServer: idTreinadorLogadoVar,
         pokemonCapturadoServer: pokemonCapturadoVar,
      }),
   })
      .then(function (resposta) {
         porcento_nao_capturado();
         listar_fugiu_semana();

         if (resposta.ok) {
         } else {
            window.alert("Houve um erro ao tentar capturar!❌");
         }
      })
      .catch(function (resposta) {
         console.log(`#ERRO: ${resposta}`);
      });

   return false;
}

function porcento_capturado() {
   var id_home = sessionStorage.ID_USUARIO;
   fetch(`/usuarios/taxa_capturado/${id_home}`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  var capturado_porcento = query.porcento;
                  sessionStorage.setItem(
                     "chave_capturado_porcento",
                     capturado_porcento
                  );
               }
            });
         } else {
            throw "Houve um erro na função ultimo_pokemon_capturado, linha 181!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
}

function porcento_nao_capturado() {
   var id_home = sessionStorage.ID_USUARIO;
   fetch(`/usuarios/taxa_nao_capturado/${id_home}`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  var nao_capturado_porcento = query.porcento;
                  sessionStorage.setItem(
                     "chave_nao_capturado_porcento",
                     nao_capturado_porcento
                  );
               }
            });
         } else {
            throw "Houve um erro na função ultimo_pokemon_capturado, linha 181!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
}

function listar_capturado_semana() {
  var id_home = sessionStorage.ID_USUARIO;
  fetch(`/usuarios/capturado_semana/${id_home}`)
     .then(function (resposta) {
        if (resposta.ok) {
           if (resposta.status == 204) {
              //   alert('ERRO ULTIMO CAPTURADO!');
           }
           resposta.json().then(function (resposta) {
              console.log("Dados recebidos: ", JSON.stringify(resposta));

              for (let i = 0; i < resposta.length; i++) {
                 var query = resposta[i];
                 var diaDaSemana = query.diaSemana;
                 var qtdCapturado = query.qtdPorDia;

                 if (diaDaSemana == 0) {
                    sessionStorage.setItem("domingo_capturado", qtdCapturado);
                 } else if (diaDaSemana == 1) {
                    sessionStorage.setItem("segunda_capturado", qtdCapturado);
                 } else if (diaDaSemana == 2) {
                    sessionStorage.setItem("terça_capturado", qtdCapturado);
                 } else if (diaDaSemana == 3) {
                    sessionStorage.setItem("quarta_capturado", qtdCapturado);
                 } else if (diaDaSemana == 4) {
                    sessionStorage.setItem("quinta_capturado", qtdCapturado);
                 } else if (diaDaSemana == 5) {
                    sessionStorage.setItem("sexta_capturado", qtdCapturado);
                 } else if (diaDaSemana == 6) {
                    sessionStorage.setItem("sabado_capturado", qtdCapturado);
                 }
              }
           });
        } else {
           throw "Houve um erro na função ultimo_pokemon_capturado, linha 181!";
        }
     })
     .catch(function (resposta) {
        console.error(resposta);
        //finalizarAguardar();
     });
}

function listar_fugiu_semana() {
  var id_home = sessionStorage.ID_USUARIO;
  fetch(`/usuarios/fugiu_semana/${id_home}`)
     .then(function (resposta) {
        if (resposta.ok) {
           if (resposta.status == 204) {
              //   alert('ERRO ULTIMO CAPTURADO!');
           }
           resposta.json().then(function (resposta) {
              console.log("Dados recebidos: ", JSON.stringify(resposta));

              for (let i = 0; i < resposta.length; i++) {
                 var query = resposta[i];
                 var diaDaSemana = query.diaSemana;
                 var qtdFugiu = query.qtdPorDia;

                 if (diaDaSemana == 0) {
                    sessionStorage.setItem("domingo_fugiu", qtdFugiu);
                 } else if (diaDaSemana == 1) {
                    sessionStorage.setItem("segunda_fugiu", qtdFugiu);
                 } else if (diaDaSemana == 2) {
                    sessionStorage.setItem("terça_fugiu", qtdFugiu);
                 } else if (diaDaSemana == 3) {
                    sessionStorage.setItem("quarta_fugiu", qtdFugiu);
                 } else if (diaDaSemana == 4) {
                    sessionStorage.setItem("quinta_fugiu", qtdFugiu);
                 } else if (diaDaSemana == 5) {
                    sessionStorage.setItem("sexta_fugiu", qtdFugiu);
                 } else if (diaDaSemana == 6) {
                    sessionStorage.setItem("sabado_fugiu", qtdFugiu);
                 }
              }
           });
        } else {
           throw "Houve um erro na função ultimo_pokemon_capturado, linha 181!";
        }
     })
     .catch(function (resposta) {
        console.error(resposta);
        //finalizarAguardar();
     });
}