const cartLocalStorage = window.localStorage.getItem('cart');
const cart = JSON.parse(cartLocalStorage);
const positionCart = document.getElementById('cart__items');
let totalQuantity = cart.length;
let Totalprice = 0;

fetch("http://localhost:3000/api/products")
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {
      for ( product of cart) {

        let api = data.find(cart => cart._id === product.id);

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
      
        Totalprice = Totalprice + (product.quantity * api.price);
        
      }        

      document.getElementById('totalQuantity').innerText = totalQuantity;
      document.getElementById('totalPrice').innerText = Totalprice;

    })
    
    .catch(function(error) {
    console.log('Fetch Error:', error);
    });