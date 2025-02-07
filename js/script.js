// Se inicia con un carrito vacio
let cart = [];

// Actualiza lo que aparece en el carrito cada vez que se hace un cambio
function updateCart() {
  //Trae todos los elementos del carrito
  const cartItemsContainer = document.querySelector(".shopping-cart .items");
  cartItemsContainer.innerHTML = "";

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
    cartItemsContainer.appendChild(cartItem);
  });
  console.log(cartItemsContainer);

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
    const gameElement = button.closest(".games");
    //Crea un objeto con la información del juego y extrae toda su info. de los atributos "data-" del HTML
    const item = {
      id: gameElement.dataset.id,
      name: gameElement.dataset.name,
      price: parseFloat(gameElement.dataset.price),
      image: gameElement.dataset.image,
    };
    addToCart(item);
  });
});

// Event listener para "Empty Cart". Llama a la función emptyCart() cuando se hace click en el botón de clase "empty-cart" en HTML
document.querySelector(".empty-cart").addEventListener("click", emptyCart);







