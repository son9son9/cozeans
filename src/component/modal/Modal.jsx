import { useState } from "react";
import "../../App.css";
import styles from "./Modal.module.scss";

const Modal = (props) => {
  const toggleModal = () => {
    props.toggleModal();
  };
  // 모달 박스 클릭 시 모달 닫힘 방지
  const modalBoxClickHandler = (e) => {
    e.stopPropagation();
  };

  if (props.isOpen) {
    return (
      <div className={styles.container}>
        <div className={styles.backdrop} onClick={toggleModal}>
          <div className={styles.modal} onClick={modalBoxClickHandler}>
            <button className={styles["btn-close"]} onClick={toggleModal}>
              ✕
            </button>
            {props.children}
          </div>
        </div>
      </div>
    );
  } else return <></>;
};

export default Modal;
