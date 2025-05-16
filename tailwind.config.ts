
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3A86FF',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: '#4ECCA3', // Mint green
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				dark: '#1A1A2E',
				light: '#F8F7FF',
				success: '#38B000',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			perspective: {
				'1000': '1000px',
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
				},
				"pulse-glow": {
					"0%, 100%": { 
						boxShadow: "0 0 5px rgba(58, 134, 255, 0.2)",
						transform: "scale(1)"
					},
					"50%": { 
						boxShadow: "0 0 20px rgba(58, 134, 255, 0.6)", 
						transform: "scale(1.05)"
					}
				},
				"morph": {
					"0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
					"50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
					"100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" }
				},
				"ripple": {
					"0%": { 
						transform: "scale(0)",
						opacity: "1" 
					},
					"100%": { 
						transform: "scale(10)",
						opacity: "0" 
					}
				},
				"appear": {
					from: { 
						opacity: "0",
						transform: "translateY(20px)" 
					},
					to: { 
						opacity: "1",
						transform: "translateY(0)" 
					}
				},
				"text-reveal": {
					"0%": {
						transform: "scale(0.5)",
						opacity: "0",
						filter: "blur(10px)"
					},
					"50%": {
						opacity: "0.5",
						filter: "blur(5px)"  
					},
					"100%": {
						transform: "scale(1)",
						opacity: "1",
						filter: "blur(0)"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"float": "float 6s ease-in-out infinite",
				"pulse-glow": "pulse-glow 3s ease-in-out infinite",
				"morph": "morph 8s ease-in-out infinite",
				"ripple": "ripple 0.6s linear",
				"appear": "appear 0.8s ease-out forwards",
				"text-reveal": "text-reveal 2.5s cubic-bezier(0.23, 1, 0.32, 1) forwards"
			},
			fontFamily: {
				'poppins': ['"Poppins"', 'sans-serif'],
				'inter': ['"Inter"', 'sans-serif'],
				'space': ['"Space Mono"', 'monospace']
			},
			transformStyle: {
				'preserve-3d': 'preserve-3d',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			const newUtilities = {
				'.perspective-1000': {
					perspective: '1000px'
				},
				'.preserve-3d': {
					transformStyle: 'preserve-3d'
				}
			};
			addUtilities(newUtilities);
		}
	],
} satisfies Config;

