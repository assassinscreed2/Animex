const button = document.getElementById("invokebutton")
console.log(button)

button.addEventListener("click",async ()=>{
    console.log("blickd")
    const data = await fetch('https://gogoanime2.p.rapidapi.com/recent-release?type=1&page=1',{
        method:"GET",
        headers:{
            'X-RapidAPI-Key': '2f29f442ccmshbfca029a7fa434dp180a15jsn270ca0d138c5',
		    'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
        }
    })
    
    const response = await data.json()

    const [tab] = await chrome.tabs.query({active:true, currentWindow: true})
    console.log(tab)
    const res = await chrome.tabs.sendMessage(tab.id,{response})
    console.log(res)
    console.log(response)
})