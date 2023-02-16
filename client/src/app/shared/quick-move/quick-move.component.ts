import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-move',
  templateUrl: './quick-move.component.html',
  styleUrls: ['./quick-move.component.css']
})
export class QuickMoveComponent implements OnInit {
  hideUp: boolean = false
  hideDown: boolean = false
  limit!: number

  constructor() { }

  ngOnInit(): void {
    this.limit = document.body.scrollHeight
  }

  @HostListener('window:scroll', ['$event'])
  track(event: any) {
      // console.debug("Scroll Event", window.pageYOffset );
      // console.log(this.limit);
      // console.log(scrollMaxValue());

      if (window.pageYOffset > 0) {
        this.hideUp = false
      } else {
        this.hideUp = true
      }

      if (Math.round(window.pageYOffset) + 10 < scrollMaxValue()) {
        this.hideDown = false
      } else {
        this.hideDown = true
      }
  }

  scrollToBottom(): void {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

const scrollMaxValue = () => {
  const body = document.body;
  const html = document.documentElement;

  const documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const windowHeight = window.innerHeight;

  return documentHeight - windowHeight;
};