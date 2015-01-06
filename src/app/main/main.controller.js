'use strict';

angular.module('svgTextEditor')
  .controller('MainCtrl', function($scope, SvgText) {

    $scope.SvgText = SvgText;
    
    var fontSizeRemover = rangy.createCssClassApplier('\\s*fontsize_\\d{1,3}\\s*', {
      normalize: true
    });
    var fontFamilyRemover = rangy.createCssClassApplier('\\s*fontfamily_[^_]+\\s*', {
      normalize: true
    });

    var editor = $('#editor');
    var output = $('#svgoutput');

    $scope.fontDropdownOpened = false;


    
    // $scope.sizes = [10, 12, 14, 18, 20, 24, 28, 36, 48, 60, 68, 80, 100, 148];
    
    // $scope.fonts = [{
    //   name: "Checkpoint",
    //   tag: "checkpoint"
    // }, {
    //   name: "Cochise",
    //   tag: "cochise"
    // }, {
    //   name: "Kaleidoskop",
    //   tag: "kaleidoskop"
    // }, {
    //   name: "Lifetime",
    //   tag: "lifetime"
    // }, {
    //   name: "Olympia-Heavy",
    //   tag: "olympia-heavy"
    // }, {
    //   name: "Olympia-MediumCond",
    //   tag: "olympia-mediumcond"
    // }, {
    //   name: "Sunflower",
    //   tag: "sunflower"
    // }, {
    //   name: "TabascoTwin",
    //   tag: "tabascotwin"
    // }, {
    //   name: "Times",
    //   tag: "times"
    // }];

    $scope.toggleBold = function() {
      document.execCommand('bold', false, null);
    };

    $scope.toggleItalic = function() {
      document.execCommand('italic', false, null);
    };

    $scope.toggleEditMode = function() {
      $scope.editMode = true;
    };

    $scope.toggleSize = function() {
      var cssApplier = rangy.createCssClassApplier('fontsize_' + $scope.fontSize, {
        normalize: true
      });
      fontSizeRemover.undoToSelection();
      cssApplier.applyToSelection();
      $scope.fontSize = null;
    };

    $scope.toggleFont = function(family) {
      console.log(family);
      var cssApplier = rangy.createCssClassApplier('fontfamily_' + family, {
        normalize: true
      });
      fontFamilyRemover.undoToSelection();
      cssApplier.applyToSelection();
    };

    $scope.toggleFontDropdown = function() {
      console.log('toggle drop');
      $scope.fontDropdownOpened = !$scope.fontDropdownOpened;
    };

    $scope.toggleViewMode = function() {
      var svgMarkup = SvgText.generateSVG(editor);
      output.html(svgMarkup);
      $scope.editMode = false;
    };

    SvgText.attachPasteHandler(editor);
    $scope.editMode = true;
  });























