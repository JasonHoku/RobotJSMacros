var robot = require("robotjs");
const fs = require("fs");

//////////////////
// System Variables

let receivedStop = false;
let mouseArray = [];

fs.readFile("./data.json", "utf8", (err, data) => {
	if (err) {
		console.log(`Error reading file from disk: ${err}`);
	} else {
		//
		// Decided Which File To Save To

		const JSONData = JSON.parse(data);
		JSONData.writes += 1;

		// Utilize To Write

		fs.writeFile("./data.json", JSON.stringify(JSONData, null, 4), (err) => {
			if (err) {
				console.log(`Error writing file: ${err}`);
			}
			console.log("data.json File Updated To " + JSONData.writes);
		});

		// Updated

		const mouseEvents = require("global-mouse-events");

		mouseEvents.on("mousedown", (event) => {
			event.mouseDown = true;
			// console.log(event);
			mouseArray.push(event);
		});
		mouseEvents.on("mouseup", (event) => {
			event.mouseUp = true;
			// console.log(event);
			mouseArray.push(event);
		});
		("use strict");

		const ioHook = require("iohook");

		ioHook.on("keydown", (event) => {
			mouseArray.push(event);
			console.log(event); // { type: 'mousemove', x: 700, y: 400 }
			if (event.keycode === 88) {
				receivedStop = true;
			}
		});

		// Register and start hook
		ioHook.start();

		// Alternatively, pass true to start in DEBUG mode.
		ioHook.start(true);

		// False to disable DEBUG. Cleaner terminal output.
		ioHook.start(false);
		repeat();
		async function repeat() {
			if (!receivedStop) {
				if (
					JSON.stringify(robot.getMousePos()) !==
					JSON.stringify(mouseArray[mouseArray.length - 1])
				)
					mouseArray.push(robot.getMousePos());
				// console.log(mouseArray)
				console.log(mouseArray[mouseArray.length - 1]);

				fs.writeFile(
					"./saves/rec" + JSONData.writes + ".json",
					JSON.stringify(mouseArray, null, 4),
					(err) => {
						if (err) {
							console.log(`Error writing file: ${err}`);
						}
						console.log("Saved To Rec" + JSONData.writes);
					}
				);
			}
			setTimeout(() => {
				if (!receivedStop) {
					repeat();
				}
			}, 25);
		}
	}
});

// // Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++) {
//     y = height * Math.sin((twoPI * x) / width) + height;
//     robot.moveMouse(x, y);
// }

// // Keyboard
// // Type "Hello World" then press enter.
// var robot = require("robotjs");

// // Type "Hello World".
// robot.typeString("Hello World");

// // Press enter.
// robot.keyTap("enter");
// // Screen

// // Get pixel color under the mouse.
// var robot = require("robotjs");

// // Get mouse position.
// var mouse = robot.getMousePos();

// // Get pixel color in hex format.
// var hex = robot.getPixelColor(mouse.x, mouse.y);
// console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
