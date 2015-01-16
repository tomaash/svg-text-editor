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
    var fontColorRemover = rangy.createCssClassApplier('\\s*fontcolor_\\d{1,3}\\s*', {
      normalize: true
    });
    var fontStrokeColorRemover = rangy.createCssClassApplier('\\s*fontstrokecolor_\\d{1,3}\\s*', {
      normalize: true
    });
    var fontStrokeWidthRemover = rangy.createCssClassApplier('\\s*fontstrokewidth_\\d{1,3}\\s*', {
      normalize: true
    });


    var editor = $('#editor');
    var output = $('#svgoutput');

    $scope.fontDropdownOpened = false;

    $scope.toggleBold = function() {
      document.execCommand('bold', false, null);
    };

    $scope.toggleItalic = function() {
      document.execCommand('italic', false, null);
    };

    $scope.toggleEditMode = function() {
      $scope.editMode = true;
      var lines = SvgText.generateLines(output);
      var htmlString = SvgText.linesToHTML(lines);
      $('#editor').html(htmlString);
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
      $scope.editMode = false;
      var lines = SvgText.generateLines(editor);
      var svgString = SvgText.linesToSVG(lines, 10);
      output.html(svgString);
      setTimeout(function() {
        var bbox = output[0].getBBox();
        console.log(bbox.width);
        svgString = SvgText.linesToSVG(lines, 10, bbox.width);
        output.html(svgString);
      }, 0);
    };

    $scope.selectColor = function(color) {
      var cssApplier = rangy.createCssClassApplier('fontcolor_' + color.tag, {
        normalize: true
      });
      fontColorRemover.undoToSelection();
      cssApplier.applyToSelection();
      // $scope.colorList.forEach(function(color, i) {
      //   console.log('.fontstrokecolor_' + (i + 1) + ' { -webkit-text-stroke-color: ' + color.color + ';}');
      // });
      // console.log($scope.colorList);
    };

    $scope.selectStrokeColor = function(color) {
      var cssApplier = rangy.createCssClassApplier('fontstrokecolor_' + color.tag, {
        normalize: true
      });
      fontStrokeColorRemover.undoToSelection();
      cssApplier.applyToSelection();
    };

    $scope.selectStrokeWidth = function(color) {
      var cssApplier = rangy.createCssClassApplier('fontstrokewidth_' + $scope.strokeWidth, {
        normalize: true
      });
      fontStrokeWidthRemover.undoToSelection();
      cssApplier.applyToSelection();
    };

    $scope.toggleAlign = function(align) {
      var sel = rangy.getSelection();
      console.log(sel);
      var elm = sel.focusNode.parentElement.parentElement;
      console.log(elm);
      var element = $(elm);
      element.removeClass();
      element.addClass('align_' + align);
      $('#editor')[0].focus();
    };


    SvgText.attachPasteHandler(editor);
    $scope.editMode = true;

    $scope.colorList = [{
        "color": "rgb(255,0,0)",
        "name": "All-American Red 31",
        "borderColor": "black",
        tag: 1,
      }, {
        "color": "rgb(237,194,125)",
        "name": "Bamboo Beige No. 47",
        "borderColor": "black",
        tag: 2,
      }, {
        "color": "rgb(0,0,0)",
        "name": "Black No. 3",
        "borderColor": "black",
        tag: 3,
      }, {
        "color": "rgb(255,0,77)",
        "name": "Brilliant Red No. 30",
        "borderColor": "black",
        tag: 4,
      }, {
        "color": "rgb(15,30,104)",
        "name": "Blueberry No. 72",
        "borderColor": "black"
      }, {
        "color": "rgb(255,194,0)",
        "name": "Brilliant Yellow No. 51",
        "borderColor": "black"
      }, {
        "color": "rgb(194,25,255)",
        "name": "Brilliant Purple No. 65",
        "borderColor": "black"
      }, {
        "color": "rgb(211,117,164)",
        "name": "Cameo Pink No. 37",
        "borderColor": "black"
      }, {
        "color": "rgb(120,15,186)",
        "name": "Cassis No. 69",
        "borderColor": "black"
      }, {
        "color": "rgb(0,158,103)",
        "name": "Cayman No. 16",
        "borderColor": "black"
      }, {
        "color": "rgb(179,80,54)",
        "name": "Copper No. 79",
        "borderColor": "black"
      },

      {
        "color": "rgb(150,152,151)",
        "name": "Flood Silver No. 81",
        "borderColor": "black"
      }, {
        "color": "rgb(167,134,81)",
        "name": "Gold No. 80",
        "borderColor": "black"
      }, {
        "color": "rgb(0,179,125)",
        "name": "Green Jade No. 20",
        "borderColor": "black"
      }, {
        "color": "rgb(153,112,140)",
        "name": "Heather No. 64",
        "borderColor": "black"
      }, {
        "color": "rgb(0,64,53)",
        "name": "Hunter No. 24",
        "borderColor": "black"
      }, {
        "color": "rgb(0,152,79)",
        "name": "Kelly Green No. 21",
        "borderColor": "black"
      }, {
        "color": "rgb(182,136,189)",
        "name": "Lavender No. 66",
        "borderColor": "black"
      }, {
        "color": "rgb(122,38,44)",
        "name": "Maroon No. 34",
        "borderColor": "black"
      }, {
        "color": "rgb(0,27,80)",
        "name": "Midnight Blue No. 17",
        "borderColor": "black"
      }, {
        "color": "rgb(164,217,206)",
        "name": "Mint No. 26",
        "borderColor": "black"
      },

      {
        "color": "rgb(140,117,181)",
        "name": "Pansy No. 70",
        "borderColor": "black"
      }, {
        "color": "rgb(226,56,45)",
        "name": "Poppy No. 90",
        "borderColor": "black"
      }, {
        "color": "rgb(0,174,239)",
        "name": "Process Blue No. 09",
        "borderColor": "black"
      }, {
        "color": "rgb(236,0,140)",
        "name": "Process Red No. 35",
        "borderColor": "black"
      }, {
        "color": "rgb(255,242,0)",
        "name": "Process Yellow No. 52",
        "borderColor": "black"
      }, {
        "color": "rgb(195,36,80)",
        "name": "Raspberry No. 32",
        "borderColor": "black"
      }, {
        "color": "rgb(89,58,150)",
        "name": "Royal Purple No. 7",
        "borderColor": "black"
      }, {
        "color": "rgb(247,156,133)",
        "name": "Salmon No. 27",
        "borderColor": "black"
      }, {
        "color": "rgb(0,75,140)",
        "name": "Sapphire No. 13",
        "borderColor": "black"
      }, {
        "color": "rgb(120,53,49)",
        "name": "Sepia Brown No. 41",
        "borderColor": "black"
      }, {
        "color": "rgb(150,152,151)",
        "name": "Silver No. 81",
        "borderColor": "black"
      },

      {
        "color": "rgb(185,173,155)",
        "name": "Smoke Gray No. 84",
        "borderColor": "black"
      }, {
        "color": "rgb(245,130,32)",
        "name": "Sunrise Red No. 33",
        "borderColor": "black"
      }, {
        "color": "rgb(0,95,169)",
        "name": "Super Blue No. 11",
        "borderColor": "black"
      }, {
        "color": "rgb(0,167,165)",
        "name": "Teal No. 19",
        "borderColor": "black"
      }, {
        "color": "rgb(129,56,66)",
        "name": "Vinyard No. 63",
        "borderColor": "black"
      }, {
        "color": "rgb(68,153,180)",
        "name": "Wedgewood Blue No. 07",
        "borderColor": "black"
      }, {
        "color": "rgb(255,255,255)",
        "name": "White",
        "borderColor": "black"
      }, {
        "color": "rgb(128,185,188)",
        "name": "Wisteria Blue No. 02",
        "borderColor": "black"
      }, {
        "color": "rgb(252,175,23)",
        "name": "Yellow Ochre No. 49",
        "borderColor": "black"
      },

      {
        "color": "rgb(0,166,82)",
        "name": "X9049",
        "borderColor": "black"
      }, {
        "color": "rgb(167,207,58)",
        "name": "X9047",
        "borderColor": "black"
      }, {
        "color": "rgb(237,22,81)",
        "name": "X9019",
        "borderColor": "black"
      }, {
        "color": "rgb(119,112,180)",
        "name": "X9093",
        "borderColor": "black"
      }, {
        "color": "rgb(255,221,0)",
        "name": "X9020",
        "borderColor": "black"
      }, {
        "color": "rgb(79,199,224)",
        "name": "X9028",
        "borderColor": "black"
      }
    ];
  });