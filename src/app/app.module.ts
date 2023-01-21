import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { AddInvestmentComponent } from './investment/add-investment/add-investment.component';
import { EditInvestmentComponent } from './investment/edit-investment/edit-investment.component';
import { ViewInvestmentComponent } from './investment/view-investment/view-investment.component';
import { ResultsComponent } from './results/results.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './investment/view-investment/table/table.component';

//Ruteo
import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    AddInvestmentComponent,
    EditInvestmentComponent,
    ViewInvestmentComponent,
    HeaderComponent,
    FooterComponent,
    ResultsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
