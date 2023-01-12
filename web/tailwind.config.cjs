/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      boxShadow: {
        'center-violet': '0 0px 8px 1px #9572FC',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },

        ping: {
          '75%, 100%': { transform: 'scale(1)', opacity: 0 },
          // '100%': { transform: 'scale(2)', opacity: 0}
        },

        breath: {
          '0%': { transform: 'scale(0.9)' },
          '25%': { transform: 'scale(1)' },
          '60%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(0.9)' },
        },

        colorWave: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },

      animation: {
        'waving-hand': 'wave 2s linear infinite',
        'ping': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'breath': 'breath 2.5s linear infinite',
        'color-wave': 'colorWave 3s ease infinite'
      },
    },
  },
  plugins: [],
}
