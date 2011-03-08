# Yet-Another [jQuery] Select

## Native

yaselect provides a CSS customizable ``select`` box, while introducing minimum HTML & keeping maximum widget usability -- native support for arrow keys, search-as-you-type, scroll wheel, proper z-index, etc.

## Long

Regular "select box styling" scripts uses unnecessary markups like ``ul`` & ``li`` to render select options. This approach means having to add reams of javascript to create new html elements, copy option values into those elements, manage arrow keys, pass chosen option values back into hidden input fields.

Was ``iframe`` shims added to manage z-index issues? Is there support for search-as-you-type? What if ajax scripts changes the select ``options``?

## Short

yaselect uses the actual ``select`` widget for displaying options, after activating it's ``size`` attribute. That's it.
