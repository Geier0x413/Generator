const sections = {
  "pallet": document.querySelector( "#pallet" ),
  "sku": document.querySelector( "#sku" ),
  "location": document.querySelector( "#location" ),
  "quantity": document.querySelector( "#quantity" )
};

Object.keys( sections ).forEach( section => {
  section = sections[ section ];

  for ( let i = 0; i < 24; i++ ) {
    const cell = document.createElement( "section" );
    section.append( cell );
  }
} );