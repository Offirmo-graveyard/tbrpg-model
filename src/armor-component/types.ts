
type ArmorComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality'

interface ArmorComponent {
	id: string
	i18n_key: string
	type: ArmorComponentType
	affinities?: any
}

export { ArmorComponentType, ArmorComponent }
