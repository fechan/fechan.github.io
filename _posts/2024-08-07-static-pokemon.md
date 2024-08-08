---
layout: post
categories: [HamNoSys, sign languages, linguistics]
title: "Non-legendary Pokémon with no evolutions or alternate forms"
tldr: 'I calculated a list of them using the SQL database that drives PokéAPI. There is only one such Pokémon from Gen 1.'
---
## tl;dr
Here, I answer a question from a friend of mine:

> Which non-legendary Gen 1 Pokémon has no alternate forms, or evolutions?

I answered it by downloading the PokéAPI source and building the SQLite database that backs it. I also use it to answer the question for all the other gens as well (mainline games only).

## Assumptions
* "Non-legendary" means non-legendary *and non-mythical* (this will exclude Mew, who is mythical but non-legendary).
* "No evolutions" means no pre-evolutions either. Basically, the entire evolution chain must consist of entirely one Pokémon.
* "No alternate forms" means no permanent or temporary forms. If it appears in the "Form data" section of the Pokémon's Bulbapedia page, it's out.
    * Permanent forms: [Spiky-eared Pichu](https://bulbapedia.bulbagarden.net/wiki/Spiky-eared_Pichu), [Sinnoh Cap Pikachu](https://bulbapedia.bulbagarden.net/wiki/Pikachu_in_a_cap)
    * Temporary forms: [Gigantamax/Mega Charizard](https://bulbapedia.bulbagarden.net/wiki/Charizard_(Pok%C3%A9mon)#Form_data)
* Shiny versions of Pokémon do not count, otherwise we would eliminate [most obtainable Pokémon](https://bulbapedia.bulbagarden.net/wiki/List_of_unobtainable_Shiny_Pok%C3%A9mon). Shinies are also not listed in the "Form data" section in Bulbapedia.

## The Pokémon
{% for generation in (1..9) %}
  <h3>Generation {{generation}}</h3>
  <div class="grid grid-cols-3 md:grid-cols-5">
    {% for pokemon in site.data.static-pokemon %}
      {% assign a = generation | plus: 0 %}
      {% assign b = pokemon.generation | plus: 0 %}
      {% if a == b %}
        <div class="text-center">
          <a href="{{ 'https://bulbapedia.bulbagarden.net/wiki/' | append: pokemon.name }}">
            <img src="{{ '/assets/images/pokemon/' | append: pokemon.id | append: '.png' }}" class="!my-0 !mx-auto"/>
            {{ pokemon.name }}
          </a>
        </div>
      {% endif %}
    {% endfor %}
  </div>
{% endfor %}

## SQL query
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