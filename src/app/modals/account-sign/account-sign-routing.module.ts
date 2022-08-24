import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSignPage } from './account-sign.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSignPageRoutingModule {}
