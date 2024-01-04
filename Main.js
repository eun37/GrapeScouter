let [btn1, btn2, body, prac, btn_prac, h1, h2, p, btnbtnbtn, result_des, finalsujeong, txtbox_border] =
  [document.getElementById('btn1'),
  document.getElementById('btn2'),
  document.getElementById('body'),
    0, [1, 0],
  document.querySelector('h1'),
  document.querySelector('#h2'),
  document.querySelector('p'),
  document.querySelector('#btn'),
  document.querySelector('#result'),
  document.querySelector('h5'),
  document.getElementById('textbox')];

let [btnno, btnhover, btntxt] = ['#ffffff', '#dedede', '#000000']

function clickbtn(bg_js_test, char, bp1, bp2, txtcol) {
  if (prac == 0) {
    btn_prac = [bp1, bp2];
    prac = 1;
    body.style.animation = `bg_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    btnbtnbtn.style.animation = `btn_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    h1.style.animation = `txt_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    h2.style.animation = `txt_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    finalsujeong.style.animation = `txt_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    p.style.animation = `txt_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    txtbox_border.style.animation = `border_${bg_js_test} 750ms normal 1 ease-in-out`;
    result_des.style.animation = `txt_js_test${bg_js_test} 750ms normal 1 ease-in-out`;
    setTimeout(function() {
      body.style.backgroundColor = char;
      btnbtnbtn.style.backgroundColor = txtcol;
      btnbtnbtn.style.color = char;
      h1.style.color = txtcol;
      h2.style.color = txtcol;
      if (char == '#fff') {
        [btnno, btnhover,  btntxt] = ['#000', '#444444', '#fff'];
      } else if (char == '#000') {
        [btnno, btnhover,  btntxt] = ['#fff', '#dedede', '#000'];
      }
      finalsujeong.style.color = txtcol;
      p.style.color = txtcol;
      if (char == '#fff') {
        txtbox_border.style.borderColor = '#000';
      } else if (char == '#000') {
        txtbox_border.style.borderColor = '#999999';
      }
      result_des.style.color = txtcol;
      prac = 0;
    }, 740);
  }
}

btnbtnbtn.addEventListener('mouseover', function() {
  btnbtnbtn.style.backgroundColor = btnhover
  btnbtnbtn.style.color = btntxt;
});

btnbtnbtn.addEventListener('mouseout', function() {
  btnbtnbtn.style.backgroundColor = btnno
  btnbtnbtn.style.color = btntxt;
});

btn1.onclick = () => {
  if (btn_prac[0] == 0) {
    clickbtn(1, '#000', 1, 0, '#fff');
  }
}

btn2.onclick = () => {
  if (btn_prac[1] == 0) {
    clickbtn(2, '#fff', 0, 1, '#000');
  }
}