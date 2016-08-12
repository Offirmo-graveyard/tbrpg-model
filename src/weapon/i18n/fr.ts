export default {

	weapon: function build_weapon_name(weapon: any, intl: any, libs: any, debug_id = '?') {
		const weapon_gender = libs.format('weapongender_' + weapon.base.id.slice(5), {})

		const parts = libs.format_multiple([
			weapon.base.msg_id,
			weapon.qualifier1.msg_id,
			weapon.qualifier2.msg_id
		], {gender: weapon_gender})

		parts[0] = libs._.capitalize(parts[0])

		return parts.join(' ')
	},

}
