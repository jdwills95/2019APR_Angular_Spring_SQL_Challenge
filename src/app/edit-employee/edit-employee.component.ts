import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientService, Employee } from '../service/http-client.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  EditForm: FormGroup;
  submitted = false;
  loading = false;
  employee;


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

  employeeForm: FormGroup;

  constructor(private routes: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private httpClientService: HttpClientService,
              private loginService: AuthenticationService) { }


              createForm() {
                this.EditForm = this.formBuilder.group({
                  fName: ['', [ Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(35),
                                    Validators.pattern( '[A-Za-z]*' )]],

                  lName: ['',  [ Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(35),
                                    Validators.pattern('[A-Za-z]*')]],

                  street: ['', [  Validators.required,
                                  Validators.minLength(10),
                                  Validators.maxLength(50),
                                  Validators.pattern('[A-Za-z\\\'\\- 0-9]*')]],

                  city: ['',  [ Validators.required,
                                Validators.minLength(5),
                                Validators.maxLength(50),
                                Validators.pattern('[A-Za-z]*')]],

                  state: ['', [ Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(2),
                                Validators.pattern('[A-Za-z]*')]],

                  zip: ['', [ Validators.required,
                              Validators.minLength(5),
                              Validators.maxLength(9),
                              Validators.pattern('[0-9]*')]],

                  homephone: ['', [  Validators.required,
                                      Validators.minLength(10),
                                      Validators.maxLength(10),
                                      Validators.pattern('[0-9]*')]],

                  cellphone: ['', [ Validators.required,
                                    Validators.minLength(10),
                                    Validators.maxLength(10),
                                    Validators.pattern('[0-9]*')]],

                  email: ['' /*, [ Validators.required,
                                Validators.minLength(10),
                                Validators.maxLength(50),
                                Validators.email,
                  Validators.pattern('[A-Za-z\\\'\\- 0-9]*')]*/]
                });
              }

  get fName() { return this.EditForm.get('fName'); }
  get lName() { return this.EditForm.get('lName'); }
  get street() { return this.EditForm.get('street'); }
  get city() { return this.EditForm.get('city'); }
  get state() { return this.EditForm.get('state'); }
  get zip() { return this.EditForm.get('zip'); }
  get homephone() { return this.EditForm.get('homephone'); }
  get cellphone() { return this.EditForm.get('cellphone'); }
  get email() { return this.EditForm.get('email'); }

getEmployee(empId: number) {
  if (empId === 0) {
    this.employee = {
      empId: null,
      fName: null,
      lName: null,
      street: null,
      city: null,
      state: this.states[0],
      zip: null,
      homephone: null,
      cellphone: null,
      email: null
    }; } else { this.getEmployeeData(empId); }
          }

          getEmployeeData(empId: number) {
            this.employee = this.httpClientService.getEmployeeById(empId)
                .subscribe(employee => {
                  this.employee = employee;
                  this.EditForm.setValue({
                    fName: this.employee.fName,
                    lName: this.employee.lName,
                    street: this.employee.street,
                    city: this.employee.city,
                    state: this.employee.state,
                    zip: this.employee.zip,
                    homephone: this.employee.homephone,
                    cellphone: this.employee.cellphone,
                    email: this.employee.email,
                  });

                });
          }

          extractEmployeeFromForm() {
            this.employee.fName =  this.EditForm.value.fName;
            this.employee.lName = this.EditForm.value.lName;
            this.employee.street = this.EditForm.value.street;
            this.employee.city = this.EditForm.value.city;
            this.employee.state = this.EditForm.value.state;
            this.employee.zip = this.EditForm.value.zip;
            this.employee.homephone = this.EditForm.value.homephone;
            this.employee.cellphone = this.EditForm.value.cellphone;
            this.employee.email = this.EditForm.value.email;
          }

        editEmployee(): void {
          this.extractEmployeeFromForm();
          this.httpClientService.editEmployee(this.employee)
          .subscribe( data => {
            alert('Employee created successfully.');
          });
        }

          ngOnInit(): void {
          this.route.paramMap.subscribe(parameterMap => {
            const empId = +parameterMap.get('empId');
            this.getEmployeeData(empId);
          });
          this.createForm();
          }

        }
