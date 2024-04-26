import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-toast.component.html',
})
export class ErrorToastComponent {
  @Input() message: string | undefined
  isVisible: boolean = true

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false
    }, 2000)
  }

  close() {
    this.isVisible = false
  }
}
