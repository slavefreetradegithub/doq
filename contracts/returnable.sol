contract ExampleContract {
  // some state variables ...

  event ReturnValue(address indexed _from, int256 _value);

  function foo(int256 _value) returns (int256) {
    // manipulate state ...
    
    ReturnValue(msg.sender, _value);
    return _value;
  }
}

// contract ExampleContract {
//   // some state variables ...
//   function foo(int256 _value) returns (int256) {
//     // manipulate state ...
//     return _value;
//   }
// }