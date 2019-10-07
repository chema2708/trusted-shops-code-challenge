import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trusted-shops';
  @ViewChild('textarea', {static: false}) text: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;

  stars = [{
    id: 1,
    selected: false,
    highlighted: false
  }, {
    id: 2,
    selected: false,
    highlighted: false
  }, {
    id: 3,
    selected: false,
    highlighted: false
  }, {
    id: 4,
    selected: false,
    highlighted: false
  }, {
    id: 5,
    selected: false,
    highlighted: false
  }];

  constructor(private http: HttpClient) {}

  selectStar(id) {
    for (let star of this.stars) {
      if (id === star.id) {
        star.selected = !star.selected;
      }
    }
  }

  highlightStar(id) {
    for (let star of this.stars) {
      if (id === star.id) {
        star.highlighted = !star.highlighted;
      }
    }
  }

  checkSelected(id) {
    for (let star of this.stars) {
      if (id === star.id) {
        if (star.selected || star.highlighted) {
          return true;
        }
      }
    }
    return false;
  }

  handleSend(event) {
    event.preventDefault();
    if (this.text.nativeElement.value.length < 1 || this.text.nativeElement.value.length > 400) {
      alert('ERROR!! text should be more than 1 character and less than 400');
      return false;
    }
    if (this.email.nativeElement.value.length < 1) {
      alert('ERROR!! email is required');
      return false;
    }
    let starsSelected = 0;
    for (let star of this.stars) {
      if (star.selected) {
        starsSelected++;
      }
    }
    const req = this.http.post('https://trustedshopscodechallenge.free.beeceptor.com/saveReview',
    {text: this.text.nativeElement.value, email: this.email.nativeElement.value, review: starsSelected});
    req.subscribe((response) => {
      alert('Review submitted!!');
      console.log(response);
    });
  }
}
