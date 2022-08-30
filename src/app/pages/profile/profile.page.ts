import { DatabaseService } from 'src/app/services/database.service';
import { UserDetails } from 'src/app/interfaces/user-details';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {



  selectedId: string;
  user: UserDetails = {
    id: '',
    username: '',
    fullname: '',
    birthdate: undefined,
    email: ''
  };


  constructor(
    private route: ActivatedRoute,
    private dataService: DatabaseService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.user = await this.dataService.apiGet('users/' + params['id']) as UserDetails;
    })
  }

}
