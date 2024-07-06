/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontSize: {
				big: "50px"
			},
			colors: {
				customlav: "#F7F5FD",
				customblue: "#3366FF",
				customyellow: "#F8D57E",
				customyellowdark: "#F7C23B",
				custombluedark: "#264AB5",
				customgreen: "#F2FAF8",
				custombluelight: "#EAF6FF",
				custompurple: "#ECE7FB",
				customfooter: "#708090"
			}
		}
	},
	plugins: [require("daisyui")], // eslint-disable-line @typescript-eslint/no-require-imports
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"], // eslint-disable-line @typescript-eslint/no-var-requires
					primary: "#17C3B2",
					secondary: "#7E78D2"
				}
			}
		]
	}
};
