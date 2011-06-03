/*
 * yaselect
 * is yet-another jquery plugin for making <select> elements stylable by CSS
 * http://github.com/choonkeat/yaselect
 *
 * Copyright (c) 2011 Chew Choon Keat
 * Released under the MIT license
 *
 */
jQuery.fn.yaselect = function (config) {
	var defaults =
	{
		hoverOnly: false,
		topOffset: 0,
		leftOffset: 0,
		size: 5,
		useSelectCss:
		{
			reuseWidth: false,
			reuseHeight: false,
			addWidthToOriginal: 0,
			addHeightToOriginal: 0
		}
	};

	config = jQuery.extend(true, defaults, config);
	return this.each(function (index, select) {
		var jselect = jQuery(select).css({ position: 'absolute', top: config.topOffset, left: config.leftOffset, zIndex: 1 }).addClass('yaselect-select'),
				wrap = jQuery('<div class="yaselect-wrap yaselect-open" tabindex="0"><div class="yaselect-current"></div></div>'),
				anchor = wrap.wrap('<div class="yaselect-anchor" style="position:relative;"></div>').parent(),
				curr = wrap.find('.yaselect-current').text(select.value),
				gettext = function () {
					return jselect.find('option:nth(' + (select.selectedIndex || 0) + ')').text();
				},
				confirm = function (to_focus_wrap) {
					jselect.blur();
					curr.text(gettext());
					jselect.css({ top: wrap.outerHeight() });
					if (to_focus_wrap) {
						wrap.focus();
					}
				};
		if (config.hoverOnly || (window.navigator && navigator.userAgent.match(/iphone|ipod|ipad/i))) {
			wrap.toggleClass('yaselect-open yaselect-close');
			return jselect /* becomes invisible and is placed above wrapper to receive screen tap -- triggering native <select> */
				.before(anchor)
				.css({ opacity: 0.001 })
				.change(function (e) { curr.text(gettext()); })
				.appendTo(anchor);
		}
		jselect
			.before(anchor)
			.keydown(function (e) { if (e.which === 13 || e.which === 32) { e.preventDefault(); confirm(true); } })
			.change(function (e) { curr.text(gettext()); })
			.blur(function (e) { jselect.hide(); wrap.toggleClass('yaselect-open yaselect-close'); })
			.click(function (e) {
				if (jselect.is(':hidden')) {
					wrap.toggleClass('yaselect-open yaselect-close');
					jselect.show();
					setTimeout(function () { jselect.focus(); }); /* avoid trampling confusion with triggered blur */
				} else {
					confirm(true);
				}
			})
			.appendTo(anchor);
		wrap
			.mousedown(function (e) { jselect.click(); })
			.keydown(function (e) { if ([13, 32, 37, 38, 39, 40].indexOf(e.which) !== -1) { e.preventDefault(); jselect.click(); } }); /* preventDefault avoid pagescroll */

		if (config.useSelectCss.reuseWidth) {
			anchor.width(jselect.outerWidth() + config.useSelectCss.addWidthToOriginal);
			jselect.width(anchor.width());
		}
		if (config.useSelectCss.reuseHeight) {
			anchor.height(jselect.outerHeight() + config.useSelectCss.addHeightToOriginal);
			jselect.height(anchor.height());
		}

		select.size = config.size;
		confirm();
	});
};
