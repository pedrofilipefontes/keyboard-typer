//jshint esversion:6

const removeThisId = (idToRemove) => {  //function to remove an item (add diplay none)
    document.querySelector(idToRemove).classList.add("d-none");
};

const showThisId = (idToShow) => {      //function to show an item (remove diplay none)
    document.querySelector(idToShow).classList.remove("d-none");
};

const startType = (enterText) => { //function that passes the text from the file and starts to run the typer

    enterText = enterText.replace(/(\r\n|\n|\r)/gm, ""); //take out line breakers

    let textSplit = enterText.split("."); //split the sentences separately in an array
    let printBox = document.querySelector("#box-print");

    showThisId("#typer");

    let start = performance.now();

    function printAndType(textCheck) { //function for the user to look at the text and write it
        let i = 0;
        let submitButton = document.querySelector("#submit-type");
        let userInput = document.querySelector("#user-input > input");

        printBox.innerHTML += `<p class="mt-5">${textCheck[i]}.</p>`;

        let printBoxParag = document.querySelector("#box-print > p");

        userInput.setAttribute("maxlength", printBoxParag.innerText.length);


        const checkAnswer = () => { //function to verify if the user entered the correct string

            if (userInput.value == printBoxParag.innerText && i < textCheck.length - 1) {
                if (i == textCheck.length - 2) {
                    let stop = performance.now();
                    let timeShow = (stop - start)/60000;
    
                    document.querySelector("#final-message > p").append(`You have written the whole text correctly and that took you ${timeShow.toFixed(2)} minutes!`);

                    removeThisId("#typer");
                    showThisId("#winner");
                }
                i++;
                printBoxParag.innerText = textCheck[i] + ".";
                userInput.value = "";
                userInput.setAttribute("maxlength", printBoxParag.innerText.length);
            } else {
                removeThisId("#typer");

                let shouldBe = document.querySelector("#should-be");
                let youDid = document.querySelector("#you-did");

                shouldBe.innerText = printBoxParag.innerText;
                youDid.innerText = userInput.value;

                String.prototype.showMistakeAt = function (index, replacement) {
                    console.log('called');
                    return this.substr(0, index) + '<span style="color: black; font-size:20px;">' + replacement + '</span>' + this.substr(index + replacement.length);
                };

                for (let j = 0; j < textCheck[i].length; j++) {
                    if (userInput.value[j] != textCheck[i][j]) {

                        shouldBe.innerHTML = shouldBe.innerHTML.showMistakeAt(j, shouldBe.innerText[j]);
                        youDid.innerHTML = youDid.innerHTML.showMistakeAt(j, youDid.innerText[j]);

                        showThisId("#error");

                        document.querySelector("#go-back").addEventListener("click", () => {
                            shouldBe.innerText = printBoxParag.innerText;
                            youDid.innerText = userInput.value;
                            console.log(shouldBe.innerHTML);
                            console.log(youDid.innerHTML);
                            removeThisId("#error");
                            showThisId("#typer");
                        });

                        return 0;
                    }
                }
            }
        };

        //when user types, check if the length is equal the printed sentence and enable button if yes
        userInput.addEventListener("input", () => {
            if (userInput.value.length == userInput.maxLength) {
                submitButton.removeAttribute("disabled");
                userInput.addEventListener("keypress", () => {
                    if (event.key == "Enter") {
                        checkAnswer();
                    }
                });
            } else {
                submitButton.setAttribute("disabled", "");
                userInput.removeEventListener("keypress", () => {
                    if (event.key == "Enter") {
                        checkAnswer();
                    }
                });
            }
        });

        submitButton.addEventListener("click", checkAnswer);
    }

    printAndType(textSplit);
};