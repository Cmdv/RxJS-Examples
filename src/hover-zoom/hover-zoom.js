'use strict';
/**
 * Created by cmdv on 16/06/15.
 */

import Rx from 'rx';
import $ from 'jquery';

function hoverZoom (target) {

  var $target = $(target),
      $flyout = $('<div class="easyzoom-flyout" />'),
      $notice = $('<div class="easyzoom-notice" />');


  var mouseHover = Rx.Observable.fromEvent($target, 'mousemove');
  var mouseEnter = Rx.Observable.fromEvent($target, 'mouseenter');
  var mouseLeave = Rx.Observable.fromEvent($target, 'mouseleave');


  var _onEnter = mouseEnter.map((e) => {
      $target.append($flyout)
  });

  var _onHover = mouseHover.map((hover) => {

    return {left: hover.clientX, top: hover.clientY}
  }).debounce(10);

  var imageSubscribe = convert.subscribe((e) => {

    var imageTop = (e.top * -yRatio) + (originalOffSets.top * yRatio),
      imageLeft = (e.left * -xRatio) + (originalOffSets.left * xRatio);

    $zoomImage.css({left: imageLeft, top: imageTop});
    $zoom.css({opacity: 1});
  });

  imageLeave.subscribe(() => {
    $zoom.css({opacity: 0});
  });

}