const apikey = "test_ee1a99573cc5493b867afdfc9942c6d8b0ee06bc6f1d5dae4708fc7464ce822175de9c7c948e71512dfcb2e838373f09";
let txva = '';
let level, exprate;

function getToday() {
  const date = new Date();
  let hour = date.getHours();
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day;
  if (Number(hour) < 1) {
    day = ('0' + (date.getDate() - 2)).slice(-2);
  } else if (Number(hour) >= 1) {
    day = ('0' + (date.getDate() - 1)).slice(-2);
  }
  if (day == '00') {
    if (month == '01') {
      month = '12';
      year = date.getFullYear() - 1;
      switch (month) {
        case '01': day = '31'; break;
        case '02': if (((Number(year) % 4) == 0) && ((Number(year) % 100) != 0) || (Number(year) % 400) == 0) {
          day = '29';
        } else {
          day = '28';
        } break;
        case '03': day = '31'; break;
        case '04': day = '30'; break;
        case '05': day = '31'; break;
        case '06': day = '30'; break;
        case '07': day = '31'; break;
        case '08': day = '31'; break;
        case '09': day = '30'; break;
        case '10': day = '31'; break;
        case '11': day = '30'; break;
        case '12': day = '31'; break;
      }
    } else {
      month = ('0' + date.getMonth()).slice(-2);
      switch (month) {
        case '01': day = '31'; break;
        case '02': if (((Number(year) % 4) == 0) && ((Number(year) % 100) != 0) || (Number(year) % 400) == 0) {
          day = '29';
        } else {
          day = '28';
        } break;
        case '03': day = '31'; break;
        case '04': day = '30'; break;
        case '05': day = '31'; break;
        case '06': day = '30'; break;
        case '07': day = '31'; break;
        case '08': day = '31'; break;
        case '09': day = '30'; break;
        case '10': day = '31'; break;
        case '11': day = '30'; break;
        case '12': day = '31'; break;
      }
    }
  }
  document.getElementById("date").innerHTML = `${year}/${month}/${day}`;
  return `${year}-${month}-${day}`;
}

let todayvalue = getToday();
let fun_res = 0;

function numberToKorean(number) {
  var inputNumber = number < 0 ? false : number;
  var unitWords = ['', '만', '억', '조', '경'];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++) {
    var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}

let podo_force;

const btn = document.getElementById('btn');
const textbox = document.getElementById('textbox');

function get_podo() {
  fetch(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=c5bc6048ce6b33728fce893890bc431defe8d04e6d233bd35cf2fabdeb93fb0d&date=${todayvalue}`, {
    method: 'GET',
    headers: {
      "x-nxopen-api-key": apikey
    }
  })
    .then(res => res.json())
    .then(myJson => {
      const getpodo = myJson.final_stat[42].stat_value;
      podo_force = Number(getpodo);
    })
}

get_podo();

let ocid = '';
let J0J4 = ['', ''];

function getUser(username) {
  let req_url_username = `https://open.api.nexon.com/maplestory/v1/id?character_name=${username}`;
  fetch(req_url_username, {
    method: "GET",
    headers: {
      "x-nxopen-api-key": apikey
    }
  })
    .then(res => res.json())
    .then(myJson => {
      if (myJson.ocid == null || myJson.ocid == undefined) {
        if (fun_res == 0) {
          document.getElementById('result').innerHTML = `조회할 수 없습니다.`;
          document.getElementById('result').style.animation = `result_transition 750ms normal 1 ease-in-out`;
          setTimeout(function() {
            document.getElementById('result').style.opacity = '1';
          }, 740);
          fun_res++;
        } else if (fun_res > 0) {
          document.getElementById('result').style.animation = `result_transition_out 750ms normal 1 ease-in-out`;
          setTimeout(function() {
            document.getElementById('result').innerHTML = `조회할 수 없습니다.`;
          }, 374)
          setTimeout(function() {
            document.getElementById('result').style.opacity = '1';
            document.getElementById('result').style.animationName = `None`
          }, 740);
        }
      }
      let req_url_image = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${myJson.ocid}&date=${todayvalue}`;
      fetch(req_url_image, {
        method: "GET",
        headers: {
          "x-nxopen-api-key": apikey
        }
      })
        .then(res => res.json())
        .then(myJson => {
          if (fun_res == 0) {
            document.getElementById(`lvlresult`).style.animation = `result_transition 750ms normal 1 ease-in-out`;
            document.getElementById(`lvlresult`).innerHTML = `${myJson.character_level}레벨 ${myJson.character_exp_rate}`;
            document.getElementById(`char_image`).style.animation = `result_transition 750ms normal 1 ease-in-out`;
            document.getElementById(`char_image`).src = myJson.character_image;
            if (myJson.character_image == null || myJson.character_image == undefined) {
              document.getElementById(`char_image`).src = 'https://th.bing.com/th/id/R.9a981ce34f9140f665dbfc98df12eaa7?rik=vqi7Q%2bLw1N5NMA&riu=http%3a%2f%2fpostfiles7.naver.net%2f20131027_230%2fmimi5527_1382857144898o7avf_PNG%2f1382857142188_PicsArt_1382236000731.png%3ftype%3dw3&ehk=RjQURca2zi2pXUZhMCanJQRsfJlRNwMQ8DJFSlh20yM%3d&risl=&pid=ImgRaw&r=0';
            }
            setTimeout(function() {
              document.getElementById(`char_image`).style.opacity = '1';
            }, 740);
          } else if (fun_res > 0) {
            document.getElementById(`lvlresult`).style.animation = `result_transition 750ms normal 1 ease-in-out`;
            document.getElementById(`char_image`).style.animation = `result_transition_out 750ms normal 1 ease-in-out`;
            setTimeout(function() {
              document.getElementById(`lvlresult`).innerHTML = `${myJson.character_level}레벨 ${myJson.character_exp_rate}`;
              document.getElementById(`char_image`).src = myJson.character_image;
              if (myJson.character_image == null || myJson.character_image == undefined) {
                document.getElementById(`char_image`).src = 'https://th.bing.com/th/id/R.9a981ce34f9140f665dbfc98df12eaa7?rik=vqi7Q%2bLw1N5NMA&riu=http%3a%2f%2fpostfiles7.naver.net%2f20131027_230%2fmimi5527_1382857144898o7avf_PNG%2f1382857142188_PicsArt_1382236000731.png%3ftype%3dw3&ehk=RjQURca2zi2pXUZhMCanJQRsfJlRNwMQ8DJFSlh20yM%3d&risl=&pid=ImgRaw&r=0';
              }
            }, 374);
            setTimeout(function() {
              document.getElementById(`lvlresult`).style.opacity = '1';
              document.getElementById(`lvlresult`).style.animationName = `None`;
              document.getElementById(`char_image`).style.opacity = '1';
              document.getElementById(`char_image`).style.animationName = `None`;
            }, 740);
            if (textbox.value == '') {
              document.getElementById(`lvlresult`).innerHTML = '';
          }
        })

      let req_url_status = `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${myJson.ocid}&date=${todayvalue}`;
      fetch(req_url_status, {
        method: "GET",
        headers: {
          "x-nxopen-api-key": apikey
        }
      })
        .then(res => res.json())
        .then(myJson => {

          let result = myJson.final_stat[42].stat_value / podo_force;
          let result_kor = numberToKorean(myJson.final_stat[42].stat_value);
          if (fun_res == 0) {
            document.getElementById('result').innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)}포도`;
            if (textbox.value == '황금맛포도') {
              document.getElementById('result').innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)}포도<br><span style="font-size: 15px;">(숯과자)</span>`
            }
            if (textbox.value == '원킬도적') {
              document.getElementById('result').innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)}포도<br><span style="font-size: 15px;">(응가도적)</span>`
            }
            document.getElementById('result').style.animation = `result_transition 750ms normal 1 ease-in-out`;
            setTimeout(function() {
              document.getElementById('result').style.opacity = '1';
            }, 740);
            fun_res++;
          } else if (fun_res > 0) {
            document.getElementById('result').style.animation = `result_transition_out 750ms normal 1 ease-in-out`;
            setTimeout(function() {
              document.getElementById('result').innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)}포도`;
              if (textbox.value == '황금맛포도') {
                document.getElementById('result').innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)}포도<br><span style="font-size: 15px;">(숯과자)</span>`
              }
              if (textbox.value == '원킬도적') {
                document.getElementById('result').innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)}포도<br><span style="font-size: 15px;">(응가도적)</span>`
              }
            }, 374)
            setTimeout(function() {
              document.getElementById('result').style.opacity = '1';
              document.getElementById('result').style.animationName = `None`
            }, 740);
            fun_res++;
          }
        })
    })
}

btn.onclick = () => {
  if (txva == textbox.value && textbox.value != '') {
    fun_res++;
    return;
  }
  txva = textbox.value;
  if (txva != '') {
    getUser(txva);
  } else {
    if (fun_res == 0) {
      document.getElementById('result').innerHTML = `캐릭터명을 입력해주세요!`;
      document.getElementById('result').style.animation = `result_transition 750ms normal 1 ease-in-out`;
      document.getElementById(`char_image`).style.animation = `result_transition 750ms normal 1 ease-in-out`;
      setTimeout(function() {
        document.getElementById(`char_image`).style.opacity = '1';
        document.getElementById('result').style.opacity = '1';
      }, 740);
      fun_res++;
    } else if (fun_res > 0) {
      document.getElementById('result').style.animation = `result_transition_out 750ms normal 1 ease-in-out`;
      document.getElementById(`char_image`).style.animation = `result_transition_out 750ms normal 1 ease-in-out`;
      setTimeout(function() {
        document.getElementById('result').innerHTML = `캐릭터명을 입력해주세요!`;
        document.getElementById(`char_image`).src = 'https://th.bing.com/th/id/R.9a981ce34f9140f665dbfc98df12eaa7?rik=vqi7Q%2bLw1N5NMA&riu=http%3a%2f%2fpostfiles7.naver.net%2f20131027_230%2fmimi5527_1382857144898o7avf_PNG%2f1382857142188_PicsArt_1382236000731.png%3ftype%3dw3&ehk=RjQURca2zi2pXUZhMCanJQRsfJlRNwMQ8DJFSlh20yM%3d&risl=&pid=ImgRaw&r=0';
      }, 374)
      setTimeout(function() {
        document.getElementById(`char_image`).style.opacity = '1';
        document.getElementById('result').style.opacity = '1';
        document.getElementById('result').style.animationName = `None`
      }, 740);
      fun_res++;
    }
  }
}
