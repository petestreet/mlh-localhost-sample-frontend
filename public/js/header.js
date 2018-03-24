/*
This is a small script to auto-adjust the header spacer's height
so it always matches the main header height.
*/

window.onresize = function() {
  var headerHeight =
    document
      .getElementById('about-sidebar')
      .getBoundingClientRect()
      .height;

  if (headerHeight) {
    document
      .getElementById('about-sidebar-spacer')
      .setAttribute('style', 'height:' + headerHeight + 'px')
  }
};