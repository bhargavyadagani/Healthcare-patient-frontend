import { Routes } from '@angular/router';
import { ViewPatient } from './patient-service/view-patient/view-patient';
import { AddPatient } from './patient-service/add-patient/add-patient';
import { EditPatient } from './patient-service/edit-patient/edit-patient';

export const routes: Routes = [
    {path:'patient',component: ViewPatient},
    {path:'add-patient', component:AddPatient},
    { path: 'edit-patient/:id', component: EditPatient }, 
  
];
