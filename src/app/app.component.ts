import { LoginData } from './interfaces/login-data';
import { EStorage } from './enum/storate.enum';
import { UserDetails } from 'src/app/interfaces/user-details';
import { StorageService } from './services/storage.service';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from './services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  userData: UserDetails;
  loggedIn = false;
  name: string;

  constructor(
    private storage: StorageService,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private database: DatabaseService
  ) {}

  async ngOnInit(): Promise<void> {

    await this.storage.init();

    this.loggedIn = await this.auth.isLoggedIn();

    if (this.loggedIn) {
      const user: LoginData = await this.storage.get(EStorage.LOGIN);
      this.userData = await this.database.apiGet(`users/${user.id}`) as UserDetails;
    }
  }

  logout() {
    this.auth.logout();
  }
}
