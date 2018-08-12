
contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract ethertransfer is mortal {
 
    event ReturnValue(address indexed _from, int256 _value);

    function payMe() payable returns(bool success) {
        return true;
    }

    function fundtransfer(address etherreceiver, uint256 amount){
        if(!etherreceiver.send(amount)){
            ReturnValue(msg.sender, 69);
           throw;
        }    
    }
}


contract etherreceiver {       
    function etherreceiver(){          
    }    
}