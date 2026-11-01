(function () {
    'use strict';

    function initUAFlix() {
        // Перевіряємо, чи Lampa та jQuery вже доступні в системі
        if (!window.Lampa || !window.$) return;

        console.log('UAFlix Plugin: Ініціалізовано успішно!');

        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var button = $('<div class="full-start__button selector button--uaflix"><span>UAFlix UA</span></div>');
                var movieData = e.data.movie; 

                button.on('hover:enter', function () {
                    Lampa.Select.show({
                        title: 'Оберіть якість UAFlix',
                        items: [
                            { title: 'Full HD (1080p) - Українська', quality: '1080p', url: 'https://sample-videos.com' },
                            { title: 'HD (720p) - Українська', quality: '720p', url: 'https://sample-videos.com' }
                        ],
                        onSelect: function (item) {
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

                // Додаємо кнопку безпосередньо в блок керування картки
                var container = e.object.find('.full-start__buttons');
                if (container.length) {
                    container.append(button);
                }
            }
        });

        var styles = `
            .button--uaflix {
                background: #0057b7 !important;
                color: #ffd700 !important;
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

    // Спрощений та надійніший метод запуску для розумних телевізорів
    if (window.Lampa) {
        initUAFlix();
    } else {
        // Якщо Lampa ще не підвантажилась, чекаємо вікно ініціалізації
        if (typeof window.lampa_started === 'undefined') {
            window.lampa_started = [];
        }
        window.lampa_started.push(initUAFlix);
    }

})();
