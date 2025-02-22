import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  submit() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      console.log(this.formGroup);
    }
  }
}
