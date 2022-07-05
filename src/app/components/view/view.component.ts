import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PixabyService} from "../../core/services/pixaby.service";
import {Pixaby} from "../../core/interfaces/pixaby";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id: number;
  imageItem: Pixaby;

  constructor(
    public activatedRoute: ActivatedRoute,
    public pixaby: PixabyService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.pixaby.getPicture(`&id=${this.id}`).then(res => {
      this.imageItem = res;
      console.log(res);
    })
  }

  getFile(filePath: string, id: number) {
    fetch(filePath).then(response_object=>response_object.blob()).then(blob_object=>this.downloadFile(blob_object, id));
  }

  downloadFile(blob: any, id: number) {
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", String(id));
    link.click();
  }

  toPage(pageURL: string) {
    this.router.navigate([pageURL]);
  }
}
