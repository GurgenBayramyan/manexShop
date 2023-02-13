// validation
const form = document.querySelector(".form_for-change");
const inputs = [...form.querySelector(".change").children];
const sendBtn = form.querySelector(".btn_for_sign");
const span = form.querySelector(".eror_task .for_email");

sendBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const span = form.querySelector(".eror_task .for_email");
    
    inputs.forEach(input=>{
            if(input.value.trim()===""){
                input.classList.add("error_input")
                
            }else{
                input.classList.remove("error_input")
            }
        
    })

   let email =  inputs[0];
   let password = inputs[1];
   let replacePasword = inputs[2];
   validateEmail(email);
   validatePassword(password);
   validateReplacePassword(replacePasword);

   if(validateEmail(email) && validatePassword(password) && validateReplacePassword(replacePasword) && inputs[3].value.trim()!== "" && inputs[4].value.trim()!== ""  && inputs[5].value.trim()!== ""){
  
   
    fetch("https://retoolapi.dev/AQvtAQ/reg",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "email":`${inputs[0].value.trim()}`,
                "password":`${inputs[1].value.trim()}`,
                "surname":`${inputs[3].value.trim()}`,
                "name":`${inputs[3].value.trim()}`,
                "lastname":`${inputs[5].value.trim()}`
            })
        }).then(res=>{
            inputs.forEach(input=>{
                input.value = "";
            })
            span.textContent = `вы успешно зарегистрировались`
            location.href = "./index.html"
        })
   }
})


function validateEmail(input) {
    
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
        input.className="";
        span.textContent="";
  
      return true;
  
    } else {
      input.classList.add("error_input");
      span.textContent =  'Неверный адрес электронной почты!';
      return false;
  
    }
  
}
function validatePassword(input) {  
    const pw = input.value;  
    const span = form.querySelector(".eror_task .for_password");
     
   //minimum password length validation  
    if(pw.length < 8) {  
        
       input.classList.add("error_input");
       span.textContent = "** Длина пароля должна быть не менее 8 символов.";  
       return false;  
    }  
    
  //maximum length of password validation  
    if(pw.length > 15) {  
       input.classList.add("error_input");
       span.textContent="** Длина пароля не должна превышать 15 символов.";  
       return false;  
    } 
    span.textContent="";
    input.className="";
    return true;

}  

function validateReplacePassword(input){
    const span = form.querySelector(".for_replace");
    if(input.value===inputs[1].value){
        span.textContent="";
        return  true
    }else{
        span.textContent = `Пароли не совпадают`
        return false
    }
}