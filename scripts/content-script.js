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
        dialog.style.minHeight = "20em"
        dialog.style.minWidth = "25em"
        dialog.style.maxWidth = "30em"
        dialog.style.display = "block"
        dialog.style.position = "fixed"
        dialog.style.top = "50%"
        dialog.style.left = "50%"
        dialog.style.transform = "translate(-50%, -50%)"
        dialog.style.backgroundColor = "white"
        dialog.style.borderRadius = "10px"
        dialog.style.boxShadow = "10px 10px 20px 0px rgba(0, 0, 207, 0.3)"
        dialog.style.opacity = 0
        dialog.style.transition = "opacity 0.4s ease-in-out"
        
        let dialogHeader = document.createElement('div')
        
        dialogHeader.textContent = request.buttonName
        dialogHeader.style.backgroundColor = request.buttonColor
        dialogHeader.style.color = "white"
        dialogHeader.style.padding = "10px"
        dialogHeader.style.fontSize = "20px"
        dialogHeader.style.textAlign = "center"
        dialogHeader.style.borderTopLeftRadius = "10px"
        dialogHeader.style.borderTopRightRadius = "10px"
        
        dialog.appendChild(dialogHeader)

        console.log('request',request)
        let dialogContent = document.createElement('div')
        let list = document.createElement("ul")
        list.style.padding = "0"
        request.response.forEach((ele,ind) => {
            let para = document.createElement("p")
            para.textContent = ele.animeTitle
            para.style.color = "black"
            para.style.fontSize = "15px"
            para.style.margin = "0px"
            let listitem = document.createElement("li")
            listitem.style.color = "blue"
            listitem.style.fontSize = "1.6em"
            listitem.style.borderBottom = "3px solid blue";
            listitem.style.padding = "0.6em 0 1em 0";
            listitem.append(para)
            list.appendChild(listitem)
        });

        dialogContent.style.maxHeight = "21em"
        dialogContent.style.overflowY = "scroll"
        dialogContent.style.padding = "20px"
        dialogContent.appendChild(list)
        dialog.appendChild(dialogContent)

        
        body.appendChild(dialog);
    
        

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

