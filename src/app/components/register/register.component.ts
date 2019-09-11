import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  users: any;
  alertMsg = {type: '', msg: ''};

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {}


  ngOnInit() {
    if (this.auth.isAuthorized()){
        this.router.navigate(['/articles']);
        return;
      }
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          password: ['', Validators.required]
      });

      this.auth.getUsers().subscribe(data => {
            this.users = data.map( row => row.email);
      });
  }

  get f() {
      return this.registerForm.controls;
  }

  register() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      if (this.users.indexOf(this.f.email.value) > -1) {
        this.alertMsg = {type: 'error', msg: `This Email is Already exists ${this.f.email.value} `};
        setTimeout(() => {
        this.alertMsg = {type: '', msg: ''};
        }, 2500);
          return;
      }

      this.loading = true;

      this.auth.register({
              firstName: this.f.firstName.value,
              lastName: this.f.lastName.value,
              email: this.f.email.value,
              password: this.f.password.value
          })
          .pipe(first())
          .subscribe(
              data => {
                  this.loading = false;
                  this.alertMsg = {type: 'success', msg: 'Added User Succesfully'};
                  setTimeout(() => {
                    this.alertMsg = {type: '', msg: ''};
                  }, 2500);
                  this.router.navigate(['/login']);
              },
              error => {
                  console.log(error);
                  this.alertMsg = {type: 'error', msg: error};
                  setTimeout(() => {
                    this.alertMsg = {type: '', msg: ''};
                  }, 2500);
                  this.loading = false;
                  this.router.navigate(['/register']);
              });
  }
}