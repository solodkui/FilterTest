// Init Slider
function initSlider(
  options = {
    min: 100,
    max: 7000000,
    nodeSlider: null,
    nodeInputs: null
  }
) {
  if (!options.nodeSlider || !options.nodeInputs) {
    console.warn("All fields are required!");
    return false;
  };

  noUiSlider.create(options.nodeSlider, {
    start: [options.min, options.max],
    connect: true,
    range: {
      min: options.min,
      max: options.max
    },
    step: 1
  });

  options.nodeSlider.noUiSlider.on("update", (values, handle) => {
    options.nodeInputs[handle].value = parseInt(values[handle]);
  });
  
  initInputLisneters(options.nodeInputs, options.nodeSlider.noUiSlider);
};
// Init Input listeners
function initInputLisneters(inputs, slider) {
  console.log(inputs);
  inputs.forEach((input, handle) => {
    input.addEventListener("change", function() {
      slider.setHandle(handle, this.value)
    });

    input.addEventListener("keydown", function(e) {
      let values = slider.get();
      let value = Number(values[handle]);
      let steps = slider.steps();
      let step = steps[handle];
      let position;

      switch (e.which) {
        case 13:
          slider.setHandle(handle, this.value);
          break;
        case 38:
          position = step[1];

          if (position === false) position = 1;
          if (position !== null) slider.setHandle(handle, value + position);

          break
        case 40:
          position = step[0];

          if (position === false) position = 1;
          if (position !== null) slider.setHandle(handle, value - position);

          break;
      }
    })

    setInputFilter(input, value => /^\d*\.?\d*$/.test(value));
  })
};
// Filter for Inputs
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      })
    })
  };
// Init Sliders
function initSliders() {
  const nodesFilterBlocks = document.querySelectorAll(".js-slider-block")

  nodesFilterBlocks.forEach((node) => {
    const nodeSlider = node.querySelector(".js-slider");
    const nodeInputMin = node.querySelector(".js-input-min");
    const nodeInputMax = node.querySelector(".js-input-max");

    const min = parseInt(nodeSlider.dataset.min);
    const max = parseInt(nodeSlider.dataset.max);

    initSlider({
      min,
      max,
      nodeSlider,
      nodeInputs: [nodeInputMin, nodeInputMax]
    })
  })
};;

initSliders();