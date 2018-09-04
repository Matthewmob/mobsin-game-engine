// MonSin.game.assetManager.Asset

function Asset(_game, name, type, src) {
	_game.object.init(this, "MobSin.asset", ["eventSystem"]);

	// Mandatory presets
	this.name = name;
	this.type = type;
	this.src = src;

	this.data._loaded = false;

	let startLoad = Date.now();

	// Attach data and properties based on asset type
	switch (this.type) {
		case "image": {
			this.img = new Image();
			this.img.addEventListener("load", () => {
				this.data._loaded = true;
				this.event.emit("didLoad", {
					asset: this,
					timeTaken: Date.now() - startLoad
				});
			});
			this.img.src = this.src;
			break;
		}
		case "audio": {
			this.audio = new Audio(this.src);
			this.audio.addEventListener("loadeddata", () => {
				this.data._loaded = true;
				this.event.emit("didLoad", {
					asset: this,
					timeTaken: Date.now() - startLoad
				});
			});
			break;
		}
		// json
		// rawtext
	}
}

module.exports = Asset;