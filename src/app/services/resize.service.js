'use strict';

angular.module('svgTextEditor')
  .factory('Resize', function(Mouse) {
    var currentShape, oldShape;
    var start = function (shape) {
      currentShape = shape;
      oldShape = angular.copy(shape);
    };

    var mouseMove = function () {
      currentShape.width = oldShape.width + Mouse.state.deltaX;
      currentShape.height = oldShape.height + Mouse.state.deltaY;
    };

    var finish = function () {
      currentShape = null;
      oldShape = null;
    };

    return {
      start: start,
      mouseMove: mouseMove,
      finish: finish
    };
  });