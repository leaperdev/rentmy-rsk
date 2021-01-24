// header fixed js
$(document).on("scroll", function() {
    if ($(document).scrollTop() >= 50) {
        $(".rentmy-menu-header").addClass("shrink");
    } else {
        $(".rentmy-menu-header").removeClass("shrink");
    }
});
/*-- active menu js --*/
$(document).ready(function() {
    $('.rentmy-nav-manu ul li a').click(function() {
        $('li a').removeClass("rentmy-active-menu");
        $(this).addClass("rentmy-active-menu");
    });
});
// toogle js 
$(document).ready(function() {
    $(".rentmy-mobile-menubar").click(function() {
        $(".rentmy-nav-manu ").slideToggle(200);
    });

});
// slider js 
$(document).ready(function() {
    $('#slider-carousel').owlCarousel({
        items: 1,
        margin: 10,
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });
});

// feature product js
$(document).ready(function() {
    $('#feature-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            576: {
                items: 2,
                nav: false
            },
            767: {
                items: 3,
                nav: true,
                loop: false,
                margin: 20
            },
            993: {
                items: 4,
                nav: true,
                loop: false,
                margin: 20
            },
            1200: {
                items: 5,
                nav: true,
                loop: false,
                margin: 20
            }
        }
    })
});

// right sidebar js 
$(function() {

    $('.rm-sidebar-menu').click(function() {
        $('.rentmy-rightsidebar-overlay').addClass('is-open');
        return false;
    });

    $('.rentmy-rightsidebar-close, .rentmy-rightsidebar-overlay').click(function() {
        $('.rentmy-rightsidebar-overlay').removeClass('is-open');
    });
    $('.rentmy-rightsidebar-content').on('click', function(e) {
        e.stopPropagation();
    });

});

// toogle js 
$(document).ready(function() {
    $(".rm-search-bar, .rentmy-search-closebar").click(function() {
        $(".rentmy-search-body").slideToggle(200);
    });
    $(document).click(function() {
        $(".rentmy-search-body").slideUp(200);
    });
    $('.rm-search-bar, .rentmy-search-body').on('click', function(e) {
        e.stopPropagation();
    });
});