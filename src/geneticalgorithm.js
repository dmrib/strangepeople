/**
 * Genetic algorithm abstraction.
 */

class GeneticAlgorithm
{
    /**
     * Constructor.
     *
     * Args:
     *  target(string): evolution target string
     *  populationSize(number): size of gene pool
     *  mutationRate(number): mutation rate percentage
     *
     * Returns:
     *  undefined.
     */
    constructor(target, populationSize, mutationRate)
    {
        // store components
		this.generation = 0;
		this.mutationRate = mutationRate;
		this.populationSize = populationSize;
        this.population = [];

        // create initial gene pool
		this.createInitialPopulation();
	}

    /**
     * I create my initial gene pool.
     *
     * Returns:
     *  undefined.
     */
    createInitialPopulation()
    {
        // for the entire population size
        for(let i=0; i<this.populationSize; i++)
        {
            // create empty individual genotype
            let individual = [];

            // create random gene until target size is met
            for(let j=0; j<TARGET.length; j++)
            {
				individual.push(POOL.charAt(random(0, POOL.length)));
            }

            // add individual genotype to gene pool
			this.population.push(individual);
		}
	}

    /**
     * I compute the fitness of my gene pool.
     *
     * Returns:
     *  fitness(object): object containing fitness status info
     */
    computeFitness()
    {
        // create fitness values container
        let populationFitness = [];

        // setup best fitness found value
        let bestFitness = -1;

        // setup best fitness index container
		let bestFitnesssPosition;

        // for each individual in population
        for(const [index, individual] of this.population.entries())
        {
            // start fitness score counter
            let fitness = 0;

            // for each gene in individual's genotype
            for(let i=0; i<individual.length; i++)
            {
                // gene matches target: increase fitness score counter
                if(individual[i] === TARGET.charAt(i))
                {
					fitness++;
				}
            }

            // add individual fitness to report
			populationFitness.push(fitness);

            // new best fitness found: update report
            if(bestFitness < fitness)
            {
				bestFitness = fitness;
				bestFitnesssPosition = index;
			}
		}

        // return fitness report
		return {populationFitness, bestFitness, bestFitnesssPosition};
	}

    /**
     * I build this generation mating pool.
     *
     * Args:
     *  populationFitness(Array): population fitness values
     *
     * Returns:
     *  matingPool(Array): individuals indexes for mating
     */
    buildMatingPool(populationFitness)
    {
        // initialize mating pool
		let matingPool = [];

        // for entry in population fitness report
        for(const [index, fitness] of populationFitness.entries())
        {
            // replicate individual in pool based on fitness values
            for(let i=0; i<fitness; i++)
            {
				matingPool.push(index);
			}
		}

        // return mating pool
		return matingPool;
	}

    /**
     * I apply mutation in my current population.
     *
     * Returns:
     *  undefined.
     */
    mutate()
    {
        // for each individual of population
        for(let individual of this.population)
        {
            // for each gene fo individual
            for(let i=0; i<individual.length; i++)
            {
                // get random value between 0 and 1
                const roll = random();

                // random value is less than mutation rate: mutate individual
                if(roll < this.mutationRate)
                {
					individual[i] = POOL.charAt(random(0, POOL.length));
				}
			}
		}
	}

    /**
     * I mate my current population.
     *
     * Args:
     *  populationFitness: population fitness values
     *
     * Returns:
     *  undefined.
     */
    mate(populationFitness)
    {
        // build current mating pool
		const matingPool = this.buildMatingPool(populationFitness);

        // create next population container
		let nextPopulation = [];

        // until next population is fully created
        for(let i=0; i<this.populationSize; i++)
        {
            // select a father
            let father = this.population[matingPool[int(random(0, matingPool.length))]];

            // select a mother
            let mother = this.population[matingPool[int(random(0, matingPool.length))]];

            // create child
			let child = this.crossover(father, mother);

            // add child to next population
			nextPopulation.push(child);
		}

        // update population
		this.population = nextPopulation;
	}

    /**
     * I crossover two genotypes.
     *
     * Args:
     *  father(Array): father genotype
     *  mother(Array): mother genotype
     *
     * Returns:
     *  child(Array): combined genotype
     */
    crossover(father, mother)
    {
        // create child container
        let child = [];

        // for genotype size
        for(let i=0; i<father.length; i++)
        {
            // get random value between 0 and 1
            let roll = random();

            // random value is lesser than threshold: get father's gene
            if(roll < 0.5)
            {
				child.push(father[i]);
            }

            // random value is higher than threshold: get mother's gene
            else
            {
				child.push(mother[i]);
			}
		}

        // return child
		return child;
	}

    /**
     * I create a single string representation of my population.
     *
     * Returns:
     *  formated:
     */
    stringifyPopulation()
    {
        // setup string representation
        let formatted = '';

        // for each individual of population
        for(let individual of this.population)
        {
            // get single string genotype representation
            let genotype = individual.join('');

            // add it to population representation
			formatted += genotype + '\n';
        }

        // return population string representation
		return formatted;
	}
}
