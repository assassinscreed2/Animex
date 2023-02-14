const latestButton = document.getElementById("invokebutton")
const airingbutton = document.getElementById("airingbutton")
const popularbutton = document.getElementById("popularbutton")
const loading = document.getElementById("loading")

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

    console.log("blickd")
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