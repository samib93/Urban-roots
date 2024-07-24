import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  private map: any;
  @Output() locationFound = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.locateUser();
  }

  private locateUser(): void {
    this.map.locate({setView: true, maxZoom: 16});

    this.map.on('locationfound', (e: any) => {
      this.locationFound.emit(e.latlng);
      L.marker([e.latitude, e.longitude]).addTo(this.map)
        .bindPopup('Vous êtes ici').openPopup();
    });

    this.map.on('locationerror', (e: any) => {
      alert("Location access denied.");
    });
  }

}
