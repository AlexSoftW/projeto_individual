//Session storage do usuario conectado
var nome_home = sessionStorage.NOME_USUARIO;
var id_home = sessionStorage.ID_USUARIO;
var pokeInicial_home = sessionStorage.POKEMON_USUARIO;
var genero_home = sessionStorage.GENERO_USUARIO;

//Informações do card do pokemon escolhido pelo usuario
var nome_poke_home = "";
var nome_poke_home_M = "";
var num_home = "";
var type_home = "";
var altura_home = "";
var peso_home = "";
var segunda_evo_home = "";
var terceira_evo_home = "";
var atk_home = "";
var def_home = "";
var hp_home = "";
var spd_home = "";

//Exibindo o nome na home_page_treinador 
span_nome_treinador.innerHTML = nome_home;
tag_name.innerHTML = nome_home;

if (genero_home == "M") {
   masculino();
} else if (genero_home == "F") {
   feminino();
} else {
   alert("❌error❗: você não tem permissão de acessar está página!");
}

if (pokeInicial_home == "Bulbasaur") {
   bulbasaur_home();
} else if (pokeInicial_home == "Charmander") {
   charmander_home();
} else if (pokeInicial_home == "Squirtle") {
   squirtle_home();
} else {
   // alert("❌error❗: você não tem permissão de acessar está página!");
}

function sair_sessao() {
   window.location = "../login.html";
   sessionStorage.clear();
}

function feminino() {
   tag_sub_name.innerHTML = "Treinadora Pokémon";
   informacoes.innerHTML = `<p>Gênero:</p>
      <img src="../assets/img/pokemon/icons/feminino.png"/>`;
   treinador_pokemon.innerHTML = `<img src="../assets/img/pokemon/treinador/girl.png"/>`;
}

function masculino() {
   tag_sub_name.innerHTML = "Treinador Pokémon";
   informacoes.innerHTML = `<p>Gênero:</p>
      <img src="../assets/img/pokemon/icons/masculino.png"/>`;
   treinador_pokemon.innerHTML = `<img src="../assets/img/pokemon/treinador/ash.png"/>`;
}

function bulbasaur_home() {
   poke_fav.innerHTML = `<p>Pokemon Fav:</p>
                           <img src="../assets/img/pokemon/pokemon/bulbasaur_pixel.png" />`;

   nome_poke_home = "bulbasaur";
   nome_poke_home_M = "Bulbasaur";
   num_home = "001";
   type_home = "grass";
   altura_home = "0.7";
   peso_home = "6.9";
   segunda_evo_home = "ivysaur";
   terceira_evo_home = "venusaur";
   atk_home = "30";
   def_home = "30";
   hp_home = "30";
   spd_home = "30";
}

function charmander_home() {
   poke_fav.innerHTML = `<p>Pokemon Fav:</p>
                           <img src="../assets/img/pokemon/pokemon/charmander_pixel.png" />`;

   nome_poke_home = "charmander";
   nome_poke_home_M = "Charmander";
   num_home = "004";
   type_home = "fire";
   altura_home = "0.6";
   peso_home = "8.5";
   segunda_evo_home = "charmeleon";
   terceira_evo_home = "charizard";
   atk_home = "40";
   def_home = "30";
   hp_home = "30";
   spd_home = "40";
}

function squirtle_home() {
   poke_fav.innerHTML = `<p>Pokemon Fav:</p>
                           <img src="../assets/img/pokemon/pokemon/squirtle_pixel.png" />`;

   nome_poke_home = "squirtle";
   nome_poke_home_M = "Squirtle";
   num_home = "007";
   type_home = "water";
   altura_home = "0.5";
   peso_home = "9.0";
   segunda_evo_home = "wartortle";
   terceira_evo_home = "blastoise";
   atk_home = "30";
   def_home = "40";
   hp_home = "30";
   spd_home = "30";
}

card.innerHTML = `
      <div class="title">
         <h1>${nome_poke_home_M}</h1>
         <div class="sub_title">
            <p>Nº${num_home}</p>
            <img src="../assets/img/icons/icon_pokeball.png" />
         </div>
      </div>
      <img
         src="../assets/img/pokemon/pokemon/card_${nome_poke_home}.png"
         id="pokemon_card"
      />
      <div class="status">
         <h3>Status</h3>
         <hr />
         <p>Altura: ${altura_home} m</p>
         <p>Peso: ${peso_home} kg</p>
         <div class="tipo">
            <p>Tipo:</p>
            <img src="../pokemon_game/icons/${type_home}.png" />
         </div>
         <p>Evoluções:</p> 
         <div class="evolucao">
            <img src="../assets/img/pokemon/pokemon/${segunda_evo_home}_pixel.png" />
            <img src="../assets/img/pokemon/pokemon/${terceira_evo_home}_pixel.png" />
         </div>
      </div>
      `;

poder.innerHTML = `
   <div class="atributo">
      <div class="status">
         <img src="../assets/img/pokemon/icons/atk.png">
         <p>ATK</p>
      </div>
      <div class="barra_poder">
         <p class="barra_atk" style="width: ${atk_home}%">${atk_home}</p>
      </div>
   </div>
   <div class="atributo">
      <div class="status">
         <img src="../assets/img/pokemon/icons/def.png">
         <p>DEF</p>
      </div>
      <div class="barra_poder">
         <p class="barra_def" style="width: ${def_home}%">${def_home}</p>
      </div>
   </div>
   <div class="atributo">
      <div class="status">
         <img src="../assets/img/pokemon/icons/hp.png">
         <p>HP</p>
      </div>
      <div class="barra_poder">
         <p class="barra_hp" style="width: ${hp_home}%">${hp_home}</p>
      </div>
   </div>
   <div class="atributo">
      <div class="status">
         <img src="../assets/img/pokemon/icons/speed.png">
         <p>SPD</p>
      </div>
      <div class="barra_poder">
         <p class="barra_spd" style="width: ${spd_home}%">${spd_home}</p>
      </div>
   </div>
`;
//DADOS DASHBOARD(USUARIO)
function listar_all_pokemon_usuario() {
   fetch(`/usuarios/listar_all_pokemon_user/${id_home}`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));
               
               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  var cor = "red"
                  if(query.Status == "Capturado"){
                     cor = "green"
                  }

                  grafico_pokemon.innerHTML += `
                  <div class="bag_pokemon" id="bag_pokemon">
                     <div class="item">
                        <img src="../assets/img/pokemon/pokemon/${query.Pokemon}.png">
                        <p>${query.Pokemon}</p>
                     </div>
                     <div class="item">
                        <p>Tipo</p>
                        <img src="../assets/img/pokemon/pokemon/type/${query.tipo}.png">
                     </div>
                     <div class="item">
                        <p>Peso</p>
                        <p>${query.peso}KG</p>
                     </div>
                     <div class="item">
                        <p>Altura</p>
                        <p>${query.altura}M</p>
                     </div>
                     <div class="item">
                        <p>Status</p>
                        <p style="color: ${cor}">${query.Status}</p>
                     </div> 
                  </div>
                        `;
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
   44;
}

function ultimo_pokemon_capturado() {
   fetch(`/usuarios/ultimo_capturado/${id_home}`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               var card_img_poke = document.getElementById("card_img_pokemon");
               var card_type_pokemon =
                  document.getElementById("card_type_pokemon");
               var card_altura_pokemon = document.getElementById(
                  "card_altura_pokemon"
               );
               var card_peso_pokemon =
                  document.getElementById("card_peso_pokemon");

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  card_img_poke.innerHTML = `
                     <img src="../assets/img/pokemon/pokemon/${query.Pokemon}.png" />
                     <p id="nome_tag_pokemon">${query.Pokemon}</p>`;

                  card_type_pokemon.innerHTML = `
                     <p class="title_card" id="title_card">Tipo</p>
                              <img
                                 src="../assets/img/pokemon/pokemon/type/${query.tipo}.png"
                                 width="55px"
                              />`;

                  card_altura_pokemon.innerHTML = `
                     <p class="title_card">Altura</p>
                              <p>${query.altura}m</p>`;

                  card_peso_pokemon.innerHTML = `
                     <p class="title_card">Peso</p>
                              <p>${query.peso}kg</p>`;
               }

               //finalizarAguardar();
            });
         } else {
            throw "Houve um erro na função ultimo_pokemon_capturado, linha 181!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
   44;
}

//DADOS GLOBAIS
function listar_all_pokemon() {
   fetch(`/usuarios/listar_all`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               var tabela = document.getElementById("tabela");
               

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];
                  var cor = "green";

                  if(query.Status == "Fugiu"){
                     cor = "red"
                  }
                  
                  tabela.innerHTML += `
                     <tr class="tabela_global">
                        <td>${query.Treinador}</td>
                        <td>${query.DataCaptura}</td>
                        <td class="td_pokemon"><img src="../assets/img/pokemon/pokemon/${query.Pokemon}.png">
                           <p style="font-size:15px">${query.Pokemon}</p>
                        </td>
                        <td style="color:${cor}; font-weight: bolder">${query.Status}</td>
                     </tr>
                     `;
               }

               //finalizarAguardar();
            });
         } else {
            throw "Houve um erro na função listar_all_pokemon() JS:home_treinador|linha 236!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
   44;
}

function listar_bulbasaur_escolhido() {
   fetch(`/usuarios/listar_bulbasaur`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  var resultadoPoke = query.Bulbasaur;

                  sessionStorage.setItem(
                     "qtd_bulbasaur_escolhido",
                     resultadoPoke
                  );
               }
            });
         } else {
            throw "Houve um erro na função listar_Bulbasaur_pokemon() JS:home_treinador|linha 280!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
   44;
}

function listar_charmander_escolhido() {
   fetch(`/usuarios/listar_charmander`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  var resultadoPoke = query.Charmander;
                  sessionStorage.setItem(
                     "qtd_charmander_escolhido",
                     resultadoPoke
                  );
               }
            });
         } else {
            throw "Houve um erro na função listar_Charmander_pokemon() JS:home_treinador|linha 311!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
   44;
}

function listar_squirtle_escolhido() {
   fetch(`/usuarios/listar_squirtle`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  var resultadoPoke = query.Squirtle;
                  sessionStorage.setItem(
                     "qtd_squirtle_escolhido",
                     resultadoPoke
                  );
               }
            });
         } else {
            throw "Houve um erro na função listar_Squirtle_pokemon() JS:home_treinador|linha 342!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
   44;
}

function listar_lider_capturado() {
   fetch(`/usuarios/listar_lider`)
      .then(function (resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               //   alert('ERRO ULTIMO CAPTURADO!');
            }
            resposta.json().then(function (resposta) {
               console.log("Dados recebidos: ", JSON.stringify(resposta));
               var char = "";

               for (let i = 0; i < resposta.length; i++) {
                  var query = resposta[i];

                  if(query.genero == "M"){
                     char = "ash"
                  } else{
                     char = "girl"
                  }

                  card_global_name.innerHTML = `
                  <p>${query.Treinador}</p>
                  <hr>`;

                  card_global_char.innerHTML = `
                  <img src="../assets/img/pokemon/treinador/${char}.png">`;

                  card_global_qtd.innerHTML = `
                  <h1>${query.qtdCaptura}</h1>`;
               }
            });
         } else {
            throw "Houve um erro na função listar_lider_capturado() JS:home_treinador|linha 373!";
         }
      })
      .catch(function (resposta) {
         console.error(resposta);
         //finalizarAguardar();
      });
   44;
}

// DASHBOARD
