(function() {

	var Camera = function Camera() {
		this.position = Soft3D.Util.Vector3.Zero()
		this.target = Soft3D.Util.Vector3.Zero()
	}

	Camera.prototype.setPosition = function(position) {
		this.position = position
	}

	Camera.prototype.getPosition = function() {
		return this.position
	}

	Camera.prototype.setTarget = function(target) {
		this.target = target
	}

	Camera.prototype.getTarget = function() {
		return this.target
	}

	module.exports = Camera
})()