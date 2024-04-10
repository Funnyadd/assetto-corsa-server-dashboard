module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      gridTemplateColumns: {
        'serversGridContent': '40px 1fr 50px repeat(4, 32px)',
        'serversGridHeader': '40px 1fr 50px 32px 32px 76px',
        // 'serversGridHeader': '40px 1fr 50px 164px'
      },
    }
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
