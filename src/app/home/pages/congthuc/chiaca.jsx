import React, { useState } from "react";

const Chiaca = () => {
  // State để quản lý danh sách ca
  const [shifts, setShifts] = useState([
    {
      tenca: "Ca ngày",
      khunggio: [
        {
          name: "Giờ hành chính",
          details: "Giờ tính số công và lương giờ hành chính",
          from: "08:00",
          to: "17:00",
          heso: 1,
          salaryType: 1,
        },
        {
          name: "Giờ tăng ca",
          details:
            "Giờ bắt đầu được tính tăng ca và giờ tối đa được tính tăng ca",
          from: "17:00",
          to: "22:00",
          heso: 1.5,
          salaryType: 2,
        },
        {
          name: "Giờ nghỉ trưa",
          details: "Giờ không được tính lương",
          from: "12:00",
          to: "13:00",
          heso: 0,
          salaryType: 0,
        },
      ],
    },
  ]);

  // Các khung giờ mặc định
  const defaultTimeFrame = {
    name: "Khung giờ mới",
    details: "Chi tiết khung giờ mới",
    from: "00:00",
    to: "00:00",
    heso: 1,
    salaryType: 1,
  };

  // Hàm thêm ca mới với các khung giờ mặc định
  const addShift = () => {
    const newShift = {
      tenca: `Ca mới ${shifts.length + 1}`,
      khunggio: [{ ...defaultTimeFrame }],
    };
    setShifts([...shifts, newShift]);
  };

  // Hàm thêm khung giờ vào ca hiện tại
  const addKhungGio = (shiftIndex) => {
    const updatedShifts = [...shifts];
    updatedShifts[shiftIndex].khunggio.push({ ...defaultTimeFrame });
    setShifts(updatedShifts);
  };

  // Hàm xóa ca
  const deleteShift = (shiftIndex) => {
    const updatedShifts = shifts.filter((_, idx) => idx !== shiftIndex);
    setShifts(updatedShifts);
  };

  // Hàm xóa khung giờ
  const deleteKhungGio = (shiftIndex, khungIndex) => {
    const updatedShifts = [...shifts];
    updatedShifts[shiftIndex].khunggio = updatedShifts[
      shiftIndex
    ].khunggio.filter((_, idx) => idx !== khungIndex);
    setShifts(updatedShifts);
  };

  // Hàm cập nhật thông tin của ca
  const updateShiftInfo = (shiftIndex, newValue, field) => {
    const updatedShifts = [...shifts];
    updatedShifts[shiftIndex][field] = newValue;
    setShifts(updatedShifts);
  };

  // Hàm cập nhật thông tin của khung giờ
  const updateKhungInfo = (shiftIndex, khungIndex, newValue, field) => {
    const updatedShifts = [...shifts];
    updatedShifts[shiftIndex].khunggio[khungIndex][field] = newValue;
    setShifts(updatedShifts);
  };

  // Hàm cập nhật hệ số lương cho từng khung giờ
  const updateHeso = (shiftIndex, khungIndex, newHeso) => {
    updateKhungInfo(shiftIndex, khungIndex, newHeso, "heso");
  };

  // Hàm cập nhật loại lương cho từng khung giờ
  const updateSalaryType = (shiftIndex, khungIndex, newSalaryType) => {
    updateKhungInfo(shiftIndex, khungIndex, newSalaryType, "salaryType");
  };

  // Hàm cập nhật thời gian cho từng khung giờ
  const updateTime = (shiftIndex, khungIndex, newTime, timeType) => {
    updateKhungInfo(shiftIndex, khungIndex, newTime, timeType);
  };

  return (
    <div className="scrolling">
      <div className="sub-main">
        <div className="h2">
          <div className="left">Danh sách ca</div>
          <div className="right">
            <button onClick={addShift}>
              <i className="fa-solid fa-plus"></i>Thêm ca
            </button>
          </div>
        </div>
        {shifts.map((shift, shiftIdx) => (
          <div key={shiftIdx} className="whitebox-config">
            <div className="config-head">
              {/* Sửa tên ca */}
              <div className="title">
                <input
                  type="text"
                  value={shift.tenca}
                  onChange={(e) =>
                    updateShiftInfo(shiftIdx, e.target.value, "tenca")
                  }
                />
              </div>
              <div className="right">
                {/* Thêm khung giờ */}
                <button onClick={() => addKhungGio(shiftIdx)}>
                  <i className="fa-solid fa-plus"></i>Thêm khung giờ
                </button>
                {/* Xóa ca */}
                <button
                  className="delete"
                  onClick={() => deleteShift(shiftIdx)}
                >
                  <i className="fa-solid fa-trash-can"></i>Xóa ca
                </button>
              </div>
            </div>
            <div className="config-main">
              {shift.khunggio.map((khung, khungIdx) => (
                <div key={khungIdx} className="items">
                  <div className="left">
                    {/* Sửa tên khung giờ */}
                    <div className="name">
                      <input
                        type="text"
                        value={khung.name}
                        onChange={(e) =>
                          updateKhungInfo(
                            shiftIdx,
                            khungIdx,
                            e.target.value,
                            "name"
                          )
                        }
                      />
                    </div>
                    {/* Sửa chi tiết khung giờ */}
                    <div className="details">
                      <input
                        type="text"
                        value={khung.details}
                        onChange={(e) =>
                          updateKhungInfo(
                            shiftIdx,
                            khungIdx,
                            e.target.value,
                            "details"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="heso">
                      Hệ số lương
                      <input
                        type="number"
                        value={khung.heso}
                        onChange={(e) =>
                          updateHeso(
                            shiftIdx,
                            khungIdx,
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="tinhluong">
                      <select
                        value={khung.salaryType}
                        onChange={(e) =>
                          updateSalaryType(
                            shiftIdx,
                            khungIdx,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value={1}>Tính vào lương cơ bản</option>
                        <option value={2}>Tính vào lương tăng ca</option>
                        <option value={0}>Không lương</option>
                      </select>
                    </div>
                    <input
                      type="time"
                      value={khung.from}
                      onChange={(e) =>
                        updateTime(shiftIdx, khungIdx, e.target.value, "from")
                      }
                    />{" "}
                    đến{" "}
                    <input
                      type="time"
                      value={khung.to}
                      onChange={(e) =>
                        updateTime(shiftIdx, khungIdx, e.target.value, "to")
                      }
                    />
                    {/* Nút xóa bỏ khung giờ */}
                    <button
                      className="delete"
                      onClick={() => deleteKhungGio(shiftIdx, khungIdx)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chiaca;
