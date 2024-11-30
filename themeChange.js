let lightDarkCheckbox = document.getElementById("lightDarkCheckbox");
lightDarkCheckbox.addEventListener("change", (e) => {
    if(lightDarkCheckbox.checked) {
        document.getElementById("body").style.setProperty('background-color','#041229');
        document.getElementById("userText").style.setProperty('color','#BBD6FD');
        document.getElementById("date").style.setProperty('color','#BBD6FD');
    }
    if(!lightDarkCheckbox.checked) {
        document.getElementById("body").style.setProperty('background-color','#BBD6FD');
        document.getElementById("userText").style.setProperty('color','#041229');
        document.getElementById("date").style.setProperty('color','#041229');
    }
});