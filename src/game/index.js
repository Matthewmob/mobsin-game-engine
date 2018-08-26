// MobSin.game

function Game() {
	this.running = false;
	this.frameCount = 0;
	this.frameRate = 60;

	// game.object               | game.o
	require("./gameObject")(this);

	// game.assetManager         | game.a
	require("./assetManager")(this);

	// game.viewportManager      | game.v
	require("./viewportManager")(this);

	// game.pluginManager        | game.p

	let updater = require("./updater").bind(this);
	let renderer = require("./renderer").bind(this);
}

module.exports = Game;