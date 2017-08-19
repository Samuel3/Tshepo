/**
 * Created by Samuel on 08.07.2017.
 */
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
                $.i18n().locale = $(this).data('locale');
                History.pushState(null, null, "?locale=" + $(this).data('locale'));
                setMessages();
                $("#" + $(this).data('locale')).parent().css("display","none");
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
        $.i18n().locale = locale;
        $("#" + locale).parent().css("display","none");
    }
};

function createWaypoints() {
    pic = new Waypoint({
        element: document.getElementById('pexel'),
        handler: function (direction) {
            console.log('Triggered waypoint pic ' + direction);
        }
    });
    bio = new Waypoint({
        element: $("#bio"),
        handler: function (direction) {
            $(".nav")
                .find(".active")
                .removeClass("active");
            $("#bioLabel")
                .parent()
                .addClass("active");
        }
    });

    about = new Waypoint({
        element: $("#about"),
        handler: function (direction) {
            $(".nav")
                .find(".active")
                .removeClass("active");
            $("#aboutLabel")
                .parent()
                .addClass("active");
        }
    });

    listen = new Waypoint({
        element: $("#listen"),
        handler: function (direction) {
            $(".nav")
                .find(".active")
                .removeClass("active");
            $("#listenLabel")
                .parent()
                .addClass("active");
        }
    });

    booking = new Waypoint({
        element: $("#booking"),
        handler: function (direction) {
            $(".nav")
                .find(".active")
                .removeClass("active");
            $("#bookingLabel")
                .parent()
                .addClass("active");
        }
    });
}

function scrollToId(id) {
    $(document).scrollTo($(id), 400, {offset:{top:-70}});
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
