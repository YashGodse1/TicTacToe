    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let count = 0;
    let turn0 =true;    

    const winPatterns = [
        [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
    ];

    const resetGame = () => {
        turn0 = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
    };

    boxes.forEach((box) => {
        box.addEventListener("click",()=>{
            count++;
            if(turn0){
                box.innerText = "O";
                box.style.color = "blue"; 
                turn0 = false;
            } else{
                box.innerText = "X";
                box.style.color = "orangered"
                turn0 = true;
            }
            box.disabled = true;

            // console.log(count);
            let isWinner = checkWinner(); 
            if(count === 9 && isWinner === false){
                checkdraw();
            } 
        });
    });

    const disableBoxes = () => {
        for(let box of boxes){
            box.disabled = true;
        }
    }

    const enableBoxes = () => {
        for(let box of boxes){
            box.disabled = false;
            box.innerText = "";
        }
    }

    const showWinner = (winner) => {
        msg.innerText =`Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide"); 
        disableBoxes();
    }

    const checkWinner = () => {
        for(let pattern of winPatterns){
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                if(pos1Val === pos2Val && pos2Val === pos3Val ){
                    showWinner(pos1Val);
                    return true;
                }
            }
        }
        return false;
    };  

    const checkdraw = () => {
        msgContainer.classList.remove("hide");
        msg.innerText = "Game is Drawn."
    }
    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);