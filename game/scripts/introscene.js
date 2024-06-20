class IntroScene extends Phaser.Scene
{
    constructor()
    {   
        super({ key: "intro" });
    }
    preload()
    {
        this.load.audio("typing", "assets/soundfx/typing.mp3");
        this.load.image("intro_background", "assets/images/intro_background.jpg");
    }
    create()
    {
        this.typing_sfx = this.sound.add("typing", { loop: false, volume: 0.5 });
        this.typing_sfx.play();
        this.background = this.add.image(770, 360,"intro_background");
        this.gameTitle = this.add.text(590, 110, "The Story", { font: "80px VT323", fill: "#fff" }); 
        this.displayText();
    }
    update()
    {

    }
    displayText()
    {
        this.textAppearOnScreen("You are a cyber detective who has been assigned to solve a murder", 270, 300);
        this.timer = this.time.addEvent
        ({
            delay: 2500,
            callback: function()
            {
                this.textAppearOnScreen("The culprit left behind some hints however only you can decrypt them", 250, 400);
            },
            callbackScope: this,
            loop: false
        });
        this.timer = this.time.addEvent
        ({
            delay: 5000,
            callback: function()
            {
                this.textAppearOnScreen("Use your expertise to track down hints and hunt them down", 320, 500);
            },
            callbackScope: this,
            loop: false
        });
        this.timer = this.time.addEvent
        ({
            delay: 7000,
            callback: function()
            {
                this.typing_sfx.stop()
                this.gamePressToStart = this.add.text(545, 600, "Press Any Key To Continue", { font: "40px VT323", fill: "#fff" });
                this.tweens.add({
                    targets: this.gamePressToStart  ,
                    alpha: 0,
                    ease: 'Cubic.easeInOut',
                    duration: 1000,
                    yoyo: true,
                    repeat: -1
                });
            },
            callbackScope: this,
            loop: false
        });
    }
    textAppearOnScreen(message, width, height)
    {
        const wordCount = message.split(' ').length;
        const text = this.add.text(width, height, '', { fontSize: 25 });
        this.tweens.addCounter({
            from: 0,
            to: wordCount,
            duration: 2000,
            ease: (v) => Phaser.Math.Easing.Stepped(v, wordCount),
            onUpdate: function(_, { value }) 
            {
              text.setText(message.split(' ').slice(0, value).join(' '));    
            }
          });
    }
    
}
export default IntroScene;