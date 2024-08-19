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

var adjustedData = '';

function initialParse(data, passthrough) {
    adjustedData = (Object.entries(data)[0][1]);
    var filtered1 = limitInsert(adjustedData, passthrough)

    var filtered2 = Object.entries(filtered1)
    // console.log(filtered2);

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
var pageInput = document.getElementById('page');

function limitInsert(array, receiver) {
    var limit = 40;
    var highest = Math.ceil(array.length / limit);
    var lowest = 1;

    if (limitInsertI < lowest) {
        limitInsertI = highest;
    };
    if (limitInsertI > highest) {
        limitInsertI = lowest;
    };

    if (receiver === 'first') {
        limitInsertI = lowest;
    };

    if (receiver === 'last') {3
        limitInsertI = highest;
    };

    let pageToSet = '';
    const numRegex = new RegExp(/[0-9]/g);

    if (numRegex.test(receiver) == true) {
        pageToSet = receiver;
        limitInsertI = receiver;
    }

    // console.log(limitInsertI, pageToSet, receiver);

    pageInput.value = pageToSet;
    
    var atob = document.getElementById('atob');
    var total = document.getElementById('total');

    atob.innerHTML = "";
    total.innerHTML = "";

    var lowestInPage = '';
    var highestInPage = '';

    if (limitInsertI == 1) {
        lowestInPage = 1;
    } else if (limitInsertI != 1) {
        lowestInPage = 1 + limit * (limitInsertI - 1);
    }

    if (limitInsertI == highest) {
        highestInPage = array.length;
    } else if (limitInsertI != highest) {
        highestInPage = limit * limitInsertI; 
    }

    atob.insertAdjacentHTML('beforeend', lowestInPage+'-'+highestInPage);
    total.insertAdjacentHTML('beforeend', array.length+',');

    return array.slice((limitInsertI - 1) * limit, limitInsertI * limit);
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

pageInput.addEventListener('keyup', function() {
    cleanInput(pageInput.value);
});

function cleanInput(toClean) {
    const cleaner = new RegExp(/[0-9]/g);
    var cleaned = toClean.match(cleaner).join('');
    updatePage(cleaned);
};  

function updatePage(num) {
    let array = adjustedData;
    var limit = 40;
    var highest = Math.ceil(array.length / limit);
    var lowest = 1;

    if (num == null) {
        return
    };

    if (num < lowest) {
        num = lowest;
    }

    if (num > highest) {
        num = highest;
    }

    initialParse(productList, num)
};

const items = [
    [
        {name: 'item1', price: 100},
    ],
    [
        {name: 'item2', price: 200},
    ],
    [
        {name: 'item3', price: 50},
    ]
];

var itemsForComparison = [];

console.log(items)
for (let i = 0; i < items.length; i++) {
    // console.log(items[i][0]);
    itemsForComparison.push(items[i][0]);
}

itemsForComparison.sort((a, b) => a.price - b.price);

// console.log(itemsForComparison);

var productsForComparison = [];

setTimeout(() => {
    var adapted = (Object.entries(productList)[0][1])

    adapted.sort((a, b) => a.price - b.price);

    // console.log(adapted);
}, 100);