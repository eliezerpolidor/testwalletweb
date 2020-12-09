import { Component, OnInit } from '@angular/core';
import { WalletService } from '../shared/services';
import { ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wallet = {};
  user = {};
  closeResult: string;

  constructor(
    private walletService: WalletService,
    private modalService: NgbModal,
    private modalService2: NgbModal
  ) { }

  ngOnInit() {
     this.walletService.get().subscribe( (data:any) => {
       this.wallet = data.response.wallet;
    });

    this.user = JSON.parse(localStorage.getItem('currentUser')).user;

  }

  open(content) { 
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}



