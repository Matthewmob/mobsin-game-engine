// Whirl.game.gameObject

let systems = require("../../systems");

module.exports = (_game) => {
	_game._globalIndex = 0;

	_game.object = {
		// Initialise a game object with standard properties that all objects in the game must have
		// Objects can optionally inherit various systems that extend their functionality
		init: (_obj, typeName, useSystems, store = true) => {
			_obj._id = _game.object.nextID();
			if (!_obj._type) {
				_obj._type = typeName;
			}

			_obj.data = {};
			_obj._systems = [];

			_game.object.attachSystem(_obj, useSystems);

			if (store) {
				_game.object.globalStore.push(_obj);
			}

			_game.event.emit("didInitObject", {
				object: _obj,
				useSystems: useSystems
			});

			return _obj;
		},
		attachSystem: (_obj, useSystems = {}) => {
			if (!_obj.hasOwnProperty("_systems")) {
				console.warn("Whirl | Object is not instantiated into a game instance and therefore cannot have game systems attached to it.");
				return false;
			}
			for (sys in useSystems) {
				if (useSystems[sys] && _obj._systems.indexOf(sys) === -1) {
					systems[sys](_game, _obj);
					_obj._systems.push(sys);
					continue;
				}
				console.warn(`Whirl | System "${sys}" has already been attached.`);
			}
			return true;
		},
		// Generate a new unique ID for a game object
		nextID: () => {
			return _game._globalIndex++;
		},
		// Retrieve objects from the global object store
		// Based on its given name
		getByName: (query) => {
			return _game.object.globalStore.filter((e) => e.name === query);
		},
		// Based on its internal ID
		getById: (query) => {
			return _game.object.globalStore.filter((e) => e._id === query);
		},
		// Based on its internal type
		getByType: (query) => {
			return _game.object.globalStore.filter((e) => e._type === query);
		},
		// Get all objects from the globalStore
		getAll: () => {
			return _game.object.globalStore;
		},
		// Remove an object from the global store based on its unique ID
		destroyById: (query) => {
			const searchObj = _game.object.getById(query)[0];
			if (!searchObj) {
				return false;
			}

			_game.object.globalStore = _game.object.globalStore.filter((e) => e._id !== searchObj._id);
			return searchObj;
		},
		globalStore: []
	};
};