const fs = require ('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
       
    }


async getProducts(){
    try {
        if(fs.existsSync(this.path)){
            const products = await fs.promises.readFile(this.path, 'utf-8');
            const productsjs = JSON.parse(products);
            return productsjs;
        } else {
            return []
        }
    } catch (error) {
        console.log(error);
    }

    }

 async addProduct (title, decription, price, thumbnail, code, stock ) {
    try {
        const productsFile = await this.getProducts();
        if (!title || !decription ||  !price || !thumbnail  || !code || !stock){
        console.log ('los campos son obligatorios')
         return;
         }

        if (this.productsFile.some (product => product.code === code )) {
        console.log ('Code ya existe')
         return;
         }
 
         const product = {
             title,
             decription,
             price,
             thumbnail,
             code,
             stock,
             id: this.#getMaxId() + 1
         };
         
         productsFile.push(product);
         await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
         
        }
    catch (error) {
        console.log (error);
    }
   
}

#getMaxId(){
    let maxId = 0;
    this.productsFile.map((product) =>{
        if(product.id > maxId) maxId = product.id;
    })
    return maxId;
}

async getProductById(id){
    try{
        const productsFile = await this.getProducts();
        const foundForId = productsFile.find(product => product.id === id);
        if (foundForId) {return foundForId} 
        else { console.log ( 'not found')} ;
    }
    catch (error) {
        console.log ( error)
    }
}
async updateProduct (id, ...campos){
    try{
        const delProduct = await this.getProducts();
        const posicionId = await delProduct.indexOf (id);
// con la posicion del id busco el elemento
// Buscar como agregar los campos sino se cuales son y cuantos son?
    }
    catch (error) {
        console.log (error)
    }

}

async deleteProduct (id){
    try{
        const delProduct = await this.getProducts();
        const posicionId = await delProduct.indexOf (id);
        const productFileBorrado = delProduct.splice (posicionId, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productFileBorrado))
    }
    catch (error) {
        console.log (error)
    }

}

}