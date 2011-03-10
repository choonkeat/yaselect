# Yet-Another [jQuery] Select

## Native

yaselect provides a CSS customizable ``select`` box, while introducing minimum HTML & keeping maximum widget usability -- native support for arrow keys, search-as-you-type, scroll wheel, proper z-index, etc.

## Long

Regular "select box styling" scripts uses unnecessary markups like ``ul`` & ``li`` to render select options. This approach means having to add reams of javascript to create new html elements, copy option values into those elements, manage arrow keys, pass chosen option values back into hidden input fields.

Was ``iframe`` shims added to manage z-index issues? Is there support for search-as-you-type? What if ajax scripts changes the select ``options``?

## Short

yaselect uses the actual ``select`` widget for displaying options, after activating it's ``size`` attribute. That is it.

## Usage

Given a select box,

    <!-- your select tag -->
    <select style="position: absolute; top: ?px; left: ?px; display: none; " class="yaselect-select" size="?">
      <!-- your option tags -->
    </select>

Include jQuery, yaselect script & apply it to your ``select`` element

    <script src="jquery.min.js"></script>
    <script src="jquery.yaselect.min.js"></script>
    <script>
      jQuery('select').yaselect();
    </script>

## Result

Your ``select`` will become

    <div class="yaselect-wrap yaselect-?" tabindex="0">
      <div class="yaselect-current"><!-- current selection --></div>
    </div>
    <!-- your select tag -->
    <select style="position: absolute; top: ?px; left: ?px; display: none; " class="yaselect-select" size="?">
      <!-- your option tags -->
    </select>

## Homepage

http://github.com/choonkeat/yaselect

## License

Copyright (c) 2011 Chew Choon Keat, released under the MIT license
