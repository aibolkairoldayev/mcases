$(window).on('load scroll resize', function () {

    const winH = $(window).height();
    const scrollTop = $(window).scrollTop();
    const scrollBottom = scrollTop + winH;

    $('.mcase__block').each(function () {

        const $el = $(this);
        const rect = this.getBoundingClientRect(); // ← ключевое отличие
        const elTopAbs = scrollTop + rect.top;
        const elBottomAbs = elTopAbs + rect.height;

        $el.removeClass('mcase__sticky mcase__sticky2');

        if (rect.height <= winH) {
            $el.addClass('mcase__sticky');
        } else {
            if (scrollBottom >= elBottomAbs) {
                $el.addClass('mcase__sticky2');
            }
        }
    });
});

