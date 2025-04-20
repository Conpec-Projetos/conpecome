import type { Config } from "tailwindcss"

const {nextui} = require('@nextui-org/react')

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./src/assets/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(card|ripple).js"
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        poppins: ['var(--font-poppins)'],
        pixelify: ['var(--font-pixelify-sans)']
      },
      colors: {
        number:
        "font-bold font-outline-2 text-amber-500"
      },
      dropShadow: {
        white: [
          "0 0px 20px rgba(255,255, 255, 0.45)",
          "0 0px 65px rgba(255, 255,255, 0.4)"
        ],
        orange: [
          "0 0px 20px rgba(255, 153, 0, 0.45)",
          "0 0px 65px rgba(255, 153, 0, 0.4)"
        ]
      },
      caretColor: theme => ({
        transparent: 'transparent',
      })
    },
  },
  plugins: [
    nextui({
      themes: {
        "light": {
          colors: {
            primary: 'rgba(60, 47, 47, 1)',
            secondary: '#6A6A6A',
            tertiary: "rgb(241 245 249)",
            orange: {
              strong: '#FF5C00',
              transparent: 'rgba(255, 153, 0, 0.25)',
              serene: '#FF9633',
              linear: '#FF7D02', 
              seashell: '#FFF4EF',
              antique: '#FFE8D8',
              peach: '#FFBE99',
              coquelicot: '#FF3D00',
              apricot: '#FFCEB2',
              sandy:  '#FFD8B4',
              pale: '#FFBCBD'
            },
            red: {
              imperial: '#EF2A39' //seta volta
            }
          }
        },
        "dark": {
                colors: {
                  background: "#ea580c",
                  primary: '#e4e4e7',
                }
          },
          }
        })
  ],
} satisfies Config

export default config