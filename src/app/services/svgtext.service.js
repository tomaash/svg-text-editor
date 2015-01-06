'use strict';

angular.module('svgTextEditor')
	.factory('SvgText', function() {
		var FONT_SIZES = [10, 12, 14, 18, 20, 24, 28, 36, 48, 60, 68, 80, 100, 148];

		var FONT_FACES = [{
			name: "Checkpoint",
			tag: "checkpoint",
			family: "Checkpoint Regular"
		}, {
			name: "Cochise",
			tag: "cochise",
			family: "Cochise Regular"
		}, {
			name: "Kaleidoskop",
			tag: "kaleidoskop",
			family: "Kaleidoskop Regular"
		}, {
			name: "Lifetime",
			tag: "lifetime",
			family: "Lifetime Regular"
		}, {
			name: "Olympia-Heavy",
			tag: "olympia-heavy",
			family: "Olympia-Heavy Regular"
		}, {
			name: "Olympia-MediumCond",
			tag: "olympia-mediumcond",
			family: "Olympia-MediumCond Regular"
		}, {
			name: "Sunflower",
			tag: "sunflower",
			family: "Sunflower Regular"
		}, {
			name: "TabascoTwin",
			tag: "tabascotwin",
			family: "TabascoTwin Regular"
		}, {
			name: "Times",
			tag: "times",
			family: "Times"
		}];

		var fontFaceHash = {};
		var fontFaceHashReverse = {};
		FONT_FACES.forEach(function(font) {
			fontFaceHash[font.tag] = font.family;
			fontFaceHashReverse[font.family] = font.tag;
		});

		var attachPasteHandler = function(elm) {
			elm.on('paste', function() {
				setTimeout(function() {

					// Remove nested spans
					var multispan = elm.find("span > span").parent();
					var children = multispan.children();
					multispan.replaceWith(children);

					// Remove styles
					var styles = elm.find("[style]");
					styles.each(function(idx, elm) {
						var fam, siz;
						var span = $(elm);
						var font = span.css('font-family');
						var size = span.css('font-size');
						if (font) {
							fam = font.replace(/'/g, '').split(" ")[0].toLowerCase();
						}
						if (size) {
							siz = parseInt(size, 10);
						}
						span.removeAttr('style');
						span.attr('class', "fontfamily_" + fam + " fontsize_" + siz);
					});
				}, 0);
			});
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
			return attrs;
		};

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

		var generateLines = function(traverse) {
			var lines = [];
			var lineSpacing = 15;
			var lineTemplate = {
				data: {
					visible: false,
					dy: 0
				},
				spans: []
			};
			var line = angular.copy(lineTemplate);
			var totalOffset = -lineSpacing;
			var currentOffset = 0;

			function nextLine() {
				totalOffset += currentOffset + lineSpacing;
				currentOffset = 0;
				line.data.dy = totalOffset;
				lines.push(line);
			}

			traverse.forEach(function(elm) {
				if (elm.text === "") {
					elm.text = "";
				}
				currentOffset = Math.max(currentOffset, elm.fontsize);
				line.spans.push(elm);
				if (elm.crlf) {
					nextLine();
					line = angular.copy(lineTemplate);
				}
			});
			if (line.spans.length > 0) {
				nextLine();
			}
			return lines;
		};

		var generateSVG = function(editor) {
			var traverse = traverseSpans(editor);
			var lines = generateLines(traverse);
			var svgString = "";
			lines.forEach(function(line) {
				svgString += '<text xml:space="preserve" y="' + line.data.dy + '" x="0">';
				line.spans.forEach(function(span) {
					svgString += '<tspan style="font-family:\'' + fontFaceHash[span.fontfamily] +
						'\';font-size:' + span.fontsize + '">' + span.text + '</tspan>';
				});
				svgString += '</text>';
			});
			return svgString;
		};

		return {
			attachPasteHandler: attachPasteHandler,
			generateSVG: generateSVG,
			FONT_FACES: FONT_FACES,
			FONT_SIZES: FONT_SIZES
		};
	});