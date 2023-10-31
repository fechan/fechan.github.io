---
layout: post
categories: [minecraft, WolframAlpha, Mathematica, J/Link]
title: "Mathematikka: WolframAlpha in Minecraft"
---
## tl;dr
I put WolframAlpha in Minecraft by writing [Mathematikka](https://github.com/fechan/Mathematikka), a Bukkit plugin that queries Mathematica via J/Link to get WolframAlpha results.

<div style="display: flex; justify-content: center">
    <video controls width="500">
        <source src="/blog/assets/images/wolframinecraft.mp4"
                type="video/mp4">

        Sorry, your browser doesn't support embedded videos.
    </video>
</div>

## Motivation
As a kid, I was always told to stop playing video games. "Video games will rot your brains," they said. "Video games are why your generation is dumb," they said. On the other hand, they never said the same of homework. As a kid, it always felt like adults worshiped school and homework, and begrudgingly I'd slave away at rows and rows of arithmetic problems. "What if my homework *was* video games?" I thought, "Wouldn't that be great?"

Now, with the power of the [Mathematikka Bukkit plugin](https://github.com/fechan/Mathematikka), you too can claim to do your homework while building dirt houses! Simply get a book and quill, write something you want to give WolframAlpha, sign the book with the title "WolframAlpha," and throw it on the ground. Within seconds*, WolframAlpha output will appear before your very eyes!

\* Computation time may vary depending on complexity of WolframAlpha request and size of response

## How it works
When the signed book and quill hits the ground, it asks a [Mathematica](https://www.wolfram.com/mathematica/) Kernel (which evaluates [Wolfram Language](https://www.wolfram.com/language/)) to send a request to WolframAlpha. Since it uses Mathematica, you have to have Mathematica installed on the computer that's running the Minecraft server, otherwise there's nothing for the plugin to ask for results from. To make Mathematica do things from Java, you use [J/Link](https://reference.wolfram.com/language/JLink/tutorial/Overview.html).

For some reason all the downloads of J/Link by itself have disappeared off the face of the earth, but if you have Mathematica installed, it will be in `MATHEMATICA_INSTALL_DIRECTORY/SystemFiles/Links/JLink/`. All you really need is `JLink.jar` and the `SystemFiles` directory, which contains some kind of native library that JLink can't function without. When you try starting a kernel link, `JLink.jar` will expect `SystemFiles` to be in the same directory as itself and search for the native library in there.

If you're a Bukkit plugin developer and want to use J/Link, read carefully (if you're not, skip the rest of the paragraph): I put these files in `BUKKIT_SERVER_DIRECTORY/Plugins/lib/`, where external libraries for Bukkit plugins are typically added. In order to specify JLink as part of the plugin's classpath, you have to specify the path and name of the jar in the POM.xml, otherwise the manifest it generates will append a version number to the classpath. This is a problem because when looking for `SystemFiles`, JLink finds itself by searching for a `JLink.jar` with that name specifically. *If it's named anything else, it will fail to find the library and stop working!* This gave me about an hour's worth of hair-tearing before I figured it out. The following snippet I put in my POM:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.2.0</version>
    <configuration>
        <archive>
            <manifestEntries>
                <Class-Path>./lib/JLink.jar</Class-Path>
            </manifestEntries>
        </archive>
    </configuration>
</plugin>
```
The rest is smooth sailing. Mathematica has a function called `WolframAlpha[]`, which conveniently lets you give it a text query and gets the results from WolframAlpha (and what's even better is it's WolframAlpha Pro, so if you get Mathematica for free from your institution, you have WA Pro for free as well). If you set the format to `"Image"`, it returns a nicely formatted image that we can cut up and turn into map items in Minecraft. To use J/Link to call this function in the Wolfram Kernel and get the image back, you use this:

```java
String query = "Whatever you want to evaluate in WolframAlpha";
Expr expr = new Expr(
    new Expr(Expr.SYMBOL, "WolframAlpha"),
    new Expr[]{
        new Expr(Expr.STRING, query), new Expr("Image")
    }
);
// "mathematica" is the Wolfram Kernel link that you have to initiate earlier
mathematica.evaluateToImage(expr, 0);
```

This builds the function expression piece by piece, starting with the function reference then all of its parameters. The alternative is to build a string that contains Wolfram Language and pass that into `evaluateToImage();` in place of `expr`, but if you're accepting user input, this is really dangerous. If the user somehow escapes the string (e.g. by adding a `"` in their WolframAlpha query), they can perform a Mathematica injection, which is like a [SQL injection](https://owasp.org/www-community/attacks/SQL_Injection) but for Mathematica. I'll show you how:

```mathematica
(* What gets evaluated if the input is nice *)
In[*]:= WolframAlpha["what is the meaning of life?", "Image"]
(* What gets evaluated if the input is evil *)
In[*]:= WolframAlpha["haha I will break free from this string!"]; DoSomethingEvil[]; WolframAlpha["Something normal so it won't throw a syntax error", "Image"]
(*                    |____________________________________________________________________________________________________________________________| *)
(*                    ^ User input begins *)
```

Since Mathematica can perform filesystem operations, consume Wolfram Cloud credits, and a whole host of other things, you really want to make sure to use J/Link's `Expr(int type, java.lang.String val)` to ensure type safety for user input.

Anyways, I perform the J/Link call to Mathematica in an [asynchronous task](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/scheduler/BukkitScheduler.html#runTaskAsynchronously-org.bukkit.plugin.Plugin-java.lang.Runnable-), since it can take a while for Mathematica to respond and I don't want to cause massive lag for the Bukkit server every time it makes a WolframAlpha query. Once the image result comes back, the only thing left to do is cut it up into square tiles and put them into maps in Minecraft.

## Conclusion
Once you've set it up correctly, J/Link makes it really easy to call Mathematica to do whatever you want. You can do much more than just getting WolframAlpha results. For example, Mathematica has support for [3D voxels](https://reference.wolfram.com/language/ref/Raster3D.html), which is perfect for Minecraft. You could import a 3D model, rasterize it, and somehow send some data back to Minecraft so you can construct it.

If you're okay with working with Minecraft Pi, the nerfed (but free!) version of Minecraft meant for Raspberry Pis, Mathematica actually has a module that lets it talk to Minecraft directly *without* J/Link. [Check it out!](https://blog.wolfram.com/2018/07/24/four-minecraft-projects-with-the-wolfram-language/)