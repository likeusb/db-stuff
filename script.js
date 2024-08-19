var productList = [];

fetch('http://localhost:1337/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        productList = products.products;
    })
    .catch(error => {
        console.error('Error:', error);
    })

console.log(productList);