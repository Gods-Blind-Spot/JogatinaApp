import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSignPageRoutingModule } from './account-sign-routing.module';

import { AccountSignPage } from './account-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSignPageRoutingModule
  ],
  declarations: [AccountSignPage]
})
export class AccountSignPageModule {}
