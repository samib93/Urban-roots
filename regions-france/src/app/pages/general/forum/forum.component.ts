import { Component } from '@angular/core';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { SessionService } from '../../../services/session.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  activePage = 'Forum';

}
