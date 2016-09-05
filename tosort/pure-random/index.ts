// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Adapted to be pure functions.

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntX(random: number, min: number, max: number) {
	return Math.floor(random * (max - min)) + min
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(random: number, min: number, max: number) {
	return Math.floor(random * (max - min + 1)) + min
}

// Returns a random integer between 0 (included) and max (excluded)
function getRandomIndex(random: number, length: number) {
	return Math.floor(random * length)
}

export {
getRandomIntX,
getRandomIntInclusive,
getRandomIndex,
}
