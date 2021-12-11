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

// game script 
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
  endscreen.style.display = "none"
}
var checkDead = setInterval(function(){
  var characterTop = 
  parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  if(blockLeft<27 && blockLeft>0 && characterTop>=58) {
    block.style.display = "none";
    endScreen.style.display = 'block';
    endScreenContent.style.display = 'block';
    //if(confirm('You lost... Restart?')){
      //block.style.display = "block";
    //} else{
      //alert("Game Over!");
    //}
  }
},10);