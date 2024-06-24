/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				big: '50px'
			}
		}
	},
	plugins: [require('daisyui')], // eslint-disable-line @typescript-eslint/no-require-imports
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'], // eslint-disable-line @typescript-eslint/no-var-requires
					primary: '#17C3B2',
					secondary: '#7E78D2'
				}
			}
		]
	}
};
