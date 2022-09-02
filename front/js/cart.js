const cartLocalStorage = window.localStorage.getItem('cart');
let cart = JSON.parse(cartLocalStorage);
const positionCart = document.getElementById('cart__items');
let totalQuantity = cart.length;
let Totalprice = 0;
let RegEx = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$");
let cityRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");
let emailRegExp = new RegExp('^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$');
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");

function getCartProduct() {
  fetch("http://localhost:3000/api/products")
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {
      for ( product of cart) {

        const api = data.find(cart => cart._id === product.id);
        
        const cartArticle = document.createElement('article');
        positionCart.appendChild(cartArticle);
        cartArticle.classList.add('cart__item');
        cartArticle.setAttribute('data-id',product.id);
        cartArticle.setAttribute('data-color',product.color);
      
        const cartDivImg = document.createElement('div');
        cartArticle.appendChild(cartDivImg);
        cartDivImg.classList.add('cart__item__img');
      
        const cartImg = document.createElement('img');
        cartDivImg.appendChild(cartImg);
        cartImg.src = api.imageUrl;
        cartImg.alt = api.altTxt;

        const cartDivContent = document.createElement('div');
        cartArticle.appendChild(cartDivContent);
        cartDivContent.classList.add('cart__item__content');

        const cartDivContentDescr = document.createElement('div');
        cartDivContent.appendChild(cartDivContentDescr);
        cartDivContentDescr.classList.add('cart__item__content__description');

        const cartTitle = document.createElement('h2');
        cartDivContentDescr.appendChild(cartTitle);
        cartTitle.innerText = api.name;

        const cartColor = document.createElement('p');
        cartDivContentDescr.appendChild(cartColor);
        cartColor.innerText = product.color;

        const cartPrice = document.createElement('p');
        cartDivContentDescr.appendChild(cartPrice);
        cartPrice.innerText = api.price+' €';

        const cartDivSettings = document.createElement('div');
        cartDivContent.appendChild(cartDivSettings);
        cartDivSettings.classList.add('cart__item__content__settings');

        const cartDivSettingsQuantity = document.createElement('div');
        cartDivSettings.appendChild(cartDivSettingsQuantity);
        cartDivSettingsQuantity.classList.add('cart__item__content__settings__quantity');

        const cartQuantity = document.createElement('p');
        cartDivSettingsQuantity.appendChild(cartQuantity);
        cartQuantity.innerText = 'Qté : ';

        const cartInput = document.createElement('input');
        cartDivSettingsQuantity.appendChild(cartInput);
        cartInput.type = "number";
        cartInput.classList.add('itemQuantity');
        cartInput.name = "itemQuantity";
        cartInput.min = "1";
        cartInput.max = "100";
        cartInput.setAttribute('value',product.quantity);

        const cartDivSettingsDelete = document.createElement('div');
        cartDivSettings.appendChild(cartDivSettingsDelete);
        cartDivSettingsDelete.classList.add('cart__item__content__settings__delete');

        const cartDelete = document.createElement('p');
        cartDivSettingsDelete.appendChild(cartDelete);
        cartDelete.classList.add('deleteItem');
        cartDelete.innerText = "Supprimer";

        calcTotalPrice(api);
        quantityChange(api);
        deleteItem(api);
      }        

      document.getElementById('totalQuantity').innerText = totalQuantity;
    })

    .catch(function(error) {
    console.error('Fetch Error:', error);
    });
}

function calcTotalPrice(api,index,value) {
  if ( value > index) {
    Totalprice = Totalprice + (value * api.price) - ( index * api.price);
  } else if ( value < index ) {
    Totalprice = Totalprice - ((index - value) * api.price);
  } else if ( value === 0) {
    Totalprice = Totalprice - ( index * api.price)
  } else {
    Totalprice = Totalprice + (product.quantity * api.price);
  }
  document.getElementById('totalPrice').innerText = Totalprice;
};

function quantityChange(api) {
  const checkQuantity = document.querySelectorAll('.itemQuantity');
  checkQuantity.forEach((target) => {
    let article = target.closest('article');
    let id = article.dataset.id;
    let color = article.dataset.color;
    target.addEventListener('change', () => {
      let index = cart.find(cart => cart.id === id && cart.color === color);
      if ( target.value > 0 && target.value !== index.quantity) {
        if ( target.value > index.quantity) {
          calcTotalPrice(api,index.quantity,target.value);
        } else if (target.value < index.quantity) {
          calcTotalPrice(api,index.quantity,target.value);
        };
        index.quantity = target.value;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else  if (target.value <= 0 ){
        alert('Veuillez entrer une valeur supérieur à 0 ou cliquez sur le boutton supprimer afin de le retirer du panier');
      }
    });
  })
};

function deleteItem(api) {
  const supprimer = document.querySelectorAll('.deleteItem');
  supprimer.forEach((target) => {
    let article = target.closest('article');
    let id = article.dataset.id;
    let color = article.dataset.color; 
    target.addEventListener('click', () => {
      let index = cart.find(cart => cart.id === id && cart.color === color);
      cart = cart.filter(cart => cart.id !== id || cart.color !== color );
      localStorage.setItem("cart", JSON.stringify(cart));
      calcTotalPrice(api,index.quantity,0);
      totalQuantity = cart.length;
      document.getElementById('totalQuantity').innerText = totalQuantity;
      article.remove();
    });
  });
}

function validFirstName (inputFirstName) {
  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  if ( RegEx.test(inputFirstName)) {
    firstNameErrorMsg.innerText = '';
    return true;
  } else {
    firstNameErrorMsg.innerText = 'Veuillez saisir un prénom sans espace';
    return false;
  }
}

function validLastName (inputLastName) {
  const firstNameErrorMsg = document.getElementById('lastNameErrorMsg');
  if ( RegEx.test(inputLastName)) {
    firstNameErrorMsg.innerText = '';
    return true;
  } else {
    firstNameErrorMsg.innerText = 'Veuillez saisir un nom sans espace';
    return false;
  }
}

function validAdress (inputAdress) {
  const firstNameErrorMsg = document.getElementById('addressErrorMsg');
  if ( addressRegExp.test(inputAdress)) {
    firstNameErrorMsg.innerText = '';
    return true;
  } else {
    firstNameErrorMsg.innerText = 'Veuillez saisir une adresse avec un numéro';
    return false;
  }
}

function validCity (inputCity) {
  const firstNameErrorMsg = document.getElementById('cityErrorMsg');
  if ( cityRegExp.test(inputCity)) {
    firstNameErrorMsg.innerText = '';
    return true;
  } else {
    firstNameErrorMsg.innerText= 'Veuillez saisir une ville sans chiffre ni caractères spéciaux';
    return false;
  }
}

function validEmail (inputEmail) {
  const firstNameErrorMsg = document.getElementById('emailErrorMsg');
  if ( emailRegExp.test(inputEmail)) {
    firstNameErrorMsg.innerText = '';
    return true;
  } else {
    firstNameErrorMsg.innerText = 'Veuillez saisir une adresse email valide';
    return false;
  }
}

function submitForm(event) {
  event.preventDefault();

  let inputFirstName = document.getElementById('firstName').value;
  let inputLastName = document.getElementById('lastName').value;
  let inputAdress = document.getElementById('address').value;
  let inputCity = document.getElementById('city').value;
  let inputEmail = document.getElementById('email').value;

  let firstName = validFirstName(inputFirstName);
  let lastName = validLastName(inputLastName);
  let address = validAdress(inputAdress);
  let city = validCity(inputCity);
  let email = validEmail(inputEmail);

  if ( cart == '')  {
    alert('Votre panier est vide');
  } else if (firstName && lastName && address && city && email){
    productId = cart.map(cart => cart.id);

    const order = {
    contact : {
      firstName: inputFirstName,
      lastName: inputLastName,
      address: inputAdress,
      city: inputCity,
      email: inputEmail
    },
    products: productId,
    }

    fetch('http://localhost:3000/api/products/order', {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(order)
    })
    .then(function(response){
      if (response.ok) {
          return response.json();
      }
    })
    .then(function(data) {
    console.log(data)
    localStorage.clear();
    document.location.href = `confirmation.html?id=${data.orderId}`;
    });

  }
}

getCartProduct();
const submit = document.getElementById("order");
submit.addEventListener("click", (event) => submitForm(event));