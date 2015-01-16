'use strict';

angular.module('svgTextEditor')
	.factory('SvgText', function() {
		var FONT_SIZES = [10, 12, 14, 18, 20, 24, 28, 36, 48, 60, 68, 80, 100, 148];

		var svgCanvas;

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

		var COLORS = [{
			"color": "rgb(255,0,0)",
			"name": "All-American Red 31",
			"borderColor": "black"
		}, {
			"color": "rgb(237,194,125)",
			"name": "Bamboo Beige No. 47",
			"borderColor": "black"
		}, {
			"color": "rgb(0,0,0)",
			"name": "Black No. 3",
			"borderColor": "black"
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
		}, {
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
		}, {
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
		}, {
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
		}, {
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
		}];

		var fontFaceHash = {};
		var fontFaceHashReverse = {};
		var colorHash = {};
		var colorHashReverse = {};

		FONT_FACES.forEach(function(font) {
			fontFaceHash[font.tag] = font.family;
			fontFaceHashReverse[font.family] = font.tag;
		});

		COLORS.forEach(function(color, index) {
			color.tag = index + 1;
			colorHash[color.tag + ""] = color;
			colorHashReverse[color.color] = color;
		});

		function hexToRgb(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? 'rgb(' + 
				parseInt(result[1],16) + ',' + 
				parseInt(result[2],16) + ',' + 
				parseInt(result[3],16) + ')' : null;
		}

		var colorObjectLookup = function(value) {
			if (!value) {
				return null;
			}
			value = value.replace(/\s/g,'');
			var valueRgb = hexToRgb(value);
			var color = colorHashReverse[valueRgb || value];
			if (color) {
				return color;
			} else {
				console.warn('Cannot lookup color ' + value);
				return null;
			}
		};

		var setSvgCanvas = function(object) {
			svgCanvas = object;
		};

		var stylesToClasses = function(idx, elm) {
			var familyTag, sizeTag, colorTag, strokeTag, widthTag;
			var span = $(elm);
			var font = span.css('font-family');
			var size = span.css('font-size');
			var color = span.css('color');
			var stroke = span.css('-webkit-text-stroke-color');
			var width = span.css('-webkit-text-stroke-width');
			span.removeAttr('style');
			if (font) {
				familyTag = font.replace(/'/g, '').split(" ")[0].toLowerCase();
				span.addClass('fontfamily_' + familyTag);
			}
			if (size) {
				sizeTag = parseInt(size, 10);
				span.addClass('fontsize_' + sizeTag);
			}
			if (width) {
				widthTag = parseInt(width, 10);
				span.addClass('fontstrokewidth_' + widthTag);
			}
			if (color) {
				colorTag = colorObjectLookup(color);
				if (colorTag) {
					span.addClass('fontcolor_' + colorTag.tag);		
				}
			}
			if (stroke) {
				strokeTag = colorObjectLookup(stroke);
				if (strokeTag) {
					span.addClass('fontstrokecolor_' + strokeTag.tag);		
				}
			}
		};

		var attachPasteHandler = function(elm) {
			elm.on('paste', function() {
				setTimeout(function() {
					// Remove nested spans
					var multispan = elm.find("span > span").parent();
					var children = multispan.children();
					multispan.replaceWith(children);

					// Remove styles
					var styles = elm.find("[style]");
					styles.each(stylesToClasses);
				}, 0);
			});
		};

		var convertSpan = function(item) {
			// var defaultColorTag = 3;
			// var defaultWidth = 0;
			// var defaultSize = 20;
			// var defaultFamily = 'times';
			var attrs = {
				fontfamily: 'times',
				fontsize: '20',
				fontcolor: 3,
				fontstrokecolor: 3,
				fontstrokewidth: 0
			};
			if (item.className.split) {
				// Conversion from HTML
				var classes = item.className.split(/\s+/);
				classes.forEach(function(c) {
					var vals = c.split('_');
					attrs[vals[0]] = vals[1] || attrs[vals[0]];
				});
			} else if (item) {
				// Conversion from SVG
				attrs.fontfamily = fontFaceHashReverse[item.getAttribute('font-family')] || attrs.fontfamily;
				attrs.fontsize = item.getAttribute('font-size') || attrs.fontsize;
				var fillColor = colorObjectLookup(item.getAttribute('fill'));
				var strokeColor = colorObjectLookup(item.getAttribute('stroke'));
				attrs.fontcolor = fillColor ? fillColor.tag : attrs.fontcolor;
				attrs.fontstrokecolor = strokeColor ? strokeColor.tag : attrs.fontstrokecolor;
				attrs.fontstrokewidth = item.getAttribute('stroke-width') || attrs.fontstrokewidth;
			}
			attrs.text = item.innerHTML.replace(/&nbsp;/g, " ");
			return attrs;
		};

		var readAlignClass = function(item) {
			var svgcls = item.getAttribute('text-anchor');
			if (svgcls) {
				return svgcls;
			}
			var cls = item.getAttribute('class');
			var align;
			if (cls) {
				var m = cls.match(/align_\S+/);
				align = m && m[0]; 	
			}
			if (align) {
				var words = align.split('_');
				return words[1];
			}
			return null;
		};

		var traverseSpans = function(node) {
			var out = [];
			var data = $(node).children();
			var previousAlign = null;
			data.each(function(index, item) {
				if ($(item).children().length > 0) {
					var more = traverseSpans(item);
					// After return from recursion, we should mark new line
					var dataSpan; 
					if (out.length > 0) {
						dataSpan = out[out.length - 1];
						dataSpan.crlf = true;
						// Align is retained from last cycle
						if (previousAlign) {
							dataSpan.align = previousAlign;
						}
					}
					previousAlign = readAlignClass(item);
					out = out.concat(more);
				} else {
					var one = convertSpan(item);
					out.push(one);
				}
			});
			// Set align to last output element if present
			if (previousAlign) {
				out[out.length - 1].align = previousAlign;
			}
			return out;
		};

		var generateLinesFromTraverse = function(traverse) {
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
			var currentOffset = 0;

			function nextLine(last) {
				if (last.align) {
					line.data.align = last.align;					
				}
				line.data.dy = currentOffset + lineSpacing;
				currentOffset = 0;
				lines.push(line);
			}

			traverse.forEach(function(elm) {
				if (elm.text === "") {
					elm.text = "";
				}
				var fontSize = parseInt(elm.fontsize);

				if (fontSize) {
					currentOffset = Math.max(currentOffset, fontSize);
				} else {
					console.warn(elm);
				}
				line.spans.push(elm);
				if (elm.crlf) {
					nextLine(elm);
					line = angular.copy(lineTemplate);
				}
			});
			if (line.spans.length > 0) {
				nextLine(line.spans[line.spans.length-1]);
			}
			return lines;
		};

		var generateLines = function(editor) {
			var traverse = traverseSpans(editor);
			var lines = generateLinesFromTraverse(traverse);
			return lines;
		};

		var nextId = function() {
			if (svgCanvas) {
				return svgCanvas.getCurrentDrawing().getNextId();
			} else {
				// console.warn('svgCanvas not set, generating random nextId!');
				return Math.round(Math.random() * 1000);
			}

		};

		var generateAlignString = function(align, html) {
			if (!align) {
				return '';
			}
			if (html) {
				return 'class="align_'+align+'"';
			} else {
				return 'text-anchor="'+align+'"';
			}
		};

		var computeAlignOffset = function(align, width) {
			var offset = 0;
			if (width) {
				if (align === 'end') {
					offset = width;
				} else if (align === 'middle') {
					offset = (width/2);
				}
			}
			return offset;
		};

		var linesToSVG = function(lines, x, alignWidth) {
			var svgString = "";
			lines.forEach(function(line) {
				var align = line.data.align;
				var offset = x + computeAlignOffset(align, alignWidth);
				// Do not use anchor when alignWidth unknown
				var anchorString = generateAlignString(alignWidth && align);
				svgString += '<tspan id="' + nextId() + '"xml:space="preserve" dy="' + line.data.dy + '" x="' + offset + '"'+anchorString+'>';
				line.spans.forEach(function(span) {
					svgString += '<tspan id="' + nextId();
					svgString += '" font-family="' + fontFaceHash[span.fontfamily];
					svgString += '" font-size="' + span.fontsize;
					if (span.fontcolor) {
						svgString += '" fill="' + colorHash[span.fontcolor].color;
					}
					if (span.fontstrokecolor) {
						svgString += '" stroke="' + colorHash[span.fontstrokecolor].color;
					}
					svgString += '" stroke-width="' + span.fontstrokewidth;
					svgString += '">' + span.text + '</tspan>';
				});
				svgString += '</tspan>';
			});
			return svgString;
		};

		var linesToHTML = function(lines) {
			var htmlString = "";
			lines.forEach(function(line) {
				var align = generateAlignString(line.data.align, true);
				htmlString += '<div '+align+'>';
				line.spans.forEach(function(span) {
					htmlString += '<span class="fontfamily_' + span.fontfamily;
					htmlString += ' fontsize_' + span.fontsize;
					htmlString += ' fontcolor_' + span.fontcolor;
					htmlString += ' fontstrokecolor_' + span.fontstrokecolor;
					htmlString += ' fontstrokewidth_' + span.fontstrokewidth;
					htmlString += '">' + span.text + '</span>';
				});
				htmlString += '</div>';
			});
			return htmlString;
		};

		var generateSVG = function(editor) {
			var lines = generateLines(editor);
			var svgString = linesToSVG(lines, 10, 350);
			return svgString;
		};

		return {
			setSvgCanvas: setSvgCanvas,
			attachPasteHandler: attachPasteHandler,
			generateSVG: generateSVG,
			generateLines: generateLines,
			traverseSpans: traverseSpans,
			linesToSVG: linesToSVG,
			linesToHTML: linesToHTML,
			FONT_FACES: FONT_FACES,
			FONT_SIZES: FONT_SIZES,
			colorHash: colorHash,
			colorHashReverse: colorHashReverse,
			colorObjectLookup: colorObjectLookup
		};
	});