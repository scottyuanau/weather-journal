let baseURL = 'http://api.animalinfo.org/data/?animal='
let apiKey = '&appid=9f15e45060...';



document.querySelector('.generate').addEventListener('click',()=>{
    let feelings = document.querySelector('.feelings').value;
    let zip = document.querySelector('#zip').value;
    console.log(feelings,zip);
});