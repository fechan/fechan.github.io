---
layout: post
categories: [Minecraft, ComputerCraft, SIGILS]
title: "How to use SIGILS: a way to pipe items in modded Minecraft using ComputerCraft"
tldr: "SIGILS allows you to pipe items in modded Minecraft factories using ComputerCraft computers and manage them in the browser. It's faster than traditional item pipes and easier to manage complex factories with it thanks to its intuitive click-and-drag interface."
---

## tl;dr
SIGILS allows you to pipe items in modded Minecraft factories using ComputerCraft computers and manage them in your web browser. It's faster than traditional item pipes and easier to manage complex factories with it thanks to its intuitive click-and-drag interface.

## Requirements
### Game
* Minecraft 1.16 or greater
* CC: Tweaked 1.94.0 or greater

## Basic usage: Setting up and making a pipe

### Minecraft items
* Any non-portable ComputerCraft computer (including turtles)
* Wired modems (from CC: Tweaked. The full-block versions are more convenient to use.)
* (Optional) Networking cable (from CC: Tweaked)

### Connecting machines to your ComputerCraft computer
<figure class="float-right text-center !my-0">
  <div class="w-96">
    <a href="/assets/images/sigils-network.webp">
      <img src="/assets/images/sigils-network.webp"
        alt="Valid ways of connecting your computer and machines"
        class="!my-0"
      />
    </a>
    <figcaption>Valid ways of connecting your computer and machines (click for full image)</figcaption>
  </div>
</figure>

1. Put down your computer somewhere convenient
2. Put a wired modem next to the computer.
    * It is recommended to use the full block versions of the wired modems for convenience, since they can connect to multiple machines simultaneously, as well as non-full blocks such like chests and brewing stands.
    * If the modem has no red on it, right click it to add it to the computer's network
3. Place wired modems next to any machines you want to pipe items to/from
    * Again, if the modem block has no red on it, right click it
4. Connect up the modems using either networking cable or more modems
    * As long as the computer and the machines are connected by modems and cables, SIGILS will detect it
5. If you need to add more machines later, connect them up to the existing network with more modems. You can do this regardless of whether SIGILS is running or not

### Installing SIGILS on your ComputerCraft computer
1. In a ComputerCraft computer (can be basic or advanced, turtle or regular) type `wget run https://sigils.fredchan.org/install` and press Enter
2. If prompted to make SIGILS run on startup, press Y
3. After installation finishes, type `sigils` and press Enter

### Making and editing pipes
<figure class="float-right text-center !my-0">
  <div class="w-56">
    <a href="/assets/images/sigils-first-pipe.webp">
      <img src="/assets/images/sigils-first-pipe.webp"
        alt="A single pipe between a chest and a furnace's top slot"
        class="w-56 !my-0"
      />
    </a>
    <figcaption>A single pipe between a chest and a furnace's top slot (click for full image)</figcaption>
  </div>
</figure>
1. In SIGILS, press E to enter editing mode and take note of the 4-letter session code
2. In your web browser, go to [sigils.fredchan.org](https://sigils.fredchan.org) (the SIGILS editor) and enter the session code
3. Press "Start editing"
4. Click and drag from any red (triangular) handle into any blue (square) handle to pipe items from one inventory to another.
5. (Optional) In the "Creating a new pipe" dialog box, set an item filter and/or nickname for the pipe.
6. Click "Create Pipe." Congratulations, you've made your first pipe!
6. When you're all done, go back into your ComputerCraft computer and press E again to exit editing mode.

## Adding machines
1. In Minecraft, connect your new machine(s) to the computer network with wired modems
2. In the editor, click and drag the names of detected machines in the top right into the main workspace
![Available peripherals dialog box](/assets/images/sigils-available-periphs.webp)

## Removing machines
In order for your pipes to keep working in the event of a temporary disconnection (for example, if your machine is in an unloaded chunk), SIGILS will not remove disconnected machines from your factory unless you explicitly tell it to do so.

1. In Minecraft, disconnect your old machine(s) from the computer network
    * You can break the machine, break the wired modem, or disable the wired modem. All of these are fine.
2. In the editor, tn the top right, click on the machine you want to remove
![Missing peripherals dialog box](/assets/images/sigils-missing-periphs.webp)

## Combining machines
<figure class="float-right text-center !my-0">
  <div class="w-96">
    <a href="/assets/images/sigils-combine-periphs.webp">
      <img src="/assets/images/sigils-combine-periphs.webp"
        alt="A single pipe between a chest and a furnace's top slot"
        class="!my-0"
      />
    </a>
    <figcaption>The blast furnace may be combined with the group of furnaces by dragging it into the group of furnaces. The chest supplies coal into the fuel slots of the furnaces in the furnace group using one pipe. (click for full image)</figcaption>
  </div>
</figure>

You can combine machines and their inventory slots to allow a single pipe to pipe items to multiple machines at once. This can be useful if you want to smelt a lot of items in bulk, for example.

1. In the editor, click and drag the machines you want to combine into a second machine
2. Groups of inventory slots with the same nickname will be combined
    * e.g. A slot nicknamed "Fuel" will combine with other slots nicknamed "Fuel"