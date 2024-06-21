var notyf = new Notyf();
import { loadBaseLevel, preloadBaseLevel } from "./baseLevelTemplate.js";

const quiz_data = [
    {
        question:
            "What principle involves reading from and writing to data storage to manage information persistently?",
        options: ["input", "output", "file i/o", "error handling"],
        correct: "file i/o",
    },
    {
        question:
            "What principle involves a function calling itself to solve smaller instances of the same problem?",
        options: ["iteration", "recursion", "modular programming", "oop"],
        correct: "recursion",
    },
    {
        question:
            "What term refers to general reusable solutions to common problems in software design?",
        options: ["data structures", "design patterns", "functions", "algorithms"],
        correct: "design patterns",
    },
];

class LevelThree extends Phaser.Scene {
    constructor() {
        super("levelThree");
    }

    preload() {
        this.quizIndex = 0;
        this.tries = 0;
        this.scene.stop("levelTwo");
        this.textures.remove("level_background");
        this.load.image("level_background", "assets/images/blue_city.png");
        preloadBaseLevel(this);
        this.load.image("button", "assets/images/button.png");
        this.plot =
            "With each decoded fragment, the veil of deception begins to lift, exposing a web of intrigue that spans across the city. ";
        this.load.image("currentStage", "assets/images/current_stage_box.png");
    }

    create() {
        this.quizIndex = 0;
        this.tries = 0;
        this.maxTries = 3; 
        this.timerText = null;
        this.timerValue = 60; // Initial timer value in seconds
        this.timerEvent = null;
        this.background = this.add.image(770, 360, "level_background");
        loadBaseLevel(this);
        this.loadButtons();
        this.plotText = this.add.text(160, 250, this.plot, {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#ffffff",
            align: "center",
            wordWrap: { width: 500 },
        });
        this.currentStage = this.add.image(500, 100, "currentStage");
        this.currentStage.setScale(2.5);
        this.timerText = this.add.text(0, 0, 'Time: ' + this.timerValue, { fontFamily: 'Arial', fontSize: '40px', color: '#ffffff' });
        this.timerText.setShadow(1, 0, "black", 10 , true, true);
        const delay = 1000; // 1000 milliseconds = 1 second
        this.timerEvent = this.time.addEvent({
            delay: delay,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    loadButtons() {
        const buttonConfig = [
            { x: 960, y: 310, option: quiz_data[this.quizIndex].options[0] },
            { x: 960, y: 490, option: quiz_data[this.quizIndex].options[1] },
            { x: 1240, y: 310, option: quiz_data[this.quizIndex].options[2] },
            { x: 1240, y: 490, option: quiz_data[this.quizIndex].options[3] },
        ];
        this.questionText = this.add.text(
            160,
            400,
            quiz_data[this.quizIndex].question,
            {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                align: "center",
                wordWrap: { width: 500 },
            }
        );
        buttonConfig.forEach((config) => {
            // Create the button
            let button = this.add.image(config.x, config.y, "button").setInteractive();
            button.setScale(0.35);

            // Create the text without adding it to the scene
            let answerText = new Phaser.GameObjects.Text(
                this,
                0,
                0,
                config.option,
                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    color: "black",
                    align: "center",
                }
            );

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

    checkCorrectAnswer(answer) {
        if (answer == quiz_data[this.quizIndex].correct) {
            notyf.success({
                message: "Good Answer!",
                duration: 2000,
                position: { x: "center", y: "top" }
            });
            this.quizIndex++;
            this.tries = 0;
            if (this.quizIndex < quiz_data.length) {
                this.currentStage.x += 250;
                this.questionText.setText(" ");
                this.loadButtons();
            } else {
                notyf.success({
                    message: "You Won!!!",
                    duration: 2000,
                    position: { x: "center", y: "top" }
                });
                setTimeout(() => {
                    window.location.href = "/static/pages/welcome.html"; 
                }, 3000); // 3-second delay
            }
        } else {
            notyf.error({
                message: "Incorrect Answer",
                duration: 2000,
                position: { x: "center", y: "top" }
            });
        }
        
    }
    updateTimer() {
        // Update the timer value and display it
        this.timerValue--;
        this.timerText.setText('Time: ' + this.timerValue);
    
        // Check if timer has reached zero
        if (this.timerValue <= 0) {
            // Timer has expired, handle end game logic here
            this.timerText.setText('Time: 0');
            this.timerEvent.destroy(); // Stop the timer event
            this.time.delayedCall(1000, () => {
                this.scene.restart();
            });
        }
    }
}

export default LevelThree;
