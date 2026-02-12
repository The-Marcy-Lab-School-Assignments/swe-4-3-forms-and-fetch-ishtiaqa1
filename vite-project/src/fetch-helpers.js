export const fetchPoke = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
            return {
                data: null,
                error: res.message
            }
        }
        const data = await res.json();
        return {
            data: {
            name: data.name,
            type: data.types.map((t) => t.type.name).join(', '),
            sprite: data.sprites.front_default
        },  error: null};
    } catch(err) {
        throw Error(err);
    }
}

const discovered = []

export const getRandomPokemon = async () => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150)}`);
        if (!res.ok) {
            throw Error('Failed fetch');
        }
        const data = await res.json();
        discovered.push(data.name);
        return {
            data: {
            name: data.name,
            type: data.types.map((t) => t.type.name).join(', '),
            sprite: data.sprites.front_default
        },  error: null};
    } catch(err) {
        return {
                data: null,
                error: err.message
            }
    }
}

export const postDiscoveredPokemon = async (formData) => {
    try {
        if(!discovered.includes(formData.name)) {
            throw Error('Pokemon not discovered!')
        }
        const config = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }
        const res = await fetch('https://formspree.io/f/mjgegzzb', config)
        if (!res.ok) {
            throw Error('Failed fetch');
        }
        return {
            data:res.json(),
            error:null
        }
    } catch(err) {
        return {
            data:null,
            error:err
        }
    }
}