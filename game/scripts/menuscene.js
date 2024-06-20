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
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        let video = this.add.video(gameWidth/2, gameHeight/2, 'menu_background');
        video.setDisplaySize(gameWidth, gameHeight);
        video.setScale(0.8);
        video.play(true);

        this.gameTitle = this.add.text(460, 100, "Code Of Mystery", { font: "100px VT323", fill: "#fff" });
        this.gameTitle.setShadow(2, 2, "#333", 2, true, true);

    }
    update()
    {

    }
}
export default MenuScene;