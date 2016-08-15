/** Display primitives
 */

////////////////////////////////////

const boxify = require('@offirmo/cli-toolbox/string/boxify')
const make_sparkline = require('@offirmo/cli-toolbox/string/fancy/make_sparkline')
const stylize_string = require('@offirmo/cli-toolbox/string/stylize')

////////////

const mechanics = require('../unit/src/mechanics')
const format_key = require('../unit/src/_incubator/offirmo-formatjs/lib/format-key')
const _i = format_key.format

////////////////////////////////////

function get_color_for_quality( quality) {
	switch (quality) {
		case 'common':
			return 'gray'
		case 'uncommon':
			return 'green'
		case 'rare':
			return 'blue'
		case 'epic':
			return 'magenta'
		case 'legendary':
			return 'red'
		case 'artifact':
			return 'yellow'
		default:
			throw new Error(`Unknown quality : ${quality}`)
	}
}

function colorize_according_quality(text, quality) {
	return stylize_string[get_color_for_quality(quality)](text)
}

function get_enhancement_indicator(weapon) {
	return make_sparkline([1, 2, 3, 4, 5, 6, 7, 8].slice(0, weapon.enhancement_level), {
		min: 0,
		max: 8,
		//style: 'fire'
	})
}

function display_weapon(weapon, intl) {
	const weapon_h = _i('weapon', weapon, intl)
	const quality_h = _i(`weapon_component|quality,${weapon.quality.hid}|main`, {}, intl)
	const rarity_label = _i('item_detail_rarity', {}, intl)
	const enhancement_label = _i('item_detail_upgrade_level', {}, intl)
	const damage = mechanics.get_weapon_damage(weapon)

	console.log(boxify(
`${stylize_string.bold(weapon_h)}
${rarity_label} ${colorize_according_quality(quality_h, weapon.quality.hid)}
${enhancement_label} ${ get_enhancement_indicator(weapon)}
${damage[0]} - ${damage[1]}`,
		{padding: 1, margin: 1, borderStyle: 'double', borderColor: get_color_for_quality(weapon.quality.hid)}
	))
}

////////////////////////////////////

module.exports = {
	display_weapon
}

////////////////////////////////////
