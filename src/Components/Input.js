import React from "react";

export default function Inputs({
  title,
  id,
  click,
  onCreate,
  onChange,
  onUpdate,
  onDelete,
  cancelState,
}) {
  return (
    <div className="textSide">
      <div className="inputWrap">
        <input
          type="text"
          name="title"
          autoComplete="off"
          value={title}
          onChange={onChange}
          r
        />
      </div>
      <div className="btnWrap">
        {click !== false ? (
          <button onClick={onCreate}>저장</button>
        ) : (
          <>
            <button onClick={() => onUpdate(id)}>수정</button>
            <button onClick={() => onDelete(id)}>삭제</button>
            <button
              onClick={() => {
                cancelState();
              }}
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>
  );
}
