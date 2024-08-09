---
layout: post
categories: [ComputerCraft, Minecraft]
title: "Vein Mining with ComputerCraft Part 2 (Veins as Graphs)"
tldr: "We can model Minecraft ore veins as graph data structures in ComputerCraft to create a program for veinmining. The graph method maximizes runtime efficiency at the cost of a bigger program."
---
## tl;dr
[Last time](https://fechan.github.io/blog/vein-mining-strategies-with-computercraft-1/), we talked about representing ore veins as trees. This time, we talk about representing them as graphs, which is faster but complex. This is because you have to calculate locations of blocks already inspected, as well as avoiding re-inspecting those blocks. The full code is at the bottom.

## Takeaways from last time
If you read [last post](https://fechan.github.io/blog/vein-mining-strategies-with-computercraft-1/) about the trees, you'll remember that the tree traversal is slow because it keeps inspecting blocks it has already inspected. You'll also remember that we employed a trick where whenever we want the turtle to inspect backwards, we have it inspect the front and sides while it was at it. We'll employ something similar again for the graph traversal, and we'll need the `isTreasure()` function again.

{% highlight lua %}
function isTreasure (block)
    return block.name:find('ore')
end
{% endhighlight %}

## Modeling the problem
![Example diagram of a graph](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/6n-graf.svg/320px-6n-graf.svg.png)
Graphs are a lot like trees, except multiple nodes can connect to the same node. This represents Minecraft blocks better since up to six blocks can connect to the same block via its edges. You can also traverse graphs in a similar way to trees. The only problem is that in a graph, nodes can form cyclic connections (like nodes 2-3-4-5 in the graph diagram above). This means if you don't keep track of which nodes you've already visited and avoid them, your traversal will get stuck in a loop.

Your first thought for keeping track of blocks you've already visited might be to keep a list of coordinates accessible via the game's debug (F3) menu. It's a step in the right direction, but since they're global coordinates, you also have to keep track of where the turtle is at all times. Instead, you can keep track of blocks in terms of their location relative to where the turtle started, and say the starting position is {x=0, y=0, z=0} for simplicity.

If you let "moving one block east" increase the x-coordinate by 1, "moving north" increase the z, and "moving up" increase the y, then you can determine the relative coordinate of blocks after you strafe in a cardinal direction. If you start at {0,0,0} and go east, you just have to increment x by 1 and get {1,0,0}. However, it gets more complicated because the turtle is constantly turning. If you face north, turn left, and go forward, you're going east. If you turn left and go forward again, you're going south! You can't just simply increment x by 1 anymore, so you have to take orientation into account when calculating your destination block. Like before, we *could* use the F3 menu's compass, but we can make it easy on ourselves by pretending that our turtle is facing north when it starts mining the vein.

After that, you traverse the graph like a tree, but you skip inspecting directions that would result in inspecting blocks you've already inspected.

## Calculating destination blocks/orientation
You know where you are now. You know which orientation (e.g. north) you're facing. You know which direction (e.g. left) you want to go. What block will you be looking at if you go that direction and what orientation will you be facing?

The simplest cases are the for up and down, since you're not actually turning and your orientation stays the same. Just increment or decrement y and that's it.

{% highlight lua %}
function calcDest (xyz, orientation, direction)
    local dest = {x=xyz['x'], y=xyz['y'], z=xyz['z']}
    if direction == 'up' then
        dest['y'] = dest['y'] + 1
    elseif direction == 'down' then
        dest['y'] = dest['y'] - 1
    else
        ...
    end
    return {dest, orientation}
end
{% endhighlight %}

Notice that we had to construct a new destination xyz out of the xyz of our starting location. That's because if we just did `local dest = xyz`, changing dest would change xyz *even outside of our function*, since Lua [tables are pass by reference](https://stackoverflow.com/questions/6128152/function-variable-scope-pass-by-value-or-reference). On the other hand, the orientation, a string, is passed by value so we don't have to worry about that.

Now for the sideways cases, where you have to determine the final orientation with a calculation. If we quantify the direction we want to turn in (like backwards) as the number of left turns we want to make (2 for back), and then we quantify our orientation (like east) as the number of left turns you have to make from north (3 for east), then you can take the two left turn counts and add them together (2+3=5). Divide it by the number of orientations (4) and take the remainder (5%4=1). The result is the amount of left turns from north it would take to get you in the orientation you'd face (1=west, the orientation you'd face if you looked backwards facing east). In Lua, it looks like this:

{% highlight lua %}
local cardinals = {north=0, west=1, south=2, east=3}
local cardinalsReverse = {[0]='north', 'west', 'south', 'east'}
local leftTurns = {front=0, left=1, back=2, right=3}
orientation = cardinalsReverse[(cardinals[orientation] + leftTurns[direction]) % 4]
{% endhighlight %}

Once you have that, you can just increment or decrement the appropriate coordinate.

{% highlight lua %}
function calcDest (xyz, orientation, direction)
    local dest = {x=xyz['x'], y=xyz['y'], z=xyz['z']}
    if direction == 'up' then
        dest['y'] = dest['y'] + 1
    elseif direction == 'down' then
        dest['y'] = dest['y'] - 1
    else
        local cardinals = {north=0, west=1, south=2, east=3}
        local cardinalsReverse = {[0]='north', 'west', 'south', 'east'}
        local leftTurns = {front=0, left=1, back=2, right=3}
        orientation = cardinalsReverse[(cardinals[orientation] + leftTurns[direction]) % 4]
        if orientation == 'north' then
            dest['z'] = dest['z'] + 1
        elseif orientation == 'south' then
            dest['z'] = dest['z'] - 1
        elseif orientation == 'east' then
            dest['x'] = dest['x'] + 1
        elseif orientation == 'west' then
            dest['x'] = dest['x'] - 1
        end
    end
    return {dest, orientation}
end
{% endhighlight %}

## Graph traversal
You know where you'll end up when you go somewhere now, but you also have to keep track of those coordinates so you know to avoid inspecting that block again. One important thing you'll need is a function that tells you if a certain coordinate is in a list, since Lua doesn't have one built in.

{% highlight lua %}
--- Test if a table of {x,y,z}s contains a certain {x,y,z}
-- @param Table table   table to search within
-- @param Table xyz     xyz to search for
-- @return Boolean of whether the table has the xyz
function contains (table, xyz)
    for _,v in ipairs(table) do 
        if v['x'] == xyz['x'] and v['y'] == xyz['y'] and v['z'] == xyz['z'] then
            return true
        end
    end
    return false
end
{% endhighlight %}

Next since we start mining our vein with default starting values, we want to make our actual traversing function a helper function of mineVein() so that if we use mineVein() from elsewhere, we don't have to worry about passing in the starting values every time.

{% highlight lua %}
function mineVein ()
    mineVeinHelper({x=0, y=0, z=0}, 'north', {})
end

function mineVeinHelper (xyz, orientation, traversed)
    ...
{% endhighlight %}

Then we traverse each edge of the block we're in much like we did with the tree, except we check if turning in that direction will result in inspecting a block already inspected. If not, we add its coordinate to the list of blocks inspected and then we inspect it. The process of actually traversing to that block is the same as when we traversed the vein like a tree, but we pass in our current location and orientation to the next step of traversal.

{% highlight lua %}
function mineVeinHelper (xyz, orientation, traversed)
    for _, direction in ipairs({'up', 'down', 'front', 'back', 'left', 'right'}) do
        local destination, newOrientation = table.unpack(calcDest(xyz, orientation, direction))
        if not contains(traversed, destination) then
            table.insert(traversed, destination)
            if direction == 'up' then
                local success, data = turtle.inspectUp()
                if success and isTreasure(data) then
                    turtle.digUp()
                    turtle.up()
                    mineVeinHelper(destination, newOrientation, traversed);
                    turtle.down()
                end
            elseif direction == 'down' then
                ...
{% endhighlight %}

Once again, you *could* define every case like the up case and it would work. But just like in the tree traversal, when you do the back case, you might as well do the left and right cases while you're doing the full circle to look backwards and forwards again. Unlike the tree traversal however, *you still have to define those cases separately,* because sometimes you'll end up in a situation where you've already inspected the back block but not the right or left block. If you don't define the left and right cases, the back case won't run and the left and right blocks don't get inspected.

There is a separate optimization to make the front/left/right case into one big case to make the code smaller because they only differ by the amount and direction you turn before and after inspection. I'll cover that later.

## Back case optimization
Like the back case of the tree traversal method, we can do the left and right cases while we're in the process of turning backwards and unturning. The added complexity here is that we have to recalculate the block we're looking at each time we turn. We want to store the resulting orientation of turning left once into `leftOrient`, the resulting destination block into `leftDest`, and traverse into that block if it's ore. If we do this three times, we get to inspect the left, back, *and* right block whenever we want to inspect backwards. Sweet! Then we just turn left to face forwards again.

{% highlight lua %}
...
    elseif direction == 'back' then
        local leftOrient = orientation
        for i=1, 3 do
            local calculated = calcDest(xyz, leftOrient, 'left')
            local leftDest = calculated[1]
            leftOrient = calculated[2]
            turtle.turnLeft()
            table.insert(traversed, leftDest)
            local success, data = turtle.inspect()
            if success and isTreasure(data) then
                turtle.dig()
                turtle.forward()
                mineVeinHelper(leftDest, leftOrient, traversed);
                turtle.back()
            end
        end
        turtle.turnLeft()
    else
        ...
{% endhighlight %}

Because we keep adding new blocks to our list of inspected blocks, we can prevent adding the back block to the list twice by not adding it at the beginning:

{% highlight lua %}
function mineVeinHelper (xyz, orientation, traversed)
    for _, direction in ipairs({'up', 'down', 'front', 'back', 'left', 'right'}) do
        local destination, newOrientation = table.unpack(calcDest(xyz, orientation, direction))
        if not contains(traversed, destination) then
            if direction ~= 'back' then
                table.insert(traversed, destination)
            end
        ...
{% endhighlight %}

Notice that the order in which we inspect each direction is important! If we put `'left', 'right'` before `'back'`, then we'd be inspecting the left and right cases first, and the optimization we made for the back case would be useless! We have to look left and right anyway for the back case, but it we already looked left and right before, we save absolutely no time by inspecting left and right during the back case.

## Front/left/right case optimization
Since we have to make these cases anyway, we can collapse them all into one and change the amount and direction we turn before and after we inspect the target block. For front, you don't turn at all. For left, you turn left, inspect, and turn right. And vice versa for right.

{% highlight lua %}
...
    else
        --turn in the direction to inspect
        if direction == 'left' then turtle.turnLeft()
        elseif direction == 'right' then turtle.turnRight()
        end
        
        --inspect the block
        local success, data = turtle.inspect()
        if success and isTreasure(data) then
            turtle.dig()
            turtle.forward()
            mineVeinHelper(destination, newOrientation, traversed);
            turtle.back()
        end
        --unturn to face forwards again
        if direction == 'left' then turtle.turnRight()
        elseif direction == 'right' then turtle.turnLeft()
        end
    end
...
{% endhighlight %}

## The code
Now for the part you actually care about! Call mineVein() when the turtle is next to some ore and it will mine the vein. If you use it as part of a strip-mining program, you can call it when it digs an ore along its path (faster, misses more ore) or whenever it moves (slower, more thorough).

```lua
--- Given a block's data, returns true if it's a treasure
-- @return Boolean of whether it's a treasure
function isTreasure (block)
    return block.name:find('ore')
end

--- Calculate the destination coordinate from current pos, orientation, and desired turn
-- This calculation is RELATIVE and doesn't correspond with Minecraft's F3 coordinates
-- @param Table xyz             Table of coordinates {x,y,z} of the starting point
-- @param String orientation    The cardinal direction you face at the starting point
-- @param String direction      The direction (e.g. left, right, up) you would turn and proceed into
-- @return { {x, y, z}, orientation } of destination
function calcDest (xyz, orientation, direction)
    local dest = {x=xyz['x'], y=xyz['y'], z=xyz['z']}
    if direction == 'up' then
        dest['y'] = dest['y'] + 1
    elseif direction == 'down' then
        dest['y'] = dest['y'] - 1
    else
        local cardinals = {north=0, west=1, south=2, east=3}
        local cardinalsReverse = {[0]='north', 'west', 'south', 'east'}
        local leftTurns = {front=0, left=1, back=2, right=3}
        orientation = cardinalsReverse[(cardinals[orientation] + leftTurns[direction]) % 4]
        if orientation == 'north' then
            dest['z'] = dest['z'] + 1
        elseif orientation == 'south' then
            dest['z'] = dest['z'] - 1
        elseif orientation == 'east' then
            dest['x'] = dest['x'] + 1
        elseif orientation == 'west' then
            dest['x'] = dest['x'] - 1
        end
    end
    return {dest, orientation}
end

--- Test if a table of {x,y,z}s contains a certain {x,y,z}
-- @param Table table   table to search within
-- @param Table xyz     xyz to search for
-- @return Boolean of whether the table has the xyz
function contains (table, xyz)
    for _,v in ipairs(table) do 
        if v['x'] == xyz['x'] and v['y'] == xyz['y'] and v['z'] == xyz['z'] then
            return true
        end
    end
    return false
end

--- Master function for mining a vein of treasures as if it were a graph
-- with each block as a node and the directions you can travel from that block as edges
-- When beginning to mine, assumes whatever orientation the turtle is facing as "north"
-- and wherever it started mining as {0, 0, 0} xyz
function mineVein ()
    mineVeinHelper({x=0, y=0, z=0}, 'north', {})
end

--- Recursive helper function for mining a vein of treasures (blocks)
-- using the graph traversal method
-- @param Table xyz             Current location {x,y,z} of turtle
-- @param String orientation    Current orientation of turtle
-- @param Table traversed       Table of tables {x,y,z} of visited blocks
function mineVeinHelper (xyz, orientation, traversed)
    for _, direction in ipairs({'up', 'down', 'front', 'back', 'left', 'right'}) do
        local destination, newOrientation = table.unpack(calcDest(xyz, orientation, direction))
        if not contains(traversed, destination) then
            if direction ~= 'back' then
                table.insert(traversed, destination)
            end

            if direction == 'up' then
                local success, data = turtle.inspectUp()
                if success and isTreasure(data) then
                    turtle.digUp()
                    turtle.up()
                    mineVeinHelper(destination, newOrientation, traversed);
                    turtle.down()
                end
            elseif direction == 'down' then
                local success, data = turtle.inspectDown()
                if success and isTreasure(data) then
                    turtle.digDown()
                    turtle.down()
                    mineVeinHelper(destination, newOrientation, traversed);
                    turtle.up()
                end
            elseif direction == 'back' then
                local leftOrient = orientation
                for i=1, 3 do
                    local calculated = calcDest(xyz, leftOrient, 'left')
                    local leftDest = calculated[1]
                    leftOrient = calculated[2]
                    turtle.turnLeft()
                    table.insert(traversed, leftDest)
                    local success, data = turtle.inspect()
                    if success and isTreasure(data) then
                        turtle.dig()
                        turtle.forward()
                        mineVeinHelper(leftDest, leftOrient, traversed);
                        turtle.back()
                    end
                end
                turtle.turnLeft()
            else
                --turn in the direction to inspect
                if direction == 'left' then turtle.turnLeft()
                elseif direction == 'right' then turtle.turnRight()
                end
                --inspect the block
                local success, data = turtle.inspect()
                if success and isTreasure(data) then
                    turtle.dig()
                    turtle.forward()
                    mineVeinHelper(destination, newOrientation, traversed);
                    turtle.back()
                end
                --unturn to face forwards again
                if direction == 'left' then turtle.turnRight()
                elseif direction == 'right' then turtle.turnLeft()
                end
            end
        end
    end
end
```

## License
The code in this blog post is provided under the MIT license. If you use this code in your own program, linking back to this blog post would be nice, but is not required.