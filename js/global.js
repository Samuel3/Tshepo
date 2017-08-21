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
});

function setMessages() {
    $('body').i18n();
    $('#offersContent').html($.i18n('offersContent'));
}

var set_locale_to = function(locale) {
    if (locale) {
        changeToLang(locale);
    }
};

function createWaypoints() {

    $("#bio").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#bioLabel").parent().addClass("active");
    }});

    $("#about").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#aboutLabel").parent().addClass("active");
    }});

    $("#listen").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#listenLabel").parent().addClass("active");
    }});

    $("#booking").waypoint({handler: function (direction) {
        $(".nav").find(".active").removeClass("active");
        $("#bookingLabel").parent().addClass("active");
    }});

    $("nav").waypoint({handler: function(direction) {
        $("nav").toggleClass("lift", direction === "down");
    },
        offset: 25});
}

function scrollToId(id) {
    $(document).scrollTo($(id), 400, {offset:{top: - HEADER_SIZE}});
}

function addScrolltargets() {
    $("#bioLabel").click(function(e){
        e.preventDefault();
        scrollToId("#bio");
    });
    $("#aboutLabel").click(function(e){
        e.preventDefault();
        scrollToId("#about");
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

function changeToLang(lang){
    $("#lang").children().css("display", "block");
    $.i18n().locale = lang;
    $("#" + lang).parent().css("display","none");
    setMessages();
}