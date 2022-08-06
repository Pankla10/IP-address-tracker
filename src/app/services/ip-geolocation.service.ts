import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpGeolocationService {
  lat: number = 0;
  lng: number = 0;
  city: string = '';

  constructor(private http: HttpClient) { }

  private subject = new Subject<void>();

  ipGeolocation(ip: any){
   return this.http.get<any>("https://geo.ipify.org/api/v2/country,city",{params: new HttpParams().set('apiKey', environment.apiKey).set('ipAddress',ip)})

  }

  sendFunction(latParam: number, lngParam: number, cityParam: string){
    this.lat = latParam;
    this.lng = lngParam;
    this.city = cityParam;
    this.subject.next();
  }

  getFunction(): Observable<any>{
    return this.subject.asObservable();
  }
}
