import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {

  sessions: any[] = [];
  userEmail: string | undefined;

  constructor(
    
    private sessionService: SessionService,
    private authService: AuthGoogleService,
    
  ) {this.activePage = 'historique' }


  public activePage!: string

 
  getClickedRegionCode(code: object){
    console.log(code)
  }

  ngOnInit(): void {
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.userEmail = profile.email;
        this.retrieveUserSessions();
      }
    });
  }

  retrieveUserSessions() {
    if (this.userEmail) {
      this.sessionService.getUserSessions(this.userEmail).subscribe(
        (data: any[]) => {
          this.sessions = data;
        },
        (error) => {
          console.error('Failed to retrieve user sessions:', error);
        }
      );
    } else {
      console.error('User email not available');
    }
  }


}
