//jshint esversion:6

const removeThisId = (idToRemove) => {
    document.querySelector(idToRemove).classList.add("d-none");
};

const showThisId = (idToShow) => {
    document.querySelector(idToShow).classList.remove("d-none");
};

const startType = (enterText)=>{  //function that passes the text from the file and starts to run the typer

    enterText = enterText.replace(/(\r\n|\n|\r)/gm, ""); //take out line breakers

    let textSplit = enterText.split("."); //split the sentences separately in an array
    let printBox = document.querySelector("#box-print");

    showThisId("#user-input");
    printBox.innerHTML = '<h2 class="main-text font-weight-bolder mb-5">Check the sentence and write below</h2>';
    

    function printAndType(textCheck){  //function for the user to check the text and write it
        let i = 0;
        let submitButton = document.querySelector("#submit-type");
        let userInput = document.querySelector("#user-input > input");
        
        printBox.innerHTML += `<p class="mt-5">${textCheck[i]}.</p>`;

        let printBoxParag = document.querySelector("#box-print > p");

        userInput.setAttribute("maxlength", printBoxParag.innerText.length);
        
            
            const checkAnswer = () =>{  //function to verify if the user entered the correct string
                
                if(userInput.value == printBoxParag.innerText && i < textCheck.length - 1){
                    if(i == textCheck.length - 2){
                        removeThisId("#typer");
                        showThisId("#winner");
                    }
                    i++;
                    printBoxParag.innerText = textCheck[i] + ".";
                    userInput.value = "";
                    userInput.setAttribute("maxlength", printBoxParag.innerText.length);
                }
                else{
                    for(let j = 0; j < textCheck[i].length; j++){
                        if(userInput.value[j] != textCheck[i][j]){
                        removeThisId("#typer");

                        let shouldBe = document.querySelector("#should-be");
                        let youDid = document.querySelector("#you-did");

                        shouldBe.innerText = printBoxParag.innerText;
                        youDid.innerText = userInput.value;

                        showThisId("#error");

                        document.querySelector("#go-back").addEventListener("click", ()=>{
                            removeThisId("#error");
                            showThisId("#typer");
                        });
                        return 0;
                        }
                    }
                }
            };
            
            //when user types, check if the length is equal the printed sentence and enable button if yes
            userInput.addEventListener("input", ()=>{
                if(userInput.value.length == userInput.maxLength){
                submitButton.removeAttribute("disabled");
                userInput.addEventListener("keypress", ()=>{
                    if(event.key == "Enter"){
                        checkAnswer();
                    }
                });
                }
                else{
                submitButton.setAttribute("disabled", "");
                userInput.removeEventListener("keypress", ()=>{
                    if(event.key == "Enter"){
                        checkAnswer();
                    }
                });
                }
            });

            submitButton.addEventListener("click", checkAnswer);

    }

    printAndType(textSplit); 


};