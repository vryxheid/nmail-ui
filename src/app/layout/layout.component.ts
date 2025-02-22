import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
  routerLink: string[];
}

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterModule,
    TieredMenuModule,
    MenuModule,
    SidebarModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  expanded = true;

  darkModeActive = true;

  menuItems: MenuItem[] = [
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
      label: 'Settings',
      icon: 'pi pi-cog',
      isOpen: false,
      routerLink: ['/settings'],
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
    { label: 'Admin Panel', icon: 'pi pi-users', routerLink: ['/admin'] },
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
}
