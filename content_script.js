try{


   $("body").append('<div id="grebhavesnackbar">Scanning For GRE words, this may take a while..</div>')

   $('p,h1,h2,h3,h4,h5,h6,span,li').each(async function(){
      
      if($(this).has('p').length > 0){
         return
      }

      let mts = $(this).text().match(/[A-Za-z]+/g)
      
      if(mts != null){
         
         let block = mts.join(' ')
         
         let hits = []
         let words = block.split(" ")

         
         for(let i = 0; i<words.length; i++){
            let obj = await bulava(words[i])
            if(obj!=null){
               hits.push(obj)
            }
         }

         if(hits.length > 0){
               
            hits.forEach(obj=>{
               let query = 'https://www.google.com/search?q=define+' + obj.rword
                  
               let newhtml = `<div class="grebhave">
                                 <a href=${query} target="blank" style="color:inherit;background-color:yellow;text-decoration:none">$&</a>
                                 <div class="grebhavetext">
                                    <div style="text-align:center;font-size:15px;padding:2px">
                                       <strong>${obj.rword}</strong><i style="font-size:12px;margin-left:5px">${obj.type}</i>
                                    </div>
                                    <div style="text-align:center;font-size:13px;padding:2px">${obj.from}</div>
                                 </div>
                              </div>`               
               let content = $(this).html().replace(
                  new RegExp('(?<!<[^>]*)[^<>]+(?!(>)|([^<]*<\/strong>)|([^<]*<\/a>))','g'),
                  str=>replaceActual(str,obj.word,newhtml)
               )      
               $(this).html(content)               
            })
         }
      }
      
   });

   var x = document.getElementById("grebhavesnackbar");
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);

}

catch(err){
   
}

function replaceActual(string,word,newhtml){
   return string.replace(new RegExp(`${word}`,'gi'),newhtml)
}


function bulava(word){
   return new Promise(resolve=>{
      chrome.runtime.sendMessage({word: word}, function(response) {
      
         if(response.result){
            resolve(response)   
         }
         else{
            resolve(null)
         }
      });
   });
}
