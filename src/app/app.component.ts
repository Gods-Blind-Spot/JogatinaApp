import { AccountSignPage } from './modals/account-sign/account-sign.page';
import { UiUtilsService } from './services/ui-utils.service';
import { LoginData } from './interfaces/login-data';
import { EStorage } from 'src/app/enum/all.enum';
import { UserDetails } from 'src/app/interfaces/user-details';
import { StorageService } from './services/storage.service';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from './services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {

  loggedIn: boolean;
  userId: string;
  userData: UserDetails = {
    id: '',
    username: '',
    fullname: '',
    birthdate: undefined,
    email: ''
  };

  constructor(
    private storage: StorageService,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private database: DatabaseService,
    private utilService: UiUtilsService
  ) {
    this.auth.isAuthenticated().subscribe(
      isLogged => {
        this.loggedIn = isLogged;
        if (isLogged) this.storage.get(EStorage.LOGIN).then(
          (response) => {
            console.log(response.id);

            this.database.apiGet(`users/${response.id}`).then(
              (response: UserDetails) => {
                this.userData = response
              })
          });
      })
  }

  async ngOnInit(): Promise<void> { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  async login() {
    const loginModel = await this.modalCtrl.create({
      component: AccountSignPage,
      backdropDismiss: true
    });

    loginModel.present();
  }


  async logout() {
    const logout = await this.utilService.confirmAlert('Logout', null, 'Será necessário fazer login novamente');

    if (logout) {
      this.auth.logout();
      return;
    }
  }
}
