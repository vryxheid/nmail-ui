import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNgModule } from './shared/primeng/primeng.module';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeNgModule],
  providers: [ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('nmail-dark');
  }
}
