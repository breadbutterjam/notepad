let currentSaveId = "";
function onBodyLoad()
{
    // alert("A")
    document.querySelector("#notepad").addEventListener("input", changeFired);


    document.querySelector("#copytext").addEventListener("click", copytext);
    
    document.querySelector("#switchmode").addEventListener("click", switchmode);

    document.querySelector("#zenmode").addEventListener("click", zenModeToggle);

    document.querySelector("#cbCursorLessTyping").addEventListener("change", toggleCursor);

    document.querySelector(".counts").addEventListener("click", fullZen)    

    document.querySelector("#save").addEventListener("click", saveToLocal);
    document.querySelector("#load").addEventListener("click", loadFromLocal);
    document.querySelector("#clear").addEventListener("click", clearLocal);
    
    document.querySelector(".autosaveToggle").addEventListener("click", toggleAutoSave);

    document.querySelector(".counts").addEventListener("click", zenModeToggle)

    switchmode();
}

function clearLocal(){
    let popsicle;
    let a = confirm("this will erase saved data. this action cannot be undone. are you sure you want to continue?");
    if (a){
        localStorage.removeItem("jamsNotepad")
        alert("cleared");
    }
}

let g_bAutoSave = false;
let g_oAutoSaveTimer;
let g_timeToSave = 2000;
function toggleAutoSave(){
    if (g_bAutoSave)
    {
        //turn autosave OFF
        if (g_oAutoSaveTimer){
            clearInterval(g_oAutoSaveTimer)
            g_bAutoSave = false;
        }
        document.querySelector('.autosaveToggle').innerText = 'turn autosave ON'
    }
    else {
        //turn autosave ON
        g_bAutoSave = true;
        if (currentSaveId === ''){
            currentSaveId = getNewSaveID();
        }
        g_oAutoSaveTimer = setInterval(saveToLocal, g_timeToSave);
        document.querySelector('.autosaveToggle').innerText = 'turn autosave OFF'

        
    }
}

function getLocalSaveObject(){
    let t = {};
    t.charWordCount = '';
    t.innerHTML = '';
    t.savedAt = '';


}

function saveToLocal(){
    //localStorage.jamsNotepad = document.querySelector("#notepad").innerHTML;

    

    let bSaveOnCurrentData; 
    if (currentSaveId === ''){
        //if save is selected manually for the first time, i.e. on a non-loaded data. 
        currentSaveId = getNewSaveID();
    } else if (!g_bAutoSave){
        //note in case of autosave, current save id will always have some ID

        bSaveOnCurrentData = confirm("do you want to save on existing data?");
        if (!bSaveOnCurrentData){
            currentSaveId = getNewSaveID();
        }    
    }



/*     if (g_bAutoSave){
        bSaveOnCurrentData = true;
    }
    else if (currentSaveId === ''){
        bSaveOnCurrentData = false;
    } else { //do not ask for this if autosave is on. 
        bSaveOnCurrentData = confirm("do you want to save on current data");
    } */

    actualSaveToLocal();

    // slayIt(bSaveOnCurrentData);

    /* if (!isCurrentDataSaved()){
        slayIt();
    }
    else{ 
        slayIt(true);
    
    } */
    // alert("saved");
    console.log("saved")
}

function isCurrentDataSaved(){
    if (currentSaveId === "")
    {
        return false;
    }
    else{
        return true;
    }
}

function getSavedIDs(){
    let strRet = '';
    let oSavedData = getSavedData();
    if (oSavedData.savedIDs === undefined){
        strRet = "no data found";
    } else {
        strRet = oSavedData.savedIDs.toString();
    }

    return strRet;
    
}

function loadFromLocal(){
    let strPromptMessage = getSavedIDs();
    let oSavedData, toLoadData;
    a = prompt(strPromptMessage);
    if (a.length > 0){
        if (strPromptMessage.split(",").indexOf(a) === -1){
            alert("invalid input, please check id and try again")
        } else{
            oSavedData = getSavedData();
            toLoadData = JSON.parse(oSavedData.data[Number(a)]);
            document.querySelector("#notepad").innerHTML = toLoadData.body;
            currentSaveId = a;
        }
    }
    /*
    OLD METHOD
    if (localStorage.jamsNotepad === undefined){
        document.querySelector("#notepad").innerHTML = '';
    }
    else{
        document.querySelector("#notepad").innerHTML = localStorage.jamsNotepad;
    }*/

    alert('Loaded')
}

function doAutoSave(){
    if (!isCurrentDataSaved()){
        currentSaveId = getNewSaveID();
    }
}

function getSaveObject(){
    let oRet = {};
    oRet.ID = '';
    oRet.lastSavedAt = '';
    oRet.charWordCount = '';
    oRet.body = '';
    return oRet;
}


function getCharWordCount(){
    let strCharWordCount = '';
    strCharWordCount = document.querySelector('.CharCount').innerText + " " + document.querySelector('.WordCount').innerText;
    return strCharWordCount;
}


function actualSaveToLocal(){
    let nSaveID = currentSaveId;

    /* if (bSaveOnExisting){
        nSaveID = currentSaveId;
    }
    else {
        nSaveID = getNewSaveID();
    } */
    
    

    let lastSavedAt = getTimeString();
    let charWordCount = getCharWordCount();
    let strBody = document.querySelector("#notepad").innerHTML;
    let oSaveObj = getSaveObject();
    oSaveObj.ID = nSaveID;
    oSaveObj.lastSavedAt = lastSavedAt;
    oSaveObj.charWordCount = charWordCount;
    oSaveObj.body = strBody;

    let oSavedData = getSavedData();
    if (oSavedData.savedIDs === undefined){
        oSavedData.savedIDs = [];
        oSavedData.data = {};
    }

    /* if (!bSaveOnExisting){
        oSavedData.savedIDs.push(nSaveID);
    } */
    if (oSavedData.savedIDs.indexOf(nSaveID) === -1){
        oSavedData.savedIDs.push(nSaveID);
    }


    oSavedData.data[nSaveID] = JSON.stringify(oSaveObj);
    localStorage.jamsNotepad = JSON.stringify(oSavedData);

    currentSaveId = nSaveID;
    document.querySelectorAll('#last_saved_count')[0].innerText = ": " + lastSavedAt + ' save ID: ' + currentSaveId;
    // console.log(lastSavedAt)
}

function getSavedData(){
    let oRet = {};
    if (localStorage.jamsNotepad === undefined){
        oRet = {};
    } else {
        oRet = JSON.parse(localStorage.jamsNotepad);
    } 

    return oRet;
}

function getNewSaveID(){
    let nId = -1;
    if (localStorage.jamsNotepad === undefined){
        nId = 0;
  
    } else {
        oLS = JSON.parse(localStorage.jamsNotepad);
        if (oLS.savedIDs === undefined){
            nId = 0;
        } else {
            nId = oLS.savedIDs[oLS.savedIDs.length - 1] + 1;
        }
    }

    return nId;
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
    let oCountsElem = document.querySelectorAll(".counts")[0];

    //zenmodeadded
    if (document.querySelectorAll('.zenmodeadded').length === 0){
        //add zen mode
        document.querySelector(".mainContainer").classList.add("zenmodeadded");
        
        //remove outline from notepad
        document.querySelector("#notepad").classList.add("blankOutline");


        //move counts to footer
        document.querySelector('.footer').append(oCountsElem);
        Array.from(document.querySelectorAll('.footer')[0].children).forEach(function(elem){
            if (Array.from(elem.classList).indexOf("footerFontStyling") > -1){
                elem.style.display = "none";
            }
        })

        oCountsElem.classList.add("footerFontStyling");

        document.querySelector('.buttonHolder').style.opacity = 0
        // document.body.requestFullscreen();




    }
    else
    {
        document.querySelector(".mainContainer").classList.remove("zenmodeadded");
        // document.exitFullscreen();

        document.querySelector("#notepad").classList.remove("blankOutline");

        oCountsElem.classList.remove("footerFontStyling");
        document.querySelector(".headerHolder .flx").append(oCountsElem);


        Array.from(document.querySelectorAll('.footer')[0].children).forEach(function(elem){
            elem.style.display = "";
        })

        document.querySelector('.buttonHolder').style.opacity = 1;

    }

}

function changeFired(){
    
    let str = document.querySelector("#notepad").innerText;
    let charC, wordC;
    //console.log(str)
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

/*
    UTILITIES FUNCTION START
*/

function getTimeString(){
    let a = new Date();
    let hr, min, ampm; 
    hr = a.getHours();
    min = a.getMinutes();
    ampm = 'am';
    if (hr >12){ampm = 'pm'; hr -= 12}else if (hr === 12){ampm = 'pm'};
    let retStr = '';
    retStr = String(hr) + ":" + String(min) + " " + ampm;

    return retStr;
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

/*
    UTILITIES FUNCTION END
*/