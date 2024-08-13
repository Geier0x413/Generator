class Barcode {
  static prefix = {
    "aisle_bay": "9809000000",
    "pallet": "9824"
  };

  static generate( data ) {
    console.log( `[BARCODE] ${ data }` );

    JsBarcode( "#barcode" , `${ data }` , {
      background: "#ffffff",
      displayValue: false,
      height: 100,
      lineColor: "#000000",
      width: 2
    } );
  }
}

const input = {
  "aisle": document.querySelector( "#aisle" ),
  "bay": document.querySelector( "#bay" ),
  "pallet": document.querySelector( "#pallet" ),
  "type": document.querySelector( "#type" )
};

const filter = {
  "aisle_bay": function( data ) {
    if ( data ) this.shadowValue = ( this.shadowValue + data.replace( /\W+/i , "" ) ).toUpperCase();
    this.value = !isNaN( this.shadowValue[ 0 ] ) ? this.shadowValue.padStart( this.max , "0" ) : this.shadowValue;
  },
  "pallet": function( data ) {
    if ( data ) this.shadowValue = this.shadowValue + data.replace( /\D+/i , "" );
    this.value = this.shadowValue.padStart( this.max , "0" );
  }
};

input.aisle.filter = filter.aisle_bay;
input.bay.filter = filter.aisle_bay;
input.pallet.filter = filter.pallet;

input.type.addEventListener( "change" , function() {
  this.value = this.value.toLowerCase();

  switch ( this.value ) {
    case "bay":
      bay.parentElement.classList.remove( "hidden" );
      pallet.parentElement.classList.add( "hidden" );
      break;
    case "pallet":
      pallet.parentElement.classList.remove( "hidden" );
      bay.parentElement.classList.add( "hidden" );
      break;
    default:
      bay.parentElement.classList.add( "hidden" );
      pallet.parentElement.classList.add( "hidden" );
      break;
  }

  switch( this.value ) {
    case "aisle":
    case "bay":
      Barcode.generate( input.aisle.value || input.bay.value ? `${ Barcode.prefix.aisle_bay }-${ input.aisle.value }-${ input.bay.value }` : Date.now() );
      break;r
    case "pallet":
      Barcode.generate( input.pallet.value ? `${ Barcode.prefix.pallet }${ input.pallet.value }` : Date.now() );
      break;
  }
} );

[ input.aisle , input.bay , input.pallet ].forEach( field => {
  field.shadowValue = "";

  field.addEventListener( "input" , function( event ) {
    this.name = this.name.toLowerCase();

    if ( event.inputType.includes( "deleteContentBackward" ) ) this.shadowValue = this.shadowValue.substring( 0 , this.shadowValue.length - 1 );
    if ( this.shadowValue.length >= Number( this.max ) ) return this.value = this.shadowValue;

    this.filter( event.data );

    switch( this.name ) {
      case "aisle":
      case "bay":
        Barcode.generate( `${ Barcode.prefix.aisle_bay }-${ input.aisle.value }-${ input.bay.value }` );
        break;r
      case "pallet":
        Barcode.generate( `${ Barcode.prefix.pallet }${ this.value }` );
        break;
    }
  } );

  field.addEventListener( "click" , function() {
    this.name = this.name.toLowerCase();
    this.shadowValue = "";
    this.value = "";
    this.select();
  } );
} );

Barcode.generate( Date.now() );