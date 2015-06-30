/**
 * Created by cmdv on 16/06/15.
 */
import Rx from 'rx';
import $ from 'jquery';

var $dragTarget = $('.dragTarget');
var $dragArea = $('.dragArea');

// Get the three major events
var mouseup = Rx.Observable.fromEvent($dragTarget, 'mouseup');
var mousemove = Rx.Observable.fromEvent(document, 'mousemove');
var mousedown = Rx.Observable.fromEvent($dragTarget, 'mousedown');


var _mouseUp = mouseup.subscribe(() => console.log('mouseup'));

var mousedrag = mousedown.flatMap(function (e) {


  // calculate offsets when mouse down
  var startX = e.offsetX, startY = e.offsetY;

  // Calculate delta with mousemove until mouseup
  return mousemove.map(function (mm) {
    mm.preventDefault();

    // accommodate for site header and sidebar
    var offsets = $dragArea.offset();

    return {
      left: mm.clientX - startX - offsets.left,
      top: mm.clientY - startY - offsets.top
    };
  }).takeUntil(mouseup);
});

// Update position
var subscription = mousedrag.subscribe(function (pos) {

  $dragTarget.css({top: pos.top, left: pos.left});

});


