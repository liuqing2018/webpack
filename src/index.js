import logo from './assets/bg.jpg';
let img = new Image();
// img.src = './assets/bg.jpg';
img.src = logo;
img.width = 400;
img.height = 300;
document.body.appendChild(img);

// require('@babel/polyfill');

// import a from './lib/a';
//
// // import b from './lib/b';
require('./style/base.css');
require('./style/style.less');
//
// console.log(a);
// // console.log(b);
// // console.log(b.name);
// // let tesss = 10;
// // const bools = 'test'.includes('t');
// // console.log(bools);
class A {
  constructor() {
    console.log(100000000);
  }
}
