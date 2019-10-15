/**
 *  We handle several device classes based on browser width.
 *
 *  - desktop:   > __tablet_width__ (as set in style.ini)
 *  - mobile:
 *    - tablet   <= __tablet_width__
 *    - phone    <= __phone_width__
 */
var device_class = ''; // not yet known
var device_classes = 'desktop mobile tablet phone';

function tpl_dokuwiki_mobile(){

    // the z-index in mobile.css is (mis-)used purely for detecting the screen mode here
    var screen_mode = jQuery('#screen__mode').css('z-index') + '';

    // determine our device pattern
    // TODO: consider moving into dokuwiki core
    switch (screen_mode) {
        case '1':
            if (device_class.match(/tablet/)) return;
            device_class = 'mobile tablet';
            break;
        case '2':
            if (device_class.match(/phone/)) return;
            device_class = 'mobile phone';
            break;
        default:
            if (device_class == 'desktop') return;
            device_class = 'desktop';
    }

    jQuery('html').removeClass(device_classes).addClass(device_class);

    // handle some layout changes based on change in device
    var $handle = jQuery('#dokuwiki__aside h3.toggle');
    var $toc = jQuery('#dw__toc h3');

    if (device_class == 'desktop') {
        // reset for desktop mode
        if($handle.length) {
            $handle[0].setState(1);
            $handle.hide();
        }
        if($toc.length) {
            $toc[0].setState(1);
        }
    }
    if (device_class.match(/mobile/)){
        // toc and sidebar hiding
        if($handle.length) {
            $handle.show();
            $handle[0].setState(-1);
        }
        if($toc.length) {
            $toc[0].setState(-1);
        }
    }
}

jQuery(function(){
    var resizeTimer;
    dw_page.makeToggle('#dokuwiki__aside h3.toggle','#dokuwiki__aside div.content');

    tpl_dokuwiki_mobile();
    jQuery(window).on('resize',
        function(){
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(tpl_dokuwiki_mobile,200);
        }
    );

    // increase sidebar length to match content (desktop mode only)
    var $sidebar = jQuery('.desktop #dokuwiki__aside');
    if($sidebar.length) {
        var $content = jQuery('#dokuwiki__content div.page');
        $content.css('min-height', $sidebar.height());
    }
});

jQuery(function() {

    var $mode = jQuery('html').attr('theme');   //gets the current theme

    //If User's choice is enabled, safe in local storage
    if (jQuery('#configUserChoice').attr('content') == '1'){
        localStorage.setItem('configUserChoice', '1');

        if ($mode == 'auto' || $mode == null) {
            jQuery('html').attr('theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    if (jQuery('#configUserChoice').attr('content') == '0'){
        localStorage.setItem('configUserChoice', '0');
    }

    //If ThemeSwitch Link gets clicked
    jQuery('#themeSwitch').click(tpl_themeSwitch);
    jQuery('#themeSwitchMobile').click(tpl_themeSwitch);

    function tpl_themeSwitch() {

        jQuery(this).blur();    //remove focus on button
        $mode = jQuery('html').attr('theme');   //gets the current theme

        if ($mode == 'light') {
            jQuery('html').attr('theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }

        if ($mode == 'dark' || $mode == 'auto' || $mode == null) {
            jQuery('html').attr('theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
});

if (localStorage.getItem('configUserChoice') == '1'){
    var $themeFromStorage = localStorage.getItem('theme');
    jQuery('html').attr('theme', $themeFromStorage);
}