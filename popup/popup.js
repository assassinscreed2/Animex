const button = document.getElementById("invokebutton")
const shownplace = document.getElementById("information")

button.addEventListener("click",async ()=>{
    shownplace.textContent = "Loading...."
    const data = await fetch('https://gogoanime2.p.rapidapi.com/recent-release?type=1&page=1',{
        method:"GET",
        headers:{
            'X-RapidAPI-Key': '2f29f442ccmshbfca029a7fa434dp180a15jsn270ca0d138c5',
		    'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
        }
    })
    
    const response = await data.json()

    shownplace.textContent = response
    const [tab] = await chrome.tabs.query({active:true, currentWindow: true})
    console.log(tab)
    const res = await chrome.tabs.sendMessage(tab.id,{response})
    console.log(res)
    console.log(response)
})