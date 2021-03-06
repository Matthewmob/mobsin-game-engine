/**
 * @classdesc
 * Abstract class that all objects that exist in the game instance must inherit from.
 *
 * Holds an objects' unique ID, the game instance it belongs to and other such meta-data common to all objects that exist within the game instance.
 *
 * Objects that do not inherit from the Base class cannot be added to any part of the game instance including the {@link Whirl.Game.ObjectManager|Object Manager}, {@link Whirl.Stage|Stage} or {@link Whirl.Container|Container} objects.
 *
 * @class Base
 * @memberof Whirl
 * @abstract
 *
 * @param {Whirl.Game} game Game instance this object belongs to and should be managed by.
 *
 * @example
 * class MyObject extends Whirl.Base {
 * 	constructor(game) {
 * 		super(game);
 * 	}
 * }
 */
class Base {
	/**
	 * Game instance this object belongs to.
	 *
	 * @memberof Whirl.Base#
	 * @type {Whirl.Game}
	 * @readonly
	 */
	game;

	/**
	 * ID assigned to this object that distinguishes it from all other items in the global store.
	 *
	 * This value is guarunteed to be unique amongst all other objects that exist in the same game instance.
	 *
	 * @memberof Whirl.Base#
	 * @type {number}
	 * @readonly
	 *
	 * @see Whirl.Game.ObjectManager
	 */
	_id;

	/**
	 * Flag to indicate whether this object, though existing in the game instance, should actively participate in updates and rendering.
	 *
	 * @memberof Whirl.Base#
	 * @type {boolean}
	 * @default true
	 */
	active = true;

	/**
	 * Store arbitrary data related to this object.
	 *
	 * You can use this object to store any custom data whilst being assured to not experience any namespace conflicts.
	 *
	 * This object is persisted during serialisation to JSON and gets sent along with the object over the network, thus it should be [JSON serializable to avoid malformed data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description).
	 *
	 * @memberof Whirl.Base#
	 * @type {object}
	 *
	 * @example
	 * MyPlayer.data.health = 100;
	 * MyPlayer.data.speed = 5;
	 *
	 * @example
	 * MyPlayer.data = {
	 * 	...MyPlayer.data,
	 *
	 * 	health: 100,
	 * 	speed: 5
	 * };
	 */
	data = {};

	constructor(game) {
		this.game = game;

		game.object.add(this);
	}

	/**
	 * Destroy this object and remove all references to it from the game instance.
	 *
	 * Object destruction can be an expensive operation, and you're typically better off simply removing it from the Stage or Viewport it belongs to or by setting its `active` property to `false`, instead.
	 *
	 * You should also be careful about the timings of *when* you destroy an object. Getting rid of an object in the middle of the update or physics loop may cause unexpected behaviour and errors. Ideally, you should destroy an object in the [`willUpdate` step of the game loop]{@link Whirl.Game#event:willUpdate}.
	 *
	 * @method Whirl.Base#destroy
	 *
	 * @returns {this} The object that was destroyed.
	 */
	destroy() {
		return this.game.object._destroy(this);
	}

	/**
	 * Method to be overridden that is called internally by the [update manager](@link Whirl.Game.UpdateManager).
	 *
	 * Use this method to execute logic that you want executed each time a game update tick occurs.
	 *
	 * @ignore
	 * @abstract
	 * @method Whirl.Base#update
	 *
	 * @example
	 * class MyObject extends Whirl.Base {
	 * 	health = 5;
	 *
	 * 	...
	 *
	 * 	update() {
	 * 		this.health += 5;
	 * 	}
	 * }
	 */
	update() {}

	/**
	 * Method to be overriden that is called internally by the render manager.
	 *
	 * Use this method to perform rendering-related logic that you want executed each a game render tick occurs.
	 *
	 * @ignore
	 * @abstract
	 * @method Whirl.Base#render
	 */
	render() {}
}

export default Base;
