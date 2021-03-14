$ ( document ).ready( onReady );

let equation = {
    firstNumber: 0,
    operator: '',
    secondNumber: 0,
    result: ''
};

function onReady(){
    console.log('JQ');
    $( '#equalButton' ).on( 'click', onEqualButton );
    $( '.operator' ).on('click', onOperatorButton );
    $( '#clearButton').on('click', onClearButton );
    getCalculationResult();
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
    })// end post
    let response = getCalculationResult();
    updateResults( response );

} // end onEqualButton

function onOperatorButton(){
    // console log to check if working
    console.log( 'in onOperatorButton' );
    // retreive which equation button was clicked
    equation.operator = $( this ).text();
} // end onOperatorButton

// create function to GET info from server
function getCalculationResult( ){
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then( function( response ){
        // console log the response
        console.log( 'back from GET:', response );
        // create variable for history id
        let el = $( '#history' );
        // empty results
        el.empty();
        // loop through history from server to append to the DOM
        for (let i = 0; i < response.length; i++) {
            // append to DOM
            el.append(`<li>${response[i].firstNumber} ${response[i].operator} ${response[i].secondNumber} = ${response[i].result}</li>`);
        }
        return response;
    }).catch( function( err ){
        // alert if there are any issues
        alert( 'error getting calculationResults from server ' + err );
        console.log( err );
    })// end get
} // end getCalculationResults

// create function for clear button
function onClearButton( ){
    // console log
    console.log( 'in onClearButton' );
    // empty the inputs
    $('#firstInput').val( ' ' );
    $('#secondInput').val( ' ' );
}// end onClearButton

function updateResults( response ){
    // create variable for results id
    let element = $( '#result' );
    // empty
    element.empty();
    // append the answer to the DOM
    element.append(`${response[response.length - 1].result}`);
}