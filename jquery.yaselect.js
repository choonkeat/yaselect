/*
 * Options:
 *  topOffset: pixels
 *  leftOffset: pixels
 *  size: number of attributes
 *  tag: div, span, whatever
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
    jselect
      .before(wrap)
      .keydown(function(e) { if (e.which==13) confirm(true); })
      .change(function(e) { curr.text(gettext()); })
      .blur(function(e) { jselect.hide(); wrap.toggleClass('yaselect-open yaselect-close'); })
      .click(function(e) {
        if (jselect.is(':hidden')) {
          var tmpwrap = wrap.wrap('<div style="display:inline;border:0;padding:0;margin:0;"></div>').parent(),
              toffset = tmpwrap.offset(),
              tbottom = toffset.top + tmpwrap.height();
          wrap.unwrap().toggleClass('yaselect-open yaselect-close');
          jselect.css({
            top:  tbottom + (options.topOffset || 0),
            left: toffset.left + (options.leftOffset || 0)
          }).show();
          setTimeout(function() { jselect.focus(); }); /* avoid trampling confusion with triggered blur */
        } else {
          confirm(true);
        }
      });
    curr
      .mousedown(function(e) { jselect.click(); })
      .keydown(function(e) { if (e.which!=9) jselect.click(); });
    select.size = options.size || 5;
    confirm();
  });
}
