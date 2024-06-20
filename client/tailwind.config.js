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
        'serversGridContent': '40px 1fr 50px 76px',
        'serversGridHeader': '40px 1fr 50px repeat(2, 32px)',
        'serversGridContentAdmin': '40px 1fr 50px repeat(4, 32px)',
        'serversGridHeaderAdmin': '40px 1fr 50px repeat(2, 32px) 76px',
      },
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2f27ce",
          "secondary": "#dddbff",
          "accent": "#443dff",
          "neutral": "#bebec0",
          "base-100": "#fbfbfe",
        },
        dark: {
          "primary": "#3a31d8",
          "secondary": "#020024",
          "accent": "#0600c2",
          "neutral": "#1c1c1c",
          "base-100": "#131315",
        },
        daisyLight: {
          ...require("daisyui/src/theming/themes")["light"]
        },
        daisyDark: {
          ...require("daisyui/src/theming/themes")["dark"]
        },
      },
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
