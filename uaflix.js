(function () {
    'use strict';

    function initPlugin() {
        if (!window.Lampa || !window.$) return;

        console.log('UAFlix Test: Plugin loaded');

        Lampa.Listener.follow('full', function (event) {
            if (event.type === 'complite' || event.type === 'complete') {
                if (event.object.find('.button--test-plugin').length) return;

                var myButton = $('<div class="full-start__button selector button--test-plugin"><span>Тест Плагіну</span></div>');
                var currentMovie = event.data.movie;

                myButton.on('hover:enter', function () {
                    Lampa.Noty.show('Назва контенту: ' + (currentMovie.title || currentMovie.name));
                });

                var buttonContainer = event.object.find('.full-start__buttons');
                if (buttonContainer.length) {
                    buttonContainer.append(myButton);
                }
            }
        });

        var customStyles = `
            .button--test-plugin {
                background: #28a745 !important;
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

    // Безпечний запуск без Plugins.add, щоб уникнути конфлікту типів даних у u.replace
    if (typeof window.lampa_started === 'undefined') {
        window.lampa_started = [];
    }
    window.lampa_started.push(initPlugin);

    // Якщо Lampa вже працює, запускаємо паралельно
    if (window.Lampa && window.appReady) {
        initPlugin();
    }
})();
