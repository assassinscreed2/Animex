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
        //dialog.style.maxWidth = "30em"
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
            imageDiv.style.width = "6em"
            imageDiv.style.height = "7em"

            // parent div for containing anime title and sub para
            let paraDiv = document.createElement("div")
            paraDiv.style.width = "15em"
            paraDiv.style.marginLeft = "2em"
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
            listitem.style.borderBottom = `3px solid ${request.buttonColor}`
            listitem.style.padding = "0.6em 0 1em 0"

            let subtitle = document.createElement("p")
            subtitle.textContent = request.buttonName === "Latest Episodes"?`Episode : ${ele.episodeNum}`:
                                request.buttonName === "Top Airing"?ele.latestEp:
                                request.buttonName === "Animex"?`${ele.status}`:`Release Date : ${ele.releasedDate}`
            subtitle.style.margin = "7px 0px 0px 7px"
            subtitle.style.color = "black"

            // button for perticular anime search
            const readMoreButton = document.createElement("button")
            readMoreButton.textContent = "Read More"
            readMoreButton.style.fontSize = "0.8em"
            readMoreButton.id = ele.animeId
            readMoreButton.style.color = "#3C79F5"
            readMoreButton.style.borderRadius = "10%"
            readMoreButton.style.border = "2px solid #3C79F5"
            readMoreButton.style.width = "8em"
            readMoreButton.style.height = "2em"
            readMoreButton.style.margin = "1em 0 0 0.8em"
            readMoreButton.style.backgroundColor = "white"

            readMoreButton.addEventListener('click',async ()=>{
                console.log("clicked",readMoreButton)
                
                list.style.display = "none"
                let loading = document.createElement("p")
                loading.textContent = "Loading ..."
                loading.style.fontSize = "3rem"
                loading.style.color = `${request.buttonColor}`
                loading.style.margin = "1em 0 0 1em"
                dialogContent.appendChild(loading)
                console.log(readMoreButton.id)
                const animeResponse = await fetch(`https://gogoanime.consumet.stream/anime-details/${readMoreButton.id}`)
                const animeData = await animeResponse.json()

                // div for perticular anime
                const parentDiv = document.createElement("div")
                parentDiv.display = "flex"
                parentDiv.flexDirection = "column"

                let backButton = document.createElement("button")
                backButton.textContent = "Back"
                backButton.style.fontSize = "1.4rem"
                backButton.style.color = "#3C79F5"
                backButton.style.borderRadius = "5%"
                backButton.style.border = "2px solid #3C79F5"
                backButton.style.width = "100%"
                backButton.style.height = "3em"
                backButton.style.margin = "2em 0 0 0"
                backButton.style.backgroundColor = "white"

                backButton.addEventListener('click',()=>{
                    list.style.display = "block"
                    parentDiv.style.display = "none"
                })
                

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
                parDiv.style.width = "15em"
                parDiv.style.height = "17em"
                parDiv.style.display = "flex"
                parDiv.style.flexDirection = "column"
                parDiv.style.alignContent = "space-around"
    
                // anime name para
                let animeTitle = document.createElement("p")
                animeTitle.textContent = animeData.animeTitle
                animeTitle.style.color = "black"
                animeTitle.style.fontSize = "1.7rem"
                animeTitle.style.fontWeight = "600"
                animeTitle.style.margin = "0px 0px 0px 2em"

                parDiv.appendChild(animeTitle)

                parentDivLevel1.appendChild(imgDiv)
                parentDivLevel1.appendChild(parDiv)
                parentDivLevel1.style.width = "25em"
                parentDivLevel1.style.height = "20em"

                // anime episodes
                let episodes = document.createElement("p")
                episodes.innerHTML = `<span style="font-weight: 600;">Total Episodes</span>: ${animeData.totalEpisodes}`
                episodes.style.color = "black"
                episodes.style.margin = "0.5em 0em 0em 0em"
                episodes.style.fontSize = "1rem"

                // Anime Status
                let animeStatus = document.createElement("p")
                animeStatus.style.margin = "0.5em 0em 0em 0em"
                animeStatus.style.color = "black"
                animeStatus.style.fontSize = "1rem"
                animeStatus.innerHTML = `<span style="font-weight: 600;">Current Status</span>: ${animeData.status}`

                // anime Description

                const animeDescription = document.createElement("p")
                animeDescription.style.fontSize = "1rem"
                animeDescription.style.maxWidth = "25em"
                animeDescription.style.color = "black"
                animeDescription.style.margin = "0.5em 0em 0em 0em"
                animeDescription.innerHTML = `<span style="font-weight: 600;">Description</span>: ${animeData.synopsis}`
                
                parentDiv.appendChild(parentDivLevel1)
                parentDiv.appendChild(episodes)
                parentDiv.appendChild(animeStatus)
                parentDiv.appendChild(animeDescription)
                parentDiv.appendChild(backButton)

                loading.style.display = "none"
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