import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from '../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(
    private routes: Router,
    private httpClientService: HttpClientService,
    private loginService: AuthenticationService
  ) { }

  getEmployees() {
    this.httpClientService.getEmployees()
    .subscribe(data => this.employees = data);
  }

  // editEmployee() {
  //   this.routes.navigate(['/editemployee:this.employee.empId']);
  // }

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee)
      .subscribe( data => {
        this.employees = this.employees.filter(u => u !== employee);
      });
    }

    ngOnInit() {
      this.getEmployees();
    }

}
