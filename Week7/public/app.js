window.addEventListener("load",() => {
  let msgButton = document.getElementById("msg-submit");
  msgButton.addEventListener("click", () => {
    let msgText = document.getElementById("msg-input").value;
    let idtext = document.getElementById("id-input").value;
    if(msgText == "" || idtext == ""){
      alert("missing input:  topic and/or Inspiration missed");
    }else{
      alert("inspiration submitted");
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
      }
  })

  document.getElementById('ins_show').addEventListener('click',()=>{
    let nowMon = parseInt(document.getElementById("chooseMonth").value);
    let idtext = document.getElementById("id-output").value;
    if(idtext == ""){
      alert("missing input:  topic missed");
    }else{

      fetch('/getmessage')
      .then(resp => resp.json())
      .then(daty => {
        console.log(daty.inspiration);
        document.getElementById('msginfo').innerHTML = '';
        let SameMonth = [];
        let SameTopic = [];
        for(let i=0;i<daty.inspiration.length; i++){
          if(daty.inspiration[i].month == nowMon){
            SameMonth.push(daty.inspiration[i]);
          }
        }
        console.log("samemonth");
        console.log(SameMonth);
        if(SameMonth.length == 0){
          alert("No inspiration this month");
        }else{
          for(let i=0; i<SameMonth.length; i++){
            if(SameMonth[i].userid == idtext){
              SameTopic.push(SameMonth[i]);
            }
          }
  
          console.log("sametopic");
          console.log(SameTopic);
          if(SameTopic.length == 0){
            alert("No Same topic this month");
          }else{
            for(let i=0; i<SameTopic.length; i++){
              let string = SameTopic[i].date + SameTopic[i].msg;
              let elt = document.createElement('p');
              elt.innerHTML=string;
              document.getElementById('msginfo').appendChild(elt);
            }
            
          }
  
        }
        
      })

    }

  })

})
