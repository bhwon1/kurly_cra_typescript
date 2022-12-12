import React,{ ChangeEvent, MouseEvent }  from 'react';

// 인터페이스(interface)
interface MemberTypes  {

    아이디: string, 
    아이디중복확인: boolean, 
    isId : boolean, 


    비밀번호: string, 
    isPwText1 : boolean,
    isPwText2 : boolean,
    isPwText3 : boolean,

    비밀번호확인: string,
    isPw2Text1 : boolean,
    isPw2Text2 : boolean,

    이름: string,
    isNameText1 : boolean,
    isNameText2 : boolean,

    이메일: string,
    isEmailText1 :  boolean,
    isEmailText2 :  boolean,
    이메일중복확인: boolean,

    휴대폰: string,
    isHpBtn : boolean,
    isHpBtnDisabled : boolean,
    isHpBtnOnHide1 : boolean,
    isHpBtnOnHide2 : boolean,
    isHpBtnOnHide3 : boolean,
    isHpOkBtnDisabled : boolean,
    isHpText1 : boolean,
    isHpText2 : boolean,
    ishpOkBtn : boolean,
    인증번호 : number,
    인증번호확인입력값 :  number | string,
    isHpdisabled : boolean,
    분 : number,
    초 : number,
    setId : number,


    주소1: string, 
    주소2: string,
    isAddress: boolean,

    성별: string,
    생년: string,
    생월: string,
    생일: string,
    isBirthGuideText : boolean,
    birthGuideText : string,

    추가입력사항: string,
    추가입력사항입력상자: string,

    이용약관동의: Array<string>,
    이용약관전체: Array<string>,
    

}

// 인터페이스 (interface)
function MainComponent ({회원관리, openModal, isTimerHp,timerStopHp}:any){
    
    // 상태(state)관리자 아이디 Id /setStateId(함수) 저장관리 => React.useState()
    const [state, setState] = React.useState<MemberTypes>(회원관리);
    const {
            아이디,아이디중복확인,isId,
            비밀번호,isPwText1,isPwText2,isPwText3,
            비밀번호확인,isPw2Text1,isPw2Text2,
            이름,isNameText1,isNameText2,
            이메일,isEmailText1,isEmailText2,이메일중복확인,
            휴대폰,isHpBtn,isHpBtnDisabled,isHpBtnOnHide1,isHpBtnOnHide2,isHpBtnOnHide3,isHpOkBtnDisabled,isHpText1,isHpText2,ishpOkBtn,인증번호,인증번호확인입력값,isHpdisabled,분,초,setId,
            주소1,주소2,isAddress,
            성별,생년,생월,생일,isBirthGuideText,birthGuideText,
            추가입력사항,추가입력사항입력상자,
            이용약관동의,이용약관전체
        } = state;

    //  출력정보는 제 일 위에 있는 것 


    // 1. 아이디 입력상자
    const onChangeId =(e:ChangeEvent<HTMLInputElement>)=>{
        let regExp1:RegExp = /[`~!@#$%^&*()\-_=+|\\\]}[{'";:/?.>,<]/g;
        let regExp2:RegExp = /.{6,16}/g; //글자수 6~16
        let regExp3:RegExp = /(?=.*[A-Za-z])+(?=.*[0-9])*/g; // 영문(대소문자) 필수, 숫자 선택 : 영문(?=.*[A-Za-z])+ 혹은 숫자(?=.*[0-9])*
        let regExp4:RegExp = /\s/g; //공백문자
        let imsi: string = '';
        let isLogic = false;
        
        // 입력값 비구조화
        const {value} = e.target;

        //1. 특수문자는 삭제 (React)
        imsi = e.target.value.replace(regExp1,'');

        // 정규표현식 구현
        if( regExp2.test(value) === false  ||  regExp3.test(value) === false || regExp4.test(value) === true ){
            isLogic = true; // state isId === false 
        }
        else{
            isLogic = false;
        }
        setState({...state, 아이디: imsi, isId : isLogic });
    }
    // 1-2. 아이디 중복확인 버튼 클릭 이벤트
    const onClickIdOk =(e:MouseEvent<HTMLButtonElement>)=> {
        let regExp2: RegExp = /.{6,16}/g; //글자수 6~16
        let regExp3: RegExp = /(?=.*[A-Za-z])+(?=.*[0-9])*/g; // 영문(대소문자) 필수, 숫자 선택 : 영문(?=.*[A-Za-z])+ 혹은 숫자(?=.*[0-9])*
        let regExp4: RegExp = /\s/g; //공백문자
        let isLogic: boolean = false;
        let message: string = '';
        
        e.preventDefault();
        if( regExp2.test(아이디) === false  ||  regExp3.test(아이디) === false || regExp4.test(아이디) === true ){
            isLogic = true; // state isId === false 
            message = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            isLogic = false;
            message = '사용 할 수 있는 아이디 입니다';

        }
        openModal(message);
        setState({...state, 아이디중복확인: isLogic})
    }
    // 2. 비밀번호 입력상자 
    const onChangePw =(e: ChangeEvent<HTMLInputElement>)=>{
        const regExp1: RegExp = /.{10,}/g;
        const regExp2: RegExp = /((?=.*[A-Z])+(?=.*[0-9])+)+|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+|]}[{'";:/?.>,<])+)+|((?=.*[A-Z])+(?=.*[`~!@#$%^&*()\-_=+|]}[{'";:/?.>,<])+)+/gi;
        const regExp3: RegExp = /\s/g;
        const regExp4: RegExp = /(.)\1\1/g; //동일한 문자 숫자 연속3번 사용불가 
        let imsi1 : boolean =false;
        let imsi2 : boolean =false;
        let imsi3 : boolean =false;

        const {value} = e.target; // 비구조화

        if(value === ''){
            // setState({...state, isPwText1: false, isPwText2: false, isPwText3: false,비밀번호: value});
            imsi1 = imsi2 = imsi3 = false;
        }
        else{
            if(regExp1.test(value) === false){ //10자 이상
                imsi1 = true; imsi2 = false; imsi3 = false;
                // setState({...state, isPwText1: true, isPwText2: false, isPwText3: false, 비밀번호: value});
            }
            else if(regExp2.test(value) === false || regExp3.test(value) === true){ //조합, 공백문자 조건 
                imsi1 = false; imsi2 = true; imsi3 = false;
                // setState({...state, isPwText1: false, isPwText2: true, isPwText3: false, 비밀번호: value});
            }
            else if(regExp4.test(value) === true){ 
                imsi1 = false; imsi2 = false; imsi3 = true;
                // setState({...state, isPwText1: false, isPwText2: false, isPwText3: true, 비밀번호: value});
            }
            else{
                imsi1 = imsi2 = imsi3 = false;
                // setState({...state, isPwText1: false, isPwText2: false, isPwText3: false, 비밀번호: value});
            }
          }
          setState({...state, isPwText1: imsi1, isPwText2: imsi2, isPwText3: imsi3, 비밀번호: value});
    }
    // 3. 비밀번호확인 입력상자
    const onChangePw2 =(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        let imsi1: boolean = false;
        let imsi2: boolean = false;

        if( value === ''){
            imsi1 = true; imsi2 = false;
          }
          else{ 
            imsi1 = imsi2 = false;
          
            if( 비밀번호 !== value ){ // 동일한 비밀번호가 아니면
                imsi1 = false; imsi2 = true;
            }
            else {
                imsi1 = false; imsi2 = false;
            }
          }
        setState({...state, isPw2Text1 :imsi1 , isPw2Text2: imsi2, 비밀번호확인: value  });
    }
    // 4. 이름 입력상자
    const onChangeName =(e: ChangeEvent<HTMLInputElement>)=>{
        const regExp : RegExp = /[`~!@#$%^&*()\-_=+|\\\]}[{'";:/?.>,<]/g;
        let {value} = e.target;
        let regExp2 : RegExp = /\s/g;
        let imsi = ''; // 입력값
        let imsi1: boolean = false;  //논리값
        let imsi2: boolean = false;

        imsi = value.replace(regExp,''); 
  
        if( value==='' ){
            imsi1 = true; imsi2 = false;
        }
        else {
          if ( regExp2.test(value) === true){ //띄어쓰기 제작 
            imsi1 = false; imsi2 = true;
          }
          else{
            imsi1 = false; imsi2 = false;
          }
        }

        setState({...state, 이름:imsi , isNameText1:imsi1 , isNameText2:imsi2});
    }
    // 5. 이메일 입력상자
    const onChangeEmail =(e: ChangeEvent<HTMLInputElement>)=>{
        const regExp : RegExp = /^([A-Z0-9]+[^\s]*)+([._-]?[A-Z0-9]*)*@([A-Z0-9]+[^\s]*)+([._-]?[A-Z0-9]*)*.[A-Z]{2,3}$/gi;
        let {value} = e.target;
        let imsi1 : boolean = false;
        let imsi2 : boolean = false;


        if( value ==='' ){
            imsi1 = true; 
          }
          else {
            if( regExp.test(value) === false ){
                imsi1 = false; imsi2 = true;
            }
            else{
                imsi1 = imsi2 = false;
            }
          }
        setState({...state, 이메일:value  , isEmailText1:imsi1, isEmailText2:imsi2});
    }
    // 5-2. 이메일 중복확인 버튼 클릭 이벤트
    const onClickEmailOk =(e: MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        const regExp : RegExp= /^([A-Z0-9]+[^\s]*)+([._-]?[A-Z0-9]*)*@([A-Z0-9]+[^\s]*)+([._-]?[A-Z0-9]*)*.[A-Z]{2,3}$/gi;
        let imsi : Array<any> = []
        let result : Array<boolean> = [];
        let isEmail : boolean = false;

        if( 이메일 ==='' ){
            openModal(`이메일을 입력하세요`);
          }
          else {
            if( regExp.test(이메일) === false ){
                openModal(`이메일 형식으로 입력하세요.`);
            }
            else{
                // imsi = that.회원.가입회원; // DB 연동된경우
                // 더미데이터
                // key : KurlyMember
                
                if ( localStorage.getItem(('KurlyMember') || "" ) === null){
                    return;
                }

                try {
                    imsi = [...imsi, JSON.parse(localStorage.getItem(('KurlyMember') || ""  )  || "" ) ]
                }
                catch{
                    console.log('데이터가 제이슨형식이 아닙니다. ')
                    return;
                }
                
                result = imsi.map((item)=> item.이메일 === 이메일 );
        

                    if ( result.includes(true) ){
                        openModal(`중복된 이메일 입니다.`);
                        isEmail = false; 
                    }
                    else {
                        openModal(`사용가능한 이메일 입니다.`);
                        isEmail = true; // 이메일 중복확인 완료
                    }
                }
            }
            setState({...state, 이메일중복확인: isEmail })
    }
    // 6-1. 휴대폰 입력상자 
    const onChangeHp =(e: ChangeEvent<HTMLInputElement>)=>{

        const regExp : RegExp= /[`~!@#$%^&*()\-_=+|\\\]}[{'";:/?.>,<]/g;
        let {value} = e.target
        let imsi1 : string = '';
        let imsi2 : boolean= false; // addClass => 프롭스에 기본값
        let imsi3 : boolean= true; // disabled = false

        console.log(imsi1)

        imsi1 = value.replace(regExp, '');

        // 휴대폰 입력상자에 10자 이상 입력하면 인증번호 버튼이 
        // 인증번호 버튼이 on 클래스가 추가되어 보라색 버튼으로 변한다. 
        // 인증번호 버튼이 disabled=true 인데 false 로 변경된다. 
        if( value.length>=10 ){
            imsi2 = true;
            imsi3 = false; 
        }
        else {
            imsi2 = false;
            imsi3 = true; 
        }

        setState({...state, 휴대폰: imsi1, isHpBtn:imsi2, isHpBtnDisabled:imsi3});
    }

    // 6-2-1. 타이머 카운트 함수
    const timerCount =()=> {

        console.log( '타이버 카운트 함수 ');
        let m : number = 2; //분 2
        let s : number = 59; //ch (0~59 => 60초)
        let imsi : any = 0;

        imsi = setInterval(function(){
          s--;
          // console.log(s);
          if(s<0){ //60초가 경과 , 그러면 1분이 감소
            s=59;
            m--;
            if(m<0){
              s=0;
              m=0;
              clearInterval(imsi);
              // isTimerHP = false
              timerStopHp();
              openModal(`유효시간이 만료되었습니다.<br>다시 시도해 주세요.}`);
              return;
            }
          }
          setState({...state, 분: m, 초: s , setId:imsi}); // 1초에 한번씩
        //   console.log('타이머동작실행 imsi',imsi);
        //   console.log('타이머동작실행 setid',setId);
        //   console.log(imsi);
        //   console.log(setId);

        },1000);

        // console.log('타이머동작실행 imsi',imsi);
        // console.log('타이머동작실행 setid',setId);
        // console.log('인증번호입력박스 isHpBtnOnHide3 ',isHpBtnOnHide3);
    }

    // // 유즈 이펙트 훅을 설정
    // 휴대폰 인증번호 방송 모달창 닫기 클릭하면 
    // 타이머 동작하도록 인증번호 3분 카운트 타이머 동작 실행 시작 


    React.useEffect(()=>{
        console.log('로딩시 랜더링 없으면 1회실행 끝')
        console.log('로딩시 랜더링 있으면 무한반복');
        // 아래 값이 true 이면 
        isTimerHp && timerCount(); // 인증번호 입력박스(true)가 열리면, 타이머 동작
    // }); // 로딩시 실행하는데 랜더링이 될때마다 무한반복실행한다.
    // },[]); // 로딩시 1회 실행 하고 종료 : isHpBtnOnHide3 false 이기 때문에 설정할게 없다.
    },[isTimerHp]); // isHpBtnOnHide3 true 이거나 false 변화가 있을떄 (랜더링) 1회만 실행하게 한다. 무한반복을 막는다. 
    
    // 6-2-2. 휴대폰인증번호 클릭 이벤트
    const onClickHpBtn = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const regExp : RegExp = /^01[0|1|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
        let imsi1 : boolean = false; // 인증번호 버튼 보인다. && 다른인증번호 버튼을 숨긴다.
        let imsi2 : boolean = false; // 휴대폰 번호 형식으로 입력해주세요 . 정규표현식
        let num : any= null;

        if( regExp.test(휴대폰) === false){
            imsi1 = false;
            imsi2 = true;
        }
        else {
            imsi1 = true;
            imsi2 = false; // 오류가 없으면
            num = Math.floor(Math.random()*900000+100000);
            
            openModal(`인증번호가 발송되었습니다.${num}`);

        }

        setState({
            ...state, 
            isHpBtnOnHide3: imsi1, // 박스보이기 
            isHpText2:imsi2, 
            인증번호:num,
            인증번호확인입력값: '',

        });
    }


    // 6-3. 인증번호 입력체인지 이벤트 함수
    const onChangeHpOk =(e: ChangeEvent<HTMLInputElement>)=> {
        let imsi : boolean= true;
        let imsi2 : boolean = false;
        let {value} =  e.target

        if( e.target.value.length >= 6){
            imsi = false;
            imsi2 = true;
            clearInterval(setId);
            timerStopHp();
        }
        else {
            imsi = true;
            imsi2 = false;
        }
        console.log('입력값', Number(value));
        setState({...state, isHpOkBtnDisabled: imsi , ishpOkBtn: imsi2, 인증번호확인입력값 : Number(value)});
        console.log('state'  ,인증번호확인입력값);
    }
    

    // 6-4. 인증번호 확인 함수
    const onClickOKBtn =(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        let imsi1: boolean = false;
        let imsi2: boolean = false;
        let imsi3: boolean = false;
        let imsi4: boolean = false;


        if( 인증번호 === 인증번호확인입력값 ){ 
            openModal(`인증에 성공하였습니다.`);
            imsi1 = true; // 인증번호 받기 숨기기
            imsi2 = true; // 다른번호 인증 보이기
            imsi3 = false;  // 인증번호 확인입력상자 숨기기
            imsi4 = true; // 입력상자 사용불가
            clearInterval(setId);

            // $('.hp-btn').hide();
            // $('.hp2-btn').show();
            // $('#hp').attr("disabled", true);
        }
        else{
            openModal(`잘못된인증 코드입니다.`);
            imsi1 = false;
            imsi2 = false;
            imsi3 = true;
            imsi4 = false;
        }
        setState({...state, isHpBtnOnHide1: imsi1, isHpBtnOnHide2:imsi2, isHpBtnOnHide3:imsi3, isHpdisabled:imsi4});
    }

    // 6-5. 다른번호 인증
    const onClickHp2Btn =(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        
        setState({
            ...state, 
            isHpBtnOnHide1 : false, // 인증번호 닫기 보이기 
            isHpBtnOnHide2 : false, // 다른번호 인증 숨기기
            isHpdisabled   : false,  //입력상자 사용가능 
            휴대폰 : '',
        });
    }
    // 7. 주소1 입력상자
    const onChangeAddr1 =(e: ChangeEvent<HTMLInputElement>)=>{
        setState({...state, 주소1: e.target.value});
    }
    // 8. 주소2 입력상자
    const onChangeAddr2 =(e: ChangeEvent<HTMLInputElement>)=>{
        setState({...state, 주소2: e.target.value});
    }
    // 9. 주소검색
    const onClickAddressSearch =(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const popW : number = 530;
        const popH : number = 615;
        const popName : string = '_popup_postcode_20221130';
        const popFile : string = './popup.html';
        let winW : number = window.innerWidth; //자바스크립트 창너비
        let winH : number = window.innerHeight;
        let top  : number = (winH-popH)/2; // 탑값 = (창높이- 팝업창의 높이 ) / 2
        let left : number = (winW-popW)/2; // left = (창너비- 팝업창의 너비 ) / 2

        window.open(popFile, popName, `width=${popW},height=${popH}, top=${top}, left=${left}`);

        // 부모창 이름 : opner : opener.입력상자.value = "전달내용"
        // 자식창 이름 : winPopup : winPopup.입력상자.value = "전달내용"
    }

    // 팝업창에서 저작한 로컬스트레이지 데이터를 가져와서 
    // 비교하고 만약 주소 키 'kurly Address' 가 있다면 유지
    const addressFn =()=>{
    let addressKey : string = 'KURLY ADDRESS';
    let obj : any = '';

    for(let i=0; i<sessionStorage.length; i++){
        if( sessionStorage.key(i) === addressKey){
        obj = JSON.parse(sessionStorage.getItem(addressKey) || "{}"); // 주소 1, 주소2
        setState({...state, 주소1:obj.주소1 , 주소2 :obj.주소2, isAddress: true});
        }
        }
    }
    
    
    React.useEffect(()=>{
        addressFn();
     },[주소1,주소2,isAddress]);

    // 10.성별 입력상자
    const onChangeGender =(e: ChangeEvent<HTMLInputElement>)=>{
        setState({...state, 성별: e.target.value});
    }

    // 11. 생년월일 입력상자
    const birthCheck =()=>{
        
        const regExpYear : RegExp = /^(?:19(?:2|[2-9]|[3-9][0-9])[0-9]|2[0-9][0-9][0-9])$/g;
        const regExpMoth : RegExp = /^(?:0?[1-9]|1[0-2])$/g; // const regExpMoth = /^(?:0?[1-9]|10|11|12)$/g;
        const regExpDay  : RegExp = /^(?:0.[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
        const nowYear : number = new Date().getFullYear(); //2022

        // 1. 생년 생월 일 모두 빈칸이면 
        if( 생년 ==='' &&  생월 ==='' &&  생일 ==='' ){
            return;
        }
        else{
            // 생년 빈칸이면 
            if( 생년 === ''){
                setState({...state, isBirthGuideText:true , birthGuideText: '태어난 년도 4자리를 정확하게 입력해주세요.'})
            }
            else if ( Number(생년) > nowYear   ){
                setState({...state, isBirthGuideText:true , birthGuideText: '생년월일이 미래로 입력 되었습니다.'})
            }
            else if ( Number(생년) >= nowYear-14   ){
                setState({...state, isBirthGuideText:true , birthGuideText: '만 14세 미만은 가입이 불가합니다'})
            }
            else if (  regExpYear.test(생년) === false  ){
                setState({...state, isBirthGuideText:true , birthGuideText: '태어난 년도 4자리를 정확하게 입력해주세요.'})
            }
            else {
                // 생년이 모두 이상이 없으니 다음은 
                // 생월체크 
                if( 생월 === '' || regExpMoth.test(생월.toString())  === false ){
                    setState({...state, isBirthGuideText:true, birthGuideText:'태어난 월을 정확하게 입력해주세요.'})
                }
                else{
                    if( 생일 === '' || regExpDay.test(생일.toString())  === false ){
                        setState({...state, isBirthGuideText:true, birthGuideText:'태어난 일을 정확하게 입력해주세요.'})
                    }
                    else {
                        setState({...state, isBirthGuideText:false, birthGuideText:''})
                    }
                }
            }
        }
    }

    // 상태관리자 변수 생년 , 생월 , 생일이 변경되면 (랜더링되면) 함수 실행
    React.useEffect(()=>{
        birthCheck();
    },[생년,생월,생일]);

    // 11-1 생년 입력상자이벤트
    const onChangeYear =(e: ChangeEvent<HTMLInputElement>)=>{
        let imsi : any = '';
        let {value} = e.target;
        const regExpUnNum :RegExp = /[^0-9]/g; //숫자가 아닌것
        imsi  = value.replace(regExpUnNum, '');
        setState({...state, 생년: imsi});
    }
    // 11-2 생월 입력상자이벤트
    const onChangeMonth =(e: ChangeEvent<HTMLInputElement>)=>{
        let imsi = '';
        let {value} = e.target;
        const regExpUnNum = /[^0-9]/g; //숫자가 아닌것
        imsi = value.replace(regExpUnNum, '');
        setState({...state, 생월: imsi});
    }
    // 11-3 생일 입력상자이벤트
    const onChangeDate =(e: ChangeEvent<HTMLInputElement>)=>{
        let imsi = '';
        let {value} = e.target;
        const regExpUnNum = /[^0-9]/g; //숫자가 아닌것
        imsi = value.replace(regExpUnNum, '');
        setState({...state, 생일: imsi});
    }

    // 12-1. 추가입력사항 라디오
    const onChangeInputRadio =(e: ChangeEvent<HTMLInputElement>)=>{
        setState({...state, 추가입력사항: e.target.value});
    }

    // 12-2. 추가입력사항 입력상자
    const onChangeInput =(e: ChangeEvent<HTMLInputElement>)=>{
        setState({...state, 추가입력사항입력상자: e.target.value});
    }

    // 13-1. 이용약관동의 all 체크박스
    const onChangeServiceCheckAll=(e: ChangeEvent<HTMLInputElement>)=>{
        let imsi : Array<any>= [];
        const checkService = document.getElementsByClassName('check-service')  //체크박스 7개 공용 선택자
        // const checkService = document.querySelectorAll('check-service'); //체크박스 7개 공용 선택자

        if( e.target.checked ){
            imsi = 이용약관전체; // 약관동의 전체 내용을 임시에 저장
        }
        else{
            imsi = []; //체크 취소하면 선택값 모두 삭제 => 빈 배열 사용
        }
        setState({...state, 이용약관동의: imsi});
    }

    // 13-2. 이용약관동의 일반체크박스
    // 이용약관동의 7개 항목이면 체크 
    const onChangeServiceCheck=(e: ChangeEvent<HTMLInputElement>)=>{
        // 체크된것만 저장
        let imsi = [];
        if( e.target.checked ){
            
            // #chk4
            // SNS 값 상태배열 변수에 포함되어(includes) 없다면 저장
            // 이메일 값 상태배열 변수에 포함되어(includes) 없다면 저장
            if( e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' ){
                if( 이용약관동의.includes('SNS') === false  && 이용약관동의.includes('이메일') === false ){
                    setState({...state, 이용약관동의:[...이용약관동의,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)','SNS', '이메일'] });
                }
                else if ( 이용약관동의.includes('SNS') === false && 이용약관동의.includes('이메일') === true){
                    setState({...state, 이용약관동의:[...이용약관동의,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)','SNS'] });
                }
                else if ( 이용약관동의.includes('SNS') === true && 이용약관동의.includes('이메일') === false ){
                    setState({...state, 이용약관동의:[...이용약관동의,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', '이메일'] });
                }
            }
            else if ( e.target.value === 'SNS' && 이용약관동의.includes('이메일')===true ){
                setState({...state, 이용약관동의:[...이용약관동의,'SNS', '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'] });
            }
            else if ( e.target.value === '이메일' && 이용약관동의.includes('SNS')===true ){
                setState({...state, 이용약관동의:[...이용약관동의,'이메일', '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'] });
            }
            else { // 나머지
                setState({...state, 이용약관동의: [...이용약관동의, e.target.value] });
            }
        }
        else{ // 선택 취소하면 현재값은 삭제된다.    

            // #chk4 삭제
            // SNS  값 삭제 
            // 이메일 값 삭제 
            if ( e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' ){
                imsi = 이용약관동의.filter((item)=>item !=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                imsi = imsi.filter((item)=>item !=='SNS');
                imsi = imsi.filter((item)=>item !=='이메일');
                setState({...state, 이용약관동의: imsi });
            }
            else if ( e.target.value === 'SNS' && 이용약관동의.includes('이메일')===true ){
                imsi = 이용약관동의.filter((item)=>item !== 'SNS');
                imsi = imsi.filter((item)=>item !=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({...state, 이용약관동의: imsi });
            }
            else if ( e.target.value === '이메일' && 이용약관동의.includes('SNS')===true ){
                imsi = 이용약관동의.filter((item)=>item !== '이메일');
                imsi = imsi.filter((item)=>item !=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({...state, 이용약관동의: imsi });
            }
            else{ // 그 외
                imsi = 이용약관동의.filter((item)=>item !== e.target.value);
                setState({...state, 이용약관동의: imsi  });  // 선택 취소 된거는 제외하고 저장
             }
        }
    }



  return (
    <main id="main">
      <section id="signIn">
        <div className="container">
          <div className="title">
            <h2>회원가입</h2>
          </div>
          <div className="content">
              <form autoComplete='off' id='signUp' name='sign_up' method='post' action="./response.php">
                  <ul>
                      <li>
                          <span><i>*</i> 필수입력사항</span>
                      </li>
                      <li> 
                          <div className="left"><label htmlFor="id">아이디<i>*</i></label></div>
                          <div className="right id">
                              <input 
                              maxLength={16} 
                              type="text" 
                              id='id' 
                              name='id'  
                              placeholder='아이디를 입력해주세요' 
                              onChange={onChangeId}
                              value={아이디}
                              />
                              <button 
                              type='button' 
                              className='id-ok-btn'
                              onClick={onClickIdOk}
                              >중복확인</button>
                              <p className={isId ? 'guid-text on' : 'guid-text'}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                          </div>
                      </li>
                      <li>
                          <div className="left"><label htmlFor="pw">비밀번호<i>*</i></label></div>
                          <div className="right pw">
                              <input 
                              maxLength={16} 
                              type="password" 
                              id='pw' 
                              name='pw'  
                              placeholder='비밀번호를 입력해주세요'
                              onChange={onChangePw}
                              value={비밀번호}
                              />
                              <p className={`guid-text guid-text1 ${isPwText1 && 'on'} `}>최소 10자 이상 입력</p>
                              <p className={`guid-text guid-text2 ${isPwText2 && 'on'} `}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                              <p className={`guid-text guid-text3 ${isPwText3 && 'on'} `}>동일한 숫자 3개 이상 연속 사용 불가</p>
                          </div>
                      </li>
                      <li>
                          <div className="left"><label htmlFor="pw2">비밀번호 확인<i>*</i></label></div>
                          <div className="right pw2">
                              <input 
                              type="password" 
                              id='pw2' 
                              name='pw2'  
                              placeholder='비밀번호를 한번 더 입력해주세요'
                              onChange={onChangePw2}
                              value={비밀번호확인}
                              />
                              <p className={`guid-text guid-text1 ${isPw2Text1 && 'on'}`}>비밀번호를 한번 더 입력해 주세요.</p>
                              <p className={`guid-text guid-text2  ${isPw2Text2 && 'on'}`}>동일한 비밀번호를 입력해 주세요.</p>
                          </div>
                      </li>
                      <li>
                          <div className="left"><label htmlFor="name">이름<i>*</i></label></div>
                          <div className="right name">
                              <input 
                              maxLength={16}
                              type="name" 
                              id='name' 
                              name='name'  
                              placeholder='이름을 입력해주세요 '
                              onChange={onChangeName}
                              value={이름}
                              />
                              <p className={`guid-text guid-text1 ${isNameText1 && 'on'}`}>이름을 입력해 주세요.</p>
                              <p className={`guid-text guid-text2  ${isNameText2 && 'on'}`}>공백을 제거해 주세요.</p>
                          </div>
                      </li>
                      <li> 
                          <div className="left"><label htmlFor="email">이메일<i>*</i></label></div>
                          <div className="right email">
                              <input 
                              type="email" 
                              id='email' 
                              name='email'  
                              placeholder='예: markkurly@kurly.com '
                              onChange={onChangeEmail}
                              value={이메일}
                              />
                              <button 
                              type='button' 
                              className='email-ok-btn'
                              onClick={onClickEmailOk}
                              >중복확인</button>
                              <p className={`guid-text guid-text1 ${isEmailText1 && 'on'}`}>이메일을 입력해 주세요.</p>
                              <p className={`guid-text guid-text2  ${isEmailText2 && 'on'}`}>이메일 형식으로 입력해 주세요.</p>
                          </div>
                      </li>
                      <li>
                          <div className="left"><label htmlFor="hp">휴대폰<i>*</i></label></div>
                          <div className="right hp">
                              <input 
                              maxLength={11}
                              type="text" 
                              id='hp' 
                              name='hp'  
                              placeholder='숫자만 입력해주세요 '
                              onChange={onChangeHp}
                              value={휴대폰}
                              disabled={isHpdisabled}
                              />
                              <button 
                              type='button' 
                              className={`hp-btn ${isHpBtnOnHide1 && 'onHide'} ${isHpBtn && 'on'} `} 
                              disabled={isHpBtnDisabled}
                              onClick={onClickHpBtn}
                              >인증번호받기</button>
                              <button  
                              type='button' 
                              className={`hp2-btn  ${isHpBtnOnHide2 && 'onShow'}`} 
                              onClick={onClickHp2Btn}
                              >다른번호인증</button>
                              <p className={`guid-text guid-text1 ${isHpText1 && 'on'}`}>휴대폰 번호를 입력해 주세요.</p>
                              <p className={`guid-text guid-text2 ${isHpText2 && 'on'}`}>휴대폰 형식으로 입력해 주세요.</p>
                          </div>
                      </li>
                      <li className={`hp-ok-box ${isHpBtnOnHide3 && 'on'}`}>
                          <div className="left"><label htmlFor="hpOK">휴대폰 인증번호 확인<i>*</i></label></div>
                          <div className="right hp-ok">
                              <input 
                              maxLength={6} 
                              type="text" 
                              id='hpOK' 
                              name='hpOK'  
                              placeholder='인증번호를 입력해주세요'
                              onChange={onChangeHpOk}
                              />
                              <span className='hp-ok-time'><em className='minutes'>{분<10 ? `0${분}` : 분}</em>:<em className='seconds'>{초<10 ? `0${초}` : 초}</em></span>
                              <button 
                              type='button' 
                              className={`hp-ok-btn ${ishpOkBtn &&'on'}`} 
                              disabled={isHpOkBtnDisabled} 
                              onClick={onClickOKBtn}
                              >인증번호 확인</button>
                              <p className='guid-text on'>인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)</p>
                          </div>
                      </li>
                      <li>
                          <div className="left"><label htmlFor="addr2">주소<i>*</i></label></div>
                          <div className="right addr">
                              <button 
                              type='button' 
                              className={`addr-search-btn ${isAddress ? 'on' : ''} `}
                              onClick={onClickAddressSearch} 
                              ><img src="./img/ico_search.svg" alt=""/>주소검색</button>    
                              <input 
                              type="text" 
                              id='addr1'
                              name='addr1' 
                              className={`${isAddress ?  'on': ''}`}
                              placeholder='주소검색 주소'
                              onChange={onChangeAddr1}
                              value={주소1}
                              />
                              <input 
                              type="text" 
                              id='addr2'
                              name='addr2' 
                              className={isAddress ?  'on': ''}
                              placeholder='나머지 주소를 입력해주세요'
                              onChange={onChangeAddr2}
                              value={주소2}
                              />
                              <button type='button' 
                              className={`addr-research-btn ${isAddress ? 'on' : ''}`}
                              onClick={onClickAddressSearch}  
                              ><img src="./img/ico_search.svg" alt=""/>재검색</button>
                              <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                          </div>
                      </li>
                      <li>
                          <div className="left">
                              <label >성별</label>
                          </div>
                          <div className="right gender"> 
                              <label htmlFor="male">    
                              <input type="radio" 
                              className='gender-btn' 
                              name='gender' 
                              id='male' 
                              value='남자' 
                              onChange={onChangeGender}
                              checked={성별.includes('남자') === true ? true:false}
                              />남자</label>
                              <label htmlFor="female">  
                              <input type="radio" 
                              className='gender-btn' 
                              name='gender' 
                              id='female'
                               value='여자'
                               onChange={onChangeGender}
                               checked={성별.includes('여자')}
                               />여자</label>
                              <label htmlFor="unselect">
                                <input type="radio" 
                                className='gender-btn' 
                                name='gender' 
                                id='unselect' 
                                value='선택안함'
                                onChange={onChangeGender}
                                checked={성별.includes('선택안함') === true ? true:false}
                                />선택안함</label>
                          </div>
                      </li>
                      <li>
                      <div className="left"><label htmlFor="">생년월일</label></div>
                          <div className="right birth-day ">
                              <ul>
                                  <li>
                                    <input maxLength={4} 
                                    type="text" 
                                    id='year' 
                                    name='year' 
                                    placeholder='YYYY'
                                    onChange={onChangeYear}
                                    value={생년}
                                    /></li>
                                  <li><i>/</i></li>
                                  <li>
                                    <input  maxLength={2} 
                                    type="text" 
                                    id='month' 
                                    name='month' 
                                    placeholder='MM'
                                    onChange={onChangeMonth}
                                    value={생월}
                                    /></li>
                                  <li><i>/</i></li>
                                  <li>
                                    <input  maxLength={2} 
                                    type="text" 
                                    id='day' 
                                    name='day' 
                                    placeholder='DD'
                                    onChange={onChangeDate}
                                    value={생일}
                                    /></li>
                              </ul>
                              <p className={`${isBirthGuideText ? 'on' : ''}`}>{birthGuideText}</p>
                          </div>
                      </li>
                      <li>
                      <div className="left"><label htmlFor="">추가입력 사항</label></div>
                          <div className="right gender add-input"> 
                              <div className="add-input-box">
                                  <label htmlFor="addId">   
                                  <input type="radio" 
                                  name='add_input' 
                                  id='addId'    
                                  className='add-input-btn' 
                                  value='추천인 아이디'
                                  onChange={onChangeInputRadio}
                                  checked={추가입력사항.includes('추천인 아이디')}
                                  />추천인 아이디</label>
                                  <label htmlFor="addEvent">
                                    <input type="radio" 
                                    name='add_input' 
                                    id='addEvent' 
                                    className='add-input-btn' 
                                    value='참여 이벤트명'
                                    onChange={onChangeInputRadio}
                                    checked={추가입력사항.includes('참여 이벤트명')}
                                    />참여 이벤트명</label>
                              </div>
                              <input type="text" 
                              name='choocheon' 
                              id='choocheon' 
                              placeholder='추천인 아이디를 입력해주세요'
                              onChange={onChangeInput}
                              value={추가입력사항입력상자}
                              />
                              <p>
                              추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                              가입 이후는 수정이 불가능 합니다.<br/>
                              대소문자 및 띄어쓰기에 유의해주세요.
                              </p>
                          </div>
                      </li>
                      <li>
                          <hr/>
                      </li>
                      <li>
                          <div className="left"><label htmlFor="addr2">이용약관 동의<i>*</i></label></div>
                          <div className="right service">
                              <ul>
                                  <li>
                                      <label>
                                        <input type="checkbox" 
                                        id='chkAll' 
                                        name='chkAll'  
                                        value='전체동의합니다'
                                        onChange={onChangeServiceCheckAll}
                                        checked={이용약관동의.length >=7?true:false}
                                        />전체동의합니다</label>
                                      <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                  </li>
                                  <li>
                                      <label className='after'>
                                        <input type="checkbox" 
                                        id='chk1' 
                                        name='chk1' 
                                        className='check-service' 
                                        value='이용약관 동의(필수)'
                                        onChange={onChangeServiceCheck}
                                        checked={이용약관동의.includes('이용약관 동의(필수)') ?true:false}
                                        />이용약관 동의</label><em>(필수)</em>
                                      <span className='more-view'>약관보기<img src="./img/arrow.svg" alt=""/></span>
                                  </li>
                                  <li>
                                      <label className='after'>
                                        <input type="checkbox" 
                                        id='chk2' 
                                        name='chk3' 
                                        className='check-service' 
                                        value='개인정보 수집∙이용 동의(필수)'
                                        onChange={onChangeServiceCheck}
                                        checked={이용약관동의.includes('개인정보 수집∙이용 동의(필수)') ?true:false}
                                        />개인정보 수집∙이용 동의</label><em>(필수)</em>
                                      <span className='more-view'>약관보기<img src="./img/arrow.svg" alt=""/></span>
                                  </li>
                                  <li>
                                      <label className='after'>
                                        <input type="checkbox" 
                                        id='chk3' name='chk3' 
                                        className='check-service' 
                                        value='개인정보 수집∙이용 동의(선택)'
                                        onChange={onChangeServiceCheck}
                                        checked={이용약관동의.includes('개인정보 수집∙이용 동의(선택)') ?true:false}
                                        />개인정보 수집∙이용 동의</label><em>(선택)</em>
                                      <span className='more-view'>약관보기<img src="./img/arrow.svg" alt=""/></span>
                                  </li>
                                  <li>
                                      <label>
                                        <input type="checkbox" 
                                        id='chk4' 
                                        name='chk4' 
                                        className='check-service sns-check-all' 
                                        value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'
                                        checked={이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)') ?true:false}
                                        onChange={onChangeServiceCheck}
                                        />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><em>(선택)</em>
                                  </li>
                                  <li>
                                      <label>
                                        <input type="checkbox" 
                                        id='chk5' 
                                        name='chk5' 
                                        className='check-service sns-check' 
                                        value='SNS'
                                        onChange={onChangeServiceCheck}
                                        checked={이용약관동의.includes('SNS') ?true:false}
                                        />SNS</label>
                                      <label>
                                        <input type="checkbox" 
                                        id='chk6' 
                                        name='chk6' 
                                        className='check-service sns-check' 
                                        value='이메일'
                                        onChange={onChangeServiceCheck}
                                        checked={이용약관동의.includes('이메일') ?true:false}
                                        />이메일</label>
                                  </li>
                                  <li>
                                      <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                  </li>
                                  
                                  <li>
                                      <label className='after'>
                                        <input type="checkbox" 
                                        id='chk7' 
                                        name='chk7' 
                                        className='check-service' 
                                        value='본인은 만 14세 이상입니다.(필수)'
                                        onChange={onChangeServiceCheck}
                                        checked={이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                        />본인은 만 14세 이상입니다.</label><em>(필수)</em>
                                  </li>
                              </ul>
                          </div>
                      </li>
                  </ul>
                  <div className="submit">
                    <button type="submit" className='submit-btn'>가입하기</button>
                  </div>
              </form>
          </div>
        </div>
      </section>
    </main>
  );
};



// 회원관리 컴포넌트 기본 프롭스 관리 
MainComponent.defaultProps = {
    회원관리 : {
        아이디: '', 
        아이디중복확인: false, 
        isId : false,

        비밀번호: '', 
        isPwText1 : false,
        isPwText2 : false,
        isPwText3 : false,

        비밀번호확인: '', 
        isPw2Text1 : false,
        isPw2Text2 : false,

        이름: '', 
        isNameText1 : false,
        isNameText2 : false,

        이메일: '', 
        isEmailText1 : false,
        isEmailText2 : false,

        이메일중복확인: false, 
        
        휴대폰: '', 
        isHpBtn : false,   // 인증번호 받기버튼 활성화 색상 버튼 
        isHpBtnDisabled : true, // 인증번호 받기버튼 disabled = true 이면 사용 못함  disabled = false 
        isHpBtnOnHide1 : false, // 인증번호 받기 버튼 false 보이기 true 숨기기 && 다른번호버튼 false tnarlrl true 보이기
        isHpBtnOnHide2 : false, // 다른인증번호 버튼 false 숨기기 true 보이기
        isHpBtnOnHide3 : false, // 인증번호 확인박스 false 숨기기 true 보이기
        isHpOkBtnDisabled : true, // 인증번호 확인
        ishpOkBtn : false, // 인증번호가 1자 이상되었을때에 불이 들어오게 한다.
        isHpText1 : false, // 휴대폰 번호를 입력해 주세요. 안내텍스트 (빈값인경우)
        isHpText2 : false, // 휴대폰 형식으로 입력해 주세요. 안내텍스트 (정규표현식이 다른경우)
        인증번호 : null,
        인증번호확인입력값 : 0,
        isHpdisabled : false,
        분 : 2,
        초 : 59,
        setId : 0,

        주소1: '', 
        주소2: '', 
        isAddress : false,
        isBirthGuideText : false, // 출력 여부
        birthGuideText : '', // 가이드 텍스트


        성별: '선택안함',
        생년: '',
        생월: '',
        생일: '',
        추가입력사항: '',
        추가입력사항입력상자: '',
        이용약관동의 : [],
        이용약관전체 : [
            "이용약관 동의(필수)",
            "개인정보 수집∙이용 동의(필수)",
            "개인정보 수집∙이용 동의(선택)",
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
            "SNS",
            "이메일",
            "본인은 만 14세 이상입니다.(필수)"
        ]
        

    }
}

export default MainComponent;