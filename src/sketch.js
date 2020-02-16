/**
 * State
 */

// genetic algorithm parameters
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ ';
const POPULATION_SIZE = 1500;
const MUTATION_RATE = 0.005;
const TARGET = 'PEOPLE DOING STRANGE THINGS WITH SOFTWARE'

// sketch containers
let ga;
let fit;
let counter = 1;
let img;

/**
 * I generate a random color.
 *
 * Returns:
 * 	randomColor(Array): generated color
 */
function randomColor()
{
	return [random(0, 255), random(0, 255), random(0, 255)];
}

/**
 * p5.js preload assets function.
 */
function preload()
{
	img = loadImage('../assets/darwin.jpg');
}


/**
 * p5.js setup function.
 */
function setup()
{
	// create drawing canvas
	createCanvas(windowWidth-200, windowHeight-50);

	// create genetic algorithm abstraction
	ga = new GeneticAlgorithm(TARGET, POPULATION_SIZE, MUTATION_RATE);
}

/**
 * p5.js loop.
 */
function draw()
{
	// compute current population fitness
	fit = ga.computeFitness();

	// target genotype not reached: mate next generation
	if(fit.bestFitness < TARGET.length) {
		ga.generation++;
		ga.mutate();
		ga.mate(fit.populationFitness)
	}

	// clear sketch
	background(25);

	// draw Darwin's image
	image(img, windowWidth / 4, windowHeight / 1.5, img.width / 2.5, img.height / 2.5);

	// draw population string representation
	fill(...randomColor());
	textFont('Gloria Hallelujah', 20);
	text(ga.stringifyPopulation(), windowWidth*0.6 - 50, 20, windowWidth*0.6 -50, windowHeight - 60);

	// create best genotype string representation
	let bestPhrase = ga.population[fit.bestFitnesssPosition].join('')
	bestPhrase = bestPhrase.slice(0, 7) + '\n' +
				 bestPhrase.slice(7, 13) + '\n' +
				 bestPhrase.slice(13, 28) + '\n' +
				 bestPhrase.slice(28, bestPhrase.length);

	// draw it
	fill(...randomColor());
	textFont('Indie Flower', 100);
	text(bestPhrase, 20, windowHeight*0.1, windowWidth, windowHeight);

	// draw current population stats
	fill(...randomColor());
	textFont('Indie Flower', 30);
	text(`Generation: ${ga.generation}`, 20, windowHeight*0.76, windowWidth * 0.3, windowHeight * 0.7)
	text(`Best fitness: ${fit.bestFitness}`, 20, windowHeight*0.80, windowWidth * 0.3, windowHeight * 0.7);
	text(`Average fitness: ${(100*(fit.populationFitness.reduce(( p, c )=> p + c, 0) / fit.populationFitness.length)/TARGET.length).toFixed(2)}%`, 20, windowHeight*0.84, windowWidth * 0.3, windowHeight * 0.7);
}
