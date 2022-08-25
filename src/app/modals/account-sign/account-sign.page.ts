import { Component, OnInit } from '@angular/core';
import { EAccountPages } from 'src/app/enum/all.enum';

@Component({
  selector: 'app-account-sign',
  templateUrl: './account-sign.page.html',
  styleUrls: ['./account-sign.page.scss'],
})
export class AccountSignPage implements OnInit {

  actualPage = EAccountPages.LOGIN.toString();

  // TODO: Alternate state between login and register
  // TODO: Register page design

  constructor() { }

  ngOnInit() {  }

  showPage(pageToShow: string) {
    console.log(pageToShow);

    this.actualPage = pageToShow;
  }
}
