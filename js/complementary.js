const colorPicker = new iro.ColorPicker(".colorPicker", {
  width: 260,
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        borderColor: '#ffffff',
        wheelAngle: 90,
        handleRadius: 10,
        borderWidth: 5,
      }
    },
  ],

  colors: [
    "rgb(255,0,0)",
    "rgb(0,255,255)",
  ],
});

const colorList = document.getElementById("colorList");
const activeColor = document.getElementById("activeColor");

colorPicker.on(["mount", "color:change"], function(){

          colorPicker.setActiveColor(0);
          datahex = colorPicker.colors[0].hexString;
            if (datahex.indexOf('#') === 0) {
                  datahex = datahex.slice(1);
              }

            var r = red   = (parseInt(datahex.slice(0, 2), 16)),
                g = green = (parseInt(datahex.slice(2, 4), 16)),
                b = blue  = (parseInt(datahex.slice(4, 6), 16));

            r /= 255;
            g /= 255;
            b /= 255;
            const l = Math.max(r, g, b);
            const s = l - Math.min(r, g, b);
            const h = s
              ? l === r
                ? (g - b) / s
                : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
              : 0;
            const hue0 = Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h);
            const sat0 = Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0));
            const lig0 = Math.round((100 * (2 * l - s)) / 2);
            const dComp0 = (hue0 + 180) % 360;
            
            colorList.innerHTML = '';
              colorPicker.colors[0].hsl = { h: hue0, s: sat0, l: lig0 };
              const colString0 = colorPicker.colors[0].hexString;
              colorPicker.colors[1].hsl = { h: dComp0, s: sat0, l: lig0 };
              const colString1 = colorPicker.colors[1].hexString;
              colorList.innerHTML += `
                <li>
                  <div class="swatch" style="background: ${ colString0 }"></div>
                  <span style="color: ${ colString0 }">0: ${ colString0 }</span>
                </li>     
                <li>
                  <div class="swatch" style="background: ${ colString1 }"></div>
                  <span style="color: ${ colString1 }">1: ${ colString1 }</span>
                </li>
              `;
            });

colorPicker.on(["mount", "color:change"], function(){
  document.body.style.backgroundColor = colorPicker.colors[0].hexString;
  const index = colorPicker.colors[0].index;
  const colString = colorPicker.colors[0].hexString;
  activeColor.innerHTML = `
    <div class="swatch" style="background: ${ colString }"></div>
    <span style="color: ${ colString }">${ index }: ${ colString }</span>
  `;
})
