// MobSin.game.assetManager

module.exports = (_game) => {
	function Asset(name, type, src) {
		_game.object.init(this, "MobSin.asset", ["eventSystem"]);

		// Mandatory presets
		this.name = name;
		this.type = type;
		this.src = src;

		this.data._loaded = false;

		// Attach data and properties based on asset type
		switch (this.type) {
			case "image": {
				this.img = new Image();
				this.img.addEventListener("load", () => {
					console.log("Loaded image: " + this.name);
				});
				this.img.src = this.src;
				break;
			}
			// audio
			// json
			// rawtext
		}
	}

	_game.assets = [];

	_game.assetManager = {
		// Provide either an object or an array of objects
		add: (assetList) => {
			if (typeof assetList == "object" && !Array.isArray(assetList)) {
				let newInd = _game.assets.push(
					new Asset(assetList.name, assetList.type, assetList.src)
				) - 1;
				return _game.assets[newInd];
			} else if (Array.isArray(assetList)) {
				for (let i = 0, n = assetList.length; i < assetList.length; i++) {
					_game.assetManager.add(assetList[i]);
				}
			}
		},
		get: (name) => {
			return _game.assets.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.assets;
		}
	};
	_game.a = _game.assetManager; // Alias to game.a
};