import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Investment } from 'src/app/models/investment';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-view-investment',
  templateUrl: './view-investment.component.html',
  styleUrls: ['./view-investment.component.scss']
})
export class ViewInvestmentComponent implements OnInit {

  private investmentService: InvestmentService;

  public investments : Investment[];
  public dataSource = new MatTableDataSource<Investment>();

  constructor(private _investmentService : InvestmentService) {
    this.investmentService = _investmentService;
    this.investments = [];
   }

  ngOnInit(): void {
    this.getInvestments();
    this.dataSource.connect();
  }

  getInvestments() {
    this.investmentService.GetInvestments().subscribe(result => {
      this.investments = result;
    });
    return this.investments;
  }
}
