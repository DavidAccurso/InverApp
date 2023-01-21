import { RouterModule, Routes } from '@angular/router';
import { AddInvestmentComponent } from './investment/add-investment/add-investment.component';
import { ViewInvestmentComponent } from './investment/view-investment/view-investment.component';

const appRoutes = [
    { path: 'add-investment', component: AddInvestmentComponent,  pathMatch: 'full'},
    { path: 'view-investment', component: ViewInvestmentComponent,  pathMatch: 'full'},
    { path: 'view-investment/:id', component: ViewInvestmentComponent},
    { path: '**', component: AddInvestmentComponent}
  ];
export const routing = RouterModule.forRoot(appRoutes);
