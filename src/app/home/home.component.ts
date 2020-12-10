import { Component, OnInit } from '@angular/core';
import { WalletService } from '../shared/services/wallet.service';
import { PaymentService } from '../shared/services/payment.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageErrors } from '../shared/services/errors.service'
import { AlertService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wallet = {};
  user = {};
  closeResult: string;
  public myFormReloadBalance: FormGroup;
  public myFormPayment: FormGroup;
  public myFormConfirmPayment: FormGroup;
  public MessageErrors:any={};

  constructor(
    private walletService: WalletService,
    private paymentService: PaymentService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private alertService: AlertService
  ) { 
    this.MessageErrors = MessageErrors;        
  }

  ngOnInit() {
     this.walletService.get().subscribe( (data:any) => {
       this.wallet = data.response.wallet;
    });

    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
    this.createFormReloadBalance();
    this.createFormPayment();
    this.createFormConfirmPayment();
  }

  createFormReloadBalance() {
    this.myFormReloadBalance = this.fb.group({
        value:    ['', [Validators.required, Validators.min(1)]],
        document:    ['', [Validators.required]],
        cellphone:    ['', [Validators.required]]
    });
  }

  createFormPayment() {
    this.myFormPayment = this.fb.group({
        amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  createFormConfirmPayment() {
    this.myFormConfirmPayment = this.fb.group({
      tokenId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  open(content) { 
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  reloadBalance() {
    if (this.myFormReloadBalance.invalid) {
      return;
    }
    this.walletService.post(this.myFormReloadBalance.value)
    .subscribe(
      data => {
        this.modalService.dismissAll();
        this.myFormReloadBalance.reset();
        this.walletService.get().subscribe( (data:any) => {
          this.wallet = data.response.wallet;
       });
       alert("Recarga realizada!");
      },
      error => {
        alert("Error al recargar "+ error);
        this.myFormReloadBalance.reset();
      });
  }
  
  payment() {
    if (this.myFormPayment.invalid) {
      return;
    }
    this.paymentService.post(this.myFormPayment.value)
    .subscribe(
      (data:any) => {
        this.modalService.dismissAll();
        alert("Pago creado, el token para confirmar el pago es: "+data.response.tokenId);
        this.myFormPayment.reset();
      },
      error => {
        alert("Error al crear pago"+ error);
        this.myFormPayment.reset();
      });
  }
  
  confirmPayment() {
    if (this.myFormConfirmPayment.invalid) {
      return;
    }
    this.paymentService.confirm(this.myFormConfirmPayment.value)
    .subscribe(
      (data:any) => {
        this.modalService.dismissAll();
        this.myFormConfirmPayment.reset();
        this.walletService.get().subscribe( (data:any) => {
          this.wallet = data.response.wallet;
       });
       alert("Pago confirmado");
      },
      error => {
        alert("Error al crear pago"+ error);
        this.myFormConfirmPayment.reset();
      });
  }

}



