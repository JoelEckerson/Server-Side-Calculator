const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
// needed for req.body in POST calls
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;

// create array to hold the history
let history = [];

// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
})

// create post to put information on server
app.post( '/calculation', ( req, res ) =>{
    // console log
    console.log( 'in /calculation POST:', req.body );
    // creating variable to send the status
    let status = performCalculation( req.body );
    // sending status
    res.sendStatus( status );
    // console log the status
    console.log ( status );
    // call a function to get history
    onHistory( req.body );
} )

// create get to send information bakc
app.get( '/calculation', (req, res ) =>{
    // send results
    res.send( history );
    // console log
    console.log( 'in /calculation GET', history );
} )

// create function to do the equations
function performCalculation( equation ){
    // make variable to send back the 'OK'
    let returnStatus = 200;
    // create a switch to do the equation based on the button pushed
    switch( equation.operator ){
        // the case for addition
        case '+': 
            equation.result = Number(equation.firstNumber) + Number(equation.secondNumber);
        break;
        // the case for subtraction
        case '-': 
            equation.result = Number(equation.firstNumber) - Number(equation.secondNumber);
        break;
        // the case for multiplication
        case '*': 
            equation.result = Number(equation.firstNumber) * Number(equation.secondNumber);
        break;
        // the case for division
        case '/': 
            equation.result = Number(equation.firstNumber) / Number(equation.secondNumber);
        break;
        // create a default if it doesn't work
        default:
            console.log( 'no operator found');
            returnStatus = 400;
    }
    // return either an 'OK' or 'ERROR'
    return returnStatus;
}

// create a function to push the history into the global array
function onHistory( equation ){
    history.push( equation );
}



