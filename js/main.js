(function() {
	// Imports.
	var raf = require("raf")
	
	// Global object.
	var Soft3D = {}
	window.Soft3D = Soft3D

	// Utility functions.
	// Soft3D.Util = require("./util")
	// Use Babylon's Math library for now.
	// Will finish rewrite when I know WTF some
	// of the things do.
	Soft3D.Util = require("./vendor/babylon.math.js")

	// Objects.
	Soft3D.Camera = require("./camera")
	Soft3D.Mesh = require("./mesh")
	Soft3D.Device = require("./device")

	// DOM elements.
	var canvas = document.getElementsByTagName("canvas")[0]
	var rotationControls = document.querySelectorAll("input[type='range']")

	var mesh = new Soft3D.Mesh("Cube", 8)
	var camera = new Soft3D.Camera()
	var device = new Soft3D.Device(canvas)

	mesh.addVertex(new Soft3D.Util.Vector3(-1, 1, 1))
	mesh.addVertex(new Soft3D.Util.Vector3(1, 1, 1))
	mesh.addVertex(new Soft3D.Util.Vector3(-1, -1, 1))
	mesh.addVertex(new Soft3D.Util.Vector3(-1, -1, -1))
	mesh.addVertex(new Soft3D.Util.Vector3(-1, 1, -1))
	mesh.addVertex(new Soft3D.Util.Vector3(1, 1, -1))
	mesh.addVertex(new Soft3D.Util.Vector3(1, -1, 1))
	mesh.addVertex(new Soft3D.Util.Vector3(1, -1, -1))

	camera.setPosition(new Soft3D.Util.Vector3(0, 0, 10))
	camera.setTarget(new Soft3D.Util.Vector3.Zero())

	raf(canvas)
		.on("data", function() {
			device.clear()
			mesh.getRotation().x = rotationControls[0].value
			mesh.getRotation().y = rotationControls[1].value
			mesh.getRotation().z = rotationControls[2].value

			// Perform matrix operations.
			device.render(camera, [mesh])

			// Drop back buffer into front buffer.
			device.present()
		})
})()