// MobSin.game.input

module.exports = (_game) => {
	_game.input = {};
	_game.object.init(_game.input, "MobSin.system.input", {event: true}, false);
	_game.i = _game.input;
};