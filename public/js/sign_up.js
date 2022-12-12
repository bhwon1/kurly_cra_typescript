(($,window)=>{
  const SignUp = {
      //데이터 저장장소 객체
      // 회원 - memberDate 
      회원 : {
        가입회원: [], //array
        아이디: '', //string
        아이디중복확인:false, // boolean
        비밀번호: '', //string
        비밀번호확인: '', //string
        이름: '',
        이메일: '',
        이메일중복확인:false,
        휴대폰: '',
        휴대폰인증확인:false,
        휴대폰인증번호: '',
        setId: 0,
        주소1: '',
        주소2: '',
        성별: '',
        생년: '',
        생월: '',
        생일: '',
        추가입력사항1:'', // 속성 //string
        추가입력사항2:'', // 속성 //string
        이용약관:[], 
        가입완료: false
  
      },
  
      init(){
        this.dataBaseFn(); // 데이터베이스가져오기
        this.idFn();
        this.pwFn();
        this.pw2Fn();
        this.nameFn();
        this.emailFn();
        this.hpFn();
        this.addrFn();
        this.genderFn();
        this.birthFn();
        this.addInput();
        this.serviceFn();
        this.submitFn();
      },
      dataBaseFn(){
        let that = this ;
  
        // 데이터베이스 가져오기
          $.ajax({
            url :'./select.php',
            type:'GET',
            success: function(res){
              console.log (`ajax 회원정보 조회하기 성공! + ${res}`);
              console.log (`ajax 회원정보 조회하기 성공! + ${JSON.parse(res)}`);
              console.log( JSON.parse( res ) );
              that.회원.가입회원 = JSON.parse( res );  // 데이터베이스 데이터 저장 세계 어디서든 사용이 가능한것
            },
            error: function(err){
              // console.log (`ajax 회원정보 조회하기 실패! + ${err}`);
            }
          });
        
      },
      idFn(){
        // 특수문자 입력과 동시에 삭제 replace(정규식,'')
        // 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
        let regExp1 = '';
        let regExp2 = '';
        let regExp3 = '';
        let regExp4 = '';
        let result ='';
        let idVal = '';
        const that = this;
  
        //키보드 키가 눌러지고(keydown) 올라오면 (keyup) 입력값 받아서 처리
        $('#id').on({
          keyup: function(){
          
            regExp1 = /[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<]/g;
            regExp2 = /.{6,16}/g; //글자수 6~16
            regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g; // 영문(대소문자) 필수, 숫자 선택 : 영문(?=.*[A-Za-z])+ 혹은 숫자(?=.*[0-9])*
            regExp4 = /\s/g; //공백문자
  
            //1. 특수문자는 삭제
            idVal = $('#id').val();
            result = idVal.replace(regExp1,'');
            $('#id').val(result);
  
  
            //2. 입력제한 조건문(2,3,4조건문)
            if(idVal===''){ // 공백이면
              $('.id .guid-text').removeClass('on');
            }
            else { // 공백이 아니면
              // 특수문자는 삭제
              if( regExp2.test(idVal) === false  ||  regExp3.test(idVal) === false || regExp4.test(idVal) === true ){
                $('.id .guid-text').addClass('on');
              }
              else{
                $('.id .guid-text').removeClass('on');
                that.회원.아이디 = $(this).val();
              }
            }
  
  
          }
        });
  
  
  
  
        $('.id-ok-btn').on({
          click: function(e){
            e.preventDefault();
            regExp1 = /[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<]/g;
            regExp2 = /.{6,16}/g; //글자수 6~16
            regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g; // 영문(대소문자) 필수, 숫자 선택 : 영문(?=.*[A-Za-z])+ 혹은 숫자(?=.*[0-9])*
            regExp4 = /\s/g; //공백문자
  
            //2. 입력제한 조건문(2,3,4조건문)
            if(idVal===''){ // 공백이면
              $('.member-modal').fadeIn(300);
              $('.modal-msg').html(`아이디를 입력하세요`);
            }
            else { // 공백이 아니면
              // 특수문자는 삭제
              if( regExp1.test(idVal) === true || regExp2.test(idVal) === false  ||  regExp3.test(idVal) === false || regExp4.test(idVal) === true ){
                $('.member-modal').fadeIn(300);
                $('.modal-msg').html(`6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`);
              }
              else{
                $('.id .guid-text').removeClass('on');
                that.회원.아이디 = $('#id').val();
  
                // id 중복 체크 메소드 호출하여서 사용
                that.idCheckOK();
              }
            }
  
          }
        });
  
      },
      pwFn(){
        // | or
        // & and
        // 1. 최소 10자 이상 
        // 2. 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
        // 조합1: 영문,숫자 필수, 조합2 :영문, 특수문자 조합3 : 숫자,특수문자
        // 3. 글자 사이 공백허용 안함
        // 4. 동일한 문자 3개 이상 연속사용 불가 
        const that = this;
  
        $('#pw').on({
          keyup: function(){
            let regExp1 = /.{10,}/g;
            //((?=.*[A-Z])+(?=.*[0-9])+)+ 영문 숫자
            //((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<])+)+ 숫자 특수문자
            //((?=.*[A-Z])+(?=.*[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<])+)+ 영문 특수문자
  
            let regExp2 = /((?=.*[A-Z])+(?=.*[0-9])+)+|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<])+)+|((?=.*[A-Z])+(?=.*[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<])+)+/gi;
            let regExp3 = /\s/g;
            let regExp4 = /(.)\1\1/g; //동일한 문자 숫자 연속3번 사용불가 
  
            //예문1] hyowon1234
            //예문1] hyowon!(@#$
            //예문1] 123412334!@#
  
            let pwVal = $('#pw').val();
            if(pwVal === ''){
              $('.pw .guid-text').removeClass('on');
            }
            else{
              if(regExp1.test(pwVal) === false){ //10자 이상
                $('.pw .guid-text').removeClass('on');
                $('.pw .guid-text1').addClass('on');
              }
              else if(regExp2.test(pwVal) === false || regExp3.test(pwVal) === true){ //조합, 공백문자 조건 
                $('.pw .guid-text').removeClass('on');
                $('.pw .guid-text2').addClass('on');
              }
              else if(regExp4.test(pwVal) === true){ //
                $('.pw .guid-text').removeClass('on');
                $('.pw .guid-text3').addClass('on');
              }
              else{
                $('.pw .guid-text').removeClass('on');
                that.회원.비밀번호 = $(this).val();
              }
            }
          }
        });
      },
      pw2Fn(){
        // 비밀번호 확인 : 비밀번호 입력과 현재 비밀번호 확인 내용과 비교 
        // 1. 두값을 동일여부 비교 
        // 2. 빈값이면 : 비밀번호를 한번 더 입력해주세요 메세지 오류
        const that = this;
  
        $('#pw2').on({
          keyup: function(){
          let pw2Val = $('#pw2').val();
          let pw1Val = $('#pw').val();
  
          if( pw2Val === ''){
            $('.pw2 .guid-text').removeClass('on');
            $('.pw2 .guid-text2').addClass('on');
          }
          else{ 
            $('.pw2 .guid-text1').removeClass('on');
          
            if( pw2Val !== pw1Val){ // 동일한 비밀번호가 아니면
              $('.pw2 .guid-text2').addClass('on');
            }
            else {
              $('.pw2 .guid-text2').removeClass('on');
              that.회원.비밀번호확인 = $(this).val();
            }
          }
          }
        });
      },
      nameFn(){
        // 이름 입력
        // 정규직 : 특수문자만 제외 모두 입력 16자 이하 
        // 특수문자 입력시 동시에 삭제 
        // 반값은 : 이름을 입력해주세요 
        let that = this;
        $('#name').on({
          keyup: function(){
            const regExp = /[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<]/g;
            let nameVal = $('#name').val();
            let regExp2 = /\s/g;
  
            // 입력과 동시에 특수문자는 삭제 
              $('#name').val(nameVal.replace(regExp,''));
  
  
            if( nameVal==='' ){
              $('.name .guid-text1').addClass('on');
            }
            else {
              if ( regExp2.test(nameVal) === true){ //띄어쓰기 제작 
                $('.name .guid-text1').removeClass('on');
                $('.name .guid-text2').addClass('on');
              }
              else{
                $('.name .guid-text').removeClass('on');
                that.회원.이름 = $(this).val();
              }
            }
  
            
          }
        });
      },
      emailFn(){
        const that = this;
  
        $('#email').on({
          keyup: function(){
  
            // const regExp = /^([A-Z0-9]+[^\s]*)+@([A-Z0-9]+[^\s]*)+([._\-]?[A-Z0-9]*)*.[A-Z]{2,3}$/gi;
            const regExp = /^([A-Z0-9]+[^\s]*)+([._\-]?[A-Z0-9]*)*@([A-Z0-9]+[^\s]*)+([._\-]?[A-Z0-9]*)*.[A-Z]{2,3}$/gi;
            let emailVal = $('#email').val();
  
            if( emailVal ==='' ){
              $('.email .guid-text').addClass('on');
              $('.email .guid-text1').addClass('on');
            }
            else {
              if( regExp.test(emailVal) === false ){
              $('.email .guid-text').removeClass('on');
              $('.email .guid-text2').addClass('on');
              }
              else{
                $('.email .guid-text').removeClass('on');
                that.회원.이메일 = $('#email').val();
              }
            }
  
          }
        });
  
        // 이메일 중복환인 버튼 이벤트
        $('.email-ok-btn').on({
          click: function(e){
            e.preventDefault();
            const regExp = /^([A-Z0-9]+[^\s]*)+([._\-]?[A-Z0-9]*)*@([A-Z0-9]+[^\s]*)+([._\-]?[A-Z0-9]*)*.[A-Z]{2,3}$/gi;
            let emailVal = $('#email').val();
  
            if( emailVal ==='' ){
              $('.member-modal').fadeIn(300);
              $('.modal-msg').html(`이메일을 입력하세요`);
            }
            else {
              if( regExp.test(emailVal) === false ){
              $('.member-modal').fadeIn(300);
              $('.modal-msg').html(`이메일 형식으로 입력하세요.`);
              }
              else{
                $('.member-modal').fadeIn(300);
                  that.회원.이메일 = $('#email').val();
                // 이메일 호출
                that.emailCheckOK();
              }
            }
  
            
  
          }
        });
      },
      hpFn(){
  
        let num = null;
        let m = 2; //분 2
        let s = 59; //ch (0~59 => 60초)
        const that = this;
          
  
        $('#hp').on({
          keyup: function(){
            const regExpHome = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/g; // 집전화
            const regExp = /[`~!@#$%^&*()\-_=+|\\\]\}\[\{'";:/?.>,<]/g;
            const regExp2 = /[A-Z]/gi;
            const regExp3 = /[가-힣]/gi;
            const regExp4 = /[ㄱ-ㅎ]/g;
            const regExp5 = /[^0-9]/g;
            let hpVal = $('#hp').val();
  
            $('#hp').val(hpVal.replace(regExp, ''));
            $('#hp').val(hpVal.replace(regExp2, ''));
            $('#hp').val(hpVal.replace(regExp3, ''));
            $('#hp').val(hpVal.replace(regExp4, ''));
            $('#hp').val(hpVal.replace(regExp5, ''));
            hpVal = $('#hp').val();
  
            // 10자 이상이면 우측버튼 보이기
            if( hpVal.length>=10){
              $('.hp-btn').show()
                          .addClass('on')
                          .attr('disabled', false ); //버튼사용가능  'disabled',false
              $('.hp2-btn').hide();
              $('#hpOK').val('')
                        .focus();
            }
            else{
              $('.hp .hp-btn').removeClass('on');
            }
  
  
            if( hpVal === ''){
              $('.hp .guid-text').removeClass('on');
              $('.hp .guid-text1').addClass('on');
            }
            else{
              $('.hp .guid-text').removeClass('on');
              that.회원.휴대폰 =  $(this).val();
            }
          }
        });
  
        // 휴대폰 인증번호 받기 버튼 클릭 이벤트 disabled',true 버튼사용불가
        // 클릭 정규표현식 
        $('.hp-btn').on({
          click: function(e){
            e.preventDefault();
            const regExp = /^01[0|1|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
            let hpVal = $('#hp').val(); //입력값
  
            if( regExp.test(hpVal) === false ){
              $('.hp .guid-text').removeClass('on');
              $('.hp .guid-text2').addClass('on');
            }
            else{ //정상입력
              $('.hp .guid-text').removeClass('on');
              // 인증번호 발송 : 6자리 랜덤번호(임의의번호) 10만단위: 0000000
              // 자리내림
              num = Math.floor(Math.random()*900000+100000); //수학객체 0~1 랜덤함수
  
              that.회원.휴대폰인증번호 = num; //인증번호 잠시 보관할 변수에 저장
              
              $('.member-modal').fadeIn(300);
              $('.modal-msg').html(`인증번호가 발송되었습니다.<br>${num}`);
  
              //인증번호 확인 박스 보이기 
              $('.hp-ok-box').css({display:'flex'});
  
              //3분 카운트 함수 호출 
              timerCount ();
            }
          }
        });
  
        
  
        // 3분 카운트 프로그래밍 함수
        function timerCount(){
          m = 2; //분 2
          s = 59; //ch (0~59 => 60초)
          that.회원.setId = setInterval(function(){
            s--;
            // console.log(s);
            if(s<0){ //60초가 경과 , 그러면 1분이 감소
              s=59;
              m--;
              if(m<0){
                s=0;
                m=0;
                clearInterval(that.회원.setId);
                $('.member-modal').fadeIn(300);
                $('.modal-msg').html("유효시간이 만료되었습니다.<br>다시 시도해 주세요.");
                return;
              }
            }
            $('.minutes').text(`${ m < 10 ? '0' + m : m }`);
            $('.seconds').text(`${ s < 10 ? '0' + s : s }`);
          },1000);
        }
  
        //모달 닫기 
        $('.member-modal-close-btn').on({
          click: function(e){
            e.preventDefault();
            $('.member-modal').fadeOut(300);
            // 모달찾 닫고 인트로 페이지 이동 
            if( that.회원.가입완료 === true ){
              location.href = path; //php 전달해준 루트 위치의 변수
            }

          }
        })
  
  
      // 인증번호 입력 이벤트 
      // 숫자가 1글자 이상 빈값이 아니면 () 입력되면 우측버튼 활성화 
      // 입력상자는 숫자를 제외한 모든건 삭제 
  
      $('#hpOK').on({
        keyup: function(){
          const regExp = /[^0-9]/g; // ^ 제외 하는것
          let hpOKVal = $('#hpOK').val() 
  
          $('#hpOK').val(hpOKVal.replace(regExp,'')); 
  
          if(  $('#hpOK').length >= 1 ){
            $('.hp-ok-btn').addClass('on');
            $('.hp-ok-btn').attr('disabled' , false);
          }
          else{
            $('.hp-ok-btn').removeClass('on');
            $('.hp-ok-btn').attr('disabled' , true);
          }
        }
      });
  
      // 인증번호 확인 버튼 클릭 이벤트 
      $('.hp-ok-btn').on({
        click:function(e){
          e.preventDefault();
          that.hpCheckOK();
          // 휴대폰 인증 체크 메소드 호출 
  
  
        }
      });
  
      // 다른번호 인증
      $('.hp2-btn').on({
        click: function(e){
          e.preventDefault();
          $('#hp').attr('disabled' , false)
                  .val('')                    //입력상제 내용 삭제 
                  .focus();                   //입력대기 상태
          $('.hp .guid-text1').addClass('on');     //안내 테스트출력
        }
      });
  
  
  
      },
      addrFn(z){ //카카오 주소검색 API
        let $child = '';
        let that = this;
  
        function popupFn(){
          const popW= 530;
          const popH= 615;
          const popName = '_popup_postcode_20221024';
          const popFile = './popup.html';
          let winW= $(window).innerWidth();
          let winH= $(window).innerHeight();
          let top = (winH-popH)/2; // 탑값 = (창높이- 팝업창의 높이 ) / 2
          let left= (winW-popW)/2; // left = (창너비- 팝업창의 너비 ) / 2
  
          // console.log('창너비 ' + winW);
          // console.log('창너비 ' + winH);
  
          $child = window.open(popFile, popName, `width=${popW},height=${popH}, top=${top}, left=${left}`);
        }
        
        // 부모창에서 자식창의 입력상자 값을 가져오기 
        // let childeAddressValue = $child.$('#address1').val();
        
        // 팝업창에서 (자식창) 부모창에서 입력상자 값을 가져오기 
        // let childeAddressValue = $child.$('#address1').val();
  
        // 카카오 주소검색 버튼 클릭 이벤트
        $('.addr-search-btn').on({
          click: function(e){
            e.preventDefault();
            //팝업창 (자식창)
            popupFn();
          }
        })
  
        // 주소 재검색
        $('.addr-research-btn').on({
          click: function(e){
            e.preventDefault();
            //팝업창 (자식창)
            popupFn();
          }
        });
  
        // 팝업창에서 저작한 로컬스트레이지 데이터를 가져와서 
        // 비교하고 만약 주소 키 'kurly Address' 가 있다면 유지
        function addressFn(){
          let addressKey = 'kurly Address';
          let key = '';
          let obj = '';
  
          for(let i=0; i<sessionStorage.length; i++){
            if( sessionStorage.key(i) === addressKey){
              $('#addr1, #addr2, .addr-research-btn').show();  //주소1, 주소2, 재검색버튼 보이고
              $('.addr-search-btn').hide();                    //주소 검색버튼 사라져
  
              key = sessionStorage.getItem(addressKey); // 키 가져오기 주소2로 102동 102호
              obj = JSON.parse(sessionStorage.getItem(key)); // 주소 1, 주소2
  
              // console.log(obj);
              $('#addr1').val(obj.주소1);
              $('#addr2').val(obj.주소2);
              
            }
          }
  
        }
        addressFn();
        
  
      },
      genderFn(){
        const that = this; // 객체(object) SignUp 
        // 성별 이벤트 구현
        $('.gender-btn').each(function(idx, item){
          // console.log( idx, item.id ,item.type,item.value);
          $(this).on({ //개채  $('.gender-btn')
            change: function(){
              that.회원.성별 = $(this).val();
              // console.log (item.value);
              // console.log(this);        //  개체태그요소  <input type="radio" class='gender-btn' name='gender' id='male' value='남자' >남자</label>
              // console.log(that.회원);        // 객체(object) SignUp 
              // console.log(that.회원.성별); // 
              // console.log(that.회원.주소); // 
            }
          })
        });
      },
      birthFn(){
        const that = this;
        const regExpUnNum = /[^0-9]/g; //숫자가 아닌것
        //생년월일
        // 1. 생년 1900~2999
        // const regExpYear = /^(?:19[2-9][0-9]|2[0-9][0-9][0-9])$/g;
        const regExpYear = /^(?:19(?:2|[2-9]|[3-9][0-9])[0-9]|2[0-9][0-9][0-9])$/g;
        // 2. 생월 01 ... 09 ~ 10 11 12 or 1 ... 9 ~ 10 11 12
        const regExpMoth = /^(?:0?[1-9]|1[0-2])$/g; // const regExpMoth = /^(?:0?[1-9]|10|11|12)$/g;
        // 3. 생일 1~31 / 01~31
        const regExpDay = /^(?:0.[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
  
        // 생년월일의 체크 알고리즘
        function checkBirth(){
  
        }
  
        //0. 숫자가 아니면 삭제
        //1. 생년 이벤트 2022년 100년 기준 192[2-9]2[2-9] 이상  1922-2999
        // 키보트 이벤트 
        const nowYear = new Date().getFullYear(); //2022
  
        $('#year').on({
          keyup: function(){
            $(this).val(  $(this).val().replace(regExpUnNum, '')  );
  
            
            if ( $(this).val() === ''){
              $('.birth-day p').removeClass('on');
            }
            else if ( Number($(this).val()) > nowYear   ){  //미래년도
              $('.birth-day p').addClass('on')
                                    .text('생년월일이 미래로 입력 되었습니다.');
            }
            else if ( Number($(this).val()) >= nowYear-14   ){  // 14미만  2022-14 = 2008
              $('.birth-day p').addClass('on')
                                    .text('만 14세 미만은 가입이 불가합니다.');
            }
            else {
              if( regExpYear.test($(this).val() ) === false ){
                  $('.birth-day p').addClass('on')
                                    .text('태어난 년도 4자리를 정확하게 입력해주세요.');
              }
              else {
                if( Number($(this).val()) < 1922 ){ // 숫자와 숫자를 비교
                  $('.birth-day p').addClass('on')
                                    .text('태어난 년도 4자리를 정확하게 입력해주세요.');
                  }
                  else{
                    // $('.birth-day p').removeClass('on');
                  $('.birth-day p').text('태어난 월을 정확하게 입력해주세요.');
                  }
              }
            }
          }
        });
        $('#month').on({
          keyup: function(){
            $(this).val(  $(this).val().replace(regExpUnNum, '')  );
  
            if ( $('#year').val() === ''){
              $('.birth-day p').addClass('on')
                                .text('태어난 년도 4자리를 정확하게 입력해주세요.');
            }
            else {
              if ( $('#month').val() === ''){
                $('.birth-day p').addClass('on')
                                  .text('태어난 월을 정확하게 입력해주세요.');
              }
              else{
                if ( regExpMoth.test($('#month').val().toString())  === false ){
                  $('.birth-day p').text('태어난 월을 정확하게 입력해주세요.');
                }
                else {
                  $('.birth-day p').text('태어난 일을 정확하게 입력해주세요.');
                }
              }
            }
  
          }
        });
        $('#day').on({
          keyup: function(){
            $(this).val(  $(this).val().replace(regExpUnNum, '')  );
  
            if ( $('#year').val() === ''){
              $('.birth-day p').addClass('on')
              .text('태어난 년도 4자리를 정확하게 입력해주세요.');
            }
            else if ( $('#month').val() === ''){
              $('.birth-day p').addClass('on')
              .text('태어난 월을 정확하게 입력해주세요.');
            }
            else {
              if ( $('#day').val() === ''){
                $('.birth-day p').addClass('on')
                .text('태어난 일을 정확하게 입력해주세요.');
              }
              else{
                if ( regExpDay.test($('#day').val().toString()) ){
                  $('.birth-day p').text('태어난 일을 정확하게 입력해주세요.');
                }
                else {
                  if( Number($(this).val()) >= 32 ){ // 숫자와 숫자를 비교  32일보다 클때
                    $('.birth-day p').addClass('on')
                                      .text('태어난 일을 정확하게 입력해주세요.');
                    }
                    else{ 
                      if( Number($(this).val()) <= 0){ // 0보다 작을때 오류가 떠라
                        $('.birth-day p').addClass('on')
                                      .text('태어난 일을 정확하게 입력해주세요.');
                      }
                      else {
                        $('.birth-day p').removeClass('on');
                        that.회원.생년 = $('#year').val();
                        that.회원.생월 = $('#month').val();
                        that.회원.생일 = $('#day').val();
                      }
                      
                    }
                  
                }
              }
            }
          }
        });
      },
      addInput(){
          const that = this;
          // 추가입력사항
          $('.add-input-btn').each(function(idx, item){
            $(this).on({
              change: function(){
                $('#choocheon').attr('placeholder', item.value)
                that.회원.추가입력사항1 = $(this).val();
              }
            })
          });
  
          // 키보드 입력하면서 저장한다. 
          $('#choocheon').on({
            keyup: function(){
              that.회원.추가입력사항2 = $('#choocheon').val();
            }
          })
  
        
  
      },
      serviceFn(){ // 이용약관동의
  
        const that = this;
        let cnt = 0; 
        let arr = []; // 임시배열
      
        // 모든 체크박스 체크드 확인 카운트 함수 
        function checkedFn(){
          cnt = 0 ;
          $('.check-service').each(function(idx,item){
            if( $(this).is(':checked') === true ){
               cnt++;
              // 체크한
            }
          });
      
          if(cnt === 7){
            $('#chkAll').prop('checked' , true);
         }
         else {
            $('#chkAll').prop('checked' , false);
         }
        }
        
      
        function snsCheckState(){
          let cnt = 0 ;
          $('.sns-check').each(function(){
             if( $(this).is(':checked') === true){
                cnt++;
             }
          });
          if(cnt===2){
             $('.sns-check-all').prop('checked', true);
          }
          else {
             $('.sns-check-all').prop('checked', false);
          }
       }
      
       $('.sns-check').each(function(idx, item){
          $(this).on({
             change: function(){
                snsCheckState();
                checkedFn(); // 체크된 갯수를 카운트 7개이면 전체체크박스
             }
          })
       })
      
       $('.sns-check-all').on({
          change: function(){
             if( $(this).is(':checked') === true ){
                $('.sns-check').prop('checked', true);
             }
             else {
                $('.sns-check').prop('checked', false);
             }
             checkedFn(); // 체크된 갯수를 카운트 7개이면 전체체크박스
          }
       })
      
      
      //////////////////////////////////////////////////////////////////////
      
        // 한개 한개의 항목 체크 
        $('.check-service').each(function(idx,item){
           $(this).on({
              change: function(){
                 checkStateFn();
                 checkedFn(); // 체크된 갯수를 카운트 7개이면 전체체크박스
              }
           });
        });
      
      
        // $('.check-service').on({
        //    change: function(){
        //       checkStateFn();
        //    }
        // })
      
        // 체크된 항목의 갯수를 카운트하는 함수 : 집계(피봇)
        function checkStateFn(){
          
           
           $('.check-service').each(function(idx,item){
              if( $(this).is(':checked') === true ){
                // 체크한 항목 값 value 배열에 추가하기 ...전개연산자
                arr = [...that.회원.이용약관 , item.value ];
              }
                else {
                  // 체크 해제한 항목 값 배열에서 삭제하기
                  // 필터 배열.filler (필드 !== '사과'); g해당하는 데이터만 제외하는 메소드
                  // arr = arr.filter ((배열값)=> 배열값 !== 선택취소된항목값 );
                  arr = arr.filter ((val)=> val !== item.value ); // 취소된 항목값은 배열에서 제외되고 재배열 저장된다.
                }
           });
      
           //제거하면서 이전에 들어있는 데이터에 현재 체크된 데이터가 추가되어 중복된 배열값이 누적된다. 
           // 그래서 중복된 데이터 제거한다. [...new Set(배열) ]
      
           arr = [...new Set(arr)];
      
           that.회원.이용약관 = arr; // 최종 정리된 배열 데이터 저장
      
           console.log (that.회원.이용약관) ; // 배열상자
      
      
           // 체크 항목이 7개이면 : 전체동의합니다. 자동체크한다.
          
           //
        }
      
        // 전체동의 체크시 데이터베이스에 들어간다
      
        let 이용약관전체동의 = [
          '이용약관 동의(필수)',
          '개인정보 수집∙이용 동의(필수)',
          '개인정보 수집∙이용 동의(선택)',
          '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
          'SNS',
          '이메일',
          '본인은 만 14세 이상입니다.(필수)'
        ]
      
      
        //전체 동의합나디. 체크박스 이벤트 
        $('#chkAll').on({
           change: function(){
              // 모두 7개 항목을 체크해준다. 
              // 전체 동의가 체크되면 모두 체크한다. 
              // 전체 동의가 모두 체크 해제되면 모두 체크 해제한다.
      
              let {이용약관} = that.회원; // 비 구조화 = 구조 분할 할당 = 이 아래에서는 반드시 구조분할 할당한 변수만 사용해야한다.
      
      
              if ( $(this).is(':checked') === true ){
                $('.check-service').prop('checked', true);
                이용약관 = [...이용약관, 이용약관전체동의];
              }
              else {
                 $('.check-service').prop('checked', false);
                 이용약관 = []; // 빈배열을 넣으면 배열이 삭제된다.
                 
              }
      
              console.log(이용약관);
              
           }
        })
      
      
      
        
      
      },
      // 중복체크 메소드
      idCheckOK(){
        let that = this;
        let imsi = [];
        let result = [];
        let 아이디중복확인 = '';
        imsi = that.회원.가입회원;
        
  
        //1. 데이터베이스 서버에서 회원데이터 가져오기 
        //2. 아이디 중복검사 
        // blm2094.dothome.co.kr/1108_01_PF/sub_page/member/member_gaib
        // blm2094.dothome.co.kr/myadmin
  
        // 데이터베이스 조회하면 더이상 로컬스토레이지는 사용안함. // 내가 사용하는 컴퓨터에서만 사용가능한것 
        // 로컬스토리지 회원 데이터 가져오기
        // for(let i=0; i<localStorage.length; i++ ){
        // imsi = [...imsi, JSON.parse( localStorage.getItem(localStorage.key(i)) ) ] ; 
        // }
  
        // 아이디 
        // console.log('입력상자 아이디 ' +  $('#id').val() );
        // console.log( imsi );
  
        result = imsi.map((item)=> item.아이디 === $('#id').val() );
  
        if( $('#id').val() === ''){
          $('.member-modal').fadeIn(300);
          $('.modal-msg').html(`아이디를 입력해 주세요.`);
          $('#id').focus();
        }
        else {
          if( result.includes(true)  ){ // 배열안에 true 논리값이 포함되어 있는지 검증
            $('.member-modal').fadeIn(300);
            $('.modal-msg').html(`중복된 아이디 입니다.`);
            아이디중복확인 = false;
          }
          else{
            $('.member-modal').fadeIn(300);
            $('.modal-msg').html(`사용가능한 아이디 입니다.`);
            아이디중복확인 = true; // 인증 중복검사 완료
          }
        }
        return 아이디중복확인;
      },
      // 이메일 인증 메소드
      emailCheckOK(){
        
        let that = this;
        let imsi = []
        let result = [];
        let 이메일중복확인 = '';
  
        imsi = that.회원.가입회원;
  
        // 데이터베이스 사용시 로컬스토레이지 사용 안함. 
        // for(let i=0; i<localStorage.length; i++){
        //   imsi = [...imsi, JSON.parse(localStorage.getItem(localStorage.key(i))) ]
        // }
        result = imsi.map((data)=> data.이메일 === $('#email').val() );
  
        if( $('#email').val() === ''){
          $('.member-modal').fadeIn(300);
          $('.modal-msg').html(`이메일을 입력해주세요.`);
          $('#email').focus();
        }
        else {
          if ( result.includes(true) ){
            $('.member-modal').fadeIn(300);
            $('.modal-msg').html(`중복된 이메일 입니다.`);
            이메일중복확인 = false; 
          }
          else {
            $('.member-modal').fadeIn(300);
          $('.modal-msg').html(`사용가능한 이메일 입니다. `);
          이메일중복확인 = true; // 이메일 중복확인 완료
          }
        }
        return 이메일중복확인;
      },
  
      // 핸드폰 인증 메소드
      hpCheckOK(){
        let that = this;
        let 휴대폰인증확인 = '';
  
        // num 변수값은 인증번호 발송하면서 루트 변수(루트 변수 that.회원.인증번호)에 저장해두고 
        // 가져와서 비교한다. 
  
          if( that.회원.휴대폰인증번호 === Number($('#hpOK').val()) ){
            $('.member-modal').fadeIn(300);
            $('.modal-msg').html("인증에 성공하였습니다.");
            $('.hp-ok-box').hide();
            $('.hp-btn').hide();
            $('.hp2-btn').show();
            $('#hp').attr("disabled", true);
            휴대폰인증확인 = true;
            clearInterval(that.회원.setId);
  
          }
          else{
            $('.member-modal').fadeIn(300);
            $('.modal-msg').html("잘못된인증 코드입니다.");
            휴대폰인증확인 = false;  // 미인증 
          }
          return 휴대폰인증확인;
      },
  
      // 전송 메소드
      submitFn(){
        const that = this;
        let cnt = 0;

        // 전송(submit) 이벤트
        // 전송버튼 클릭 이벤트
        $('.submit-btn').on({
           click: function(e){
              e.preventDefault();
              // 유효성 검사 : 아이디 ~ 이용약관까지 필수요소(반드시입력)와 선택요소

              that.회원.주소1 = $('#addr1').val();
              that.회원.주소2 = $('#addr2').val();
              that.회원.아이디중복확인 =  that.idCheckOK(); // 메소드 만들어서 리턴값을 닫아서, 변수에 저장한다. 
              that.회원.이메일중복확인  = that.emailCheckOK(); // 메소드 만들어서 리턴값을 닫아서, 변수에 저장한다. 
              that.회원.휴대폰인증확인  = that.hpCheckOK(); // 메소드 만들어서 리턴값을 닫아서, 변수에 저장한다. 
  
              // 아이디 중복확인 확인하기 
              // console.log (`회원.아이디중복확인  ${that.회원.아이디중복확인}`);
              // console.log (`회원.이메일중복확인  ${that.회원.이메일중복확인}`);
              // console.log (`회원.휴대폰인증확인  ${that.회원.휴대폰인증확인}`);
                 
              
              $('.check-service').each(function(idx, item){
                 if( $(this).is(':checked') ){ //선택자 객체
                    that.회원.이용약관 = [...that.회원.이용약관, item.value];
                    // console.log( item.value.indexOf('필수') );
                    if( item.value.indexOf('필수') >= 0  ){
                       cnt++;
                    }
                 }                  
              });

              if(that.회원.아이디===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`아이디를 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }

              
              if(that.회원.비밀번호===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`비밀번호를 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
  
              if(that.회원.비밀번호확인===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`비밀번호를 한번더 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
              
              if(that.회원.비밀번호 !== that.회원.비밀번호확인){
                $('.member-modal').fadeIn(300);
                $('.modal-msg').html(`비밀번호를 확인해주세요`);
                return;
             }
             else{
                $('.member-modal').fadeOut(0);
                $('.modal-msg').html(``);
             }
  
              if(that.회원.이름===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`이름을 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
  
              if(that.회원.이메일===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`이메일을 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
  
              if(that.회원.휴대폰===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`휴대폰을 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
              
  
              if(that.회원.주소1===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`주소1을 검색하여 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
  
              if(that.회원.주소2===''){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`나머지 주소를 입력해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
  
              if(cnt<3){
                 $('.member-modal').fadeIn(300);
                 $('.modal-msg').html(`이용약관동의의 필수항목을 선택해주세요`);
                 return;
              }
              else{
                 $('.member-modal').fadeOut(0);
                 $('.modal-msg').html(``);
              }
              
  
  
             // 중복확인 & 휴대폰인증
             // 비교값이 true 이면 전송이 가능하다.
             if(that.회원.아이디중복확인 === false ){
              $('.member-modal').fadeIn(300);
              $('.modal-msg').html(`아이디 중복확인 해주세요`);
              return;
            }
            else{
                $('.member-modal').fadeOut(0);
                $('.modal-msg').html(``);
            }
  
              if(that.회원.이메일중복확인 === false ){
                $('.member-modal').fadeIn(300);
                $('.modal-msg').html(`이메일 중복확인 해주세요`);
                return;
             }
             else{
                $('.member-modal').fadeOut(0);
                $('.modal-msg').html(``);
             }
              if(that.회원.휴대폰인증확인 === false ){
                $('.member-modal').fadeIn(300);
                $('.modal-msg').html(`휴대폰 인증확인 해주세요`);
                return;
             }
             else{
                $('.member-modal').fadeOut(0);
                $('.modal-msg').html(``);
             }
  
             const regExpHp = /^(\d{3})(\d{3,4})(\d{4})$/g;
  
              let 마켓컬리회원 = { //market_kurly_member 테이블이름 (필드1 , 필드2, FIELD(ITEM === ATTRIBUTE))
                // idx: AUTO INCREMENT(자동 인덱스 번호) , AI 유일성
                아이디: that.회원.아이디, //16 id
                비밀번호 : that.회원.비밀번호, //16 pw
                이름 : that.회원.이름, //50 irum
                이메일 : that.회원.이메일, //250 email
                휴대폰 : that.회원.휴대폰.replace(regExpHp, '$1-$2-$3') ,// 13 hp //01079425305  replace : 010-7942-5305 
                주소 : `${that.회원.주소1} ${that.회원.주소2}`, //250 addr
                성별 : that.회원.성별, //10 gender null
                생년월일 : that.회원.생년 !== '' ? `${that.회원.생년}-${that.회원.생월}-${that.회원.생일}` : '' , //날짜  birth null
                추가입력사항 : that.회원.추가입력사항1 !== '' ?  (`${that.회원.추가입력사항1}, ${that.회원.추가입력사항2}`) : '', // 250 add_input null 허용
                이용약관 : that.회원.이용약관, // 1000 service_
                가입일자: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,  //날짜 gaib_date
              }
  
              // console.log (`that.회원 : ${that.회원.아이디}`);
              // console.log (`that.비밀번호 : ${that.회원.비밀번호}`);
              // console.log (`that.이름 : ${that.회원.이름}`);
              // console.log (`that.이메일 : ${that.회원.이메일}`);
              // console.log (`that.이용약관 : ${that.회원.이용약관}`);
              // console.log (`that.휴대폰 : ${that.회원.휴대폰}`);
              // console.log (`that.회원 : ${that.회원.생년}`);
              // console.log (`that.회원 : ${that.회원.생월}`);
              // console.log (`that.회원 : ${that.회원.생일}`);
              // console.log (`that.회원 : ${that.회원.성별}`);
              // console.log (`that.회원 : ${that.회원.아이디중복확인}`);
              // console.log (`that.회원 : ${that.회원.주소1}`);
              // console.log (`that.회원 : ${that.회원.주소2}`);
              // console.log (`that.회원 : ${that.회원.휴대폰인증확인}`);
              // console.log (`that.회원 : ${that.회원}`);
  
              // localStorage.setItem(마켓컬리회원.아이디, JSON.stringify(마켓컬리회원) );
  
              // AJAX 전송
              $.ajax({
                url: './response.php',
                type : 'POST',
                data :{ // php에게 보낼 데이터
                  id: 마켓컬리회원.아이디,
                  pw: 마켓컬리회원.비밀번호,
                  irum: 마켓컬리회원.이름,
                  email : 마켓컬리회원.이메일, 
                  hp : 마켓컬리회원.휴대폰, 
                  addr : 마켓컬리회원.주소,
                  gender : 마켓컬리회원.성별,
                  birth :마켓컬리회원.생년월일, 
                  addInput : 마켓컬리회원.추가입력사항,
                  service : JSON.stringify(마켓컬리회원.이용약관),
                  gaibDate : 마켓컬리회원.가입일자
                },
                success: function(res){
                  that.회원.가입완료 = true;
                  console.log ('AJAX 성공!' , res);
                  $('.member-modal').fadeIn(300);
                  $('.modal-msg').html(`감사합니다. ${마켓컬리회원.이름}회원가입을 축하드립니다.`);
                  // 모달창 닫고 인트로 페이지로 이동

                },
                error: function(err){
                  console.log ('AJAX 실패!' , err);
                }
              });
              
              
  
              // 2차 저장 : 실전용 닷홈 관리자 DATABASE 저장
              // 전송화면이 그대로 있고 내용만 전송된다. 
              //AJAX 비동기전송 서버로 전송(PHP => DATABASE) : 프론트앤드(폼화면 & 전송방식 AJAX) <=> 백앤드(PHP => DATABASE)
              // 전송이 완료되면 (회원가입이 완료되면)
              // 인트로 화면으로 이동한다. (홈)
           }
        })
     }
    }
    SignUp.init();
  
  })(jQuery,window);