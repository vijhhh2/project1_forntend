import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppMaterialModule } from '../app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './reducers/dashboard.reducer';

@NgModule({
  declarations: [DashboardComponent, SettingsComponent, HomeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forFeature('dashboard', fromDashboard.reducer),
  ]
})
export class DashboardModule { }
