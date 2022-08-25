import { EAccountPages } from 'src/app/enum/all.enum';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SignInComponent implements OnInit {

  @Output()
  loginEvent = new EventEmitter();

  loginForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null,
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&].{0,}$')
      ])
  });

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() { }

  async login() {
    await this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(
      async (data) => {
        await this.router.navigate(['']);
        await this.modalCtrl.dismiss();
      }
    );
  }

  async reset() {
    this.loginEvent.next(EAccountPages.FORGET);
  }
}
