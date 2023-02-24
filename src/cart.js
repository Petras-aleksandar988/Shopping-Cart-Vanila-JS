let label = document.querySelector("#label");
let shoppingCart = document.querySelector("#shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculation() {
  let calc = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  console.log(calc);
  document.querySelector("#cartAmount").innerHTML = calc;
}
calculation();

function generateCartItems() {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        const { id, item } = x;
          let search = shopData.find((x) => x.id === id);
          let {img,price,name}= search
        return `
            <div class="cartItem">
              <img width ="100" src="${img}" alt="" />
              <div class="details">
               <div class="title-price-x">
                 <h4>
                   <p>${name}</p>
                   <p class="cart-item-price" >$ ${price}</p>
                 </h4>
                 
                  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
               </div>
             <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id="${id}" class="quantity">
                ${item}</div>
                <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>

         </div>
               <h3>$ ${item * search.price}</h3>
             </div>
            </div>
          `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
        <h2>Cart is Emty</h2>
        <a href="index.html">
        <button class="homeBtn" >Back to Home</button></a>
        `;
  }
}
generateCartItems();

function decrement(id) {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
}

function increment(id) {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
}
function update(id) {
  let search = basket.find((x) => x.id === id);
  document.querySelector(`#${id}`).innerHTML = search.item;
  calculation();
  totalAmount();
}

function removeItem(id) {
  let selectedId = id.id;
  basket = basket.filter((x) => x.id !== selectedId);
  generateCartItems();
  calculation();

  totalAmount();

  localStorage.setItem("data", JSON.stringify(basket));
}
function clearCart() {
  basket = [];
  generateCartItems();
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
}
function totalAmount() {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        const { id, item } = x;
        let search = shopData.find((x) => x.id === id);
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    console.log(amount);
    label.innerHTML = `
        <h3>Total Bill:$ ${amount} </h3>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="clearAll">Clear All</button>
        `;
  } else return;
}
totalAmount();
