import { fetchPoke, getRandomPokemon } from "./fetch-helpers";

const discoverUl = document.getElementById('discovered-list');
const error = document.getElementById('error')
const success = document.getElementById('success')

export const renderPokemon = async(pokemonObj) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = pokemonObj.data.sprite;
    li.appendChild(img);
    const name = document.createElement('p');
    name.textContent = pokemonObj.data.name;
    const type = document.createElement('p');
    type.textContent = pokemonObj.data.type;
    li.appendChild(name);
    li.appendChild(type);
    discoverUl.prepend(li);
}

export const renderError = (msg) => {
    error.textContent = msg;
}

export const renderSuccess = (msg) => {
    success.textContent = msg;
}

    // discoverBtn.addEventListener('click', async () => {
    //     const data = await getRandomPokemon();
    //     const li = document.createElement('li');
    //     const img = document.createElement('img');
    //     img.src = data.data.sprite;
    //     li.appendChild(img);
    //     const name = document.createElement('p');
    //     name.textContent = data.data.name;
    //     const type = document.createElement('p');
    //     type.textContent = data.data.type;
    //     li.appendChild(name);
    //     li.appendChild(type);
    //     recentDiscover.textContent = `${data.data.name} was discovered`;
    //     discoverUl.prepend(li);
    // })

// const pokeInput = document.getElementById('pokemon-input');
// const pokeButton = document.getElementById('poke-button');
// const pokemon = document.getElementById('pokemon')

// pokeButton.addEventListener('click', async () => {
//     const data = await fetchPoke(pokeInput.value);
//     pokemon.innerHTML = '';
//     const img = document.createElement('img');
//     img.src = data.data.sprite;
//     const name = document.createElement('p');
//     name.textContent = data.data.name;
//     const type = document.createElement('p');
//     type.textContent = data.data.type;
//     pokemon.appendChild(img)
//     pokemon.appendChild(name);
//     pokemon.appendChild(type);
//     pokeInput.value='';
// })