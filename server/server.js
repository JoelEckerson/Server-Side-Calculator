const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
// needed for req.body in POST calls
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;
let calcuationResult = 0;
let history = [];

// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
})

app.post( '/calculation', ( req, res ) =>{
    console.log( 'in /calculation POST:', req.body );
    let status = performCalculation( req.body );
    res.sendStatus( status );
    console.log ( status );
} )

function performCalculation( equation ){
    let returnStatus = 200;
    switch( equation.operator ){
        case '+': 
            calcuationResult = Number(firstNumber) + Number(secondNumber);
        break;
        case '-': 
            calcuationResult = Number(firstNumber) - Number(secondNumber);
        break;
        case '*': 
            calcuationResult = Number(firstNumber) * Number(secondNumber);
        break;
        case '/': 
            calcuationResult = Number(firstNumber) / Number(secondNumber);
        break;
        default:
            console.log( 'no operator found');
            returnStatus = 400;
    }
    return returnStatus;
}

