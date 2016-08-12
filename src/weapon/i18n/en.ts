export default {

	weapon: function build_weapon_name(weapon: any, intl: any, libs: any, debug_id = '?') {
		const parts = libs.format_multiple([
			weapon.qualifier2.msg_id,
			weapon.qualifier1.msg_id,
			weapon.base.msg_id
		], {})

		if (libs._s.startsWith(parts[0], 'of')) {
			var q2 = parts.shift()
			parts.push(q2)
		}

		return libs._s.words(parts.join(' ')).map(libs._s.capitalize).join(' ')
	}

}
