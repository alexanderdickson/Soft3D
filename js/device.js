(function() {
	var Device = function Device(canvas) {
		// The rendering context.
		this.ctx = canvas.getContext("2d")
		// The canvas' back buffer.
		this.backBuffer = []
	}

	// Clear the drawing surface.
	Device.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
		this.backBuffer = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
	}

	// Flush the back buffer to the front buffer.
	Device.prototype.present = function() {
		this.ctx.putImageData(this.backBuffer, 0, 0)
	}

	// Put pixel in back buffer at X and Y coordinates.
	Device.prototype.putPixel = function(x, y, colour) {
		var existingContextData = this.backBuffer.data
		var index = (x + y * this.ctx.canvas.width) * 4
		existingContextData[index] = colour.r * 255
		existingContextData[index + 1] = colour.g * 255
		existingContextData[index + 2] = colour.b * 255
		existingContextData[index + 3] = colour.a * 255
	}

	Device.prototype.project = function(coords, transformationMatrix) {
		var point = Soft3D.Util.Vector3.TransformCoordinates.apply(this, arguments)
		var x = point.x * this.ctx.canvas.width + this.ctx.canvas.width / 2
		var y = point.y * this.ctx.canvas.height + this.ctx.canvas.height / 2
		return new Soft3D.Util.Vector2(x, y)
	}

	Device.prototype.drawPoint = function(point) {
		// Clip what's visible on screen.
		if (point.x >= 0 && point.y >= 0 && point.x < this.ctx.canvas.width && point.y < this.ctx.canvas.height) {
			this.putPixel(point.x, point.y, new Soft3D.Util.Colour4(1, 1, 0, 1))
		}
	}

	Device.prototype.render = function(camera, meshes) {
		var viewMatrix = Soft3D.Util.Matrix.LookAtLH(camera.getPosition(), camera.getTarget(), Soft3D.Util.Vector3.Up())
		var projectionMatrix = Soft3D.Util.Matrix.PerspectiveFovLH(.78, this.ctx.canvas.width / this.ctx.canvas.height, .01, 1)
		var project = this.project.bind(this)
		var drawPoint = this.drawPoint.bind(this)

		meshes.forEach(function(mesh) {
			var meshRotation = mesh.getRotation()
			var meshPosition = mesh.getPosition()
			var worldMatrix = Soft3D.Util.Matrix.RotationYawPitchRoll(
				meshRotation.y, meshRotation.x, meshRotation.z
				)
				.multiply(Soft3D.Util.Matrix.Translation(
					meshPosition.x, meshPosition.y, meshPosition.z
					))

			var transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix)
			mesh.getVertices().forEach(function(vertex) {
				var projectedPoint = project(vertex, transformMatrix)
				drawPoint(projectedPoint)
			})
		})
	}

	module.exports = Device
})()