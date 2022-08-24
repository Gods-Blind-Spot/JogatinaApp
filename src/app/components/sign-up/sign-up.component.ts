import { UiUtilsService } from 'src/app/services/ui-utils.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { UserDetails } from 'src/app/interfaces/user-details';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SignUpComponent implements OnInit {

  data;

  registerForm = this.formBuilder.group({
    fullname: new FormControl('Vinícius Ithalo', [Validators.required]),
    username: new FormControl('Vinii', [Validators.required]),
    birthdate: new FormControl<Date>(null, [Validators.required]),
    email: new FormControl('vini.ithalo@gmail.com', [Validators.email, Validators.required]),
    password: new FormControl(null,
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&].{0,}$')
      ]),
  });

  constructor(
    private modalController: ModalController,
    private dataApi: DatabaseService,
    private formBuilder: FormBuilder,
    private uiUtil: UiUtilsService
  ) { }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(
      value => {
        this.data = { value, valid: this.registerForm.valid };
        // document.getElementById('submit-bttn').
      }
    );
  }

  async submit() {
    await this.uiUtil.confirmAlert('a', 'a', 'a', true, true );
    console.log();
    const formValue = this.registerForm.value;

    this.dataApi.apiPost('auth/register', {
      username: formValue.username,
      fullname: formValue.fullname,
      email: formValue.email,
      password: formValue.password,
      birthdate: formValue.birthdate
    }).then(
      (data: UserDetails) => this.modalController.dismiss()
    );
  }

}
