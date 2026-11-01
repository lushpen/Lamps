(function () {
    'use strict';

    function startPlugin() {
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

        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite' || e.type == 'complete') {
                // Додаємо невеликий таймаут, щоб інтерфейс Smart TV встиг згенерувати блоки
                setTimeout(function () {
                    // Перевіряємо, чи кнопка вже існує, щоб не дублювати її при повторному відкритті
                    if (e.object.find('.button--uaflix').length) return;

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

                    // Шукаємо контейнер для кнопок (перевіряємо кілька альтернативних класів для різних версій)
                    var container = e.object.find('.full-start__buttons, .movie-full__buttons, .full-start__main');
                    if (container.length) {
                        container.append(button);
                        
                        // КРИТИЧНО: Оновлюємо колекцію навігації Lampa, щоб пульт Smart TV побачив нову кнопку
                        if (window.Lampa.Controller && window.Lampa.Controller.collection) {
                            window.Lampa.Controller.collection(e.object);
                        }
                    }
                }, 150);
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

    if (window.Lampa) {
        startPlugin();
    } else {
        if (typeof window.lampa_started === 'undefined') {
            window.lampa_started = [];
        }
        window.lampa_started.push(startPlugin);
    }
})();
