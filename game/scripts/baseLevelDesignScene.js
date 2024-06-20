class BaseLevel extends Phaser.Scene
{
    constructor() 
    {
        super({ key: "baseLevel" });
    }
    preload()
    {
        this.load.image("dot", "assets/images/progress_dot.png");
        this.load.image("lock", "assets/images/lock.png")
        this.load.image("border", "assets/images/border.png")
        this.load.image("button", "assets/images/button.png")
    }
    create()
    {
        this.background = this.add.image(500, 100,"dot");
        this.background.setScale(5);
        this.background = this.add.image(750, 100,"dot");
        this.background.setScale(5);
        this.background = this.add.image(1000, 90,"lock");
        this.background.setScale(2.5);
        this.background = this.add.image(400, 400,"border");
        this.background.setScale(0.75);
        this.background = this.add.image(1100, 400,"border");
        this.background.setScale(0.75);
        this.button1 = this.add.image(960, 310,"button");
        this.button1.setScale(0.35);
        this.button2 = this.add.image(960, 490,"button");
        this.button2.setScale(0.35);
        this.button3 = this.add.image(1240, 310,"button");
        this.button3.setScale(0.35);
        this.button4 = this.add.image(1240, 490,"button");   
        this.button4.setScale(0.35);
    }   
    update()
    {

    }
}
export default BaseLevel;