import { EStorage } from 'src/app/enum/all.enum';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { AccountSignPage } from 'src/app/modals/account-sign/account-sign.page';
import { AuthService } from 'src/app/services/auth.service';
import { UiUtilsService } from 'src/app/services/ui-utils.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-profile-opts',
  templateUrl: './profile-opts.component.html',
  styleUrls: ['./profile-opts.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ProfileOptsComponent implements OnInit {

  ownerId: string;

  constructor(
    private storage: StorageService,
    private popoverCtrl: PopoverController,
    private router: Router,
    private auth: AuthService,
    private utilService: UiUtilsService
  ) { }

  async ngOnInit() {
    this.ownerId = (await this.storage.get(EStorage.LOGIN)).id
  }

  async logout() {
    const logout = await this.utilService.confirmAlert('Logout', null, 'Será necessário fazer login novamente');

    if (logout) {
      this.auth.logout();
      return;
    }
  }

  async goToConfig() {
    this.router.navigate(['config']);
  }

  async goToProfile() {
    this.router.navigate(['profile', this.ownerId]);
  }
}
