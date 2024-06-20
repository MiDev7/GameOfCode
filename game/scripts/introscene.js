class IntroScene extends Phaser.Scene
{
    constructor()
    {   
        super({ key: "intro" });
    }
    preload()
    {
        this.textAppearOnScreen("",100,100)
    }
    create()
    {
        this.gameTitle = this.add.text(590, 45, "The Story", { font: "80px VT323", fill: "#fff" });
        this.textAppearOnScreen("You are a detective", 100, 100);

    }
    update()
    {

    }
    textAppearOnScreen(message, width, height)
    {
        const wordCount = message.split(' ').length;
        const text = this.add.text(width, height, '', { fontSize: 25 });
        this.tweens.addCounter({
            from: 0,
            to: wordCount,
            ease: (v) => Phaser.Math.Easing.Stepped(v, wordCount),
            onUpdate: function(_, { value }) 
            {
              text.setText(message.split(' ').slice(0, value).join(' '));    
            }
          });
    }
}
export default IntroScene;