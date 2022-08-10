import { Component, OnInit, Input } from '@angular/core';
//import * as L from 'node_modules/leaflet/dist';
import * as L from 'leaflet'
import {IpGeolocationService} from '../services/ip-geolocation.service' 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //@Input() lat: any;
  //@Input() lng: any;
  lat: any = 51.505;
  lng: any = -0.09;
  scrollY: number = window.scrollY;
  mapOptions = {
    zoomControl: false
  }
  constructor(private ipGeolocationService:IpGeolocationService) { 
    this.ipGeolocationService.getFunction().subscribe(() => {
      this.lat = ipGeolocationService.lat;
      this.lng = ipGeolocationService.lng;
      this.updateMap();
    })
    document.addEventListener('scroll',()=>{
      this.scrollY = window.scrollY;
      console.log(this.scrollY)
    })
  }


  map: any = {};

  ngOnInit(): void {
    this.map = L.map('map', this.mapOptions).setView([51.505, -0.09], 3)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(this.map);

console.log(this.map)
  }
  
  updateMap(){
    
    //console.log(this.lat)
    //console.log(this.lng)
    //console.log(this.LAT);
      //this.map.currentTarget.remove();
    this.map.remove();
    
    this.map = L.map('map', this.mapOptions).setView([this.lat, this.lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(this.map);

var marker = L.marker([this.lat, this.lng],
  {alt: 'Searched place'}).addTo(this.map)
  .bindPopup(this.ipGeolocationService.city);
  }
  
  backToTop(){
    window.scrollTo({
      top: 0,
    behavior: "smooth"
    })
    //document.documentElement.scrollTop = 0;
  }

}
