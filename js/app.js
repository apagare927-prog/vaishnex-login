<script>

const inputs=document.querySelectorAll("input");

inputs.forEach(input=>{

input.addEventListener("input",()=>{

if(input.value.trim()!==""){
input.classList.remove("error");
}

});

});

function validateSignup(){

let valid=true;

inputs.forEach(input=>{

if(input.value.trim()===""){

input.classList.add("error");
valid=false;

}

});

if(valid){
alert("Signup success ✅");
}

}

</script>
