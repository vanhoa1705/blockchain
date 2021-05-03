import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  formLogin: FormGroup;
  constructor(
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private snotifyService: SnotifyService
  ) {
    this.title.setTitle('Login');
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      privateKey: ['', Validators.required],
    });
  }
}
