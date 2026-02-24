import { renderPokemon, renderError, renderSuccess } from "./dom-helpers";
import { getRandomPokemon, postDiscoveredPokemon } from "./fetch-helpers";

const success = document.getElementById('success');
const error = document.getElementById('error');
const discoverBtn = document.getElementById('discover-button');
const form = document.getElementById('form');

const getAndRenderPokemon = async() => {
    const data = await getRandomPokemon();
    if (data.error != null) {
        success.textContent = '';
        renderError(data.error);
    } else {
        renderPokemon(data);
        success.textContent = `${data.data.name} was discovered!`
        error.textContent = '';
    }
}

discoverBtn.addEventListener('click', async () => {
    getAndRenderPokemon();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.elements.name.value;
    const types = form.elements.types.value;
    const favorite = form.elements.favorite.checked;
    const formValues = { name, types, favorite };
    const data = await postDiscoveredPokemon(formValues);
    if (data.error != null) {
        success.textContent = '';
        renderError("Error: unable to capture Pokémon. Please try again later");
    } else {
        renderSuccess(`${name} was caught!`)
        error.textContent = '';
    }
})

getAndRenderPokemon()