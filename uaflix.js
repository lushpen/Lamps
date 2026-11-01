(function () {
    'use strict';

    // Функція ініціалізації плагіна після завантаження Lampa
    function startPlugin() {
        // Перевіряємо, чи додаток Lampa повністю готовий
        if (window.appReady) {
            initUAFlix();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') initUAFlix();
            });
        }
    }

    function initUAFlix() {
        console.log('UAFlix Plugin: Ініціалізовано успішно!');

        // Додаємо кнопку "Дивитися на UAFlix" в картку опису фільму/серіалу
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var button = $('<div class="full-start__button selector button--uaflix"><span>UAFlix UA</span></div>');
                
                // Інформація про поточний фільм (назва, рік тощо)
                var movieData = e.data.movie; 

                button.on('hover:enter', function () {
                    Lampa.Select.show({
                        title: 'Оберіть якість UAFlix',
                        items: [
                            { title: 'Full HD (1080p) - Українська', quality: '1080p', url: 'https://sample-videos.com' },
                            { title: 'HD (720p) - Українська', quality: '720p', url: 'https://sample-videos.com' }
                        ],
                        onSelect: function (item) {
                            // Запуск вбудованого плеєра Lampa
                            Lampa.Player.play({
                                url: item.url,
                                title: movieData.title || movieData.name,
                                video: movieData
                            });
                        },
                        onBack: function () {
                            Lampa.Controller.toggle('full');
                        }
                    });
                });

                // Впроваджуємо кнопку в інтерфейс після стандартної кнопки "Дивитися"
                e.object.find('.full-start__buttons').append(button);
            }
        });

        // Додаємо власні стилі для кнопки
        var styles = `
            .button--uaflix {
                background: #0057b7 !important; /* Синій колір */
                color: #ffd700 !important;      /* Жовтий текст */
                border-radius: 4px;
                margin-left: 10px;
            }
            .button--uaflix.focus {
                background: #ffd700 !important;
                color: #0057b7 !important;
                box-shadow: 0 0 10px rgba(255,215,0,0.5);
            }
        `;
        $('head').append('<style>' + styles + '</style>');
    }

    // Реєстрація плагіна в системі Lampa
    if (window.Lampa) {
        startPlugin();
    }

})();
