// This function needs to accept a signed integer in the 14-bit range [-8192..+8191] and return a 4 character
function encodeTheInteger(num){
  var minInteger = -8191; // Min integer
  var maxInteger = 8191;  // Max integer

  var encodeInteger; //Final integer for encoding into 16-bit iteger

// Check If inserted amount greater than -8191 and less than 8191. Making sure the inserted integer length equal 4 
  if(num > minInteger && num < maxInteger && num.toString().length == 4){

    // Add 8192 to the raw value, so its range is translated to [0..16383]
    encodeInteger = num + 8192;

    return encodeInteger.toString(16);

  }else if(num > minInteger && num < maxInteger && num.toString().length < 4){
    // If inserted integer length less than 4, find out what is the length of inserted integer
    var moduloValue = 4 - num.toString().length;

    // Add number of zeros to iserted integer and remove point from it. Making sure we have 4 lenght of integer
    var makeIntegerfour = num.toFixed(moduloValue).replace('.', '');
    
    encodeInteger = num + 8192;
    return encodeInteger.toString(16);

  }else{
    console.log('not valid number')
  }
}
encodeTheInteger(12);


// Decode the gaven String
function decodeTheInteger(num){
  var decode = parseInt(num, 16);
  console.log(decode)
  return decode;
}