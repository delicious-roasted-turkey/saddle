/**
 * Toggles bootstrap sidebar
 * http://www.bootstrapzero.com/bootstrap-template/free-admin-theme
 */
$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});