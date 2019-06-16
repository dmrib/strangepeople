const POOL = '!@#$%^&*()_+~`|}{[]\:;?><,./-=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TARGET = 'Strange people doing strange things with software.'

class GeneticAlgorithm {
	constructor(target, populationSize) {
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

function setup() {
	createCanvas(windowWidth, windowHeight);

	ga = new GeneticAlgorithm(TARGET, 100);
}

function draw() {
	background(236, 208, 120);
	fill(217,91,67);
	textFont('Gloria Hallelujah', 20);
	text(ga.stringifyPopulation(), windowWidth*0.6, 100, windowWidth*0.6, windowHeight-200);
}