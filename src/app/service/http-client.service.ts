import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Employee {
  constructor(
    public fName: string,
    public lName: string,
    public street: string,
    public city: string,
    public state: string,
    public zip: string,
    public cellphone: string,
    public homephone: string,
    public email: string,
    public empId: string,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getEmployees() {
    return this.httpClient.get<Employee[]>('http://localhost:8080/employee/all');
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>('http://localhost:8080/employee' + '/' + employee.empId);
  }

  public editEmployee(employee) {
    return this.httpClient.put<Employee>('http://localhost:8080/employee' + '/' + employee.empId, employee);
  }


  public createEmployee(employee) {
    return this.httpClient.post<Employee>('http://localhost:8080/employee/addemployee', employee);
  }
}
