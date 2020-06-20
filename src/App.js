import React, { useState, useEffect } from "react";
import "./App.scss";
import GroundList from "./Components/GroundList";
import Inputs from "./Components/Input";
import { firebaseAddress } from "./Config/Config";

export default function App() {
  const [state, setState] = useState({
    id: "",
    title: "",
    titles: {},
    click: false,
  });
  const { id, title, titles, click } = state;

  useEffect(() => {
    getToBackdata();
  }, []);

  // 서버 데이터 get 함수
  const getToBackdata = () => {
    fetch(`${firebaseAddress}/ground.json`)
      .then((res) => res.json())
      .then((res) => {
        setState({
          titles: res,
          title: "",
        });
      });
  };

  //서버 post 함수
  const onCreateHandler = () => {
    if (title === "") {
      alert("시설명을 입력해주세요!");
      return;
    }
    return fetch(`${firebaseAddress}/ground.json`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        getToBackdata();
      });
  };

  //서버 데이터 update 함수
  const onUpdateHandler = (id) => {
    return fetch(`${firebaseAddress}/ground/${id}.json`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
      }),
    }).then(() => {
      let nextState = titles;
      nextState[id] = { title };
      setState({
        ...state,
        titles: nextState,
        title: "",
        id: "",
        click: true,
      });
    });
  };

  //서버 데이터 delete 함수
  const onDeleteHandler = (id) => {
    return fetch(`${firebaseAddress}/ground/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        let nextState = titles;
        delete nextState[id];
        if (
          Object.keys(nextState).length === 0 &&
          nextState.constructor === Object
        ) {
          window.location.reload();
        } else
          setState({
            ...state,
            titles: nextState,
            title: "",
            id: "",
            click: true,
          });
      });
  };

  // 인풋 value 변경 함수
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // 리스트 클릭 시 state 변경 함수
  const listState = (title, id) => {
    setState({
      ...state,
      click: false,
      title: title,
      id: id,
    });
  };

  // 취소버튼 클릭 시 state 변경 함수
  const cancelState = () => {
    setState({ ...state, click: true, title: "", id: "" });
  };

  return (
    <div className="App">
      <GroundList titles={titles} title={title} id={id} listState={listState} />
      <Inputs
        title={title}
        click={click}
        id={id}
        onChange={onChangeHandler}
        onUpdate={onUpdateHandler}
        onDelete={onDeleteHandler}
        onCreate={onCreateHandler}
        cancelState={cancelState}
      />
    </div>
  );
}
