const apikey = "test_ee1a99573cc5493b867afdfc9942c6d8b0ee06bc6f1d5dae4708fc7464ce822175de9c7c948e71512dfcb2e838373f09";
let txva = '';
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

const btn = document.getElementById('charsetonbtn');
const textbox = document.getElementById('Character_name');
const charinfores = document.getElementById('charinfores');
const charimgres = document.getElementById('charimgres');

function get_podo() {
  fetch(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=c5bc6048ce6b33728fce893890bc431defe8d04e6d233bd35cf2fabdeb93fb0d`, {
    method: 'GET',
    headers: {
      "x-nxopen-api-key": apikey
    }
  })
    .then(res => res.json())
    .then(myJson => {
      const getpodo = myJson.final_stat[42].stat_value;
      podo_force = Number(getpodo);
      document.getElementById("pdgij").innerHTML = `${numberToKorean(podo_force)}`;
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
          charinfores.innerHTML = `조회할 수 없습니다.`;
          fun_res++;
        } else if (fun_res > 0) {
          charinfores.innerHTML = `조회할 수 없습니다.`;
        }
      }
      let req_url_image = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${myJson.ocid}`;
      fetch(req_url_image, {
        method: "GET",
        headers: {
          "x-nxopen-api-key": apikey
        }
      })
        .then(res => res.json())
        .then(myJson => {
          if (fun_res == 0) {
            charimgres.src = myJson.character_image;
            if (myJson.character_image == null || myJson.character_image == undefined) {
              // charimgres.src = 'https://th.bing.com/th/id/R.9a981ce34f9140f665dbfc98df12eaa7?rik=vqi7Q%2bLw1N5NMA&riu=http%3a%2f%2fpostfiles7.naver.net%2f20131027_230%2fmimi5527_1382857144898o7avf_PNG%2f1382857142188_PicsArt_1382236000731.png%3ftype%3dw3&ehk=RjQURca2zi2pXUZhMCanJQRsfJlRNwMQ8DJFSlh20yM%3d&risl=&pid=ImgRaw&r=0';
                charimgres.src = '';
            }
          } else if (fun_res > 0) {
              charimgres.src = myJson.character_image;
              if (myJson.character_image == null || myJson.character_image == undefined) {
                // charimgres.src = 'https://th.bing.com/th/id/R.9a981ce34f9140f665dbfc98df12eaa7?rik=vqi7Q%2bLw1N5NMA&riu=http%3a%2f%2fpostfiles7.naver.net%2f20131027_230%2fmimi5527_1382857144898o7avf_PNG%2f1382857142188_PicsArt_1382236000731.png%3ftype%3dw3&ehk=RjQURca2zi2pXUZhMCanJQRsfJlRNwMQ8DJFSlh20yM%3d&risl=&pid=ImgRaw&r=0';
                charimgres.src = '';
              }
          }
        })

      let req_url_status = `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${myJson.ocid}`;
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
          if (fun_res >= 0) {
            charinfores.innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)} 포도`;
            if (textbox.value == '황금맛포도') {
              charinfores.innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)} 포도<br>숯과자`;
            }
            if (textbox.value == '원킬도적') {
              charinfores.innerHTML = `전투력 ${result_kor}<br>${(result).toFixed(1)} 포도<br>응가도적`;
            }
            fun_res++;
          }
        })
    })
}

document.getElementById('asdfasdfasdf').addEventListener('keydown', function(event) {
  if(event.key === 'Enter') {
    event.preventDefault();
    asdfasdf();
  }
})

btn.onclick = () => {
  asdfasdf();
}

function asdfasdf() {
  if (txva == textbox.value && textbox.value != '') {
    fun_res++;
    return;
  }
  txva = textbox.value;
  if (txva != '') {
    getUser(txva);
  } else {
    if (fun_res == 0) {
      charinfores.innerHTML = `캐릭터명을 입력해주세요!`;
      fun_res++;
    } else if (fun_res > 0) {
        charinfores.innerHTML = `캐릭터명을 입력해주세요!`;
        // charimgres.src = 'https://th.bing.com/th/id/R.9a981ce34f9140f665dbfc98df12eaa7?rik=vqi7Q%2bLw1N5NMA&riu=http%3a%2f%2fpostfiles7.naver.net%2f20131027_230%2fmimi5527_1382857144898o7avf_PNG%2f1382857142188_PicsArt_1382236000731.png%3ftype%3dw3&ehk=RjQURca2zi2pXUZhMCanJQRsfJlRNwMQ8DJFSlh20yM%3d&risl=&pid=ImgRaw&r=0';
        charimgres.src = '';
      fun_res++;
    }
  }
}
