// Se inicia con un carrito vacio
let cart = [];


//FUNCIONALIDAD 1.

// Actualiza lo que aparece en el carrito cada vez que se hace un cambio
function updateCart() {
  //Trae todos los elementos del carrito
  const cartContainer = document.querySelector(".shopping-cart .items");
  cartContainer.innerHTML = "";

  //Crea un div por cada elemento del carrito, trae su información y lo agrega al contenedor de items en el carrito para mostrarlo en el HTML
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${item.price}</p>
                <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
            </div>`;
    cartContainer.appendChild(cartItem);
  });
  console.log(cartContainer);

  // Recalcula el precio total cada vez que se agrega un item
  const precioTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); //total anterior + precio del item agregado * cantidad del item agregado
  //Muestra el precio total en el footer del carrito
  document.querySelector(".cart-footer .total span").textContent = precioTotal;
}

// Agrega un item al carrito con la información del botón en el evento click
function addToCart(item) {
  //Busca si el item ya está en el carrito
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Si el item no esta en el carrito, lo agrega con la información del botón en el evento click
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  }

  updateCart();
}

// Vacía el arreglo del carrito cart y actualiza la info. con updateCart()
function emptyCart() {
  cart = [];
  updateCart();
}

// Event listeners para el botón "Add to Cart"
// Recorre todos los botones con la clase "add-to-cart" y les agrega un evento click
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //Busca el elemento padre del botón que es el contenedor del juego
    const gameAttribute = button.closest(".games");
    //Crea un objeto con la información del juego y extrae toda su info. de los atributos "data-" del HTML
    const item = {
      id: gameAttribute.dataset.id,
      name: gameAttribute.dataset.name,
      price: parseFloat(gameAttribute.dataset.price),
      image: gameAttribute.dataset.image,
    };
    addToCart(item);
  });
});

// Event listener para "Empty Cart". Llama a la función emptyCart() cuando se hace click en el botón de clase "empty-cart" en HTML
document.querySelector(".empty-cart").addEventListener("click", emptyCart);



//FUNCIONALIDAD 2.

// Event listener para el formulario de agregar un nuevo juego al presionar el boton tipo submit
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  //Obtiene la información ingresada del formulario
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;
  const publisher = document.getElementById("publisher").value;

  // Validación del precio del juego
  if (price < 1000) {
    alert("El precio debe ser mayor o igual a 1000.");
    return;
  }

  // Crea un nuevo juego con la información ingresada y lo agrega al HTML con la misma estructura que los juegos ya existentes
  // Se le asigna un nuevo id al juego con respecto a la cantidad de juegos ya existentes con .length + 1
  const newId = document.querySelectorAll(".games").length + 1;
  const newGame = `
    <div class="games" data-id="${newId}" data-name="${name}" data-price="${price}" data-image="${image}">
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
      <div class="attributes">
        <p><strong>Precio:</strong> $${price}</p>
        <p><strong>Género:</strong> ${genre}</p>
        <p><strong>Año de Publicación:</strong> ${year}</p>
        <p><strong>Publicador:</strong> ${publisher}</p>
      </div>
      <button class="add-to-cart">Agregar al Carrito</button>
    </div>
  `;

  // Agrega el nuevo juego al HTML a la sección con la clase "shop-content" con insertAdjacentHTML al final
  document.querySelector(".shop-content").insertAdjacentHTML("beforeend", newGame);


  // Event listener para el botón "Add to Cart" del nuevo juego. No se llama en una funcion al event listener anterior porque el juego no existía al momento de cargar la página
  // tambien para no recorrer todos los juegos cada vez que se agrega uno nuevo
  document.querySelector(`.games[data-id="${newId}"] .add-to-cart`).addEventListener("click", function () {
      const gameAttribute = this.closest(".games");
      const item = {
        id: gameAttribute.dataset.id,
        name: gameElemgameAttributeent.dataset.name,
        price: parseFloat(gameAttribute.dataset.price),
        image: gameAttribute.dataset.image,
      };
      addToCart(item);
    });

  // Resetea el formulario después de presionar el botón de submit, después de agregar un nuevo juego exitosamente 
  document.getElementById("form").reset();
});
