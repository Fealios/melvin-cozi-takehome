import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';
import { states } from './misc/states';
import { Interest } from './models/interest';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cozi-takehome';
  public myForm: FormGroup;
  public selectedSubmission;

  public allInterests: Interest[] = [];


  constructor(private fb: FormBuilder, private svcData: DataService) {

  }

  ngOnInit() {
    this.createEmptyForm();
  }

  get states(): any[] {
    return states;
  }

  private createEmptyForm(): void {
    this.myForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      cityName: new FormControl('', [Validators.required]),
      stateAbrv: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required])
    })
  }

  public submitForm(): void {
    const newInterest = this.createNewInterest();
    this.svcData.saveInterest(newInterest).subscribe(
      res => {
        console.log(res);
      }
    )
    this.allInterests.push(newInterest);

    this.myForm.reset();
  }

  private createNewInterest(): Interest {
    const {firstName, lastName, address, productName, cityName, stateAbrv, zipcode} = this.myForm.value;

    return new Interest(firstName, lastName, address, cityName, stateAbrv, zipcode, productName);
  }
}
