import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css'],
    standalone: false
})
export class BaseComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/products']);
    }, 1700); 
  }

  onActivate(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }
}
