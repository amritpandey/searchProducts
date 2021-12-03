console.log('Script loaded');

const products = getAvailableProducts();

renderProducts(products);

// searching product by name

const search = document.querySelector('#searchProduct');
search.addEventListener('input', filterProducts);

// Search product by maximum price

const searchByPrice = document.querySelector('#searchByPrice');
searchByPrice.addEventListener('input', filterProducts);

// function to searching combining both inputs (name and maximum price)
function filterProducts() {
    const query = search.value;
    const maximumPrice = +searchByPrice.value; // adding + in front of the string to convert into integer
    const searchResults = products
        .filter(
            (product) =>
                query === '' ||
                product.name.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
        .filter(
            (product) => maximumPrice === 0 || product.price <= maximumPrice,
        );
    renderProducts(searchResults);
}

// sorting products by price(lowest to highest), rating and name
const productSorting = document.querySelector('#product-sorting');
productSorting.addEventListener('change', (event) => {
    const selected = event.target.value;
    
    switch (selected) {
        case 'price':
            const sortingByPrice = products.sort(function (
                leftItem,
                rightItem,
            ) {
                if (leftItem.price > rightItem.price) {
                    return 1;
                }
                if (leftItem.price < rightItem.price) {
                    return -1;
                }
                if (leftItem.price === rightItem.price) {
                    return 0;
                }
            });
            renderProducts(sortingByPrice);
            break;

        case 'rating':
            const sortingByRating = products.sort(function (
                leftItem,
                rightItem,
            ) {
                if (leftItem.rating > rightItem.rating) {
                    return 1;
                }
                if (leftItem.rating < rightItem.rating) {
                    return -1;
                }
                if (leftItem.rating === rightItem.rating) {
                    return 0;
                }
            });
            renderProducts(sortingByRating);
            break;
        case 'name':
            const sortingByName = products.sort(function (leftItem, rightItem) {
                if (leftItem.name > rightItem.name) {
                    return 1;
                }
                if (leftItem.name < rightItem.name) {
                    return -1;
                }
                if (leftItem.name === rightItem.name) {
                    return 0;
                }
            });
            renderProducts(sortingByName);
            break;

        default:
            break;
    }
});

function renderProducts(products) {
    // your code here
    const allProducts1 = document.querySelector('ul');
    allProducts1.innerHTML = '';

    for (const product of products) {
        const list = document.createElement('li');
        list.innerHTML = `<h2>${product.name}</h2> Rating: ${product.rating}</br> Price: ${product.price}`;
        allProducts1.appendChild(list);
    }
}
