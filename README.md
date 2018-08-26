<p align="center"><img src="./doc/logo/logo_text.png" alt="drawing" width="50%" /></p>

<p align="center"><b>MobSin is a lightweight Javascript game engine focused on simplicity and ease-of-use</b></p>

<p align="center"><sup><i>This project is still a work in progress and has not yet reached completion.</i></sup></p>

# Build

**MobSin** takes advantage of [Browserify](http://browserify.org/) to compile its source code down into a single, usable Javascript file.

1. Clone the repository with `git clone <URL>`.
2. Navigate to the root directory in your terminal.
3. `npm install` the dependencies\*.
4. Run `npm run build` to compile the source into `\build\mobsin.js`.

Once compiled, you can simply include `mobsin.js` into your HTML page with a script tag:

    <script src="mobsin.js></script>
    
And from there you are free to use the powerful features offered by **MobSin**. Happy coding!

<sup>\* <i>You may need to globally install Browserify and Watchify to be able to compile successfully.</i></sup>
