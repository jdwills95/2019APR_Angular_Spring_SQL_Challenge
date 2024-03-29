import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: AuthenticationService) { }

  employee = {  fname: '',
                lname: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                cell: '',
                email: '',
                empId: '',
  };

  ngOnInit() {

  }

}
