import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Offer } from './offer.interface'
import { Comment } from './comment.interface'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = '' // TODO

  commentsMock: Comment[] = [
    {
      id: 1,
      offerId: 1,
      author: 'John Doe',
      content: 'Bon logement, propre, je valide !',
      stars: 4,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-1.webp',
    },
    {
      id: 2,
      offerId: 1,
      author: 'Robert M',
      content: "J'aime bien, jolie vue..",
      stars: 3,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-2.webp',
    },
    {
      id: 3,
      offerId: 2,
      author: 'Eric',
      content: 'Super chambre !!',
      stars: 5,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-3.webp',
    },
    {
      id: 4,
      offerId: 3,
      author: 'Harry',
      content: 'Très bon moment en famille.',
      stars: 4,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-4.webp',
    },
    {
      id: 5,
      offerId: 4,
      author: 'Pierre',
      content: 'Le calme absolu !! Je recommande.',
      stars: 5,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-5.webp',
    },
    {
      id: 6,
      offerId: 5,
      author: 'James',
      content: 'Pas super satisfait de la propreté du bien..',
      stars: 2,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-6.webp',
    },
    {
      id: 7,
      offerId: 6,
      author: 'Marie',
      content: "C'est salle !",
      stars: 1,
      date: new Date('04-13-2024'),
      pfpUrl: 'https://readymadeui.com/team-6.webp',
    },
  ]

  constructor(private http: HttpClient) {}

  // TODO
  // getCommentsByOfferId(): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(`${this.baseUrl}/comments`);
  // }

  getCommentsByOfferId(id: number): Offer[] | any {
    let comments = this.commentsMock.filter((c) => c.offerId == id)
    return comments
  }
}
