import React from 'react';
import ModalComponent from './ModalComponent';
import HeaderComponent from './HeaderComponent';
import MainComponent from './MainComponent';
import FooterComponent from './FooterComponent';
import MemberModalComponent from './MemberModalComponent';

function WrapComponent(){

  const [isModal, setModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [isTimerHp, setTimerHp ] = React.useState(false);
 
  // const [state, setState ] = React.useState({
  //   isModal : false,
  //   title : '',
  //   isTimerHp : false
  // });
  // 버튼클릭해서 상태변수를 바꾼다. 
  // 함수 생성하여 사용 => 자식 컴포넌트에서
  // 상위(조상) 컴포넌트의 함수를 호출 실행할수 있다. 
  // 마약 이런 방법이 없다면 리덕스를 사용한다. 
  
  // 모달을 오픈(열기) 함수 
  // 모달을 클로즈(닫기) 함수 
  
  const openModal =(msg:any)=>{
    setModal(true); // 모달열기
    setTitle(msg); //모달창 메세지(타이틀)
  }

  const closeModal =(z:any)=>{
    setModal(false);  
    setTimerHp(z); // true 타이머 동작 또는 false 타이머 동작안함
  }

  // 타이머 동작 초기화 false
  const timerStopHp =()=>{
    setTimerHp(false); 
  }


  return (
    <div id="wrap">

      <ModalComponent/>
      <HeaderComponent/>
      <MainComponent openModal={openModal} isTimerHp={isTimerHp} timerStopHp={timerStopHp}/>
      <FooterComponent/>
      {
        isModal && <MemberModalComponent title={title} closeModal={closeModal}/>
      }
      
    </div>
  );
};

export default WrapComponent;

export function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
