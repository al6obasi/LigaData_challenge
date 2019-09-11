import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  users: any;
  msg: string;
  alertMsg = {type: '', msg: ''};

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {}


  ngOnInit() {
      if (this.auth.isAuthorized()){
        this.router.navigate(['/articles']);
        return;
      }
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          password: ['', Validators.required]
      });
  }

  get f() {
      return this.loginForm.controls;
  }

  login() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.auth.login({
              email: this.f.email.value,
              password: this.f.password.value
          })
          .pipe(first())
          .subscribe(
              data => {
                  this.loading = false;
                  this.router.navigate(['/articles']);
                  this.alertMsg = {type: '', msg: ''};
              },
              error => {
                  this.loading = false;
                  this.msg = error;
                  this.alertMsg = {type: 'error', msg: error};
                  this.loginForm = this.formBuilder.group({
                      email: [this.f.email.value],
                      password: ['']
                  });
                  this.router.navigate(['login']);
                  setTimeout(() => {
                    this.alertMsg = {type: '', msg: ''};
                  }, 2500);
              });
  }
}