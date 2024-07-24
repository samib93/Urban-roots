import { Component,  AfterViewInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-france-map',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './france-map.component.html',
  styleUrls: ['./france-map.component.scss']
})

export class FranceMapComponent implements AfterViewInit {
  map: any;
  weatherData: any;
  airQualityData: any;  // Ajout d'une nouvelle variable pour stocker les données de qualité de l'air
  cityName = '';
  airQuality: string = '';

  constructor(private http: HttpClient) {
  }

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  getCurrentDay(): string {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('fr-FR');
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadWeatherData(latitude: number, longitude: number): void {
    const apiKey = '07e6c440f864f9dbfd33a5035c3b536c';

    const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    this.http.get(reverseGeocodingUrl).subscribe((location: any) => {
      this.cityName = location.address.city || location.address.town || location.address.village;
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apiKey}&units=metric`;
      const airQualityApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      this.http.get(weatherApiUrl).subscribe((data: any) => {
        this.weatherData = data;
        this.http.get(airQualityApiUrl).subscribe((airData: any) => {
          this.airQualityData = airData;
          this.showWeatherInfo(latitude, longitude);
        });
      });
    });
  }

  private showWeatherInfo(latitude: number, longitude: number): void {
    const popupContent = `
      <h3>${this.weatherData.name}</h3>
      <p>${this.weatherData.weather[0].description}</p>
      <p>Temperature: ${this.weatherData.main.temp} °C</p>
      <p>Air Quality: ${this.airQualityData.list[0].main.aqi}</p>  // Affichage de l'indice de qualité de l'air
    `;


    const icon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });

    const marker = L.marker([latitude, longitude], { icon })
      .bindPopup(popupContent)
      .addTo(this.map);
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      
      maxZoom: 19,
    }).addTo(this.map);

    this.getCurrentPosition().subscribe((position: any) => {
      this.map.flyTo([position.latitude, position.longitude], 13);
      this.loadWeatherData(position.latitude, position.longitude);
    });
  }
}

