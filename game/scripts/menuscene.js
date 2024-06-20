class MenuScene extends Phaser.Scene
{
    constructor()
    {   
        super({ key: "default" });
    }
    preload()
    {

    }
    create()
    {
        this.gameTitle = this.add.text(460, 100, "Code Of Mystery", { font: "100px VT323", fill: "#fff" });
    }
    update()
    {

    }
}
export default MenuScene;