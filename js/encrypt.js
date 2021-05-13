// (C1) ENCRYPT CLEAR TEXT
function encrypt(string)
{
    return CryptoJS.SHA256(string)+"";
}  

// (C2) DECRYPT CIPHER TEXT
/*function decrypt(string){
    return crypt.decrypt(string);
}*/
