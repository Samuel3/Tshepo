/**
 * Created by Samuel Mathes on 08.07.2017.
 */
var HEADER_SIZE = 70;

$(document).ready(function () {
    jQuery(function($) {
        $("#de").parent().css("display","none");
        $.i18n().load({
            'de': './js/i18n/de.json',
            'en': './js/i18n/en.json'
        }).done(function () {
            $.i18n().locale = 'de';
            set_locale_to(url('?locale'));
            setMessages();
            History.Adapter.bind(window, 'statechange', function(){
                set_locale_to(url('?locale'));
            });
            if (url("#gid")) {
                displayPics();
            }
            $('#lang').on('click', 'a', function(e) {
                    $("#lang").children().css("display", "block");
                e.preventDefault();
                changeToLang($(this).data('locale'));
                History.pushState(null, null, "?locale=" + $(this).data('locale'));
            });
        });
    });
    createWaypoints();
    addScrolltargets();
    $(".navbar-brand").toggle();
    $("#myNavbar").find("a").click(function(){$("#myNavbar").removeClass("in", 500);});
    $(document).click(function(e) {
        if (!$(e.target).is('a')) {
            $('.collapse').collapse('hide');
        }
    });
    buildGallery();
    setTimeout(function(){displayInit();}, 500);
});

// This method sets all the messages of the site depending of the chosen lang
function setMessages() {
    $('body').i18n();
    $('#offersContent').html($.i18n('offersContent'));
    $("#bioContent").html($.i18n("bio"));
    $("#imprint").html($.i18n("imprint"));
}

// This method toggles language
var set_locale_to = function(locale) {
    if (locale) {
        changeToLang(locale);
    }
};

// This function creates the waypoint for the scrolling animations
function createWaypoints() {

    // enlights the nav bar of bio
    $("#bio").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#bioLabel").parent().addClass("active");
    },
        offset: HEADER_SIZE});

    // Fade in for bio
    var scrollOffset = 6 * HEADER_SIZE;
    $("#bio").waypoint({
        handler: function () {
            displayBio();
        }, offset: scrollOffset    });

    // enlights the nav bar of imprint
    $("#imprint").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#imprintLabel").parent().addClass("active");
    },
        offset: HEADER_SIZE});

    // Fade in of imprint div
    $("#imprint").waypoint({handler: function () {
        displayImprint();
    }, offset: 6 * HEADER_SIZE});

    // enlights the nav bar of listen
    $("#listen").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#listenLabel").parent().addClass("active");
    },
        offset: HEADER_SIZE});

    // Fade in of listen div
    $("#listen").waypoint({handler: function(){
        displayListen();
    }, offset: scrollOffset});

    // Enlights the booking in nav bar
    $("#booking").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#bookingLabel").parent().addClass("active");
    },
        offset: HEADER_SIZE});
    // Fade in of booking div
    $("#booking").waypoint({handler: function(){
        displayBooking();
    }, offset: scrollOffset});

    // Enlights the pics in nav bar
    $("#pics").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#picsLabel").parent().addClass("active");
    },
        offset: HEADER_SIZE});

    // Fade in of pics div
    $("#pics").waypoint({handler: function(){
        displayPics();
    }, offset: scrollOffset});

    // Effects for the nav bar
    $("nav").waypoint({handler: function(direction) {
        $("nav").toggleClass("lift", direction === "down");
        $("#header").toggleClass("navbar-fixed-top", direction === "down");
        $(".navbar-brand").toggle(direction === "down");
    },
        offset: -2*HEADER_SIZE });
}

// This method is used in nav bar to scroll to dedicated div
function scrollToId(id) {
    $(document).scrollTo($(id), 400, {offset:{top: - HEADER_SIZE}});
}

function addScrolltargets() {
    $("#bioLabel").click(function(e){
        e.preventDefault();
        scrollToId("#bio");
    });
    $("#imprintLabel").click(function(e){
        e.preventDefault();
        scrollToId("#imprint");
    });
    $("#listenLabel").click(function(e){
        e.preventDefault();
        scrollToId("#listen");
    });
    $("#bookingLabel").click(function(e){
        e.preventDefault();
        scrollToId("#booking");
    });
    $("#top").click(function(e){
        e.preventDefault();
        scrollToId("#welcome");
    });
}

// This method sets all language labels and hides the flag of the language
function changeToLang(lang){
    $("#lang").children().css("display", "block");
    $.i18n().locale = lang;
    $("#" + lang).parent().css("display","none");
    setMessages();
}

// This method displays the init content
function displayInit(){
    $(".spinner").fadeOut("normal");
    $("nav").show("slow");
    $("#welcome").removeClass("invisible").fadeIn("slow");
    $("#intro").removeClass("invisible").fadeIn("slow");
    $("#brand").removeClass("invisible").fadeIn("slow");
}

// This method displays the listen content
function displayListen() {
    $("#listen").removeClass("invisible").fadeIn("slow");
}

// This method displays the pictures content
function displayPics() {
    $("#pics").removeClass("invisible").fadeIn("slow");
}

// This method displays the booking content
function displayBooking() {
    $("#booking").removeClass("invisible").fadeIn("slow");
}

// This method displays the imprint content
function displayImprint() {
    $("#imprint").removeClass("invisible").fadeIn("slow");
}

// This method displays bio content
function displayBio() {
    $("#bio").removeClass("invisible").fadeIn("slow");
}