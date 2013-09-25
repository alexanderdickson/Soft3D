(function() {
	var Mesh = function Mesh(name, verticesCount) {
		this.name = name
		this.vertices = Array(verticesCount)
		this.rotation = Soft3D.Util.Vector3.Zero()
		this.position = Soft3D.Util.Vector3.Zero()
	}

	Mesh.prototype.addVertex = function(vector) {
		this.vertices.push(vector)
	}

	Mesh.prototype.getVertices = function() {
		return this.vertices
	}

	Mesh.prototype.getRotation = function() {
		return this.rotation
	}

	Mesh.prototype.getPosition = function() {
		return this.position
	}

	module.exports = Mesh
})()
