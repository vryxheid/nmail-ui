import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../shared/primeng/primeng.module';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
  routerLink: string[];
}

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule, CommonModule, PrimeNgModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public expanded: boolean = true;

  public darkModeActive = true;

  public menuItems: MenuItem[] = [
    {
      label: 'Inbox',
      icon: 'pi pi-inbox',
      isOpen: false,
      routerLink: ['/inbox'],
    },
    {
      label: 'Sent',
      icon: 'pi pi-send',
      isOpen: false,
      routerLink: ['/sent'],
    },
    {
      label: 'Drafts',
      isOpen: false,
      icon: 'pi pi-file-edit',
      routerLink: ['/drafts'],
    },
    {
      label: 'Spam',
      isOpen: false,
      icon: 'pi pi-exclamation-triangle',
      routerLink: ['/spam'],
    },
    {
      label: 'Trash',
      icon: 'pi pi-trash',
      isOpen: false,
      routerLink: ['/trash'],
    },
    {
      icon: 'pi pi-home',
      label: 'Group',
      isOpen: false,
      routerLink: [],
      children: [
        { icon: 'pi pi-trash', label: 'Analytics', routerLink: [] },
        { icon: 'pi pi-cog', label: 'Projects', routerLink: [] },
      ],
    },

    {
      label: 'Contacts',
      icon: 'pi pi-address-book',
      routerLink: ['/contacts'],
    },
    {
      label: 'Log In',
      icon: 'pi pi-sign-in',
      isOpen: false,
      routerLink: ['/login'],
    },
    {
      label: 'Register',
      icon: 'pi pi-user-plus',
      isOpen: false,
      routerLink: ['/register'],
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      isOpen: false,
      routerLink: ['/settings'],
    },
    { label: 'Admin Panel', icon: 'pi pi-wrench', routerLink: ['/admin'] },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.expanded = !this.expanded;
  }

  toggleMenuItem(item: MenuItem) {
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
    if (this.expanded && item.children) {
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
