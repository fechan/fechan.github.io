---
layout: post
categories: [HamNoSys, sign languages, linguistics]
title: "Non-legendary Pokémon with no evolutions or alternate forms"
tldr: 'I calculated a list of them using the SQL database that drives PokéAPI. There is only one such Pokémon from Gen 1.'
---
## tl;dr
Here, I answer a question from a friend of mine:

> Which non-legendary Gen 1 Pokémon has no alternate forms or evolutions?

I answered it by downloading the PokéAPI source and building the SQLite database that backs it. I also use it to answer the question for all the other gens as well (mainline games only).

**Note**: When this article was published, the latest generation was [Gen 9 (Scarlet/Violet)](https://bulbapedia.bulbagarden.net/wiki/Generation_IX).

## Assumptions
* **Non-legendary** means non-[legendary](https://bulbapedia.bulbagarden.net/wiki/Legendary_Pok%C3%A9mon) *and non-[mythical](https://bulbapedia.bulbagarden.net/wiki/Mythical_Pok%C3%A9mon)*.
    * Mew is technically mythical, but non-legendary, but we are excluding him anyway.
* **No evolutions** means no pre-evolutions either. Basically, the entire evolution chain must consist of entirely one Pokémon.
* **No alternate forms** means no permanent or temporary forms. If it appears in the "Form data" section of the Pokémon's Bulbapedia page, it's out.
    * Permanent forms: [Spiky-eared Pichu](https://bulbapedia.bulbagarden.net/wiki/Spiky-eared_Pichu), [Sinnoh Cap Pikachu](https://bulbapedia.bulbagarden.net/wiki/Pikachu_in_a_cap)
    * Temporary forms: [Gigantamax/Mega Charizard](https://bulbapedia.bulbagarden.net/wiki/Charizard_(Pok%C3%A9mon)#Form_data)
* [**Shiny versions**](https://bulbapedia.bulbagarden.net/wiki/Shiny_Pok%C3%A9mon) of Pokémon do not count, otherwise we would eliminate [most obtainable Pokémon](https://bulbapedia.bulbagarden.net/wiki/List_of_unobtainable_Shiny_Pok%C3%A9mon). Shinies are also not listed in the "Form data" section in Bulbapedia.
* [**Paradox Pokémon**](https://bulbapedia.bulbagarden.net/wiki/Paradox_Pok%C3%A9mon) also do not count, as they are neither evolutions nor forms of their present-timeline counterparts.
    * For instance, [Delibird](https://bulbapedia.bulbagarden.net/wiki/Delibird_(Pok%C3%A9mon)) can never evolve into or out of [Iron Bundle](https://bulbapedia.bulbagarden.net/wiki/Iron_Bundle_(Pok%C3%A9mon)), and Iron Bundle is not a form of Delibird because it has a different Pokédex number and therefore a separate Pokémon.

## The Pokémon
{% for generation in (1..9) %}
  <h3>Generation {{generation}}</h3>
  <div class="grid grid-cols-3 md:grid-cols-5">
    {% for pokemon in site.data.static-pokemon %}
      <!-- HACK: stupid and dumb hack to make jekyll compare them as numbers. for some reason to_i doesn't work -->
      {% assign a = generation | plus: 0 %}
      {% assign b = pokemon.generation | plus: 0 %}
      {% if a == b %}
        <div class="text-center">
          <a href="{{ 'https://bulbapedia.bulbagarden.net/wiki/' | append: pokemon.name }}">
            <img src="{{ '/assets/images/pokemon/' | append: pokemon.id | append: '.png' }}" class="!my-0 !mx-auto" height=96 width=96/>
            {{ pokemon.name }}
          </a>
        </div>
      {% endif %}
    {% endfor %}
  </div>
{% endfor %}

## Try it yourself
You *could* try to generate this data using a series of API calls to PokéAPI, but I didn't want to spam their servers with lots of requests. I decided to download the [source code](https://github.com/PokeAPI/pokeapi), which includes the data it's backed by, and build the SQLite database. It's actually pretty simple.

Assuming you have `make`, SQLite, and Python >= 3.10 installed locally, all you need to do after cloning the repo with `--recurse-submodules` is run:
```bash
make install && make setup && make build-db
```

It might take a few minutes to build the database, but after that, `db.sqlite3` should appear in the repo's root containing all the data.

### SQL query
The SQL query I wrote to answer the question is as follows:

```sql
SELECT species.name, generation.id AS generation FROM pokemon_v2_evolutionchain evochain
	JOIN pokemon_v2_pokemonspecies species ON species.evolution_chain_id = evochain.id
	JOIN pokemon_v2_pokemon pokemon ON pokemon.pokemon_species_id = species.id 
	JOIN pokemon_v2_pokemonform form ON pokemon.id = form.pokemon_id 
	JOIN pokemon_v2_versiongroup vergroup ON form.version_group_id = vergroup.id
	JOIN pokemon_v2_generation generation ON vergroup.generation_id = generation.id
WHERE species.is_legendary = FALSE 
	AND species.is_mythical = FALSE
GROUP BY evochain.id
HAVING COUNT(DISTINCT form.id) = 1
ORDER BY MIN(species.id)
```