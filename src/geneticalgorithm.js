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
