$(document).ready(function() {
    $('.js--features').waypoint(function(direction) {
        direction === "down" ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
    }, {
        offset: '60px;'
    });

    // Select all links with hashes
    $('a[href*="#"]')       // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({scrollTop: target.offset().top}, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

    $('.js--mobile-btn').click(function() {
        var nav = $('.js--main-div');
        var icon = $('.js--mobile-btn i');

        // nav.slideToggle(200);
        nav.css('display') === 'none' ? nav.css('display', 'block') : nav.css('display', 'none')
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else {
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });

    $( ".cls-heart-div" ).hover(function() {
        $(".cls-heart").css('display', 'block' );
        $(".cls-heart").css('transition', 'display 0.3s' );
        $(".cls-heart").fadeOut( 1500 );
    });

    var $window = $(window);
    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize > 767) {
            $('.js--main-div').css('display', 'block' );
        }
    }

    checkWidth();
    $(window).resize(checkWidth);
});
