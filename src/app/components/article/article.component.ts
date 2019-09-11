import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ArticalDialogComponent } from '../artical-dialog/artical-dialog.component';
import { ArticalsService } from "../../services";
import { Artical } from 'src/app/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  alertMsg: object = {
      type: '',
      msg: ''
  };
  articals: Array < Artical > ;
  updatedArtical: Artical;
  loading: boolean;
  constructor(private dialog: MatDialog, private articalService: ArticalsService, private router: Router) {}

  ngOnInit() {
      this.getAllArticals();
  }


  openDialog() {
      const dialogConfig = new MatDialogConfig();
      let updatedArtical = this.updatedArtical;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          updatedArtical
      };
      const dialogRef = this.dialog.open(ArticalDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
          val => {
              console.log("Dialog output:", val);
              this.articalService.getArticals().subscribe(data => {
                  this.articals = data;
              });
          } 
      );
  }

  deleteArtical(artical: Artical) {
      this.loading = true;
      this.articalService.removeArtical(artical).subscribe(data => {
          setTimeout(() => {
              this.getAllArticals();
          }, 600);
      });
  }

  editArtical(i: number, updatedArtical: Artical) {
      this.articalService.setArticalIndex(i);
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          updatedArtical
      };
      const dialogRef = this.dialog.open(ArticalDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
          (val) => {
            //   console.log("Dialog output:", val);
              if(val){
                this.alertMsg = {type: 'success', msg: 'Updated Succesfully'};
                setTimeout(() => {
                  this.alertMsg = {type: '', msg: ''};
                }, 2500);
                this.getAllArticals();
              }
          });


  }

  getAllArticals() {
      this.articalService.getArticals().subscribe(data => {
          this.articals = data;
      });
  }
}