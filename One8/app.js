// By If else method 

const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach(function (button) {
  console.log(button);
  button.addEventListener('click', function (e) {
    console.log(e);
    console.log(e.target);
    if (e.target.id === 'grey') {
      body.style.backgroundColor = e.target.id;
    }
    if (e.target.id === 'white') {
      body.style.backgroundColor = e.target.id;
    }
    if (e.target.id === 'blue') {
      body.style.backgroundColor = e.target.id;
    }
    if (e.target.id === 'yellow') {
      body.style.backgroundColor = e.target.id;
    }
    
  });
});



// By Switch  case method 

// const buttons = document.querySelectorAll('.button');
// const body = document.querySelector("body");
// buttons.forEach(function (button) {
//   console.log(button);
//   button.addEventListener('dblclick', function (e) {
//     // console.log(e);
//     // console.log(e.target);
//     switch (e.target.id) {
//       case 'grey':
//       case 'blue':
//       case 'yellow':
//       case 'white':
//         body.style.backgroundColor = e.target.id;
//         break;
//     }
//   });
// });


// alternative method .....

// const allButtons = document.querySelectorAll(".button");
// const body = document.querySelector("body");

// allButtons.forEach(function(button){
//     button.addEventListener('mouseover', function(event){
//         body.style.backgroundColor = button.id;
//     });
// });