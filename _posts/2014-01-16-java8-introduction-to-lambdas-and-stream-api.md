---
layout: post
title: Java8 – Introduction to Lambdas and Stream API
---

Yesterday, I attended an awesome conference at the [Toulouse JUG [FR]](http://toulousejug.org/) (an association of Java-lovers in the city of Toulouse, see [Java User Group](https://www.java.net/jugs/java-user-groups)).

The talk was given by [Jose Paumard](http://twitter.com/josepaumard). The subject was Java 8 and more precisely, the Lambdas, the Stream API and the impact on the use of the Collection API. Here are the main points I remembered from this talk.

<!--more-->

![Toulouse JUG](/assets/blog/20140116/java8-takeout-from-toulousejug-photo.jpg)

You can find the whole presentation in french [here](http://fr.slideshare.net/jpaumard/jdk-8-lambdas-streams-collectos-bretagne-tour).

# Lambdas

The lambdas are a clear an concise way to represent a mono-method interface. Our code will be shorter and easier to read so we will save time and money! Let's take a simple example. I have a `Vehicle` which has a number of wheels.

	public class Vehicle {
		private Integer numWheels;

		// Constructor, Getters & Setters
	}

I want to sort a list of vehicles and write a comparator:

	List<Vehicle> vehicles = ....;

	Collections.sort(
		vehicles,
		new Comparator<Vehicle>() {
			@Override
			public int compare(Vehicle v1, Vehicle v2) {
				return v1.getNumWheels().compareTo(o2.getNumWheels());
			}
		}
	);

It works but it's a lot of code for a small business logic... Here is how it can be written with lambdas:

	List<Vehicle> vehicles = ....;

	Collections.sort(
		vehicles,
		(Vehicle v1, Vehicle v2) -> v1.getgetNumWheels().compareTo(o2.getNumWheels());
	);

	// Or even shorter:

	Collections.sort(
		vehicles,
		v1, v2 -> v1.getgetNumWheels().compareTo(o2.getNumWheels());
	);

It is shorter, as understandable as the Java 7 version and more readable.

# Streams

If you program in Java, you make at least a daily use of the `Collection API` which contains the lists, the sets, the maps and all their implementations.

With the brand new **Stream API**, we will be able to change the way we usually go throught Collections in order to simplify the code, **parallelize** our algorithms and adapt to other data sources (sockets, databases, etc.). Let's take an example.

We have a list of `Vehicle`. Each `Vehicle` can transport a number of passengers and has a number of wheels.

	public class Vehicle {
		private Integer numPassengers;
		private Integer numWheels;

		// Constructor, Getters & Setters
	}

We want to get the sum of the passengers that we can transport with the vehicles which have at least 1 wheel. The classic method would be:

	List<Vehicle> vehicles = ....;
	int sum = 0;
	for (Vehicle vehicle : vehicles) {
		if (vehicle.getNumWheels() > 0) {
			sum += vehicle.getNumPassengers();
		}
	}

But we can do better! This process can be modelized with the [Map-Filter-Reduce pattern](http://en.wikipedia.org/wiki/MapReduce).

The `Filter` will determine if the `Vehicle` should be excluded or not, the `Mapper` will extract from a `Vehicle` its number of passenger (an `Integer`) and the `Reducer` will perform the sum (important: `Red(Red(a, b), c) = Red(a, Red(b, c))`, this will enable us to crawl our collection iteratively).

Let's write it with interfaces:

	public interface Mapper<T, K> {
		public K map(T t);
	}

	public interface Filter<T> {
		public boolean filter(T t);
	}

	public interface Reducer<K> {
		public K map(K t1, K t2);
	}

And implement our example with the Stream API:

	List<Vehicle> vehicles = ....; // Not null and not empty :)

	Integer sum =
	vehicles.stream() // We create a stream on the collection
		// Only keep when 1 wheel or more
			.filter(v -> v.getNumWheels() > 0)
		 // Retrieve number of passengers
			.map(v -> v.getNumPassengers())
		// We add the passengers of each couple of vehicles
			.reduce(v1, v2 -> v1.getNumPassengers() + v2.getNumPassengers());

It is WAAAAY more elegant than our loop and it has an enormous advantage: the Java 7 example tells exactly to the compiler *how* the algorithm should be executed. Here, in Java 8, I only specify *what* I want to do and the compiler is free to implement it in its own way. By the way, the last line could be replaced by a built-in method: `.sum()` :)

With a `Reducer` which respects the previous formula (which is associative and commutative), we can go through our streams in any order... so we can parallelize our code!

	vehicles.stream().parallel() 			// The JVM handles the rest!
		.filter(v -> v.getNumWheels() > 0)
		.map(v -> v.getNumPassengers())
		.reduce(v1, v2 -> v1.getNumPassengers() + v2.getNumPassengers());

Simple, isn't it?

There are a lot of operation for each category which are already included in the JDK, for example: `collect` which retrieve the results in a collection, `sum`, `min`, `max`, etc.

# Conclusion

During the conference, we talked about a lot of other things such as performance, contention points in the parallelization and Jose gave us lots of interesting examples. I think there is a lot to learn in order to master Java 8 but the challenge seems exciting!

It is the biggest modification of the way we handle the collections since the creation of the Collection API 15 years ago so I expect a lot of bugs, training and hard work to handle this properly :)

I will soon write new posts on Java 8 since there are a lot of subjects to talk about: default implementations in interfaces (multiple inheritance?), other formats of lambda expressions, etc.

Did you already try the Java 8 beta?
