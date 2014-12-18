'use strict';

angular.module('svgTextEditor')
  .directive('rectshape', function() {
    return {
      restrict: 'A',
      templateUrl: 'app/directives/rectshape/rectshape.template.html',
      replace: false,
      priority: 0,
      scope: {
        viewmodel: '=',
        context: '='
      },
      controller: function($scope, $element, $attrs) {
        $scope.updateToolPositions = function() {
          $scope.viewmodel.resizeTool.x = $scope.viewmodel.x + $scope.viewmodel.width;
          $scope.viewmodel.resizeTool.y = $scope.viewmodel.y + $scope.viewmodel.height;
          $scope.viewmodel.rotateTool.cx = $scope.viewmodel.x + $scope.viewmodel.width / 2;
          $scope.viewmodel.rotateTool.cy = $scope.viewmodel.y + $scope.viewmodel.height + 20;
        };

        $scope.showTools = function() {
          $scope.viewmodel.toolState.on = true;
          $scope.viewmodel.toolState.visibility = 'visible';
          $scope.updateToolPositions();
        };
        
        $scope.hideTools = function() {
          $scope.viewmodel.toolState.on = false;
          $scope.viewmodel.toolState.visibility = 'hidden';
          $scope.viewmodel.toolState.mode = false;
        };

        $scope.context = $scope;
      }
    };
  });