document.addEventListener('DOMContentLoaded', () => {
   const toggleBtn = document.getElementById('toggle-btn');
    const inputContainer = document.getElementById('input-container');
    const inputField = document.getElementById('tab-question');

    toggleBtn.addEventListener('change', () => {
      if (toggleBtn.checked) {
        inputContainer.style.display = 'block';
      } else {
        inputContainer.style.display = 'none';
        inputField.value = '';
      }
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
      
      var t=false;
      var index;
      const toggleBtn = document.getElementById('toggle-btn');
      if (toggleBtn.checked) {
      t=true;
      var r = result[0]['result'][0]
      console.log(r);
      const inputField = document.getElementById('tab-question');
        const inputValue = inputField.value;
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
alert(`Did not find ${searchValue} in the form`);
          return;
        } 
          
        
      }
      var v = result[0]['result'][1];
      if(t){
        var tabCount = v[index];
        v.splice(index,1)}
      console.log(v,index);
      const element = document.getElementById("button");
      element.remove();
      const questionArray = t==true?r:result[0]['result'][0];
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
            <link rel="stylesheet" href="https://formmeta.github.io/generateform/formMeta_style.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="https://formmeta.github.io/generateform/generateform.js"></script>
            ${t==true?'<script src="https://formmeta.github.io/generateform/tab_monitor.js"></script>':''}
            <title>FormMeta</title>

        </head>
        <body>
            <center>
                <h1>formMeta</h1>
            </center>
            <div id="myDiv" class="enabled"></div>
            <script>
                const question_array = ${JSON.stringify(questionArray)};
                const name_array = ${JSON.stringify(nameArray)};
                generateForm(question_array, name_array);  
            </script>
            ${t==true?htmlForTab:''}
        </body>
        </html>
      `;
      const blob = new Blob([content], { type: 'text/html' });
  
      // Create an anchor element and set its href attribute to the URL of the Blob object
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'formMeta.html';
  
      // Append the anchor element to the document and simulate a click on it to trigger the download
      document.body.appendChild(a);
      a.click();
  
      // Remove the anchor element from the document
      a.remove();
    });
  });

});
