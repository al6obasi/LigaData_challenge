import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { 
    
  }

  ngOnInit() {
  }

  isLoggedIn():boolean{
    return this.auth.isAuthorized();
  }

  onLoggedout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
