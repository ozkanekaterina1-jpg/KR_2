function extractNumbers(str) {
    return str
        .match(/\d/g)
        .map(Number);
}
console.log(extractNumbers("a1fg5hj6"));



function fibonacci(a = 0, b = 1) {
    console.log(a);

    if (a >= 144) {
        return;
    }
    setTimeout(() => {
        fibonacci(b, a + b);
    }, 1000);
}
fibonacci();

const colors = document.querySelector("#colors");

colors.addEventListener("click", (event) => {

    if (event.target.tagName === "BUTTON") {
        document.body.style.backgroundColor = event.target.textContent;
    }
});


const menuButton = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const menuLinks = document.querySelectorAll("#menu a");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("open");
});

menu.addEventListener("click", (event) => {

    if (event.target.tagName === "A") {
        menuLinks.forEach(link => {
            link.classList.remove("active");
        });
        event.target.classList.add("active");
    }
});


const counter = document.querySelector("#counter");

let number = 0;

const counterInterval = setInterval(() => {
     number++;
     counter.textContent = number;
     if (number >= 100) {
         clearInterval(counterInterval);
     }
}, 1);

const productsContainer = document.querySelector("#products");

async function loadProducts() {

    try {
        const response = await fetch("./products.json");
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`
            );
        }
        const products = await response.json();
        const availableProducts = products.filter(
            product => product.inStock === true
        );
        availableProducts.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML =
                `<h3>${product.name}</h3>
                <p>Цена: ${product.price}</p>`;
            productsContainer.append(card);
        });
    } catch (error) {
        console.error("Ошибка", error);
        productsContainer.textContent = "Не удалось загрузить товары";
    }
}
loadProducts();


const loadButton = document.querySelector("#loadButton");
const searchInput = document.querySelector("#searchInput");
const apiProducts = document.querySelector("#apiProducts");

let allProducts = [];
async function loadApiProducts() {

    try {
        apiProducts.textContent = "Загрузка...";
        const response = await fetch(
            "https://fakestoreapi.com/products"
        );
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`
            );
        }
        allProducts = await response.json();
        renderProducts(allProducts);
    } catch (error) {
        console.error("Ошибка:", error);
        apiProducts.textContent = "Не удалось загрузить товары";
    }
}
function renderProducts(products) {
    apiProducts.innerHTML = "";

    if (products.length === 0) {
        apiProducts.textContent = "Товары не найдены";
        return;
    }
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("api-product");
        card.innerHTML =
            `<h3>${product.title}</h3>
            <p>Цена: $${product.price}</p>
            <p>Рейтинг: ${product.rating.rate}</p>`;
        apiProducts.append(card);
    });
}
loadButton.addEventListener("click", () => {
    loadApiProducts();
});

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => {
        return product.title
            .toLowerCase()
            .includes(searchText);
    });
    renderProducts(filteredProducts);
});











