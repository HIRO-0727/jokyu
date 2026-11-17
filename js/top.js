"use strict";

$(function() {
    // お客様の声スライダー
    new Swiper(".infinite-slider", {
        loop: true,
        slidesPerView: 'auto',
        speed: 1000,
        navigation: {
            prevEl: '.p-top-voice__arrow--prev',
            nextEl: '.p-top-voice__arrow--next',
        },
    });
});

// アコーディオン開閉
$('.p-top-faq__question').on('click', function () {
    const $question = $(this);
    const answer = document.getElementById($question.attr('aria-controls'));
    const isExpanded = $question.attr('aria-expanded') === 'true';

    $question.attr('aria-expanded', String(!isExpanded));
    $(answer).stop(true, true).slideToggle();
});
