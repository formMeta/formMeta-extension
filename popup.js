document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('input-container');
    const Limit_response =  document.getElementById('Limit-response');

    
    const shuffle =  document.getElementById('Shuffle');
    const tabSwitch =  document.getElementById('tabSwitch');
    const emailDomain_ch =  document.getElementById('emailDomain_ch');



    
    

    shuffle.addEventListener('change', () => {
      if (shuffle.checked) {
        document.getElementById('labelFor').innerHTML+='<small style="color: #e94d00;"><div>The question does not need </div> <div>to  be shuffled like the first four.</div> </small>'
        document.getElementById('shuffleLen').style.display = 'block';
      } else {
        document.getElementById('labelFor').innerHTML='Shuffle question order'
        document.getElementById('shuffleLen').style.display ='none';
      }
    });

    tabSwitch.addEventListener('change', () => {
        document.getElementById('tabSwitch_ip').style.display = tabSwitch.checked?'block':'none';
    });

    emailDomain_ch.addEventListener('change', () => {
        document.getElementById('emailDomain').style.display = emailDomain_ch.checked?'block':'none';
    });

  const button = document.getElementById('button');
  const content = document.querySelector('#content');

  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  button.addEventListener('click', async() => {
    let tab = await getCurrentTab();
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['background.js']
    }, (result) => {
      if(result[0]['result'][0]=='Error'){
        console.log(result[0]['result'][1]);
        document.getElementById('errors').innerHTML=result[0]['result'][1];
        return;

      }
    var errorDisplay = document.getElementById('errors');
    const heading = document.getElementById('heading').value;
    const Limit_response =  document.getElementById('Limit-response');
    const tabSwitch =  document.getElementById('tabSwitch');
    const shuffle =  document.getElementById('Shuffle');
    const emailDomain_ch =  document.getElementById('emailDomain_ch');
      var t=false;
      var index;
      if(heading===''){
        errorDisplay.innerHTML='Heading need to Enter';
        return;
      }
     if(emailDomain_ch.checked){
      var eD = document.getElementById('emailDomain').value;
      if(eD==''){errorDisplay.innerHTML='The domain not be Empty';return;}
     }
      if (tabSwitch.checked) {
      t=true;
      var r = result[0]['result'][1]
      console.log(r);
      const inputField = document.getElementById('tabSwitch_ip');
        const inputValue = inputField.value;
        if(inputValue===''){ errorDisplay.innerHTML='Invalid input';return;}
        let found = false;
        for (let i = 1; i < r.length; i++) {
          console.log(r[i][1]);
          if (r[i][1] === inputValue) {
            found = true;
            index = i-1;
            r.splice(i,1);
            break;
          }
        }
        if (!found) {
          errorDisplay.innerHTML=`Did not find <b>${inputValue}</b> in the form`;
          return;
        } 
          
        
      }
      var v = result[0]['result'][2];
      if(t){
        var tabCount = v[index];
        v.splice(index,1)}
      console.log(v,index);
      const element = document.getElementById("button");
      element.remove();
      const questionArray = t==true?r:result[0]['result'][1];
      const nameArray = v;
      var htmlForTab = `<script>const Rtabc = document.createElement('input');Rtabc.type = 'hidden';Rtabc.name = '${tabCount}';Rtabc.value = 0;Rtabc.id = 'R_tab';const form = document.querySelector('form');form.append(Rtabc);</script>`
      // Create a Blob object with the content of the file 
       
      const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" ></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js" ></script>
        <link rel="icon" type="image/x-icon" href="https://formmeta.github.io/generateform/formMeta_logo_website.ico">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">

        <script src="https://formmeta.github.io/generateform/generateform.js"></script>
        <link rel="stylesheet" href="https://formmeta.github.io/generateform/formMeta_style.css">     
        ${t==true?'<script src="https://formmeta.github.io/generateform/tab_monitor.js"></script>':''}
        <title>${heading}</title>

        </head>
        <body onload="checkCookie()">
            <center>
                <h1>${heading}</h1>
            </center>
            <div id="myDiv" class="enabled"></div>
            <div class="iframePopup">
            <h2 style="color: red;">&#10071; Click ok to continue &#10071;</h2>
            <iframe frameborder="0" name="formview"></iframe>
            <a onclick='setCookie("isCompleted", "completed", 30);window.open("https:\/\/formmeta.github.io/generateform/thankyou.html","_self");'>oK</a>
        </div>
            <script>
                const question_array = ${JSON.stringify(questionArray)};
                const name_array = ${JSON.stringify(nameArray)};
                generateForm({inputArray: question_array,nameArray: name_array ,emailDomain: '${emailDomain_ch.checked?eD:'Null'}', limitResponse: ${Limit_response.checked?'true':'false'},shuffle : [${shuffle.checked},${parseInt(document.getElementById('shuffleLen').value)}]});  
            </script>
            ${t==true?htmlForTab:''}
        </body>
        </html>
      `;
      const blob = new Blob([content], { type: 'text/html' });
  
      // Create an anchor element and set its href attribute to the URL of the Blob object
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'index.html';
  
      // Append the anchor element to the document and simulate a click on it to trigger the download
      document.body.appendChild(a);
      a.click();
  
      // Remove the anchor element from the document
      a.remove();
    });
  });

});
