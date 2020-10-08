import { Component, OnInit } from '@angular/core';
import { InicioService } from '../services/inicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inicioService: InicioService
  ) { }

  user = '';
  password = '';
  message = '';

  ngOnInit() {

  }

  doLogin() {
    console.log(this.user + ' - ' + this.password);
    this.inicioService.login(this.user, this.password).subscribe(data => {
        this.message = 'Login Ok';
        environment.user = this.user;
        if ( this.user === 'admin'){
          this.router.navigate(['ruta/inicio-ruta']);
        } else if ( this.user === 'coordinador' ) {
          this.router.navigate(['inicio/menu-coordinador']);
        } else if( this.user === 'user'){
          this.router.navigate(['inicio/user']);
        }
      }, error => {
        console.error(error);
        // this.message = JSON.stringify(error);
        this.message = this.user + ' invalido';
        alert ('Usuario o contraseña incorrecta, intete de nuevo ');
      });
  }

}

/** 
 * 

  getCompanies() {
    this.restClient.getCompanies().subscribe(
      data => {
        console.log('Success' + data);
        this.message = JSON.stringify(data);
      },
      error => {
        console.error(error);
        this.message = JSON.stringify(error);
      }
    );
  }

  getEmployees() {
    this.restClient.getEmployees().subscribe(
      data => {
        console.log('Success' + data);
        this.message = JSON.stringify(data);
      },
      error => {
        console.error(error);
        this.message = JSON.stringify(error);
      }
    );
  }

  getAdminData() {
    this.restClient.getAdminData().subscribe(
      data => {
        console.log('Success' + data);
        this.message = JSON.stringify(data);
      },
      error => {
        console.error(err or);
        this.message = JSON.stringify(error);
      }
    );
  }

  logout() {
    this.restClient.logout().subscribe(data => {
        this.message = 'Logout Ok';
      }, error => {
        console.error(error);
        this.message = JSON.stringify(error);
      });
  }
  }*/