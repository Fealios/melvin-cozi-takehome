import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';
import { states } from './misc/states';
import { Inquiry } from './models/inquiry';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cozi-takehome';
  public myForm: FormGroup;
  public currentInquiry: Inquiry;

  public allInquiries: Inquiry[] = [];


  constructor(private fb: FormBuilder, private svcData: DataService) {

  }

  ngOnInit() {
    this.createEmptyForm();
    // create an empty form on init by default
  }

  get states(): any[] {
    return states;
    // a 'getter' for the states selector in my template
  }

  private createEmptyForm(): void {
    // this will create an empty reactive form
    // as the name suggests you could create a filled form with an already made object for editing later
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
    if (this.myForm.valid) {
      // check if the form is valid, which only makes sure that each field is filled out. 
      const newInquiry = this.createNewInquiry();

      this.svcData.saveInterest(newInquiry).subscribe(
        res => {
          console.log(res.success);
          this.currentInquiry = newInquiry;
          // set the currentInquiry to the one just created in order to populate the response area message
        },
        err => {
          console.log(err);
        }
      )
      this.allInquiries.push(newInquiry);
      // add the new inquiry to the list of all inquiries from the database
  
      this.myForm.reset();
      // clear the reactive form
    }
  }

  private createNewInquiry(): Inquiry {
    const {firstName, lastName, address, productName, cityName, stateAbrv, zipcode} = this.myForm.value;

    return new Inquiry(firstName, lastName, address, cityName, stateAbrv, zipcode, productName);
    // retrieve the data from the form and immediately utilize for a new Inquiry
    // return newly created Inquiry 
  }
}
