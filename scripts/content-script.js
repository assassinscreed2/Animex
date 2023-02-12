let dialog;
let body = document.getElementsByTagName("body")[0];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(dialog)
    if(dialog){
        console.log("present")
        dialog.remove()
    }
    dialog = document.createElement('div');
    dialog.style.zIndex = 20000
    dialog.style.height = "250px"
    dialog.style.width = "270px"
    dialog.style.display = "block"
    dialog.style.position = "fixed"
    dialog.style.top = "50%"
    dialog.style.left = "50%"
    dialog.style.transform = "translate(-50%, -50%)"
    dialog.style.backgroundColor = "white"
    dialog.style.padding = "20px"
    dialog.style.borderRadius = "10px"
    dialog.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.3)"
    dialog.style.opacity = 0
    dialog.style.transition = "opacity 0.4s ease-in-out"
    
    let dialogHeader = document.createElement('div')
    
    dialogHeader.textContent = "Animex"
    dialogHeader.style.backgroundColor = "lightgray"
    dialogHeader.style.padding = "10px"
    dialogHeader.style.fontSize = "20px"
    dialogHeader.style.textAlign = "center"
    dialogHeader.style.borderTopLeftRadius = "10px"
    dialogHeader.style.borderTopRightRadius = "10px"
    
    dialog.appendChild(dialogHeader)
    body.appendChild(dialog);

        console.log('request',request)
        let dialogContent = document.createElement('div')
        let list = document.createElement("ul")
        request.response.forEach((ele,ind) => {
            let listitem = document.createElement("li")
            listitem.textContent = ele.animeTitle
            list.appendChild(listitem)
        });

        dialogContent.style.height = "150px"
        dialogContent.style.overflowY = "scroll"
        dialogContent.style.padding = "20px"
        dialogContent.appendChild(list)
        dialog.appendChild(dialogContent)

        setTimeout(()=>{
            dialog.style.opacity = 1
        },0.3)
        

        console.log(sender.tab?"from CS:"+sender.tab.url:"from extetn");
        sendResponse({message:"receaved"})
    }
)

document.addEventListener('click', function(event) {
    if (dialog && !dialog.contains(event.target)) {
      dialog.remove()
    }
});

