fetch("http://localhost:3000/api/products")
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    
    .then(function(data) {
        // console.log(data[0]._id)
        // document.getElementById('items').innerHTML = '<a href="./product.html?id=' + data[0]._id + '">'
    
        for (let article of data) {
    
            var ProductLink = document.createElement("a");
            document.getElementById('items').appendChild(ProductLink);
            ProductLink.href = "./product.html?id=" + article._id;
    
            var ProductArticle = document.createElement("article");
            ProductLink.appendChild(ProductArticle);
    
            var ProductImg = document.createElement("img");
            ProductArticle.appendChild(ProductImg);
            ProductImg.src = article.imageUrl;
            ProductImg.alt = article.altTxt;
    
            var ProductTitle = document.createElement("h3");
             ProductArticle.appendChild(ProductTitle);
            ProductTitle.innerHTML = article.name;
    
            var ProductDescr = document.createElement("p");
            ProductArticle.appendChild(ProductDescr);
            ProductDescr.innerHTML = article.description;
                    
        }
     })
    
    .catch(function(error) {
    console.log('Fetch Error:', error);
    });
