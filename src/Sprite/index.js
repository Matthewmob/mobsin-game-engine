// MobSin.Sprite

/*
	All Sprites inherit properties from the _BaseSprite class.

	Once inherited, your Sprite is required to have:
		- Parameters that accept the Game instance, the Sprite name, the Sprite fill and the Sprite presets:
			(_game, name, fill, presets = {})
		- A '.bounds' property defining its boundaries (Using a MobSin.Shape).
		- A '.physBounds' property defining its actual boundaries in the game world taking into account scale, anchor points, transforms, etc.
		- A '_calculatePhysBounds()' method that sets its '_.physBounds' property.
		- A '_render(CanvasContext)' method that renders the Sprite to a given Canvas context.

	You can make other custom Sprites with your own shapes as boundaries and their own behaviours as long as they inherit from the _BaseSprite class and have the preceding required properties and methods.
*/
let Sprite = {
	_BaseSprite: require("./_Base"),
	Rectangle: require("./Rectangle"),
	Circle: require("./Circle")
};

module.exports = Sprite;