//Hello
var db
var readOp
var gwt
var index
var choice

chrome.runtime.onInstalled.addListener(() => {
  firstTimeSetup()
  chrome.storage.sync.set({'index':'2'});
  chrome.storage.sync.set({'choice':'all'})
  chrome.storage.sync.set({'code':[1,1,1,1]})

  chrome.runtime.openOptionsPage();

});



function firstTimeSetup(){

  const gwUrl = chrome.runtime.getURL('data/finalWords10.json')

  let openReq = self.indexedDB.open("GREWords",2)

  openReq.onupgradeneeded = function(event){
    
    oldVersion = event.oldVersion

    if(oldVersion == 0){

      console.log("Previous DB not detected, creating new DB and Object Store")
      
      db = openReq.result
      let GREWords = db.createObjectStore("GREWords",{keyPath:'word1'})

      // GREWords.createIndex('Ind1',['word1','L0','L1','L2','L3'],{unique:false})
      // GREWords.createIndex('Ind2',['word2','L0','L1','L2','L3'],{unique:false})
      // GREWords.createIndex('Ind3',['word3','L0','L1','L2','L3'],{unique:false})
      // GREWords.createIndex('Ind4',['word4','L0','L1','L2','L3'],{unique:false})
      
      GREWords.createIndex("01",['word1',"L0","L1","L2","L3"],{unique:false})
      GREWords.createIndex("02",['word2',"L0","L1","L2","L3"],{unique:false})
      GREWords.createIndex("03",['word3',"L0","L1","L2","L3"],{unique:false})
      GREWords.createIndex("04",['word4',"L0","L1","L2","L3"],{unique:false})

      GREWords.createIndex("11",['word1',"L1","L2","L3","L0"],{unique:false})
      GREWords.createIndex("12",['word2',"L1","L2","L3","L0"],{unique:false})
      GREWords.createIndex("13",['word3',"L1","L2","L3","L0"],{unique:false})
      GREWords.createIndex("14",['word4',"L1","L2","L3","L0"],{unique:false})
      
      GREWords.createIndex("21",['word1',"L2","L3","L0","L1"],{unique:false})
      GREWords.createIndex("22",['word2',"L2","L3","L0","L1"],{unique:false})
      GREWords.createIndex("23",['word3',"L2","L3","L0","L1"],{unique:false})
      GREWords.createIndex("24",['word4',"L2","L3","L0","L1"],{unique:false})

      GREWords.createIndex("31",['word1',"L3","L0","L1","L2"],{unique:false})
      GREWords.createIndex("32",['word2',"L3","L0","L1","L2"],{unique:false})
      GREWords.createIndex("33",['word3',"L3","L0","L1","L2"],{unique:false})
      GREWords.createIndex("34",['word4',"L3","L0","L1","L2"],{unique:false})

      console.log("Created Indexes")

      GREWords.transaction.oncomplete = function(){

        fetch(gwUrl)
        .then(response => response.json())
        .then(words => { 

          let insertOp = db.transaction("GREWords",'readwrite')
          let gwt = insertOp.objectStore("GREWords")
    
          words.forEach(element => {
            let req = gwt.add(element)

            req.onsuccess = function(){
              console.log('added a word: ' + req.result)
            }
            req.onerror = ()=>{
              console.log('Error in storing word: ' + element.word1 + "=>"  + req.error)
              return
            }
            
          });

          insertOp.oncomplete = function(){
            console.log("All The Words Inserted in DB")
          }

        })

      }

    }

    else if(oldVersion == 1){

      //db = openReq.result
      let GREWords = event.currentTarget.transaction.objectStore('GREWords')

      for(let index of GREWords.indexNames){
        GREWords.deleteIndex(index)
      }

      // GREWords.createIndex('Ind1',['word1','L0','L1','L2','L3'],{unique:false})
      // GREWords.createIndex('Ind2',['word2','L0','L1','L2','L3'],{unique:false})
      // GREWords.createIndex('Ind3',['word3','L0','L1','L2','L3'],{unique:false})
      // GREWords.createIndex('Ind4',['word4','L0','L1','L2','L3'],{unique:false})

      GREWords.createIndex("01",['word1',"L0","L1","L2","L3"],{unique:false})
      GREWords.createIndex("02",['word2',"L0","L1","L2","L3"],{unique:false})
      GREWords.createIndex("03",['word3',"L0","L1","L2","L3"],{unique:false})
      GREWords.createIndex("04",['word4',"L0","L1","L2","L3"],{unique:false})

      GREWords.createIndex("11",['word1',"L1","L2","L3","L0"],{unique:false})
      GREWords.createIndex("12",['word2',"L1","L2","L3","L0"],{unique:false})
      GREWords.createIndex("13",['word3',"L1","L2","L3","L0"],{unique:false})
      GREWords.createIndex("14",['word4',"L1","L2","L3","L0"],{unique:false})
      
      GREWords.createIndex("21",['word1',"L2","L3","L0","L1"],{unique:false})
      GREWords.createIndex("22",['word2',"L2","L3","L0","L1"],{unique:false})
      GREWords.createIndex("23",['word3',"L2","L3","L0","L1"],{unique:false})
      GREWords.createIndex("24",['word4',"L2","L3","L0","L1"],{unique:false})

      GREWords.createIndex("31",['word1',"L3","L0","L1","L2"],{unique:false})
      GREWords.createIndex("32",['word2',"L3","L0","L1","L2"],{unique:false})
      GREWords.createIndex("33",['word3',"L3","L0","L1","L2"],{unique:false})
      GREWords.createIndex("34",['word4',"L3","L0","L1","L2"],{unique:false})
      
      
      GREWords.transaction.oncomplete = function(){

        fetch(gwUrl)
        .then(response => response.json())
        .then(words => { 

          let insertOp = db.transaction("GREWords",'readwrite')
          let gwt = insertOp.objectStore("GREWords")
    
          words.forEach(element => {
            let req = gwt.put(element)

            req.onsuccess = function(){
              console.log('Updated a word: ' + req.result)
            }
            req.onerror = ()=>{
              console.log('Error in storing word: ' + element.word1 + "=>"  + req.error)
              return
            }
            
          });

          insertOp.oncomplete = function(){
            console.log("All The Words Inserted in DB")
          }

        })

      }

    }
  }

  openReq.onerror = function(){
    console.error(openReq.result)
  }


  openReq.onsuccess = function(){
    console.log("DB already created before, Searching Some Data")
    
    db = openReq.result

    let readOp = db.transaction("GREWords",'readwrite')
    let gwt = readOp.objectStore("GREWords")
    let index = gwt.index("01")

    let keyRange = IDBKeyRange.bound(['default',0,0,0,0],['default',1,1,1,1]);
    let request = index.get(keyRange)

    request.onsuccess = function(){
      if(request.result != null){
        console.log(request.result);
      }
      else{
        console.log('cant')
      }
    }
  
  }

}


function listStorage(){
  return new Promise(resolve=>{
    chrome.storage.sync.get(['index','choice'],result=>{
      //console.log("Retrived Chosen List " +  result.list)
      resolve(result)
    });
  });
}



chrome.commands.onCommand.addListener(function(command){

  console.log("Some Command Encountered");

  switch(command){

    case 'open-options':
      chrome.runtime.openOptionsPage();
      break;

    case 'start-highlighting':
      
      console.log("Injecting Content Script");
      (async ()=>{
        ic = await listStorage().catch(err=>console.log(err));
        indices = ic.index.split(',') 
        db = await reOpenDB().catch(err=>console.log(err));
      })();
      const query = { active: true, currentWindow: true };
      chrome.tabs.query(query, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content_script.js']
        });
      });

      break;

    default:
      break;
  }

});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  (async()=>{
    
    if(db === undefined){
      db = await reOpenDB().catch(err=>{console.log(err)})
    }
    if(indices === undefined){
      ic = await listStorage().catch(err=>console.log(err));
      let indices = ic.index.split(',')
    }
    let object = null

    for(let index of indices){
      object = await find(request.word.toLowerCase(),index,ic.choice).catch(err=>console.log(err))
      if(object != null){
        sendResponse({word:request.word,result:true,rword:object.word1,type:object.type,from:object.from,meaning:object.meaning});
      }  
    }
    sendResponse({word:request.word,result:false});

    // let object = await find(request.word.toLowerCase(),ic.index,ic.choice).catch(err=>console.log(err))
    // if(object != null){
    //   sendResponse({word:request.word,result:true,rword:object.word1,type:object.type,from:object.from});
    // }
    // sendResponse({word:request.word,result:false});

  })();
  return true;  
});
    

function find(word,ind,choice){
  return new Promise(resolve=>{

    readOp = db.transaction("GREWords",'readonly');
    gwt = readOp.objectStore("GREWords");
    index1 = gwt.index(ind+1)
    index2 = gwt.index(ind+2)
    index3 = gwt.index(ind+3)
    index4 = gwt.index(ind+4)
    let keyRange

    if(choice === 'all'){
      keyRange = IDBKeyRange.bound([word,0,0,0,0],[word,1,1,1,1]);
    }
    else if (choice === 'three'){
      keyRange = IDBKeyRange.bound([word,0,0,0,1],[word,1,1,1,1],true,false);
    }
    else if(choice === 'two'){
      keyRange = IDBKeyRange.bound([word,1,0,0,0],[word,1,1,1,1]);
    }
    else{
      keyRange = IDBKeyRange.bound([word,1,0,0,0],[word,1,1,1,0])
    }

    parallel(word,keyRange,index1,index2,index3,index4,function(object){
      resolve(object)
    })
    
  });
}


function parallel(word,keyRange,index1,index2,index3,index4,onfinish){
  let resolved = 0
  let found = null
  let req1 = index1.get(keyRange)
  let req2 = index2.get(keyRange)
  let req3 = index3.get(keyRange)
  let req4 = index4.get(keyRange)

  function complete(){
    if(++resolved === 4){
      onfinish(found)
    }
  }

  req1.onsuccess = () =>{
    if(req1.result != null){
      console.log("Found Gre Word: " + word + " Index: " + index1)     
      found = req1.result 
    }
    complete()
  }

  req2.onsuccess = () =>{
    if(req2.result != null){
      console.log("Found Gre Word: " + word + " Index: " + index2)  
      found = req2.result      
    }
    complete()
  }

  req3.onsuccess = () =>{
    if(req3.result != null){
      console.log("Found Gre Word: " + word + " Index: " + index3)
      found = req3.result
    }
    complete()
  }

  req4.onsuccess = () =>{
    if(req4.result != null){
      console.log("Found Gre Word: " + word + " Index: " + index4)     
      found = req4.result     
    }
    complete()
  }

}


function reOpenDB(){
  return new Promise(resolve=>{
    console.log("ReOpening DB");
    let openReq = self.indexedDB.open("GREWords",2)
    openReq.onupgradeneeded = () =>{}
    openReq.onerror = () =>{}
    openReq.onsuccess = () =>{
      db = openReq.result
      resolve(db)
    }
  })
}


