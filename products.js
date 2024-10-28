let my_basket = {};
const images = [
    {
        src: "Photos/Photo-1.png",
        alt: 'Товар 1',
        description: 'Marlborough Sun Совіньйон Блан',
        price: '477 UAH',
    },
    {
        src: './Photos/Photo-2.png',
        alt: 'Товар 2',
        description: 'Cappo Каппо Москато',
        price: '190 UAH',
    },
    {
        src: './Photos/Photo-3.png',
        alt: 'Товар 3',
        description: 'Cesari Піно Гріджио делле Венеціе ',
        price: '325 UAH',
    },
    {
        src: './Photos/Photo-4.png',
        alt: 'Товар 4',
        description: 'Callia Мальбек',
        price: '353 UAH',
    },
    {
        src: './Photos/Photo-5.png',
        alt: 'Товар 5',
        description: 'Cappo Каппо Шираз',
        price: '190 UAH',
    },
    {
        src: './Photos/Photo-6.png',
        alt: 'Товар 6',
        description: 'Callia Піно Гріджио',
        price: '353 UAH',
    },
    {
        src: './Photos/Photo-7.png',
        alt: 'Товар 7',
        description: 'Marlborough Sun Совіньйон Розе',
        price: '477 UAH',
    },
    {
        src: './Photos/Photo-8.png',
        alt: 'Товар 8',
        description: 'Canti Піно Гріджіо Венето',
        price: '303 UAH',
    }
];

function addImageToContainer(image) {
    const imageCard = document.createElement("div");
    imageCard.classList.add("col-md-4", "mb-4");

    const imageCardBody = document.createElement("div");
    imageCardBody.classList.add("card", "h-100");

    const imageElement = document.createElement("img");
    imageElement.classList.add("card-img-top");
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const imageDescription = document.createElement("div");
    imageDescription.classList.add("card-body");

    const descriptionTitle = document.createElement("h5");
    descriptionTitle.classList.add("card-title");
    descriptionTitle.textContent = image.description;

    const descriptionPrice = document.createElement("p");
    descriptionPrice.classList.add("card-text");
    descriptionPrice.textContent = image.price;
    
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Додати в кошик";
    
    // Обробник події на клік для опису
    descriptionTitle.addEventListener('click', function () {
        descriptionPrice.classList.toggle('d-none');
    });
    
    // Обробник події на клік для зображення
    imageElement.addEventListener('click', function () {
        descriptionPrice.classList.toggle('d-none');
    });
    
    // Обробник події на клік для кнопки
    button.addEventListener('click', function () {
        const item = {
            src: image.src,
            alt: image.alt,
            description: image.description,
            price: image.price
        };
        my_basket[image.description] = item;
        alert('Товар успішно додано в кошик!');
    });
    
    // Додати зображення, опис та кнопку до картки товару
    imageCardBody.appendChild(imageElement);
    imageDescription.appendChild(descriptionTitle);
    imageDescription.appendChild(descriptionPrice);
    imageDescription.appendChild(button);
    imageCardBody.appendChild(imageDescription);
    imageCard.appendChild(imageCardBody);
    imageContainer.appendChild(imageCard);
    
    
}

const modal = new bootstrap.Modal(document.getElementById('basketModal'));
const imageContainer = document.getElementById('images-container');
const showGraphsButton = document.getElementById('show-graphs');
const chartTypeSelect = document.getElementById('chart-type-select');
const chartContainer = document.getElementById('chart-container');
let currentChart;
let pieChartData;
chartTypeSelect.addEventListener('change', function () {
    const selectedChartType = chartTypeSelect.value;
    pieChartData = generateChartData(my_basket);
    switch (selectedChartType) {
        case 'pie':
            renderPieChart(pieChartData);
            break;
        case 'bar':
            renderBarChart(pieChartData)
            break;
        case 'line':
            renderLineChart(pieChartData);
            break;
        default:
            break;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    

    // Додати перші три зображення до контейнера при завантаженні сторінки
    images.slice(0, 3).forEach(function (image) {
        addImageToContainer(image);
    });

    // Показати решту товарів при кліку на кнопку "Показати товари"
    const showImagesBtn = document.getElementById('show-images-btn');
    showImagesBtn.addEventListener('click', function () {
        // Додати решту зображень до контейнера
        images.slice(3).forEach(function (image) {
            addImageToContainer(image);
        });

        // Приховати кнопку "Показати товари"
        showImagesBtn.classList.add('d-none');
    });

    const sortByNameBtn = document.getElementById('sort-by-name');
    sortByNameBtn.addEventListener('click', sortByTitle);

    const sortByPriceBtn = document.getElementById('sort-by-price');
    sortByPriceBtn.addEventListener('click', sortByPrice);

    // Додати обробник події для іконки кошика
    const basketIcon = document.querySelector('.bi-bag');
    basketIcon.addEventListener('click', function () {
        // Отримати модальне вікно кошика
        // Відкрити модальне вікно кошика
        modal.show();
        renderBasketItems()
    });

    const checkoutButton = document.querySelector('.btn-primary');
    const graphModal = new bootstrap.Modal(document.getElementById('graphModal'));
    
    checkoutButton.addEventListener('click', function() {
        // Виведення повідомлення про успішне оформлення замовлення
        alert('Замовлення успішно сформовано!');

        // Очищення масиву кошика
        my_basket = {};
        renderBasketItems();

        // Закриття модального вікна кошика
        modal.hide();
    });
    
    showGraphsButton.addEventListener('click', function () {
    if (Object.keys(my_basket).length === 0) {
        alert("Ви ще не обрали жодного товару");
        return;
    } 
    
    pieChartData = generateChartData(my_basket); // Генеруємо дані для кругової діаграми
    renderPieChart(pieChartData); // Рендеримо кругову діаграму
    
    // Відображаємо модальне вікно
    graphModal.show();
});

// Додаємо обробник події для закриття модального вікна
graphModal.addEventListener('hidden.bs.modal', function () {
    // Знищуємо попередній графік перед закриттям модального вікна
    if (currentChart) {
        currentChart.destroy();
    }
});
});

function generateChartData(basketData) {
    const labels = [];
    const values = [];
    const colors = [];
    // Проходимося по кожному товару у кошику
    for (const itemName in basketData) {
        if (basketData.hasOwnProperty(itemName)) {
            const item = basketData[itemName];
            labels.push(itemName); // Додаємо назву товару в масив міток
            values.push(1); // Додаємо значення 1 для кожного товару
            // Генеруємо випадковий колір для товару
            const color = '#' + Math.floor(Math.random()*16777215).toString(16);
            colors.push(color); // Додаємо випадковий колір у масив кольорів
        }
    }
    // Повертаємо об'єкт зі згенерованими даними для кругової діаграми
    return { labels, values, colors };
}


// const chartContainer = document.getElementById('chart-container');
function renderPieChart(data) {
    // Знищення попереднього графіка перед створенням нового
    if (currentChart) {
        currentChart.destroy();
    }
    
    currentChart = new Chart(chartContainer, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors
            }]
        },
        options: {
            // Додаткові налаштування можна додати тут
        }
    });
    
}

function renderBarChart(data) {
    // Очистити попередній графік, якщо він існує
    if (currentChart) {
        currentChart.destroy();
    }

    // Створити новий Chart.js графік у контейнері
    currentChart = new Chart(chartContainer, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors
            }]
        },
        options: {
            // Додаткові налаштування можна додати тут
        }
    });
}

function renderLineChart(data) {
    if (currentChart) {
        currentChart.destroy();
    }

     // Створити новий Chart.js графік у контейнері
     currentChart = new Chart(chartContainer, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors
            }]
        },
        options: {
            // Додаткові налаштування можна додати тут
        }
    });
}

// Функція для сортування масиву за назвою
function sortByTitle() {
    images.sort((a, b) => a.description.localeCompare(b.description));
    renderImages();
}

// Функція для сортування масиву за ціною
function sortByPrice() {
    images.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    renderImages();
}

// Функція для відображення відсортованих товарів
function renderImages() {
    imageContainer.innerHTML = '';
    images.forEach(function (image) {
        addImageToContainer(image);
    });
}

function renderBasketItems() {
    const modalBody = document.querySelector('#basketModal .modal-body');
    modalBody.innerHTML = ''; // Очистити попередній вміст модального вікна кошика

    let totalPrice = 0;
    let totalCount = 0;

    // Проходження по всім товарам у кошику та створення відповідних іконок
    for (const itemName in my_basket) {
        if (my_basket.hasOwnProperty(itemName)) {
            const item = my_basket[itemName];
            const itemIcon = document.createElement('div');
            itemIcon.classList.add('basket-item');

            const itemImage = document.createElement('img');
            itemImage.src = item.src;
            itemImage.alt = item.alt;
            itemImage.classList.add('basket-item-image','small-image');
            itemImage.style.maxWidth = '200px';
            itemImage.style.maxHeight = '200px';

            const itemDescription = document.createElement('div');
            itemDescription.classList.add('basket-item-description');
            itemDescription.textContent = item.description;

            const itemPrice = document.createElement('div');
            itemPrice.classList.add('basket-item-price');
            itemPrice.textContent = item.price;

            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
            removeButton.textContent = 'Видалити';
            // Додаємо обробник події для видалення товару з кошика
            removeButton.addEventListener('click', function () {
                delete my_basket[itemName];
                // Оновлюємо вміст модального вікна після видалення
                renderBasketItems();
            });

            itemIcon.appendChild(itemImage);
            itemIcon.appendChild(itemDescription);
            itemIcon.appendChild(itemPrice);
            itemIcon.appendChild(removeButton);

            modalBody.appendChild(itemIcon);

            // Обчислюємо загальну ціну та кількість товарів у кошику
            totalPrice += parseFloat(item.price);
            totalCount++;
        }
    }

    // Додаємо відображення загальної ціни та кількості товарів
    const totalSection = document.createElement('div');
    totalSection.classList.add('basket-total');
    totalSection.innerHTML = `<p>Загальна кількість товарів: ${totalCount}</p>
                              <p>Загальна ціна: ${totalPrice.toFixed(2)} UAH</p>`;
    modalBody.appendChild(totalSection);

}


    