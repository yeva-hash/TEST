import { Product, Container } from "./interfaces"
// import { eventObserver } from "./EventObserver"

export class View {
    private _nameInput: HTMLElement | null
    private _amountInput:HTMLElement| null
    private _typeInput: HTMLElement | null
    private _addButton: HTMLElement | null

    private _deleteInput: HTMLElement | null
    
    private _listOfProducts: HTMLElement | null

    private _boxes: HTMLElement | null
    private _barrels: HTMLElement | null

    private _statistic: HTMLElement | null

    constructor() {
        this._nameInput = document.querySelector(".name-input")
        this._amountInput = document.querySelector(".amount-input")
        this._typeInput = document.querySelector(".type-input")
        this._addButton = document.querySelector(".add-button")

        this._deleteInput = document.querySelector(".amount-removed")

        this._listOfProducts = document.querySelector(".statistic-list")

        this._boxes = document.querySelector(".boxes")
        this._barrels =document.querySelector(".barrels")

        this._statistic = document.querySelector(".statistic")
    }
    renderContainers(cas: Container) {
        if(cas) {
        const container = this.createElement("div", "d-flex")
        const image = this.createElement("img")
        const containerInfo = this.createElement("div", "pl-2")
        const spanName = this.createElement("span", "name")
        const br = this.createElement("br")
        const spanAmount = this.createElement("span","fullness")
        if(cas.type === "crumbly") {
            container.append(image, containerInfo)
            containerInfo.append(spanName,br,spanAmount)
            container.classList.add("box")
            image.setAttribute("src", "box.d4652173.png")
            containerInfo.classList.add("box-info");
            spanName.textContent = cas.name
            if(cas.fullness >=100) {
                spanAmount.textContent = `100/100kg` 
            } else {
            spanAmount.textContent = `${cas.fullness}/100kg` 
            }
            this._boxes?.append(container)
        }
        if(cas.type === "liquid") {
            container.append(image, containerInfo)
            containerInfo.append(spanName,br,spanAmount)
            container.classList.add("barrel")
            image.setAttribute("src", "barrel.6e046dec.png")
            containerInfo.classList.add("barrel-info");
            spanName.textContent = cas.name
            if(cas.fullness >=100) {
            spanAmount.textContent = `100/100l` 
            } else {
            spanAmount.textContent = `${cas.fullness}/100l` 
            }
            this._barrels?.append(container)
        }
    }    
    }
    renderContainersList(boxes:Container[], barrels: Container[]) {
        (this._boxes as HTMLDivElement).innerHTML = "";
        (this._barrels as HTMLDivElement).innerHTML = ""
        for(let i = 0; i < boxes.length+barrels.length;i++) {
            this.renderContainers(boxes[i])
            this.renderContainers(barrels[i])
        }
    }   
    renderProductForStatistics(product: Product) {
        const li = this.createElement("li", "mt-2")
        const spanName = this.createElement("span")
        const spanAmount = this.createElement("span", "ml-5")
        // const inputDelete = this.createElement("input", "statistic-delete-amount")
        // inputDelete.setAttribute("type", "number")
        const buttonDelete = this.createElement("button", "delete-button")
        buttonDelete.dataset.id = product.id
        this._listOfProducts?.append(li)
        li.append(spanName,spanAmount,buttonDelete)

        spanName.textContent = product.name
        if(product.type === "crumbly") {
            spanAmount.textContent = `${product.amount}kg`
        } else {
            spanAmount.textContent = `${product.amount}l`
        } 
        buttonDelete.textContent = "Delete"
    }
    renderStatisticsList(arrOfProduct: Product[]) {
        (this._listOfProducts as HTMLUListElement).innerHTML = " "
        for(let i = 0; i < arrOfProduct.length; i++) {
            this.renderProductForStatistics(arrOfProduct[i])
        }
    }
    bindAddProduct(add: (name:string, amount:string, type:string) => void) {
        // (this._nameInput as HTMLInputElement).value = "";
        (this._amountInput as HTMLInputElement).value = "25"

        this._addButton?.addEventListener("click", () => {
            add(
            (this._nameInput as HTMLInputElement).value,
            (this._amountInput as HTMLInputElement).value, 
            (this._typeInput as HTMLSelectElement).value,)
        })
    }
    bindDeleteProduct(deleteProduct:(id:string | undefined, amountRemoved: string | undefined)=>void) {
        this._statistic?.addEventListener("click", (event) => { 
            if((event.target as HTMLElement).classList.contains("delete-button")) {
                deleteProduct((event.target as HTMLElement).dataset.id,(this._deleteInput as HTMLInputElement).value)
            }
        })
    }
    createElement(tag:string, className?:string) {
        const element = document.createElement(tag)
        if(className) element.classList.add(className)
        return element
    }
}