/**
 * @classdesc
 * Abstract manager class used internally to instantiate all game manager subtypes.
 * 
 * @abstract
 * @class Manager
 * @memberof Whirl.Game
 * @see Whirl.Game
 */
class Manager {
	_game;

	constructor(game) {
		this._game = game;
	}
}

module.exports = Manager;
