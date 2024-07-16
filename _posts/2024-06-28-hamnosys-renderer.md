---
layout: post
categories: [HamNoSys, sign languages, linguistics]
title: "HamNoSys symbol name → HamNoSys Web Component"
tldr: 'I wrote a quick little Web Component for rendering HamNoSys symbol names into their corresponding HamNoSys characters that you can put on any web page.'
---

The [Hamburg Notation System (HamNoSys)](https://www.sign-lang.uni-hamburg.de/dgs-korpus/hamnosys-97.html) is a sign language transcription system that aims to be able to transcribe as many sign languages as possible. It's not ASCII (or even Unicode) compatible, so it's cumbersome to type. However, every symbol has an ASCII compatible name― for example, `hamfinger2` represents <ham-signs>hamfinger2</ham-signs>.

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

<div>
  <template shadowrootmode="open">
    <script src="https://gist.github.com/fechan/fc7e98523dcc45da956c11bbccc8cc7e.js"></script>
  </template>
</div>

<script src="{{ '/assets/js/hamnosys-elem.js' | absolute_url }}"></script>