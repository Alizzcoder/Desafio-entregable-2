const fs = require ("fs");

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
            return [];
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
    
            if (productsFile.some (product => product.code === code )) {
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
                 id: await this.#getMaxId() + 1
             };
             
             productsFile.push(product);
             await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
             
            }
        catch (error) {
            console.log (error);
        }
       
    }

async #getMaxId(){
    let maxId = 0;
    const productsFile = await this.getProducts();
    productsFile.map((product) =>{
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
async updateProduct (obj, id){
    try{
        const productsFile = await this.getProducts();
        // busco el producto con la posición del id
        const posicionId = productsFile.findIndex(product => product.id === id)
        if (posicionId === -1){
            console.log ( 'id no encontado');
        }else {
            productsFile[posicionId] = {...obj,id } //  agrego el objeto al array en la posicion del id encontrado
        }
        await fs.promises.writeFile (this.path, JSON.stringify(productsFile));
    }
    catch (error) {
        console.log (error)
    }
}

async deleteProduct (id){
    try{
        const delProduct = await this.getProducts();
        const posicionId = productsFile.findIndex(product => product.id === id)
        if (posicionId === -1){
            console.log (' ID de producto no encontado');
        } else {
            const productFileBorrado = delProduct.splice (posicionId, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productFileBorrado))
        }
        
    }
    catch (error) {
        console.log (error)
    }
}
}

/*--------------------------TEST-----------------------*/
const productManager = new ProductManager('./productos.json');
console.log (productManager.getProducts());

productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123', 25 )
console.log (productManager.getProducts());

productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc126', 25 )
console.log (productManager.getProducts());

//console.log (productManager.getProductById(2))

console.log ( productManager.updateProduct ({price:1000},1))

//console.log (productManager.deleteProduct(3)); 
//console.log(await productManager.deleteProduct(1)); 
