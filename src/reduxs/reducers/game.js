import {
    TICK,
    BOUNCE,
    START,
    STARTAGAIN,
    RUNGROUNDALWAYS,
    GAMEPAUSE
} from '../../constants';

import {
    vw,
    vh,
    vmin,
    vmax,
    heightOfPipeUp,
    heightOfPipeDown,
    heightOfGround,
    heightOfInvisibleArea,
    positionOfPipeDown
} from '../../services/viewport';

function getUpdatedVelocity(newPosition, bird, timeLapsed, gravity) {
    let updateVelocity = bird.velocity.y + timeLapsed * gravity;
    if (newPosition.y > 100) {
        updateVelocity = -(updateVelocity);
    }
    return {
        x: bird.velocity.x,
        y: updateVelocity
    }
}


function getUpdatedY(bird, timeLapsed, gravity) {
    let distanceCovered = bird.velocity.y * timeLapsed + 0.5 * gravity * timeLapsed * timeLapsed;
    return {
        x: bird.position.x,
        y: bird.position.y + distanceCovered
    }
}

function getUpdatedVelocityForPipe(pipe) {
    return {
        x: pipe.velocity.x,
        y: 0
    }
}

function getUpdateDimensionForPipe(pipe) {
    let h = Math.floor(Math.random() * (40-25)+1) + 25;
    return {
        width: pipe.dimension.width,
        height: h
    }
}

function getUpdateDistanceForPipe(pipe, timeLapsed) {

    function getYPosition(pipeName) {
        if (pipeName == 'PipeUp')
            return 0;
        else if (pipeName == 'PipeDown')
            return positionOfPipeDown;
        else if (pipeName == 'Invisible')
            return heightOfPipeUp;
    }

    let distanceCovered = pipe.velocity.x;

    if (pipe.position.x > 0 - pipe.dimension.width) {
        return {
            x: pipe.position.x + distanceCovered,
            y: pipe.position.y
        }
    } else {
        return {
            x: 100,
            y: getYPosition(pipe.name)
        }
    }
}

function getUpdatedPipe(items, dt, score) {
    var arr = [];
    items.map(item => {
        let updatedVelocity = getUpdatedVelocityForPipe(item);
        let newPositionOfPipe = getUpdateDistanceForPipe(item, dt);
        if (item.name == 'PipeUp' && score !== 0 && score % 4 === 0 ) {
            let updatedDimension = getUpdateDimensionForPipe(item);
            let newPipe = Object.assign({}, item, {
                position: newPositionOfPipe,
                velocity: updatedVelocity,
                dimension: updatedDimension
            });
            arr.push(newPipe);
        } else {
            let newPipe = Object.assign({}, item, {
                position: newPositionOfPipe,
                velocity: updatedVelocity,
                dimension: item.dimension
            });
            arr.push(newPipe);
        }
    })
    return arr;
}

function getUpdatedGroundPosition(ground) {
    let distanceCovered = ground.velocity.x;

    if (ground.position.x > -97) {
        return {
            x: ground.position.x + distanceCovered,
            y: 80
        }
    } else {
        return {
            x: 100,
            y: 80
        }
    }
}


function updateGroundPosition(gameObjects) {

    let arr = [];
    gameObjects.map(item => {
        if (item.static == true && item.rigid == false) {
            var newGroundPosition = getUpdatedGroundPosition(item);
            var newGround = Object.assign({}, item, {
                position: newGroundPosition
            })
            arr.push(newGround);
        } else {
            arr.push(item)
        }

    })
    return arr;

}


function update(gameObjects, dt = 1000 / 60, gravity = 0.0001) {
    var arr = [];
    gameObjects.map(item => {
        if (item.static == false) {
            let newPosition = getUpdatedY(item, dt, gravity);
            let updatedVelocity = getUpdatedVelocity(newPosition, item, dt, gravity);
            let newBird = Object.assign({}, item, {
                position: newPosition,
                velocity: updatedVelocity
            });
            arr.push(newBird);
        } else if (item.static == true && item.rigid == true) {
            let updatedVelocity = getUpdatedVelocityForPipe(item);
            let newPositionOfPipe = getUpdateDistanceForPipe(item, dt);
            let newPipe = Object.assign({}, item, {
                position: newPositionOfPipe,
                velocity: updatedVelocity,
                dimension: item.dimension
            });
            arr.push(newPipe);
        } else if (item.static == true && item.rigid == false) {
            let newGroundPosition = getUpdatedGroundPosition(item);
            let newGround = Object.assign({}, item, {
                position: newGroundPosition
            })
            arr.push(newGround);

        } else {
            arr.push(item)
        }

    })
    return arr;
}

function bounce(gameObjects, dt = 1000 / 60, score) {
    let arr = [];
    let bird = gameObjects[0];
    let pipes =[gameObjects[1],gameObjects[2],gameObjects[3],gameObjects[4]];
    let bounceUpdatedVelocity = {
        x: bird.velocity.x,
        y: -0.05
    }
    let newBird = Object.assign({}, bird, {
        velocity: bounceUpdatedVelocity
    });
    arr.push(newBird);
    let newPipes = getUpdatedPipe(pipes, dt, score);
    let newArr = arr.concat(newPipes);
    return newArr.concat(gameObjects.slice(5));
}


function detectCollition(bird, visibleObject) {

    let birdXPostion = bird.position.x * vmin;
    let birdYPostion = bird.position.y * vmax;
    let birdWidth = bird.dimension.width * vmin;
    let birdHeight = bird.dimension.height * vmax;

    let visibleObjectXPosition = visibleObject.position.x * vmin;
    let visibleObjectYPosition = visibleObject.position.y * vmax;
    let visibleObjectWidth = visibleObject.dimension.width * vmin;
    let visibleObjectHeight = visibleObject.dimension.height * vmax

    if (birdXPostion < visibleObjectXPosition + visibleObjectWidth &&
        birdXPostion + birdWidth > visibleObjectXPosition &&
        birdYPostion < visibleObjectYPosition + visibleObjectHeight &&
        birdHeight + birdYPostion > visibleObjectYPosition) {
        return true;
    }

}

function checkForCollition(gameObjects) {

    let bird = gameObjects[0];
    let pipeUp = gameObjects[1];
    let pipeUpO = gameObjects[2];
    let pipeDown = gameObjects[3];
    let pipeDownO = gameObjects[4];
    let ground = gameObjects[7];
    let groundO = gameObjects[8];

    if (detectCollition(bird, pipeDown)) {
        return true;
    }
    if (detectCollition(bird, pipeUp)) {
        return true;
    }
    if (detectCollition(bird, pipeUpO)) {
        return true;
    }
    if (detectCollition(bird, pipeDownO)) {
        return true;
    }
    if (detectCollition(bird, ground)) {
        return true;
    }
    if (detectCollition(bird, groundO)) {
        return true;
    } else {
        return false;
    }

}


function checkForScoreUp(gameObjects, score, collidedArray) {
    let bird = gameObjects[0];
    let invisible = gameObjects[5];
    let invisibleO = gameObjects[6];

    let birdXPostion = bird.position.x * vmin;
    let birdYPostion = bird.position.y * vmax;
    let birdWidth = bird.dimension.width * vmin;
    let birdHeight = bird.dimension.height * vmax;

    let invisibleXPosition = invisible.position.x * vmin;
    let invisibleYPosition = invisible.position.y * vmax;
    let invisibleWidth = invisible.dimension.width * vmin;
    let invisibleHeight = invisible.dimension.height * vmax;

    let invisibleOXPosition = invisibleO.position.x * vmin;
    let invisibleOYPosition = invisible.position.y * vmax;
    let invisibleOWidth = invisibleO.dimension.width * vmin;
    let invisibleOHeight = invisibleO.dimension.height * vmax;

    if (birdXPostion < invisibleXPosition + invisibleWidth &&
        birdXPostion + birdWidth > invisibleXPosition &&
        birdYPostion < invisibleYPosition + invisibleHeight &&
        birdHeight + birdYPostion > invisibleYPosition) {
        if (collidedArray.length == 0) {
            score++;
        }
        return {
            score: score,
            collidedArray: [invisible.name]
        };

    }
    if (birdXPostion < invisibleOXPosition + invisibleOWidth &&
        birdXPostion + birdWidth > invisibleOXPosition &&
        birdYPostion < invisibleOYPosition + invisibleOHeight &&
        birdHeight + birdYPostion > invisibleOYPosition) {
        if (collidedArray.length == 0) {
            score++;
        }
        return {
            score: score,
            collidedArray: [invisible.name]
        };

    } else {
        return {
            score: score,
            collidedArray: []
        };
    }
}

const startAgainState = {
    game: {
        gravity: 0.0001,
        objects: [{
                name: 'bird',
                position: {
                    x: 50,
                    y: 55
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                dimension: {
                    width: 10,
                    height: 8
                },
                rigid: true,
                static: false,
                invisible: false
            },
            {
                name: 'PipeUp',
                position: {
                    x: 110,
                    y: 0
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeUp
                },
                rigid: true,
                static: true,
                invisible: false
            },
            {
                name: 'PipeUp',
                position: {
                    x: 150,
                    y: 0
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeUp
                },
                rigid: true,
                static: true,
                invisible: false
            },
            {
                name: 'PipeDown',
                position: {
                    x: 110,
                    y: positionOfPipeDown
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeDown
                },
                rigid: true,
                static: true,
                invisible: false
            },
            {
                name: 'PipeDown',
                position: {
                    x: 150,
                    y: positionOfPipeDown
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeDown
                },
                rigid: true,
                static: true,
                invisible: false
            },
            {
                name: 'Invisible',
                position: {
                    x: 110,
                    y: heightOfPipeUp
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfInvisibleArea
                },
                rigid: true,
                static: true,
                invisible: true
            },
            {
                name: 'Invisible',
                position: {
                    x: 150,
                    y: heightOfPipeUp
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfInvisibleArea
                },
                rigid: true,
                static: true,
                invisible: true
            },
            {
                name: "Ground",
                position: {
                    x: 0,
                    y: 80
                },
                velocity: {
                    x: -1,
                    y: 0
                },
                dimension: {
                    width: 100,
                    height: heightOfGround
                },
                rigid: false,
                static: true,
                invisible: true
            },
            {
                name: "Ground",
                position: {
                    x: 100,
                    y: 80
                },
                velocity: {
                    x: -1,
                    y: 0
                },
                dimension: {
                    width: 100,
                    height: heightOfGround
                },
                rigid: false,
                static: true,
                invisible: true
            }
        ],
        score: 0,
        gameOver: false,
        collidedArray: [],
        start: true
    }
}

const game = (state = {}, action) => {
    switch (action.type) {
        case TICK:
            let scoreCheck = checkForScoreUp(state.objects, state.score, state.collidedArray);
            return Object.assign({}, state, {
                objects: update(state.objects, action.dt, state.gravity),
                gameOver: checkForCollition(state.objects),
                score: checkForScoreUp(state.objects, state.score, state.collidedArray).score,
                collidedArray: checkForScoreUp(state.objects, state.score, state.collidedArray).collidedArray
            });
        case BOUNCE:
            return Object.assign({}, state, {
                objects: bounce(state.objects, action.dt, state.score)
            });
        case START:
            return Object.assign({}, state, {
                start: true
            });
        case GAMEPAUSE:
            return Object.assign({}, state, {
                gameOver: true
            });
        case STARTAGAIN:
            return startAgainState.game;
        case RUNGROUNDALWAYS:
            return Object.assign({}, state, {
                objects: updateGroundPosition(state.objects)  
            });
        default:
            return state
    }
}

export default game;