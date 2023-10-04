/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"], //aqui eu especifico aonde que estão os arquivos que terão classes tailwind. digo que na pasta src, toda pasta que tiver dentro dela e todo arquivo que termina com tsx podem ter classes do tailwind
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
