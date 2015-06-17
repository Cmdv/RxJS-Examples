/**
 * Created by cmdv on 16/06/15.
 */
import Rx from 'rx';
import $ from 'jquery';

var $original = $('#c_image'),
    $zoom     = $('#c_zoom-image');

var imageHover = Rx.Observable.fromEvent($original, 'mousemove');

var convert = imageHover.map((hover) => {
  return {left: hover.clientX, top: hover.clientY}
}).debounce(10);

var imageSubscribe = convert.subscribe((e) => {

  var targetWidth = $zoom.outerWidth();
  var targetHeight = $zoom.outerHeight();

  $zoom.css({left: e.left, top: e.top});
    //$zoom.innerHTML = e.x + ', ' +  e.y;
});

