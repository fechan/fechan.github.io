---
layout: post
categories: [HamNoSys, sign languages, linguistics]
title: "HamNoSys symbol name → HamNoSys Web Component"
tldr: 'I wrote a quick little Web Component for rendering HamNoSys symbol names into their corresponding HamNoSys characters that you can put on any web page.'
---

The [Hamburg Notation System (HamNoSys)](https://www.sign-lang.uni-hamburg.de/dgs-korpus/hamnosys-97.html) is a sign language transcription system that aims to be able to transcribe as many sign language as possible. It's not ASCII (or even Unicode) compatible, so it's cumbersome to type. However, every symbol has an ASCII compatible name― for example, `hamfinger` represents <ham-signs>hamfinger2</ham-signs>.

Since I'm making a signed conlang and wanted to publish the grammar as a webpage, I wrote a little Web Component to render HamNoSys symbol names into HamNoSys, which adds a custom `<ham-signs>` tag that lets you type HamNoSys symbol names and turn them into their HamNoSys symbols, like you would in the HamNoSys LaTeX package.

You can use the [HamNoSys input palette](https://www.sign-lang.uni-hamburg.de/hamnosys/input/) to get the symbol names if you don't know them.

To write HamNoSys with this, use the `<ham-signs></ham-signs>` tags with HamNoSys symbol names between them. For example, the <a href="https://www.sign-lang.uni-hamburg.de/korpusdict/bags/bag84.html">DGS sign <span class="small-caps">AUGE</span> *eye*</a> would be written in HTML as follows:

```html
<ham-signs>
    hamfinger2,hamextfingerul,hampalmdl,hameyes,hamlrat,hambetween,hamcheek,hamlrat,hamclose,hammovei,hamtouch,hamrepeatfromstart
</ham-signs>
```

Which would be rendered as:

<ham-signs class="text-3xl">
    hamfinger2,hamextfingerul,hampalmdl,hameyes,hamlrat,hambetween,hamcheek,hamlrat,hamclose,hammovei,hamtouch,hamrepeatfromstart
</ham-signs>

## Adding it to your page
The following code is available under a free and open source [MIT license](https://opensource.org/license/MIT), so you can use it for free without attribution, for both commercial or non-commercial purposes.

### CSS for displaying HamNoSys
To use it, first make sure you have the [HamNoSys font](https://www.fdr.uni-hamburg.de/record/9725#.YgKI8hNKhpI) and add the following styles to your page:

```css
@font-face {
  font-family: HamNoSys;
  src: url('HamNoSysUnicode.ttf');
  size-adjust: 180%;
}

ham-signs {
  font-family: HamNoSys;
}
```

### The Web Component script
After adding the styles, add the following `<script>` tag to your page, just before the closing `</body>` tag:

<script src="https://gist.github.com/fechan/fc7e98523dcc45da956c11bbccc8cc7e.js"></script>

<script>
(function() {
  const HAMNOSYS_NAMES = {
    "hamfist": "",
    "hamflathand": "",
    "hamfinger2": "",
    "hamfinger23": "",
    "hamfinger23spread": "",
    "hamfinger2345": "",
    "hampinch12": "",
    "hampinchall": "",
    "hampinch12open": "",
    "hamcee12": "",
    "hamceeall": "",
    "hamceeopen": "",
    "hamthumboutmod": "",
    "hamthumbacrossmod": "",
    "hamthumbopenmod": "",
    "hamdoublebent": "",
    "hamfingerstraightmod": "",
    "hamfingerbendmod": "",
    "hamfingerhookmod": "",
    "hamdoublehooked": "",
    "hamthumb": "",
    "hamindexfinger": "",
    "hammiddlefinger": "",
    "hamringfinger": "",
    "hampinky": "",
    "hambetween": "",
    "hamfingertip": "",
    "hamfingernail": "",
    "hamfingerpad": "",
    "hamfingermidjoint": "",
    "hamfingerbase": "",
    "hamfingerside": "",
    "hamextfingeru": "",
    "hamextfingero": "",
    "hamextfingerul": "",
    "hamextfingerur": "",
    "hamextfingerol": "",
    "hamextfingeror": "",
    "hamextfingerl": "",
    "hamextfingerr": "",
    "hamextfingerdl": "",
    "hamextfingerdr": "",
    "hamextfingeril": "",
    "hamextfingerir": "",
    "hamextfingerd": "",
    "hamextfingeri": "",
    "hamorirelative": "",
    "hampalmu": "",
    "hamextfingerui": "",
    "hamextfingeruo": "",
    "hampalmul": "",
    "hampalmur": "",
    "hampalml": "",
    "hampalmr": "",
    "hamextfingerdi": "",
    "hamextfingerdo": "",
    "hampalmdl": "",
    "hampalmdr": "",
    "hampalmd": "",
    "hamheadtop": "",
    "hamhead": "",
    "hamforehead": "",
    "hamnose": "",
    "hamnostrils": "",
    "hamlips": "",
    "hamtongue": "",
    "hamteeth": "",
    "hamchin": "",
    "hamunderchin": "",
    "hamneck": "",
    "hamshouldertop": "",
    "hamshoulders": "",
    "hamchest": "",
    "hamstomach": "",
    "hambelowstomach": "",
    "hameyebrows": "",
    "hameyes": "",
    "hamear": "",
    "hamearlobe": "",
    "hamcheek": "",
    "hamupperarm": "",
    "hamelbowinside": "",
    "hamlowerarm": "",
    "hamwristback": "",
    "hamthumbball": "",
    "hampalm": "",
    "hamhandback": "",
    "hamthumbside": "",
    "hampinkyside": "",
    "hamclose": "",
    "hamtouch": "",
    "haminterlock": "",
    "hamcross": "",
    "hambrushing": "",
    "hambehind": "",
    "hamarmextended": "",
    "hamlrbeside": "",
    "hamlrat": "",
    "hamneutralspace": "",
    "hammoveu": "",
    "hammoveo": "",
    "hammoveul": "",
    "hammoveur": "",
    "hammoveol": "",
    "hammoveor": "",
    "hammovel": "",
    "hammover": "",
    "hammovedl": "",
    "hammovedr": "",
    "hammoveil": "",
    "hammoveir": "",
    "hammoved": "",
    "hammovei": "",
    "hamspace": " ",
    "hamfast": "",
    "hamslow": "",
    "hamtense": "",
    "hamrest": "",
    "hamhalt": "",
    "hammoveui": "",
    "hammoveuo": "",
    "hamrepeatfromstart": "",
    "hamrepeatfromstartseveral": "",
    "hamrepeatcontinue": "",
    "hamrepeatcontinueseveral": "",
    "hamrepeatreverse": "",
    "hamsmallmod": "",
    "hamlargemod": "",
    "hamnomotion": "",
    "hamincreasing": "",
    "hamdecreasing": "",
    "hammovedi": "",
    "hammovedo": "",
    "hamarcl": "",
    "hamarcu": "",
    "hamarcd": "",
    "hamarcr": "",
    "hamwavy": "",
    "hamellipsev": "",
    "hamellipseur": "",
    "hamellipseh": "",
    "hamellipseul": "",
    "hamzigzag": "",
    "hamcircleu": "",
    "hamcircleo": "",
    "hamcircleul": "",
    "hamcircleur": "",
    "hamcircleol": "",
    "hamcircleor": "",
    "hamcirclel": "",
    "hamcircler": "",
    "hamcircledl": "",
    "hamcircledr": "",
    "hamcircleil": "",
    "hamcircleir": "",
    "hamcircled": "",
    "hamcirclei": "",
    "hamstircw": "",
    "hamnodding": "",
    "hamtwisting": "",
    "hamreplace": "",
    "hamstirccw": "",
    "hamswinging": "",
    "hamfingerplay": "",
    "hamclocku": "",
    "hamcircleui": "",
    "hamcircleuo": "",
    "hamclockul": "",
    "hamclockur": "",
    "hamclockl": "",
    "hamclockfull": "",
    "hamclockr": "",
    "hamcircledi": "",
    "hamcircledo": "",
    "hamclockdl": "",
    "hamclockdr": "",
    "hamclockd": "",
    "hamsymmpar": "",
    "hamsymmlr": "",
    "hamsymmlr,hamfingerstraightmod,hamlargemod": "",
    "hamparbegin": "",
    "hamplus": "",
    "hamparend": "",
    "hamalternatingmotion": "",
    "hamnonipsi": "",
    "hamnondominant": "",
    "hametc": "",
    "hamseqbegin": "",
    "hamseqend": "",
    "hamfusionbegin": "",
    "hamfusionend": "",
    "hamaltbegin": "{",
    "hamaltend": "}",
    "hammetaalt": "|",
    "hamcoreftag": "",
    "hamcorefref": "",
    "hamcomma": ",",
    "hamfullstop": ".",
    "hamexclaim": "!",
    "hamquery": "?",
    "hammime": ""
  }

  class HamSigns extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      let hamnosysSent = [];
      for (let sign of this.textContent.split(new RegExp('\\s+'))) {
        if (sign === '') continue;

        let hamnosysSign = '';
        for (let symbolName of sign.split(new RegExp(','))) {
          if (symbolName in HAMNOSYS_NAMES) {
            hamnosysSign = hamnosysSign + HAMNOSYS_NAMES[symbolName];
          } else {
            hamnosysSign = hamnosysSign + symbolName;
          }
        }
        hamnosysSent.push(hamnosysSign);
      }
      this.textContent = hamnosysSent.join(' ');;
    }
  }

  customElements.define("ham-signs", HamSigns);
})();
</script>