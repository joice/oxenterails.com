$(document).ready(function() {
  /* This is basic - uses default settings */
  $("a#single_img").fancybox({'hideOnContentClick': true});
  /* Apply fancybox to multiple items */
  $("a.group").fancybox({
    'transitionIn'	:	'elastic',
    'transitionOut'	:	'elastic',
    'speedIn'		:	600, 
    'speedOut'		:	200, 
    'overlayShow'	:	false,
    'hideOnContentClick': true
  });
});

