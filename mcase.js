$(window).on('load', function () {

    const winH = $(window).height();
    const blocks = $('.mcase__sticky-block');

    // Проверка высоты при загрузке
    blocks.each(function () {
        const h = $(this).outerHeight();

        if (h < winH) {
            $(this).addClass('active3');
        }
    });

    // Следим за скроллом
    $(window).on('scroll', function () {
        const winBottom = $(window).scrollTop() + winH;

        blocks.each(function () {
            const $el = $(this);
            const elTop = $el.offset().top;
            const elBottom = elTop + $el.outerHeight();

            // Только блоки выше высоты экрана
            if ($el.outerHeight() > winH) {

                // ↓↓↓ при скролле вниз: нижняя граница дошла до нижней границы экрана
                if (elBottom <= winBottom) {
                    $el.addClass('active2');
                }

                // ↑↑↑ при скролле вверх: нижняя граница снова выше нижней границы экрана
                if (elBottom > winBottom) {
                    $el.removeClass('active2');
                }
            }
        });
    });

});
