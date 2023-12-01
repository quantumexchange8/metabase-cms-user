const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue, js}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },

            fontSize: {
                xl: ['20px', '30px'],
                '3xl': ['30px', '38px']
            },

            colors: {
                gray: {
                    light: {
                        25: '#FCFCFD',
                        50: '#F9FAFB',
                        100: '#F2F4F7',
                        200: '#EAECF0',
                        300: '#D0D5DD',
                        400: '#98A2B3',
                        500: '#667085',
                        600: '#475467',
                        700: '#344054',
                        800: '#182230',
                        900: '#101828',
                        950: '#0C111D',
                    },
                    dark: {
                        25: '#FAFAFA',
                        50: '#F5F5F6',
                        100: '#F0F1F1',
                        200: '#ECECED',
                        300: '#CECFD2',
                        400: '#94969C',
                        500: '#85888E',
                        600: '#61646C',
                        700: '#333741',
                        800: '#1F242F',
                        900: '#161B26',
                        950: '#0C111D',
                    }
                },
                blue: {
                    25: '#F5F8FF',
                    50: '#EFF4FF',
                    100: '#D1E0FF',
                    200: '#B2CCFF',
                    300: '#84ADFF',
                    400: '#528BFF',
                    500: '#2970FF',
                    600: '#155EEF',
                    700: '#004EEB',
                    800: '#0040C1',
                    900: '#00359E',
                    950: '#002266',
                },
                success: {
                    25: '#F6FEF9',
                    50: '#ECFDF3',
                    100: '#DCFAE6',
                    200: '#ABEFC6',
                    300: '#75E0A7',
                    400: '#47CD89',
                    500: '#17B26A',
                    600: '#079455',
                    700: '#067647',
                    800: '#085D3A',
                    900: '#074D31',
                    950: '#053321',
                },
                warning: {
                    25: '#FFFCF5',
                    50: '#FFFAEB',
                    100: '#FEF0C7',
                    200: '#FEDF89',
                    300: '#FEC84B',
                    400: '#FDB022',
                    500: '#F79009',
                    600: '#DC6803',
                    700: '#B54708',
                    800: '#93370D',
                    900: '#7A2E0E',
                    950: '#4E1D09',
                },
                error: {
                    25: '#FFFBFA',
                    50: '#FEF3F2',
                    100: '#FEE4E2',
                    200: '#FECDCA',
                    300: '#FDA29B',
                    400: '#F97066',
                    500: '#F04438',
                    600: '#D92D20',
                    700: '#B42318',
                    800: '#912018',
                    900: '#7A271A',
                    950: '#55160C',
                },
                pink: {
                    DEFAULT: '#FF2D55',
                    dark: '#FF375F'
                },
                purple: {
                    DEFAULT: '#AF52DE',
                    dark: '#BF5AF2'
                },
                indigo: {
                    DEFAULT: '#5856D6',
                    dark: '#5E5CE6'
                },
                cyan: {
                    DEFAULT: '#32ADE6',
                    dark: '#64D2FF'
                },
                mint: {
                    DEFAULT: '#00C7BE',
                    dark: '#63E6E2'
                },
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },

            boxShadow: {
                xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                'blue-light': "0px 0px 0px 4px rgba(209, 224, 255, 1)",
                'blue-dark': "0px 0px 0px 4px rgba(0, 64, 193, 1)",
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
}

