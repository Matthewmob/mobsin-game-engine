// MobSin.systems.event

module.exports = (_game, _obj) => {
	_obj.events = {
		_index: 0
	};

	_obj.event = {
		on: (name, func, once = false) => {
			func._id = _obj.events._index++;
			func._once = once ? once : false;
			if (_obj.events[name]) {
				_obj.events[name].push(func);
			} else {
				_obj.events[name] = [func];
			}

			return _obj;
		},
		onOnce: (name, func) => {
			_obj.event.on(name, func, true);

			return _obj;
		},
		emit: (name, data = {}) => {
			if (_obj.events[name]) {
				for (let i = 0; i < _obj.events[name].length; i++) {
					data._eventId = _obj.events[name][i]._id;
					_obj.events[name][i](data);

					if (_obj.events[name][i]._once) {
						_obj.event.removeById(name, _obj.events[name][i]._id);
						break;
					}
				}
			}
			
			return _obj;
		},
		// Remove a specific event listener by its ID
		// Takes the event name and the listener ID
		removeById: (name, id) => {
			_obj.events[name] = _obj.events[name].filter((evt) => evt._id != id);
						
			if (_obj.events[name].length == 0) { // If there are no more listeners
				delete _obj.events[name]; // Delete the event listeners property
			}

			return _obj;
		},
		// Remove all event listeners of the given name
		removeAll: (name) => {
			delete _obj.events[name];
		}
	};
};