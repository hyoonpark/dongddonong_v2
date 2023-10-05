import { useState, useEffect, useRef } from "react";

import { UserMapping } from "../../api/userMapping";
import Modal from "../Modal/Modal";
import "./Classification.css";

const Classification = ({ playerHistories, userId, onClose }) => {
  const frameRef = useRef();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [initialized, setInitialized] = useState(false);
  const [completeClassify, setCompleteClassify] = useState(true);
  const arr = [];

  let current =
    frameRef.current && frameRef.current.querySelector(".card:last-child");
  let startX = 0,
    startY = 0,
    moveX = 0,
    moveY = 0;

  useEffect(() => {
    for (const e of playerHistories) {
      arr.push(playerHistories.indexOf(e));
      frameRef.current && appendCard(e);
    }

    if (initialized && current) {
      initCard(current);
    }

    if (!initialized && playerHistories.length > 0) {
      setInitialized(true);
    }
  }, [initialized, current, playerHistories]);

  function appendCard(data) {
    if (
      frameRef.current.children[1] &&
      frameRef.current.children[1].className === "card"
    )
      return;
    const firstCard = frameRef.current.children[0];
    const newCard = document.createElement("div");

    newCard.key = data.userId;
    newCard.className = "card";

    newCard.style.backgroundImage = `url(${data.diffProfileImg})`;
    newCard.innerHTML = `
    <div class="mx-auto w-full text-center mt-4>본인을 선택 하면 기록이 연동돼요</div>
    ${
      data.userId ? (
        <div className="bg-primary w-fit p-2 rounded-full -rotate-6 top-4 right-4">
          분류 완료
        </div>
      ) : (
        ""
      )
    }
    <div class="text-white w-full absolute top-1/2 -translate-y-2/3 flex justify-evenly">
      <div>< 본인</div>
      <div class="basis-1/2 md:basis-3/5"></div>
      <div>상대 ></div>
    </div>
    <div class="bottom">
      <div class="title">
        <span>${data.userId}</span>
      </div>
      <div class="info">
        <span>득점</span>
        <span>2점</span>
        <span>2점%</span>
        <span>3점</span>
        <span>3점%</span>
      </div>
      <div class="info">
        <span>${data.total}</span>
        <span>${data.twoPts}</span>
        <span>${parseInt((data.twoPts / data.tryTwoPts) * 100)}%</span>
        <span>${data.threePts}</span>
        <span>${parseInt((data.threePts / data.tryThreePts) * 100)}%</span>
      </div>
    </div>
  `;

    if (firstCard) frameRef.current.insertBefore(newCard, firstCard);
    else frameRef.current.appendChild(newCard);
  }

  function initCard(card) {
    if (card) {
      card.addEventListener("pointerdown", onPointerDown);
    }
  }

  function setTransform(x, y, deg, duration) {
    current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
    if (duration) current.style.transition = `transform ${duration}ms`;
  }

  function onPointerDown({ clientX, clientY }) {
    startX = clientX;
    startY = clientY;
    current.addEventListener("pointermove", onPointerMove);
    current.addEventListener("pointerup", onPointerUp);
    current.addEventListener("pointerleave", onPointerUp);
  }

  function onPointerMove({ clientX, clientY }) {
    moveX = clientX - startX;
    moveY = clientY - startY;
    setTransform(moveX, moveY, (moveX / innerWidth) * 50);
  }

  function onPointerUp() {
    current.removeEventListener("pointermove", onPointerMove);
    current.removeEventListener("pointerup", onPointerUp);
    current.removeEventListener("pointerleave", onPointerUp);
    if (Math.abs(moveX) > frameRef.current.clientWidth / 2) {
      current.removeEventListener("pointerdown", onPointerDown);
      complete();
    } else cancel();
  }

  let idx = -1;
  function complete() {
    idx++;
    const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3;
    const flyY = (moveY / moveX) * flyX;
    setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth);

    if (flyX < 0) {
      UserMapping(playerHistories[idx].id, +userId);
    }

    const prev = current;
    const next = current.previousElementSibling;

    if (next) {
      initCard(next);
      current = next;
      setTimeout(() => frameRef.current.removeChild(prev), 100);
    } else {
      onClose();
      return;
    }
  }

  function cancel() {
    setTransform(0, 0, 0, 100);
    setTimeout(() => (current.style.transition = ""), 100);
  }

  return (
    <Modal onClose={onClose}>
      {/* <div class="absolute right-2" onClick={onClose}>
        ✖
      </div> */}
      <div className="frame" ref={frameRef}></div>
    </Modal>
  );
};

export default Classification;
