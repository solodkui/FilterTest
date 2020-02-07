import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'

declare var noUiSlider: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  noUiSlider: any = noUiSlider;

  @ViewChild("slider", {static: true}) slider: ElementRef;
  @ViewChild("inputMin", {static: true}) inputMin: ElementRef;
  @ViewChild("inputMax", {static: true}) inputMax: ElementRef;

  @Input() min: number = 100;
  @Input() max: number = 7000000
  @Input() step: number = 1;

  values: any;
  value: any;
  steps: any;
  stepNow: any;
  position: any;
  valueMin: any;
  valueMax: any;

  ngOnInit() {
    this.noUiSlider.create(this.slider.nativeElement, {
      start: [this.min, this.max],
      connect: true,
      range: {
        min: this.min,
        max: this.max
      },
      step: this.step
    });

    this.slider.nativeElement.noUiSlider.on("update", (values: any) => {
      this.min = parseInt(values[0]);
      this.max = parseInt(values[1]);
    });
  }

  inputListeners() {
    this.slider.nativeElement.noUiSlider.set([this.min, this.max]);
  }

  checkKeyDown(event: any, handle: any) {
    console.log(/^\d*\.?\d*$/.test(event.key));

    this.values = this.slider.nativeElement.noUiSlider.get();
    this.value = Number(this.values[handle]);
    this.steps = this.slider.nativeElement.noUiSlider.steps();
    this.stepNow = this.steps[handle];

    switch (event.which) {
      case 13:
        this.slider.nativeElement.noUiSlider.set([this.min, this.max]);
        break;
      case 38:
        this.position = this.stepNow[1];

        if (this.position === false) this.position = 1;
        if (this.position !== null) this.slider.nativeElement.noUiSlider.setHandle(handle, this.value + this.position);

        break
      case 40:
        this.position = this.stepNow[0];

        if (this.position === false) this.position = 1;
        if (this.position !== null) this.slider.nativeElement.noUiSlider.setHandle(handle, this.value - this.position);

        break;
      case 37:
        break
      case 39:
        break
      case 8:
        break
      default:
        if(!/^\d*\.?\d*$/.test(event.key)) {
          setTimeout(() => {
            this.filter(handle);
          }, 0)
        }
    }

    setTimeout(() => {
      this.checkMinMax();
    }, 0)
  }

  filter(handle: number){
    if(handle === 0) {
      this.valueMin = this.inputMin.nativeElement.value.split('');
      this.inputMin.nativeElement.value = [];
      this.valueMin.forEach(element => {
        if(/^\d*\.?\d*$/.test(element)) {
          this.inputMin.nativeElement.value = this.inputMin.nativeElement.value + '' + element;
        }
      });
    } else if(handle === 1) {
      this.valueMax = this.inputMax.nativeElement.value.split('');
      this.inputMax.nativeElement.value = [];
      this.valueMax.forEach(element => {
        if(/^\d*\.?\d*$/.test(element)) {
          this.inputMax.nativeElement.value = this.inputMax.nativeElement.value + '' + element;
        }
      });
    }

    this.slider.nativeElement.noUiSlider.set([this.min, this.max]);
  }
  checkMinMax() {
    if(this.inputMin.nativeElement.value < this.min) {
      this.inputMin.nativeElement.value = this.min;
    } else if(this.inputMin.nativeElement.value > this.max) {
      this.inputMin.nativeElement.value = this.max;
    }

    if(this.inputMax.nativeElement.value < this.min) {
      this.inputMax.nativeElement.value = this.min;
    } else if(this.inputMax.nativeElement.value > this.max) {
      this.inputMax.nativeElement.value = this.max;
    }

    this.slider.nativeElement.noUiSlider.set([this.min, this.max]);
  }

  // setInputFilter(textbox: any, inputFilter: any) {
  //   ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
  //     textbox.addEventListener(event, function() {
  //       if (inputFilter(this.value)) {
  //         this.oldValue = this.value;
  //         this.oldSelectionStart = this.selectionStart;
  //         this.oldSelectionEnd = this.selectionEnd;
  //       } else if (this.hasOwnProperty("oldValue")) {
  //         this.value = this.oldValue;
  //         this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
  //       } else {
  //         this.value = "";
  //       }
  //     })
  //   })
  //   this.min = 100;
  // };
}