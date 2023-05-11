import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formSmsCode = this.formBuilder.nonNullable.group({
    code1:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]')]],
    code2:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]')]],
    code3:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]')]],
    code4:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]')]],
    code5:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]')]],
    code6:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]')]],
  });

  digit1 = ''
  digit2 = ''
  digit3 = ''
  digit4 = ''
  digit5 = ''
  digit6 = ''

  constructor(
    private formBuilder: FormBuilder
  ) { }

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
        // this.rellenarCampos(pastedText)
        this.rellenarCamposForm(pastedText)
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

  rellenarCamposForm(value: string) {
    let valuesArray = value.split('')
    console.log({ valuesArray, formSmsCode: this.formSmsCode })

    // this.formSmsCode.controls['code1'].setValue(valuesArray[0])
    // this.formSmsCode.controls['code2'].setValue(valuesArray[1])
    // this.formSmsCode.controls['code3'].setValue(valuesArray[2])
    // this.formSmsCode.controls['code4'].setValue(valuesArray[3])
    // this.formSmsCode.controls['code5'].setValue(valuesArray[4])
    // this.formSmsCode.controls['code6'].setValue(valuesArray[5])

    // this.formSmsCode.controls['code1'].patchValue(valuesArray[0])
    // this.formSmsCode.controls['code2'].patchValue(valuesArray[1])
    // this.formSmsCode.controls['code3'].patchValue(valuesArray[2])
    // this.formSmsCode.controls['code4'].patchValue(valuesArray[3])
    // this.formSmsCode.controls['code5'].patchValue(valuesArray[4])
    // this.formSmsCode.controls['code6'].patchValue(valuesArray[5])

    this.formSmsCode.get('code1')?.patchValue(valuesArray[0])
    this.formSmsCode.get('code2')?.patchValue(valuesArray[1])
    this.formSmsCode.get('code3')?.patchValue(valuesArray[2])
    this.formSmsCode.get('code4')?.patchValue(valuesArray[3])
    this.formSmsCode.get('code5')?.patchValue(valuesArray[4])
    this.formSmsCode.get('code6')?.patchValue(valuesArray[5])

  }
}
