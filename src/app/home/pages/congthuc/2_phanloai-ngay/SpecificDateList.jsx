import React from "react";

const SpecificDateList = ({
  dayIndex,
  specificDates,
  onDelete,
  onAdd,
  onChangeDate,
  onChangeNote,
}) => {
  return (
    <div className="details">
      <div className="additional-items-list">
        {specificDates.map((date, i) => (
          <div className="itemsbox" key={i}>
            <div className="itemsbox-title">
              <div className="itemsbox-title-name">
                <input
                  type="text"
                  value={date.date}
                  placeholder="Ngày (dd/mm)"
                  onChange={(e) => onChangeDate(dayIndex, i, e.target.value)}
                />
              </div>
              <div className="itemsbox-title-btn">
                <button onClick={() => onDelete(dayIndex, i)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
            <div className="itemsbox-details">
              <input
                type="text"
                value={date.note}
                placeholder="Ghi chú"
                onChange={(e) => onChangeNote(dayIndex, i, e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="add-btn">
          <button className="add" onClick={() => onAdd(dayIndex)}>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificDateList;
