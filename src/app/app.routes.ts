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
import { AuthGuard } from './shared/guards/auth.guard';
import { LogoutGuard } from './shared/guards/logout.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
      { path: 'sent', component: InboxComponent, canActivate: [AuthGuard] },
      { path: 'trash', component: InboxComponent, canActivate: [AuthGuard] },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'message/:id',
        component: MessageViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new-email',
        component: NewEmailComponent,
        canActivate: [AuthGuard],
      },
      // { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'inbox', pathMatch: 'full' }, // Default route
      { path: 'notfound', component: NotFoundComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'register', component: RegisterComponent },
  // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
