import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

const PRIMENG_MODULES = [
  AutoCompleteModule,
  ButtonModule,
  CheckboxModule,
  FloatLabelModule,
  InputTextModule,
  MessageModule,
  MenuModule,
  PanelModule,
  PasswordModule,
  SidebarModule,
  TableModule,
  TextareaModule,
  ToolbarModule,
  ToastModule,
];

@NgModule({
  imports: [...PRIMENG_MODULES],
  exports: [...PRIMENG_MODULES],
})
export class PrimeNgModule {}
