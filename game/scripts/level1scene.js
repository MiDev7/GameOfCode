var notyf = new Notyf();

import {loadBaseLevel,preloadBaseLevel} from "./baseLevelTemplate.js";
const quiz_data = [
    {
      question:
        "What is the term used to describe different kinds of information (like numbers, text, etc.) that a program can work with?",
      options: ["variables", "data types", "functions", "algorithms"],
      correct: "data types",
    },
    {
      question:
        "What is the process of sending information from a program to the outside world called?",
      options: ["input", "output", "storage", "processing"],
      correct: "output",
    },
    {
      question:
        "What principle allows a program to make decisions and execute different actions based on those decisions?",
      options: [
        "looping",
        "functions",
        "conditional statements",
        "data structures",
      ],
      correct: "conditional statements",
    },
  ];
class LevelOne extends Phaser.Scene
{
    constructor()
    {
        super("levelOne");
        this.quizIndex = 0;
    }
    preload()
    {
        this.load.image("level_background", "assets/images/light_blue_city.png");
        preloadBaseLevel(this);
        this.load.image("button", "assets/images/button.png")
        this.plot = "As you delve into the digital evidence, you uncover the first encrypted clue left by the culprit. To decrypt it, you must apply your knowledge of fundamental programming principles.";
        this.load.image("currentStage", "assets/images/current_stage_box.png");
    }
    create()
    {
        this.background = this.add.image(770, 360,"level_background");
        loadBaseLevel(this);
        this.loadButtons();
        this.plotText = this.add.text(160, 250,this.plot, { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff', 
            align: 'center', 
            wordWrap: { width: 500 } // This is the key part for text wrapping
        });
        
        this.currentStage = this.add.image(500,100, "currentStage")
        this.currentStage.setScale(2.5);
    }
    loadButtons() {
        const buttonConfig = [
            { x: 960, y: 310, option: quiz_data[this.quizIndex].options[0] },
            { x: 960, y: 490, option: quiz_data[this.quizIndex].options[1] },
            { x: 1240, y: 310, option: quiz_data[this.quizIndex].options[2] },
            { x: 1240, y: 490, option: quiz_data[this.quizIndex].options[3] }
        ];
        this.questionText = this.add.text(160, 400,quiz_data[this.quizIndex].question, { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff', 
            align: 'center', 
            wordWrap: { width: 500 } // This is the key part for text wrapping
        });
        buttonConfig.forEach((config) => {
            // Create the button
            let button = this.add.image(config.x, config.y, "button").setInteractive();
            button.setScale(0.35);
    
            // Create the text without adding it to the scene
            let answerText = new Phaser.GameObjects.Text(this, 0, 0, config.option, {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "black",
                align: "center",
            });
    
            // Manually center the text on the button
            answerText.setOrigin(0.5, 0.5); // Set origin to center
            answerText.x = button.x;
            answerText.y = button.y;
    
            // Add the text to the scene
            this.add.existing(answerText);
    
            // Add the click event
            button.on("pointerdown", () => {
                this.checkCorrectAnswer(config.option);
            });
        });
    }
    
    
    checkCorrectAnswer(answer)
    {
        if(answer == quiz_data[this.quizIndex].correct)
        {
            this.quizIndex++;
            this.currentStage.x += 250;
            this.questionText.setText(" "); 
            if(this.quizIndex >= 3)
            {
              notyf.custom({
                message: "You are moving to level two!",
                duration: 2000,
                position: { x: "center", y: "top"}
              })
              this.scene.start("levelTwo");
            }
            this.loadButtons();
        }
        else
        {
            console.log("bad");
        }
    }
    
} 
export default LevelOne;;