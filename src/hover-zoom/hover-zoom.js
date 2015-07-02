/**
 * Created by cmdv on 16/06/15.
 */

'use strict';

import Rx from 'rx';
import $ from 'jquery';

var dw, dh, rw, rh, lx, ly, w1, h1, w2, h2, padding;

var $target = $('.hoverzoom'),
  $showZoomDiv = $('.showzoom'),
  hoverZoomImage = 'hoverzoom-img',
  hoverZoomflyout = 'hoverzoom-flyout',
  $flyout,
  $link = $target.find('a'),
  $image = $target.find('img'),
  parentDiv = $('.thumbnail'),
  link = $link.attr('href'),
  $zoomImage,

// setting up Observable
  mouseEnter = Rx.Observable.fromEvent($target, 'mouseenter'),
  mouseLeave = Rx.Observable.fromEvent($target, 'mouseleave'),

// prevent default clicks on target image
  targetClick = Rx.Observable.fromEvent($target, 'click').subscribe( (e) => e.preventDefault() );

// Prepare elements onmouseenter and subscription
var _onEnter = mouseEnter.
  map((e)=> {
    e.stopPropagation();

    //check if previous element is already there
    $flyout != undefined ? $flyout.remove() : '' ;

    var zoomImage = document.createElement("img"),
        zoomFlyout = document.createElement("div");
        zoomFlyout.className = hoverZoomflyout;
        zoomImage.className = hoverZoomImage;
        zoomImage.src = link;
        zoomImage.style.position = 'absolute';

        $(zoomFlyout).append(zoomImage);
        $flyout = $(zoomFlyout);
        $showZoomDiv.append($flyout);

        //wait for zoomImage to be loaded then break off to deal with mousemove
        $(zoomImage).load(()=> _setUpMove() );

  }).subscribe();

// get all the positions calculated and setup
var _setUpMove = () =>{

  $zoomImage = $('.' + hoverZoomImage);

  w1 = $target.width();
  h1 = $target.height();
  padding = parentDiv.outerWidth();

  $flyout.css({opacity: 1, left: padding, top: -20, width: w1, height: h1});

  w2 = $flyout.width();
  h2 = $flyout.height();
  dw = $zoomImage.width() - w2;
  dh = $zoomImage.height() - h2;
  rw = dw / w1;
  rh = dh / h1;

  _startMoving();
};


var _startMoving = () => {
  //create an observable for mousemoves
  var mouseMove = Rx.Observable.fromEvent($target, 'mousemove'),
      _onMove = mouseMove.map((e) => {
        lx = e.pageX || lx;
        ly = e.pageY || ly;

        var offset = $target.offset(),
          pt = ly - offset.top,
          pl = lx - offset.left,
          xt = Math.ceil(pt * rh),
          xl = Math.ceil(pl * rw),
          top = xt * -1,
          left = xl * -1;

        return {top: top, left: left}
      });
  //subscribe to mousemove and move zoomImage
  var moveSubscribe = _onMove.subscribe((a) => $zoomImage.css({top: a.top, left: a.left}) );
};

// subscribe to mouseleave and hide flyout
mouseLeave.subscribe(() => $flyout.css({opacity: 0}) );