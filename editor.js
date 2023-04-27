let saturate      =document.getElementById("Saturate")
let contrast     =document.getElementById("contrast")
let brightness   =document.getElementById("brightness")
let sepia         =document.getElementById("sepia")
let grayscale     =document.getElementById("grayscale")
let blur          =document.getElementById ("blur")
let huerotate     =document.getElementById("hue-rotate")
let download       =document.getElementById("download")
let reset           =document.getElementById("reset")
let img            =document.getElementById("imgloaded")
let upload         =document.getElementById("upload")
let imgbox         =document.querySelector(".img-box")


let canvas           =document.getElementById("canvas")
let context=canvas.getContext("2d")


// to hide button download and reset if there is no image 
window.onload=function(){
    reset.style.display="none" ;
    download.style.display="none"; 
    imgbox.style.display="none"
}
  

// the way to upload img
upload.onchange=function(){
    resting()
    reset.style.display="block" ;
    download.style.display="block"; 
    imgbox.style.display="block"

    let file=new FileReader();
    // to read the imgs from the files which it is like an array and we choose from this array  
    file.readAsDataURL(upload.files[0])
    file.onload=function(){
        img.src=file.result
    }    
    // to draw the photo into the canvas
    //i tied it by onload to call it automaticlly
    img.onload=function(){
        canvas.width=img.width;
        canvas.height=img.height;
        context.drawImage(img,0,0,canvas.width,canvas.height)
        //know i don't want the original photo
        img.style.display="none"
    }
}


// to make editing to the the photo
let filters     =document.querySelectorAll("ul li input")

filters.forEach(filter=>{
    filter.addEventListener("input",function()
    {
        context.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)

        `
        context.drawImage(img,0,0,canvas.width,canvas.height)

    })
})
// this function to reset all the values
 function resting(){
    context.filter="none";
    saturate.value="100"
    contrast.value="100"
    brightness.value="100"
    sepia.value="0"
    grayscale.value="0"
    blur.value="0"
    huerotate.value="0"
context.drawImage(img,0,0,canvas.width,canvas.height)

}

//to extract the data from canvas to 
download.onclick=function(){
    download.href = canvas.toDataURL()
}

