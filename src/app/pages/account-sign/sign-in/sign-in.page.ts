import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  data;

  loginForm = this.formBuilder.group({
    email: new FormControl(null),
    password: new FormControl(null),
    remember: new FormControl<boolean>(false, {nonNullable: true})
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(
      data => this.data = data
    );
  }

}
