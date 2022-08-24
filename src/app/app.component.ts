import { SignInPage } from './modals/sign-in/sign-in.page';
import { UiUtilsService } from './services/ui-utils.service';
import { LoginData } from './interfaces/login-data';
import { EStorage } from './enum/storate.enum';
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
  ) { }

  async ngOnInit(): Promise<void> {
    this.loggedIn = await this.auth.isLoggedIn();

    if (this.loggedIn) {
      const user: LoginData = await this.storage.get(EStorage.LOGIN);
      this.userData = await this.database.apiGet(`users/${user.id}`) as UserDetails;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  async login() {
    const loginModel = await this.modalCtrl.create({
      component: SignInPage,
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
