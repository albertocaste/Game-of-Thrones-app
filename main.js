const characterContainer = document.querySelector(".character-container");
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

//PAGINACIÓN
let offset = 0;
let limit = 8;

previous.addEventListener('click', () => {
  if (offset != 0) {
    offset -= 9;
    removeChildCharacters(characterContainer);
    fetchCharacters(offset, limit);
  }
})

next.addEventListener('click', () => {
  if (offset < 53) {
    offset += 9;
    removeChildCharacters(characterContainer);
    fetchCharacters(offset, limit);
  }
})

//traigo url API
function fetchCharacter(id) {
  fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
    .then((res) => res.json())
    .then((data) => {
      createCharacter(data);
    });
}


//traigo los primeros characters con bucle// paginación offset,limit
function fetchCharacters(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchCharacter(i);
  }
}

//creo función con la carta que contiene la info del Character
function createCharacter(character) {
  const card = document.createElement("div");
  //agrego clase a la carta
  card.classList.add("character-block");
  //creo el contenedor de la imagen con su clase
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  //creo la imagen
  const img = document.createElement("img");
  img.src = character.imageUrl;
  img.classList.add("img-character");
  //hago hija a la imagen del contenerdor de la imagen
  imgContainer.appendChild(img);
  //creo el número del personaje en un p y agrego texto
  const number = document.createElement("p");
  number.textContent = `${character.id}`;
  //creo el nombre del character en un p con su clase y texto
  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = character.fullName;
  //añado todos los elementos de info a la carta creada
  card.appendChild(imgContainer);
  card.appendChild(number);
  card.appendChild(name);
  //agrego toda la carta con contenido al contenedor del personaje
  characterContainer.appendChild(card);
}

//Función para cambiar de página sin que se añadan personajes anteriores
function removeChildCharacters(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//llamo a la función con bucle para que me traiga los 10 primeros characters
fetchCharacters(offset, limit);

