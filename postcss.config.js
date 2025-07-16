// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'rem', // 字体用rem
      selectorBlackList: ['.ignore', '.hairlines'], // 忽略类
      minPixelValue: 1,
      mediaQuery: false,
      propList: [
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'margin*',
        'padding*',
        'top',
        'bottom',
        'left',
        'right',
        '!font*',
        '!border*',
        '!box-shadow',
        '!background*'
      ],
      replace: (value, unit, prop, decl) => {
        const heightProps = ['height', 'min-height', 'max-height', 'top', 'bottom'];
        
        console.log(heightProps,prop);
        if (heightProps.includes(prop)) {
          const vhValue = (parseFloat(value) / 1080) * 100;
          return `${vhValue.toFixed(5)}vh`;
        }
        
        // 其他属性默认转vw
        const vwValue = (parseFloat(value) / 1920) * 100;
        return `${vwValue.toFixed(5)}vw`;
      }
    }
  }
}