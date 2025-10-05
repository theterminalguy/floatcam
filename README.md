<p align="center">
  <img  src="images/floatcam-logo.svg" height="125px" alt="Floatcam logo"> <br/>
  <img  src="https://img.shields.io/badge/Version-0.1.0-blue.svg" alt="Version 1.0.0" />
  <img  src="https://img.shields.io/badge/Build-Passing-green.svg" alt="Build Passing" />
  <img src="https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square" alt="License MIT" />
  
  <img src="https://img.shields.io/badge/Platform-Linux%20%7C%20MacOS%20%7C%20Windows-blue?style=flat-square" alt="Platform Linux | MacOS | Windows" />

</p>

<a href="https://www.producthunt.com/posts/floatcam?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-floatcam" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=367470&theme=light" alt="Floatcam - floating&#0032;camera&#0032;for&#0032;any&#0032;screen&#0032;recorder | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

**Floatcam** is a simple, lightweight, and easy-to-use camera app that can be used alongside any screen recorder. It floats on top of other apps, so you can easily record your screen and your face at the same time.

It is perfect for recording tutorials, gameplay, or anything else you want to share with the world. The floating camera preview can be moved around while recording. You don't have to worry about the camera getting in the way of your recording or making such adjustment post-production.

## _If you have tried floatcam recently, [please feel free to suggest feedback or features you'd like to see next](https://forms.gle/J4BgqbDo1kYLxiPy7)._
## Features

[Floatcam](https://github.com/theterminalguy/floatcam) features a wide range of settings for 

- Customizing the shape of the floating window
- Changing the size of the floating window
- Adding a filter to the camera
- Adding a border to the window 
- and lots more!

## Installation

Floatcam is available on macOS, Windows and Linux. You can download it from the [releases](https://github.com/theterminalguy/floatcam/releases) page.

> **Note:** Floatcam is currently in beta. If you find any bugs, [please raise an issue](https://github.com/theterminalguy/floatcam/issues/new). Also, we don't have a code signing certificate yet, so you might have to allow the app to run on your system.

## Usage

Here is a quick demo on how to use Floatcam:

[![Floatcam Demo](https://img.youtube.com/vi/r1SKmGSIw7s/0.jpg)](https://youtu.be/r1SKmGSIw7s)

After installing, launch and customize the settings to your liking. When you are done customizing, you can minimize the settings window and start recording or move the settings window to a different monitor.

![Adjusting floacam settings](images//adjust-float.gif)

The floating window can be moved around, resized and have its shape changed during recording. You can also add a border to the window and a filter to the camera.

![Moving the floating window](./move-float.gif)

### Using floatcam with Snap Camera (macOS and Windows only)

Snap Camera is a virtual camera app that lets you add Snapchat filters to your camera. You can download it from the [Snap Camera website](https://snapcamera.snapchat.com/). After installing, Floatcam will automatically detect it and it will show up in the list of available camera sources.

![Using floatcam with Snap Camera](images/floatcam-snap.gif)

## Why Floatcam?

There are a lot of screen recorders out there, but most of them do not have a built-in camera. For those with a camera, it's either not floating, can't be moved around, is not customizable, or requires paying for a premium version.

### A Brief History of Floatcam

The default screen recorder on macOS (Quicktime) does have a way to record the screen and the camera. However, it is not customizable and sometimes interferes with the recording. On Linux, I used Kazam, but it does not have a built-in camera. 

One thing all these screen recorders have in common is that they are not customizable.

[Loom](https://www.loom.com/), a popular screen recorder allows you to do some customization but it's not free. It features a floating camera, a screen recorder and a video editor. It's a great tool, but you have a recording limit of 5 minutes for the free version.

Since there are lots of amazing FREE screen recorders out there and all I wanted was a floating camera, I decided to make my own. I thought it would be nice to have a simple camera app that you can use alongside any screen recorder.

I hope you enjoy using Floatcam as much as I enjoyed making it. If you have any questions, suggestions, or feedback, feel free to reach out to me on [Twitter](https://twitter.com/theterminalguy) or send me an email.

## Roadmap

I have thought about some cool features that I would like to add like screen annotation, a simple whiteboard, area protection and more. 

While all of these features sounds cool, it's not the reason why I made Floatcam. I may add those features when I have the time.

## Contributing

If you want to contribute to Floatcam, you can do so by: 

- Reporting bugs
- Fixing bugs
- Suggesting and adding new features

## Building from source

If you want to build Floatcam from source, you can do so by cloning the repository and use electron-forge to build it.

## Developing locally

First ensure you have the correct version of Node.js installed. If you are using [nvm](https://github.com/nvm-sh/nvm) you can run `nvm use` to switch to the correct version.

Next, clone the repository and install the dependencies.

```bash 
git clone https://github.com/theterminalguy/floatcam.git && cd floatcam && yarn install
```

To start the app, you'd need to run `yarn build && yarn start` and `yarn desktop` in two separate terminals.
