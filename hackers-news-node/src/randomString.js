function randomString(newPassword, length) {
var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for ( var i = 0; i <= length; i++ ) {
    newPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return newPassword;
}

module.exports = {
    randomString
}