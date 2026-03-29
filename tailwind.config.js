/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                maroon: '#800000',
                gold: '#D4AF37',
                offwhite: '#f5f5f5',
                saffron: '#FF8C00'
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                cursive: ['Great Vibes', 'cursive'],
                hindi: ['Noto Sans Devanagari', 'Aparajita', 'sans-serif'],
            }
        },
    },
    plugins: [],
};