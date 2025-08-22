import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../types';

@Injectable({
  providedIn: 'root'
})
export class Patientservice {
  
  private apiUrl:string="http://localhost:1011/patients";

  constructor(private http:HttpClient)
  {

  }

  createPatient(patient:any): Observable<any>{
    return this.http.post(`${this.apiUrl}`, patient);
  }

  getPatients(): Observable<Patient[]> {
  return this.http.get<Patient[]>(this.apiUrl);
  }

  deletePatient(id:number|undefined):Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePatient(id:number, patient:Patient):Observable<any>
  {
    return this.http.put(`${this.apiUrl}/${id}`,patient);
  }

  getPatientById(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
