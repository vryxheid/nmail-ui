import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';

@Component({
  selector: 'app-login',
  imports: [PrimeNgModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  public submit() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      console.log(this.formGroup);
    }
  }
}
