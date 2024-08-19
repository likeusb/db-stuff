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
    filterItems(productList);
}, 50);

var adjustedData = '';

function initialParse(data, passthrough) {
    adjustedData = data;
    var filtered1 = limitInsert(adjustedData, passthrough)

    prodgrid.innerHTML = '';
    for (let i = 0; i < filtered1.length; i++){
        var product = Object.entries(filtered1[i]);
        
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

    if (pageToSet == '') {
        pageToSet = limitInsertI;
    }
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
    filterItems(productList, 'first');
});

document.getElementById('prev').addEventListener('click', function() {
    limitInsertI--;;
    filterItems(productList);
});

document.getElementById('next').addEventListener('click', function() {
    limitInsertI++;
    filterItems(productList);
});

document.getElementById('lastpage').addEventListener('click', function() {
    filterItems(productList, 'last');
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

    filterItems(productList, num)
};

var productsForPushing = [];
var productsForComparison = [];
var sort = document.getElementById('sort')

function filterItems(data, passthrough) {
    var productsArrayified = Object.entries(Object.entries(data)[0][1]);
    var test4 = [];
    test3 = [];

    if (productsForComparison.length == productsArrayified.length) {
        
    } else {

        for (let i = 0; i < productsArrayified.length; i++) {
            var test1 = Object.entries(productsArrayified[i][1]);
            let test2 = {};
            test2[test1[0][0]] = test1[0][1];
            test2[test1[1][0]] = test1[1][1];
            test2[test1[2][0]] = test1[2][1];
            test2[test1[3][0]] = test1[3][1];
            test2[test1[4][0]] = test1[4][1];
            test3 = [test2];
            test4.push(test3);
        }
        
        for (let i = 0; i < test4.length; i++) {
            productsForComparison.push(test4[i][0]);
        }
    }

    if (sort.value == 'Priceas') {
        productsForComparison.sort((a, b) => a.Price - b.Price);
    } else {
        productsForComparison.sort((a, b) => b.Price - a.Price);
    }
    
    initialParse(productsForComparison, passthrough)
}

// I am aware that this is inefficient and a waste of code, however, if I dare to make it be as simple as ('click', filterItems(productList)), it breaks and I have not one clue why. I'll just keep it like this for now, I guess.
setTimeout(() => {
    sort.addEventListener('change', () => {
        filterItems(productList);
    });
}, 50);