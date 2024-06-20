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
    {
      question:
        "What principle allows a program to repeat actions multiple times?",
      options: ["variables", "functions", "conditional statements", "loops"],
      correct: "loops",
    },
    {
      question:
        "What is the principle of grouping a set of actions together so they can be reused called?",
      options: ["variables", "data types", "functions", "loops"],
      correct: "functions",
    },
    {
      question:
        "Which of the following statements best describes the main concepts learned in this level?",
      options: [
        "Variables store data, and conditional statements allow decisions based on conditions.",
        "Loops allow repeated actions, and functions group code for reuse.",
        "Input/Output operations enable interaction with users.",
        "All of the above.",
      ],
      correct: "All of the above.",
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
        this.load.image("level1_background", "assets/images/light_blue_city.png");
        preloadBaseLevel(this);
        this.load.image("button", "assets/images/button.png")
        this.plot = "As you delve into the digital evidence, you uncover the first encrypted clue left by the culprit. To decrypt it, you must apply your knowledge of fundamental programming principles.";
    }
    create()
    {
        this.background = this.add.image(770, 360,"level1_background");
        loadBaseLevel(this);
        this.loadButtons();
        let plotText = this.add.text(160, 250,this.plot, { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff', 
            align: 'center', 
            wordWrap: { width: 500 } // This is the key part for text wrapping
        });
        let questionText = this.add.text(160, 400,quiz_data[this.quizIndex].question, { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff', 
            align: 'center', 
            wordWrap: { width: 500 } // This is the key part for text wrapping
        });
        let answer1 = this.add.text(920, 295,quiz_data[this.quizIndex].options[0], {
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: 'black', 
            align: 'center', 
        });
        let answer2 = this.add.text(915, 475,quiz_data[this.quizIndex].options[1], {
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: 'black', 
            align: 'center', 
        });
        let answer3 = this.add.text(1200, 295,quiz_data[this.quizIndex].options[2], {
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: 'black', 
            align: 'center', 
        });
        let answer4 = this.add.text(1200, 475,quiz_data[this.quizIndex].options[3], {
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: 'black', 
            align: 'center', 
        });
    }
    loadButtons()
    {
        this.button1 = this.add.image(960, 310,"button").setInteractive();
        this.button1.setScale(0.35);
        this.button1.on('pointerdown', () => {
            this.checkCorrectAnswer(quiz_data[this.quizIndex].options[0])
        });
    
        this.button2 = this.add.image(960, 490,"button").setInteractive();
        this.button2.setScale(0.35);
        this.button2.on('pointerdown', () => {
            this.checkCorrectAnswer(quiz_data[this.quizIndex].options[1])
        });
    
        this.button3 = this.add.image(1240, 310,"button").setInteractive();
        this.button3.setScale(0.35);
        this.button3.on('pointerdown', () => {
            this.checkCorrectAnswer(quiz_data[this.quizIndex].options[2])
        });
    
        this.button4 = this.add.image(1240, 490,"button").setInteractive();
        this.button4.setScale(0.35);
        this.button4.on('pointerdown', () => {
            this.checkCorrectAnswer(quiz_data[this.quizIndex].options[3])
        });
    }
    checkCorrectAnswer(answer)
    {
        if(answer == quiz_data[this.quizIndex].correct)
        {
            console.log("good");
            this.quizIndex++;
        }
        else
        {
            console.log("bad");
        }
    }
} 
export default LevelOne;;