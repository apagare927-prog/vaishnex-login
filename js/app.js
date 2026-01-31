// CREATE ACCOUNT VALIDATION

const createForm = document.getElementById("createForm");

if(createForm){

createForm.addEventListener("submit", function(e){

const email = this.querySelector('input[type="email"]').value.trim();
const mobile = this.querySelector('input[type="tel"]').value.trim();

if(email === "" && mobile === ""){

e.preventDefault();

alert("Enter Email OR Mobile number");

return false;
}

});
}
