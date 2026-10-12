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
    })

    
})
