/**
 * Custom clickout event
 */
(function($) {
    $.event.special.clickout = {
        add: function(obj) {
            var hasBeenClicked = false;

            $(this).on('click', function() {
                hasBeenClicked = true;
            });

            $(document).on('click', function() {
                if (!hasBeenClicked) {
                    obj.handler(this);
                }
                hasBeenClicked = false;
            });
        }
    };
})(jQuery);