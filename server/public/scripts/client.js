$ ( document ).ready( onReady );

let equation = {
    firstNumber: 0,
    operator: '',
    secondNumber: 0
};

function onReady(){
    console.log('JQ');
    $( '#equalButton' ).on( 'click', onEqualButton );
    $( '.operator' ).on('click', onOperatorButton );

} // end onReady

function onEqualButton(){
    // console log to check if working
    console.log( 'in onEqualButton' );
    // grab value of firstNumber input
    equation.firstNumber = $('#firstInput').val();
    // grab value of secondNumber input
    equation.secondNumber = $('#secondInput').val();
    // send equation to server via post
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: equation
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        // if successful do a GET to get results and history
    }).catch( function( err ){
        // catch an error
        alert( 'error performing calculation' );
        console.log( err );
    } )
} // end onEqualButton

function onOperatorButton(){
    // console log to check if working
    console.log( 'in onOperatorButton' );
    // retreive which equation button was clicked
    equation.operator = $( this ).text();
} // end onOperatorButton

