import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>(''),
      repeatPassword: new FormControl<string>(''),
    });
  }

  submit() {
    console.log(this.formGroup.value);
  }
}
