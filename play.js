// Module List
var robot = require("robotjs");
const fs = require("fs");
const ioHook = require('iohook');


//////////////////
// User Default Variables

let recVar = "rec27"
let timerVar = 1
let repeatVar = false


//////////////////
// Input CLI Variables
//
// process.argv.forEach(function (val, index, array) {
// 	console.log(index + ': ' + val);

// });
console.log(process.argv[2])
recVar = "rec" + process.argv[2]
repeatVar = process.argv[3]

//////////////////
// System Variables

let receivedStop = false
let counterVar = 0




//////////////////
// Stop Listener
ioHook.on('keydown', (event) => {
	// console.log(event)
	if (event.keycode == 88) {
		receivedStop = true
	}
	if (event.keycode == 87) {
		console.log(receivedStop)
	}
});

ioHook.start();



//////////////////
// Key Transpose For Windows

const keyNames = {
	0: '§',
	1: 'escape',
	2: '1',
	3: '2',
	4: '3',
	5: '4',
	6: '5',
	7: '6',
	8: '7',
	9: '8',
	10: '9',
	11: '0',
	12: '-',
	13: '=',
	14: 'backspace',
	15: 'tab',
	16: 'q',
	17: 'w',
	18: 'e',
	19: 'r',
	20: 't',
	21: 'y',
	22: 'u',
	23: 'i',
	24: 'o',
	25: 'p',
	26: '[',
	27: ']',
	28: 'enter',
	29: 'control',
	30: 'a',
	31: 's',
	32: 'd',
	33: 'f',
	34: 'g',
	35: 'h',
	36: 'j',
	37: 'k',
	38: 'l',
	39: ';',
	40: '\'',
	41: '`',
	42: 'shift',
	43: '\\',
	44: 'z',
	45: 'x',
	46: 'c',
	47: 'v',
	48: 'b',
	49: 'n',
	50: 'm',
	51: ',',
	52: '.',
	53: '/',
	54: 'shift',
	56: 'alt', // macos 'Left ⌥'
	57: 'space',
	58: 'CapsLock',
	59: 'F1',
	60: 'F2',
	61: 'F3',
	62: 'F4',
	63: 'F5',
	64: 'F6',
	65: 'F7',
	66: 'F8',
	67: 'F9',
	68: 'F10',
	87: 'F11',
	88: 'F12',
	61010: 'Insert',
	61011: 'Delete',
	60999: 'Home',
	61007: 'End',
	61001: 'Page Up',
	61009: 'Page Down',
	3639: 'printscreen',
	3653: 'Pause Break',
	3637: 'Num /',
	55: 'Num *',
	3612: 'Num Enter',
	3655: 'Num Home',
	3657: 'Num Page Up',
	3663: 'Num End',
	3665: 'Num Page Down',
	57420: 'Num Center 5',
	3677: 'Context Menu',
	61008: 'down',
	61005: 'right',
	61003: 'left',
	61000: 'up',
	57380: 'Media Stop',
	57360: 'Media Previous',
	57378: 'Media Play',
	57369: 'Media Next',
	57390: 'Volume Down',
	57392: 'Volume Up',
	57376: 'Volume Mute',
	3613: 'Right Ctrl',
	3640: 'Right Alt', // macos 'Right ⌥'
	3675: 'command', // macos 'Left ⌘'
	3676: 'command', // macos 'Right ⌘'
	57419: '←',
	57416: '↑',
	57424: '↓',
	57421: '→',
}


fs.readFile("./saves/" + recVar + ".json", "utf8", (err, data) => {
	if (err) {
		console.log(`Error reading file from disk: ${err}`);
	} else {

		//
		// Decided Which File To Save To
		// Move the mouse across the screen as a sine wave.

		const JSONData = JSON.parse(data);

		// console.log(JSONData)

		// Speed up the mouse.
		robot.setMouseDelay(1);
		robot.setKeyboardDelay(1);
		if (!receivedStop) {
			repeat(counterVar)
			async function repeat(counter) {

				if (!receivedStop) {
					console.log(counterVar)
					console.log(JSONData[counter] && JSONData[counter].keycode)
				}
				// console.log(keyNames[JSONData[counter].keycode])

				// Decide Repeat:

				if (repeatVar) {
					if (counterVar >= JSONData.length) {
						counterVar = 0
					}
				}

				if (counter < JSONData.length) {


					if (!receivedStop) {
						if (JSONData[counter].x) {
							robot.moveMouse(JSONData[counter].x, JSONData[counter].y)
							if (JSONData[counter].button) {
								if (JSONData[counter].button == 1) {
									if (JSONData[counter].mouseDown)
										robot.mouseToggle("down", "left")
									if (JSONData[counter].mouseUp)
										robot.mouseToggle("up", "left")
								}
								if (JSONData[counter].button == 2) {
									if (JSONData[counter].mouseDown)
										robot.mouseToggle("down", "right")
									if (JSONData[counter].mouseUp)
										robot.mouseToggle("up", "right")
								}
							}
						} else {
							// console.log(keyNames[JSONData[counter].keycode])
							// If Ctrl Is Held

							function decideKeyCombo() {
								// ToDo
								let keyArray = []
								let shiftIsDown = JSONData[counter].shiftKey
								let ctrlIsDown = JSONData[counter].ctrlKey
							}
							// ToDo

							if (JSONData[counter].ctrlKey) {
								robot.keyToggle("control", "down")
								robot.keyTap(keyNames[JSONData[counter].keycode], ["control"])
								robot.keyToggle("control", "up")
							} else {
								if (JSONData[counter].shiftKey) {
									robot.keyToggle("shift", "down")
									robot.keyTap(keyNames[JSONData[counter].keycode], ["shift"])
									robot.keyToggle("shift", "up")
								} else if (JSONData[counter].metaKey) {
									robot.keyToggle("command", "down")
									if (JSONData[counter].keycode !== 3675)
										robot.keyTap(keyNames[JSONData[counter].keycode], ["command"])
									robot.keyToggle("command", "up")
								} else
									if (keyNames[JSONData[counter].keycode] !== "up") {
										if (keyNames[JSONData[counter].keycode] !== "61000") {
											// console.log(keyNames[JSONData[counter].keycode])
											robot.keyTap(keyNames[JSONData[counter].keycode])
										}
									}
							}
						}
					}
				}


				//////////////////
				// Repeat Action Function With Next Data

				setTimeout(() => {
					counterVar++
					repeat(counterVar)
					// console.log(counterVar)
					// console.log(receivedStop)
					// console.log(JSONData[counterVar])
				}, timerVar);
			}
		}
	}
});
