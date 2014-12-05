'use strict';

angular.module('svgTextEditor')
  .controller('MainCtrl', function ($scope) {
    $scope.sizes = [10,12,14,18,20,24,28,36,48,60];
    var fontSizeRemover = rangy.createCssClassApplier('fontsize-\\d{1,3}\\s*', {normalize: true});
    var fontFamilyRemover = rangy.createCssClassApplier('fontfamily-[^-]+\\s*', {normalize: true});
    $scope.fontSize = 10;
    $scope.fontDropdownOpened = false;
    $scope.fonts =  [
      {
        name: "Checkpoint",
        tag: "checkpoint"
      },
      {
        name: "Cochise",
        tag: "cochise"
      },
      {
        name: "Kaleidoskop",
        tag: "kaleidoskop"
      },
      {
        name: "Lifetime",
        tag: "lifetime"
      },
      {
        name: "Olympia-Heavy",
        tag: "olympiaheavy"
      },
      {
        name: "Olympia-MediumCond",
        tag: "olympiamediumcond"
      },
      {
        name: "Sunflower",
        tag: "sunflower"
      },
      {
        name: "TabascoTwin",
        tag: "tabascotwin"
      },
      {
        name: "Times",
        tag: "times"
      }
    ];

    $scope.toggleBold = function() {
      document.execCommand('bold', false, null);
    };

    $scope.toggleItalic = function() {
      document.execCommand('italic', false, null);
    };


    $scope.toggleSize = function() {
      var cssApplier = rangy.createCssClassApplier('fontsize-'+$scope.fontSize, {normalize: true});
      fontSizeRemover.undoToSelection();
      cssApplier.applyToSelection();
    };

    $scope.toggleFont = function(family) {
      console.log(family);
      var cssApplier = rangy.createCssClassApplier('fontfamily-'+family, {normalize: true});
      fontFamilyRemover.undoToSelection();
      cssApplier.applyToSelection();
    };

    $scope.toggleFontDropdown = function() {
      console.log('toggle drop');
      $scope.fontDropdownOpened = !$scope.fontDropdownOpened;
    };

    var convertSpan = function(item) {
      var attrs = {};
      if (item.className) {
        var classes = item.className.split(/\s+/);
        classes.forEach(function(c){
          var vals = c.split('-');
          attrs[vals[0]]=vals[1];
        });
      }
      attrs.text = item.innerHTML;
      // if (item.tagName.toLowerCase()==='br') {
      //   attrs.crlf = true;
      // }
      return attrs;
    };

    // var traverseSpans = function(node, blocks, line) {
    //   blocks = blocks || [];
    //   line = line || [];
    //   var toplevel = false;
    //   if (!blocks.length && !line.length) {
    //     toplevel = true;
    //   }
    //   var data = $(node).children();
    //   var dirty = false;
    //   data.each(function(index, item){
    //     if (item.tagName.toLowerCase()==='div') {
    //       blocks.push(line);
    //       dirty = false;
    //       line = [];
    //       traverseSpans(item, blocks, line);
    //       // return blocks;
    //     } else {
    //       line.push(convertSpan(item));
    //       dirty = true;
    //     }
    //   });
    //   if (toplevel) {
    //     blocks.push(line);  
    //   }
    //   // return [blocks, line];
    //   return blocks;
    // };

    var traverseSpans = function(node) {
      var out = [];
      var data = $(node).children();
      data.each(function(index, item){
        if ($(item).children().length > 0) {
          var more = traverseSpans(item);
          if (out.length>0){
            out[out.length-1].crlf = true;
          }
          out = out.concat(more);
        } else {
          var one = convertSpan(item);
          out.push(one);
        }
      });
      return out;
    };


    $scope.generateSVG = function() {
      var traverse = traverseSpans($('#editor'));

      console.log(traverse);
      // var data = $('#editor').children();
      // var spans = [];
      // traverse.forEach(function(elm, idx){
      //   console.log(elm);
      //   var attrs = {};
      //   if (elm.className) {
      //     var classes = elm.className.split(/\s+/);
      //     classes.forEach(function(c){
      //       var vals = c.split('-');
      //       attrs[vals[0]]=vals[1];
      //     });
      //   }
      //   attrs.text = elm.innerHTML;
      //   spans.push(attrs);
      // });
      // console.log(spans);
    };
  });


















