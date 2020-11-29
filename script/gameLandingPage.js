
/*card images*/
let images=[];
images[0]="noun_Cat_26560.png";
images[1]="noun_Cat_27987.png";
images[2]="noun_Cat_114598.png";
images[3]="noun_Cat_704954.png";
images[4]="noun_Cat_1092708.png";
images[5]="noun_Cat_1302510.png";
images[6]="noun_Cat_1322453.png";
images[7]="noun_Cat_1601189.png";
images[8]="noun_Cat_1745061.png";
images[9]="noun_Cat_2153175.png";
images[10]="noun_Cat_2212635.png";
images[11]="noun_Cat_2716141.png";
images[12]="noun_Cat_3030745.png";
images[13]="noun_Cat_3095659.png";
images[14]="noun_Cat_3162462.png";
images[15]="noun_Cat_3369817.png";

/*game parameters*/
let nCards=16;
/*variables*/
let aCarte;
let listeCartes=[];
let pBox=[];
let pBoxTitle=[];
let pBoxBottom=[];
let pBoxBottomMinicards=[];
let cardList=[];
let cards=[];
let scoreBox=[];
let score=[];

/*** FUNCTIONS  ***/
function shuffle(a){
	var i,j, aj, ak
	for (i = 0 ; i < 100 ; i++){
		j=Math.floor(Math.random()*a.length)
		k=Math.floor(Math.random()*a.length)
		aj=a[j];
		ak=a[k];
		a[j]=ak;
		a[k]=aj;
	}
	return a;
}

function multiple(A,b){
	return (A-A%b)/b;
}

function create2Darray(rows) {
	arr = [];
	for (var i=0;i<rows;i++){
		arr[i]=[];
	}
	return arr;
}

/* card listing*/
for ( var i = 0; i < nCards/2; i++){
	cardList[i]=i;
	cardList[nCards/2+i]=i;
}
cardList=shuffle(cardList);

/* display cardBoard */
cardBoard=document.getElementById("cardBoard");

/*calculate the number of columns*/
nbCol=4;
nbRow=4;

var nc;
var card1=[];
var card2=[];
var nShown=0;

/* style the grid*/
cardBoard.style.gridTemplateColumns= "repeat("+nbCol+",1fr)";
/*create cards*/
for (var c = 0; c < nCards; c++){
	cards[c]=document.createElement("div");
	cardBoard.appendChild(cards[c]);
	cards[c].className="card";
	cards[c].shown=false;
	cards[c].collected=false;
	cards[c].cardPos=c;
	cards[c].pairNr=cardList[c];
	cards[c].show = function() {
		console.log("show", this.cardPos, this.pairNr, "card1="+card1.cardPos, "card2="+card2.cardPos);
		this.shown=true;
		this.style.backgroundImage="url(images_cards/"+images[this.pairNr]+"), radial-gradient(var(--jaune),var(--jaune1))";
	}
	cards[c].hide = function(){
		console.log("hide", this.cardPos, this.pairNr, "card1="+card1.cardPos, "card2="+card2.cardPos);
		this.shown=false;
		this.style.backgroundImage="url(images/logo02.png), radial-gradient(var(--jaune),var(--jaune))";

	}
	cards[c].collect = function(){
		console.log("collect", this.cardPos, this.pairNr, "card1="+card1.cardPos, "card2="+card2.cardPos);
		this.collected=true;
		this.style.backgroundImage= "url(images_cards/"+images[this.pairNr]+")";
	}
}


/* add listener */
for (var c = 0; c < nCards; c++) {
	cards[c].addEventListener('click', function (event) {
		
		if(!this.collected){
			console.log("collected ", this.collected);
			if(!this.shown){
				console.log("shown ", this.shown);
				switch(nShown){
					case 0 :
						console.log("nShown ", nShown)
						card1=this;
						this.show();
						nShown=1;
						break;
					case 1 :
						console.log("nShown ", nShown)
						card2=this;
						this.show();
						nShown=2;
						if(card1!=card2 && cardList[card1.cardPos]===cardList[card2.cardPos]){
							card1.collect();
							card2.collect();
							/*addMinicard(player, card1)*/
							card1=[];
							card2=[];
							nShown=0;
							new Audio("sounds/1898.mp3").play()
						}
						break;
					case 2 :
						console.log("Déja deux cartes montrées!");
				}
			}
			else {
				switch(nShown){
					case 1:
						card1=[];
						this.hide();
						nShown=0;
						break;
					case 2:
						card2=[];
						this.hide();
						nShown=1;
						break;
				}
			}
		}
		else{
			console.log("Cartes déjà ramassée");
		}

	})
}



