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

