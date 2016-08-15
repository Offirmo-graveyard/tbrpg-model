////////////////////////////////////

interface IConstHash {
	[k: string]: number
}

const quality_related_strength_bonus_at_generation: IConstHash = {
	common:      0,
	uncommon:    1,
	rare:        3,
	epic:        4,
	legendary:   5,
	artifact:    6
}

// actualized strength
// quality multipliers (see spreadsheet for calculation)
const quality_related_weapon_strength_multiplier: IConstHash = {
	common:      1,
	uncommon:   19,
	rare:       46,
	epic:       91,
	legendary: 182,
	artifact:  333
}

const quality_related_weapon_strength_spread: IConstHash = {
	common:      6,
	uncommon:    5,
	rare:        4,
	epic:        3,
	legendary:   2,
	artifact:    1
}

const weapon_enhancement_multiplier = 0.2

////////////////////////////////////

export {
	IConstHash,
	quality_related_strength_bonus_at_generation,
	quality_related_weapon_strength_multiplier,
	quality_related_weapon_strength_spread,
	weapon_enhancement_multiplier
}

////////////////////////////////////
