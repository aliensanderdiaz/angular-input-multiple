import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  digit1 = ''
  digit2 = ''
  digit3 = ''
  digit4 = ''
  digit5 = ''
  digit6 = ''

  constructor() { }

  async onDigitInput(event: any) {

    let codesReturn = ['ControlLeft', 'ControlRight', 'KeyV']

    if (codesReturn.includes(event.code )) {
      return
    }

    const isNumber = /^\d+$/g
    let target = event.target.select();
    let element;

    if (event.code !== 'Backspace' && isNumber.test(event.target.value)) {
      element = await event.srcElement.nextSibling;
    }
    if (event.code === 'Backspace' || event.code === 'ArrowLeft') {
      element = await event.srcElement.previousSibling;
      await target
    }
    if (event.code === 'ArrowRight') {
      element = await event.srcElement.nextSibling;
      await target
    }

    if (element == null) {
      if (event.target.value === '') {
        return;
      }
      await event.srcElement.blur();
    } else {
      await element.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    console.log({ event })
    let clipboardData = event.clipboardData;

    if (clipboardData) {
      let pastedText = clipboardData.getData('text');
      let areNumbers = /^[0-9]+$/g

      let sonNumeros = areNumbers.test(pastedText)
      console.log({ sonNumeros, pastedText, len: pastedText.length })

      if (pastedText.length === 6 && sonNumeros) {
        event.preventDefault()
        console.log('TODO: Rellenar los campos')
        this.rellenarCampos(pastedText)
      } else {
        alert('No se puede pegar este código')
        event.preventDefault()
        return
      }
    }
  }

  rellenarCampos(value: string) {
    let valuesArray = value.split('')
    console.log({ valuesArray })

    this.digit1 = valuesArray[0]
    this.digit2 = valuesArray[1]
    this.digit3 = valuesArray[2]
    this.digit4 = valuesArray[3]
    this.digit5 = valuesArray[4]
    this.digit6 = valuesArray[5]
  }
}
