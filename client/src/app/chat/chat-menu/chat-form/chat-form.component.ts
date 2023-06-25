import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  chatForm!: FormGroup
  allUsers: User[] = []

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      title: new FormControl(),
      users: new FormControl(),
      private: new FormControl(),
    })
  }

  onSubmit() {
    console.log(this.chatForm);

    // this.searchService.searchCards(this.parentForm.value).subscribe(response => {
    //   this.response = response
    //   this.isLoading = false;
    // })
    // this.searchService.searchCards(this.parentForm.value).subscribe(response => console.log(response))
    // this.submitted = true;
  }

}
