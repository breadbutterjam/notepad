function onBodyLoad()
{
    // alert("A")
    document.querySelector("#notepad").addEventListener("input", changeFired);


    document.querySelector("#copytext").addEventListener("click", copytext);
    
    document.querySelector("#switchmode").addEventListener("click", switchmode);
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