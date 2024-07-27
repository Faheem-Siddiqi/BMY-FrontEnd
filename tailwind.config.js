/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      width: {
        'a4': '210mm', 
      },
      height: {
        'a4': '297mm', 
      },

      fontFamily: {
        "CormorantGaramond-Regular": ["CormorantGaramond-Regular  ", "sans-serif"],
        "Satoshi-Black": ["Satoshi-Black", "sans-serif"],
        "Cambria": ["Cambria", "sans-serif"],
        "WorkSans-Regular": ["WorkSans-Regular", "sans-serif"],
        "NunitoSans-Regular": ["NunitoSans-Regular", "sans-serif"],
     
     
      }
      ,
      colors: {
        primary:"#377E31",
        mist: "#647959", 
        epsilon:"#50CC4D",
        alpha:'#E7FFE6',
        lambda:'#337E31',
        zeta: "#004700",
        theta:"#647959",
        iota:"#F3FFF3",
        light:"#777777",
        inputFields:'#0B0B0B',
        lightBg:'#C4FFC3',
        lightEpsilon:'#F0FFF0',
        lightBackground:'#F5F5F5',
       
       
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: false, 
    darkTheme: "light", 
    base: false, 
    styled: false, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root", 
  },
}
