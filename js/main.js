//jshint esversion:6

window.onload = () => {

    const startUpload = () =>{
        removeThisId("#welcome-card");
        showThisId("#main-content");
    };

    document.querySelector("#get-started").addEventListener("click", startUpload);


    let fileUp = document.querySelector("#upload-file");

    document.querySelector("#submit-file").addEventListener("click", (e) => {
        let file = fileUp.files[0];
        let fileTypeTxt = /text.*/;

        if (file.type.match(fileTypeTxt)) {
            let reader = new FileReader();

            reader.readAsText(file);

            reader.onload = (e) => {
                let fileText = reader.result;
                removeThisId("#starting-text");

                showThisId("#loading");
                setTimeout(()=>{
                    removeThisId("#loading");
                    startType(fileText);
                }, 3000);

            };
        } else {
            alert('File not supported! Try again with a .txt text file!');
        }
    });
};