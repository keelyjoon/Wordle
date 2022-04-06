
var height = 6; // number of guesses
var width = 5; // length of word

var row = 0; //current guess (attempt #)
var col = 0; // current letter for that attempt

var gameOver = false;
var word = "RENEE";

window.onload = function()
{
    initialize();
}

function initialize()
{
    // create the game board
    for (let r = 0; r < height; r++)
    {
        for (let c = 0; c < width; c++)
        {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);

        }
    }

    // create the key board
    let keyboard = 
    [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]

    ]

    for (let i = 0; i < keyboard.length; i++)
    {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboard.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++)
        {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter")
            {
                keyTile.id = "Enter"
            }
            else if (key == "⌫")
            {
                keyTile = "Backspace";
            }
            else if ("A" <= key && => )

        }
    }


    // Listen for Key Press
    document.addEventListener("keyup", (e) =>
    processInput(e);
    {
        if (gameOver) return;
        //alert(e.code);
        if ("KeyA" <= e.code && e.code <= "KeyZ")
        {
            if (col < width)
            {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "")
                {
                    currTile.innerText = e.code[3]
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace")
        {
            if (0 < col && col <= width)
            {
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }
        else if (e.code == "Enter")
        {
            update();
            row += 1; //start new row
            col = 0; // start at 0 for new row
        }

        if (!gameOver && row == height)
        {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }

    })
}

function processInput(e)
{
    if (gameOver) return;
    //alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ")
    {
        if (col < width)
        {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "")
            {
                currTile.innerText = e.code[3]
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace")
    {
        if (0 < col && col <= width)
        {
            col -= 1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }
    else if (e.code == "Enter")
    {
        update();
        row += 1; //start new row
        col = 0; // start at 0 for new row
    }

    if (!gameOver && row == height)
    {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }


}


function update()
{
    let correct = 0;
    let letterCount = {};
    for (let i = 0; i < word.length; i++)
    {
        letter = word[i];
        if (letterCount[letter])
        {
            letterCount[letter] += 1;
        }
        else
        {
            letterCount[letter] = 1;
        }
    }


    // first iteration, check all the correct ones
    for (let c = 0; c < width; c++)
    {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // is it in the correct postion
        if (word[c] == letter)
        {
            currTile.classList.add("correct");
            correct == 1;
            letterCount[letter] -= 1;
             
        }
        if (correct == width)
        {
            gameOver = true;
        }
    }

    // go again and mark which oens are present but in wrong postion
    for (let c = 0; c < width; c++)
    {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if( !currTile.classList.contains("correct")) 
        {      
            if (word.includes(letter) && letterCount[letter] > 0)
            {
                currTile.classList.add("present");
                letterCount[letter] -= 1;
            }
            else
            { 
                currTile.classList.add("absent");
            }
        }
    }
}