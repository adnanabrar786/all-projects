const { join } = require('path');

module.exports = {
  content: [join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}')],

  theme: {
    screens: {
      sm: '600px',
      md: '1024px',
      lg: '1299px',
      xl: '1536px',
    },
    extend: {
      height: {
        w_h0: '2.188rem' /* 35px*/,
      },
      width: {
        w_9xl: '2.188rem' /* 35px */,
      },
      fontSize: {
        w_xs: '0.625rem' /*'10px'*/,
        w_xs2: '0.656' /*'10.5px'*/,
        w_xs1: '0.688rem' /*'11px'*/,
        w_sm: '0.75rem' /* 12px */,
        w_sm1: '0.813rem' /* 13px */,
        w_base: '0.9rem' /* 14px */,
        w_base1: '0.938rem' /* 15px */,
        w_0xl: '1rem' /*  16px*/,
        w_0xl_1: '1.063rem' /* 17px */,
        w_2xl: '1.1rem' /* 18px */,
        w_2sm: '1.25rem',
        w_3xl: '1.3rem' /* 20px */,
        w_3xl1: '1.313rem' /* 21px */,
        w_4xl: '1.375rem' /* 22px */,
        w_5xl: '1.5rem' /* 24px */,
        w_6xl: '1.8rem' /* 28px */,
        w_7xl: '1.875rem' /* 30px */,
        w_8xl: '2rem' /* 32px */,
        w_8xl_1: '2.125rem' /* 34px */,
        w_9xl: '2.188rem' /* 35px */,
        w_9xl_1: '2.25rem' /* 36px */,
        w_10xl: '2.5rem' /* 40px */,
      },
      colors: {
        ghost_white: '#F5FCFF',
        secondary: '#00D5D4',
        purple: '#512F6F',
        blue_eye: '#A8C5FF',
        glossy_grape: '#A695B5',
        non_photo_blue: '#9AE7E1',
        tropical_rain_forest: '#006064',
        sea_green: '#9FE2BE',
        morning_blue: '#87A0A4',
        magnolia: '#F7F5FA',
        deep_purple: '#A7236F',
        dark_vanilla: '#CFB5A6',
        pewter_blue: '#85A3BB',
        caribbean_green: '#00CAA5',
        quick_silver: '#A0A0A0',
        anti_flash_white: '#F4F3F5',
        unbleached_silk: '#FFDBCC',
        cultured: '#F6F4F8',
        lavendar: '#E8EDF8',
        azureish_white: '#DBE6EE',
        dark_charcoal: '#333333',
        spanish_grey: '#8C959D',
        light_silver: '#d4d9dd',
        tea_green: '#CDE7D0',
        lavender_gray: '#C1CBCF',
        chinese_black: '#161616',
        bright_navy_blue: '#1976D2',
        light_violet: '#F6EFFD',
        orange_light: '#FF8C00',
      },
    },
  },
  plugins: [],
};