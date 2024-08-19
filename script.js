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

var productGrid = document.getElementById('prodgrid');

setTimeout(() => {
    initialParse(productList);
}, 50);

function initialParse(data, passthrough) {
    var adjustedData = (Object.entries(data)[0][1]);
    var filtered1 = limitInsert(adjustedData, passthrough)
    console.log(filtered1);

    var filtered2 = Object.entries(filtered1)
    console.log(filtered2);

    prodgrid.innerHTML = '';
    for (let i = 0; i < filtered2.length; i++){
        var product = Object.entries(filtered2[i][1]);
        
        var imgSrc = product[1][1];
        var title = product[2][1];
        var stock = product[3][1];
        var price = product[4][1];

        prodgrid.insertAdjacentHTML('beforeend', `
            <div class="product">
                <img src="${imgSrc}" alt="">
                <h2>${title}</h2>
                <h4>${stock} in stock</h4>
                <h4>$${price}</h4>
            `)
    };
};

var limitInsertI = 1;

function limitInsert(array, highOrLow) {
    var limit = 40;
    var highest = Math.ceil(array.length / limit);
    var lowest = 1;

    if (limitInsertI < lowest) {
        limitInsertI = highest;
    };
    if (limitInsertI > highest) {
        limitInsertI = lowest;
    };

    if (highOrLow === 'first') {
        limitInsertI = lowest;
    };

    if (highOrLow === 'last') {3
        limitInsertI = highest;
    };

    return array.slice((limitInsertI - 1) * limit, limitInsertI * limit);

    console.log(limitInsertI);
};

document.getElementById('firstpage').addEventListener('click', function() {
    initialParse(productList, 'first');
});

document.getElementById('prev').addEventListener('click', function() {
    limitInsertI--;;
    initialParse(productList);
});

document.getElementById('next').addEventListener('click', function() {
    limitInsertI++;
    initialParse(productList);
});

document.getElementById('lastpage').addEventListener('click', function() {
    initialParse(productList, 'last');
});