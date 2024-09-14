---
title: MiniSign classifiers
layout: minisign
---
## Classifier types
Classifiers are morphemes which denote referents by depicting some aspect of the entity, most commonly using a handshape. For example, the classifier <small-caps>CL:FLAT</small-caps> is a flat hand that can be used to refer to a flat things, like paper.

* **Entity classifiers** use a handshape to represent a semantic property of the entities they refer to.
  * **Body part specifiers** use a handshape to represent a body part of the entities they refer to.
* **Handling classifiers** represent how its referents are handled or picked up.
* **Size and shape specifiers (SASS)** use a tracing motion to represent the size and shape of its referents.

Classifiers are often used to indicate the location of entities relative to each other. For example, if there is a piece of paper and a rock, and the signer signs the flat objects classifier <small-caps>CL:FLAT</small-caps> on top of the fist classifier <small-caps>CL:FIST</small-caps>, it means there is paper on top of the rock.

<figure class="flex items-center flex-col">
  <table class="!w-min">
    <tr>
      <td class="border-b border-canvascream !pb-0">ndh:</td>
      <td class="border-b border-canvascream !pb-0"></td>
      <td colspan=3 class="border-b border-slate-500 !pb-0">CL:FIST<sub>3bottom</sub></td>
    </tr>
    <tr>
      <td>dh:</td>
      <td>ROCK</td>
      <td><div class="w-24"></div></td>
      <td>PAPER</td>
      <td>CL:FLAT<sub>3top</sub></td>
    </tr>
  </table>
  <figcaption><i>"The paper is on top of the rock"</i></figcaption>
</figure>

## Entity classifiers
Entity classifiers use a handshape to represent a semantic property of the entities they refer to. For example, the classifier <small-caps>CL:FLAT</small-caps> can represent a piece of paper because both are flat. A given noun is not always represented by the same classifier; if the piece of paper were crumpled up into a ball, the classifier <small-caps>CL:FIST</small-caps> could be used to represent its new shape.

**Body part specifiers** in MiniSign are considered a subset of entity classifiers, referring to body parts of the entities they refer to, such as <small-caps>CL:LEGS</small-caps> representing the legs of an entity with legs.

Entity classifiers can be used to indicate agreement in both [spatial and agreement verbs](/minisign/verbs#agreement-and-spatial-verbs) by replacing the handshape with the classifier's handshape.

<table>
  <thead>
    <tr>
      <th>Classifier name</th>
      <th>Handshape</th>
      <th>Uses</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CL:FLAT</td>
      <td><ham-signs>hamflathand</ham-signs></td>
      <td>
        <ul>
          <li><b>Flat entities:</b> sheets of paper, books, table tops, napkins</li>
          <li><b>Vehicles:</b> cars, trains, wagons, wheelbarrows</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>CL:FIST</td>
      <td><ham-signs>hamfist</ham-signs></td>
      <td>
          <ul>
            <li><b>Globs and chunky entities:</b> rocks, hard soap, globs of rice</li>
            <li><b>Spherical entities:</b> basketballs, baseballs, planets</li>
          </ul>
      </td>
    </tr>
    <tr>
      <td>CL:LEGS</td>
      <td><ham-signs>hamfinger23spread</ham-signs></td>
      <td>
          <ul>
            <li><b>Entities with legs:</b> people, animals</li>
            <li><b>Entities with two protrusions:</b> scissors</li>
          </ul>
      </td>
    </tr>
    <tr>
      <td>CL:STICK</td>
      <td><ham-signs>hamfinger2,hamthumbacrossmod</ham-signs></td>
      <td>
          <ul>
            <li><b>Long, thin entities:</b> sticks, twigs, rods, rulers</li>
          </ul>
      </td>
    </tr>
  </tbody>
</table>