const str = document.location.href;
const url = new URL(str);
const idUrl = url.searchParams.get("id");

function getProduct(idUrl) {
    fetch("http://localhost:3000/api/products/"+idUrl)
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {

        const ProductImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(ProductImg);
        ProductImg.src = data.imageUrl; 
        
        document.getElementById('title').innerText = data.name;

        document.getElementById('price').innerText = data.price + " ";

        document.getElementById('description').innerText = data.description;

        for (let colors of data.colors) {
            const optionColors = document.createElement("option");
            document.getElementById('colors').appendChild(optionColors);
            optionColors.value = colors;
            optionColors.text = colors;
        }

        addToCart();

     })
    
    .catch(function(error) {
    console.error('Fetch Error:', error);
    });
}

function addToCart () {

        const quantity = document.getElementById('quantity').value;
        const  colors = document.getElementById("colors").value;

        if (quantity > 0 && quantity <=100 && colors !== "") {
            let cart = [];
            let checkLocalStorage  = window.localStorage.getItem("cart");
            if(checkLocalStorage) {
                cart = JSON.parse(checkLocalStorage);
            }

            let checkCart = cart.find(cart => cart.id === idUrl && cart.color === colors);

            if (checkCart) {
                checkCart.quantity = parseInt(checkCart.quantity,10) + parseInt(quantity,10);
            }   else {
                cart.push({id: idUrl, quantity: quantity, color: colors,});
            }
            window.localStorage.setItem('cart',JSON.stringify(cart));
        };
}
getProduct(idUrl);
document.getElementById('addToCart').addEventListener('click', addToCart);
