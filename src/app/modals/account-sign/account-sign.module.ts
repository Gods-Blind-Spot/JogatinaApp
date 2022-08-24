import { SignUpComponent } from './../../components/sign-up/sign-up.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSignPageRoutingModule } from './account-sign-routing.module';

import { AccountSignPage } from './account-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSignPageRoutingModule,
    SignInComponent,
    SignUpComponent
  ],
  declarations: [AccountSignPage]
})
export class AccountSignPageModule {}
