---
layout: post
categories: [computercraft, minecraft]
title: "Vein Mining with ComputerCraft Part 1 (Veins as Trees)"
---
## tl;dr
ComputerCraft is a Minecraft mod that adds Lua-programmable turtles (robots) that can inspect and mine blocks. You can represent contiguous veins of ores as tree or graph structures and mine all the blocks with a tree/graph traversal. Trees are slow but less complex, and graphs are fast but more complex. You can minimize the time to analyze blocks on the same elevation as the turtle with a neat trick. This post talks about the tree method, and the full code is at the bottom.

![ComputerCraft turtles](http://www.computercraft.info/wiki/images/b/bf/Turtles.png)

## Motivation
My friends and I started a modded Minecraft run where we split into two teams and competed to go to space with Galacticraft. We included one of my all time favorite mods, [ComputerCraft](https://www.computercraft.info/wiki/Main_Page), which adds robots (called [turtles](http://www.computercraft.info/wiki/Turtle)) that can interact with the world by moving around, analyzing blocks, and mining up blocks. The robots are programmable with Lua, which is a heretical language where lists start at 1. Since mining is easily the most boring part of Minecraft (I prefer the crafting), knowing I can make a mining turtle do that for me is a blessing.

Before this playthrough, I always made very simple mining programs for the turtle that just moved forward and dug a tunnel, ignoring any valuables that weren't in its way. Although that's already better than weighing down your W key and left mouse button with a pickaxe in hand, it's not as efficient as it could be. You still have to go through the tunnel when it's done and mine out ores if you want all the ore inside, and that happens to be the most tedious part. Figure out how to make the turtle do it, and you can easily automate yourself out of mining and just play Craft.

What's cool about this is that you can actually see the turtle move and traverse through the vein, so if you usually have trouble visualizing trees or graph traversals, you now have a nice 3D visual of what's going on.

## Constraints
* ComputerCraft's code editor sucks - It's laggy and you can only see like five characters per line anyway. The basic mining turtle doesn't have syntax highlighting either, which makes finding code like finding a needle in a haystack. It's better to type code on a real editor like vscode or even notepad++.
* ComputerCraft's paste function sucks - If you're playing singleplayer or if your server owner enabled Pastebin support for CC, this doesn't apply since you can just put your code in Pastebin and [download your code from in-game](https://www.computercraft.info/wiki/Pastebin_\(program\)). Otherwise, you can only paste one line of code at a time, and that line is limited to 128 characters long. The reason for the 128-character limit is so you don't flood multiplayer servers with massive chunks of text and cause lag for everyone else. Even so, it's annoying to have to constantly part out your code 128 bytes at a time and spend time copy-pasting that in. This means that ideally, code you write for ComputerCraft is small and compact.
* Turtles can only inspect blocks above, below, and in front of itself - If you want to inspect blocks to its left, right, or behind, the turtle has to physically turn around before it can do that. Turning around is really slow.

## Modeling the problem
Veins of ores are clusters of adjacent ore blocks, and you want to mine all of them to get the most out of the vein. You don't know where all the blocks of the vein are to begin with, so you only know where one of the blocks are. Around the ore blocks might be all kinds of other blocks you don't care about, like stone or dirt. If you think about it, the blocks are like nodes of a [tree](https://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm) or a [graph](https://cs.nyu.edu/courses/fall17/CSCI-UA.0102-001/Notes/Graphs.html) data structure. A node stores data and has connections to other nodes (or sometimes null). Ore blocks store their block ID (like `minecraft:iron_ore`) and has connections to either other ore blocks or non-ore blocks on each of its sides.

![Diagram of a tree and a vein of ores](/assets/images/veinmining-tree-diagram.png)

For a turtle to distinguish between an ore block and a non-ore block, we can define a simple function that takes the block data from `turtle.inspect()` and returns if it's ore or not. If your distinguishing logic is very simple and fits on one line, you *could* forego this, but it gets harder to change later.

{% highlight lua %}
function isTreasure (block)
    return block.name:find('ore')
end
{% endhighlight %}

Now you have to decide whether you want to treat the entire vein as a tree or a graph. Nodes of a tree only ever have one node that points to it, while in a graph multiple nodes can point to the same node. While it seems more appropriate to model a vein as a graph for speed, since multiple blocks can connect to the same block and a tree traversal will cause it to inspect blocks it has already inspected, there are advantages to treating it as a tree. Namely, a tree traversal is both easier to implement and will result in a smaller program because you don't have to write code to calculate which block the turtle has looked at and keep track of them.

Basically, tree traversal is slow, simple, and small (like a real baby turtle). Graph traversal is fast, complicated, and big. This post goes over the tree traversal.

## Tree traversal
Usually with a tree traversal, you have a function like this (pseudocode):

{% highlight pseudocode %}
function traverse(node):
    if node != null:
        doSomething(node)
        for every connection of node:
            traverse(connection)
{% endhighlight %}

This is analogous to our turtle mining a block, going to the block's position, then if it was ore, doing something with it, looking around to see if there are blocks around it, and doing it all over again for every new block it finds. If it wasn't an ore block, it will go back up the call stack by [returning to where it was before](https://www.cs.utexas.edu/~scottm/cs307/handouts/recursiveBacktrackingExplanation.htm) until it has looked at all the blocks in and around the vein. This is a little wasteful, since moving takes time, so we just have it *not* traverse connections with non-ore at the end. Then you don't have to pass any parameters and you end up with something like this:

{% highlight lua %}
function mineVein ()
    for _, direction in ipairs({'up', 'down', 'front', 'left', 'back', 'right'}) do
        if direction == 'up' then
            local success, data = turtle.inspectUp()
            if success and isTreasure(data) then
                turtle.digUp()
                turtle.up()
                mineVein()
                turtle.down()
            end
        elseif
            ...
{% endhighlight %}

Notice that the turtle has to move in a direction, recurse, and move in the opposite direction so that it's in the position it was before recursing. This is really simple to do in the up, down, and forward case since it's not turning; it can just inspect in that direction, go in that direction, and then go in the opposite direction. For the left, back, and right cases, however, you have to turn...

{% highlight lua %}
...
    if direction == 'left' then
        turtle.turnLeft()
        local success, data = turtle.inspect()
        if success and isTreasure(data) then
            turtle.dig()
            turtle.forward()
            mineVein()
            turtle.back()
        end
        turtle.turnRight()
    elseif
        ...
{% endhighlight %}

If you do this for left, right, and back, you'll notice it's doing a silly dance that causes it to face the same blocks over and over again. It's funny to see, but it's inefficient, so here's the trick.

## The trick
For a turtle to face backwards, it has to turn left or right twice. To face forwards again, it has to turn left or right twice again. Since it has to turn a full circle anyway in order to inspect all four directions— front, left, back, and right— you might as well collapse them into one case and have the turtle do a single circle by turning it four times in one direction. Every time you turn, inspect. If it's ore, recurse.

{% highlight lua %}
for _, direction in ipairs({'up', 'down', 'other'}) do
    if direction == 'up' then
        ...
    elseif direction == 'down' then
        ...
    else
        for i=1, 4 do
            local success, data = turtle.inspect()
            if success and isTreasure(data) then
                turtle.dig()
                turtle.forward()
                mineVein()
                turtle.back()
            end
        end
    end
end
{% endhighlight %}

## The code
Now for the part you actually care about! Call mineVein() when the turtle is next to some ore and it will mine the vein. If you use it as part of a strip-mining program, you can call it when it digs an ore along its path (faster, misses more ore) or whenever it moves (slower, more thorough).

[Next post, I talk about the graph method and its code.](/blog/vein-mining-strategies-with-computercraft-2/)

{% highlight lua %}
--Tested with ComputerCraft 1.80

--- Given a block's data, returns true if it's a treasure
-- @return Boolean of whether it's a treasure
function isTreasure (block)
    return block.name:find('ore')
end

--- Mines a vein of ores with the tree traversal method
function mineVein ()
    for _, direction in ipairs({'up', 'down', 'other'}) do
        if direction == 'up' then
            local success, data = turtle.inspectUp()
            if success and isTreasure(data) then
                turtle.digUp()
                turtle.up()
                mineVein()
                turtle.down()
            end
        elseif direction == 'down' then
            local success, data = turtle.inspectDown()
            if success and isTreasure(data) then
                turtle.digDown()
                turtle.down()
                mineVein()
                turtle.up()
            end
        else
            for i=1, 4 do
                local success, data = turtle.inspect()
                if success and isTreasure(data) then
                    turtle.dig()
                    turtle.forward()
                    mineVein()
                    turtle.back()
                end
            end
        end
    end
end
{% endhighlight %}