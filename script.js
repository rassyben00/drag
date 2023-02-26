const clear=document.getElementById("clear");
const undo=document.getElementById("undo");
const redo=document.getElementById("redo");

document.body.addEventListener("click", display);
clear.addEventListener("click", clearAll);
undo.addEventListener("click", undoLast);
redo.addEventListener("click", redoLast);

setInterval(handleNewElement,1);

const abc=["A","Á","B","C","D","E","É","F","G","H","I","Í","J","K","L","M","N","O","Ó","Ö","Ő","P","Q","R","S","T","U","Ú","Ü","Ű","V","W","X","Y","Z"];
let id=0;
let canPlaceNewElement=true;
const history=[];

function display(event){
    if(canPlaceNewElement==true && event.id!="undo" && event.id!="redo" && event.id!="clear"){
        let element = document.createElement('div');
        element.innerHTML=abc[Math.floor(Math.random()*abc.length)];
        element.style.left = event.clientX+"px";
        element.style.top = event.clientY+"px";
        element.classList.add("element");
        element.setAttribute("id",id);
        element.setAttribute("onmouseover","onMouseOver(this)");
        document.body.append(element);
        id++;
    }
    canPlaceNewElement=true;
}

function clearAll(){
    canPlaceNewElement=false;
    const elements = document.getElementsByClassName("element");
    while(elements.length>0){
        elements[0].remove();
    }
    id=0;
}

function undoLast(){
    canPlaceNewElement=false;
    const elements = document.getElementsByClassName("element");
    if(id>0){
        history.push([elements[id-1].id,elements[id-1].style.left,elements[id-1].style.top,elements[id-1].innerHTML])
        elements[id-1].remove();
        id--;
    }
}

function redoLast(event){
    canPlaceNewElement=false;
    if(history.length!=0 && event.id!="undo" && event.id!="redo" && event.id!="clear"){
        let itemToRedo = history.pop();
        let element = document.createElement('div');
        element.innerHTML=itemToRedo[3];
        element.style.cssText = 'left:'+itemToRedo[1]+';top:'+itemToRedo[2]+';';
        element.classList.add("element");
        element.setAttribute("id",itemToRedo[0]);
        element.setAttribute("onmouseover","onMouseOver(this)");
        document.body.append(element);
        id++;
    }
}

function onMouseOver(event){
    if(event.id!="undo" && event.id!="redo" && event.id!="clear"){
        dragElement(document.getElementById(event.id));
    }
    canPlaceNewElement=false;
  }

function handleNewElement(){
    canPlaceNewElement=true;
}

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(element.id).onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        canPlaceNewElement=false;
    }
}