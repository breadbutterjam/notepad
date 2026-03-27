function onBodyLoad()
{
    // alert("A")
    /*document.querySelector("#notepad").addEventListener("input", changeFired);


    document.querySelector("#copytext").addEventListener("click", copytext);
    
    document.querySelector("#switchmode").addEventListener("click", switchmode);

    document.querySelector("#zenmode").addEventListener("click", zenModeToggle);

    document.querySelector("#cbCursorLessTyping").addEventListener("change", toggleCursor);

    document.querySelector(".counts").addEventListener("click", fullZen)    
*/
}

function fullZen(){
    if (document.querySelector(".headerHolder").style.opacity == 0){
        //toggle off full zen
        document.querySelector(".headerHolder").style.opacity = 1;
        document.querySelector(".notepadMain").style.border = "";
        document.querySelector(".notepadMain").classList.remove("fullFocus")
        //.fullFocus
    }
    else
    {
        //toggle ON full zen
        document.querySelector(".headerHolder").style.opacity = 0;
        document.querySelector(".notepadMain").style.border = "none";
        document.querySelector(".notepadMain").classList.add("fullFocus")
    }


}

function toggleCursor(){
    //nocursor
    //console.log("toggle")
    let ntp = document.querySelector("#notepad"); 
    if (document.querySelector("#cbCursorLessTyping").checked){
        ntp.classList.add("nocursor");
    }else{
        ntp.classList.remove("nocursor");
    }

}

function zenModeToggle(){
    //zenmodeadded
    if (document.querySelectorAll('.zenmodeadded').length === 0){
        document.querySelector(".mainContainer").classList.add("zenmodeadded");
        document.body.requestFullscreen();
    }
    else
    {
        document.querySelector(".mainContainer").classList.remove("zenmodeadded");
        document.exitFullscreen();
    }

}

function changeFired(){
    
    let str = document.querySelector("#notepad").innerText;
    let charC, wordC;
    console.log(str)
    if (str)
    {
        charC = str.length;
        wordC = str.match(/\S+/g).length;
        
    }
    else
    {
        charC = 0; 
        wordC = 0;
    }

    document.querySelector('.CharCount').innerText = String(charC).trim() + "c";
    document.querySelector('.WordCount').innerText = String(wordC).trim() + "w";
    // document.querySelector('.CharCount').innerText = charC;
}

function copytext(){
    let a = document.createElement('textarea');
    a.value = document.querySelector("#notepad").textContent.trim();
    document.body.append(a);
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
    alert ('text copied')
}

function switchmode(){
    let a = Array.from(document.querySelectorAll('.modeChanger'));
    let bSwitchToDark = false;
    if (a[0].classList.value.indexOf("darkMode") === -1)
    {
        bSwitchToDark = true;
    }
        
    for (x in a){
        if (bSwitchToDark)
        {
            a[x].classList.add("darkMode");
        }
        else
        {
            a[x].classList.remove("darkMode");
        }
    }

}