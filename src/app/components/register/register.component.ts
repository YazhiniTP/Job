import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // add property for all model data
  name: string;
  email: string;
  username: string;
  password: string;

  // inject service into constructor anytime we use service in a component
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      alert('Please fill in all fields');
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      alert('Please use a valid email');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success ) {
        alert('You are Registered and logged in');
        this.router.navigate(['/dashboard']);
      } else {
        alert('You are Registered and logged in');
        this.router.navigate(['/register']);
      }
    });

  }

}
