// https://openprocessing.org/sketch/870183
let oR, oG, oB;
oR = 100;
oG = 200;
oB = 100;
function setup (){
	background (0);
	createCanvas (800, 800);

	frameRate(24);
	initOrb = new Orb(400.0, 400.0, 70, 0.0, null, oR, oG, oB); // create the base Orb with x and y coords, size, flexibility, children, and original r, g, and b
	let ch = []; //array of children

	//tentacle bases
	ch[0] = new Orb(470.0, 400.0, 50, 0.1, null, oR, oG, oB, 1, initOrb);
	ch[1] = new Orb(400.0, 470.0, 50, 0.1, null, oR, oG, oB, -1, initOrb);	
	ch[2] = new Orb(330.0, 400.0, 50, 0.1, null, oR, oG, oB, -1, initOrb);
	ch[3] = new Orb(400.0, 330.0, 50, 0.1, null, oR, oG, oB, 1, initOrb);

	
	//2nd segments
	ch[0].children = new Orb(530, 400, 45, 0.3, null, oR, oG, oB, 1, ch[0]);
	ch[1].children = new Orb(400, 530, 45, 0.3, null, oR, oG, oB, -1, ch[1]);
	ch[2].children = new Orb(270, 400, 45, 0.3, null, oR, oG, oB, -1, ch[2]);
	ch[3].children = new Orb(400, 270, 45, 0.3, null, oR, oG, oB, 1, ch[3]);

	
	//3rd segments
	ch[0].children.children = new Orb(585, 400, 40, 0.5, null, oR, oG, oB, 1, ch[0].children);
	ch[1].children.children = new Orb(400, 585, 40, 0.5, null, oR, oG, oB, -1, ch[1].children);
	ch[2].children.children = new Orb(215, 400, 40, 0.5, null, oR, oG, oB, -1, ch[2].children);
	ch[3].children.children = new Orb(400, 215, 40, 0.5, null, oR, oG, oB, 1, ch[3].children);

	//4th segments
	ch[0].children.children.children = new Orb(625, 400, 35, 0.7, null, oR, oG, oB, 1, ch[0].children.children);
	ch[1].children.children.children = new Orb(400, 625, 35, 0.7, null, oR, oG, oB, -1, ch[1].children.children);
	ch[2].children.children.children = new Orb(175, 400, 35, 0.7, null, oR, oG, oB, -1, ch[2].children.children);
	ch[3].children.children.children = new Orb(400, 175, 35, 0.7, null, oR, oG, oB, 1, ch[3].children.children);


	//5th segments
	ch[0].children.children.children.children = new Orb(660, 400, 25, 0.9, null, oR, oG, oB, 1, ch[0].children.children.children);
	ch[1].children.children.children.children = new Orb(400, 660, 25, 0.9, null, oR, oG, oB, -1, ch[1].children.children.children);
	ch[2].children.children.children.children = new Orb(140, 400, 25, 0.9, null, oR, oG, oB, -1, ch[2].children.children.children);
	ch[3].children.children.children.children = new Orb(400, 140, 25, 0.9, null, oR, oG, oB, 1, ch[3].children.children.children);

	initOrb.children = ch; // link the children to the base
}

function draw () {
	background(0);

	initOrb.display();
	initOrb.itCol();
}

class Orb{
	constructor(x, y, iSize, fl, cList, ir, ig, ib, curDir, iPar = null){
		this.base = createVector(x,y); //base location of the Orb, used to calculate distance between them
		this.cx = x; //current x and y of the orb
		this.cy = y;

		this.size = iSize;
		this.flex = fl; // range of movement
		this.par = iPar; // parent Orb
		this.children = cList; //list of its children

		this.r = ir; //colors
		this.b = ib;
		this.g = ig;

		this.rdir = 1; //color iteration direction
		this.gdir = -1;
		this.bdir = 1;

		this.cdir = curDir //curl direction
		this.curl = 0 //current amount of curl
	}

	itCol(){
		if(this.par){
			this.r = this.par.r + (this.par.rdir*-12);
			this.b = this.par.b + (this.par.bdir*-8);
			this.g = this.par.g + (this.par.gdir*-20);
		}
		else{

			if(this.r > 240){
				this.rdir = -1;
			}
			if(this.r < 20){
				this.rdir = 1;
			}
			this.r += this.rdir*3;

			if(this.b > 220){
				this.bdir = -1;
			}
			if(this.b < 40){
				this.bdir = 1;
			}
			this.b += this.bdir*2;

			if(this.g > 230){
				this.gdir = -1;
			}
			if(this.g < 20){
				this.gdir = 1;
			}
			this.g += this.gdir*5;
			//print(this.r +" " + this.g + " " + this.b + "\n");
		}
	}

	doCurl(){
		var bDist = p5.Vector.sub(this.base, this.par.base); // used to determine the direction of movement
		var pDist = p5.Vector.sub(this.base, createVector(this.par.cx, this.par.cy)); //the distance from this orb to its parent
		var cDist = p5.Vector.sub(this.base, createVector(this.cx, this.cy)); // the distance from this orb to its original location
		var move;
		//check what direction this orb will move
		//print(bDist.x + " " + bDist.y);
		if (this.curl > 500*this.flex){
			this.curl = -500*this.flex;
			this.cdir *= -1;
		}
		this.curl+=10*this.flex;
		if (bDist.x == 0){
			move = createVector(this.cx+(this.cdir*10*this.flex), this.cy); // move the orb horizontally
			move.sub(createVector(400, 400));
			//print(this.base.y-400);
			move.setMag(abs(this.base.y-400)); //restrict the movement to an arc by limiting it to the distance between the base distance
		}
		if (bDist.y == 0){
			move = createVector(this.cx, this.cy+(this.cdir*10*this.flex)); // move the orb vertically
			move.sub(createVector(400, 400));
			//print(this.base.x-400);
			move.setMag(abs(this.base.x-400)); //restrict the movement to an arc by limiting it to the distance between the base distance
		}
		//print(move.x + " " + move.y);
		this.cx=400+move.x;
		this.cy=400+move.y;
	}
	display(){
		fill(color(this.r, this.g, this.b));
		ellipse(this.cx, this.cy, this.size, this.size);
		if(this.children){
			var i = 0;
			if(Array.isArray(this.children)){
				while(this.children[i]){
					this.children[i].display();
					//print(this.children[i].bx);
					i++;
				}
			}
			else{
				this.children.display();
			}
		}
		this.itCol();
		if(this.par){
			this.doCurl();			
		}
	}

}