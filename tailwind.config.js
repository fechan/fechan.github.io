module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './minisign/**/*.html',
    './minisign/**/*.md',
    './adiugoskr/**/*.html',
    './adiugoskr/**/*.md',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  safelist: [
    "copyable-hover", // used for the resume-clipboard.js module only
    "copyable-active", // used for the resume-clipboard.js module only
  ],
  theme: {
    extend: {
      fontSize: {
        'resume': ['.85rem']
      },
      colors: {
        'canvascream': {
          DEFAULT: '#f7e6cf',
        },
        'redchan': {
          DEFAULT: '#a11a37',
          light: '#e7234d',
        },
        'sumiblack': {
          DEFAULT: '#343432',
        }
      },
      fontFamily: {
        display: ['"Goudy Bookletter 1911"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        }
      })
    },
  ]
}