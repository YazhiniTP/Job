import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if ((data as any).success) {
        this.authService.storeUserData((data as any).token , (data as any).user );
        alert('You are now logged in');
        this.router.navigate(['dashboard']);
      } else {
        alert('Can\'t loggin');
        this.router.navigate(['login']);
      }
    });
  }

}
