//call to fetch the data from json file, catch if error
getData().
then(response => {
    console.log("Fetched data");
})
.catch(e => {
    console.error(e);
});


async function getData() {
    const response = await fetch("data.json");
    const data = await response.json();

    //for each section take the values from the fetched data
    let obj_arr = [];
    for(let i=0; i<6; i++) {
        obj_arr.push(createObj(data[i].timeframes));
    }
    
    //select the h4 and pars of each card
    let hourData = document.querySelectorAll('h4[id*="hour-data"]');
    let previousData = document.querySelectorAll('p[id*="previous-data"]');
    let timeFrames = document.querySelectorAll("#timeframes span");

    //for the init active timeframe(weekly)
    timeFrames[1].classList.toggle("active");
    let activeTimeFrame = timeFrames[1];
    
    timeFrames.forEach(t => {
        t.addEventListener("click",function() {
            activeTimeFrame.classList.toggle("active");
            t.classList.toggle("active");
            activeTimeFrame = t;
            if(t.textContent === 'Daily') {
                for(let i=0; i<6; i++) {
                    //for each card put the data of current and previous
                    putData(obj_arr[i].daily,hourData[i],previousData[i]);
                }
            }
            else if(t.textContent === "Weekly") {
                for(let i=0; i<6; i++) {
                    putData(obj_arr[i].weekly,hourData[i],previousData[i]);
                }
            }
            else {
                for(let i=0; i<6; i++) {
                    putData(obj_arr[i].monthly,hourData[i],previousData[i]);
                }
            }
        })
    });
}


function putData(value,hourData,previousData) {
    let current = value.current;
    let previous = value.previous;
    let currentText = "";
    let previousText = "";

    hourData.classList.add('hide'); //for the transition
    previousData.classList.add('hide');

    //timeout for the transition of opacity
    setTimeout(function() {
        if(value.current === 1) {
            currentText = `${current}hr`;
        }
        else{
            currentText = `${current}hrs`;
        }
        hourData.textContent = currentText;

        if(value.previous === 1){
            previousText = `Last week - ${previous}hr`;
        }
        else {
            previousText = `Last week - ${previous}hrs`;
        }
        previousData.textContent = previousText;

        //show them again
        hourData.classList.remove('hide');
        previousData.classList.remove('hide');
    },400);
   
}

//create  the object
function createObj(data) {
    return {
        'daily': 
        {
            'current':data.daily.current,
            'previous':data.daily.previous
        },
        'monthly':
        {
            'current':data.monthly.current,
            'previous':data.monthly.previous
        },
        'weekly':
        {
            'current':data.weekly.current,
            'previous':data.weekly.previous
        }
    }
    
}