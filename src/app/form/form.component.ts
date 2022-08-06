import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {IpGeolocationService} from '../services/ip-geolocation.service' 

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() responseEvent = new EventEmitter<any>();
  lat: number = 0;
  lng: number = 0;
  city: string = '';

  constructor(public ipGeolocationService:IpGeolocationService) { }

  ngOnInit(): void {
  }
  
  ipSearch = new FormGroup({
    ip: new FormControl('', [Validators.required,Validators.maxLength(15),Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]),
    submit: new FormControl('search')
  })

  onSubmit(){
    //this.response.emit(this.ipGeolocationService.ipGeolocation(this.ipSearch.value.ip))
   /* this.ipGeolocationService.ipGeolocation(this.ipSearch.value.ip).subscribe({
      next: (response) =>
      this.response.emit(response),
      next: response =>
      this.response1 = response
    })*/
    if(this.ipSearch.valid){
      this.ipGeolocationService.ipGeolocation(this.ipSearch.value.ip).subscribe(response => {
        console.log(response);
        this.responseEvent.emit(response),
        this.lat = response.location.lat,
        this.lng = response.location.lng,
        this.city = response.location.city,
        this.ipGeolocationService.sendFunction(this.lat, this.lng, this.city)
        //console.log(this.responseVariable)
      })
    };
  }

}
