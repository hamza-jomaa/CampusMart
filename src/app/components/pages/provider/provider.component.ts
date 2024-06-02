
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import { AdminService } from "src/app/services/admin.service";
import { MerchandiseService } from "src/app/services/merchandise.service";
import { ProviderService } from "src/app/services/provider.service";
import { StoreService } from "src/app/services/store.service";
import { CampusConsumerService } from "src/app/services/campus-consumer.service";
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "src/app/services/dialog.service";
import { ToastrService } from "ngx-toastr";
import { OrderService } from "src/app/services/order.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-provider",
    templateUrl: "./provider.component.html",
    styleUrls: ["./provider.component.scss"],
})
export class ProviderComponent implements OnInit {
    navIndex = 0;
    newMerchandise: any = {
        productid: null || "",
    };

    newOrder = {
        id: null,
        name: "",
        providerId: null,
        providerName: "",
        providerPhone: "",
        consumerId: null,
        consumerName: "",
        consumerPhone: "",
        merchandises: [],
        date: "",
        orderStatus: null,
    };
    specialRequest = {
        id: null,
        name: "",
        providerId: null,
        providerName: "",
        providerPhone: "",
        consumerId: null,
        consumerName: "",
        consumerPhone: "",
        description: "",
        date: "",
        orderStatus: null,
    };
    showForm = false;
    showOrder = false;
    editingItemIndex = null;
    editingOrderIndex = null;
    editingSpecialRequestIndex = null;
    editingItem = false;
    merchandiseList: any = [];
    
    storeData:any = {
        storeid:0,
        storename:'',
        image:'',
        description:'',
        providerid:0,
        approvalstatus:''
    };
    providerData:any = {
        "providerid": '',
        "phone": '',
        "locationLatitude": '',
        "locationLongitude": '',
        "consumerid": '',
        "motivation": '',
        "status": '',
        "consumer": '',
        "orders": [],
        "specialrequests": [],
        "stores": []
    };
    orderData: any = [
        {
            id: 0,
            name: "order 1",
            providerId: null,
            providerName: "",
            providerPhone: "",
            consumerId: 0,
            consumerName: "First consumer",
            consumerPhone: "0798765432",
            merchandises: [
                {
                    id: 2,
                    name: "Pizza",
                    price: 6,
                    quantity: 19,
                    image: "./assets/img/items/merchandises/pizza.png",
                },
                {
                    id: 3,
                    name: "Shawarma",
                    price: 5,
                    quantity: 16,
                    image: "./assets/img/items/merchandises/shwarma.png",
                },
                {
                    id: 4,
                    name: "Turkey",
                    price: 2,
                    quantity: 18,
                    image: "./assets/img/items/merchandises/turkey.png",
                },
            ],
            date: "",
            orderStatus: 0,
        },
        {
            id: 1,
            name: "order 2",
            providerId: null,
            providerName: "",
            providerPhone: "",
            consumerId: 1,
            consumerName: "Second consumer",
            consumerPhone: "0787654321",
            merchandises: [
                {
                    id: 0,
                    name: "Burger",
                    price: 3,
                    quantity: 10,
                    image: "./assets/img/items/merchandises/burger.png",
                },
                {
                    id: 1,
                    name: "Fajita",
                    price: 5,
                    quantity: 15,
                    image: "./assets/img/items/merchandises/fajita.png",
                },
                {
                    id: 2,
                    name: "Pizza",
                    price: 6,
                    quantity: 19,
                    image: "./assets/img/items/merchandises/pizza.png",
                },
            ],
            date: "",
            orderStatus: 0,
        },
        {
            id: 2,
            name: "order 3",
            providerId: null,
            providerName: "",
            providerPhone: "",
            consumerId: 2,
            consumerName: "Third consumer",
            consumerPhone: "0776543210",
            merchandises: [
                {
                    id: 2,
                    name: "Pizza",
                    price: 6,
                    quantity: 19,
                    image: "./assets/img/items/merchandises/pizza.png",
                },
                {
                    id: 3,
                    name: "Shawarma",
                    price: 5,
                    quantity: 16,
                    image: "./assets/img/items/merchandises/shwarma.png",
                },
            ],
            date: "",
            orderStatus: 0,
        },
    ];


    pendingSpecialRequests: any[] = [];
    selectedSpecialRequest: any;
    filteredOrdersById: any;
    providerID:any;
    ordersList:any
   
    CreateStoreFrom: FormGroup = new FormGroup({
        storename: new FormControl("", [Validators.required]),
        description:new FormControl("",[Validators.required]),
        providerid:new FormControl(""),
        approvalstatus:new FormControl(""),
        Image:new FormControl("")
      });

     UpdateStoreFrom: FormGroup = new FormGroup({
        storeid:new FormControl(),
        storename: new FormControl("", [Validators.required]),
        description:new FormControl("",[Validators.required]),
        providerid:new FormControl(""),
        approvalstatus:new FormControl(""),
        Image:new FormControl("")
      }); 

      providerStoreData: FormGroup = new FormGroup({
        providerid:new FormControl(),
        isprovider: new FormControl(),
        storeid:new FormControl(),
        storename:new FormControl(""),
        approvalstatus:new FormControl("") 
      }); 
    constructor(
        public admin: AdminService,
        private providerService: ProviderService,
        public storeService:StoreService,
        private merchandiseService:MerchandiseService,
        private dialog: MatDialog,
         private toastr: ToastrService,
         private campusConsumerService: CampusConsumerService,
         private orderService:OrderService,private router: Router,

    ) { }

    
    ngOnInit(): void {
        let userData: any = localStorage.getItem("user");
        userData = JSON.parse(userData);

        this.admin
            .getAllRequests()
            .pipe(
                map((requests: any[]) =>
                    requests.filter(
                        (request) => request.requeststatus === "Pending"
                    )
                )
            )
            .subscribe((pendingRequests: any[]) => {
                this.pendingSpecialRequests = pendingRequests;
                this.pendingSpecialRequests.forEach(request => {
                    this.campusConsumerService.getConsumerById(request.consumerid).subscribe((consumer: any) => {
                        request.consumerName = consumer.fullname;
                        request.consumerPhone = consumer.phone;
                    });
                });
            });
       
        this.providerService.GetAllServiceProviders().subscribe((res: any) => {
            this.providerData = res.filter(
                (provider) => provider.consumerid == userData.login_ConsumerID
            )[0];


            
            this.providerService.getStore(this.providerData.providerid).subscribe((res) => {
                
                if (res) {
                    this.storeData = {
                        storeid: res.storeid,
                        storename: res.storename,
                        image: res.image,
                        description:res.description,
                        approvalstatus:res.approvalstatus

                        
                    };
                }
                else 
                {console.log(this.storeData)}
            });
        });
   
        

        this.providerService.GetAllOrders().subscribe((res: any) => {
            this.filteredOrdersById = res.filter(
                (order) => order.providerId == this.providerData.providerid
            );
            this.orderData = this.filteredOrdersById.map((order) => {
                return {
                    id: order.orderid,
                    providerId: order.provider.providerid,
                    providerPhone: order.provider.phone,
                    consumerId: order.consumer.consumerid,
                    consumerName: order.consumer.fullname,
                    consumerPhone: order.consumer.phone,
                    merchandises: order.carts.map((cart) => {
                        return {
                            id: cart.product.productid,
                            name: cart.product.name,
                            price: cart.total,
                            quantity: cart.quantity,
                        };
                    }),
                    date: order.orderdate,
                    orderStatus: order.orderstatus,
                };
               
            });
        });



        
       console.log('user id',userData.login_ConsumerID)
        this.providerService.getGetProviderStoreInfoByConsumerID(userData.login_ConsumerID).subscribe((resp:any) => { 
        
            if(resp){

       this.providerStoreData.value.storeId=resp.storeid
       this.storeData.id=resp.storeid
        console.log(this.providerStoreData.value.storeId)
        this.merchandiseService.GetMerchandiseByStoreID(this.providerStoreData.value.storeId).subscribe((res) => {
            this.merchandiseList = res;
        });

        this.orderService.GetConsumerOrdersbyProviderId(this.providerData.providerid).subscribe((res) => {
            this.ordersList = res;
            console.log(this.ordersList)
        });
         }
              },
          (error) => {
            console.error("Failed to fetch GetAllStores: ", error); 
          }
        );
     
    }

    addNotification(userId: number, message: string) {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notifications.push({ userId, message, isRead: false });
        localStorage.setItem('notifications', JSON.stringify(notifications));
      }
    declineOrder(requestId: number) {
        const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
            data: { message: 'Are you sure you want to decline this order?' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.providerService.deleteSpecialRequest(requestId).subscribe(() => {
                    this.pendingSpecialRequests = this.pendingSpecialRequests.filter(request => request.requestid !== requestId);
                });
            }
        });
    }
    declineOrderr(orderId: number) {
        const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
            data: { message: 'Are you sure you want to decline this order?' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                
                this.orderService.deleteOrder(orderId);
                window.location.reload();     
            }
        });
    }

    updateSpecialRequest(request: any) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      data: { message: 'Are you sure you want to accept this order?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        request.requeststatus = 'Accepted';
        request.providerid = this.providerData.providerid;  
        this.providerService.updateSpecialRequest(request).subscribe(
          (response) => {
            console.log('Special request updated successfully:', response);
            this.pendingSpecialRequests = this.pendingSpecialRequests.filter(req => req.requestid !== request.requestid);
            
            // Fetch consumer details to include in the notification
            this.campusConsumerService.getConsumerById(this.providerData.consumerid).subscribe((consumer: any) => {
                this.addNotification(request.consumerid, `Your request titled "${request.requesttitle}" has been accepted by ${consumer.fullname}. Contact them at ${this.providerData.phone} to discuss further details.`);
              });
           
            this.toastr.success('Order Accepted Successfully!', 'Success', {
              positionClass: 'toast-top-right',
              closeButton: true,
              progressBar: true,
              enableHtml: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
            });
          },
          (error) => {
            console.error('Error updating special request:', error);
          }
        );
      }
    });
  }
    
    

    
    navDashboard(index: any) {
        this.navIndex = index;
    }

    addItem() {
        this.toggleModal();
        this.editingItem = false;
    }

    toggleModal() {
        this.showForm = true;
    }

    toggleOrder() {
        this.showOrder = !this.showOrder;
    }
    updateStoreData() {
        this.UpdateStoreFrom.value.storeid=this.storeData.storeid;
        this.UpdateStoreFrom.value.providerid=this.providerData.providerid;
        
            this.UpdateStoreFrom.value.image=this.storeData.image;
        
        this.UpdateStoreFrom.value.approvalstatus='accepted'
        this.storeService.UpdateStore(this.UpdateStoreFrom.value)   
        
 }
    submitForm(formData) {
        this.showForm = false;
        if (formData.valid) {
            this.providerService.getStore(this.providerData.providerid).subscribe((res) => {
                if (res) {
                    this.storeData = {
                        id: res.storeid,
                        storename: res.storename,
                        image: res.image,
                    };
                    if (this.editingItem) {
                        //edit merchandise
                        this.merchandiseList[this.editingItemIndex] =
                            this.newMerchandise;
                        this.newMerchandise.status = "Accept";
                        this.newMerchandise.storeId=this.storeData.id;
                        this.merchandiseService.updateMerchandise(this.newMerchandise);
                        this.editingItemIndex = null;
                    } else {
                        //add merchandise
                        this.newMerchandise =formData.value
                        this.newMerchandise.status = "Pending";
                        this.newMerchandise.storeId=this.storeData.id;
                        this.merchandiseService.createMerchandise(this.newMerchandise);
                        this.resetForm();
                    }
                }
            });
        }
    }
   
    editItem(id: any) {
        this.toggleModal();
        this.editingItem = true;
        const index = this.merchandiseList.findIndex(
            (item) => item.productid === id
        );
        if (index !== -1) {
            this.editingItemIndex = index;
            this.newMerchandise = { ...this.merchandiseList[index] };
        }
    }

    removeItem(id: any) {
        const index = this.merchandiseList.findIndex(
            (item) => item.productid === id
        );
        if (index !== -1 && confirm("Are you sure you want to remove this item?")) {
            this.merchandiseList.splice(index, 1);
            this.providerService.deleteMerchandise(id);
        }
    }

    viewOrder(id: any) {
        this.toggleOrder();
        const index = this.orderData.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.editingOrderIndex = index;
            this.newOrder = { ...this.orderData[index] };
        }
    }

    viewSpecialRequest(specialRequest: any) {
        this.toggleOrder();
        this.selectedSpecialRequest = { ...specialRequest };
    }

    submitOrder(formData) {
        if (this.editingOrderIndex !== null) {
            this.newOrder.providerId = this.providerData.id;
            this.newOrder.providerName = this.providerData.name;
            this.newOrder.providerPhone = this.providerData.phoneNumber;
            this.orderData[this.editingOrderIndex] = this.newOrder;
            this.editingOrderIndex = null;
        }
        this.resetForm();
    }

    acceptOrder(orderid: number, consumerid: number) {
        console.log(orderid);
      
        const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
          data: { message: 'Are you sure you want to accept this order?' }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.orderService.AcceptOrder(orderid);
            window.location.reload();            
            // Fetch consumer details to include in the notification
            this.campusConsumerService.getConsumerById(this.providerData.consumerid).toPromise().then((consumer: any) => {
              this.addNotification(this.providerData.consumerid, `Your order from has been accepted `);
              this.router.navigate(['/trackorder']);
              this.toastr.success('Order Accepted Successfully!', 'Success', {
                positionClass: 'toast-top-right',
                closeButton: true,
                progressBar: true,
                enableHtml: true,
                timeOut: 5000,
                extendedTimeOut: 2000,
              });
            }).catch((error: any) => {
              console.error('Error fetching consumer details:', error);
              this.toastr.error('Error occurred while fetching consumer details');
            });
          }
        });
      }
      


    submitSpecialRequest(formData) {
        if (this.editingSpecialRequestIndex !== null) {
            this.specialRequest.providerId = this.providerData.id;
            this.specialRequest.providerName = this.providerData.name;
            this.specialRequest.providerPhone = this.providerData.phoneNumber;
            this.pendingSpecialRequests[this.editingSpecialRequestIndex] = this.specialRequest;
            this.editingSpecialRequestIndex = null;
        }
        this.resetForm();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e: any) => {
                this.newMerchandise.m_Image = e.target.result;
            };
        }
    }

    
    resetForm() {
        this.showForm = false;
        this.showOrder = false;
        this.newMerchandise = {};
    }

    createStore(){
      this.CreateStoreFrom.value.providerid=this.providerData.providerid;
     this.CreateStoreFrom.value.approvalstatus='Pending'
     this.storeData.approvalstatus='wait'
      this.storeService.createStore(this.CreateStoreFrom.value)


    }

    uploadStoreImage(file: any) {
        if (file.length === 0)
          return;
    
        let fileToUpload = <File>file[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
    
        this.storeService.uploadStoreImage(formData);
      }

    uploadMerchandiseImage(file: any) {
        if (file.length === 0)
          return;
    
        let fileToUpload = <File>file[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
    
        this.merchandiseService.uploadMerchandiseImage(formData);
      }
    }
        
