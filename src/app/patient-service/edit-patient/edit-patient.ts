import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Patient } from '../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { Patientservice } from '../../service/patientservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-patient',
  imports: [FormsModule],
  templateUrl: './edit-patient.html',
  styleUrl: './edit-patient.css'
})
export class EditPatient implements OnInit{

  patient:Patient={
    id:0,
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    insuranceProvider: '',
    insuranceNumber: ''
  }

  constructor(private route:ActivatedRoute, private patientService:Patientservice, private router:Router,private cdr:ChangeDetectorRef)
  {

  }
  id!:number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; //get id from the url
    this.loadpatient();
  }

  loadpatient()
  {
    console.log(this.id);
    this.patientService.getPatientById(this.id).subscribe({
      next: (data)=>{
        console.log(data);
        this.patient = data;
        this.cdr.detectChanges();
      },
      error:(err)=>console.error(err)
    });
  }
  onSubmit() {
    this.patientService.updatePatient(this.id, this.patient).subscribe({
      next: () => {
        alert("patient updated successfully");
         this.router.navigate(['/patient']);
      },
      error: (err)=>{
        console.error(err);
        alert("Failed to update patient !");
      }
    })
}
  onUpdate(form: any) {
    if (form.valid) {
      console.log("Updated Patient:", this.patient);
      
    }
  }
}
