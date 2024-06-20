import {loadBaseLevel,preloadBaseLevel} from "./baseLevelTemplate.js";
class LevelOne extends Phaser.Scene
{
    constructor()
    {
        super("levelOne");
    }
    preload()
    {
        this.load.image("level1_background", "assets/images/light_blue_city.png");
        preloadBaseLevel(this);
    }
    create()
    {
        this.background = this.add.image(770, 360,"level1_background");
        loadBaseLevel(this);
        
        
    }
} 
export default LevelOne;