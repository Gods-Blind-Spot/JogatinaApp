import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loggedIn: boolean;
  data;

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
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(
      data => {
        this.data = { data, valid: this.loginForm.valid };
        // document.getElementById('submit-bttn').
      }
    );
  }

  async login() {
    await this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(
      (data) => console.log(data)
    );
  }
}
