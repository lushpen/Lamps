(function () {
    'use strict';

    function initPlugin() {
        if (!window.Lampa || !window.$) return;

        console.log('Educational Plugin: Successfully injected');

        Lampa.Listener.follow('full', function (event) {
            if (event.type === 'complite' || event.type === 'complete') {
                // Перевіряємо, чи кнопка вже існує, щоб не дублювати її
                if (event.object.find('.button--test-plugin').length) return;

                var myButton = $('<div class="full-start__button selector button--test-plugin"><span>Тест Плагіну</span></div>');
                var currentMovie = event.data.movie;

                myButton.on('hover:enter', function () {
                    Lampa.Noty.show('Назва контенту: ' + (currentMovie.title || currentMovie.name));
                });

                var buttonContainer = event.object.find('.full-start__buttons');
                if (buttonContainer.length) {
                    buttonContainer.append(myButton);
                    
                    // Оновлюємо контролер навігації Lampa, щоб пульт бачив нову кнопку
                    if (window.Lampa.Controller && window.Lampa.Controller.collection) {
                        window.Lampa.Controller.collection(event.object);
                    }
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

    // Реєстрація через офіційний плагін-менеджер Lampa
    if (window.Lampa && window.Lampa.Plugins) {
        window.Lampa.Plugins.add('uaflix_test', initPlugin);
    } else {
        if (typeof window.lampa_started === 'undefined') {
            window.lampa_started = [];
        }
        window.lampa_started.push(initPlugin);
    }

})();
