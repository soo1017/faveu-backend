$(document).ready(function() {
    $('.js--contact').waypoint(function(direction) {
        direction === "down" ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
    }, {
        offset: '60px;'
    });

    $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {            // Only prevent default if animation is actually gonna happen
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

        nav.css('display') === 'none' ? nav.css('display', 'block') : nav.css('display', 'none');
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

var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

$(document).on("click", ".cls-contact-btn", function(e) {
    e.preventDefault();

    var input_text = $('textarea#id-textinput').val();
    var contact_name = $('#id-name').val();
    var contact_email = $('#id-email').val();
    var contact_data = {};

    if (!testEmail.test(contact_email)) {
        contact_email = null;
    }
    if (contact_name && contact_email && input_text) {
        contact_data.contact_name = contact_name;
        contact_data.contact_email = contact_email;
        contact_data.contact_inputtext = input_text;
        var contact_url = "https://www.faveu.com/contact";
        $.ajax({
                url: contact_url,
                type: 'post',
                dataType:'json',
                data: contact_data
        }).then(function(data, textStatus, jqXHR) {
            if (jqXHR.status == 200) {
                // alert("Success!");
            } else {
                // alert("Error!");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 200) {
                // alert("Success!");
            } else {
                // alert("Error!");
            }
        });
        $('.section-form').attr('style', 'display:none;');
        $('.section-thank').attr('style', 'display:block;');
    } else {
        $('.cls-error-message').attr('style', 'display:block;');
    }
});