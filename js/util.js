// Not used for now.
// I should wait until I'm
// not on holidays before
// writing any more code.
(function() {

	// Matrices.
	var Matrix = (function() {
		var MatrixType = Float32Array || Array
		return function() {
			this.m = new MatrixType(16);
			[].push.apply(this.m, arguments)
		}
	})()

	Matrix.prototype.multiply = function(other) {
		var newMatrix = new Matrix()
		var result = newMatrix.m
		var offset = 0

		// Shamelessly stolen from Babylon's Math library.
		// A lof of typing that I didn't want to redo.
		// TODO: Rejig it.
		result[offset] = this.m[0] * other.m[0] + this.m[1] * other.m[4] + this.m[2] * other.m[8] + this.m[3] * other.m[12];
        result[offset + 1] = this.m[0] * other.m[1] + this.m[1] * other.m[5] + this.m[2] * other.m[9] + this.m[3] * other.m[13];
        result[offset + 2] = this.m[0] * other.m[2] + this.m[1] * other.m[6] + this.m[2] * other.m[10] + this.m[3] * other.m[14];
        result[offset + 3] = this.m[0] * other.m[3] + this.m[1] * other.m[7] + this.m[2] * other.m[11] + this.m[3] * other.m[15];

        result[offset + 4] = this.m[4] * other.m[0] + this.m[5] * other.m[4] + this.m[6] * other.m[8] + this.m[7] * other.m[12];
        result[offset + 5] = this.m[4] * other.m[1] + this.m[5] * other.m[5] + this.m[6] * other.m[9] + this.m[7] * other.m[13];
        result[offset + 6] = this.m[4] * other.m[2] + this.m[5] * other.m[6] + this.m[6] * other.m[10] + this.m[7] * other.m[14];
        result[offset + 7] = this.m[4] * other.m[3] + this.m[5] * other.m[7] + this.m[6] * other.m[11] + this.m[7] * other.m[15];

        result[offset + 8] = this.m[8] * other.m[0] + this.m[9] * other.m[4] + this.m[10] * other.m[8] + this.m[11] * other.m[12];
        result[offset + 9] = this.m[8] * other.m[1] + this.m[9] * other.m[5] + this.m[10] * other.m[9] + this.m[11] * other.m[13];
        result[offset + 10] = this.m[8] * other.m[2] + this.m[9] * other.m[6] + this.m[10] * other.m[10] + this.m[11] * other.m[14];
        result[offset + 11] = this.m[8] * other.m[3] + this.m[9] * other.m[7] + this.m[10] * other.m[11] + this.m[11] * other.m[15];

        result[offset + 12] = this.m[12] * other.m[0] + this.m[13] * other.m[4] + this.m[14] * other.m[8] + this.m[15] * other.m[12];
        result[offset + 13] = this.m[12] * other.m[1] + this.m[13] * other.m[5] + this.m[14] * other.m[9] + this.m[15] * other.m[13];
        result[offset + 14] = this.m[12] * other.m[2] + this.m[13] * other.m[6] + this.m[14] * other.m[10] + this.m[15] * other.m[14];
        result[offset + 15] = this.m[12] * other.m[3] + this.m[13] * other.m[7] + this.m[14] * other.m[11] + this.m[15] * other.m[15];

		return newMatrix
	}

	Matrix.LookAtLH = function(eye, target, up) {
		var x = Vector3.Zero()
		var y = Vector3.Zero()
		var z = Vector3.Zero()

		z = target.subtract(eye)
		z.normalise()

		x = Vector3.Cross(up, z)
		x.normalise()

		y = Vector3.Cross(z, x)
		y.normalise()

		// Eye angles.
		var ex = -Vector3.Dot(x, eye)
		var ey = -Vector3.Dot(y, eye)
		var ez = -Vector3.Dot(z, eye)		

		return new Matrix(x.x, y.x, z.x, 0,
						  x.y, y.y, z.y, 0,
						  x.z, x.y, x.z, 0,
						  ex, ey, ez, 1)
	}

	Matrix.PerspectiveFovLH = function(fov, aspect, znear, zfar) {
		var matrix = Matrix.Zero()
		var tan = 1 / Math.tan(fov * .5)
		matrix.m[0] = tan / aspect
		matrix.m[1] = matrix.m[2] = matrix.m[3] = 0
		matrix.m[5] = tan
		matrix.m[4] = matrix.m[6] = matrix.m[7] = 0
		matrix.m[8] = matrix.m[9] = 0
		matrix.m[10] = -zfar / (znear - zfar)
		matrix.m[11] = 1
		matrix.m[12] = matrix.m[13] = matrix.m[15] = 0
		matrix.m[14] = (znear * zfar) / (znear - zfar)
		return matrix
	}

	Matrix.RotationYawPitchRoll = function(yaw, pitch, roll) {
		var result = new Matrix()
		var halfRoll = roll * .5
		var halfPitch = pitch * .5
		var halfYaw = pitch * .5
		var sinRoll = Math.sin(halfRoll)
		var cosRoll = Math.cos(halfRoll)
		var sinPitch = Math.sin(halfPitch)
		var cosPitch = Math.cos(halfPitch)
		var sinYaw = Math.sin(halfYaw)
		var cosYaw = Math.cos(halfYaw)



		return result
	}

	Matrix.Translation = function(x, y, z) {
		var result = Matrix.Indentity()
		result.m[12] = x
		result.m[13] = y
		result.m[14] = z
		return result
	}

	Matrix.Zero = function() {
		return new Matrix(0, 0, 0, 0,
						  0, 0, 0, 0,
						  0, 0, 0, 0,
						  0, 0, 0, 0)
	}

	Matrix.Indentity = function() {
		return new Matrix(1, 0, 0, 0,
						  0, 1, 0, 0,
						  0, 0, 1, 0,
						  0, 0, 0, 1)		
	}

	// Vector 2.
	var Vector2 = function(x, y) {
		this.x = x
		this.y = y
	}

	// Vector 3.
	var Vector3 = function(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	Vector3.prototype.length = function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))
	}

	Vector3.prototype.subtract = function(vector) {
		return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z)
	}

	Vector3.prototype.normalise = function() {
		var length = this.length()

		var num = 1 / length

		this.x *= num
		this.y *= num
		this.z *= num
	}

	Vector3.Zero = function() {
		return new Vector3(0, 0, 0)
	}

	Vector3.Up = function() {
		return new Vector3(0, 1, 0)
	}

	Vector3.Cross = function(a, b) {
		var result = Vector3.Zero()
		result.x = a.y * b.z - a.z * b.y
		result.y = a.z * b.x - a.x * b.z
		result.z = a.x * b.y - a.y * b.x
		return result
	}

	Vector3.Dot = function(a, b) {
		return a.x * b.x + a.y + b.y + a.z * b.z
	}

	Vector3.TransformCoordinates = function(vector, transformation) {
		var result = Vector3.Zero()
		var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12]
		var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13]
		var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14]
		var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15]

		result.x = (x / w) || 0
		result.y = (y / w) || 0
		result.z = (z / w) || 0

		return result
	}

	var Colour4 = function(r, g, b, a) {
		this.r = r
		this.g = g
		this.b = b
		this.a = a
	}

	module.exports = {
		Matrix: Matrix,
		Vector2: Vector2,
		Vector3: Vector3,
		Colour4: Colour4
	}
})()
