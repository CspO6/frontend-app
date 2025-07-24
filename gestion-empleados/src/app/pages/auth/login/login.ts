import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.http.post<any>(`${environment.apiUrl}/Auth/login`, this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/empleados']);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Usuario o contraseña inválidos. Intenta de nuevo.',
            customClass: {
              popup: 'rounded-lg shadow-md p-6',
              title: 'text-lg font-semibold text-red-600',
              confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded mt-4'
            },
            buttonsStyling: false
          });
        }
      });
    }
  }
}
