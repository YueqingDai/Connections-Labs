window.addEventListener("load",() => {
  let msgButton = document.getElementById("msg-submit");
  msgButton.addEventListener("click", () => {
    let msgText = document.getElementById("msg-input").value;
    let idtext = document.getElementById("id-input").value;
    //console.log(msgText);
    
    
    
    
    //send the msgText to the server
    let msgObj = {
      "Userid" : idtext,
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

  document.getElementById('ins_show').addEventListener('click',()=>{
    fetch('/getmessage')
    .then(resp => resp.json())
    .then(daty => {
      console.log(daty.inspiration);
      document.getElementById('msginfo').innerHTML = '';
      for(let i=0;i<daty.inspiration.length; i++){
        let string = daty.inspiration[i].date + daty.inspiration[i].msg;
        let elt = document.createElement('p');
        elt.innerHTML=string;
        document.getElementById('msginfo').appendChild(elt);
      }
    })
  })

})
