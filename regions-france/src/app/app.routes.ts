import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/general/home-page/home-page.component';
import { GoogleLogInComponent } from './components/google-log-in/google-log-in.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { RegionsComponent } from './pages/general/regions/regions.component';
import { GuideJardinComponent } from './pages/general/guide-jardin/guide-jardin.component';
import { ForumComponent } from './pages/general/forum/forum.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: GoogleLogInComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'historique', component: HistoriqueComponent},
    {path:'regions', component: RegionsComponent},
    {path:'guide-jardin', component: GuideJardinComponent},
    {path:'Forum', component: ForumComponent},

];
