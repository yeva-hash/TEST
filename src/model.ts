import { Product, Container } from "./interfaces"
import cuid from 'cuid';

export class Model {
    private arrOfProducts: Product[]
    private arrOfBoxes: Container[]
    private arrOfBarrels: Container[]
    private counter: number = 0
    constructor() {
        this.arrOfProducts = []
        this.arrOfBoxes = [
            {id:cuid(), name: "Empty", fullness:0, type: "crumbly"},
            {id:cuid(), name: "Empty", fullness:0, type: "crumbly"},
            {id:cuid(), name: "Empty", fullness:0, type: "crumbly"},
            {id:cuid(), name: "Empty", fullness:0, type: "crumbly"}
        ]
        this.arrOfBarrels = [
            {id:cuid(), name: "Empty", fullness:0, type: "liquid"},
            {id:cuid(), name: "Empty", fullness:0, type: "liquid"},
            {id:cuid(), name: "Empty", fullness:0, type: "liquid"},
        ]
    }
    createProduct(name:string,amount:string,type:string) {
        const product = {
            id:cuid(),
            name,
            amount,
            type
        }
        this.arrOfProducts.push(product)
    }
    cheking(name:string,amount:string,type:string) {
        for(let i = 0; i < this.arrOfProducts.length; i++) {
            if(this.arrOfProducts[i].name === name && this.arrOfProducts[i].type === type) {
                let result = parseInt(this.arrOfProducts[i].amount)
                if(result + +amount > 100) {
                    alert("sorry but container is fill!")
                    return
                } else {
                    result += +amount
                    this.arrOfProducts[i].amount = JSON.stringify(result)
                    return  
                }
            }
        }
        this.createProduct(name,amount,type) 
    }
    addProductToArr(name:string, amount:string, type:string) {
            if(this.arrOfProducts.length > 0) {
                this.cheking(name,amount,type)
            } else {
               this.createProduct(name,amount,type) 
            }    
    }
    createNewContainer(type:string, name:string,fullness:number) {
        for(let i = 0; i < this.allProducts.length;i++) {
            if(this.arrOfProducts[i].name === name && this.arrOfProducts[i].amount === JSON.stringify(fullness) && this.arrOfProducts[i].type === type) {
                const container = {
                    id: this.arrOfProducts[i].id,
                    name,
                    fullness,
                    type,
                }
                if(type === "crumbly") {
                    this.arrOfBoxes.push(container)
                    console.log(this.arrOfBoxes)
                } else if(type === "liquid"){
                   this.arrOfBarrels.push(container)
                }
            }
        }   
    }
    addProductToContainer(name:string,amount:string,type:string, arrayOfContainer: Container[]) {
        for(let i = 0; i < arrayOfContainer.length; i++) {
            if(arrayOfContainer[i].name === "Empty") {
                for(let j = 0; j < this.arrOfProducts.length; j++) {
                     if(this.arrOfProducts[j].name === name && this.arrOfProducts[j].amount === amount && this.arrOfProducts[j].type === type) {
                        arrayOfContainer[i].id = this.arrOfProducts[j].id
                        arrayOfContainer[i].name = name
                        arrayOfContainer[i].fullness = +amount
                        break
                    } else {
                        continue
                    }
                }
                return
            }
             else if(arrayOfContainer[i].name === name) {
                arrayOfContainer[i].fullness += +amount
                return   
            } 
        }
        this.createNewContainer(type,name,+amount)   
    }

    deleteAmountFromProduct(id:string|undefined, amountRemoved: string|undefined) {
        if(amountRemoved) {
            this.arrOfProducts.forEach((elem) => {
                if(elem.id === id) {
                    let i = +amountRemoved
                    elem.amount = JSON.stringify(+elem.amount - i)
                    if(+elem.amount <=0) {
                        this.arrOfProducts = this.arrOfProducts.filter((elem) => elem.id !== id)
                    }
                }
            })
        }
    }
    deleteFullnessFromContainer(array:Container[],id:string|undefined,amountRemoved: string|undefined) {
        if(amountRemoved) {
            array.forEach((elem) => {
                if(elem.id === id) {
                    let i = +amountRemoved
                    elem.fullness = +elem.fullness - i
                    if(+elem.fullness <=0) {
                        array = array.filter((elem) => elem.id !== id)
                    }
                }
            })
        }
    }
    get allProducts() {
        return this.arrOfProducts
    }
    get boxes() {
        return this.arrOfBoxes
    } 
    get barrels() {
        return this.arrOfBarrels
    }
}