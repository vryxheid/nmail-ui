import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessageViewComponent } from './components/message-view/message-view.component';
import { NewEmailComponent } from './components/new-email/new-email.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'sent', component: InboxComponent },
      { path: 'trash', component: InboxComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', component: AdminPanelComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'message/:id', component: MessageViewComponent },
      { path: 'new-email', component: NewEmailComponent },
      // { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'inbox', pathMatch: 'full' }, // Default route
    ],
  },
  { path: 'notfound', component: NotFoundComponent },
  // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
