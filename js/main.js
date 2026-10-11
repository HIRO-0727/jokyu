"use strict";

$(function() {

    //ハンバーガーメニュー

    $('.header__hb').click(function() {
        $(this).toggleClass('active')
        $('.header__nav').toggleClass('active')
    })

    $('.header__nav ul li a').click(function() {
        $('.header__hb').removeClass('active')
        $('.header__nav').removeClass('active')
    })

    
})