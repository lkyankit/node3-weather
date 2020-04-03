

console.log(" other app.js loaded with html")



const form =document.querySelector('form');
const search=document.querySelector('input');
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')


form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const loaction=search.value;
    fetch('/weather?address='+encodeURIComponent(loaction)).then((response)=>{
response.json().then((data)=>{
if(data.error)
{
    message1.textContent=data.error
    message2.textContent=''
}
else{
    message1.textContent=data.location
    message2.textContent=data.forecast
}
    
})
})
    
})