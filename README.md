Presentation Remote for Google Glass
====================================

Allows you to control a Prezi with your Google Glass while on stage.

Navigate your Prezi by swiping forward or backward on the Glass touchpad.

Mirror your display on Glass to eliminate the need for a separate screen for the presenter.

Setup
=====

Presentation Remote for Google Glass uses [wearscript](http://www.wearscript.com) to access the Glass' native features.
You will need to follow their instructions to setup a server; I recommend following their instructions to install the
Virtual Machine on an Amazon EC2 instance.

Once you have the server running and your Glass paired with the server (follow the instructions on the wearscript site),
paste the code from `client.html` into the wearscript web interface and click "Wear this Script".

Now replace the Prezi ID inside of `presentation.html` and open it in your favorite web browser. This file displays and
controls the embedded presentation.

Controlling Your Presentation
=============================

Control your presentation by using the following gestures on your Glass touchpad:

 - Swipe Forward - Go to next slide
 - Swipe Backwards - Go to previous slide
 - Two Finger Swipe Forward - Jump to end
 - Two Finger Swipe Backwards - Jump to beginning

Enabling Screen Mirroring
=========================

To enable mirroring your screen on the Glass display you will need `node.js` and `npm` installed on your machine.

In a terminal window, navigate to the project directory and type `npm install` to install the dependencies. Then run
`screencast.js`.

Note: you will need to add your AWS client ID and secret into a `config.json` file.
[Format documentation available from Amazon](https://github.com/aws/aws-sdk-js/blob/master/configuration.sample)

Coming Soon
===========

Tap to change modes.

 - Presentation timer (long hold to reset)
 - Text view (instead of screencast)

About this Project
==================

This project was created for Mhacks Winter 2014 by [Brad Dwyer](http://www.twitter.com/braddwyer).