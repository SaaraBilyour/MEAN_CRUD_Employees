import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormsModule} from '@angular/forms';
import { NgForm, Validators, FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../shared/employee.model';



// to use toaste 
declare let M: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  
// @ViewChild('f') form: NgForm;

//   // when you want to set required validator:
//   setRequired() {
//     this.form.get('_id').updateValueAndValidity();
//   }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
    //this.onEdit();
    //this.onDelete();
    // this.onSubmit();
  }
  

  onSubmit(form: NgForm) {

    console.log(form.value);
    console.log(form.value._id);
    if(form.value._id == ""){
    this.employeeService.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form)// { first: '', last: '' }
      form.reset();  // false
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: 0
    }
  }

  refreshEmployeeList() {
    //calling a function from service
    this.employeeService.getEmployeeList().subscribe((res) => { this.employeeService.employees = res as Employee[]; });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
    
  }

}
