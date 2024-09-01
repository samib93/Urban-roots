import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici
import { ForumService } from '../../../services/forum.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule], // Ajoutez FormsModule ici
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  activePage = 'Forum';
  posts: any[] = [];
  newPostContent: string = '';

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.forumService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des posts:', error);
      }
    );
  }

  submitPost(): void {
    const token = 'VOTRE_TOKEN_Ici';
    this.forumService.createPost(token, this.newPostContent).subscribe(
      (response) => {
        this.posts.push(response);
        this.newPostContent = '';
      },
      (error) => {
        console.error('Erreur lors de la création du post:', error);
      }
    );
  }
}
