/*
 * Options:
 *  topOffset: pixels
 *  leftOffset: pixels
 *  delay: animation delay
 *  size: number of attributes
 *  tag: div, span, whatever
 */
jQuery.fn.yaselect = function(options) {
  options = options || {};
  this.each(function(index, select) {
    var tag = options.tag || 'span';
    var jselect = jQuery(select).css({position: 'absolute'});
    var wrap = jselect.wrap('<' + tag + ' class="yaselect-wrap"></' + tag + '>').parent().prepend('<' + tag + ' class="yaselect-current"></' + tag + '>')
    var curr = wrap.find('.yaselect-current');
    function on_select() {
      curr.text(select.value);
      jselect.slideUp(options.delay || 0.1).blur();
    }
    jselect.keyup(function(e) { if (e.which==13) on_select(); }).click(on_select);
    curr.text(select.value).click(function(event) {
      if (jselect.is(':hidden')) {
        var w = wrap.wrap('<' + tag + '></' + tag + '>');
        var offset = w.offset();
        var wheight = w.height();
        wrap.unwrap();
        jselect.css({
          top: offset.top + wheight + (options.topOffset || 0),
          left: offset.left + (options.leftOffset || 0)
        }).slideDown(options.delay || 0.1).focus();
      } else {
        on_select();
      }
    });
    select.size = options.size || 3;
    on_select();
  });
}
