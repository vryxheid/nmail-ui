import { Injectable } from '@angular/core';
import { NavigationItem } from './model/navigation-item.model';

@Injectable()
export class LayoutService {
  getNavigationItems(): NavigationItem[] {
    return [
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
        isOpen: false,
        routerLink: ['/contacts'],
      },
      //   {
      //     label: 'Log In',
      //     icon: 'pi pi-sign-in',
      //     isOpen: false,
      //     routerLink: ['/login'],
      //     visible: !isLoggedIn,
      //   },
      //   {
      //     label: 'Register',
      //     icon: 'pi pi-user-plus',
      //     isOpen: false,
      //     routerLink: ['/register'],
      //   },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        isOpen: false,
        routerLink: ['/settings'],
      },
      { label: 'Admin Panel', icon: 'pi pi-wrench', routerLink: ['/admin'] },
      { label: 'Log Out', icon: 'pi pi-sign-out', routerLink: ['/logout'] },
    ];
  }
}
