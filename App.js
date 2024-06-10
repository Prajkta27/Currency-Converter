const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";   

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.getElementById("btn");
const fromCurr = document.querySelector("From Select");
const toCurr = document.querySelector("To select");
const msg = document.querySelector(".msg");

/*for(code in countryList)
    {
        console.log(code);
    }*/ 

for(let select of dropdowns)
    {
        for(let currCode in countryList)
            {
               let newOption = document.createElement("option");
               newOption.innerText = currCode;
               newOption.value = currCode;
               select.append(newOption);
               if(select.name === "From" && currCode === "USD")
                {
                  newOption.selected = "selected"
                }
                else(select.name === "To" && currCode === "INR")
                {
                    newOption.selected = "selected";
                }
                select.append(newOption);
            }
            select.addEventListener("change", (evt) => {
                updateFlag(evt.target);
            })
    }

    const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src=newSrc;
    };

    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".Amount");
        let amtVal = amount.value;
        //console.log(amtVal);
        if(amtVal === "" && amtVal < 1){
          amtVal = 1;
          amount.value = "1";
        }

    //console.log(fromCurr.value. toCurr.value);
    const url = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} ${finalAmt} ${toCurr.value}`;

    });