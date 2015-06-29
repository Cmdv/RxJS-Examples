/**
 * Created by cmdv on 16/06/15.
 */
import Rx from 'rx';
import $ from 'jquery';

var $original       = $('#c_image'),
    $zoom           = $('#c_zoom'),
    $zoomImage      = $('#c_zoom-image'),
    targetWidth     = $zoom.outerWidth(),
    targetHeight    = $zoom.outerHeight(),
    originalWidth   = $original.width(),
    originalHeight  = $original.height(),
    xRatio          = ($zoomImage.width() - targetWidth) / originalWidth,
    yRatio          = ($zoomImage.height() - targetHeight) / originalHeight,
    offSets         = $original.offset();


var imageHover = Rx.Observable.fromEvent($original, 'mousemove');
var imageLeave = Rx.Observable.fromEvent($original, 'mouseleave');

var convert = imageHover.map((hover) => {
  return {left: hover.clientX, top: hover.clientY}
}).debounce(10);

var imageSubscribe = convert.subscribe((e) => {

  var top = (e.top * -yRatio) + (offSets.top * yRatio),
      left = (e.left * -xRatio) + (offSets.left * xRatio);

  $zoomImage.css({left: left, top: top});
  $zoom.css({opacity: 1});
});

imageLeave.subscribe(() => {
  $zoom.css({opacity: 0});
});