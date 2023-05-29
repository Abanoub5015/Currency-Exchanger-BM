
export class Currency{
  rates: any;
  full_name: string;
  name: string;
  symbol: string;

  constructor(){
      this.rates = [];
      this.full_name= '';
      this.name= '';
      this.symbol= '';
  }
}
