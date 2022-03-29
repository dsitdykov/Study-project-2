//O KA KACIUKS DARO?
// ----------INITIALIZATION---------//

let idCounter = 0;
let cardCounter = 0;
let cardCounter1 = 0;
var deck;
let numberArray;
let catCDLL = new circularLinkedList();
let dogCDLL = new circularLinkedList();
var dogHealth = 50;
var catHealth = 50;
var counter = 0;

// ----------ARRAY SCRAMBLE---------//

function scrambleArray(array){
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0){
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

// ----------PLAYING DECK----------//

function scrambleDeck(array){
    for(var i = 0; i < 54; i++){
        var j = numberArray[i];
        array.push(data[j*2]);
        array.push(data[j*2+1]);
    }
    return array;
}

// ----------CIRCURAL DOUBLY LINKED LIST----------//

function circularLinkedList() {
    //Node
    let Node = function(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
  
    let length = 0;
    let head = null;
    let tail = null;
  
    //Other methods go here
    //Append a new element
    this.append = function(element) {
        let node = new Node(element),
            current = head,
            previous;
        if(!head) {
            head = node;
            tail = node;
        }
        else {
            node.prev = tail;
            tail.next = node;
            tail = node;
        }
    
        //Mark head's prev element as last element
        head.prev = tail;
    
        //Mark tail's next element as first element
        tail.next = head;
        length++;
    }

    //Get element at specific index
    this.getElementAt = function(index) {
        if(index >= 0 && index <= length){
            let temp = head;
            for(let i = 0; i < index && temp != null; i++){
                temp = temp.next;
            }
            return temp;
        }
        return undefined;
    }

    //Remove at any position
    this.removeAt = function (index) {
        if(index >= 0 && index < length){
            let current = head;
      
            //Remove from head
            if(index === 0){
                if(length === 1){
                    head = null; //undefined;
					tail = null; //undefined;
                }
                else {
					
					const current = head;
                    head = head.next;
                    tail.next = head;
					head.prev = tail;
                  
                }
            }
            else {
                //Remove at given index (middle or end)
				if (index === length - 1) {
					let previous = tail.prev;
					previous.next = head;
					head.prev = previous;
					tail = previous;
				}
				else{
					const previous = this.getElementAt(index - 1);
					current = previous.next;
					current = current.next;
					current.prev = previous;
					current = previous.next;
					previous.next = current.next;
				}
            }
      
            if(head){
                //Mark head's prev element as last element
                head.prev = tail;
    
                //Mark tail's next element as first element
                tail.next = head;
            }
      
            length--;
            return current.element;
        }
        return undefined;
    }

    this.toArray = function(){
        let arr = [],
        current = head;
        const temp = head.element
    
        while(current){
            //Break if first element detected
            if(temp === current.next.element){
                arr.push(current.element);
                break;
            }
          
            arr.push(current.element);
            current = current.next;
        }
    
        return arr;
    };

}








// ----------ADD DOG CARD----------//

function addCardDog() {
    //Card added to CDLL
    dogCDLL.append(deck[numberArray[idCounter]]);
    counter++;

    //Create DIV
    var newDiv1 = document.createElement("div");

    for(var i = 0; i < 5; i++){
        if(i == cardCounter1){
            if(dogCDLL.getElementAt(i).element.effect == 15 || dogCDLL.getElementAt(i).element.effect == -15){
                newDiv1.className = "dog__card yellow";
                break;
            }
            if(dogCDLL.getElementAt(i).element.effect == 0){
                newDiv1.className = "dog__card blue";
                break;
            }
            if(dogCDLL.getElementAt(i).element.effect > 1){
                newDiv1.className = "dog__card green";
                break;
            }
            if(dogCDLL.getElementAt(i).element.effect < -1){
                newDiv1.className = "dog__card red";
                break;
            }
        }
    }

    //creade ID
    newDiv1.id = 'card-' +idCounter;

    document.getElementById('dog').appendChild(newDiv1);

    //Create h1 and h3
    var newH11 = document.createElement("h1");
    var newH31 = document.createElement("h3");
    document.getElementById('card-' +idCounter).appendChild(newH11);
    document.getElementById('card-' +idCounter).appendChild(newH31); 

    //Data from CDLL to h1 and h3
    for(var i = 0; i < 5; i++){
        if(i == cardCounter1){
            newH11.innerHTML = dogCDLL.getElementAt(i).element.effect;
            newH31.innerHTML = dogCDLL.getElementAt(i).element.name;
        }
    }

    idCounter++;
    cardCounter1++;
}

// -------------REMOVE DOG CARD-------------- //

function removeCardDog(id) {
    var childDiv1 = document.getElementById('dog').children

    for(var i = 0; i < 5; i++){
        if(childDiv1.item(i) == document.getElementById('card-' +id)){
            dogCDLL.removeAt(i);
        }
    }

    var removeDiv1 = document.getElementById('card-' +id);
    removeDiv1.remove();
    cardCounter1--;
}

// ----------ADD CAT CARD----------//

function addCardCat() {
    //Card added to CDLL
    catCDLL.append(deck[numberArray[idCounter]]);
    counter++;

    //Create DIV
    var newDiv = document.createElement("div");

    for(var i = 0; i < 5; i++){
        if(i == cardCounter){
            if(catCDLL.getElementAt(i).element.effect == 15 || catCDLL.getElementAt(i).element.effect == -15){
                newDiv.className = "cat__card yellow";
                break;
            }
            if(catCDLL.getElementAt(i).element.effect == 0){
                newDiv.className = "cat__card blue";
                break;
            }
            if(catCDLL.getElementAt(i).element.effect > 1){
                newDiv.className = "cat__card green";
                break;
            }
            if(catCDLL.getElementAt(i).element.effect < -1){
                newDiv.className = "cat__card red";
                break;
            }
        }
    }

    //creade ID
    newDiv.id = 'card-' +idCounter;

    //create onClick
    newDiv.setAttribute("onclick", "clickCat(" + idCounter + ")");

    document.getElementById('cat').appendChild(newDiv);

    //Create h1 and h3
    var newH1 = document.createElement("h1");
    var newH3 = document.createElement("h3");
    document.getElementById('card-' +idCounter).appendChild(newH1);
    document.getElementById('card-' +idCounter).appendChild(newH3); 

    //Data from CDLL to h1 and h3
    for(var i = 0; i < 5; i++){
        if(i == cardCounter){
            newH1.innerHTML = catCDLL.getElementAt(i).element.effect;
            newH3.innerHTML = catCDLL.getElementAt(i).element.name;
        }
    }

    idCounter++;
    cardCounter++;
}

// -------------REMOVE CAT CARD-------------- //

function removeCardCat(id) {
    var childDiv = document.getElementById('cat').children

    for(var i = 0; i < 5; i++){
        if(childDiv.item(i) == document.getElementById('card-' +id)){
            catCDLL.removeAt(i);
        }
    }

    var removeDiv = document.getElementById('card-' +id);
    removeDiv.remove();
    cardCounter--;
}

// -------------LOAD CARDS FROM JSON-------------- //

function getData(){
	let infoRequest = new XMLHttpRequest();
	infoRequest.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			deck = JSON.parse(this.responseText);
		}
	};
	infoRequest.open("GET","cards.json", true);
	infoRequest.send();
}

// -------------RANDOM NUMBER GENERATOR-------------- //

function random(){
    var min, max;
    min = 1;
    max = cardCounter;
	return Math.round(Math.random() * (max - min) + min)-1;
}

function random1(){
    var min, max;
    min = 1;
    max = cardCounter1;
	return Math.round(Math.random() * (max - min) + min)-1;
}

// -------------PAUSE TIMER-------------- //

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ----------START GAME----------//

getData();	
numberArray = Array.from(Array(54).keys())
scrambleArray(numberArray);

function play() {
    document.getElementById("play").style.display = "none";

    console.log(numberArray);
    
    
    addCardCat();
    addCardCat();
    addCardCat();

    addCardDog();
    addCardDog();
    addCardDog(); 
}

// ----------CAT ON CLICK----------//

function clickCat(id){

    var cardEffect = document.getElementById('cat').children
    var effect;
    for(var i = 0; i < 5; i++){
        if(cardEffect.item(i) == document.getElementById('card-' +id)){
            effect = catCDLL.getElementAt(i).element.effect;
        }
    }

    var dogCardEffect = document.getElementById('dog-health');
    var catCardEffect = document.getElementById('cat-health');



    var catPowerColor = document.getElementById("cat-color");
    var dogPowerColor = document.getElementById("dog-color");

    if(effect < 0){

        dogHealth = dogHealth + effect;
        dogCardEffect.innerHTML = ('Health: ' +dogHealth) ;

        dogPowerColor.classList.add("dog__damage");
        sleep(250).then(() => {
            dogPowerColor.classList.remove("dog__damage");
        });
    }
    else if(effect > 0){
        catHealth = catHealth + effect;
        catCardEffect.innerHTML = ('Health: ' +catHealth) ;

        catPowerColor.classList.add("cat__heal");
        sleep(250).then(() => {
            catPowerColor.classList.remove("cat__heal");
        });
    }

    if(dogHealth <= 0){
        document.getElementById("win").style.display = 'inline';
    }

    removeCardCat(id);

    //Remove random card
    sleep(2000).then(() => {
        var randomCard = random();

        var childDiv = document.getElementById('cat').children
        for(var i = 0; i <= idCounter; i++){
            if(childDiv.item(randomCard) == document.getElementById('card-' +i)){
                removeCardCat(i);
                break;
            }
        }
    });

    sleep(1000).then(() => {
        computer();
    });


    
    console.log(idCounter);

    if(deck.length - counter == 4){
        console.log('empty');
        sleep(2500).then(() => {
            scrambleArray(numberArray);
            console.log(numberArray);
            idCounter = 0;
            counter = 0;

            addCardCat();
            addCardCat();
            addCardCat();

            addCardDog();
            addCardDog();
            addCardDog();
        });
    }



    else if(cardCounter < 4){
        sleep(3000).then(() => {
            addCardCat();
            addCardCat();
            addCardCat();

            addCardDog();
            addCardDog();
            addCardDog();
        });
    }
    else{
        sleep(3000).then(() => {
            addCardCat();
            addCardCat();

            addCardDog();
            addCardDog();
        }); 
    }

    sleep(3000).then(() => {
        var deckSize = document.getElementById("deck");
        deckSize.innerHTML = deck.length - counter ;
    });
}

function clickDog(id){

    var cardEffect1 = document.getElementById('dog').children
    var effect1;
    for(var i = 0; i < 5; i++){
        if(cardEffect1.item(i) == document.getElementById('card-' +id)){
            effect1 = dogCDLL.getElementAt(i).element.effect;
        }
    }

    var dogCardEffect1 = document.getElementById('dog-health');
    var catCardEffect1 = document.getElementById('cat-health');

    var catPowerColor = document.getElementById("cat-color");
    var dogPowerColor = document.getElementById("dog-color");

    if(effect1 < 0){
        catHealth = catHealth + effect1;
        catCardEffect1.innerHTML = ('Health: ' +catHealth) ;

        catPowerColor.classList.add("cat__damage");
        sleep(250).then(() => {
            catPowerColor.classList.remove("cat__damage");
        });
    }
    else if(effect1 > 0){
        dogHealth = dogHealth + effect1;
        dogCardEffect1.innerHTML = ('Health: ' +dogHealth) ;

        dogPowerColor.classList.add("dog__heal");
        sleep(250).then(() => {
            dogPowerColor.classList.remove("dog__heal");
        });
    }


    if(catHealth <= 0){
        document.getElementById("lose").style.display = 'inline';
    }

    removeCardDog(id);

    //Remove random card
    sleep(1000).then(() => {
        var randomCard1 = random1();
        // console.log('random card ' +randomCard);

        var childDiv1 = document.getElementById('dog').children
        for(var i = 0; i <= idCounter; i++){
            if(childDiv1.item(randomCard1) == document.getElementById('card-' +i)){
                removeCardDog(i);
                break;
            }
        }
    });
}

function computer(){
    var choice = 0;

    //If all cards are 0
    for(var i = 0; i < cardCounter1; i++){
        if(dogCDLL.getElementAt(i).element.effect == 0){
        }
    }

    //If attacking, to find the highest card
    for(var i = 0; i < cardCounter1; i++){
        if(dogCDLL.getElementAt(i).element.effect < 0 && dogCDLL.getElementAt(i).element.effect <= dogCDLL.getElementAt(choice).element.effect){
            choice = i;
        }
    }

    //If got a rare card
    for(var i = 0; i < cardCounter1; i++){
        if(dogCDLL.getElementAt(i).element.effect == -15 || dogCDLL.getElementAt(i).element.effect == 15){
            choice = i;
        }
    }

    //If healing, to find the highest card
    if(dogHealth <= 15){
        for(var i = 0; i < cardCounter1; i++){
            if(dogCDLL.getElementAt(i).element.effect > 0 && dogCDLL.getElementAt(i).element.effect >= dogCDLL.getElementAt(choice).element.effect){
                choice = i;
            }
        }
    }

    var childDiv2 = document.getElementById('dog').children
    for(var i = 0; i <= idCounter; i++){
        if(childDiv2.item(choice) == document.getElementById('card-' +i)){
            clickDog(i);
            break;
        }
    }

    return;
}

function refreshPage(){
    window.location.reload();
}

function closePage(){
    window.open('','_parent','');
    window.close();
}