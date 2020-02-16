const POOL = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ ';
const POPULATION_SIZE = 1500;
const MUTATION_RATE = 0.005;
const TARGET = 'PEOPLE DOING STRANGE THINGS WITH SOFTWARE'

class GeneticAlgorithm {
	constructor(target, populationSize, mutationRate) {
		this.generation = 0;
		this.mutationRate = mutationRate;
		this.populationSize = populationSize;
		this.population = [];
		this.createInitialPopulation();
	}

	createInitialPopulation() {
		for(let i=0; i<this.populationSize; i++) {
			let individual = [];
			for(let j=0; j<TARGET.length; j++) {
				individual.push(POOL.charAt(random(0, POOL.length)));
			}
			this.population.push(individual);
		}
	}

	computeFitness() {
		let populationFitness = [];
		let bestFitness = -1;
		let bestFitnesssPosition;

		for(const [index, individual] of this.population.entries()) {
			let fitness = 0;
			for(let i=0; i<individual.length; i++) {
				if(individual[i] === TARGET.charAt(i)) {
					fitness++;
				}
			}
			populationFitness.push(fitness);

			if(bestFitness < fitness) {
				bestFitness = fitness;
				bestFitnesssPosition = index;
			}
		}

		return {populationFitness, bestFitness, bestFitnesssPosition};
	}

	buildMatingPool(populationFitness) {
		let matingPool = [];

		for(const [index, fitness] of populationFitness.entries()) {
			for(let i=0; i<fitness; i++) {
				matingPool.push(index);
			}
		}

		return matingPool;
	}

	mutate() {
		let roll;

		for(let individual of this.population) {
			for(let i=0; i<individual.length; i++) {
				roll = random();
				if(roll < this.mutationRate) {
					individual[i] = POOL.charAt(random(0, POOL.length));
				}
			}
		}
	}

	mate(populationFitness) {
		const matingPool = this.buildMatingPool(populationFitness);

		let nextPopulation = [];

		for(let i=0; i<this.populationSize; i++) {
			let father = this.population[matingPool[int(random(0, matingPool.length))]];
			let mother = this.population[matingPool[int(random(0, matingPool.length))]];
			let child = this.crossover(father, mother);

			nextPopulation.push(child);
		}

		this.population = nextPopulation;
	}

	crossover(father, mother) {
		let child = [];
		for(let i=0; i<father.length; i++) {
			let roll = random();
			if(roll < 0.5) {
				child.push(father[i]);
			}
			else {
				child.push(mother[i]);
			}
		}

		return child;
	}

	stringifyPopulation() {
		let formated = '';
		for(let individual of this.population) {
			let word = individual.join('');
			formated += word + '\n';
		}
		return formated;
	}
}

let ga;
let fit;
let capturer;
let btn;
let counter = 1;
let img;

function randomColor() {
	return [random(0, 255), random(0, 255), random(0, 255)];
}

function preload() {
	img = loadImage('../assets/darwin.jpg');
  }

function setup() {
	frameRate(15);
	createCanvas(windowWidth-200, windowHeight-50);
	btn = document.createElement('button');
	btn.textContent = "start recording";
	document.body.appendChild(btn);
	btn.onclick = record;
	ga = new GeneticAlgorithm(TARGET, POPULATION_SIZE, MUTATION_RATE);
}

function draw() {
	fit = ga.computeFitness();
	if(fit.bestFitness < TARGET.length) {
		ga.generation++;
		ga.mutate();
		ga.mate(fit.populationFitness)
	}

	background(25);
	image(img, windowWidth / 4, windowHeight / 1.5, img.width / 2.5, img.height / 2.5);

	fill(...randomColor());
	textFont('Gloria Hallelujah', 20);
	text(ga.stringifyPopulation(), windowWidth*0.6 - 50, 20, windowWidth*0.6 -50, windowHeight - 60);

	let bestPhrase = ga.population[fit.bestFitnesssPosition].join('')
	bestPhrase = bestPhrase.slice(0, 7) + '\n' +
				 bestPhrase.slice(7, 13) + '\n' +
				 bestPhrase.slice(13, 28) + '\n' +
				 bestPhrase.slice(28, bestPhrase.length);

	fill(...randomColor());
	textFont('Indie Flower', 100);
	text(bestPhrase, 20, windowHeight*0.1, windowWidth, windowHeight);

	fill(...randomColor());
	textFont('Indie Flower', 30);
	text(`Generation: ${ga.generation}`, 20, windowHeight*0.76, windowWidth * 0.3, windowHeight * 0.7)
	text(`Best fitness: ${fit.bestFitness}`, 20, windowHeight*0.80, windowWidth * 0.3, windowHeight * 0.7);
	text(`Average fitness: ${(100*(fit.populationFitness.reduce(( p, c )=> p + c, 0) / fit.populationFitness.length)/TARGET.length).toFixed(2)}%`, 20, windowHeight*0.84, windowWidth * 0.3, windowHeight * 0.7);

	if(capturer){
		capturer.capture(document.getElementById('defaultCanvas0'));
		if(counter == 8){
		  frameRate(0);
		  btn.click();
		}
	}
}

function record() {
	capturer = new CCapture({ format: 'webm' , framerate: 15} );
	capturer.start();
	btn.textContent = 'stop recording';

	btn.onclick = e => {
	  capturer.stop();
	  capturer.save();
	  capturer = null;

	  btn.textContent = 'start recording';
	  btn.onclick = record;
	};
  }
