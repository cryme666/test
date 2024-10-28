document.addEventListener('DOMContentLoaded', function() {
    // Перевіряємо, чи користувач вже підписаний
    const isSubscribed = localStorage.getItem('subscribed');

	const no_modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
    if (!isSubscribed) {
        setTimeout(function() {
            no_modal.show();
        }, 3000);
		
        const subscribeButton = document.getElementById('subscribeButton');
        subscribeButton.addEventListener('click', function() {	
            localStorage.setItem('subscribed', true);
            no_modal.hide();	
            alert('Дякуємо за підписку!');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
	// Отримуємо посилання на елемент модального вікна
	const advertisementModal = new bootstrap.Modal(document.getElementById('advertisementModal'));
  
	// Чекаємо певний час перед відкриттям модального вікна
	setTimeout(function() {
	  advertisementModal.show(); // Показуємо модальне вікно
	}, 15000); 
  
	// Чекаємо певний час перед тим як активувати кнопку закриття
	setTimeout(function() {
	  const closeButton = document.getElementById('closeButton');
	  closeButton.removeAttribute('disabled'); // Активуємо кнопку
	}, 10000); 
  });
  