import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormGroup,Validators, FormBuilder} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {DataService} from './data.service'
import { AgmCoreModule } from '@agm/core';
import {MatAutocompleteModule,MatBadgeModule,MatBottomSheetModule, MatButtonModule,MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,

} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from 'ng2-select';

@NgModule({
  declarations: [
    AppComponent,
    LocationSearchComponent
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatRippleModule,
    MatTableModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    SelectModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports: [ 
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,],
})
export class AppModule { }
