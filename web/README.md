# ESCAPE ALIVE - README
#### Created By: Sand Moshi

## Table of Contents
* Status
* Introduction
* Tech Stack
* Status
* Demo
* Screenshots
* Development
* File Structure
* React Components
* Contribution
* License

## Introduction
Escape Alive is a retro browser games based choose-your-own adventure game inspired by the choose your own adventure books that many of us read in our childhood. It's a story driven game where you will get to make choices that influence whether you are able to complete your spy mission and avoid capture or meet one of several unfortunate fates.

The files for this game are in the `/web` directory. The other directory contains a buggy prototype of the game from 2016.

## Tech Stack
The game was built for modern web-browsers using **React.js** and built ontop of Create React App. It does use **React Hooks**. The main external libraries used are `howler` for the music/SFX and `react-transition-group` for some animations.

At this time, there is no back-end or database associated with the project.

## Status
This project is still **under developement**. Please keep that in mind. I plan on continuing to add chapters to the story, fix bugs, and fix mobile and cross-device compatibility issues. However, enough of the game is complete that I am able to share a playable demo. See the **DEMO** section below.

## Demo
You can play a demo version of the game here:
###[Link to Demo](https://sandmoshi.github.io/Escape/)

## Screenshots
![Home Screen](https://imgur.com/ZQRKHHQ.png)
![Story](https://imgur.com/jhM1H5h.png)
![ASCII Images](https://imgur.com/fIAEetq.png)

## Development
To edit this project, first you need to clone this git repo to your computer.

Once cloned, you'll want to go into the web directory. 

```
cd web
```

as the `/GD1` directory contains the alpha version of this game built with just JS/jQuery.

Once in the directory, you can run the development server using the terminal commmand

```
npm run start
```

Once you've made changes you can build the project for deployment using 

```
npm run build
```

and it will build the project into the `/build` folder. Then you can deploy it as you would any other static site. Please make sure the **homepage** field in the `package.json` file reflects the new hosting url before building the project.

## File Structure
```
root/
-- GD1/                  //Deprecated
-- web/
    |-- src
        |-- assets       //Contains images, music files, SFX files, fonts, icons, etc.
            |-- story    //Contains the JSON object that contains the story content
        |-- components   //Contains React component files & stylesheets
        App.js           //Top most component
        Index.js
```

## React Components

There are four key React components in this project. The majority of the game-wide state is held within the `<Computer />` component and functions are passed down to the child components as required.

#### Computer `<Computer />`
This component is the main component and serves as the parent for most other components. It also handles the majority of state (toggling buttons, keeping track of chapters, skipping)

It renders the children components `<ButtonGroup />` and `<Screen />`

#### ButtonGroup `<ButtonGroup />`
This component is responsible for rendering the buttons including the choice, skip, and continue buttons. The props passed to are the functions that control the state that determine which buttons are shown. As well as the functions that determine what the chapter is.

#### Screen `<Screen />`
This component is responsible for displaying what appears 'on screen'. This includes the text, the background effects, and type-writer effects.

It renders the child component `<Story>` which is specifically responsible for returning the text as a type-writer effect.

#### Story `<Story />`
This component takes in the `chapter` prop and displays the corresponding story on the screen with a type-writer effect. It also by way of prop-functions triggers when the skip or choices buttons get displayed.


## Contribution

If you would like to contribute to this project, feel free to make a pull-request. 

## License

You can edit this game for your own pleasure but please do use it for commercial purposes or to pass it off as your own work. 