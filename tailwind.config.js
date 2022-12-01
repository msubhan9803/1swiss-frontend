/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            backgroundImage: {
                'main-layout': 'linear-gradient(180deg,rgba(0,93,245,.07),rgba(28,109,241,0) 25vh)'
            }
        },
    },
    plugins: [],
}