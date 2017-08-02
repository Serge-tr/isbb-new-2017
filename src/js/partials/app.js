// $(document).ready(function () {
//
//     function onScroll() {
//       var docScroll = $(document).scrollTop();
//       $(".b-main-menu__link").each(function () {
//           var hash = $(this).attr('href'),
//               target = $(hash);
//           if (target.position().top - 125 <= docScroll) {
//               $(".b-main-menu__link").removeClass("active");
//               $(this).addClass("active");
//           } else {
//               $(this).removeClass("active");
//           }
//       })
//     }
//
//     $(document).on("scroll", onScroll);
//
//     $("body").on('click', '[href*="#"]', function(e){
//         var fixedOffset = 120;
//         $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top }, 1000);
//         $(".b-main-menu__link").removeClass("active");
//         $(this).addClass("active");
//         e.preventDefault();
//     });
// });




/* Video markers */

$(document).ready(function () {

    var list = $('#c-schedule'),
        allSiblings = list.find(".b-schedule__item"),
        mediaEl = document.getElementById('vid'),
        schedule = document.getElementById('c-schedule'),
        items = schedule.children,
        playBtn1 = document.getElementById('v10'),
        playBtn2 = document.getElementById('videoplay-20'),
        playBtn3 = document.getElementById('videoplay-30'),
        playBtn4 = document.getElementById('videoplay-40'),
        playBtn5 = document.getElementById('videoplay-50'),
        playBtn6 = document.getElementById('videoplay-60');

    $(items).on('click', function(){
        var $this = $(this);
        if($this.hasClass('b-schedule__item--1')) {
            mediaEl.currentTime = 10.2;
        }
        if($this.hasClass('b-schedule__item--2')) {
            mediaEl.currentTime = 20.2;
        }
        if($this.hasClass('b-schedule__item--3')) {
            mediaEl.currentTime = 30.2;
        }
        if($this.hasClass('b-schedule__item--4')) {
            mediaEl.currentTime = 40.2;
        }
        if($this.hasClass('b-schedule__item--5')) {
            mediaEl.currentTime = 50.2;
        }
        if($this.hasClass('b-schedule__item--6')) {
            mediaEl.currentTime = 59.2;
        }
        mediaEl.play();
        allSiblings.removeClass('active');
        this.classList.add('active');
    });



    mediaEl.addEventListener("timeupdate", function() {
        var curTime = mediaEl.currentTime;
        if ( curTime > 10 ) {
            allSiblings.removeClass('active');
            playBtn1.classList.add('active');
        }
        if ( curTime > 20 ) {
            allSiblings.removeClass('active');
            playBtn2.classList.add('active');
        }
        if ( curTime > 30 ) {
            allSiblings.removeClass('active');
            playBtn3.classList.add('active');
        }
        if ( curTime > 40 ) {
            allSiblings.removeClass('active');
            playBtn4.classList.add('active');
        }
        if ( curTime > 50 ) {
            allSiblings.removeClass('active');
            playBtn5.classList.add('active');
        }
        if ( curTime > 60 ) {
            allSiblings.removeClass('active');
            playBtn6.classList.add('active');
        }
    });
});


$(document).ready(function(){
    var secondSlider = $('.b-obey__content');
    secondSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        speed: 10,
        autoplay: true,
        autoplaySpeed: 700,
        arrows: false,
        draggable: false,
        infinite: false,
        pauseOnHover: false,
        pauseOnFocus: false
    });
    secondSlider.on('afterChange', function(event, slick, currentSlide){
        if(currentSlide === 3) {
            secondSlider.slick('slickPause');
            $('.c-obey__header').delay(1700).fadeIn(2000);
            $('.b-devices__item').each(function (i) {
                $(this).delay((i++)*500).fadeIn(300);
            });
        }
    });
});


$(document).ready(function(){
    $('.c-essential__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        draggable: false,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });
});

/* Инициализация параллакса */
$(document).ready(function(){
    $.stellar();
});


$(document).ready(function(){
    var worksHgt = $('#vid').height();
    $("#c-schedule").height(worksHgt);
    console.log(worksHgt);

    $(window).resize(function(){
        var videoHgt = $('.c-video').height();
        $("#c-schedule").height(videoHgt - 7);
    });
});



