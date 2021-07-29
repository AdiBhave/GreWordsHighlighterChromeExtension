let page = document.getElementById("buttonDiv");
const max = 3
var count

const cbs = document.querySelectorAll('input[name="choice"]');
const sAll = document.getElementById("cAll");
const button = document.getElementById("btn")
const errT = document.getElementById('errT')
//errT.style.color  = 'red'
errT.style.visibility = 'hidden'
const warning = 'Please Select Atleast One Option'

chrome.storage.sync.get("code",(data)=>{
  let choice = data.code
  console.log(choice)

  for(let i = 0; i < cbs.length; i++){
    if(choice[i] == 1)cbs[i].checked = true
  }
  uiChange()

});


function uiChange(){
  errT.style.visibility = "hidden"
  count = 0
  for(let cb of cbs){
     if(cb.checked){
       count += 1
     }
     if(count === max)sAll.checked = true
     else sAll.checked = false
  }
}

$('input[name="choice"]').click(()=>{
  uiChange()
})


sAll.onclick = ()=>{
  errT.style.visibility = "hidden"
  for(let cb of cbs){
    cb.checked = sAll.checked
  }
}


button.onclick = () =>{
  
  if(!sanityCheck()){
    return
  }


  let selectedList = []
  for(let chosen of cbs){
    if(chosen.checked){
      selectedList.push(1)
    }
    else{
      selectedList.push(0)
    }
  }

  let index = processChoices(selectedList)
  
  let parts = index.split(':')
  console.log(index)
  chrome.storage.sync.set({'index':parts[0]});
  chrome.storage.sync.set({'choice':parts[1]})
  chrome.storage.sync.set({'code':selectedList})
  
  alert("Your Selection Is Saved")
  window.close()

}


function sanityCheck(){
  for(let cb of cbs){
    if(cb.checked){return true;}
  }
  errT.style.visibility = 'visible' 
  return false; 
}

function processChoices(digs){
  let disc = []
  let sc = []
  for(let i = 0; i< digs.length; i++){
    if(digs[i] == 0)disc.push(i)
    else sc.push(i)
  }

  if(disc.length == 0){
    return '1:all'
  }
  else if(disc.length == 1){
    return `${(disc[0]+1)%3}:two`
  }
  else{ 
   return `${sc[0]}:one` 
  }
  
}