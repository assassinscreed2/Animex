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
        dialog.style.minWidth = "28em"
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
        list.style.paddingLeft = "0.1em"
        list.style.listStyleType = "none"
        request.response.forEach((ele,ind) => {

            let animeImage = ele.animeImg;
            animeImage = animeImage.replace("https://gogocdn.net","https://cdnimg.xyz")

            let imageDiv = document.createElement("img")
            imageDiv.src = animeImage
            //imageDiv.style.backgroundSize = "contain"
            imageDiv.style.width = "5em"
            imageDiv.style.height = "6em"
            let para = document.createElement("p")
            para.textContent = ele.animeTitle
            para.style.color = "black"
            para.style.fontSize = "17px"
            para.style.fontWeight = "600"
            para.style.margin = "0px 0px 0px 7px"
            let listitem = document.createElement("li")
            listitem.appendChild(imageDiv)
            listitem.style.display = "flex"

            let divpara = document.createElement("p")
            divpara.textContent = request.buttonName === "Latest Episodes"?`Episode : ${ele.episodeNum}`:
                                request.buttonName === "Top Airing"?ele.latestEp:`Release Date : ${ele.releasedDate}`
            divpara.style.margin = "5px 0px 0px 7px"

            let paraDiv = document.createElement("div")
            paraDiv.style.width = "15em"
            paraDiv.style.minHeight = "5em"
            paraDiv.style.display = "flex"
            paraDiv.style.flexDirection = "column"
            paraDiv.style.alignContent = "space-around"
            paraDiv.appendChild(para)
            paraDiv.appendChild(divpara)

            listitem.style.color = "blue"
            listitem.style.fontSize = "1em"
            listitem.style.borderBottom = "3px solid blue";
            listitem.style.padding = "0.6em 0 1em 0";
            listitem.append(paraDiv)
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