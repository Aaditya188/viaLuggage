//   all ------------------
function  initEasybook() {
    "use strict";
    //   loader ------------------
    $(".loader-wrap").fadeOut(300, function () {
        $("#main").animate({
            opacity: "1"
        }, 600);
    });
    //   Background image ------------------
    var a = $(".bg");
    a.each(function (a) {
        if ($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });
    //   perfectScrollbar------------------
    if ($(".scrollbar-inner").length > 0) {
       var aps  = new PerfectScrollbar('.scrollbar-inner', {
            swipeEasing: true,
            minScrollbarLength: 20
        });
    }
    //   Isotope------------------
    function initIsotope() {
        if ($(".gallery-items").length) {
            var a = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                transformsEnabled: true,
                transitionDuration: "700ms",
                resizable: true
            });
            a.imagesLoaded(function () {
                a.isotope("layout");
            });
        }
    }
    initIsotope();
    //   lightGallery------------------
    $(".image-popup").lightGallery({
        selector: "this",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        counter: false
    });
    var o = $(".lightgallery"),
        p = o.data("looped");
    o.lightGallery({
        selector: ".lightgallery a.popup-image",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        loop: false,
        counter: false
    });
    function initHiddenGal() {
        $(".dynamic-gal").on('click', function () {
            var dynamicgal = eval($(this).attr("data-dynamicPath"));

            $(this).lightGallery({
                dynamic: true,
                dynamicEl: dynamicgal,
				download: false,
				loop: false,
				counter: false
            });

        });
		
    $(".rooms-menu a").on("click", function (a) {
        a.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var b = $(this).attr("href");
        $(".tab-content").not(b).css("display", "none");
        $(b).fadeIn();
    });		
		
    }
    initHiddenGal();
    //   Alax modal------------------
    $(".ajax-link").on('click', function () {
        $("html, body").addClass("hid-body");
        $(".ajax-modal-overlay").fadeIn(400);
        $(".ajax-modal-container").animate({
            right: "0",
            opacity: 1
        }, 300);
        $.ajax({
            url: this.href,
            success: function (html) {
                $("#ajax-modal").empty().append(html);
                initHiddenGal();
                $(".ajax-modal-overlay , .ajax-modal-close").on('click', function () {
                    $("html, body").removeClass("hid-body");
                    $(".ajax-modal-overlay").fadeOut(100);
                    $(".ajax-modal-container").animate({
                        right: "-550px",
                        opacity: 0
                    }, 300);
                    setTimeout(function () {

                        $("#ajax-modal").empty();
                        $(".ajax-loader").fadeIn(100);
                    }, 300);
                });

            }
        });
        $(".ajax-loader").delay(700).fadeOut(400);
        setTimeout(function () {
            $(".ajax-modal-wrap").animate({
                opacity: "1"
            }, 300);
        }, 1000);


        return false;
    });
    //   appear------------------
    $(".stats").appear(function () {
        $(".num").countTo();
    });
    // Share   ------------------
    $(".sfcs").on("click", function () {
        $(this).toggleClass("vis-buts h");
        $(".fixed-scroll-column-share-container").slideToggle(400);
    });
    $(".share-container").share({
        networks: ['facebook', 'pinterest', 'googleplus', 'twitter', 'linkedin']
    });
    var shrcn = $(".share-container");
    function showShare() {
        shrcn.removeClass("isShare");
        shrcn.addClass("visshare");
    }
    function hideShare() {
        shrcn.addClass("isShare");
        shrcn.removeClass("visshare");
    }
    $(".showshare").on("click", function () {
        $(this).toggleClass("vis-butsh");
        $(this).find("span").text($(this).text() === 'Close' ? 'Share' : 'Close');
        if ($(".share-container").hasClass("isShare")) showShare();
        else hideShare();
    });
    //   accordion ------------------
    $(".accordion a.toggle").on("click", function (a) {
        a.preventDefault();
        $(".accordion a.toggle").removeClass("act-accordion");
        $(this).addClass("act-accordion");
        if ($(this).next('div.accordion-inner').is(':visible')) {
            $(this).next('div.accordion-inner').slideUp();
        } else {
            $(".accordion a.toggle").next('div.accordion-inner').slideUp();
            $(this).next('div.accordion-inner').slideToggle();
        }
    });
    //   tabs------------------
    $(".tabs-menu a").on("click", function (a) {
        a.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var b = $(this).attr("href");
        $(".tab-content").not(b).css("display", "none");
        $(b).fadeIn();
    });
    //   weather------------------
 			var  datacityw = $("#weather-widget").data("city");
			$("#weather-widget").ideaboxWeather({
			location		: datacityw,
		});
 
    // twitter ------------------
    if ($("#footer-twiit").length > 0) {
        var config1 = {
            "profile": {
                "screenName": 'envatomarket'
            },
            "domId": 'footer-twiit',
            "maxTweets": 2,
            "enableLinks": true,
            "showImages": false
        };
        twitterFetcher.fetch(config1);
    }
    //   Contact form------------------
    $(document).on('submit', '#contactform', function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                comments: $("#comments").val()
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $(document).on('keyup', '#contactform input, #contactform textarea', function () {
        $("#message").slideUp(1500);
    });
    //   mailchimp------------------
    $("#subscribe").ajaxChimp({
        language: "eng",
        url: "https://gmail.us1.list-manage.com/subscribe/post?u=1fe818378d5c129b210719d80&amp;id=a2792f681b"
    });
    $.ajaxChimp.translations.eng = {
        submit: "Submitting...",
        0: '<i class="fa fa-check"></i> We will be in touch soon!',
        1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
        2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    };
    //   Video------------------
    var v = $(".background-youtube-wrapper").data("vid");
    var f = $(".background-youtube-wrapper").data("mv");
    $(".background-youtube-wrapper").YTPlayer({
        fitToBackground: true,
        videoId: v,
        pauseOnScroll: true,
        mute: f,
        callback: function () {
            var a = $(".background-youtube-wrapper").data("ytPlayer").player;
        }
    });
    var w = $(".background-vimeo").data("vim"),
        bvc = $(".background-vimeo"),
        bvmc = $(".media-container"),
        bvfc = $(".background-vimeo iframe "),
        vch = $(".video-container");
    bvc.append('<iframe src="//player.vimeo.com/video/' + w + '?background=1"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');
    $(".video-holder").height(bvmc.height());
    if ($(window).width() > 1024) {
        if ($(".video-holder").length > 0)
            if (bvmc.height() / 9 * 16 > bvmc.width()) {
                bvfc.height(bvmc.height()).width(bvmc.height() / 9 * 16);
                bvfc.css({
                    "margin-left": -1 * $("iframe").width() / 2 + "px",
                    top: "-75px",
                    "margin-top": "0px"
                });
            } else {
                bvfc.width($(window).width()).height($(window).width() / 16 * 9);
                bvfc.css({
                    "margin-left": -1 * $("iframe").width() / 2 + "px",
                    "margin-top": -1 * $("iframe").height() / 2 + "px",
                    top: "50%"
                });
            }
    } else if ($(window).width() < 760) {
        $(".video-holder").height(bvmc.height());
        bvfc.height(bvmc.height());
    } else {
        $(".video-holder").height(bvmc.height());
        bvfc.height(bvmc.height());
    }
    vch.css("width", $(window).width() + "px");
    vch.css("height", 720 / 1280 * $(window).width()) + "px";
    if (vch.height() < $(window).height()) {
        vch.css("height", $(window).height() + "px");
        vch.css("width", 1280 / 720 * $(window).height()) + "px";
    }
    $(".scroll-init  ul ").singlePageNav({
        filter: ":not(.external)",
        updateHash: false,
        offset: 160,
        threshold: 150,
        speed: 1200,
        currentClass: "act-scrlink"
    });
    $(".rate-item-bg").each(function () {
        $(this).find(".rate-item-line").css({
            width: $(this).attr("data-percent")
        });
    });
    // scroll animation ------------------
    $(window).on("scroll", function (a) {
        if ($(this).scrollTop() > 150) {
            $(".to-top").fadeIn(500);
        } else {
            $(".to-top").fadeOut(500)
        }
    });
    //   scroll to------------------
    $(".custom-scroll-link").on("click", function () {
        var a = 150 + $(".scroll-nav-wrapper").height();
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({
                    scrollTop: b.offset().top - a
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });
    $(".to-top").on("click", function (a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    // modal ------------------
    var modal = {};
    modal.hide = function () {
        $('.modal , .reg-overlay').fadeOut(200);
        $("html, body").removeClass("hid-body");
    };
    $('.modal-open').on("click", function (e) {
        e.preventDefault();
        $('.modal , .reg-overlay').fadeIn(200);
        $("html, body").addClass("hid-body");
    });
    $('.close-reg , .reg-overlay').on("click", function () {
        modal.hide();
    });
    // Header ------------------
    $(".more-filter-option").on("click", function () {
        $(".hidden-listing-filter").slideToggle(500);
        $(this).find("span").toggleClass("mfilopact");
    });
    var headSearch = $(".header-search"),
        ssbut = $(".show-search-button"),
        wlwrp = $(".wishlist-wrap"),
        wllink = $(".wishlist-link");
    function showSearch() {
        headSearch.addClass("vis-head-search").removeClass("vis-search");
        ssbut.find("span").text("Close");
        ssbut.find("i").addClass("vis-head-search-close");
        hideWishlist();
    }
    function hideSearch() {
        headSearch.removeClass("vis-head-search").addClass("vis-search");
        ssbut.find("span").text("Search");
        ssbut.find("i").removeClass("vis-head-search-close");
    }
    ssbut.on("click", function () {
        if ($(".header-search").hasClass("vis-search")) showSearch();
        else hideSearch();
    });
    $(".close-header-search").on("click", function () {
        hideSearch();
    });
    function showWishlist() {
        wlwrp.fadeIn(1).addClass("vis-wishlist").removeClass("novis_wishlist")
        hideSearch();
        wllink.addClass("scwllink");
    }
    function hideWishlist() {
        wlwrp.fadeOut(1).removeClass("vis-wishlist").addClass("novis_wishlist");
        wllink.removeClass("scwllink");
    }
    wllink.on("click", function () {
        if (wlwrp.hasClass("novis_wishlist")) showWishlist();
        else hideWishlist();
    });
    $(".act-hiddenpanel").on("click", function () {
        $(this).toggleClass("active-hidden-opt-btn").find("span").text($(this).find("span").text() === 'Close options' ? 'More options' : 'Close options');
        $(".hidden-listing-filter").slideToggle(400);
    });
    // Forms ------------------
    $(document).on('change', '.leave-rating input', function () {
        var $radio = $(this);
        $('.leave-rating .selected').removeClass('selected');
        $radio.closest('label').addClass('selected');
    });
    $('.chosen-select').niceSelect();
    $(".range-slider").ionRangeSlider({
        type: "double",
        keyboard: true
    });
    $(".rate-range").ionRangeSlider({
        type: "single",
        hide_min_max: true,
    });
    $("form.book-form[name=bookFormCalc]").jAutoCalc("destroy");
    $("form.book-form[name=bookFormCalc]").jAutoCalc({
        initFire: true,
        decimalPlaces: 0,
        emptyAsZero: true
    });
    $("form[name=rangeCalc]").jAutoCalc("destroy");
    $("form[name=rangeCalc]").jAutoCalc({
        initFire: true,
        decimalPlaces: 1,
        emptyAsZero: false
    });

    $('input[name="header-search"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-parent"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="header-search"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="header-search"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="dates"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="dates"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="dates"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="bookdates"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".bookdate-container"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="bookdates"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="bookdates"]').on('apply.daterangepicker', function (ev, picker) {
        var start = moment(picker.startDate.format('MM/DD/YYYY')),
            end = moment(picker.endDate.format('MM/DD/YYYY')),
            c = 24 * 60 * 60 * 1000,
            diffDays = Math.round(Math.abs((start - end) / (c))),
            tdv = $("#totaldays").val(diffDays + 1).trigger('change');
        $(".bookdate-container-dayscounter strong").text($("#totaldays").val());
    });
    $('input[name="bookdates"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="main-input-search"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".main-date-parent"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="main-input-search"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="main-input-search"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="main-input-search_slider"]').daterangepicker({
        autoUpdateInput: false,
        drops: "up",
        parentEl: $(".main-date-parent3"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="main-input-search_slider"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="main-input-search_slider"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $(".qty-dropdown-header").on("click", function () {

        $(this).parent(".qty-dropdown").find(".qty-dropdown-content").slideToggle(400);
    });
    $(".show-hidden-map").on("click", function (e) {
        e.preventDefault();
        $(".show-hidden-map").find("span").text($(".show-hidden-map span").text() === 'Close' ? 'On The Map' : 'Close');
        $(".hidden-map-container").slideToggle(400);
    });
    function showColumnhiddenmap() {
        if ($(window).width() < 1064) {
            $(".hid-mob-map").animate({
                right: 0
            }, 500, "easeInOutExpo").addClass("fixed-mobile");
        }
    }
    $(".map-item , .schm").on("click", function (e) {
        e.preventDefault();
        showColumnhiddenmap();
    });
    $('.map-close').on("click", function (e) {
        $(".hid-mob-map").animate({
            right: "-100%"
        }, 500, "easeInOutExpo").removeClass("fixed-mobile");
    });
    $(".show-list-wrap-search").on("click", function (e) {
        $(".lws_mobile").slideToggle(400);

    });
    $(".eye").on("click touchstart", function () {
        var epi = $(this).parent(".pass-input-wrap").find("input");
        if (epi.attr("type") === "password") {
            epi.attr("type", "text");
        } else {
            epi.attr("type", "password");
        }
    });
    $(".tfp-btn").on("click", function () {
        $(this).toggleClass("rot_tfp-btn");
        $(".tfp-det").toggleClass("vis_tfp-det ");
    });
    $(".dasboard-menu li").on({
        mouseenter: function () {

            $(this).find("a").css({
                "color": "#666",
                "background": "#fff"
            });

        },
        mouseleave: function () {
            $(this).find("a").css({
                "color": "#fff",
                "background": "none"
            });
        }
    });
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;
    $(".next-form").on("click", function (e) {
        e.preventDefault();
        if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#progressbar li").eq($("fieldset.book_mdf").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'position': 'absolute'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity,
                    'position': 'relative'
                });
            },
            duration: 1200,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });
    $(".back-form").on("click", function (e) {
        e.preventDefault();
        if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        $("#progressbar li").eq($("fieldset.book_mdf").index(current_fs)).removeClass("active");
        previous_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1 - now) * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'left': left,
                    'position': 'absolute'
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity,
                    'position': 'relative'
                });
            },
            duration: 1200,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });
    $('.faq-nav li a').on("click", function () {
        $('.faq-nav li a').removeClass("act-faq-link");
        $(this).addClass("act-faq-link");
    });
    $('.tariff-toggle').on("click", function () {
        if ($('#yearly-1').is(':checked')) {
            $('.price-item').addClass('year-mont');
        }
        if ($('#monthly-1').is(':checked')) {
            $('.price-item').removeClass('year-mont');
        }
    });
    //   scrollToFixed------------------
    $(".fixed-scroll-column-item").scrollToFixed({
        minWidth: 1064,
        marginTop: 200,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".fixed-scroll-column-item").outerHeight() - 46;
            return a;
        }
    });
    $(".fix-map").scrollToFixed({
        minWidth: 1064,
        zIndex: 0,
        marginTop: 110,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".fix-map").outerHeight(true);
            return a;
        }
    });
    $(".scroll-nav-wrapper").scrollToFixed({
        minWidth: 768,
        zIndex: 1112,
        marginTop: 110,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".scroll-nav-wrapper").outerHeight(true) - 190;
            return a;
        }
    });
    $(".back-to-filters").scrollToFixed({
        minWidth: 1064,
        zIndex: 12,
        marginTop: 190,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".back-to-filters").outerHeight(true) - 30;
            return a;
        }
    });
    $(".dasboard-sidebar-content").scrollToFixed({
        minWidth: 1064,
        zIndex: 12,
        marginTop: 130,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".dasboard-sidebar-content").outerHeight(true) - 48;
            return a;
        }
    });
    $(".help-bar").scrollToFixed({
        minWidth: 1064,
        zIndex: 12,
        marginTop: 130,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".help-bar").outerHeight(true) + 10;
            return a;
        }
    });
    if ($(".fixed-bar").outerHeight(true) < $(".post-container").outerHeight(true)) {
        $(".fixed-bar").addClass("fixbar-action");
        $(".fixbar-action").scrollToFixed({
            minWidth: 1064,
            marginTop: function () {
                var a = $(window).height() - $(".fixed-bar").outerHeight(true) - 100;
                if (a >= 0) return 20;
                return a;
            },
            removeOffsets: true,
            limit: function () {
                var a = $(".limit-box").offset().top - $(".fixed-bar").outerHeight();
                return a;
            }
        });
    } else $(".fixed-bar").removeClass("fixbar-action");
    //   Slick------------------
    var sbp = $('.swiper-button-prev'),
        sbn = $('.swiper-button-next');
    $('.fw-carousel').slick({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        centerMode:false,
        arrows: false,
        variableWidth: true
    });
    sbp.on("click", function () {
        $('.fw-carousel').slick('slickPrev');
    })

    sbn.on("click", function () {
        $('.fw-carousel').slick('slickNext');
    })
    $('.slideshow-container').slick({
        dots: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        fade: true,
        cssEase: 'ease-in',
        infinite: true,
        speed: 1000,
    });
    $('.single-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        adaptiveHeight: true
    });
    sbp.on("click", function () {
        $(this).closest(".single-slider-wrapper").find('.single-slider').slick('slickPrev');
    });
    sbn.on("click", function () {
        $(this).closest(".single-slider-wrapper").find('.single-slider').slick('slickNext');
    });
    $('.slider-container').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
    });
    $('.slider-container').on('init', function (event, slick) {
        initAutocomplete();
    });
    sbp.on("click", function () {
        $(this).closest(".slider-container-wrap").find('.slider-container').slick('slickPrev');

    });
    sbn.on("click", function () {
        $(this).closest(".slider-container-wrap").find('.slider-container').slick('slickNext');
    });
    $('.single-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        dots: true,
        arrows: false,
        centerMode: true,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '0',
                }
            }
        ]

    });
    sbp.on("click", function () {
        $(this).closest(".slider-carousel-wrap").find('.single-carousel').slick('slickPrev');
    });
    sbn.on("click", function () {
        $(this).closest(".slider-carousel-wrap").find('.single-carousel').slick('slickNext');
    });
    $('.inline-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        dots: true,
        arrows: false,
        centerMode: false,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 4,
                    centerMode: false,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            }
        ]
    });
    $(".fc-cont-prev").on("click", function () {
        $(this).closest(".inline-carousel-wrap").find('.inline-carousel').slick('slickPrev');
    });
    $(".fc-cont-next").on("click", function () {
        $(this).closest(".inline-carousel-wrap").find('.inline-carousel').slick('slickNext');
    });
    $('.footer-carousel').slick({
        infinite: true,
        slidesToShow: 5,
        dots: false,
        arrows: false,
        centerMode: false,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 4,
                    centerMode: false,
                }
            },

            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 3,
                    centerMode: false,
                }
            }
        ]

    });
    $(".fc-cont-prev").on("click", function () {
        $(this).closest(".footer-carousel-wrap").find('.footer-carousel').slick('slickPrev');
    });
    $(".fc-cont-next").on("click", function () {
        $(this).closest(".footer-carousel-wrap").find('.footer-carousel').slick('slickNext');
    });
    $('.listing-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        dots: true,
        arrows: false,
        centerMode: true,
        centerPadding: '60px',
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 3,
                }
            },

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,

                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0',
                }
            }
        ]

    });
    sbp.on("click", function () {
        $(this).closest(".list-carousel").find('.listing-carousel').slick('slickPrev');
    });
    sbn.on("click", function () {
        $(this).closest(".list-carousel").find('.listing-carousel').slick('slickNext');
    });
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true
    });
    sbp.on("click", function () {
        $(this).closest(".single-slider-wrapper").find('.slider-for').slick('slickPrev');
    });
    sbn.on("click", function () {
        $(this).closest(".single-slider-wrapper").find('.slider-for').slick('slickNext');
    });
    $('.light-carousel').slick({
        infinite: true,
        slidesToShow: 2,
        dots: false,
        arrows: false,
        centerMode: false,
        responsive: [{
                breakpoint: 1224,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '0',
                }
            }
        ]
    });
    $(".lc-prev").on("click", function () {
        $(this).closest(".light-carousel-wrap").find('.light-carousel').slick('slickPrev');
    });
    $(".lc-next").on("click", function () {
        $(this).closest(".light-carousel-wrap").find('.light-carousel').slick('slickNext');
    });
    // Styles ------------------
    if ($("footer.main-footer").hasClass("fixed-footer")) {
        $('<div class="height-emulator fl-wrap"></div>').appendTo("#main");
    }
    function csselem() {
        $(".height-emulator").css({
            height: $(".fixed-footer").outerHeight(true)
        });
        $(".slideshow-container .slideshow-item").css({
            height: $(".slideshow-container").outerHeight(true)
        });
        $(".slider-container .slider-item").css({
            height: $(".slider-container").outerHeight(true)
        });
        $(".map-container.column-map").css({
            height: $(window).outerHeight(true) - 110 + "px"
        });
    }
    csselem();
    // Mob Menu------------------
    $(".nav-button-wrap").on("click", function () {
        $(".main-menu").toggleClass("vismobmenu");
    });
    function mobMenuInit() {
        var ww = $(window).width();
        if (ww < 1064) {
            $(".menusb").remove();
            $(".main-menu").removeClass("nav-holder");
            $(".main-menu nav").clone().addClass("menusb").appendTo(".main-menu");
            $(".menusb").menu();
            $(".map-container.fw-map.big_map.hid-mob-map").css({
                height: $(window).outerHeight(true) - 110 + "px"
            });
        } else {
            $(".menusb").remove();
            $(".main-menu").addClass("nav-holder");
            $(".map-container.fw-map.big_map.hid-mob-map").css({
                height: 550 + "px"
            });
        }
    }
    mobMenuInit();
    //   css ------------------
    var $window = $(window);
    $window.on("resize", function () {
        csselem();
        mobMenuInit();
        if ($(window).width() > 1064) {
            $(".lws_mobile , .dasboard-menu-wrap").addClass("vishidelem");
            $(".map-container.fw-map.big_map.hid-mob-map").css({
                "right": "0"
            });
            $(".map-container.column-map.hid-mob-map").css({
                "right": "0"
            });
        } else {
            $(".lws_mobile , .dasboard-menu-wrap").removeClass("vishidelem");
            $(".map-container.fw-map.big_map.hid-mob-map").css({
                "right": "-100%"
            });
            $(".map-container.column-map.hid-mob-map").css({
                "right": "-100%"
            });
        }
    });
    $(".box-cat").on({
        mouseenter: function () {
            var a = $(this).data("bgscr");
            $(".bg-ser").css("background-image", "url(" + a + ")");
        }
    });
    $(".header-user-name").on("click", function () {
        $(".header-user-menu ul").toggleClass("hu-menu-vis");
        $(this).toggleClass("hu-menu-visdec");
    });
    // Counter ------------------
    if ($(".counter-widget").length > 0) {
        var countCurrent = $(".counter-widget").attr("data-countDate");
        $(".countdown").downCount({
            date: countCurrent,
            offset: 0
        });
    }
	function showBookingForm (){
		$(".booking-modal-wrap , .bmw-overlay").fadeIn(400);
		$("html, body").addClass("hid-body");
	}
	function hideBookingForm (){
		$(".booking-modal-wrap , .bmw-overlay").fadeOut(400);
		$("html, body").removeClass("hid-body");
	}	
    $(".booking-modal-close , .bmw-overlay").on("click", function () {
  		hideBookingForm ();
    });
    $(".book-btn").on("click", function (e) {
		e.preventDefault();
  		showBookingForm ();
    });	
}
//   Parallax ------------------
function initparallax() {
    var a = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
        }
    };
    trueMobile = a.any();
    if (null === trueMobile) {
        var b = new Scrollax();
        b.reload();
        b.init();
    }
    if (trueMobile) $(".bgvid , .background-vimeo , .background-youtube-wrapper ").remove();
}
//   Star Raiting ------------------
function cardRaining() {
    $.fn.duplicate = function (a, b) {
        var c = [];
        for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
        return this.pushStack(c);
    };
    var cr = $(".card-popup-raining"),
        sts = $(".section-title-separator span");
    cr.each(function (cr) {
        var starcount = $(this).attr("data-starrating");
        $("<i class='fas fa-star'></i>").duplicate(starcount).prependTo(this);
    });
    sts.each(function (sts) {
        $("<i class='fas fa-star'></i>").duplicate(3).prependTo(this);
    })
}
cardRaining();
var cr2 = $(".card-popup-rainingvis");
cr2.each(function (cr) {
    var starcount2 = $(this).attr("data-starrating2");
    $("<i class='fa fa-star'></i>").duplicate(starcount2).prependTo(this);
});
$(".location a , .loc-act").on("click", function (e) {
    e.preventDefault();
    $.get("http://ipinfo.io", function (response) {
        $(".location input , .qodef-archive-places-search").val(response.city);

    }, "jsonp");
});
function initAutocomplete() {
    var acInputs = document.getElementsByClassName("autocomplete-input");
    for (var i = 0; i < acInputs.length; i++) {
        var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);
        autocomplete.inputId = acInputs[i].id;
    }
}
$(".dasboard-menu-btn").on("click", function () {
    $(".dasboard-menu-wrap").slideToggle(500);
});
$(".list-single-facts .inline-facts-wrap").matchHeight({});
$(".listing-item-container  .listing-item").matchHeight({});
$(".article-masonry").matchHeight({});
$(".grid-opt li span").on("click", function () {
    $(".listing-item").matchHeight({
        remove: true
    });
    setTimeout(function () {
        $(".listing-item").matchHeight();
    }, 50);
    $(".grid-opt li span").removeClass("act-grid-opt");
    $(this).addClass("act-grid-opt");
    if ($(this).hasClass("two-col-grid")) {
        $(".listing-item").removeClass("has_one_column");
        $(".listing-item").addClass("has_two_column");
    } else if ($(this).hasClass("one-col-grid")) {
        $(".listing-item").addClass("has_one_column");
    } else {
        $(".listing-item").removeClass("has_one_column").removeClass("has_two_column");
    }
});
$(".notification-close").on("click", function () {
    $(this).parent(".notification").slideUp(500);
});
//   Init All ------------------
$(document).ready(function () {
    initEasybook();
    initparallax();
});