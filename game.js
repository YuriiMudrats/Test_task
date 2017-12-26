
var field=document.getElementsByClassName('field')[0]
var title= document.getElementById('h1')
var newGame=document.getElementById('newGame').addEventListener('click', getSize)
var repeat=document.getElementById('reapet').addEventListener('click', clearTable)
 
 
function getStatus(response) {
    if(response.status!==200) {
        console.log ('Error! not 200!')
        return new Error(response.statusText); }
        else {
            return Promise.resolve(response)
        }
    }
    // Проверка статуса
function getJson(response) {
    return response.json();
 } //  Получение Json строки   и чтение обьекта
    
function createTable(data){  
    var cells=[];
    var rows=[];
        for ( var i=0; i<data.width; i++) {
        rows[i]=document.createElement('div')
        rows[i].classList.add('row')
        field.appendChild(rows[i]);
        for( var j=0; j< data.height;j++) {
            cells[j]=document.createElement('div')
            cells[j].classList.add('cell')
            rows[i].appendChild(cells[j])
        }
    }
     
}   //Создание таблици

function getSize() {
    fetch ("https://kde.link/test/get_field_size.php", {method:'get' })
    .then(getStatus)
    .then(getJson)
    .then(createTable)
    .then(addPictures)
    
}  // чейнинг вызовов

function  clearTable() { 
    var rows=document.getElementsByClassName('row');
    var i;
    console.log(rows)
    for (i=rows.length-1; i>=0; i--) {
        rows[i].remove()
    }
}   /// удаление таблици
    
function addPictures(){
    var images=[]
    var cells= document.getElementsByClassName('cell')
    for(var i=0;i<((cells.length)/2);i++) {
        images[i]='https://kde.link/test/'+ Math.floor(Math.random()*10) +'.png'
        
        
    }
     
    console.log(images);
    var images2=images.concat(images)
    images2.sort( function(){
       return Math.random()-1;
    
    })
    console.log(images2)
    //   добавляем картинки 
    for (var j=0; j<cells.length; j++) {
        cells[j].style.backgroundImage='url' + '('+  images2[j] +')';
        /// скрываем картинки!
        cells[j].classList.add('hide');
    }

};   // Создание массива картинок и добавление их в массив

function activePicture(event) {
    
    var target=event.target 
        if (target.tagName=='DIV'&&!target.classList.contains('show-always')) {
        target.classList.remove('hide')
        target.classList.add('show')
        console.log(target)
        
    }

}   // Событие клик и присваевание класса

function getHover(arr) {
     for(var i=0;i< arr.length; i++){
         console.log(arr)
        arr[i].classList.remove('show')
         arr[i].classList.add('hide')
    }

}    
// удаление класса при не совпадение

function activeAlways(arr) {
    for (var i=0; i< arr.length; i++) {
        arr[i].classList.remove('show');
        arr[i].classList.add('show-always')
    }
}
// добавление класса при двух одинаковых картинках
function getWin() {
    var win=document.getElementsByClassName('show-always');
    var cells= document.getElementsByClassName('cell');
    if(win.length==cells.length) {
        title.innerHTML='Конец игры, еще?'
    }
} 
// проверка окончания игры


field.addEventListener('click', openPictures) 

function openPictures(event) {
    
    var active=[];
    var picture1;
    var picture2; 
    
     activePicture(event)

     active=document.querySelectorAll('.show');
     console.log(active) 
      
     if( active.length==2 ) {
        picture1=(+active[0].style.backgroundImage.split('')[27])
        console.log(picture1)
        picture2=(+active[1].style.backgroundImage.split('')[27])
        console.log(picture2)

        if(picture1==picture2) {
            activeAlways(active)
        } else {

           setTimeout(getHover, 500, active);
            active.length=0
        }
        getWin()
     }

     

    }

    
   
  
 

// function getIndex() {
//     var index=[]
// var cells=document.getElementsByClassName('cell')
// for (var i=0 ; i<cells.length; i++ ){
//    index[i]= (cells[i].style.backgroundImage.split('')[27])
// }
// console.log(index)
// }
 
   
