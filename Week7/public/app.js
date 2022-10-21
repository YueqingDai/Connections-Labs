window.addEventListener("load",() => {
  let msgButton = document.getElementById("msg-submit");
  msgButton.addEventListener("click", () => {
    let msgText = document.getElementById("msg-input").value;
    
    //console.log(msgText);
    
    
    
    
    //send the msgText to the server
    let msgObj = {
      "msg" : msgText
    }
    let msgObjectJSON = JSON.stringify(msgObj)
    fetch('/message', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: msgObjectJSON
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              //console.log("data");
            })
    
  })

  document.getElementById('button1').addEventListener('click',()=>{
    fetch('/getmessage')
    .then(resp => resp.json())
    .then(daty => {
      console.log(daty.headerone);
      document.getElementById('msginfo').innerHTML = '';
      for(let i=0;i<daty.headerone.length; i++){
        let string = daty.headerone[i].date + daty.headerone[i].msg;
        let elt = document.createElement('p');
        elt.innerHTML=string;
        document.getElementById('msginfo').appendChild(elt);
      }
    })
  })

})
