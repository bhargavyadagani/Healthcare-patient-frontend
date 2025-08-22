import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   
import { CommonModule } from '@angular/common'; 
import { Patientservice } from '../../service/patientservice';

@Component({
  selector: 'app-add-patient',
  standalone: true,   
  imports: [FormsModule, CommonModule],   
  templateUrl: './add-patient.html',
  styleUrls: ['./add-patient.css']
})
export class AddPatient {
    patient = {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phone: '',
      insuranceProvider: '',
      insuranceNumber: ''
    }

    message='';

    constructor(private PatientService:Patientservice, private router:Router){}

    async onSubmit()
    {
      console.log("Submitted",this.patient);

      this.PatientService.createPatient(this.patient).subscribe(
        {
          next:(response) =>{
            console.log("Patient saved: ",response);
            this.message ="patient added sucessfully";
            this.router.navigate(['/patient']);
          },
          error:(err)=>{
            console.error("Error while saving the patient",err);
            this.message="error adding patient";
          }
        }
      )
    }
}
