'use strict';

angular.module('svgTextEditor')
  .controller('RectangleCtrl', function($scope) {
    $scope.rect = {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'lightgreen',
      stroke: 'brown',
      'stroke-width': 10
    };

    var MOVE_STEP = 5;
    var SCALE_STEP = 1.5;

    $scope.mouseState = {
      down: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    };

    $scope.mouseDelta = {
      x: 0,
      y: 0
    };

    $scope.updateDelta = function() {
        $scope.mouseDelta.x = $scope.mouseState.currentX - $scope.mouseState.startX;
        $scope.mouseDelta.y = $scope.mouseState.currentY - $scope.mouseState.startY;
    };

    $scope.setPosition = function(e, startFlag) {
      if (startFlag) {
        $scope.mouseState.startX = e.offsetX;
        $scope.mouseState.startY = e.offsetY;
      }
      $scope.mouseState.currentX = e.offsetX;
      $scope.mouseState.currentY = e.offsetY;
    };

    $scope.moveToDelta = function() {
      $scope.rect.x = $scope.oldRect.x + $scope.mouseDelta.x;
      $scope.rect.y = $scope.oldRect.y + $scope.mouseDelta.y;
    };

    $scope.moveUp = function() {
      $scope.rect.y -= MOVE_STEP;
    };
    $scope.moveDown = function() {
      $scope.rect.y += MOVE_STEP;
    };
    $scope.moveLeft = function() {
      $scope.rect.x -= MOVE_STEP;
    };
    $scope.moveRight = function() {
      $scope.rect.x += MOVE_STEP;
    };

    $scope.scaleUp = function() {
      $scope.rect.width = $scope.rect.width * SCALE_STEP;
      $scope.rect.height = $scope.rect.height * SCALE_STEP;
    };

    $scope.scaleDown = function() {
      $scope.rect.width = $scope.rect.width / SCALE_STEP;
      $scope.rect.height = $scope.rect.height / SCALE_STEP;
    };

    $scope.mouseDown = function(e) {
      $scope.mouseState.down = true;
      $scope.setPosition(e, true);
      $scope.oldRect = angular.copy($scope.rect);
    };
    $scope.mouseUp = function() {
      $scope.mouseState.down = false;
    };
    $scope.mouseMove = function(e) {
      if ($scope.mouseState.down) {
        $scope.setPosition(e);
        $scope.updateDelta(e);
        $scope.moveToDelta();
      }
    };




  });