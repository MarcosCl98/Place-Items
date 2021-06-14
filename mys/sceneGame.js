class SceneGame extends Phaser.Scene {

    constructor ()
    {
        super('SceneGame');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.numCorrectsPlayer1 = 0;
        this.freeze = false;

        this.numErrors = 0;
        this.roomPositions = [new Position(200,100),new Position(200,-100)];
        this.boardRooms = [
            {sprite:'bathroom', couple:1},
            {sprite:'kitchen', couple:2},
            {sprite:'room', couple:3},
            {sprite:'garage', couple:4}
        ];    

        this.objectsPositions = [new Position(-300,150),new Position(-150,150),new Position(-300,0),new Position(-150,0),new Position(-300,-150),new Position(-150,-150)];
        this.boardObjects = [
            {sprite:'brush', couple:1},
            {sprite:'flower', couple:3},
            {sprite:'frying-pan', couple:2},
            {sprite:'lamp', couple:3},
            {sprite:'microwave', couple:2},
            {sprite:'picture', couple:3},
            {sprite:'spatula', couple:2},
            {sprite:'toilet-paper', couple:1},
            {sprite:'towel', couple:1},
            {sprite:'ball', couple:4},
            {sprite:'extinguisher', couple:4},
            {sprite:'wheel', couple:4}
        ]; 
    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpg');

        //Rooms
        this.load.spritesheet('bathroom', 'mys/assets/bathroom.jpg',
        { frameWidth: 300, frameHeight: 200 }  );

        this.load.spritesheet('kitchen', 'mys/assets/kitchen.jpg',
        { frameWidth: 300, frameHeight: 200 }  );

        this.load.spritesheet('room', 'mys/assets/room.jpg',
        { frameWidth: 300, frameHeight: 200 }  );

        this.load.spritesheet('garage', 'mys/assets/garage.jpg',
        { frameWidth: 300, frameHeight: 200 }  );

        //Objects
        this.load.spritesheet('ball', 'mys/assets/ball.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('brush', 'mys/assets/brush.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('flower', 'mys/assets/flower.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('frying-pan', 'mys/assets/frying-pan.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('lamp', 'mys/assets/lamp.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('microwave', 'mys/assets/microwave.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('picture', 'mys/assets/picture.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('spatula', 'mys/assets/spatula.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('toilet-paper', 'mys/assets/toilet-paper.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('towel', 'mys/assets/towel.png',
        { frameWidth: 150, frameHeight: 100 }  );
        
        this.load.spritesheet('ball', 'mys/assets/ball.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('wheel', 'mys/assets/wheel.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('extinguisher', 'mys/assets/extinguisher.png',
        { frameWidth: 150, frameHeight: 100 }  );  

        //Emojis
        this.load.image('sad', 'mys/assets/sad.png');
        this.load.image('smile', 'mys/assets/smile.png');
    }  

     

    create ()
    {
        initTracking ('sceneGame')

        this.add.image(this.x, this.y,'background');

        this.emojiSad = this.add.image(this.x, this.y-250,'sad');
        this.emojiSmile = this.add.image(this.x, this.y-250,'smile');
        this.emojiSad.setVisible(false);
        this.emojiSmile.setVisible(false);

        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0x000000');

        this.checkPreviousGame(this.roomPositions.length);

        this.rooms = [];
        this.createRooms=true;
        this.objects = [];
        this.createObjects=true;
        this.createGame();

        this.physics.add.overlap(this.rooms,this.objects,this.checkCollision,null,this);
        this.createText();
  }

    update()
    {  
        
    }

    //Getters
    getRandomPosition(max,min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    //Checkers
    checkFinishGame(){
        this.contador = 0;
        this.objects.forEach(element => {
                if(!element.getIsVisible()){
                    this.contador++; 
                }
        });
        if(this.contador == 6){
            setTimeout(() => {
                this.rooms.forEach(element => {
                    element.setVisible(false);
                });
                this.winnerText.setText("Congratulations!!" );
                this.winnerText.visible=true;
                this.clickButton.visible=true;
                finishTracking(window.location.href, 'Place Items Game',10,this.numErrors)
            }, 1500);
                
        }
    }
    
    checkPreviousGame(length){
        if(length == 0){
            this.numErrors = 0;
            this.roomPositions = [new Position(200,100),new Position(200,-100)];
            this.boardRooms = [
                {sprite:'bathroom', couple:1},
                {sprite:'kitchen', couple:2},
                {sprite:'room', couple:3},
                {sprite:'garage', couple:4}
            ];    
            this.objectsPositions = [new Position(-300,150),new Position(-150,150),new Position(-300,0),new Position(-150,0),new Position(-300,-150),new Position(-150,-150)];
            this.boardObjects = [
                {sprite:'brush', couple:1},
                {sprite:'flower', couple:3},
                {sprite:'frying-pan', couple:2},
                {sprite:'lamp', couple:3},
                {sprite:'microwave', couple:2},
                {sprite:'picture', couple:3},
                {sprite:'spatula', couple:2},
                {sprite:'toilet-paper', couple:1},
                {sprite:'towel', couple:1},
                {sprite:'ball', couple:4},
                {sprite:'extinguisher', couple:4},
                {sprite:'wheel', couple:4}
            ]; 
        }
    }

    checkCollision(related1, related2){
        this.initialText.visible=false;
        if(!this.freeze && related1.getIsVisible() && related2.getIsVisible()){
            if(related1.getCouple() == related2.getCouple()){
                this.numCorrectsPlayer1++;
                related2.setVisible(false);
                related2.setIsVisible(false);
                this.emojiSmile.setVisible(true);
                this.freeze = true;
                setTimeout(() => {
                    this.freeze = false;
                    this.emojiSmile.setVisible(false);
                }, 1500);
                this.checkFinishGame();
            }else{
                this.numErrors++;
                related2.restart();
                this.emojiSad.setVisible(true);
                this.freeze = true;
                setTimeout(() => {
                    this.freeze = false;
                    this.emojiSad.setVisible(false);
                }, 1500);
            }
        }
    }

    //Creates
    createGame(){
        this.boardRooms.splice(this.getRandomPosition(this.boardRooms.length-1,0), 1);
        this.boardRooms.splice(this.getRandomPosition(this.boardRooms.length-1,0), 1);
        this.boardRooms.forEach(element => {
            var posicion = this.getRandomPosition(this.roomPositions.length-1,0)
            var xroomObject = this.roomPositions[posicion];
            var roomObject = new Room ( this, xroomObject.getX()+this.x, xroomObject.getY()+this.y, element["sprite"], element["couple"]);
            this.roomPositions.splice(posicion, 1)
            this.rooms.push( roomObject );
            if(this.roomPositions.length == 0){
                this.createRooms = false;
            }
            
        });
        
        this.boardObjects.forEach(element => {
            if(element["couple"] == this.rooms[0].getCouple() || element["couple"] == this.rooms[1].getCouple() ){
                var posicion = this.getRandomPosition(this.objectsPositions.length-1,0)
                var xObject = this.objectsPositions[posicion];
                var roomItem = new RoomItem ( this, xObject.getX()+this.x, xObject.getY()+this.y, element["sprite"], element["couple"]);
                this.objectsPositions.splice(posicion, 1)
                this.objects.push( roomItem );
                if(this.objectsPositions.length == 0){
                    this.createObjects = false;
                }
            }  
        });
    }

    createText(){

        this.initialText = this.add.text(this.x-150, this.y-270);
        this.initialText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.initialText.setText("Drag and drop the items!");
        this.initialText.visible=true;

        this.winnerText = this.add.text(this.x-120, this.y-120);
        this.winnerText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.winnerText.visible=false;

        this.clickButton = new TextButton(this, this.x-220, this.y-50, 'Click here to return to the menu !',
             { fontFamily: 'myFont', fontSize:30, fill: '#ffff00'}, () => this.scene.start('SceneMenu'));
        this.add.existing(this.clickButton);
        this.clickButton.visible=false;
    }
    
}