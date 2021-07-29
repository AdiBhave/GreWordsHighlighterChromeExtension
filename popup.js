const options  = document.getElementById('btn')
const scan = document.getElementById('scan')
const cbs = document.querySelectorAll("img[name='tick']");
console.log(cbs)

for(let i =0; i<cbs.length; i++){
  cbs[i].style.visibility = 'hidden'
}

chrome.storage.sync.get("code",(data)=>{
  let choice = data.code
  for(let i = 0; i < cbs.length; i++){
    if(choice[i] == 1)cbs[i].style.visibility = 'visible'
  }
});



options.onclick = ()=>{
  chrome.runtime.openOptionsPage();
}

scan.onclick = ()=>{
  const query = { active: true, currentWindow: true };
      chrome.tabs.query(query, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content_script.js']
        });
      });
}
