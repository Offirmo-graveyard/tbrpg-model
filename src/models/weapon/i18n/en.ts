export default {

	weapon: function build_weapon_name(weapon: any, intl: any, libs: any, debug_id = '?') {
		const parts = libs.format_multiple([
			`weapon_component|qualifier2,${weapon.qualifier2.hid}|main`,
			`weapon_component|qualifier1,${weapon.qualifier1.hid}|main`,
			`weapon_component|base,${weapon.base.hid}|main`,
		], {})

		if (libs._s.startsWith(parts[0], 'of')) {
			var q2 = parts.shift()
			parts.push(q2)
		}

		return libs._s.words(parts.join(' ')).map(libs._s.capitalize).join(' ')
	},

}
