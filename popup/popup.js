const latestButton = document.getElementById("invokebutton")
const airingbutton = document.getElementById("airingbutton")
const popularbutton = document.getElementById("popularbutton")
const loading = document.getElementById("loading")
const textInput = document.getElementById("searchbar")
const searchbutton = document.getElementById("searchbutton")
const invalidSearchDiv = document.getElementById("noworderror")

latestButton.addEventListener("click",async ()=>{
    loading.style.display = "block"

    console.log("blickd")
    const data = await fetch('https://gogoanime.consumet.stream/recent-release',{
        method:"GET",
        headers:{
            'X-RapidAPI-Key': '2f29f442ccmshbfca029a7fa434dp180a15jsn270ca0d138c5',
		    'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
        }
    })
    
    const response = await data.json()

    const [tab] = await chrome.tabs.query({active:true, currentWindow: true})
    const dataToSend = {buttonColor:getComputedStyle(latestButton).backgroundColor,
        buttonName:"Latest Episodes",response:response}
    const res = await chrome.tabs.sendMessage(tab.id,dataToSend)
    loading.style.display = "none"
    console.log(res)
    console.log(response)
})

airingbutton.addEventListener("click",async ()=>{
    loading.style.display = "block"

    const data = await fetch('https://gogoanime.consumet.stream/top-airing',{
        method:"GET",
        headers:{
            'X-RapidAPI-Key': '2f29f442ccmshbfca029a7fa434dp180a15jsn270ca0d138c5',
		    'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
        }
    })
    
    const response = await data.json()
    const [tab] = await chrome.tabs.query({active:true, currentWindow: true})
    const dataToSend = {buttonColor:getComputedStyle(airingbutton).backgroundColor,
    buttonName:"Top Airing",response:response}
    const res = await chrome.tabs.sendMessage(tab.id,dataToSend)
    loading.style.display = "none"
})

popularbutton.addEventListener("click",async ()=>{
    loading.style.display = "block"

    const data = await fetch('https://gogoanime.consumet.stream/popular',{
        method:"GET",
        headers:{
            'X-RapidAPI-Key': '2f29f442ccmshbfca029a7fa434dp180a15jsn270ca0d138c5',
		    'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
        }
    })
    
    const response = await data.json()

    const [tab] = await chrome.tabs.query({active:true, currentWindow: true})
    const dataToSend = {buttonColor:getComputedStyle(popularbutton).backgroundColor,
        buttonName:"Popular Anime",response:response}
    const res = await chrome.tabs.sendMessage(tab.id,dataToSend)
    loading.style.display = "none"
    console.log(res)
    console.log(response)
})

searchbutton.addEventListener('click',async () => {
    const animeName = textInput.value
    console.log(animeName)
    if(animeName.length === 0 || animeName.length >= 200){
        invalidSearchDiv.style.display = "block"
        setTimeout(()=>{
            invalidSearchDiv.style.display = "none"
        },2000)
    }else{
        loading.style.display = "block"
        const animeDetails = await fetch(`https://gogoanime.consumet.stream/search?keyw=${animeName}`)
        const animeData = await animeDetails.json()
        if(animeData.length === 0){
            loading.style.display = "none"
            invalidSearchDiv.style.display = "block"
            setTimeout(()=>{
                invalidSearchDiv.style.display = "none"
            },2000)
        }else{
            const [tab] = await chrome.tabs.query({currentWindow: true, active: true})
            const dataToSend = {
                response:animeData,
                buttonColor:"#3C79F5",buttonName:"Animex"
            }
            const res = await chrome.tabs.sendMessage(tab.id,dataToSend)
            loading.style.display = "none"
            console.log(res)
        }

        console.log(animeData)

    }
})