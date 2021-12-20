(function($) {
"use strict"; // Start of use strict

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: (target.offset().top - 71)
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});

// Scroll to top button appear
$(document).scroll(function() {
  var scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
});

// Closes responsive menu when a scroll trigger link is clicked
$('.js-scroll-trigger').click(function() {
  $('.navbar-collapse').collapse('hide');
});

// Activate scrollspy to add active class to navbar items on scroll
$('body').scrollspy({
  target: '#mainNav',
  offset: 80
});

// Collapse Navbar
var navbarCollapse = function() {
  if ($("#mainNav").offset().top > 100) {
    $("#mainNav").addClass("navbar-shrink");
  } else {
    $("#mainNav").removeClass("navbar-shrink");
  }
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);

// Floating label headings for the contact form
$(function() {
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });
});

})(jQuery); // End of use strict


// game script **//


var character = document.getElementById("character"); 
var block = document.getElementById('block');
var startBtn = document.getElementById('startBtn');
var endScreen = document.getElementById('endScreen')
var endScreenContent = document.getElementById('endScreenContent')
var disp = startBtn.style.display;
var anim = block.style.animation;

function run(){
  startBtn.style.display = "none" ;
  if (block.classList!="play") {
    block.classList.add("play");
  }
}

function jump(){
  if (character.classList != "animate" && block.classList=="play") {
  character.classList.add("animate");
  } 
  setTimeout(function(){
    character.classList.remove("animate");
  },500);
}
function replay(){
  endScreen.style.display = "none";
  endScreenContent.style.display = "none";
  block.style.display= "block";
}

var checkDead = setInterval(function(){
  var characterTop = 
  parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  if(blockLeft<27 && blockLeft>0 && characterTop>=58) {
    block.style.display = "none";
    endScreen.style.display = 'block';
    endScreenContent.style.display = 'block';
  }
},10);
// snake_Game script // 
var board_border = 'black';
var board_background = 'CornSilk';

// coordinates on the board of the snake parts to be filled by function later on
let snake = [
    {x:200,y:200},
    {x:190,y:200},
    {x:180,y:200},
    {x:170,y:200},
    {x:160,y:200},
]
// Define canvas element from html
const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext('2d');

//These are canvas commands in which fillRect, covers the whole canvas in fillStyle
// and strokeRect draws the outline of the border in strokeStyle 
function clearCanvas() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokeStyle = board_border;
    snakeboard_ctx.fillRect(0,0, snakeboard.width,snakeboard.height);
    snakeboard_ctx.strokeRect(0,0,snakeboard.width,snakeboard.height);
}

// selecting color and filling up snakes by part
function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col
    snakeboard_ctx.strokeStyle = 'black';
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10,10);
    snakeboard_ctx.strokeRect(snakePart.x,snakePart.y,10,10);
}
// this applies drawsnakepart to each element in snake array 
function drawSnake() {
    snake.forEach(drawSnakePart);
}
// to reset the canvas to square one
/* tried to use setInterval to constantly loop main() but 
 was unable to alter snakes path */
 function main() {
    if (game_over()) {
        has_eaten_food = false;
        endScreen2.style.display = 'block';
        snake=[];
    }
    setTimeout(function onTick() {
    clearCanvas();
    draw_food();
    moveSnake();
    drawSnake();
    main();
    },80)
} 

// let initial movement be right 
let dx = 10;
let dy = 0;
let score = 0;
let changing_dir = false
let head = {x: snake[0].x , y: snake[0].y};
let food_x;
let food_y;
let snake_col = 'DarkKhaki';
var adder = document.getElementById("adder");

// start game 
main();
gen_food();
// adding event listener to html doc to obtain event
document.addEventListener('keydown', chg_dir);
// prevent arrow keys from moving page by default
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);
// to incorporate movement arrow keys to change motion of snake
function chg_dir(event){

    var keyPressed = event.keyCode;
    var goingUp = dy === -10;
    var goingDown = dy === 10;
    var goingLeft = dx === -10;
    var goingRight = dx ===10;
// left arrow keycode is 37
    if (keyPressed=== 37 && !goingRight) {
        dx = -10;
        dy = 0;
// up arrow keycode is 38
    } if (keyPressed===38 && !goingDown) {
        dx = 0;
        dy=-10;
// right arrow keycode is 39
    } if (keyPressed===39 && !goingLeft) {
        dx = 10;
        dy = 0;
// down arrow keycode is 40
    } if (keyPressed === 40 && !goingUp) {
        dx = 0;
        dy = 10;
    }
} 
// condition to stop is when snake hits wall or itself
// we return true for game_over if any condition is met
function game_over() { 
    for (let i=4; i< snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y ==snake[0].y) return true
    } 
    let exitLeft = snake[0].x <0;
    let exitRight = snake[0].x > snakeboard.width-10;
    let exitUp = snake[0].y <0;
    let exitDown = snake[0].y>snakeboard.height-10;
    return exitLeft||exitRight||exitUp||exitDown
}
// to generate random locations of food not occupied by snake
function random_num(min,max) {
    return Math.round((Math.random()*(max-min) + min)/10)*10; //to get a rounded number in multiples of 10
}
function gen_food() { 
    food_x = random_num(0,snakeboard.width);
    food_y = random_num(0,snakeboard.height);
    snake.forEach(function is_on_snake(part) {
        let on_snake = part.x == food_x && part.y==food_y;
        if (on_snake) gen_food(); //if food is generated on snake, generate a new one immediately
    });
}
function draw_food() { 
    snakeboard_ctx.fillStyle = 'DarkOliveGreen';
    snakeboard_ctx.strokeStyle = 'black';
    snakeboard_ctx.fillRect(food_x, food_y, 10,10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10,10);
} //change color when snake eats food
function change_color() {
    let new_color = 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
    snake_col = new_color;
}
function score_anim() {
    adder.style.display = 'none';
}
// move by 1 pixel either left/right/up/down
function moveSnake(){
    var head = {x: snake[0].x +dx, y: snake[0].y+dy};
    let has_eaten_food = snake[0].x == food_x && snake[0].y ==food_y;
    snake.unshift(head);
    if (has_eaten_food) {
        // increase score
        score+=10;
        change_color();
        adder.style.display='inline-block';
        setTimeout(score_anim(),70);
        // display new score on screen
        document.getElementById('score').innerHTML = score;
        gen_food();
    } else{
        snake.pop();
    }
} //remove endscreen overlay, reset snake position and length, reset snake movement and score and generate new food
function restart(){
    endScreen2.style.display = 'none';
    snake = [
        {x:200,y:200},
        {x:190,y:200},
        {x:180,y:200},
        {x:170,y:200},
        {x:160,y:200},
    ];
    let dx = 10;
    let dy = 0;
    let changing_dir = false;
    let head = {x: snake[0].x , y: snake[0].y};
    gen_food();
    main();
    let score=0;
    document.getElementById('score').innerHTML = score;
    console.log(score);
}    