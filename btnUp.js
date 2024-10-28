// Отримуємо посилання на кнопку "Наверх"
const btnUp = document.getElementById('btnUp');

// Додаємо обробник події для кліку на кнопку "Наверх"
btnUp.addEventListener('click', function() {
    // Прокручуємо сторінку вгору
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавна прокрутка
    });
});

// Отримати розмір екрану
const windowHeight = window.innerHeight;

// Встановити момент відображення кнопки (2/3 від висоти екрану)
const scrollThreshold = windowHeight * 2 / 3;

// Показати кнопку, коли сторінка прокручена на встановлену відстань
window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
        btnUp.classList.remove('d-none'); // Показати кнопку
    } else {
        btnUp.classList.add('d-none'); // Сховати кнопку
    }
});