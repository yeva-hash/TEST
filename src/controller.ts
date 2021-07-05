 import { Model } from "./model";
import { View } from "./view";

export class Controller {
    private model: Model
    private view: View
    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view

        this.view.bindAddProduct(this.handlAddProduct)
        this.view.renderContainersList(this.model.boxes,this.model.barrels)
        this.view.bindDeleteProduct(this.handlDeleteProduct)
    }
    handlAddProduct = (name:string,amount:string,type:string) => {
        this.model.addProductToArr(name,amount,type)
        this.view.renderStatisticsList(this.model.allProducts)
        if(type === "crumbly") {
            this.model.addProductToContainer(name,amount,type, this.model.boxes)
        } else if(type === "liquid"){
            this.model.addProductToContainer(name,amount,type, this.model.barrels)
        }
        if(this.model.boxes.length + this.model.barrels.length <= 10) {
          this.view.renderContainersList(this.model.boxes,this.model.barrels)   
        } else {
            alert("You must delete any container first")
        }
    }
    handlDeleteProduct = (id:string | undefined, amountRemoved: string | undefined) => {
        this.model.deleteAmountFromProduct(id,amountRemoved)

        this.model.deleteFullnessFromContainer(this.model.boxes,id,amountRemoved)
        this.model.deleteFullnessFromContainer(this.model.barrels,id,amountRemoved)

        this.view.renderStatisticsList(this.model.allProducts)
        this.view.renderContainersList(this.model.boxes,this.model.barrels)  
    } 
}