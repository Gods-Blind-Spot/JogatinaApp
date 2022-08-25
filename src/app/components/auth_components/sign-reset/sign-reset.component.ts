import { EAccountPages } from 'src/app/enum/all.enum';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  standalone: true,
  selector: 'app-sign-reset',
  templateUrl: './sign-reset.component.html',
  styleUrls: ['./sign-reset.component.scss'],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SignResetComponent implements OnInit {

  @Output()
  resetEvent = new EventEmitter();

  password: string;

  resetForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.email, Validators.required])
  });

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  async reset () {
    this.password = await this.auth.reset(this.resetForm.value.email);
    // this.resetEvent.next(EAccountPages.LOGIN);
  }
}
