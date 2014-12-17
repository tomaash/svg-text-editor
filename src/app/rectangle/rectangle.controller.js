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

    $scope.resizeTool = {
      x: 110,
      y: 110,
      width: 10,
      height: 10,
      stroke: 'black',
      'stroke-width': 2
    };

    $scope.rotateTool = {
      cx: 60,
      cy: 130,
      width: 10,
      height: 10,
      stroke: 'black',
      'stroke-width': 2
    };



    var MOVE_STEP = 5;
    var SCALE_STEP = 1.5;

    $scope.mouseState = {
      down: false,
      moving: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    };

    $scope.toolState = {
      on: false,
      visibility: 'hidden',
      mode: false
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
    $scope.resizeToDelta = function() {
      $scope.rect.width = $scope.oldRect.width + $scope.mouseDelta.x;
      $scope.rect.height = $scope.oldRect.height + $scope.mouseDelta.y;
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
      if (e.target.dataset.type) {
        $scope.mouseState.down = true;
        $scope.setPosition(e, true);
        $scope.oldRect = angular.copy($scope.rect);
      } 
      if (e.target.dataset.type === 'tool') {
        $scope.toolState.mode = e.target.dataset.mode;
      }
    };

    $scope.mouseUp = function(e) {
      if ($scope.mouseState.moving) {
        $scope.mouseState.noClick = true;
        $scope.hideTools();
      }
      $scope.mouseState.moving = false;
      $scope.mouseState.down = false;
    };
    $scope.mouseMove = function(e) {
      if ($scope.mouseState.down) {
        $scope.mouseState.moving = true;
        $scope.setPosition(e);
        $scope.updateDelta(e);
        
        if (!$scope.toolState.mode) {
          $scope.moveToDelta();  
        } else if ($scope.toolState.mode === 'resize') {
          $scope.resizeToDelta();                    
        } 
        if ($scope.toolState.on) {
          $scope.updateToolPositions();
        }
      }
    };
    $scope.updateToolPositions = function() {
      $scope.resizeTool.x = $scope.rect.x + $scope.rect.width;
      $scope.resizeTool.y = $scope.rect.y + $scope.rect.height;
      $scope.rotateTool.cx = $scope.rect.x + $scope.rect.width / 2;
      $scope.rotateTool.cy = $scope.rect.y + $scope.rect.height + 20;
    };

    $scope.showTools = function() {
      $scope.toolState.on = true;
      $scope.toolState.visibility = 'visible';
      $scope.updateToolPositions();
    };
    $scope.hideTools = function() {
      $scope.toolState.on = false;
      $scope.toolState.visibility = 'hidden';
      $scope.toolState.mode = false;
    };
    $scope.mouseClick = function(e) {
      if ($scope.mouseState.noClick) {
        $scope.mouseState.noClick = false;
        return;
      }
      console.log(e.target.dataset);
      if (!e.target.dataset.type) {
        $scope.hideTools();
      }
      if (e.target.dataset.type === 'object') {
        if ($scope.toolState.on) {
          $scope.hideTools();
        } else {
          $scope.showTools();
        }
      }
    };

  });