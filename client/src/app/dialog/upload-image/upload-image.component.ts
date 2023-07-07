import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
    fileName = '';
    imageForm: any = FormGroup

    constructor(
      private userService: UserService,
      private http: HttpClient,
      private formBuilder: FormBuilder,
      ) {}

    ngOnInit(): void {
      this.imageForm = this.formBuilder.group({
        email:[null],
        password:[null]
      })
    }

    onFileSelected(event: any) {
        const file:File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);
            this.userService.uploadUserImage(formData).subscribe();
        }
    }



}
