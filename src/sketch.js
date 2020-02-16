const POOL = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ ';
const POPULATION_SIZE = 1500;
const MUTATION_RATE = 0.005;
const TARGET = 'PEOPLE DOING STRANGE THINGS WITH SOFTWARE'

let ga;
let fit;
let counter = 1;
let img;

function randomColor() {
	return [random(0, 255), random(0, 255), random(0, 255)];
}

function preload() {
	img = loadImage('../assets/darwin.jpg');
  }

function setup() {
	createCanvas(windowWidth-200, windowHeight-50);
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
}
