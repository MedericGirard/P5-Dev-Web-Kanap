var str = document.location.href;
var url = new URL(str);
var idUrl = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/"+idUrl)
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {

        var ProductImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(ProductImg);
        ProductImg.src = data.imageUrl; 
        
        document.getElementById('title').innerHTML = data.name;

        document.getElementById('price').innerHTML = data.price + " ";

        document.getElementById('description').innerHTML = data.description;

        for (let colors of data.colors) {
            var optionColors = document.createElement("option");
            document.getElementById('colors').appendChild(optionColors);
            optionColors.value = colors;
            optionColors.text = colors;
        }
     })
    
    .catch(function(error) {
    console.log('Fetch Error:', error);
    });