
import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Artical } from "../../models";
import { ArticalsService } from "../../services";

import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artical-dialog',
  templateUrl: './artical-dialog.component.html',
  styleUrls: ['./artical-dialog.component.css']
})

export class ArticalDialogComponent implements OnInit {
  articalDailogForm: FormGroup;
  updatedArtical: Artical;

  header: string;
  image: string;
  imagePath: string;
  imgURL: any;
  message: string;
  localEnv = "http://localhost:4200/";
  alertMsg = { type: '', msg: '' };
  loading: boolean;
  
  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef < ArticalDialogComponent > ,
      private articalsService: ArticalsService,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) {
          updatedArtical
      }
  ) {
      if (updatedArtical) {
          this.header = 'Update an Artical';
          this.imgURL = updatedArtical.image;
          this.updatedArtical = updatedArtical;
          this.articalDailogForm = fb.group({
              date: [moment(updatedArtical.date), Validators.required],
              title: [updatedArtical.title, Validators.required],
              image: [''],
              content: [updatedArtical.content, Validators.required]
          });
      } else {
          this.header = 'Add a new Artical';
          this.articalDailogForm = fb.group({
              date: [moment(), Validators.required],
              title: ['', Validators.required],
              image: [''],
              content: ['', Validators.required]
          });
      }


  }

  ngOnInit() {}


  save() {
      const artical = {
          title: this.articalDailogForm.value.title,
          date: this.articalDailogForm.value.date,
          content: this.articalDailogForm.value.content,
          image: this.image
      };
      if (!this.image) {
          this.message = 'Please choose an image'
          return;
      }

      if (this.articalDailogForm.invalid) {
        return;
      }
      this.loading = true;
      this.articalsService.addArtical(artical).pipe(first())
          .subscribe(
              data => {
                  this.loading = false;
                  this.alertMsg = {type: 'success', msg: 'Added Succesfully'};
                  setTimeout(() => {
                    this.alertMsg = {type: '', msg: ''};
                  }, 2500);
              },
              error => {
                  this.loading = false;
                  this.alertMsg = {type: 'error', msg: error};
                  setTimeout(() => {
                    this.alertMsg = {type: '', msg: ''};
                  }, 2500);
              });;
      this.dialogRef.close(this.articalDailogForm.value);
  }

  editArtical() {
      let artical = this.articalDailogForm.value;
      artical.image = this.image;
      if (!artical.image || artical.image === null || (this.image && this.image.indexOf(`C:/fakepath`) > -1)) {
          artical.image = this.updatedArtical.image;
      }
      if (!artical.date) {
          artical.date = moment();
      }
        // stop here if form is invalid
      if (this.articalDailogForm.invalid) {
            return;
      }
      this.loading = true;
      this.articalsService.editArtical(artical).subscribe(data => {
          this.loading = false;
          this.dialogRef.close(artical);
      });
  }

  close() {
      this.dialogRef.close();
  }

  preview(files) {
      if (files.length === 0)
          return;
      var mimeType = files[0].type;
      var filesize = ((files[0].size / 1024) / 1024).toFixed(4); // MB
      if (parseInt(filesize) > 4) {
          this.message = "Max size allowed is 4 MB";
          return;
      }
      if (mimeType.match(/image\/*/) == null) {
          this.message = "Only images are supported.";
          return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
          this.imgURL = reader.result;
          this.image = reader.result as string;
      }
  }
}