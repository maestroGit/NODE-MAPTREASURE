// DOM
const databtn = document.getElementById("btnGet");
const playbtn = document.getElementById("btnplay");
const render = document.getElementById("render");

const url = "http://localhost:3000/viewdata";
// without await, using pure promises syntax:
const getdata = ()=>{
    fetch(url) // to get the response body, we need to use an additional method call response.json() – parse the response as JSON,
    .then(response => response.json())
    .then((data)=> {
        renderdata(data);
        })
    .catch(err=>console.log(err));
};

const deleterow = (data)=>{
    const id = data.id;
    console.log(id);
    fetch(`http://localhost:3000/${id}`,{method: 'DELETE'})
    .then(response=>response.json())
    .then(console.log('delete'))
    getdata();
};

const renderdata = (data)=>{
    // clean contet if exist
    render.innerHTML="";
    // append each player to our page
    data.forEach((item)=>{
        const div = document.createElement("div");
        div.classList.add('content');
        const btn = document.createElement("button");
        btn.innerText="delete";
        btn.classList.add('btn-deleted');
        btn.addEventListener("click",(e)=>{
            let target = e.target;
            console.log(target);
            target.style.backgroundColor = "red";
            deleterow(item);
        })
        const dias = item.times;
        //console.log(dias, typeof(dias));
        let dia = dias.slice(0,10);
        div.innerHTML= `Player: ${item.player} Score: ${item.score} Time: ${dia} `;
        render.appendChild(div);
        div.appendChild(btn)
    });
        

}


btnGet.addEventListener('click',getdata);


