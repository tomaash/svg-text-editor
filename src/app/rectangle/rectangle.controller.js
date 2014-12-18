'use strict';

angular.module('svgTextEditor')
  .controller('RectangleCtrl', function($scope, Mouse) {
    console.log(Mouse.state);

    $scope.shapes = {
      123: {
        shapeId: 123,
        shapeType: 'rectshape',
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'lightgreen',
        stroke: 'brown',
        'stroke-width': 10,
        resizeTool: {
          x: 110,
          y: 110,
          width: 10,
          height: 10,
          stroke: 'black',
          'stroke-width': 2
        },
        rotateTool: {
          cx: 60,
          cy: 130,
          width: 10,
          height: 10,
          stroke: 'black',
          'stroke-width': 2
        },
        toolState: {
          on: false,
          visibility: 'hidden',
          mode: false
        }
      },
      124: {
        shapeId: 124,
        shapeType: 'rectshape',
        x: 80,
        y: 80,
        width: 100,
        height: 100,
        fill: 'lightblue',
        stroke: 'darkblue',
        'stroke-width': 10,
        resizeTool: {
          x: 110,
          y: 110,
          width: 10,
          height: 10,
          stroke: 'black',
          'stroke-width': 2
        },
        rotateTool: {
          cx: 60,
          cy: 130,
          width: 10,
          height: 10,
          stroke: 'black',
          'stroke-width': 2
        },
        toolState: {
          on: false,
          visibility: 'hidden',
          mode: false
        }
      }

    };

    $scope.contexts = {
      123:{},
      124:{}
    };

    var MOVE_STEP = 5;
    var SCALE_STEP = 1.5;

    var getContext = function() {
      return $scope.contexts[$scope.rect.shapeId];
    };

    $scope.moveToDelta = function() {
      $scope.rect.x = $scope.oldRect.x + Mouse.state.deltaX;
      $scope.rect.y = $scope.oldRect.y + Mouse.state.deltaY;
    };
    $scope.resizeToDelta = function() {
      $scope.rect.width = $scope.oldRect.width + Mouse.state.deltaX;
      $scope.rect.height = $scope.oldRect.height + Mouse.state.deltaY;
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

    $scope.selectShape = function(e) {
      console.log(e.target.dataset.id);
      if (e.target.dataset.id) {
        $scope.rect = $scope.shapes[e.target.dataset.id] || $scope.shapes[e.target.dataset.parent];
      }
    };

    $scope.mouseDown = function(e) {
      Mouse.mouseDown(e);
      $scope.selectShape(e);
      if (e.target.dataset.type) {
        $scope.oldRect = angular.copy($scope.rect);
      }
      if (e.target.dataset.type === 'tool') {
        $scope.rect.toolState.mode = e.target.dataset.mode;
      }
    };

    $scope.mouseUp = function(e) {
      if (Mouse.state.moving) {
        getContext().hideTools();
      }
      Mouse.mouseUp(e);
    };

    $scope.mouseMove = function(e) {
      Mouse.mouseMove(e);
      if (Mouse.state.down) {
        if (!$scope.rect.toolState.mode) {
          $scope.moveToDelta();
        } else if ($scope.rect.toolState.mode === 'resize') {
          $scope.resizeToDelta();
        }
        if ($scope.rect.toolState.on) {
          getContext().updateToolPositions();
        }
      }
    };

    $scope.mouseClick = function(e) {
      if (Mouse.click(e)) {
        $scope.selectShape(e);
        console.log(e.target.dataset);
        if (!e.target.dataset.type) {
          getContext().hideTools();
        }
        if (e.target.dataset.type === 'object') {
          if ($scope.rect.toolState.on) {
            getContext().hideTools();
          } else {
            getContext().showTools();
          }
        }
      }
    };

  });