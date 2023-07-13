import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit, OnDestroy {
    protected _unsubscribe$: Subject<void> = new Subject();
    fileName = '';
    imageForm: any = FormGroup;

    constructor(
        private userService: UserService,
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.imageForm = this.formBuilder.group({
            email: [null],
            password: [null],
        });
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            this.userService
                .uploadUserImage(formData)
                .pipe(takeUntil(this._unsubscribe$))
                .subscribe();
        }
    }
}
