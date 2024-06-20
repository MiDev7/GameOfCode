import MenuScene  from "./menuscene.js";
import IntroScene from "./introscene.js";
import LevelOne from "./level1scene.js";
import LevelTwo from "./level2scene.js";
import LevelThree from "./level3scene.js";
window.onload = function()
{
    const divElement = document.getElementById('gameScreen');
    const SCREEN_HEIGHT = divElement.clientHeight;
    const SCREEN_WIDTH = divElement.clientWidth;
    new Phaser.Game({
        width: SCREEN_WIDTH, // Width of the game in pixels
        height: SCREEN_HEIGHT, // Height of the game in  pixels
        backgroundColor: 'black',
        scene: [MenuScene,IntroScene,LevelOne,LevelTwo, LevelThree], // The scenes of the game
        physics: { default: 'arcade' }, // The physics engine to use
        parent: 'gameScreen', // Create the game inside the <div id="game"> 
    });  
}