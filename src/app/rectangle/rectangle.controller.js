'use strict';

angular.module('svgTextEditor')
  .controller('RectangleCtrl', function($scope, Mouse, Move, Resize) {

    $scope.Mouse = Mouse;

    var TOOLS = {
      'resize': Resize
    };

    var RECT_TEMPLATE = {
      shapeId: 123,
      shapeType: 'rectshape',
      x: 120,
      y: 120,
      width: 50,
      height: 50,
      fill: 'darkgreen',
      stroke: 'orange',
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
    };

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
          mode: false,
          service: null
        }
      }
    };

    $scope.contexts = {
      123: {},
      124: {}
    };

    $scope.galleryImages = [{
      source: "schoolgirl.jpg",
      thumbnail: "schoolgirl_thumb.jpg"
    }, {
      source: "chibi.jpg",
      thumbnail: "chibi_thumb.jpg"
    }, {
      source: "mugen.jpg",
      thumbnail: "mugen_thumb.jpg"
    }];

    var getContext = function() {
      if ($scope.currentShape) {
        return $scope.contexts[$scope.currentShape.shapeId];
      }
    };

    var getTool = function() {
      return $scope.currentShape.toolState.service;
    };

    var setTool = function(tool) {
      $scope.currentShape.toolState.service = tool;
    };

    var randomInt = function(radix) {
      return Math.round(Math.random() * (radix || 1000000));
    };

    $scope.onDrop = function(data, event) {
      console.log(data);
      var x = event.offsetX;
      var y = event.offsetY;
      var newId = randomInt();
      var newRect = angular.copy(RECT_TEMPLATE);
      newRect.shapeId = newId;
      newRect.width = 100;
      newRect.height = 100;
      newRect.x = x - 50;
      newRect.y = y - 50;
      newRect.href = '/assets/images/' + data['json/custom-object'];
      newRect.shapeType = 'imgshape';
      $scope.shapes[newId] = newRect;
    };

    $scope.onDragOver = function(data, event) {
      // console.log(data);
      // console.log(event);
    };

    $scope.addRect = function() {
      var newId = randomInt();
      var newRect = angular.copy(RECT_TEMPLATE);
      newRect.shapeId = newId;
      newRect.x = 2 * randomInt(100);
      newRect.y = 2 * randomInt(100);
      $scope.shapes[newId] = newRect;
    };

    $scope.removeSelected = function() {
      delete $scope.shapes[$scope.currentShape.shapeId];
    };

    $scope.selectShape = function(e) {
      if (e.target.dataset.id) {
        $scope.currentShape = $scope.shapes[e.target.dataset.id] || $scope.shapes[e.target.dataset.parent];
      }
    };

    $scope.mouseDown = function(e) {
      Mouse.mouseDown(e);
      if ($scope.currentShape && $scope.currentShape.shapeId &&
        (e.target.dataset.id != $scope.currentShape.shapeId) &&
        (e.target.dataset.parent != $scope.currentShape.shapeId)
      ) {
        getContext().hideTools();
      }
      $scope.selectShape(e);
      if (e.target.dataset.type === 'tool') {
        setTool(TOOLS[e.target.dataset.mode]);
      } else if (e.target.dataset.type) {
        setTool(Move);
      } else {
        return;
      }
      getTool().start($scope.currentShape);
    };

    $scope.mouseUp = function(e) {
      if (Mouse.state.moving) {
        getContext().hideTools();
        getTool().finish();
      }
      Mouse.mouseUp(e);
    };

    $scope.mouseMove = function(e) {
      Mouse.mouseMove(e);
      if (Mouse.state.down) {
        if (getTool()) {
          getTool().mouseMove();
          getContext().updateToolPositions();
        }
      }
    };

    $scope.mouseClick = function(e) {
      if (Mouse.click(e)) {
        $scope.selectShape(e);
        if (getContext()) {
          if (!e.target.dataset.type) {
            getContext().hideTools();
          }
          if (e.target.dataset.type === 'object') {
            if ($scope.currentShape.toolState.on) {
              getContext().hideTools();
            } else {
              getContext().showTools();
            }
          }
        }
      }
    };

  });