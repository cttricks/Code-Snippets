/*
A simple fun project to lock your message with a pin so that you can only unlock & view the message with that pin only.
*/
async function _encrypt(text, pin) {
    //We'll use this to compare decrypted text later
    let actualText = text;
    let result = "";
    let res = [];
    let i = 0;

    try{
        text = await btoa(text);
        pin = pin.split('');
        await text.split('').forEach((char) => {
            i = (i>=pin.length)?0:i;
            let j = parseInt(pin[i]);
            const currentCharCode = char.charCodeAt(0);
            const nextCharCode = currentCharCode + j;
            const validNextCharCode = nextCharCode < 32 ? 1 : (nextCharCode > 126 ? 1 : 0);
            if(validNextCharCode>0){
                res.push(result);
                res.push(char);
                result="";
            }else{
                const newChar = String.fromCharCode(nextCharCode);
                result+= newChar;
                i++;
            }
        });
        
        if(result.length>0) res.push(result);
        result = res.join('0x0');

        //Re-Confirm that encrypted text can be decrypted later
        let decryptedText = await _decrypt(result, pin.join(''));
        if(decryptedText.length<1 || actualText !== decryptedText) result = '';
        
    }catch(e){
        console.log('Failed to encrypt text!');
        result = '';
    }
    return result;
}

async function _decrypt(encryptedText, pin) {

    let result = '';
    try{
        let i = 0;
        pin = pin.split('');

        await encryptedText.split('0x0').forEach(async (item) => {
            if(item.length<2){
                //No dec-required
                result+= item;
            }else{
                await item.split('').forEach((char)=>{
                    i = (i>=pin.length)?0:i;
                    let j = parseInt(pin[i]);
                    const currentCharCode = char.charCodeAt(0);
                    const nextCharCode = currentCharCode - j;
                    const newChar = String.fromCharCode(nextCharCode);
                    //console.log(char, i, j, currentCharCode, nextCharCode, newChar);
                    result+= newChar;
                    i++;
                });
            }
        });

        result = atob(result);

    }catch(e){
        result = '';
    }
    
    return result;
}

function getPinToUnlock(){
    return "253390";
}

encrypt.addEventListener('click', async ()=>{
    if(plainText.value.length<1) return alert("Enter your message");
    let data = await _encrypt(plainText.value, getPinToUnlock());
    plainText.value = '';
    encryptedText.value = data;
    console.log(data);
});

decrypt.addEventListener('click', async ()=>{
    if(encryptedText.value.length<1) return alert("Enter your encrypted message");
    let data = await _decrypt(encryptedText.value, getPinToUnlock());
    plainText.value = data;
    encryptedText.value = '';
    console.log(data);
});
