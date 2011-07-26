/*
 * yaselect
 * is yet-another jquery plugin for making <select> elements stylable by CSS
 * http://github.com/choonkeat/yaselect
 *
 * Copyright (c) 2011 Chew Choon Keat
 * Released under the MIT license
 *
 * Options:
 *  topOffset: pixels, default 0
 *  leftOffset: pixels, default 0
 *  size: number of select options to show, default 5
 *  hoverOnly: true / false, default false
 */
jQuery.fn.yaselect = function(options) {
  options = options || {};
  return this.each(function(index, select) {
    var jselect = jQuery(select).css({position:'absolute',top:0,left:0,zIndex:1}).addClass('yaselect-select'),
        wrap    = jQuery('<div class="yaselect-wrap" tabindex="0"><div class="yaselect-current"></div></div>'),
        anchor  = wrap.wrap('<div class="yaselect-anchor" style="position:relative;"></div>').parent(),
        toggle  = function() { anchor.toggleClass('yaselect-open', jselect.is(':visible')); },
        gettext = function() { return jselect.find('option:nth(' + (select.selectedIndex || 0) + ')').text(); },
        curr    = wrap.find('.yaselect-current').text(gettext()),
        confirm = function(to_focus_wrap) { jselect.blur(); curr.text(gettext()); jselect.css({top: wrap.outerHeight()}); if (to_focus_wrap) wrap.focus(); };
    if (options.hoverOnly || window.navigator && navigator.userAgent.match(/iphone|ipod|ipad/i)) {
      return jselect /* becomes invisible and is placed above wrapper to receive screen tap -- triggering native <select> */
        .before(anchor)
        .css({opacity: 0.001})
        .change(function(e) { curr.text(gettext()); })
        .appendTo(anchor);
    }
    jselect
      .before(anchor)
      .keydown(function(e) { if (e.which==13||e.which==32) { e.preventDefault(); confirm(true); } })
      .change(function(e) { curr.text(gettext()); })
      .blur(function(e) { jselect.hide(); toggle(); })
      .click(function(e) {
        if (jselect.is(':hidden')) {
          jselect.show();
          toggle();
          setTimeout(function() { jselect.focus(); }); /* avoid trampling confusion with triggered blur */
        } else {
          confirm(true);
        }
      })
      .appendTo(anchor);
    wrap
      .mousedown(function(e) { jselect.click(); })
      .keydown(function(e) { switch (e.which) { case 13: case 32: case 37: case 38: case 39: case 40: e.preventDefault(); jselect.click(); } }); /* preventDefault avoid pagescroll */
    select.size = Math.min(select.options.length, options.size || 10);
    confirm();
  });
}
