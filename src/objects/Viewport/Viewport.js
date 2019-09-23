const Base = require("../Base/");
const {Rectangle, Point} = require("../../shapes/");
const getValue = require("../../lib/getValue.js");

class Viewport extends Base {
	_canvas;
	_ctx;
	bounds;
	scroll;
	clip;
	imageSmoothing;
	zoom;
	lerp;

	constructor(game, options = {}) {
		super(game);

		if (options.bounds instanceof Rectangle._class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(
				options.x || 0,
				options.y || 0,
				options.w || 0,
				options.h || 0,
			);
		}

		if (options.scroll instanceof Point._class) {
			this.scroll = options.scroll;
		} else {
			this.scroll = Point(
				options.scrollX || 0,
				options.scrollY || 0,
			);
		}

		this.clip = getValue(options, "clip", true);

		this.imageSmoothing = getValue(options, "imageSmoothing", true);

		this.zoom = getValue(options, "zoom", 1);

		this.lerp = getValue(options, "lerp", 1);

		this.setCanvas(options.canvas, options.resize);
	}

	setCanvas(selector = this._game.config.get("canvas"), resize = false) {
		const canvas = document.querySelector(selector);

		if (!canvas) {
			const {debug} = this._game;
			debug.error("Cannot find the given canvas element to render to.", "Viewport");
		}

		if (resize) {
			canvas.width = this.bounds.w;
			canvas.height = this.bounds.h;
		}

		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");

		return this;
	}

	scrollTo(px, py) {
		let x = px;
		let y = py;

		// (Point)
		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		this.scroll.x = x;
		this.scroll.y = y;
	}
}

module.exports = (...args) => new Viewport(...args);
module.exports._class = Viewport;
