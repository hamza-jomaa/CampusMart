import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-provider",
    templateUrl: "./provider.component.html",
    styleUrls: ["./provider.component.scss"],
})
export class ProviderComponent implements OnInit {
    navIndex = 0;
    newMerchandise = {
        id: null,
        name: "",
        price: null,
        quantity: null,
        image: "",
    };
    newOrder = {
        id: null,
        name: "",
        providerId:null,
        providerName: "",
        providerPhone: "",
        consumerId:null,
        consumerName: "",
        consumerPhone: "",
        merchandises: [],
        date: "",
        orderStatus: null,
    };
    specialRequest = {
        id: null,
        name: "",
        providerId:null,
        providerName: "",
        providerPhone: "",
        consumerId:null,
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
    merchandiseList = [
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
    ];
    storeData = {
        id: 0,
        name: "mainStore",
        image: "./assets/img/items/store/storetemp.png",
    };
    providerData = {
        id: 0,
        phoneNumber: "07987654321",
        name: "First Provider",
    };
    orderData = [
        {
            id: 0,
            name: "order 1",
            providerId:null,
            providerName: "",
            providerPhone: "",
            consumerId:0,
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
            providerId:null,
            providerName: "",
            providerPhone: "",
            consumerId:1,
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
            providerId:null,
            providerName: "",
            providerPhone: "",
            consumerId:2,
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

    specialRequestsData =  [
        {
            id: 0,
            name: "Request 1",
            providerId:null,
            providerName: "",
            providerPhone: "",
            consumerId:0,
            consumerName: "First consumer",
            consumerPhone: "0798765432",
            description: "I want a pizza from Qaisar Pizza",
            date: "",
            orderStatus: 0,
        },
        {
            id: 1,
            name: "Request 2",
            providerId:null,
            providerName: "",
            providerPhone: "",
            consumerId:1,
            consumerName: "Second consumer",
            consumerPhone: "0787654321",
            description: "I want a burger from Fire Fly",
            date: "",
            orderStatus: 0,
        },
        {
            id: 2,
            name: "Request 3",
            providerId:null,
            providerName: "",
            providerPhone: "",
            consumerId:2,
            consumerName: "Third consumer",
            consumerPhone: "0776543210",
            description: "I want Hotdogs from Wazzap dog",
            date: "",
            orderStatus: 0,
        },
    ];
    constructor() {}

    ngOnInit(): void {}
    navDashboard(index: any) {
        this.navIndex = index;
    }
    addItem() {
        this.editingItem = false;
        this.toggleModal();
    }
    toggleModal() {
        this.showForm = !this.showForm;
    }
    toggleOrder() {
        this.showOrder = !this.showOrder;
    }
    updateStoreData(storeForm) {
        this.storeData = storeForm;
    }
    submitForm(formData) {
        if (formData.valid) {
            if (this.editingItemIndex !== null) {
                this.merchandiseList[this.editingItemIndex] =
                    this.newMerchandise;
                this.editingItemIndex = null;
            } else {
                this.merchandiseList.push(this.newMerchandise);
            }
            this.resetForm();
        }
    }
    editItem(id: any) {
        this.toggleModal();
        this.editingItem = true;
        const index = this.merchandiseList.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.editingItemIndex = index;
            this.newMerchandise = { ...this.merchandiseList[index] };
        }
    }
    removeItem(id: any) {
        const index = this.merchandiseList.findIndex((item) => item.id === id);
        if (
            index !== -1 &&
            confirm("Are you sure you want to remove this item?")
        ) {
            this.merchandiseList.splice(index, 1);
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
    viewSpecialRequest(id: any) {
        this.toggleOrder();
        const index = this.specialRequestsData.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.editingSpecialRequestIndex = index;
            this.specialRequest = { ...this.specialRequestsData[index] };
        }
    }
    submitOrder(formData) {
 
        
          if (this.editingOrderIndex !== null) {
            this.newOrder.providerId=this.providerData.id;
            this.newOrder.providerName=this.providerData.name;
            this.newOrder.providerPhone=this.providerData.phoneNumber;
              this.orderData[this.editingOrderIndex] =
                  this.newOrder;
              this.editingOrderIndex = null;
          }
          this.resetForm();
      
  }
  submitSpecialRequest(formData) {
 
        
    if (this.editingSpecialRequestIndex !== null) {
      this.specialRequest.providerId=this.providerData.id;
      this.specialRequest.providerName=this.providerData.name;
      this.specialRequest.providerPhone=this.providerData.phoneNumber;
        this.specialRequestsData[this.editingSpecialRequestIndex] =
            this.specialRequest;
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
                this.newMerchandise.image = e.target.result;
            };
        }
    }
    updateStoreImage(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e: any) => {
                this.storeData.image = e.target.result;
            };
        }
    }
    resetForm() {
        this.showForm = false;
        this.showOrder=false;
        this.newMerchandise = {
            id: null,
            name: "",
            price: null,
            quantity: null,
            image: "",
        };
    //     this.newOrder = {
    //       id: null,
    //       name: "",
    //       providerId:null,
    //       providerName: "",
    //       providerPhone: "",
    //       consumerId:null,
    //       consumerName: "",
    //       consumerPhone: "",
    //       merchandises: [],
    //       date: "",
    //       orderStatus: null,
    //   };
    }
}
