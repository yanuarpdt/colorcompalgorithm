const colorPicker = new iro.ColorPicker(".colorPicker", {
  width: 260,
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        borderColor: '#ffffff',
        wheelAngle: 90
      }
    },
  ],

  colors: [
    "hsl(0, 100%, 50%)",
    "hsl(180, 100%, 50%)",
  ],
  handleRadius: 10,
  borderWidth: 5,
});

const colorList = document.getElementById("colorList");
const activeColor = document.getElementById("activeColor");

colorPicker.on(["mount", "color:setActive", "color:change"], function(){
  // colorPicker.color is always the active color
  const index = colorPicker.colors[0].index;
  const colString = colorPicker.colors[0].hexString;
  activeColor.innerHTML = `
    <div class="swatch" style="background: ${ colString }"></div>
    <span>${ index }: ${ colString }</span>
  `;
})
