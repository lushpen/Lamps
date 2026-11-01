(function () {
    'use strict';

    // Головна функція ініціалізації вашого компонента
    function initPlugin() {
        // Перевірка наявності базового ядра Lampa та бібліотеки jQuery
        if (!window.Lampa || !window.$) return;

        console.log('Educational Plugin: Successfully initialized');

        // Слухач подій інтерфейсу. 'full' означає відкриття картки опису
        Lampa.Listener.follow('full', function (event) {
            
            // Подія 'complite' (або 'complete') викликається, коли картка повністю промальована
            if (event.type == 'complite' || event.type == 'complete') {
                
                // Створення HTML-елемента кнопки за допомогою jQuery
                var myButton = $('<div class="full-start__button selector button--test-plugin"><span>Тест Плагіну</span></div>');
                
                // Отримання метаданих поточної картки (назва, рік, опис)
                var currentMovie = event.data.movie;

                // Обробник натискання або вибору кнопки (hover:enter працює з пультами Smart TV)
                myButton.on('hover:enter', function () {
                    // Виклик вбудованої системи сповіщень Lampa
                    Lampa.Noty.show('Назва контенту: ' + (currentMovie.title || currentMovie.name));
                });

                // Пошук контейнера для кнопок керування у поточному вікні
                var buttonContainer = event.object.find('.full-start__buttons');
                
                // Безпечне додавання кнопки в кінець списку, якщо контейнер існує
                if (buttonContainer.length) {
                    buttonContainer.append(myButton);
                }
            }
        });

        // Впровадження CSS-стилів для правильного відображення та фокусування кнопки
        var customStyles = `
            .button--test-plugin {
                background: #28a745 !important; /* Зелений колір */
                color: #ffffff !important;
                border-radius: 4px;
                margin-left: 10px;
            }
            .button--test-plugin.focus {
                background: #ffffff !important;
                color: #28a745 !important;
                box-shadow: 0 0 12px rgba(40, 167, 69, 0.6);
            }
        `;
        $('head').append('<style>' + customStyles + '</style>');
    }

    // Блок архітектури запуску (усуває помилки асинхронного завантаження на Smart TV)
    if (window.Lampa) {
        // Якщо ядро вже в пам'яті, запускаємо інструкцію негайно
        initPlugin();
    } else {
        // Якщо скрипт завантажився швидше за ядро, додаємо функцію в офіційний черговий масив
        if (typeof window.lampa_started === 'undefined') {
            window.lampa_started = [];
        }
        window.lampa_started.push(initPlugin);
    }

})();
