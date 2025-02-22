import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', component: AdminPanelComponent },
      // { path: 'drafts', component: DraftsComponent },
      // { path: 'trash', component: TrashComponent },
      // { path: 'spam', component: SpamComponent },
      // { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'inbox', pathMatch: 'full' }, // Default route
    ],
  },
  { path: 'notfound', component: NotFoundComponent },
  // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
