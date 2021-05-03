import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public username: string = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  public logout = () => {
    this.router.navigate(['']);
  };

  // getUserInfo() {
  //   this.userService.getInfoUser().subscribe(
  //     (res) => {
  //       if (res.returncode !== 1) {
  //         return;
  //       }
  //       this.user = res.data;
  //     },
  //     (err) => {}
  //   );
  // }
}
