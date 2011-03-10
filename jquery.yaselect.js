/*
 * Options:
 *  topOffset: pixels, default 0
 *  leftOffset: pixels, default 0
 *  size: number of select options to show, default 5
 *  tag: html tag name, default span
 *  hoverOnly: true / false, default false
 */
jQuery.fn.yaselect = function(options) {
  options = options || {};
  this.each(function(index, select) {
    var tag     = options.tag || 'span',
        jselect = jQuery(select).css({position: 'absolute'}).addClass('yaselect-select'),
        wrap    = jQuery('<' + tag + ' class="yaselect-wrap yaselect-open"><' + tag + ' class="yaselect-current" tabindex="0"></' + tag + '></' + tag + '>'),
        curr    = wrap.find('.yaselect-current').text(select.value),
        gettext = function() { return jselect.find('option:nth(' + (select.selectedIndex || 0) + ')').text(); },
        confirm = function(to_focus_curr) { jselect.blur(); curr.text(gettext()); if (to_focus_curr) curr.focus(); };
    jselect.anchor_to_wrapper = function(anchor_top) {
      var tmpwrap  = wrap.wrap('<div style="display:inline;border:0;padding:0;margin:0;"></div>').parent(),
          toffset  = tmpwrap.offset(),
          theight  = tmpwrap.height(),
          tbottom  = toffset.top + theight,
          newstyle = {left: toffset.left + (options.leftOffset || 0)},
          topstyle = {height: theight, top: toffset.top + (options.topOffset || 0)},
          botstyle = {top: tbottom + (options.topOffset || 0)};
      wrap.unwrap();
      return this.css(newstyle).css(anchor_top ? topstyle : botstyle);
    };
    if (options.hoverOnly || window.navigator && navigator.userAgent.match(/iphone|ipod|ipad/i)) {
      return jselect /* becomes invisible and is placed above wrapper to receive screen tap -- triggering native <select> */
        .before(wrap.toggleClass('yaselect-open yaselect-close'))
        .css({opacity: 0.001})
        .change(function(e) { curr.text(gettext()); })
        .anchor_to_wrapper('anchor to top');
    }
    jselect
      .before(wrap)
      .keydown(function(e) { if (e.which==13) confirm(true); })
      .change(function(e) { curr.text(gettext()); })
      .blur(function(e) { jselect.hide(); wrap.toggleClass('yaselect-open yaselect-close'); })
      .click(function(e) {
        if (jselect.is(':hidden')) {
          wrap.toggleClass('yaselect-open yaselect-close');
          jselect.show().anchor_to_wrapper();
          setTimeout(function() { jselect.focus(); }); /* avoid trampling confusion with triggered blur */
        } else {
          confirm(true);
        }
      });
    curr
      .mousedown(function(e) { jselect.click(); })
      .keydown(function(e) { if (e.which!=9) { e.preventDefault(); jselect.click(); } }); /* preventDefault avoid pagescroll */
    select.size = options.size || 5;
    confirm();
  });
}
