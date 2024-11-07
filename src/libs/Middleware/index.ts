import Reauthentication from './Reauthentication'

/*
Requests will pass through each middleware function in sequence, 
and each result (or error) will be passed to the next.  

( 1 ) Logging 
    - Logs request details and errors.

( 2 ) RecheckConnection 
    - Sets a timer for a request that will "recheck" if we are connected to the internet if time runs out. 
    - Also triggers the connection recheck when we encounter any error.

( 3 ) Reauthentication 
    - Handles jsonCode 407 which indicates an expired authToken. 
    - We need to re-authenticate and get a new authToken with our stored credentials.

( 4 ) SaveResponseInStore 
    - Merges the fullfilled data into it's respective state.

*/

export { Reauthentication }
