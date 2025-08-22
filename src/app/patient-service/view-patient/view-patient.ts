import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patientservice } from '../../service/patientservice';
import { Patient } from '../../types';

@Component({
  selector: 'app-view-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-patient.html',
  styleUrls: ['./view-patient.css']
})
export class ViewPatient implements OnInit {

  patients: Patient[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(
    private patientService: Patientservice,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = Array.isArray(data) ? data : [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch patients';
        this.isLoading = false;
      }
    });
  }

  editPatient(id: number) {
    this.router.navigate(['/edit-patient', id]);
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => this.loadPatients(),
        error: (err) => console.error("Delete failed:", err)
      });
    }
  }
}
