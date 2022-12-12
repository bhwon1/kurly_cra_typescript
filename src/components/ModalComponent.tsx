import React from 'react';

function ModalComponent(){
  return (
    <div id="modal">
        <div className="container">
            <a href="!#" title="지금 가입하고 인기상품100원에 받아가세요!">지금 가입하고 인기상품<strong>100원</strong>에 받아가세요!</a>
            <button className="modal-close-btn" title="close"><img src="./img/ico_close_fff_84x84.png" alt=""/></button>
        </div> 
    </div>
  );
};

export default ModalComponent;