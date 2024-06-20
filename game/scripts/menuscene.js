class MenuScene extends Phaser.Scene
{
    constructor()
    {   
        super({ key: "default" });
    }
    preload()
    {
        this.load.video('menu_background', 'assets/videos/menu_background.mp4', 'loadeddata', false, true);
    }
    create()
    {
        this.setupMenuScene();
    }
    update()
    {

    }
    setupMenuScene()
    {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        let video = this.add.video(gameWidth/2, gameHeight/2, 'menu_background');
        video.setDisplaySize(gameWidth, gameHeight);
        video.setScale(0.8);
        video.play(true);

        this.gameTitle = this.add.text(460, 100, "Code Of Mystery", { font: "100px VT323", fill: "#fff" });
        this.gameTitle.setShadow(10, 2, "black", 2, true, true);

        this.gamePressToStart = this.add.text(575, 500, "Press Any Key To Start", { font: "40px VT323", fill: "#fff" });
        this.tweens.add({
            targets: this.gamePressToStart  ,
            alpha: 0,
            ease: 'Cubic.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }
}
export default MenuScene;