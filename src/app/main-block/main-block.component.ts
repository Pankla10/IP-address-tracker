import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.css']
})
export class MainBlockComponent implements OnInit {

  ip?: string;
  city?: string;
  region?: string;
  timezone?: string;
  isp?: string;
 // lat?: number;
 // lng?: number;

  constructor() { }

  ngOnInit(): void {
  }

  setValue(response: any){
    //this.lat = response.location.lat;
   //this.lng = response.location.lng;
    console.log(response)
   this.ip = response.ip;
   this.city = response.location.city;
   this.region = response.location.region;
   this.timezone = response.location.timezone;
   this.isp = response.isp;
   console.log(this.ip)
   console.log(this.city)
  }

}
