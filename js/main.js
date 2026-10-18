"use strict";

$(function() {

    //ハンバーガーメニュー

    $('.p-header__hamburger').click(function() {
        $(this).toggleClass('active')
        $('.p-header__nav').toggleClass('active')
    })

    $('.p-header__nav ul li a').click(function() {
        $('.p-header__hamburger').removeClass('active')
        $('.p-header__nav').removeClass('active')
    });

    // SCSSで指定した間隔をremからpxに変換
    function getVoiceGap() {
        const gap = parseFloat(
            $('.p-top-voice__slider').css('--voice-slide-gap')
        );
        const rem = parseFloat($('html').css('font-size'));

        return gap * rem;
    }

    // お客様の声スライダー
    const infiniteSlider = new Swiper(".infinite-slider", {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        speed: 1000,

        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: getVoiceGap(),
            },
        },
    });

    // 前のスライドへ
    $('.p-top-voice__arrow--prev').click(function() {
        infiniteSlider.slidePrev();
    });

    // 次のスライドへ
    $('.p-top-voice__arrow--next').click(function() {
        infiniteSlider.slideNext();
    });

    // 画面幅に合わせて間隔を変更
    $(window).on('resize', function() {
        const gap = getVoiceGap();

        infiniteSlider.params.breakpoints[768].spaceBetween = gap;
        infiniteSlider.params.spaceBetween = gap;
        infiniteSlider.update();
    });

});

// アコーディオン開閉

$('.p-top-faq__answer').css('display', 'flex').hide();

$('.p-top-faq__question').on('click', function(){
  $(this).toggleClass('active');
  $(this).next().slideToggle();
});

// トップへ戻るボタン
$(window).scroll(function() {
    const scrollTop = $(this).scrollTop();

    if(scrollTop > 100) {
        $('.c-top').addClass('active');
    } else {
        $('.c-top').removeClass('active');
    }
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

    // 表の位置をスライダーに反映
    function syncScrollControl() {
        const maxScroll =
            scrollElement.scrollWidth - scrollElement.clientWidth;

        const progress = maxScroll > 0
            ? scrollElement.scrollLeft / maxScroll * 100
            : 0;

        $control.val(Math.max(0, Math.min(100, progress)));
        $control.prop('disabled', maxScroll <= 0);
    }

    // スライダー操作を表に反映
    $control.on('input', function() {
        const maxScroll = Math.max(
            0,
            scrollElement.scrollWidth - scrollElement.clientWidth
        );

        scrollElement.scrollLeft =
            maxScroll * Number(this.value) / 100;
    });

    // 指やキーボードで表を動かした場合も連動
    $scroll.on('scroll', syncScrollControl);

    // 画面幅や表のサイズが変わったら再計算
    const resizeObserver = new ResizeObserver(syncScrollControl);

    resizeObserver.observe(scrollElement);

    const tableElement =
            scrollElement.querySelector('.p-plan-monthly__table');

    if (tableElement) {
        resizeObserver.observe(tableElement);
    }

    syncScrollControl();
});