////////////////////////////////////

type ItemQualityType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'

interface IItemQuality {
	hid: string
}

interface IItemQualityCreationParams {
	hid: string
}

////////////////////////////////////

export {
	ItemQualityType,
	IItemQuality,
	IItemQualityCreationParams
}

////////////////////////////////////
