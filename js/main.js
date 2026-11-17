"use strict";

$(function() {
    // ハンバーガーメニュー
    const $button = $('.p-header__hamburger');
    const $nav = $('.p-header__nav');

    function setMenuOpen(isOpen) {
        $button.toggleClass('active', isOpen);
        $nav.toggleClass('active', isOpen);
        $button.attr('aria-expanded', String(isOpen));
    }

    $button.on('click', function() {
        setMenuOpen($button.attr('aria-expanded') === 'false');
    });

    $nav.find('a').on('click', function() {
        setMenuOpen(false);
    });
});

// お問い合わせ・トップへ戻るボタン
$(function() {
    const fv = document.querySelector('.p-top-fv, .c-fv');
    const $actions = $('.p-footer-actions');

    function updateFooterActions() {
        const isVisible = fv
            ? fv.getBoundingClientRect().bottom <= 0
            : window.scrollY > 100;

        $actions.toggleClass('active', isVisible);
    }

    $(window).on('scroll resize load', updateFooterActions);

    updateFooterActions();
});

// Planページの横スクロールバー

// 料金表とスクロール操作スライダーの連動
$(function() {
    const $scroll = $('#plan-monthly-scroll');
    const $control = $('.p-plan-monthly__scroll-control');

    // 料金表がないページでは処理しない
    if (!$scroll.length || !$control.length) {
        return;
    }

    const scrollElement = $scroll[0];

    // 表を横にスクロールできる距離
    function getMaxScroll() {
        return scrollElement.scrollWidth - scrollElement.clientWidth;
    }

    // 表の位置をスライダーに反映
    function syncScrollControl() {
        const maxScroll = getMaxScroll();
        const progress = maxScroll > 0
            ? scrollElement.scrollLeft / maxScroll * 100
            : 0;

        $control.val(progress);
        $control.prop('disabled', maxScroll <= 0);
    }

    // スライダー操作を表に反映
    $control.on('input', function() {
        scrollElement.scrollLeft = getMaxScroll() * this.valueAsNumber / 100;
    });

    $scroll.on('scroll', syncScrollControl);
    $(window).on('resize', syncScrollControl);

    syncScrollControl();
});
