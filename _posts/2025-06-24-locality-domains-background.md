---
layout: post
categories: [internet]
title: "History and background of locality domains"
tldr: "Locality domains were proposed in 1992 in RFC 1386 because internet engineers were worried about too many people registering domain names. Now, Neustar are under contract by the Department of Commerce to maintain them."
---
This was originally supposed to be a subsection of [another article](/blog/locality-domains-guide) on how to set up a locality domain for free, from scratch, with a website. The story behind locality domains is quite interesting (to me), so I split them into two articles. This is *not* required reading for the how-to guide.

## What they are
Locality domain names domain names that contain the location of the registerer in the domain name. I live in Seattle, so I registered [frederick.seattle.wa.us](https://frederick.seattle.wa.us) (which I'm redirecting to `fredchan.org`). There are many locality domains for different locations as seen on [this list](https://web.archive.org/web/20090909141302/http://neustar.us/register/delegated_subdomains.txt), and chances are if your city or town existed in the 90s, it's on this list.

Here's a few I've seen in the wild:
* [nguyen.cincinnati.oh.us](http://nguyen.cincinnati.oh.us) - Personal website of Minh Nguyen, who maintains one of the few modern guides for requesting locality domains from registrars.
* [kevin.wallace.seattle.wa.us](https://kevin.wallace.seattle.wa.us/) - Personal website of Kevin Wallace, who made a [FOIA request](https://kevin.wallace.seattle.wa.us/foi/link-sounds/) for the sounds that play in trains on Seattle's Light Rail.
* [beaconhill.seattle.wa.us](https://beaconhill.seattle.wa.us/) - A blog about the Beacon Hill neighborhood, now no longer updated.

*(If you registered a locality domain and want me to add it to this list, e-mail me at [fred@fredchan.org](mailto:fred@fredchan.org)!)*

## Why they exist
On February 15, 1985, the `.us` top level domain (TLD) was created by Jon Postel at the University of Southern California's Information Sciences Institute (ISI), long before the internet became a household name. In fact, just a few years prior in 1981, ARPANET (the internet's precursor) had only 223 computers, so there was little danger of someone wanting to register a domain that was already taken.

However, by the 1992, over 10 thousand computers were internet-connected. With the internet's rapid growth, Postel figured that if everyone registered top level domains like `johndoe.us`, we would eventually run out of easy-to-remember `.us` domain names. In response, he and Anne Cooper published a document called [RFC 1386](https://datatracker.ietf.org/doc/html/rfc1386) (revised 1993 in as [RFC 1480](https://datatracker.ietf.org/doc/html/rfc1480)) to address this.

>  When things are bigger, names have to be longer.  There is an
    argument that with only 8-character names, and in each position allow
    a-z, 0-9, and -, you get 37**8 = 3,512,479,453,921 or 3.5 trillion
    possible names.  It is a great argument, but how many of us want
    names like "xs4gp-7q".  It is like license plate numbers, sure some
    people get the name they want on a vanity plate, but a lot more
    people who want something specific on a vanity plate can't get it
    because someone else got it first. (From RFC 1480 Section 2.2)

The solution proposed in RFC 1386 was the locality domain system: subdivide the `.us` domain into states like `wa.us`, then again into localities like `seattle.wa.us`, and individuals would register domains under these localities.

This way, John Doe from New York doesn't have to fight John Doe from Circle,&nbsp;Montana for a domain name. Instead, they could each register `johndoe.new-york.ny.us` and `johndoe.circle.mt.us` and live in perfect harmony. (Two John Does living in NYC, however, would have to battle to the death.)

Aside from publicly registerable locality domains, there are some reserved subdomains like `ci.city.state.us`, where `ci` is for city governments, or `co` for county governments.

At the state level, there's also *affinity domains*, like `schooldistrict.k12.state.us` for school districts in a given state, and `libraryname.lib.state.us` for libraries. For a bigger list of such domains, see the [Wikipedia article on the .us domain](https://en.wikipedia.org/wiki/.us#Locality_namespace).

## Who administers this system?
At the ISI, Jon Postel was originally in charge of administering the `.us` domain infrastructure, under a subcontract from SRI International, which in turn held the contract to maintain the domain from the Department of Defense (DoD).

As the internet became more popular for non-military, research usage, responsibility over the internet was transferred from the DoD to the National Science Foundation (NSF) in 1992. Though the NSF contracted Network Solutions Inc. (NSI) to maintain `.us`, NSI continued to subcontract ISI to administer it, with Postel at the helm.

To ease the burden of registering lots of new domain names, registrations of many of the localities were delegated to different *delegated managers*. `seattle.wa.us`, for example, was delegated to Northwest Nexus Inc. (now NuOz Corporation), so I had to contact NuOz to register `frederick.seattle.wa.us`. Postel delegated many locality domains to delegated managers, although many remain undelegated to this day.

As commercial use grew, the responsibility over the internet was transferred again from the NSF to the Department of Commerce in 1998, the same year Postel passed away. With Postel gone, administration of `.us` went back to NSI.

### The current administrator
Although Postel had been quite active in delegating the locality domains, NSI was not quite so interested in continuing his work, and no new localities have been delegated to this day. After NSI lost the contract over `.us` to Neustar in 2001 (the current administrator), the Department of Commerce [forbade](https://www.ntia.gov/files/ntia/publications/mod_2_0.pdf) Neustar to delegate new managers for undelegated locality domains, or to register any locality domains unless authorized by a local government official.

Neustar is supposed to compile a report on locality domains and come up with a future plan for how to maintain them, at which time the DoC will lift the restriction. However, this "temporary" policy has remained in force for over 20 years, meaning that the only locality domains you can register are the ones that have been delegated by Postel while he was still alive.

If you want to know how to get your own locality domain, see my [locality domain how-to guide](locality-domains-guide)!
