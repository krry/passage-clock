# ☸︎ Passage

It's a clock that's super hard to read :)

It's the unfortunate lovechild of a fidget spinner,\
a higgs boson, and an alarm clock radio.

## 📱 Usage

Nav to [passage.krry.me](https://passage.krry.me) on a touch device, and add it to your home screen.\
Passage is intended as a barebones experiment in PWAs (progressive web application).

You'll figure it out.

If you break it, please let me know in an [issue](https://github.com/krry/passage-clock/issues).

## 💉 Installation

```
git clone https://github.com/krry/passage-clock.git
cd passage-clock && yarn install
```

## 🚧 Development

```
yarn dev
```

Runs `webpack-dev-server` and pops your browser open to
[`localhost:8080`](http://localhost:8080).

## 🚢 Deployment

```
yarn deploy
```

Builds for prod and deploys the built files in `dist/` with `now`


## ⛓ Dependencies

`yarn install` ought to cover you, except for deploying with now.\
You'll need that installed globally.

```
yarn global add now
```

## 🛠 Builtwith

- Vanilla ES6+
- Webpack
- Coffee

## 🙏Gratitude

- Inspired by Justice whose preferred clock displays the percentage of the day now past
- Drew conceptually from [@robertmermet's](http://robertmermet.com/) [Percent Clock](https://github.com/robertmermet/percentclock/)
- Thanks to [Unsplash](https://unsplash.com/developers) and the photogs for these superb photos

## 😅 TODO

- [ ] refactor modules into ES6 Classes where appropriate
- [ ] involve babel-loader in the build to be browser-friendly
- [ ] allow time origin adjustment, i.e. time from now, time till then
- [ ] add atmospheric effects and/or particle.js
- [ ] make the arrow dance and sway
- [ ] add more atmanautic art
- [x] let users choose a color scheme
- [ ] port to New Tab experience for Chrome?
- [x] allow users to remove time slices
- [x] enable user to restore removed slices
- [x] turn back time
- [x] alias to krry.me with now.sh
