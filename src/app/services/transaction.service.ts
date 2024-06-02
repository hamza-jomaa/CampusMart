import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(private http: HttpClient, private toastr: ToastrService, private router:Router) { }

    All_Stores_From_All_Providers: any = [{}];
    All_Stores: any = [{}];
    display_image: any;
    private storeData = new BehaviorSubject<any>(null);
    storeData$ = this.storeData.asObservable();



    getAllBanks() {
        return this.http.get<any>(environment.backendAPI + environment.Bank.base + environment.Bank.GetAllBanks);
    }
    GetBankByConsumerId(conumerId:number) {
        return this.http.get(environment.backendAPI + environment.Bank.base + environment.Bank.GetBankByConsumerId+'?consumerId='+conumerId);
    }
    CreateBank(bank: any) {
        bank.balance=500;
        this.http.post(environment.backendAPI + environment.Bank.base + environment.Bank.CreateBank, bank).subscribe(
            (res: any) => {
                this.toastr.success('Bank Created successfully', res);
                this.router.navigate([""])
            },
            (error: any) => {
                this.toastr.error('Error Occurred');
            }
        );
    }
    UpdateBank(bank: any) {
        this.http.put(environment.backendAPI + environment.Bank.base + environment.Bank.UpdateBank, bank).subscribe(
            (res: any) => {
                this.toastr.success('Bank Updated successfully', res);
            },
            (error: any) => {
                this.toastr.error('Error Occurred');
            }
        );
    }

    setStoreData(storeData: any) {
        this.storeData.next(storeData);
    }
}
