const Renderer = require("../Renderer.js");
const Colour = require("../../objects/Colour/");

/**
 * @classdesc
 * Wraps rendering logic for 2D Canvas rendering.
 *
 * @class Canvas
 * @memberof Whirl.render
 * @extends Whirl.render.Renderer
 *
 * @example
 * const game = Whirl.Game({
 * 	renderer: Whirl.render.Canvas
 * });
 */
class CanvasRenderer extends Renderer {
	getContext = (canvas) => {
		const canvasElement = document.querySelector(canvas || this._game.config.get("canvas"));

		if (!canvasElement) {
			this._game.debug.error(
				"Cannot find the given canvas element to render to.",
				"CanvasRenderer"
			);

			return {};
		}

		const canvasContext = canvasElement.getContext("2d");

		return {
			canvas: canvasElement,
			ctx: canvasContext,
		};
	};

	preRender(viewport) {
		const {canvas, ctx} = viewport.render;

		ctx.save();

		ctx.translate(viewport.bounds.x, viewport.bounds.y);

		if (viewport.clear) {
			ctx.clearRect(viewport.bounds.x, viewport.bounds.y, viewport.bounds.w, viewport.bounds.h);
		}
	}

	postRender(viewport) {
		const {canvas, ctx} = viewport.render;

		ctx.restore();
	}

	Sprite(viewport, sprite) {
		const {canvas, ctx} = viewport.render;

		ctx.save();

		ctx.globalAlpha = sprite.derived.alpha;

		if (sprite.fill instanceof Colour) {
			ctx.fillStyle = sprite.fill._data;

			ctx.fillRect(
				sprite.derived.bounds.x,
				sprite.derived.bounds.y,
				sprite.derived.bounds.w,
				sprite.derived.bounds.h
			);
		}

		ctx.restore();
	}
}

module.exports = CanvasRenderer;
