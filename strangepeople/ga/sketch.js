const POOL = '!@#$%^&*()_+~`|}{[]\:;?><,./-=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TARGET = 'Strange people doing strange things with software.'

class GeneticAlgorithm {
	constructor(target, populationSize) {
		this.generation = 0;
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
	fill(217, 91, 67);
	textFont('Gloria Hallelujah', 20);
	text(ga.stringifyPopulation(), windowWidth*0.6, 100, windowWidth*0.6, windowHeight-200);

	let fit = ga.computeFitness()
	let bestPhrase = ga.population[fit.bestFitnesssPosition].join('')
	bestPhrase = bestPhrase.slice(0, 15) + '\n' +
				 bestPhrase.slice(15, 21) + '\n' +
				 bestPhrase.slice(21, 36) + '\n' +
				 bestPhrase.slice(36, bestPhrase.length);


	fill(83, 119, 122);
	textFont('Indie Flower', 100);
	text(bestPhrase, 20, windowHeight*0.1, windowWidth * 0.3, windowHeight * 0.6);

	fill(84, 36, 55);
	textFont('Indie Flower', 30);
	text(`Generation: ${ga.generation}`, 20, windowHeight*0.78, windowWidth * 0.3, windowHeight * 0.7)
	text(`Best fitness: ${fit.bestFitness}`, 20, windowHeight*0.82, windowWidth * 0.3, windowHeight * 0.7);
	text(`Average fitness: ${100*(fit.populationFitness.reduce(( p, c )=> p + c, 0) / fit.populationFitness.length)/TARGET.length}%`, 20, windowHeight*0.86, windowWidth * 0.3, windowHeight * 0.7);

}