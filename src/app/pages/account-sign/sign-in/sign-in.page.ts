import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  data;

  loginForm = this.formBuilder.group({
    email: new FormControl('vini.ithalo@gmail.com', [Validators.email, Validators.required]),
    password: new FormControl(null,
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&].{0,}$')
      ]),
    remember: new FormControl<boolean>(false, {nonNullable: true})
  });

  constructor(
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



}
