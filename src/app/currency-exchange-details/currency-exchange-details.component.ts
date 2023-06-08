import { Component } from '@angular/core';
import { CRatesApiService } from '../services/c-rates-api.service';
import { Router } from '@angular/router';
import { CExDetailsService } from '../services/c-ex-details.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { Currency } from '../Currency';


@Component({
  selector: 'app-currency-exchange-details',
  templateUrl: './currency-exchange-details.component.html',
  styleUrls: ['./currency-exchange-details.component.css']
})
export class CurrencyExchangeDetailsComponent {
  cJson: any = [];
  subscription_to_destroy: Subscription = new Subscription;


/*   USD = [1.077319, 1.047735, 1.022547, 1.002471, 0.980478, 0.995406, 1.042372, 1.072673, 1.084945, 1.057686, 1.090441, 1.101055];
  isEGP: boolean = false;
  EGPRate = [19.971826, 19.699614, 19.334419, 19.303371, 19.156632, 23.901395, 25.590973, 26.498572, 32.778137, 32.39916, 33.384467, 34.058154];
 */

  //to show all drop-down list currencies
  currencies: any = [];

  A1 = 'EUR';
  B2 = 'USD';
  amount = 0;
  result: any;
  title = '';
  fulltitle = 'Currency Full-Name';

  chart: any = [];

  rates: any = [];
  Rates_arr_value: any = [];

  chartList: any = new Array<any>();
  sub: any;


  changeA(A: string) {
    this.A1 = A;
    console.log(this.A1);
  }
  changeB(B: string) {
    this.B2 = B;
    console.log(this.B2);
  }

  constructor(private c: CRatesApiService, private CExDetailsService: CExDetailsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.A1 = this.CExDetailsService.getgetc_exDetails();
    this.B2 = this.CExDetailsService.getgetc_exDetails2();
    this.amount = this.CExDetailsService.getgetc_c_exAmount();
    this.title = this.A1;

    this.fulltitle_f();

    //get all currencies
    this.subscription_to_destroy = this.c.getCurrencyRates().subscribe(response => { //Subcribe to observable [in ProductService] (to get response (stream of data)) 
      this.cJson = response;
      for (var key in this.cJson.rates) {
        this.currencies.push(key);

        // console.log(this.currencies.push(currency));
      }
    })


    //----------------------------------------------------------------------------------------------
    //console.log(this.USD);
    /*     this.arr = this.c.getCurrencyhistorical();  
        console.log('component ' + this.arr); */


    //this.c.getCurrencyhistorical();
    /* Object.getOwnPropertyNames(this.c.getCurrencyhistorical()).forEach(key => {
      let value = this.c.getCurrencyhistorical()[key];
     // console.log(value.rates) //=> ['key']
    }); */
    //----------------------------------------------------------------------------------------------


    //get all rates
    this.rates_func();

    //show chart
    this.chart_Data();
    //1st open of the page => refresh chart to show correctly
    this.sub = setInterval(() => { this.chart.update(); }, 1200);//<-- run every 1.2 second
    this.sub.unsubscribe();//stop-interval


  }

  rates_func() {
    let date = ['2022-06-30', '2022-07-31', '2022-08-31', '2022-09-30', '2022-10-31', '2022-11-30', '2022-12-31', '2023-01-31', '2023-02-28', '2023-03-31', '2023-04-30', '2023-05-31'];

    var i = 0;
    for (i = 0; i <= date.length; i++) {
      this.subscription_to_destroy = this.c.getCurrencyhistorical(date[i], this.B2).subscribe(Currencyhistorical_Object => {
        //this.chartList.push(Currencyhistorical_Object)

        this.chartList = Currencyhistorical_Object;
        //console.log(this.chartList);
        for (var key in this.chartList.rates) {
          //console.log(key);
          this.rates = this.chartList.rates[key];
          //console.log("this.rate =", this.rates);

          this.Rates_arr_value.push(this.rates)

          console.log(this.Rates_arr_value);
        }

      })
    }

    /*  //show chart
     this.chart_Data();
     this.sub = setInterval(() => { this.chart.update(); }, 1200);//<-- run every 1.2 second
     this.sub.unsubscribe();//stop-interval */

  }

  chart_Data() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [6.22, 7.22, 8.22, 9.22, 10.22, 11.22, 12.22, 1.23, 2.23, 3.23, 4.23, 5.23],
        datasets: [
          {
            label: 'currency rate (' + this.B2 + ')',
            data: this.Rates_arr_value,
            borderWidth: 3,
            fill: true,
            backgroundColor: 'rgba(93,175,89,0.1)',
            borderColor: '#3e95cd'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3, //(width/height)
      }
    })

  }


  //convert btn[event]
  convert() {
    this.subscription_to_destroy = this.c.getCurrencyRates().subscribe(response => { //Subcribe to observable [in ProductService] (to get response (stream of data)) 
      this.cJson = JSON.stringify(response);
      this.cJson = JSON.parse(this.cJson);
      // console.log(this.cJson);

      //Reset all values obtained
      this.Rates_arr_value = [];
      //Reset chart drawing
      this.chart.destroy();
      //call func again to get the new values
      this.rates_func();
      //show new chart
      this.chart_Data();

      if (this.A1 == 'EUR') {
        Object.keys(this.cJson.rates).forEach(() => {
          this.result = this.cJson.rates[this.B2] * (this.amount);
        })
      }

      if (this.A1 != 'EUR') {
        Object.keys(this.cJson.rates).forEach(() => {
          this.result = (this.cJson.rates[this.B2] / this.cJson.rates[this.A1]) * (this.amount);
        })
      }

    })


  }

  swap() {
    let temp = this.B2;
    this.B2 = (this.A1);
    this.A1 = (temp);

    this.convert();
  }


  fulltitle_f() {
    if (this.A1 == "USD") {
      this.fulltitle = "United States dollar $"
    }
    if (this.A1 == 'EGP') {
      this.fulltitle = "Egyptian pound £"
    }
    if (this.A1 == 'EUR') {
      this.fulltitle = "European Union Euro €"
    }
    if (this.A1 == 'GBP') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AED') {
      this.fulltitle = "United Arab Emirates dirham د.إ";
    }
    if (this.A1 == 'AFN') {
      this.fulltitle = "Afghan afghani ؋"
    }
    if (this.A1 == 'ALL') {
      this.fulltitle = "Albanian lek L"
    }
    if (this.A1 == 'AMD') {
      this.fulltitle = "Armenian dram ֏"
    }
    if (this.A1 == 'ANG') {
      this.fulltitle = "Netherlands Antillean guilder ƒ"
    }
    if (this.A1 == 'AOA') {
      this.fulltitle = "Angolan kwanza Kz"
    }
    if (this.A1 == 'ARS') {
      this.fulltitle = "Argentine peso $"
    }
    if (this.A1 == 'AUD') {
      this.fulltitle = "Australian dollar $"
    }
    if (this.A1 == 'AWG') {
      this.fulltitle = "Aruban florin ƒ"
    }
    if (this.A1 == 'AZN') {
      this.fulltitle = "Azerbaijani manat ₼"
    }
    if (this.A1 == 'BAM') {
      this.fulltitle = "Bosnia and Herzegovina convertible mark"
    }
    if (this.A1 == 'BBD') {
      this.fulltitle = "Barbadian dollar $"
    }
    if (this.A1 == 'BDT') {
      this.fulltitle = "Bangladeshi taka ৳"
    }
    if (this.A1 == 'BGN') {
      this.fulltitle = "Bulgarian lev лв"
    }
    if (this.A1 == 'BHD') {
      this.fulltitle = "Bahraini dinar د.ب"
    }
    if (this.A1 == 'BIF') {
      this.fulltitle = "Burundian franc Fr"
    }
    if (this.A1 == 'BMD') {
      this.fulltitle = "Bermudian dollar $"
    }
    if (this.A1 == 'BND') {
      this.fulltitle = "Brunei dollar $"
    }
    if (this.A1 == 'BOB') {
      this.fulltitle = "Bolivian boliviano Bs."
    }
    if (this.A1 == 'BRL') {
      this.fulltitle = "Brazilian real R$"
    }
    if (this.A1 == 'BSD') {
      this.fulltitle = "Bahamian dollar $"
    }
    if (this.A1 == 'BTC') {
      this.fulltitle = "Bitcoin ₿"
    }
    if (this.A1 == 'BTN') {
      this.fulltitle = "Bhutanese ngultrum Nu."
    }
    if (this.A1 == 'BWP') {
      this.fulltitle = "Botswana pula P"
    }
    if (this.A1 == 'BYN') {
      this.fulltitle = "Belarusian ruble Br"
    }
    if (this.A1 == 'BYR') {
      this.fulltitle = "Bulgarian Lev"
    }
    if (this.A1 == 'BZD') {
      this.fulltitle = "Belize dollar $"
    }
    if (this.A1 == 'CAD') {
      this.fulltitle = "Canadian dollar $"
    }
    if (this.A1 == 'CDF') {
      this.fulltitle = "Congolese franc FC"
    }
    if (this.A1 == 'CHF') {
      this.fulltitle = "Swiss franc Fr."
    }
    if (this.A1 == 'CLF') {
      this.fulltitle = "Chilean Unit of Account (UF)"
    }
    if (this.A1 == 'CLP') {
      this.fulltitle = "Chilean peso $"
    }
    if (this.A1 == 'CNY') {
      this.fulltitle = "Chinese yuan ¥"
    }
    if (this.A1 == 'COP') {
      this.fulltitle = "Colombian peso $"
    }
    if (this.A1 == 'CRC') {
      this.fulltitle = "Costa Rican colón ₡"
    }
    if (this.A1 == 'CUC') {
      this.fulltitle = "Cuban convertible peso $"
    }
    if (this.A1 == 'CUP') {
      this.fulltitle = "Cuban peso $"
    }
    if (this.A1 == 'CVE') {
      this.fulltitle = "Cape Verdean escudo Esc"
    }
    if (this.A1 == 'CZK') {
      this.fulltitle = "Czech koruna Kč"
    }
    if (this.A1 == 'DJF') {
      this.fulltitle = "Djiboutian franc Fr"
    }
    if (this.A1 == 'DKK') {
      this.fulltitle = "Danish krone kr"
    }
    if (this.A1 == 'DOP') {
      this.fulltitle = "Dominican peso $"
    }
    if (this.A1 == 'DZD') {
      this.fulltitle = "Algerian dinar دج"
    }
    if (this.A1 == 'ERN') {
      this.fulltitle = "Eritrean nakfa Nfk"
    }
    if (this.A1 == 'ETB') {
      this.fulltitle = "Ethiopian birr Br"
    }
    if (this.A1 == 'FJD') {
      this.fulltitle = "Fijian dollar $"
    }
    if (this.A1 == 'FKP') {
      this.fulltitle = "Falkland Islands pound £"
    }



    if (this.A1 == 'GEL') {
      this.fulltitle = "lari ₾"
    }
    if (this.A1 == 'GGP') {
      this.fulltitle = "Guernsey pound £"
    }
    if (this.A1 == 'GHS') {
      this.fulltitle = "Ghanaian cedi ₵"
    }
    if (this.A1 == 'GIP') {
      this.fulltitle = "Gibraltar pound £"
    }
    if (this.A1 == 'GMD') {
      this.fulltitle = "dalasi D"
    }
    if (this.A1 == 'GNF') {
      this.fulltitle = "Guinean franc Fr"
    }
    if (this.A1 == 'GTQ') {
      this.fulltitle = "Guatemalan quetzal Q"
    }
    if (this.A1 == 'GYD') {
      this.fulltitle = "Guyanese dollar $"
    }
    if (this.A1 == 'HKD') {
      this.fulltitle = "Hong Kong dollar $"
    }
    if (this.A1 == 'HNL') {
      this.fulltitle = "Honduran lempira L"
    }
    if (this.A1 == 'HRK') {
      this.fulltitle = "Croatian kuna kn"
    }
    if (this.A1 == 'HTG') {
      this.fulltitle = "Haitian gourde G"
    }
    if (this.A1 == 'HUF') {
      this.fulltitle = "Hungarian forint Ft"
    }
    if (this.A1 == 'IDR') {
      this.fulltitle = "Indonesian rupiah Rp"
    }
    if (this.A1 == 'ILS') {
      this.fulltitle = "Nothing"
    }
    if (this.A1 == 'IMP') {
      this.fulltitle = "Manx pound £"
    }
    if (this.A1 == 'INR') {
      this.fulltitle = "Indian rupee ₹"
    }
    if (this.A1 == 'IQD') {
      this.fulltitle = "Iraqi dinar ع.د"
    }
    if (this.A1 == 'IRR') {
      this.fulltitle = "Iranian rial ﷼"
    }
    if (this.A1 == 'ISK') {
      this.fulltitle = "Icelandic króna kr"
    }
    if (this.A1 == 'JEP') {
      this.fulltitle = "Jersey pound £"
    }
    if (this.A1 == 'JMD') {
      this.fulltitle = "Jamaican dollar $"
    }
    if (this.A1 == 'JOD') {
      this.fulltitle = "Jordanian dinar JD"
    }
    if (this.A1 == 'JPY') {
      this.fulltitle = "Japanese yen ¥"
    }
    if (this.A1 == 'KES') {
      this.fulltitle = "Kenyan shilling Sh"
    }
    if (this.A1 == 'KGS') {
      this.fulltitle = "Kyrgyzstani som с"
    }
    if (this.A1 == 'KHR') {
      this.fulltitle = "Cambodian riel ៛"
    }
    if (this.A1 == 'KMF') {
      this.fulltitle = "Comorian franc Fr"
    }
    if (this.A1 == 'KPW') {
      this.fulltitle = "North Korean won ₩"
    }
    if (this.A1 == 'KRW') {
      this.fulltitle = "South Korean won ₩"
    }
    if (this.A1 == 'KWD') {
      this.fulltitle = "Kuwaiti dinar د.ك"
    }
    if (this.A1 == 'KYD') {
      this.fulltitle = "Cayman Islands dollar $"
    }
    if (this.A1 == 'KZT') {
      this.fulltitle = "Kazakhstani tenge ₸"
    }
    if (this.A1 == 'LAK') {
      this.fulltitle = "Lao kip ₭"
    }
    if (this.A1 == 'LBP') {
      this.fulltitle = "Lebanese pound "
    }
    if (this.A1 == 'LKR') {
      this.fulltitle = "Sri Lankan rupee Rs රු"
    }
    if (this.A1 == 'LRD') {
      this.fulltitle = "Liberian dollar $"
    }
    if (this.A1 == 'LSL') {
      this.fulltitle = "Lesotho loti L"
    }
    if (this.A1 == 'LTL') {
      this.fulltitle = "Lithuanian Litas"
    }
    if (this.A1 == 'LVL') {
      this.fulltitle = "Latvian lats"
    }
    if (this.A1 == 'LYD') {
      this.fulltitle = "Libyan dinar"
    }
    if (this.A1 == 'MAD') {
      this.fulltitle = "Moroccan dirham DH"
    }
    if (this.A1 == 'MDL') {
      this.fulltitle = "Moldovan leu"
    }
    if (this.A1 == 'MGA') {
      this.fulltitle = "Malagasy ariary"
    }
    if (this.A1 == 'MKD') {
      this.fulltitle = "denar den"
    }
    if (this.A1 == 'MMK') {
      this.fulltitle = "Burmese kyat Ks"
    }
    if (this.A1 == 'MNT') {
      this.fulltitle = "Mongolian tögrög ₮"
    }
    if (this.A1 == 'MOP') {
      this.fulltitle = "Macanese pataca P"
    }
    if (this.A1 == 'MRO') {
      this.fulltitle = "Mauritanian ouguiya"
    }
    if (this.A1 == 'MUR') {
      this.fulltitle = "Mauritian rupee ₨"
    }
    if (this.A1 == 'MVR') {
      this.fulltitle = "Maldivian rufiyaa .ރ"
    }
    if (this.A1 == 'MWK') {
      this.fulltitle = "Malawian kwacha"
    }
    if (this.A1 == 'MXN') {
      this.fulltitle = "Mexican peso"
    }
    if (this.A1 == 'MYR') {
      this.fulltitle = "Malaysian ringgit RM"
    }
    if (this.A1 == 'MZN') {
      this.fulltitle = " Mozambican metical MT"
    }
    if (this.A1 == 'NAD') {
      this.fulltitle = "Namibian Dollar"
    }
    if (this.A1 == 'NGN') {
      this.fulltitle = "Nigerian naira ₦"
    }
    if (this.A1 == 'NIO') {
      this.fulltitle = "Nicaraguan córdoba C$"
    }
    if (this.A1 == 'NOK') {
      this.fulltitle = "Norwegian krone"
    }
    if (this.A1 == 'NPR') {
      this.fulltitle = "Nepalese rupee ₨"
    }
    if (this.A1 == 'NZD') {
      this.fulltitle = "New Zealand dollar $"
    }
    if (this.A1 == 'OMR') {
      this.fulltitle = "Omani rial ر.ع."
    }
    if (this.A1 == 'PAB') {
      this.fulltitle = "Panamanian balboa B/."
    }
    if (this.A1 == 'PEN') {
      this.fulltitle = "Peruvian sol S/"
    }
    if (this.A1 == 'PGK') {
      this.fulltitle = "Papua New Guinean kina K"
    }
    if (this.A1 == 'PHP') {
      this.fulltitle = "Philippine peso ₱"
    }
    if (this.A1 == 'PKR') {
      this.fulltitle = "Pakistani rupee ₨"
    }
    if (this.A1 == 'PLN') {
      this.fulltitle = "Polish złoty zł"
    }
    if (this.A1 == 'PYG') {
      this.fulltitle = "Paraguayan guaraní ₲"
    }
    if (this.A1 == 'QAR') {
      this.fulltitle = "Qatari riyal ر.ق"
    }
    if (this.A1 == 'RON') {
      this.fulltitle = "Romanian leu "
    }
    if (this.A1 == 'RSD') {
      this.fulltitle = "Serbian dinar дин."
    }
    if (this.A1 == 'RUB') {
      this.fulltitle = "Russian ruble ₽"
    }
    if (this.A1 == 'RWF') {
      this.fulltitle = "Rwandan franc"
    }
    if (this.A1 == 'SAR') {
      this.fulltitle = "Saudi riyal"
    }
    if (this.A1 == 'SBD') {
      this.fulltitle = "Solomon Islands dollar"
    }
    if (this.A1 == 'SCR') {
      this.fulltitle = "Seychellois rupee"
    }
    if (this.A1 == 'SDG') {
      this.fulltitle = "Sudanese pound"
    }
    if (this.A1 == 'SEK') {
      this.fulltitle = "Swedish krona"
    }
    if (this.A1 == 'SGD') {
      this.fulltitle = "Singapore dollar $"
    }
    if (this.A1 == 'SHP') {
      this.fulltitle = "Saint Helena pound"
    }
    if (this.A1 == 'SLE') {
      this.fulltitle = "Sierra Leonean"
    }
    if (this.A1 == 'SLL') {
      this.fulltitle = "Sierra Leonean leone"
    }
    if (this.A1 == 'SOS') {
      this.fulltitle = "Somali shilling"
    }
    if (this.A1 == 'SRD') {
      this.fulltitle = "Surinamese dollar $"
    }
    if (this.A1 == 'STD') {
      this.fulltitle = "São Tomé and Príncipe dobra"
    }
    if (this.A1 == 'SVC') {
      this.fulltitle = "Salvadoran Colón"
    }
    if (this.A1 == 'SYP') {
      this.fulltitle = "Syrian pound"
    }
    if (this.A1 == 'SZL') {
      this.fulltitle = "Swazi lilangeni"
    }
    if (this.A1 == 'THB') {
      this.fulltitle = "Thai baht"
    }
    if (this.A1 == 'TJS') {
      this.fulltitle = "Tajikistani somoni"
    }
    if (this.A1 == 'TMT') {
      this.fulltitle = "Turkmenistan manat"
    }
    if (this.A1 == 'TND') {
      this.fulltitle = "Tunisian dinar"
    }
    if (this.A1 == 'TOP') {
      this.fulltitle = "Tongan paʻanga"
    }
    if (this.A1 == 'TRY') {
      this.fulltitle = "Turkish lira ₺"
    }
    if (this.A1 == 'TTD') {
      this.fulltitle = "Trinidad and Tobago dollar"
    }
    if (this.A1 == 'TWD') {
      this.fulltitle = "New Taiwan dollar"
    }
    if (this.A1 == 'TZS') {
      this.fulltitle = "Tanzanian shilling"
    }
    if (this.A1 == 'UAH') {
      this.fulltitle = "Ukrainian hryvnia ₴"
    }
    if (this.A1 == 'UGX') {
      this.fulltitle = "Ugandan shilling"
    }
    if (this.A1 == 'UYU') {
      this.fulltitle = "Uruguayan peso"
    }
    if (this.A1 == 'UZS') {
      this.fulltitle = "Uzbekistani soʻm"
    }
    if (this.A1 == 'VEF') {
      this.fulltitle = "Venezuelan bolívar"
    }
    if (this.A1 == 'VES') {
      this.fulltitle = "Venezuelan bolívar soberano"
    }
    if (this.A1 == 'VND') {
      this.fulltitle = "Vietnamese đồng ₫"
    }
    if (this.A1 == 'VUV') {
      this.fulltitle = "Vanuatu vatu Vt"
    }
    if (this.A1 == 'WST') {
      this.fulltitle = "Samoan tālā"
    }
    if (this.A1 == 'XAF') {
      this.fulltitle = "Central African CFA franc"
    }
    if (this.A1 == 'XAG') {
      this.fulltitle = "Silver Ounce"
    }
    if (this.A1 == 'XAU') {
      this.fulltitle = "Gold Ounce"
    }
    if (this.A1 == 'XCD') {
      this.fulltitle = "Eastern Caribbean dollar";
    }
    if (this.A1 == 'XDR') {
      this.fulltitle = "Special Drawing Rights"
    }
    if (this.A1 == 'XOF') {
      this.fulltitle = "West African CFA franc"
    }
    if (this.A1 == 'XPF') {
      this.fulltitle = "CFP franc"
    }
    if (this.A1 == 'YER') {
      this.fulltitle = "Yemeni rial"
    }
    if (this.A1 == 'ZAR') {
      this.fulltitle = "South African rand"
    }
    if (this.A1 == 'ZMK') {
      this.fulltitle = "Zambian Kwacha"
    }
    if (this.A1 == 'ZMW') {
      this.fulltitle = "Zambian Kwacha"
    }
    if (this.A1 == 'ZWL') {
      this.fulltitle = "Zimbabwean dollar $"
    }

  }


  //unless using this one the [subscription (subscribe)] will stack to infinity and beyond😌
  ngOnDestroy(): void {
    this.subscription_to_destroy.unsubscribe();
  }


}
