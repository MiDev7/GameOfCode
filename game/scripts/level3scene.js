// ok
import {loadBaseLevel,preloadBaseLevel} from "./baseLevelTemplate.js";
const quiz_data = [
    {
      question:
        "What principle involves anticipating and managing potential errors in a program to ensure it runs smoothly?",
      options: ["debugging", "error handling", "data types", "output"],
      correct: "error handling",
    },
    {
      question:
        "What principle refers to a well-defined sequence of steps to solve a specific problem or perform a task?",
      options: ["variables", "functions", "algorithms", "data structures"],
      correct: "algorithms",
    },
    {
      question:
        "What programming paradigm involves organizing code into objects that combine data and behavior?",
      options: [
        "procedural programming",
        "object oriented programming",
        "functional programming",
        "modular programming",
      ],
      correct: "object-oriented programming",
    },
  ];
class LevelThree extends Phaser.Scene
{
    constructor()
    {
        super("levelThree");
        this.quizIndex = 0;
        this.tries = 0;
        this.maxTries = 3; 
    }
    preload()
    {
        this.quizIndex = 0;
        this.tries = 0;
        this.scene.stop("levelTwo");
        this.textures.remove("level_background");
        this.load.image("level_background", "assets/images/blue_city.png");
        preloadBaseLevel(this);
        this.load.image("button", "assets/images/button.png")
        this.plot = " As you sift through the intricate layers of code, each line reveals a crucial piece of the puzzle, guiding you closer to unveiling the truth behind the mystery.";
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
          notyf.success({
            message: "Good Answer!",
            duration: 2000,
            position: { x: "center", y: "top"}
          })
          this.quizIndex++;
          this.tries = 0;
          this.currentStage.x += 250;
          this.questionText.setText(" "); 
          this.loadButtons();
        }
        else
        {
          notyf.error({
            message: "Incorrect Answer Tries left: " + (this.maxTries - this.tries),
            duration: 2000,
            position: { x: "center", y: "top"}
        })
        return;
        }
    }

    showGameOver() {
      notyf.error({
        message: "Game Over! Restarting...",
        duration: 2000,
        position: { x: "center", y: "top"}
      })    
      this.time.delayedCall(2000, () => {
          this.scene.restart(); // Restart the levelThree scene
      });
    }

    showCompletionMessage() {
      notyf.custom({
        message: "Congractulations! You have completed the quiz!",
        duration: 2000,
        position: { x: "center", y: "top"}
    })    
  }
}




export default LevelThree;