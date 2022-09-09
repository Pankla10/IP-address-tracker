import { Component, OnInit, Input } from '@angular/core';
//import * as L from 'node_modules/leaflet/dist';
import * as L from 'leaflet'
//import markerIconPng from "leaflet/dist/images/markerIconPng";
import {IpGeolocationService} from '../services/ip-geolocation.service' 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
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
    })
  }


  map: any = {};

  ngOnInit(): void {
    this.map = L.map('map', this.mapOptions).setView([51.505, -0.09], 3)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(this.map);

  }
  
  updateMap(){
    this.map.remove();
    
    this.map = L.map('map', this.mapOptions).setView([this.lat, this.lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(this.map);

const myIcon = L.icon({
  iconUrl: "../assets/marker-icon.png"
})

var marker = L.marker([this.lat, this.lng],
  {alt: 'Searched place', icon: myIcon}).addTo(this.map)
  .bindPopup(this.ipGeolocationService.city);
  }
  
  backToTop(){
    window.scrollTo({
      top: 0,
    behavior: "smooth"
    })
  }

}
