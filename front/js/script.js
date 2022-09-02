function getApi() {
    fetch("http://localhost:3000/api/products")
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {
    
        for (let article of data) {
    
            const ProductLink = document.createElement("a");
            document.getElementById('items').appendChild(ProductLink);
            ProductLink.href = "./product.html?id=" + article._id;
    
            const ProductArticle = document.createElement("article");
            ProductLink.appendChild(ProductArticle);
    
            const ProductImg = document.createElement("img");
            ProductArticle.appendChild(ProductImg);
            ProductImg.src = article.imageUrl;
            ProductImg.alt = article.altTxt;
    
            const ProductTitle = document.createElement("h3");
             ProductArticle.appendChild(ProductTitle);
            ProductTitle.innerText = article.name;
    
            const ProductDescr = document.createElement("p");
            ProductArticle.appendChild(ProductDescr);
            ProductDescr.innerText = article.description;
                    
        }
     })
    
    .catch(function(error) {
    console.error('Fetch Error:', error);
    });
}

getApi();
