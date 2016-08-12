export default {

	weapon: function build_weapon_name(weapon: any, intl: any, libs: any, debug_id = '?') {
		const weapon_gender = libs.format(`weapon_component|base,${weapon.base.hid}|gender`, {})

		const parts = libs.format_multiple([
			`weapon_component|base,${weapon.base.hid}|main`,
			`weapon_component|qualifier1,${weapon.qualifier1.hid}|main`,
			`weapon_component|qualifier2,${weapon.qualifier2.hid}|main`
		], {gender: weapon_gender})

		parts[0] = libs._.capitalize(parts[0])

		return parts.join(' ')
	},

}
