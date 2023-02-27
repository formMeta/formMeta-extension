(() => {
  var main_array = [];
  var text_input_count = 0;
  var input_name_array = [];
  var text_input_name = [];
  var name_id = [];
  var question_array = [];
  var responseStatus = 'ok';
  var errorValue = ' ';


  const form = document.getElementsByTagName("form")[0];
  main_array.push(form.action);
  var B = form.getElementsByClassName("Qr7Oae");





  // Getting input value for text inputs
  var temp = form.querySelectorAll(' div[jsname="o6bZLc"] input');
  for (let input of temp) {
    text_input_name.push(input.name);
  }





  // checking whether need to collect email ar not
  if (
    form.querySelector('.o3Dpx div[role="listitem"] .M7eMe').innerHTML ===
    "Email"
  ) {
    question_array.push("email", "Email");
    name_id.push("emailAddress");
    main_array.push(question_array);
    question_array = [];
  }





  //  extracting question and input name
  for (var i = 0; i < B.length; i++) {
    question_array = [];






    // for text input
    if (B[i].getElementsByTagName("input").length>0 && B[i].getElementsByTagName("input")[0].type == "text") {
      question_array=[];
      question_array.push("text");
      question_array.push(B[i].getElementsByClassName("M7eMe")[0].innerHTML);
      main_array.push(question_array);
      question_array = [];
      name_id.push(text_input_name[text_input_count]);
      text_input_count += 1;
    }





    // for multiple choice input
    else if (B[i].getElementsByClassName("lLfZXe fnxRtf cNDBpf").length > 0) {
      if (
        B[i].getElementsByClassName("lLfZXe fnxRtf cNDBpf")[0].role ==
        "radiogroup"
      ) {
        question_array.push("radio");
        question_array.push(B[i].getElementsByClassName("M7eMe")[0].innerHTML);
        var options = B[i].getElementsByClassName(
          "aDTYNe snByac OvPDhc OIC90c"
        );
        // collecting options value
        var options_array = [];
        for (var j = 0; j < options.length; j++) {
          options_array.push(options[j].innerHTML);
        }
        question_array.push(options_array);
        main_array.push(question_array);
        options_array = [];
        question_array = [];
        // getting name value
        name_id.push(B[i].getElementsByTagName("input")[0].name.replace("_sentinel", ""));
      }
    }




    // check box
    else if (
      B[i].getElementsByClassName("aDTYNe snByac n5vBHf OIC90c").length > 0
    ) {
      question_array = [];
      question_array.push("checkbox");
      question_array.push(B[i].getElementsByClassName("M7eMe")[0].innerHTML);
      var checkValues_array = B[i].getElementsByClassName("aDTYNe snByac n5vBHf OIC90c");
      var checkValues = [];
      for (var j = 0; j < checkValues_array.length; j++) {
        checkValues.push(checkValues_array[j].innerHTML);
      }
      question_array.push(checkValues);
      main_array.push(question_array);
      question_array = [];
      checkValues = [];
      // getting name value
      name_id.push(
        (B[i].getElementsByTagName("input")[0].name.replace("_sentinel", ""))
      );
    }
    
    
    
    // for  long paragraph
    else if (B[i].querySelectorAll("textarea").length > 0) {
      question_array=[];
      question_array.push("textarea");
      question_array.push(B[i].getElementsByClassName("M7eMe")[0].innerHTML);
      main_array.push(question_array);
      question_array = [];
      name_id.push(text_input_name[text_input_count]);
      text_input_count += 1;
    }



    // dropdown 
    else if(B[i].querySelectorAll('.vRMGwf.oJeWuf').length>0){
      question_array=[];
      question_array.push("select");
      question_array.push(B[i].getElementsByClassName("M7eMe")[0].innerHTML);
      const elements = B[i].querySelectorAll('.MocG8c[data-value]');
      const optionsOfDropDown = [];
      for (let i = 1; i < elements.length; i++) {
        optionsOfDropDown.push(elements[i].getAttribute('data-value'));
      }
      question_array.push(optionsOfDropDown);
      main_array.push(question_array);
      question_array=[];
      name_id.push(text_input_name[text_input_count]);
      text_input_count += 1;
    }

  }

  if(document.getElementsByTagName('input')['token']){
    responseStatus='Error';
    errorValue= 'Disable the <b>Limit to 1 response</b>'
  } 
  if(responseStatus=='Error'){
    return [responseStatus,errorValue];
  }
  return [responseStatus,main_array,name_id];
})();
