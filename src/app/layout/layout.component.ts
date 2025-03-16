import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../shared/primeng/primeng.module';
import { NavigationItem } from './model/navigation-item.model';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule, CommonModule, PrimeNgModule],
  providers: [LayoutService],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public sidebarExpanded: boolean = true;

  public darkModeActive = true;

  public menuItems: NavigationItem[] = [];

  constructor(private router: Router, private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.menuItems = this.layoutService.getNavigationItems();
    // .filter((navItem)=>{
    //   const userIsAdmin: boolean = ;
    //   if(userIsAdmin){
    //     return true;
    //   }else{
    //     return !['Admin Panel'].includes(navItem.label);
    //   }
    // });
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleMenuItem(item: NavigationItem) {
    if (!item.children) {
      this.menuItems.forEach((item) => {
        item.isOpen = false;
      });
      const selectedItem = this.menuItems.find(
        (menuItem) => menuItem.label === item.label
      );
      if (selectedItem && selectedItem.isOpen) {
        selectedItem.isOpen = true;
      }
    }

    // Only toggle if sidebar is not collapsed and item has children
    if (this.sidebarExpanded && item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  toggleDarkMode() {
    this.darkModeActive = !this.darkModeActive;
    const element = document.querySelector('html');
    element?.classList.toggle('nmail-dark');
  }

  isActive(routerLink: string[]): boolean {
    return this.router.url === routerLink[0]; // Compare with current route
  }

  openNewEmailWindow() {
    this.router.navigate(['/new-email']);
  }

  public isNewEmailBtnVisible(): boolean {
    // To Do: also hide if not logged in
    // To Do: Change in contacts view to "Add contact" button
    return !(this.router.url === '/new-email');
  }
}
