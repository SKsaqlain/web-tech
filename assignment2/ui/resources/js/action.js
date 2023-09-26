function fetchResults(){
    // alert(this);
    let data = document.forms["search-form"];
    const xhr=new XMLHttpRequest();
    const fd=new FormData();
    for(const [name,value] of Object.entries(data)){
        fd.append(name,value);
    }

    xhr.addEventListener('load',(event)=>{
        alert("Data Sent and response laoded");
    });
    xhr.addEventListener('error',(event)=>{ alert("Something went wrong")});

    xhr.open('GET','0.0.0.0:5050/findAllItems?'+new URLSearchParams(fd).toString(),true);
    xhr.send();
}