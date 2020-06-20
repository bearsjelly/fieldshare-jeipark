import React from "react";

export default function GroundList({ titles, listState }) {
  return (
    <div className="groundlist">
      <header>FieldShare</header>
      <div className="title">
        <div>ID</div>
        <div>시설</div>
      </div>
      {titles === null ? (
        <div className="empty">
          <p>입력값이 없습니다</p>
        </div>
      ) : (
        <ul>
          {Object.keys(titles).map((el) => {
            const list = titles[el];
            return (
              <li
                className="mapList"
                key={el}
                onClick={() => {
                  listState(list.title, el);
                }}
              >
                <div>{el}</div>
                <div>{list.title}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
