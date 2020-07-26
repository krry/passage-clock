# Passage Dev Log

I'm starting this log many commits and thousands of lines of code into this
project, not because I expect that it will form a salient account of how this
app came to be, but rather to encourage the practice of logging my reasoning,
and to formalize my approach to design and development by forcing myself to
extrude it into explanations (or justifications) here.  I'll develop the
vision for the versions here.

## v4.1 - 2020.07.25

I noticed while revisiting this old thing that the date displayed is obscenely wrong.

What gives? Time for some debugging.

---

As it turns out, the crux was mutability, mutation, which I only become aware
of earlier today while [brushing up on some React](). It's funny-not-funny
how the Universe seems to contain only just enough to keep us engaged, to keep
us believing the forms are real. Metaphysics aside, I found that [the Date
object in JavaScript is a tricky little mink])(https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/). Here's how…

You can ask the browser to generate a Date object and assign it to a variable
name. Then if you assign that to another variable, the same Date object
underlies both. So then if you were to `set` the Date object in any fashion,
[the mutation will show up everywhere that Date object is referenced](https://unspecified.wordpress.com/2013/08/02/why-you-should-never-mutate-a-javascript-date/). To avoid
this confusion, we can create new instances of the Date object like so:

```javascript
let newDate = new Date(2020, 07, 31);
let anotherNewDate = new Date(newDate);
newDate.setDate(22); // 2020-07-22
anotherNewDate.getDate() !== 22; // 2020-07-31
```

This conundrum lies at the root of how React operates. Or rather, avoiding
this conundrum is a core competency of React. By enforcing [strict, deep
immutability, as scary as that sounds](https://alistapart.com/article/why-mutation-can-be-scary/)
of data objects, React allows us to jump forward and back among
states of the application as though time is more than one-dimensional and more
than one-directional. Pro tip: it is.

So now that I am creating a few instances of the Date object, the weirdness
went away and the old passage clock is zipping along like a hummingbird on
ritalin. This debugging process has been torturous, and downright educational,
like being repeatedly socked in the face and the groin with slightly randomly
alternating blows. Can I write something useful to commemorate the occasion
and process the trauma? Perhaps. Maybe I'll keep it short.



## v4.0 - 2019.04.12

Today I knocked out a few quick fixes and features out. Landscape layout is
looking good now. The arrow of time was looking small there. The filter
selector is now a cycler button. I got stuck for a bit while building the
cycler, because I forgot the proper order of the components of a `for` loop.
I've been using `for-of` and `for-in` more and more. Can't blame Golang or
Rust, as they all use the same order as ES. I'm just not teh smrtest.

Now that the controls work on all devices, I am revamping the time display.
Linear bands don't do it justice. Many clocks use a circle. Perhaps I will try
that as well. A circle with a concentric ring for each unit.

In the meantime, the bands are here and working, so I'll add a little
perspective to them, 3D perspective that is. Depicting three dimensions within
a two-dimensional plane like a screen is all about perpsective, and
perspective can be defined as a relationship between an observer and the
observed. The perspective I am trying to lend the user in regards to the
passage of time is its constancy, and its layers. Small moments within bigger
ones, but all of the same continuum. A loop with tracks: narrow, fast tracks
and wide, slow tracks. The differential between the narrow and wide, fast and
slow tracks keeps the continuum interpenetrating itself, folding into itself,
becoming itself. I have a vision for how to exhibit this in the browser...

The outside track is the largest unit of time. This is currently a year, but I
will expand things to include geological and cosmic time. The short span, the
narrow, fast, inside track is milliseconds. The chips in this laptop can flip
billions of bits per second, but I don't think the refresh rate can keep up.
I'll have to figure out what the limiting factor is and design around that.
Many screens can refresh at 60Hz. I'll start there. 1000ms/60Hz = 16ms/cycle.
I have been using a 32ms delay while I develop to ease the drag on the
browser, but the aim should be a 16ms delay between repaints to maximize
acuity.


## v3.0 - 2019.04.11

Yesterday I fired off the 3.0 tag. It's not a momentous release necessarily,
but it's stable, it works on a wide array of screens, and it performs 30x-100x
better than when I began this crazy, pointless project.

[Here's a demo video of v3.0](https://www.loom.com/share/43f14fb3e5854095a3b48cbf2986454c).

![Screenshot of PSG v3.0](./imgs/psgv3-screenshot.png)
