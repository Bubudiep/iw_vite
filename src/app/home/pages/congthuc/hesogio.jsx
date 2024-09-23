import React, { useState, useEffect } from "react";
import TimeLine from "./hesogio/timeLine";

const Hesogio = () => {
  const [selectedShift, setSelectedShift] = useState("HC");
  const [shiftTypes, setShiftTypes] = useState([
    { id: 1, name: "Ngày thường", timeSlots: [] },
    { id: 2, name: "Ngày chủ nhật", timeSlots: [] },
    { id: 3, name: "Ngày lễ", timeSlots: [] },
  ]);
  const [newShiftType, setNewShiftType] = useState("");

  // Hàm để tạo timeSlots mặc định cho từng kiểu ngày khi chọn số ca
  const generateTimeSlots = (numberOfSlots) => {
    return Array(numberOfSlots).fill({
      name: "Ca làm việc A",
      start: "08:00",
      end: "17:00",
      startbreakTime: "12:00",
      endbreakTime: "13:00",
      hourlyRate: 100,
      rangeTime: [
        {
          start: "08:00",
          end: "17:00",
          rate: 100,
        },
        {
          start: "17:00",
          end: null,
          rate: 150,
        },
      ],
    });
  };

  // Khi trang được tải, tạo timeSlots mặc định (Hành chính, 1 ca)
  useEffect(() => {
    const defaultTimeSlots = generateTimeSlots(1); // 1 ca cho hành chính
    const updatedShiftTypes = shiftTypes.map((shiftType) => ({
      ...shiftType,
      timeSlots: defaultTimeSlots,
    }));
    setShiftTypes(updatedShiftTypes);
  }, []);

  const handleShiftChange = (e) => {
    const shift = e.target.value;
    setSelectedShift(shift);

    // Số lượng ca dựa trên ca đã chọn
    let slots = 1;
    if (shift === "2CA") slots = 2;
    if (shift === "3CA") slots = 3;
    if (shift === "4CA") slots = 4;

    // Cập nhật timeSlots cho tất cả các kiểu ngày
    const updatedShiftTypes = shiftTypes.map((shiftType) => ({
      ...shiftType,
      timeSlots: generateTimeSlots(slots),
    }));
    setShiftTypes(updatedShiftTypes);
  };

  const handleTimeChange = (shiftTypeId, slotIndex, field, value) => {
    const updatedShiftTypes = shiftTypes.map((shiftType) => {
      if (shiftType.id === shiftTypeId) {
        const updatedTimeSlots = [...shiftType.timeSlots];
        updatedTimeSlots[slotIndex] = {
          ...updatedTimeSlots[slotIndex],
          [field]: value,
        };
        return { ...shiftType, timeSlots: updatedTimeSlots };
      }
      return shiftType;
    });
    setShiftTypes(updatedShiftTypes);
  };

  const handleRangeTimeChange = (shiftTypeId, slotIndex, updatedRangeTime) => {
    const updatedShiftTypes = shiftTypes.map((shiftType) => {
      if (shiftType.id === shiftTypeId) {
        const updatedTimeSlots = [...shiftType.timeSlots];
        updatedTimeSlots[slotIndex] = {
          ...updatedTimeSlots[slotIndex],
          rangeTime: updatedRangeTime,
        };
        return { ...shiftType, timeSlots: updatedTimeSlots };
      }
      return shiftType;
    });
    setShiftTypes(updatedShiftTypes);
  };

  const handleAddShiftType = () => {
    if (newShiftType.trim() !== "") {
      setShiftTypes([
        ...shiftTypes,
        {
          id: shiftTypes.length + 1,
          name: newShiftType,
          timeSlots: generateTimeSlots(
            selectedShift === "HC" ? 1 : parseInt(selectedShift)
          ),
        },
      ]);
      setNewShiftType("");
    }
  };

  return (
    <div className="scrolling">
      <div className="sub-main">
        <div className="h2">Cài đặt chung</div>
        <div className="flex gap-2 w-full">
          <div className="white-box flex flex-col flex-1">
            <div className="config-item">
              <div className="details">
                <div className="name">Ca làm việc chung</div>
                <div className="description">
                  Phân ca làm việc trong công ty của bạn
                </div>
              </div>
              <div className="options">
                <select value={selectedShift} onChange={handleShiftChange}>
                  <option value="HC">Hành chính</option>
                  <option value="2CA">2 Ca</option>
                  <option value="3CA">3 Ca</option>
                  <option value="4CA">4 Ca</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="h2">Thiết lập chia ca</div>

        {shiftTypes.map((shiftType) => (
          <div key={shiftType.id} className="white-box mb-4">
            <div className="sub-head">
              <div className="flex flex-1 justify-between">
                <div className="shiftType">{shiftType.name}</div>
              </div>
            </div>
            <div className="sub-main">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>Tên ca làm việc</th>
                    <th>Hệ số (%)</th>
                    <th>Bắt đầu</th>
                    <th>Kết thúc</th>
                    <th>Giờ nghỉ</th>
                    <th>Hệ số theo giờ (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftType.timeSlots.map((slot, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className="named"
                          value={slot.name}
                          onChange={(e) =>
                            handleTimeChange(
                              shiftType.id,
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="w-full border rounded"
                          value={slot.hourlyRate}
                          onChange={(e) =>
                            handleTimeChange(
                              shiftType.id,
                              index,
                              "hourlyRate",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          className="w-full border rounded"
                          value={slot.start}
                          onChange={(e) =>
                            handleTimeChange(
                              shiftType.id,
                              index,
                              "start",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          className="w-full border rounded"
                          value={slot.end}
                          onChange={(e) =>
                            handleTimeChange(
                              shiftType.id,
                              index,
                              "end",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <div className="breakTime">
                          <input
                            type="time"
                            value={slot.startbreakTime}
                            onChange={(e) =>
                              handleTimeChange(
                                shiftType.id,
                                index,
                                "startbreakTime",
                                e.target.value
                              )
                            }
                          />
                          -
                          <input
                            type="time"
                            value={slot.endbreakTime}
                            onChange={(e) =>
                              handleTimeChange(
                                shiftType.id,
                                index,
                                "endbreakTime",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <TimeLine
                          rangeTime={slot.rangeTime}
                          onRangeTimeChange={(updatedRangeTime) =>
                            handleRangeTimeChange(
                              shiftType.id,
                              index,
                              updatedRangeTime
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <div className="add-shift-type flex gap-2">
            <input
              type="text"
              value={newShiftType}
              onChange={(e) => setNewShiftType(e.target.value)}
              placeholder="Thêm kiểu ngày mới"
            />
            <button onClick={handleAddShiftType}>Thêm kiểu ngày</button>
          </div>
          <div className="save-btn">
            <button>Lưu lại</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hesogio;
