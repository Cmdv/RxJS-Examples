/**
 * Created by cmdv on 16/06/15.
 */
import Rx from 'rx';
import $ from 'jquery';

var $original   = $('#c_image'),
    $zoom       = $('#c_zoom'),
    $zoomImage  = $('#c_zoom-image');


var imageHover = Rx.Observable.fromEvent($original, 'mousemove');


var convert = imageHover.map((hover) => {
  return {left: hover.clientX, top: hover.clientY}
}).debounce(10);


var imageSubscribe = convert.subscribe((e) => {

  var targetWidth     = $zoom.outerWidth(),
      targetHeight    = $zoom.outerHeight(),
      originalWidth   = $original.width(),
      originalHeight  = $original.height(),
      xRatio          = ($zoomImage.width() - targetWidth) / originalWidth,
      yRatio          = ($zoomImage.height() - targetHeight) / originalHeight,
      offSets         = $original.offset(),
      top             = (e.top * -yRatio) + offSets.top ,
      left            = (e.left * -xRatio) + offSets.left;

  $zoomImage.css({left: left, top: top});
});