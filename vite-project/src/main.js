import { renderPokemon, renderError, renderSuccess } from "./dom-helpers";
import { getRandomPokemon } from "./fetch-helpers";

const success = document.getElementById('success');
const error = document.getElementById('error');
const discoverBtn = document.getElementById('discover-button');

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