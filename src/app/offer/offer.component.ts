import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Offer } from '../offer.interface'
import { OfferService } from '../offer.service'
import { NgFor } from '@angular/common'
import { Comment } from '../comment.interface'
import { CommentService } from '../comment.service'

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './offer.component.html',
})
export class OfferComponent implements OnInit {
  offer!: Offer
  comments!: Comment[]

  constructor(
    private offerService: OfferService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = +params['id']
      this.offer = this.offerService.getOfferById(id)
      this.comments = this.commentService.getCommentsByOfferId(id)
      if (this.offer == null) {
        this.router.navigateByUrl('/404')
      }
    })
  }

  floor(n: number) {
    return Math.floor(n)
  }
}
