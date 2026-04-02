let personagensAPI = [];

// 🔥 personagens fixos (garantidos)
const personagensFixos = [
  {
    name: "Monkey D. Luffy",
    role: "Capitão",
    image: "https://cdn.myanimelist.net/images/characters/9/310307.jpg"
  },
  {
    name: "Roronoa Zoro",
    role: "Espadachim",
    image: "https://cdn.myanimelist.net/images/characters/3/326705.jpg"
  },
  {
    name: "Nami",
    role: "Navegadora",
    image: "https://cdn.myanimelist.net/images/characters/6/325058.jpg"
  },
  {
    name: "Sanji",
    role: "Cozinheiro",
    image: "https://cdn.myanimelist.net/images/characters/5/326706.jpg"
  },
  {
    name: "Trafalgar Law",
    role: "Capitão (Heart Pirates)",
    image: "https://cdn.myanimelist.net/images/characters/17/326714.jpg"
  },
  {
    name: "Shanks",
    role: "Yonkou",
    image: "https://cdn.myanimelist.net/images/characters/15/326712.jpg"
  },
  {
    name: "Portgas D. Ace",
    role: "Whitebeard Pirates",
    image: "https://cdn.myanimelist.net/images/characters/8/328551.jpg"
  }
];

async function carregarPersonagens() {
  if (personagensAPI.length > 0) return personagensAPI;

  try {
    let todos = [];

    // busca da API (One Piece = ID 21)
    for (let page = 1; page <= 3; page++) {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/21/characters?page=${page}`
      );

      if (!response.ok) throw new Error("Erro API");

      const data = await response.json();

      const lista = data.data.map(item => ({
        name: item.character.name,
        image: item.character.images.jpg.image_url,
        role: item.role
      }));

      todos = [...todos, ...lista];
    }

    // 🔥 junta API + fixos
    personagensAPI = [...personagensFixos, ...todos];

    return personagensAPI;

  } catch (error) {
    console.warn("Erro API, usando apenas fixos");
    return personagensFixos;
  }
}

async function sortearPersonagem() {
  try {
    const lista = await carregarPersonagens();

    const randomIndex = Math.floor(Math.random() * lista.length);
    const personagem = lista[randomIndex];

    document.getElementById("nome").innerText = personagem.name;
    document.getElementById("crew").innerText = personagem.role;
    document.getElementById("imagem").src = personagem.image;

    document.getElementById("card").classList.remove("hidden");

  } catch (error) {
    alert("Erro ao sortear personagem 😢");
    console.error(error);
  }
}