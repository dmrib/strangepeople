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
}

let ga;

function setup() {
	createCanvas(windowWidth, windowHeight);

	ga = new GeneticAlgorithm(TARGET, 100);
}

function draw() {

}