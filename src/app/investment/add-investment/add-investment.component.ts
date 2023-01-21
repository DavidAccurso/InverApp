import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl}  from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { FloatLabelType } from '@angular/material/form-field';
import { Investment } from 'src/app/models/investment';
import { BcraService } from 'src/app/services/bcra/bcra.service';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.component.html',
  styleUrls: ['./add-investment.component.scss'],
  providers: [BcraService]
})
export class AddInvestmentComponent implements OnInit {

  _bcraService: BcraService;

  InUsd : boolean = false;

  addInvestmentForm : FormGroup;

  InvestmentType = new FormControl('fixed' as FloatLabelType);
  Asset = new FormControl('');
  ArsBoughtPrice = new FormControl({value: '', disabled: this.InUsd});
  UsdBoughtPrice = new FormControl({value: '', disabled: !this.InUsd, Validators}, new Validators());
  ArsUsdRate = new FormControl('307');
  Nominals = new FormControl('');
  UnitValue = new FormControl('');

  // TODO cambiar formato fecha a arg
  Date = new FormControl(new Date() as Date);
  Expenses = new FormControl('');
  // equitie
  Dividends = new FormControl('');
  // fixed
  Rate = new FormControl('');
  Duration = new FormControl('')

  constructor(private _formBuilder: FormBuilder, private bcraService: BcraService, private investmentService : InvestmentService) { 
    this.addInvestmentForm = this._formBuilder.group({
      InvestmentType : this.InvestmentType,
      Asset : this.Asset,
      ArsBoughtPrice : this.ArsBoughtPrice,
      UsdBoughtPrice : this.UsdBoughtPrice,
      ArsUsdRate: this.ArsUsdRate,
      Date : this.Date,
      Expenses : this.Expenses,
      Nominals : this.Nominals,
      Dividends : this.Dividends,
      UnitValue : this.UnitValue,
      Rate : this.Rate,
      Duration : this.Duration
    });

    this._bcraService = bcraService; 
    this.InvestmentType.valueChanges.subscribe(w => {this.setValidators(); console.log(w)});
  }

  setValidators() {
    // this.ArsUsdRate.addValidators(Validators.required);
    // this.ArsBoughtPrice.addValidators(Validators.required);
    // this.UsdBoughtPrice.addValidators(Validators.required);
    // this.Asset.addValidators(Validators.required);
    // this.Date.addValidators(Validators.required);
    // this.Expenses.addValidators(Validators.required);
    // this.Nominals.addValidators(Validators.required);
    // this.UnitValue.addValidators(Validators.required);

    // if(this.isEquitie()){
    //   this.Dividends.addValidators(Validators.required);

    //   this.Rate.clearValidators();
    //   this.Duration.clearValidators();

    // } else {
    //   this.Rate.addValidators(Validators.required);
    //   this.Duration.addValidators(Validators.required);

    //   this.Dividends.clearValidators();
    // }
  }

  ngOnInit(): void {
    this.setArsUsdTodayRate();
    this.setValidators();
  }

  isEquitie() : Boolean {
    return this.addInvestmentForm.controls["InvestmentType"].value == 'equitie';
  }
  
  onSubmit() {
    let investment : Investment = new Investment();
    investment.Asset = this.Asset.value;
    investment.UnitValue = this.UnitValue.value;
    investment.Nominals = this.Nominals.value;
    investment.Expenses = this.Expenses.value;
    investment.Date = new Date();
    investment.BuyPriceArs = this.ArsBoughtPrice.value;
    investment.BuyPriceUsd = this.ArsUsdRate.value;
    investment.InvestmentType = this.InvestmentType.value;

    console.log(investment);
    this.investmentService.InsertInvestment(investment);
  }

  setArsUsdTodayRate(){
    this._bcraService.getTodayUsdBoughtPrice().subscribe(w => {
      this.ArsUsdRate.setValue(w.v!);
    });
  }

  changeToUsd() {
    this.InUsd = !this.InUsd;
    this.autocompleteOtherCurrency();
    if(this.InUsd){
      this.UsdBoughtPrice.enable();
      this.ArsBoughtPrice.disable(); 
    } else {
      this.UsdBoughtPrice.disable();
      this.ArsBoughtPrice.enable();
    }
  }

  autocompleteOtherCurrency(){
    if(this.InUsd){
      this.ArsBoughtPrice.setValue((this.UsdBoughtPrice.value * this.ArsUsdRate.value).toFixed(2));
    } else {
      this.UsdBoughtPrice.setValue((this.ArsBoughtPrice.value / this.ArsUsdRate.value).toFixed(2));
    }
  }

  autocompleteNominalsValues() {
    if(!this.InUsd) {
      if(this.UnitValue.value) {
        this.ArsBoughtPrice.setValue((this.Nominals.value * this.UnitValue.value).toFixed(2));
      } else if(this.ArsBoughtPrice.value) {
        this.UnitValue.setValue((this.ArsBoughtPrice.value / this.Nominals.value).toFixed(2));
      }
    } else {
      if(this.UnitValue.value) {
        this.UsdBoughtPrice.setValue((this.Nominals.value * this.UnitValue.value).toFixed(2));
      } else if(this.UsdBoughtPrice.value) {
        this.UnitValue.setValue((this.UsdBoughtPrice.value / this.Nominals.value).toFixed(2));
      }
    }
   this.autocompleteOtherCurrency(); 
  }
}
