import { EAccountPages } from './../../../enum/all.enum';
import { UiUtilsService } from 'src/app/services/ui-utils.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output()
  registeredEvent = new EventEmitter();

  registerForm = this.formBuilder.group({
    fullname: new FormControl(null, [Validators.required]),
    username: new FormControl('test', [Validators.required]),
    birthdate: new FormControl<Date>(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null,
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&].{0,}$')
      ]),
  });

  constructor(
    private dataApi: DatabaseService,
    private formBuilder: FormBuilder,
    private uiUtil: UiUtilsService
  ) { }

  ngOnInit() {}

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
      (data: UserDetails) => {
        if (data.id) {
          this.registeredEvent.next(EAccountPages.LOGIN);
        }
      }
    );
  }

}
