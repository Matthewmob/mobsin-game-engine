// Whirl.input.mouse.setup

const setMouseElement = require("./setMouseElement.js");

// Abstraction: Set up "mouseClick" and "mouseMove" event listeners on given viewport
function setupViewportStandard(_game, viewport) {
	_game.input.registerMouseViewport(viewport, ["mouseClick", "mouseMove"]);
}

// Set up mouse inputs on existing and subsequent viewports
function setup(targetEl) {
	// Set the (default) element to listen for mouse events on
	setMouseElement.call(this, targetEl);

	// Set up mouse event listeners on all viewports
	this.viewportManager.getAll().forEach((e) => {
		setupViewportStandard(this, e);
	});

	// Listen for other viewports being created later and attach mouse events to them
	this.event.on("requestMouseEvents", (e) => {
		if (e.object._type === "Whirl.Viewport" && this.config.input) {
			setupViewportStandard(this, e.object);
		}
	});

	return this.input;
}

module.exports = setup;