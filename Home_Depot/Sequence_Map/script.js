const grid = document.querySelector( "grid" );
const input = {
  "column": document.querySelector( "#column" ),
  "row": document.querySelector( "#row" ),
  "sequence": document.querySelector( "#sequence" )
};

function matrix() {
  const col = input.column.value;
  const row= input.row.value;
  const seq = input.sequence.value;

  if ( !col || !row || !seq ) return;

  grid.innerHTML = "";
  grid.style.gridTemplateColumns = "auto ".repeat( col );
  grid.style.gridTemplateRows = "auto ".repeat( row );

  for ( let i = 0; i < ( col * row ); i++ ) {
    const cell = document.createElement( "cell" );

    if ( i + 1 == seq ) cell.setAttribute( "selected" , "" );

    grid.append( cell );
  }
}

[ input.column , input.row , input.sequence ].forEach( function( field ) {
  field.addEventListener( "input" , function( event ) {
    this.name = this.name.toLowerCase();

    if ( event.inputType.includes( "deleteContentBackward" ) ) this.shadowValue = this.shadowValue.substring( 0 , this.shadowValue.length - 1 );
    if ( this.shadowValue.length >= Number( this.max ) ) return this.value = this.shadowValue;
    if ( event.data ) this.shadowValue = this.shadowValue + event.data.replace( /\D+/i , "" );
    this.value = this.shadowValue;

    matrix();
  } );

  field.addEventListener( "focus" , function() {
    this.name = this.name.toLowerCase();
    this.shadowValue = "";
    this.value = "";
    this.select();
  } );
} );