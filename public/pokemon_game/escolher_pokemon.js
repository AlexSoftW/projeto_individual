var idPokemon = 0;
var select_pokemon = ''; 
var name_And_audio_pokemon = '';
var type_pokemon = '';
var type2_pokemon = '';
var change_treinador = '';

// FUNÇÕES DE CADA POKEMON SEPARADAMENTE
function escolher_bulbasaur(){
   resetarPokemon();
   idPokemon = 1;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_charmander() {
   resetarPokemon();
   idPokemon = 2;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_squirtle(){
   resetarPokemon();
   idPokemon = 3;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_caterpie(){
   resetarPokemon();
   idPokemon = 4;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_weedle(){
   resetarPokemon();
   idPokemon = 5;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_pidgey(){
   resetarPokemon();
   idPokemon = 6;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_nidoranF(){
   resetarPokemon();
   idPokemon = 7;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_nidoranM(){
   resetarPokemon();
   idPokemon = 8;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_eevee(){
   resetarPokemon();
   idPokemon = 9;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_abra(){
   resetarPokemon();
   idPokemon = 10;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_machop(){
   resetarPokemon();
   idPokemon = 11;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_gastly(){
   resetarPokemon();
   idPokemon = 12;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_dratini(){
   resetarPokemon();
   idPokemon = 13;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_mew(){
   resetarPokemon();
   idPokemon = 14;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}
function escolher_ditto(){
   resetarPokemon();
   idPokemon = 15;
   localStorage.setItem("pokemon", `${idPokemon}`)
   escolherPokemon()
}

function alternar_treinador(){
   var genero_home = sessionStorage.GENERO_USUARIO;  

   if(genero_home == 'M'){
      change_treinador = 'boy_game'
   }else if(genero_home == 'F'){
      change_treinador = 'girl_game'
   } else{
       alert('erro no avatar')
   }
 }

function escolherPokemon(){ 
   alternar_treinador()
   pedra_evoluir.disabled = false;
   capturar_poke.disabled = false;
   setTimeout(() => {
      treinador.innerHTML = `<img src="../assets/img/pokemon/treinador/${change_treinador}.png">`
   }, 720);

   if(idPokemon == 0){
      alert('erro ao modificar idPokemon(page:escolher_pokemon.js)')
   } else{
         if(idPokemon == 1){
            select_pokemon = 'bulbasaur';
            name_And_audio_pokemon = 'Bulbasaur';
            type_pokemon = 'grass';
            type2_pokemon = 'poison';

         } else if(idPokemon == 2){
            select_pokemon = 'charmander'
            name_And_audio_pokemon = 'Charmander';
            type_pokemon = 'fire';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 3){
            select_pokemon = 'squirtle'
            name_And_audio_pokemon = 'Squirtle';
            type_pokemon = 'water';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 4){
            select_pokemon = 'caterpie'
            name_And_audio_pokemon = 'Caterpie';
            type_pokemon = 'bug';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 5){
            select_pokemon = 'weedle'
            name_And_audio_pokemon = 'Weedle';
            type_pokemon = 'bug';
            type2_pokemon = 'poison';

         } else if(idPokemon == 6){
            select_pokemon = 'pidgey'
            name_And_audio_pokemon = 'Pidgey';
            type_pokemon = 'normal';
            type2_pokemon = 'flying';

         } else if(idPokemon == 7){
            select_pokemon = 'nidoranF'
            name_And_audio_pokemon = 'NidoranF';
            type_pokemon = 'poison';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 8){
            select_pokemon = 'nidoranM'
            name_And_audio_pokemon = 'NidoranM';
            type_pokemon = 'poison';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 9){
            select_pokemon = 'eevee'
            name_And_audio_pokemon = 'Eevee';
            type_pokemon = 'normal';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 10){
            select_pokemon = 'abra'
            name_And_audio_pokemon = 'Abra';
            type_pokemon = 'psychc';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 11){
            select_pokemon = 'machop'
            name_And_audio_pokemon = 'Machop';
            type_pokemon = 'fight';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 12){
            select_pokemon = 'gastly'
            name_And_audio_pokemon = 'Gastly';
            type_pokemon = 'ghost';
            type2_pokemon = 'poison';

         } else if(idPokemon == 13){
            select_pokemon = 'dratini'
            name_And_audio_pokemon = 'Dratini';
            type_pokemon = 'dragon';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 14){
            select_pokemon = 'mew'
            name_And_audio_pokemon = 'Mew';
            type_pokemon = 'psychc';
            type2_pokemon = 'not_a_icon';

         } else if(idPokemon == 15){
            select_pokemon = 'ditto'
            name_And_audio_pokemon = 'Ditto';
            type_pokemon = 'normal';
            type2_pokemon = 'not_a_icon';
         }

      setTimeout(() => {
         pokemon.innerHTML = `<img src="pokemons/${select_pokemon}.gif" width="90px">`;
         audiopoke.innerHTML = `<audio preload="auto" autoplay>
                              <source src="audio/${name_And_audio_pokemon}(Cry).mp3" type="audio/mpeg">
                              </audio>`;
         detalhes.innerHTML = `<div class="detalhe_pokemon">
                                 <img src="icons/poke-tag.png" width="8%">
                                 <p>${name_And_audio_pokemon}</p>
                                 <img src="icons/${type_pokemon}.png" width="15%">
                                 <img src="icons/${type2_pokemon}.png" width="16%">
                              </div> `;
      }, 1600);
   
      //GIF JOGANDO POKEBOLA
      setTimeout(() => {
         pokemon.innerHTML = `<img src="efeitos/jogar_pokebola.gif" width='120px'>`;
      }, 300);
      treinador.innerHTML = `<img src="../assets/img/pokemon/treinador/${change_treinador}.gif">`
      frase_evolution.innerHTML = `<img src="frases/padrao.png">`;
   }
}

//EEVEE ALEATORIO(Excluivo do eevee)
var evolucao_aleatoria = 0;
function eevee_aleatorio(){
   evolucao_aleatoria = Math.floor(Math.random() * (2 + 1) + 1);
}

//POKEMON ALEATORIO(Excluivo do DITTO)
function pokemon_aleatorio() {
   idPokemon = Math.floor(Math.random() * (12 + 1) + 1);
}

