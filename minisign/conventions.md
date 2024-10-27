---
title: MiniSign notational conventions
layout: minisign
---
## Terms
* **Iconicity** refers to the ability for sign languages to directly represent aspects of referents using its phonology. For example, the MiniSign word [<small-caps>SCISSORS</small-caps>](/minisign/dictionary#scissors) is signed by making a handshape that is iconic of a pair of scissors.
* **Non-manual markers** or **non-manuals** refers to morphemes signed without the hands, that may be co-articulated at the same time as manual signs.

## Phonological transcription
The MiniSign reference grammar uses the [Hamburg Notation System](https://web.dgs-korpus.de/hamnosys-97.html) (HamNoSys) as its transcription system.

<details class="conlanger-note" markdown="1">
  <summary>Conlanger note: Transcription systems</summary>

  There is no consensus for how to transcribe sign languages, and there are many competing options including HamNoSys, Sutton's SignWriting, and DJP's [SLIPA](https://www.dedalvs.com/slipa.html), which was created specifically so DJP could make a signed conlang.

  I personally chose to use HamNoSys because it's commonly seen in research and is used by my sign language linguistics professor, Dr. Rozelle, at the University of Washington. It tries to have a symbol for every possible constituent (unlike the IPA, which only assigns a symbol for phonemes that are attested in a language), which is handy for conlanging.

  Although strictly speaking it is not ASCII-compatible and needs a font to display, each symbol has a standardized ASCII-compatible name like `hamfinger23` (for <ham-signs>hamfinger23</ham-signs>), so I write my dictionary with those and [automatically convert it with JavaScript](https://fredchan.org/blog/hamnosys-renderer/) if it needs to be displayed on my website.
</details>

## Glossing conventions
### Manual glosses
Manual signs are written in <small-caps>SMALL CAPS</small-caps>.

<table>
  <tr>
    <th>Gloss</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td><small-caps>INDEX</small-caps><sub>3</sub></td>
    <td>A pointing sign towards a location in space. The subscript "1" indicates it points towards the signer, "2" indicates it points to the addressee, and "3" for everything else. "3" can be arbitrarily subdivided with a letter, such as "3a", "3b", etc.</td>
  </tr>
  <tr>
    <td><sub>1</sub><small-caps>SIGN</small-caps><sub>3</sub></td>
    <td>A sign incorporating two locations, usually a motion from the left subscript to the right subscript.</td>
  </tr>
  <tr>
    <td><small-caps>SIGN++</small-caps></td>
    <td>A reduplicated sign.</td>
  </tr>
  <tr>
    <td><small-caps>SIGN-SIGN</small-caps></td>
    <td>A single sign requiring more than one English word to gloss.</td>
  </tr>
  <tr>
    <td><small-caps>SIGN+SIGN</small-caps></td>
    <td>A combination of two signs, or a sign and an affix.</td>
  </tr>
  <tr>
    <td><small-caps>S-I-G-N</small-caps></td>
    <td>A fingerspelled sign.</td>
  </tr>
  <tr>
    <td><small-caps>CL:TYPE</small-caps></td>
    <td>A <a href="/minisign/classifiers">classifier</a> sign with the given type, such as <small-caps>CL:FLAT</small-caps> for the flat objects classifier.</td>
  </tr>
</table>

### Both hands signing different things
Sometimes MiniSign sentences can have different signs being articulated in each hand. In this case, two gloss tiers are used to accommodate this: one labelled *dh* (dominant hand) and the other labelled *ndh* (non-dominant hand).

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

### Non-manual glosses
Non-manual markers are written in lower case, in a tier above the manual signs. They have a line underneath, indicating the duration of the non-manual marker.

<figure class="flex items-center flex-col">
  <table class="!w-min">
    <tr>
      <td class="border-b border-canvascream"></td>
      <td class="border-b border-slate-600 text-end !pb-0">neg</td>
    </tr>
    <tr>
      <td>SUN</td>
      <td>SHINE</td>
    </tr>
  </table>
  <figcaption><i>"The sun is not shining"</i></figcaption>
</figure>

MiniSign uses the following non-manual glosses:

<table>
  <tr>
    <th>Gloss</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td>neg</td>
    <td>A side-to-side headshake marking negation</td>
  </tr>
  <tr>
    <td>pfv</td>
    <td>MiniSign <a href="/minisign/verbs#mouthed-pu-pfv">perfective marker</a></td>
  </tr>
  <tr>
    <td>hab</td>
    <td>MiniSign <a href="/minisign/verbs#habitual-hab">habitual marker</a></td>
  </tr>
</table>