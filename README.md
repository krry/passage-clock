# Passage

It's a clock that's super hard to read :)

It's the unfortunate lovechild of a fidget spinner, a higgs boson, \
and an alarm clock radio.

## Installation

```
git clone https://github.com/krry/passage-clock.git
cd passage-clock && yarn add
```

## Development

```
yarn dev
```

Runs `webpack-dev-server` and pops your browser open to `localhost:8080`.

## Deployment

```
yarn deploy
```

Builds for prod and deploys the built files in `dist/` with `now`


## Dependencies

`yarn install` ought to cover you, except for deploying with now.
You'll need that installed globally.
There are a few packages that are helpful when installed globally:

```
yarn global add eslint webpack webpack-cli stylelint now
```

## Usage

You'll figure it out. If you break it, please let me know in an [issue](https://github.com/krry/passage-clock/issues).

## Builtwith

- Vanilla ES6+
- ⚕︎♛☥☮︎☯︎
- Webpack
- ♌︎⚛︎☤⚚
- Coffee

## Gratitude

- Inspired by Justice whose preferred clock displays the percentage of the day now past.
- Began as a clone of [@robertmermet's](http://robertmermet.com/) [Percent Clock](https://github.com/robertmermet/percentclock/)

## TODO

- [x] let users choose a color scheme
- [x] allow users to remove time slices
- [ ] allow time origin adjustment for timers, i.e. time from now, time till then
- [x] alias the now.sh demo for permanent linking
- [ ] add atmospheric effects
- [ ] make the arrow dance and sway
- [ ] add more atmanautic art
- [ ] pipe in Spotify tunes
- [ ] particle.js?
