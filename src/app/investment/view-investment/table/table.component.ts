import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Investment } from 'src/app/models/investment';
import { InvestmentService } from 'src/app/services/investment.service';

// const ELEMENT_DATA: Investment[] = [
//   {Asset: "GGAL", ID: 0, UnitValue: 1, ArsUsdRate: 3.1, BuyPriceArs: 3100, BuyPriceUsd: 10, Date: new Date(2022,10,30), Expenses: 0, InvestmentType: 1, Nominals: 100 },
//   {Asset: "BBVA", ID: 1, UnitValue: 1, ArsUsdRate: 2, BuyPriceArs: 4000, BuyPriceUsd: 200, Date: new Date(2022,12,1), Expenses: 100, InvestmentType: 2, Nominals: 100 },
// ];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() dataSource!: MatTableDataSource<Investment>;
  // dataSource = new MatTableDataSource<Investment>();
  displayedColumns: string[] = ['id', 'asset', 'date', 'unitValue', 'nominals', 'buyPriceArs', 'buyPriceUsd', 'arsUsdRate'];
  
  private investmentService: InvestmentService;

  constructor(private _investmentService : InvestmentService) {
    this.investmentService = _investmentService;

    this.investmentService.GetInvestments().subscribe(result => {
      this.dataSource.data = result;
    });
   }

  ngOnInit(): void {
  }

  refresh() {
    this.investmentService.GetInvestments().subscribe((data: Investment[]) => {
      this.dataSource.data = data;
    });
  }

}
