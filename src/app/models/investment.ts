
export class Investment {
    public ID: number;
    public Asset: string = '';
    public UnitValue: number;
    public Nominals: number;
    public Date : Date;
    public InvestmentType : InvestmentType;
    public Expenses : number;
    public ArsUsdRate : number;
    public BuyPriceUsd : number;
    public BuyPriceArs : number;

    constructor() {
        this.ID = 0;
        this.Asset = '';
        this.UnitValue = 0;
        this.Nominals = 0;
        this.Date = new Date();
        this.InvestmentType = InvestmentType.Equitie;
        this.Expenses = 0;
        this.ArsUsdRate = 0;
        this.BuyPriceArs = 0;
        this.BuyPriceUsd = 0;
    }
}

export enum InvestmentType {
    Fixed = 0,
    Equitie = 1
}