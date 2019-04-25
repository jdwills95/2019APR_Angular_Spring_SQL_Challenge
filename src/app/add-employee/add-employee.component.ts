import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from '../service/http-client.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  states = ['AL', 'AK', 'AZ', 'AR', 'CA',
            'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA',
            'KS', 'KY', 'LA', 'ME', 'MD',
            'MA', 'MI', 'MN', 'MS', 'MO',
            'MT', 'NE', 'NV', 'NH', 'NJ',
            'NM', 'NY', 'NC', 'ND', 'OH',
            'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VT',
            'VA', 'WA', 'WV', 'WI', 'WY'];

  employee = {fName: '',
              lName: '',
              street: '',
              city: '',
              state: this.states[0],
              zip: '',
              homephone: '',
              cellphone: '',
              email: '',
              id: ''};

  user: Employee = new Employee('', '', '', '', '', '', '', '', '', '');

  constructor(
    private httpClientService: HttpClientService,
    private loginService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  createEmployee(): void {
    this.httpClientService.createEmployee(this.user)
        .subscribe( data => {
          alert('Employee created successfully.');
        });

  }

}
