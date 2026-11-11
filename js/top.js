"use strict";

$(function() {
    // お客様の声スライダー
    const infiniteSlider = new Swiper(".infinite-slider", {
        loop: true,
        slidesPerView: 'auto',
        speed: 1000,
    });

    // 前のスライドへ
    $('.p-top-voice__arrow--prev').click(function() {
        infiniteSlider.slidePrev();
    });

    // 次のスライドへ
    $('.p-top-voice__arrow--next').click(function() {
        infiniteSlider.slideNext();
    });
});

// アコーディオン開閉
$('.p-top-faq__item').on('click', function () {
    const $item = $(this);

    $item.children('.p-top-faq__question').toggleClass('active');
    $item.children('.p-top-faq__answer').stop(true, true).slideToggle();
});
