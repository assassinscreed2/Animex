let dialog;
let body = document.getElementsByTagName("body")[0];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        
        // outer dialog box
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
        
        // Dialog Header
        let dialogHeader = document.createElement('div')
        dialogHeader.textContent = request.buttonName
        dialogHeader.style.backgroundColor = request.buttonColor
        dialogHeader.style.color = "white"
        dialogHeader.style.padding = "10px"
        dialogHeader.style.fontSize = "20px"
        dialogHeader.style.textAlign = "center"
        dialogHeader.style.borderTopLeftRadius = "10px"
        dialogHeader.style.borderTopRightRadius = "10px"
        
        // Appending Dialog Header into dialog box
        dialog.appendChild(dialogHeader)
        console.log('request',request)

        // Dialog Content
        let dialogContent = document.createElement('div')

        // list of animes inside dialog content
        let list = document.createElement("ul")
        list.style.padding = "0"
        list.style.paddingLeft = "0.1em"
        list.style.listStyleType = "none"

        // creating each anime entry inside the list by traversing on response
        request.response.forEach((ele,ind) => {
            // extracting image and creaing image tag
            let animeImage = ele.animeImg;
            animeImage = animeImage.replace("https://gogocdn.net","https://cdnimg.xyz")
            let imageDiv = document.createElement("img")
            imageDiv.src = animeImage
            imageDiv.style.width = "5em"
            imageDiv.style.height = "6em"

            // parent div for containing anime title and sub para
            let paraDiv = document.createElement("div")
            paraDiv.style.width = "15em"
            paraDiv.style.minHeight = "5em"
            paraDiv.style.display = "flex"
            paraDiv.style.flexDirection = "column"
            paraDiv.style.alignContent = "space-around"

            // anime name para
            let para = document.createElement("p")
            para.textContent = ele.animeTitle
            para.style.color = "black"
            para.style.fontSize = "17px"
            para.style.fontWeight = "600"
            para.style.margin = "0px 0px 0px 7px"
            
            // creating list entry for each anime
            let listitem = document.createElement("li")
            listitem.style.display = "flex"
            listitem.style.color = "blue"
            listitem.style.fontSize = "1em"
            listitem.style.borderBottom = "3px solid blue";
            listitem.style.padding = "0.6em 0 1em 0";
            

            let subtitle = document.createElement("p")
            subtitle.textContent = request.buttonName === "Latest Episodes"?`Episode : ${ele.episodeNum}`:
                                request.buttonName === "Top Airing"?ele.latestEp:
                                request.buttonName === "Animex"?`${ele.status}`:`Release Date : ${ele.releasedDate}`
            subtitle.style.margin = "5px 0px 0px 7px"

            // button for perticular anime search
            const readMoreButton = document.createElement("button")
            readMoreButton.textContent = "Read More"
            readMoreButton.id = ele.animeId
            readMoreButton.style.backgroundColor = "red"

            readMoreButton.addEventListener('click',async ()=>{
                console.log("clicked",readMoreButton)
                
                list.style.display = "none"
                let loading = document.createElement("p")
                loading.textContent = "Loading ..."
                dialogContent.appendChild(loading)
                console.log(readMoreButton.id)
                const animeResponse = await fetch(`https://gogoanime.consumet.stream/anime-details/${readMoreButton.id}`)
                const animeData = await animeResponse.json()

                // div for perticular anime
                const parentDiv = document.createElement("div")
                parentDiv.display = "flex"
                parentDiv.flexDirection = "column"

                const animeHeaderDiv = document.createElement("div")
                animeHeaderDiv.display = "flex"
                
                let imgDiv = document.createElement("img")
                let aniImageUrl = animeData.animeImg;
                aniImage = aniImageUrl.replace("https://gogocdn.net","https://cdnimg.xyz")
                imgDiv = document.createElement("img")
                imgDiv.src = aniImage
                imgDiv.style.width = "12em"
                imgDiv.style.height = "17em"

                let parentDivLevel1 = document.createElement("div")
                parentDivLevel1.style.display = "flex"
    
                // parent div for containing Perticular anime title and sub para
                let parDiv = document.createElement("div")
                parDiv.style.maxWidth = "15em"
                parDiv.style.minHeight = "5em"
                parDiv.style.display = "flex"
                parDiv.style.flexDirection = "column"
                parDiv.style.alignContent = "space-around"
    
                // anime name para
                let animeTitle = document.createElement("p")
                animeTitle.textContent = animeData.animeTitle
                animeTitle.style.color = "black"
                animeTitle.style.fontSize = "17px"
                animeTitle.style.fontWeight = "600"
                animeTitle.style.margin = "0px 0px 0px 7px"

                // anime episodes
                let episodes = document.createElement("p")
                episodes.textContent = `${animeData.totalEpisodes}`
                episodes.style.margin = "5px 0px 0px 7px"

                parDiv.appendChild(animeTitle)
                parDiv.appendChild(episodes)

                parentDivLevel1.appendChild(imgDiv)
                parentDivLevel1.appendChild(parDiv)
                parentDivLevel1.style.width = "25em"
                parentDivLevel1.style.height = "30em"

                // anime Description
                const animeDescription = document.createElement("p")
                animeDescription.style.minWidth = "20em"
                animeDescription.textContent = animeData.synopsis
                
                loading.style.display = "none"
                parentDiv.appendChild(parentDivLevel1)
                parentDiv.appendChild(animeDescription)
                dialogContent.appendChild(parentDiv)
                console.log(animeData) 
            })

            // inserting para nad sub para inside parent div
            paraDiv.appendChild(para)
            paraDiv.appendChild(subtitle)
            if(request.buttonName === "Animex"){
                paraDiv.appendChild(readMoreButton)
            }

            listitem.appendChild(imageDiv)
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