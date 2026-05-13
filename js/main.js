const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
// funçoes para pegar os dados da API, usando o async/await para esperar a resposta da API e retornar os dados em formato JSON

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
// variáveis para selecionar os elementos do formulário e do campo de entrada, para que possamos obter o valor digitado pelo usuário e enviar a requisição para a API

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
// variáveis para selecionar os botões de navegação, para que possamos adicionar eventos de clique e navegar entre os Pokémon usando os botões "Anterior" e "Próximo"


let searchPokemon = 1;
// variável para armazenar o número do Pokémon pesquisado, iniciando com 1 (Bulbasaur)

const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // função assíncrona para buscar os dados do Pokémon na API, usando o método fetch para fazer a requisição e aguardando a resposta com await

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
        // verifica se a resposta da API foi bem-sucedida (status 200) e, em caso afirmativo, converte a resposta para JSON e retorna os dados do Pokémon
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchpokemon(pokemon);
    // função assíncrona para renderizar os dados do Pokémon na página, exibindo "Carregando..." enquanto aguarda a resposta da API e, em seguida, atualizando o nome, número e imagem do Pokémon com os dados retornados pela função fetchpokemon

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
        // se os dados do Pokémon forem encontrados (data for verdadeiro), exibe a imagem, atualiza o nome, número e imagem do Pokémon com os dados retornados pela API, limpa o campo de entrada e atualiza a variável searchPokemon com o número do Pokémon encontrado
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'ainda não encontrado :(';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = '';
        // se os dados do Pokémon não forem encontrados (data for falso), oculta a imagem, exibe uma mensagem de erro e limpa o número e a imagem do Pokémon
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    // adiciona um evento de envio ao formulário, impedindo o comportamento padrão de recarregar a página, e chama a função renderPokemon com o valor digitado pelo usuário convertido para maiúsculas, para buscar e exibir os dados do Pokémon correspondente
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    // adiciona um evento de clique ao botão "Anterior", verificando se o número do Pokémon atual é maior que 1 (para evitar números negativos ou zero), e, em caso afirmativo, decrementa o número do Pokémon e chama a função renderPokemon para exibir os dados do Pokémon anterior
}
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    // adiciona um evento de clique ao botão "Próximo", incrementando o número do Pokémon e chamando a função renderPokemon para exibir os dados do próximo Pokémon
});

renderPokemon(searchPokemon);