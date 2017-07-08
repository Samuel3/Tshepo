/**
 * Created by Samuel on 08.07.2017.
 */
$(document).ready(function () {
    jQuery(function($) {
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
            $('.switch-locale').on('click', 'a', function(e) {
                e.preventDefault();
                $.i18n().locale = $(this).data('locale');
                History.pushState(null, null, "?locale=" + $(this).data('locale'));
                setMessages();
            });
        });
    });
});

function setMessages() {
    $('#welcome').text($.i18n('welcome'));
    $('#bio').text($.i18n('bio'));
}

var set_locale_to = function(locale) {
    if (locale) {
        $.i18n().locale = locale;
    }
};

function createWaypoints() {
    waypoint = new Waypoint({
        element: document.getElementById('pexel'),
        handler: function () {
            notify('Basic waypoint triggered');
        }
    });
}