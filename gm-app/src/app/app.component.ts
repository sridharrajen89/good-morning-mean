import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Good-morning';
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: [''],
      phone: [''],
      email: ['']
    });
  }

  onSubmit() {
    this.http.post('http://localhost:3000/api/submit', this.form.value)
      .subscribe(response => {
        console.log('Data submitted:', response);
      });
  }

}
