'use strict';

angular.module('svgTextEditor')
  .controller('MainCtrl', function($scope) {
    $scope.sizes = [10, 12, 14, 18, 20, 24, 28, 36, 48, 60, 68, 80, 100, 148];
    var fontSizeRemover = rangy.createCssClassApplier('fontsize_\\d{1,3}\\s*', {
      normalize: true
    });
    var fontFamilyRemover = rangy.createCssClassApplier('fontfamily_[^_]+\\s*', {
      normalize: true
    });
    $scope.fontDropdownOpened = false;


    $scope.fonts = [{
      name: "Checkpoint",
      tag: "checkpoint"
    }, {
      name: "Cochise",
      tag: "cochise"
    }, {
      name: "Kaleidoskop",
      tag: "kaleidoskop"
    }, {
      name: "Lifetime",
      tag: "lifetime"
    }, {
      name: "Olympia-Heavy",
      tag: "olympia-heavy"
    }, {
      name: "Olympia-MediumCond",
      tag: "olympia-mediumcond"
    }, {
      name: "Sunflower",
      tag: "sunflower"
    }, {
      name: "TabascoTwin",
      tag: "tabascotwin"
    }, {
      name: "Times",
      tag: "times"
    }];

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

    var convertSpan = function(item) {
      var attrs = {};
      if (item.className) {
        var classes = item.className.split(/\s+/);
        classes.forEach(function(c) {
          var vals = c.split('_');
          attrs[vals[0]] = vals[1];
        });
      }
      attrs.text = item.innerHTML.replace(/&nbsp;/g, " ");
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
      data.each(function(index, item) {
        if ($(item).children().length > 0) {
          var more = traverseSpans(item);
          if (out.length > 0) {
            out[out.length - 1].crlf = true;
          }
          out = out.concat(more);
        } else {
          var one = convertSpan(item);
          out.push(one);
        }
      });
      return out;
    };

    var attachPasteHandler = function() {
      $('#editor').on('paste', function(e) {
        // Hard to make this work, does not divide elements
        // console.log(e.target);
        // var text = e.originalEvent.clipboardData.getData('Text');
        // var prev = $(e.target);
        // console.log(text);
        // e.preventDefault();
        // prev.after('<span class=' + prev.attr('class') + '>' + text + '</span>');
        // console.log(e.originalEvent.clipboardData.getData('Text'));

        // var element = this;

        setTimeout(function() {

          // Remove all manual styling from paste
          // var text = $(element).html();
          // text = text.replace(/style="[^"]+"/g);
          // $(element).html(text);

          // Remove nested spans
          var multispan = $("#editor span > span").parent();
          var children = multispan.children();
          multispan.replaceWith(children);

          // Remove styles
          var styles = $("#editor [style]");
          styles.each(function(idx, elm) {
            console.log(elm);
            var fam,siz;
            var span = $(elm);
            var font = span.css('font-family');
            var size = span.css('font-size');
            if (font) {
              fam = font.replace(/'/g, '').split(" ")[0].toLowerCase();
            }
            if (size) {
              siz = parseInt(size, 10);
            }
            console.log(fam);
            console.log(siz);
            span.removeAttr('style');
            span.attr('class', "fontfamily_" + fam + " fontsize_" + siz);
          });
        }, 0);
      });
    };

    $scope.generateSVG = function() {
      var traverse = traverseSpans($('#editor'));
      $scope.lines = [];
      var lineTemplate = {
        data: {
          visible: false,
          dy: 60
        },
        spans: []
      };
      var line = angular.copy(lineTemplate);
      traverse.forEach(function(elm) {
        if (elm.text === "") {
          elm.text = "";
        }
        line.spans.push(elm);
        console.log(elm);
        if (elm.crlf) {
          $scope.lines.push(line);
          line = angular.copy(lineTemplate);
        }
      });
      if (line.spans.length > 0) {
        $scope.lines.push(line);
      }
      $scope.editMode = false;
      setTimeout($scope.fixTspans.bind(this), 0);
    };

    $scope.fixTspans = function() {
      console.log("fix!");
      $("#svgoutput").children().each(function(i, el) {
        var bbox = el.getBBox();
        if (i === 0) {
          $scope.lines[0].data.dy = bbox.height;
        }
        if (i > 0) {
          console.log(bbox);
          $scope.lines[i].data.dy = $scope.lines[i - 1].data.dy + bbox.height;
        }
        $scope.lines[i].data.visible = true;
      });
      $scope.$apply();
      console.log($scope.lines);
    };

    $scope.generateSVG();
    attachPasteHandler();

    $scope.editMode = true;

  });