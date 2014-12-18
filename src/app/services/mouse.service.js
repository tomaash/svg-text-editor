'use strict';

angular.module('svgTextEditor')
	.factory('Mouse', function($timeout) {

		var state = {
			down: false,
			moving: false,
			startX: 0,
			startY: 0,
			currentX: 0,
			currentY: 0,
			deltaX: 0,
			deltaY: 0
		};

		var setPosition = function(e, startFlag) {
			if (startFlag) {
				state.startX = e.offsetX;
				state.startY = e.offsetY;
			}
			state.currentX = e.offsetX;
			state.currentY = e.offsetY;
		};

		var updateDelta = function() {
      state.deltaX = state.currentX - state.startX;
      state.deltaY = state.currentY - state.startY;
    };

		var mouseDown = function(e) {
			if (e.target.dataset.type) {
				state.down = true;
				setPosition(e, true);
			}
		};

		var mouseUp = function(e) {
			if (state.moving) {
				state.noClick = true;
			}
			state.moving = false;
			state.down = false;
		};
		var mouseMove = function(e) {
			if (state.down) {
				state.moving = true;
				setPosition(e);
				updateDelta(e);
			}
		};
		var click = function(e) {
			if (state.noClick) {
				state.noClick = false;
				return false;
			}
			return true;
		};

		return {
			state: state,
			mouseDown: mouseDown,
			mouseUp: mouseUp,
			mouseMove: mouseMove,
			click: click
		};

	});