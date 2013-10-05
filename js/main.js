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
	window.BABYLON = require("./vendor/babylon.math.js")

	// Objects.
	Soft3D.Camera = require("./camera")
	Soft3D.Mesh = require("./mesh")
	Soft3D.Device = require("./device")

	var canvas = document.createElement("canvas")
	canvas.width = 400
	canvas.height = 400
	canvas.style.backgroundColor = "#000"

	var mesh = new Soft3D.Mesh("Cube", 8)
	var camera = new Soft3D.Camera()
	var device = new Soft3D.Device(canvas)

	mesh.addVertex(new BABYLON.Vector3(-1, 1, 1))
	mesh.addVertex(new BABYLON.Vector3(1, 1, 1))
	mesh.addVertex(new BABYLON.Vector3(-1, -1, 1))
	mesh.addVertex(new BABYLON.Vector3(-1, -1, -1))
	mesh.addVertex(new BABYLON.Vector3(-1, 1, -1))
	mesh.addVertex(new BABYLON.Vector3(1, 1, -1))
	mesh.addVertex(new BABYLON.Vector3(1, -1, 1))
	mesh.addVertex(new BABYLON.Vector3(1, -1, -1))

	camera.setPosition(new BABYLON.Vector3(0, 0, 10))
	camera.setTarget(new BABYLON.Vector3.Zero())

	document.addEventListener("DOMContentLoaded", function() {
		document.body.appendChild(canvas)
	})

	raf(canvas)
		.on("data", function() {
			device.clear()
			mesh.getRotation().x += .01
			mesh.getRotation().y += .01

			// Perform matrix operations.
			device.render(camera, [mesh])

			// Drop back buffer into front buffer.
			device.present()
		})
})()