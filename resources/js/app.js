var dataApp = (function(){

    var Exercise = function(l, description){
    this.l = l;
    this.description = description;
    };

    // Set up exercises
    var ex1 = new Exercise("a", "Mountain Climbers ");
    var ex2 = new Exercise("b", "Sit ups");
    var ex3 = new Exercise("c", "Air Squats");
    var ex4 = new Exercise("d", "Push ups");
    var ex5 = new Exercise("e", "Squat Jumps");
    var ex6 = new Exercise("f", "Torso Twist");
    var ex7 = new Exercise("g", "Burpees");
    var ex8 = new Exercise("h", "Double Unders");
    var ex9 = new Exercise("i" ,"Wall Balls");
    var ex10 = new Exercise("j" ,"Grasshoppers");
    var ex11 = new Exercise("k", "Pull ups");
    var ex12 = new Exercise("l", "Push ups");
    var ex13 = new Exercise("m", "Double Unders");
    var ex14 = new Exercise("n", "V-ups");
    var ex15 = new Exercise("o", "Box Jumps");
    var ex16 = new Exercise("p", "V-ups");
    var ex17 = new Exercise("q", "Knee Kicks");
    var ex18 = new Exercise("r", "Side Bends");
    var ex19 = new Exercise("s", "Leg Swings");
    var ex20 = new Exercise("t", "Arm Swings");
    var ex21 = new Exercise("u", "Jumpimg Jacks");
    var ex22 = new Exercise("v", "Standing Hops");
    var ex23 = new Exercise("w", "High Knees in Place");
    var ex24 = new Exercise("x", "Reverse Crunches");
    var ex25 = new Exercise("y", "Bicycle Crunches");
    var ex26 = new Exercise("z", "Tricep Dip");

    var exeList, nameBox;

    exeList = [ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14, ex15, ex16, ex17, ex18, ex19, ex20, ex21, ex22, ex23, ex24, ex25, ex26];

    nameBox = [];

    // Generate the random number
    function countExe(){
        var count = Math.floor(Math.random() * 20) + 15;
        return count;
    }

    return {
        spell: function(element){
            for(var i = 0; i < element.length; i++){
            nameBox.push(element[i]);
            }
        },

        getExeList: function(){
            return exeList;
        },

        getNameBox: function(){
            return nameBox;
        },

        getRandomNum: function(){
            return countExe();
        },

        box: function(){
            return nameBox;
        }
    }

})();

var UIController = (function(){

    var DOMstring = {
        inputValue: ".name-input",
        addButton: "#btn-add",
        exerciseBox: ".exercise-box",
        exerciseList: ".exercise-list",
        logo: ".logo",
        timer: ".timer",
        appendMili: "mili",
        appendSeconds: "seconds",
        appendMinutes: "minutes"
    }

    return {
        getInput: function(){

            var nameInputValue = document.querySelector(DOMstring.inputValue).value;
            this.disabledInput();
            return nameInputValue;
        },

        disabledInput: function(){
           document.querySelector(DOMstring.inputValue).disabled = true;
        },

        addExerciseBox: function(box, list, count){

            var html = '<div class="exercise-list" id="l1"><div class="box letters">%l%.</div><div class="box exercise">%ex%</div><div class="box count">%c%</div></div>';

            var newHtml = html.replace("%l%", box);
            newHtml = newHtml.replace("%ex%", list.description);
            newHtml = newHtml.replace("%c%", count);
            document.querySelector(".exercise-box").insertAdjacentHTML("beforeend", newHtml);
        },

        // Display exercises with animation
        displayToDoExercise: function(){
            var ex = document.querySelectorAll(DOMstring.exerciseList);

            for(var i = 0; i < ex.length; i++){
            ex[i].style.display = "block";
            ex[i].style.WebkitAnimation = "list 0.5s " + i + "s alternate both ease-in-out";
            }
        },

        animationName: function(item, name){
              document.querySelector(item).style.WebkitAnimationName = name;
        },

        textButton: function(btn, text){
             btn.textContent = text;
        },

        getDOM: function(){
            return DOMstring;
        }
    }

})();


var stopWatchController = (function(){

    var seconds, tens, minutes, Interval, appendTens, appendSeconds, appendMinutes

    appendTens  = document.getElementById("mili");
    appendSeconds = document.getElementById("seconds");
    appendMinutes = document.getElementById("minutes");

    seconds = 00;
    tens = 00;
    minutes = 00;
    Interval;

    function setStopWatch(){
        tens++;

    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;

    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

    if(seconds > 60){
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        seconds.innerHTML = "0" + 0;
    }

    if (minutes > 9){
      appendMinutes.innerHTML = minutes;
    }

}

    return {

        startTimer: function(){
            clearInterval(Interval);
            Interval = setInterval(setStopWatch, 10);
        },

        stopTimer: function(){
            clearInterval(Interval);
        }
    }


})();


var AppController = (function(dataAppCrtl, UICrtl, stopWatchCrtl){

    var DOM, addBtn, inputValue, exe, nameBox , exeList, randomNum, timerUI;

    DOM = UICrtl.getDOM();
    addBtn = document.querySelector(DOM.addButton);

    // Find the letters in the exercise list
    var assignExercise = function(){
        nameBox = dataAppCrtl.getNameBox();
        exeList = dataAppCrtl.getExeList();

        for(var i = 0; i < nameBox.length; i++){
            for(var k = 0; k < exeList.length; k++){
                if(exeList[k].l.indexOf(nameBox[i]) != -1){
                    randomNum = dataAppCrtl.getRandomNum();
                    UICrtl.addExerciseBox(nameBox[i], exeList[k], randomNum);
                }
            }
        }
    }


    // Controller
    var controller = function(){
        // 1. Get input value
        inputValue = UICrtl.getInput();
        console.log(inputValue);
        // 2. Add letters to array
        dataAppCrtl.spell(inputValue);
        // 3. Assign the exercise to the letters
        assignExercise();
        // 4. Display the exercises
        UICrtl.displayToDoExercise();
    }

    var stopTime = function(){
        UICrtl.textButton(addBtn, "Start");
        stopWatchCrtl.stopTimer();
        addBtn.onclick = startTimer;
    }

    var startTimer = function(){
        UICrtl.textButton(addBtn, "Stop");
        stopWatchCrtl.startTimer();
        addBtn.onclick = stopTime;
    }

    // Chcnage logo, show timer, change button function
    var change = function(){
        UICrtl.animationName(DOM.logo, "logos");
        UICrtl.textButton(addBtn, "Start");
        UICrtl.animationName(DOM.timer, "timer");
        addBtn.onclick = startTimer;
    }

    // Show exercise
    var basic = function(){
        UICrtl.textButton(addBtn, "Go!");
        controller();
        addBtn.onclick = change;
    }

    // Trigger the buton
    var setupButton = function(){
       addBtn.onclick = basic;
    }

    return {
        init: function(){
            console.log("App working");
            setupButton();
        }
    }

})(dataApp, UIController, stopWatchController);

AppController.init();
