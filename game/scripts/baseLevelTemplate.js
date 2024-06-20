function loadBaseLevel(Scene)
{
    Scene.background = Scene.add.image(500, 100,"dot");
    Scene.background.setScale(5);
    Scene.background = Scene.add.image(750, 100,"dot");
    Scene.background.setScale(5);
    Scene.background = Scene.add.image(1000, 90,"lock");
    Scene.background.setScale(2.5);
    Scene.background = Scene.add.image(400, 400,"border");
    Scene.background.setScale(0.75);
    Scene.background = Scene.add.image(1100, 400,"border");
    Scene.background.setScale(0.75);
    Scene.background = Scene.add.image(500,100, "currentStage")
    Scene.background.setScale(2.5);
    Scene.button1 = Scene.add.image(960, 310,"button");
    Scene.button1.setScale(0.35);
    Scene.button2 = Scene.add.image(960, 490,"button");
    Scene.button2.setScale(0.35);
    Scene.button3 = Scene.add.image(1240, 310,"button");
    Scene.button3.setScale(0.35);
    Scene.button4 = Scene.add.image(1240, 490,"button");   
    Scene.button4.setScale(0.35);
}
function loadTrueFalseLevel(Scene)
{
    Scene.button1 = Scene.add.image(960, 310,"button");
    Scene.button1.setScale(0.35);
    Scene.button2 = Scene.add.image(960, 490,"button");
    Scene.button2.setScale(0.35);
}
function preloadBaseLevel(Scene)
{
    Scene.load.image("dot", "assets/images/progress_dot.png");
    Scene.load.image("lock", "assets/images/lock.png")
    Scene.load.image("border", "assets/images/border.png")
    Scene.load.image("button", "assets/images/button.png")
    Scene.load.image("currentStage", "assets/images/current_stage_box.png")
}
export {loadBaseLevel,preloadBaseLevel,loadTrueFalseLevel}