import { Component } from '@angular/core';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { SessionService } from '../../../services/session.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-guide-jardin',
  standalone: true,
  imports: [CommonModule, HeaderComponent],  // Ajoutez HeaderComponent ici
  templateUrl: './guide-jardin.component.html',
  styleUrls: ['./guide-jardin.component.css']  // Corrigez `styleUrl` en `styleUrls`
})
export class GuideJardinComponent {
  activePage = 'guide-jardin';  // Ajoutez cette propriété pour binder à `activePage`
}