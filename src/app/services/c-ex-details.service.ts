import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CExDetailsService {

  c_exDetails:any;
  c_exDetails2:any;
  c_exAmount:any;



  constructor() { }

  getgetc_exDetails(){
    return this.c_exDetails; 
  }

  getgetc_exDetails2(){
    return this.c_exDetails2; 
  }

  getgetc_c_exAmount(){
    return this.c_exAmount; 
  }

  addToCExDetails(c_exDetails_camefrom_c_ex:any){
    this.c_exDetails = c_exDetails_camefrom_c_ex;
    return this.c_exDetails;
  }

  addToCExDetails2(c_exDetails_camefrom_c_ex2:any){
    this.c_exDetails2 = c_exDetails_camefrom_c_ex2;
    return this.c_exDetails2;
  }

  addToc_exAmount(c_exDetails_camefrom_c_exAmount:any){
    this.c_exAmount = c_exDetails_camefrom_c_exAmount;
    return this.c_exAmount;
  }
}
