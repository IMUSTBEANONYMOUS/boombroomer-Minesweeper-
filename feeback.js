document.querySelector('#feedback').addEventListener('keydown',(e)=>{
    if (e.key == 'Enter'){
        let feedback = document.querySelector('#feedback').value;
        if (feedback != ""){
            console.log(feedback);
        }
    }
})