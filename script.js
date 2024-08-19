var productList = [];

fetch('http://localhost:1337/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        productList = products;
    })
    .catch(error => {
        console.error('Error:', error);
    })

var products = [];

setTimeout(() => {
    products = (Object.entries(productList)[0][1]);
}, 50);

setTimeout(() => {
    console.log(products);
}, 50);