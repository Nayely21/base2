import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base';
}


//  Preparar un programa que permita crear productos, agregarlos a un almacen, modificar la cantidad de productos en el almacen (saldo),
//  tener cuidado con los saldos negativos, trabajar con más de un almacen y mover productos entre almacenes.


//    Clases

class almacen {
  nombreAlmacen: string;
  productosAlmacen: productos[];
  
  constructor() {
    this.nombreAlmacen = ''
    this.productosAlmacen = [];
  }
}

class productos {
  nombreProducto: string;
  cantidadProducto: number;

  constructor() {
    this.nombreProducto = '';
    this.cantidadProducto = 0;
  }

  modificarCantidad(accion: string, monto: number): boolean 
  {
    let status:boolean = false;

    if (monto <= 0) {console.log('No se puede ingresar el valor.');}
    else {
      switch (accion) {
        case 'agregar':
            this.cantidadProducto += monto; console.log(`Se aumento al almacen destino la cantidad de [${this.nombreProducto}] a +${monto}.`);
            return true;
        case 'quitar':
          if ((this.cantidadProducto - monto) < 0) {
            console.log('No hay suficientes productos para quitar.');
            return false;
          }
          else {
            this.cantidadProducto -= monto;
            console.log(`Se disminuyò del almacen original la cantidad de [${this.nombreProducto}] a -${monto}`);
            return true;
          }
      }
      return false;
    }
    return status;
    
  }
  
  
}

// Datos
const almacen1 = new almacen(); almacen1.nombreAlmacen = 'Primer Almacen';

  const producto1 = new productos();
    producto1.nombreProducto = "Galletas"
    producto1.cantidadProducto = 10;

  const producto2 = new productos();
    producto2.nombreProducto = "Gaseosas"
    producto2.cantidadProducto = 10;

  const producto3 = new productos();
    producto3.nombreProducto = "Frituras"
    producto3.cantidadProducto = 10;
    
  almacen1.productosAlmacen.push(producto1)
  almacen1.productosAlmacen.push(producto2)
  almacen1.productosAlmacen.push(producto3)

const almacen2 = new almacen(); almacen2.nombreAlmacen = 'Segundo Almacen';

const producto4 = new productos();
  producto4.nombreProducto = "Galletas"
  producto4.cantidadProducto = 10;

const producto5 = new productos();
  producto5.nombreProducto = "Gaseosas"
  producto5.cantidadProducto = 10;

const producto6 = new productos();
  producto6.nombreProducto = "Frituras"
  producto6.cantidadProducto = 10;
  
almacen2.productosAlmacen.push(producto4)
almacen2.productosAlmacen.push(producto5)
almacen2.productosAlmacen.push(producto6)

const almacen3 = new almacen(); almacen3.nombreAlmacen = 'Tercer Almacen';

const producto7 = new productos();
  producto7.nombreProducto = "Galletas"
  producto7.cantidadProducto = 10;

const producto8 = new productos();
  producto8.nombreProducto = "Gaseosas"
  producto8.cantidadProducto = 10;

const producto9 = new productos();
  producto9.nombreProducto = "Frituras"
  producto9.cantidadProducto = 10;
  
almacen3.productosAlmacen.push(producto7)
almacen3.productosAlmacen.push(producto8)
almacen3.productosAlmacen.push(producto9)


//  [ FUNCIONES ] 
function tieneProducto(nom_producto: string, almacen: almacen): boolean{
  let decision:boolean = false;
  almacen.productosAlmacen.forEach((producto) => {
    if (producto.nombreProducto == nom_producto) {
      decision = true;
    }
  });
  return decision;
}

function buscar(varproducto: string, almacen: almacen){
  if (tieneProducto(varproducto, almacen) == true) {return almacen.productosAlmacen.find(producto => producto.nombreProducto === varproducto);}
  return null;
}

function mover(origenAlmacen: almacen, nom_producto: string, cantidad: number, destinoAlmacen: almacen){
  if (tieneProducto(nom_producto,origenAlmacen)== true && tieneProducto(nom_producto,destinoAlmacen) == true){
    if (buscar(nom_producto, origenAlmacen)?.modificarCantidad('quitar', cantidad) == true){
      if (buscar(nom_producto, destinoAlmacen)?.modificarCantidad('agregar', cantidad) == true){
        console.log("");
        console.log(`Se han trasladado [${cantidad} ${nom_producto}] del  [${origenAlmacen.nombreAlmacen}] al  [${destinoAlmacen.nombreAlmacen}].`)
      }
    }
  }
}

function mostrar(almacen: almacen){
  console.log("");
  console.log(`Productos del [${almacen.nombreAlmacen}]`)
  console.log('\t   *Productos*\t\t*Cantidad*')
  almacen.productosAlmacen.forEach((producto) => {
    console.log(`\t\t${producto.nombreProducto}\t\t\t${producto.cantidadProducto}`);
  });
  console.log('')
}


//  Consulta
mostrar(almacen2);
mostrar(almacen1);

mover(almacen2,'Galletas',5,almacen1);

mostrar(almacen2);
mostrar(almacen1);
