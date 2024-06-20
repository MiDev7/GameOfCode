import MenuScene  from "./menuscene.js";
import IntroScene from "./introscene.js";
import BaseLevel from "./baseLevelDesignScene.js";
window.onload = function()
{
    const divElement = document.getElementById('gameScreen');
    const SCREEN_HEIGHT = divElement.clientHeight;
    const SCREEN_WIDTH = divElement.clientWidth;
    new Phaser.Game({
        width: SCREEN_WIDTH, // Width of the game in pixels
        height: SCREEN_HEIGHT, // Height of the game in  pixels
        backgroundColor: 'black',
        scene: [MenuScene,IntroScene, BaseLevel], // The scenes of the game
        physics: { default: 'arcade' }, // The physics engine to use
        parent: 'gameScreen', // Create the game inside the <div id="game"> 
    });  
}