import React, { useState } from "react";
import Switch from "../../../../components/switch_onoff";
import SpecificDateList from "./2_phanloai-ngay/SpecificDateList"; // Import component mới

const PhanloaiNgay = () => {
  const [daysConfig, setDaysConfig] = useState([
    {
      name: "Ngày thường",
      config: [
        { configName: "Đi làm", checked: true },
        {
          configName: "Không đi làm được tính",
          value: { type: "number", value: 0, unit: "ngày công" },
        },
        { configName: "Hệ số chung", checked: true, data: [1] },
        {
          configName: "Hệ số giờ theo ca",
          checked: false,
          data: [
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
            {
              tenca: "Ca đêm",
              khunggio: [
                {
                  name: "Giờ hành chính",
                  details: "Giờ tính số công và lương giờ hành chính",
                  from: "20:00",
                  to: "22:00",
                  heso: 1,
                  salaryType: 1,
                },
                {
                  name: "Giờ hành chính đêm",
                  details:
                    "Giờ bắt đầu được tính tăng ca và giờ tối đa được tính tăng ca",
                  from: "22:00",
                  to: "05:00",
                  heso: 1.3,
                  salaryType: 1,
                },
                {
                  name: "Giờ tăng ca đêm",
                  details:
                    "Giờ bắt đầu được tính tăng ca và giờ tối đa được tính tăng ca",
                  from: "05:00",
                  to: "06:00",
                  heso: 1.7,
                  salaryType: 2,
                },
                {
                  name: "Giờ tăng ca ngày",
                  details:
                    "Giờ bắt đầu được tính tăng ca và giờ tối đa được tính tăng ca",
                  from: "06:00",
                  to: "10:00",
                  heso: 1.5,
                  salaryType: 2,
                },
                {
                  name: "Giờ nghỉ đêm",
                  details: "Giờ không được tính lương",
                  from: "10:00",
                  to: "01:00",
                  heso: 0,
                  salaryType: 0,
                },
              ],
            },
          ],
        },
        {
          configName: "Bao gồm ngày cụ thể",
          checked: false,
          data: [],
        },
        {
          configName: "Bao gồm ngày trong tuần",
          checked: true,
          data: [1, 2, 3, 4, 5, 6], // 1 -> Thứ Hai, 2 -> Thứ Ba,...
        },
      ],
    },
  ]);

  const daysOfWeek = [
    "Chủ nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  // Xử lý khi thay đổi hệ số giờ theo ca
  const handleHesochungChange = (dayIndex, configIndex, value) => {
    const updatedDays = [...daysConfig];
    console.log();
    updatedDays[dayIndex].config[configIndex].data[0] = value;
    setDaysConfig(updatedDays);
  };
  const handleKhongdilam = (dayIndex, configIndex, value) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].config[configIndex].value.value = value;
    setDaysConfig(updatedDays);
  };
  // Xử lý khi thay đổi hệ số giờ theo ca
  const handleHesoChange = (dayIndex, shiftIndex, timeSlotIndex, value) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].config[3].data[shiftIndex].khunggio[
      timeSlotIndex
    ].heso = value;
    setDaysConfig(updatedDays);
  };
  // Xử lý sự kiện xóa kiểu ngày
  const handleDelete = (index) => {
    const updatedDays = daysConfig.filter((_, i) => i !== index);
    setDaysConfig(updatedDays);
  };

  // Xử lý xóa ngày cụ thể
  const handleDeleteSpecificDate = (dayIndex, dateIndex) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].config[3].data.splice(dateIndex, 1);
    setDaysConfig(updatedDays);
  };

  // Xử lý thêm ngày cụ thể
  const handleAddSpecificDate = (dayIndex) => {
    const updatedDays = [...daysConfig];
    const newDate = { date: "", note: "" };
    updatedDays[dayIndex].config[3].data.push(newDate);
    setDaysConfig(updatedDays);
  };

  // Xử lý khi thay đổi ngày
  const handleChangeDate = (dayIndex, dateIndex, value) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].config[3].data[dateIndex].date = value;
    setDaysConfig(updatedDays);
  };

  // Xử lý khi thay đổi ghi chú
  const handleChangeNote = (dayIndex, dateIndex, value) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].config[3].data[dateIndex].note = value;
    setDaysConfig(updatedDays);
  };

  // Xử lý khi chuyển đổi công tắc (Switch) trong mỗi kiểu ngày
  const handleSwitchChange = (dayIndex, configIndex, checked) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].config[configIndex].checked = checked;
    setDaysConfig(updatedDays);
  };
  const handleAddNewDayType = () => {
    const newDayType = {
      name: "Kiểu ngày mới",
      config: [
        { configName: "Đi làm", checked: true },
        {
          configName: "Không đi làm được tính",
          value: { type: "number", value: 0, unit: "ngày công" },
        },
        { configName: "Hệ số chung", checked: true, data: [1] },
        {
          configName: "Hệ số giờ theo ca",
          checked: false,
          data: [
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
              ],
            },
          ],
        },
        {
          configName: "Bao gồm ngày cụ thể",
          checked: false,
          data: [],
        },
        {
          configName: "Bao gồm ngày trong tuần",
          checked: true,
          data: [1, 2, 3, 4, 5, 6], // 1 -> Thứ Hai, 2 -> Thứ Ba,...
        },
      ],
    };

    setDaysConfig([...daysConfig, newDayType]);
  };
  const handleDayNameChange = (dayIndex, newName) => {
    const updatedDays = [...daysConfig];
    updatedDays[dayIndex].name = newName; // Cập nhật tên kiểu ngày
    setDaysConfig(updatedDays); // Cập nhật state
  };
  const handleSave = () => {
    //
  };
  return (
    <div className="scrolling">
      <div className="sub-main">
        <div className="h2">
          <div className="left">
            <button className="add" onClick={handleAddNewDayType}>
              <i className="fa-solid fa-plus"></i>Thêm kiểu ngày
            </button>
          </div>
          <div className="right">
            <button>
              <i className="fa-solid fa-book"></i> Hướng dẫn
            </button>
            <button>
              <i className="fa-solid fa-circle-question"></i> Trợ giúp
            </button>
            <button>
              <i className="fa-solid fa-bug"></i> Báo lỗi
            </button>
          </div>
        </div>
        {daysConfig.map((day, dayIndex) => (
          <div className="whitebox-config" key={dayIndex}>
            <div className="config-head">
              <div className="title">
                <div
                  className="min"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  NT
                </div>
                <input
                  type="text"
                  value={day.name}
                  onChange={(e) =>
                    handleDayNameChange(dayIndex, e.target.value)
                  }
                />
              </div>
              <div className="right">
                <button className="save" onClick={() => handleSave(dayIndex)}>
                  <i className="fa-solid fa-cloud-arrow-down"></i> Lưu
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(dayIndex)}
                >
                  <i className="fa-solid fa-trash-can"></i> Xóa
                </button>
              </div>
            </div>
            <div className="config-main">
              {day.config.map((conf, configIndex) => (
                <div className="items-f" key={configIndex}>
                  <div className="config">
                    <div className="left">
                      <div className="name">{conf.configName}</div>
                    </div>
                    <div className="right">
                      {conf.checked != undefined ? (
                        <Switch
                          checked={conf.checked}
                          onChange={(checked) =>
                            handleSwitchChange(dayIndex, configIndex, checked)
                          }
                        />
                      ) : (
                        <div className="flex gap-2 items-center">
                          <input
                            type={conf.value.type}
                            value={conf.value.value}
                            onChange={(e) =>
                              handleKhongdilam(
                                dayIndex,
                                configIndex,
                                parseFloat(e.target.value)
                              )
                            }
                          />{" "}
                          <div className="unit">{conf.value.unit}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  {conf.data && conf.data.length > 0 && (
                    <div className="additional-data">
                      {conf.configName === "Hệ số chung" && conf.checked && (
                        <div className="details">
                          <div className="additional-items">
                            <div className="additional-items-name">Hệ số</div>
                            <div className="additional-items-value">
                              <input
                                type="number"
                                value={conf.data}
                                onChange={(e) =>
                                  handleHesochungChange(
                                    dayIndex,
                                    configIndex,
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {conf.configName === "Bao gồm ngày cụ thể" &&
                        conf.checked && (
                          <SpecificDateList
                            dayIndex={dayIndex}
                            specificDates={conf.data}
                            onDelete={handleDeleteSpecificDate}
                            onAdd={handleAddSpecificDate}
                            onChangeDate={handleChangeDate}
                            onChangeNote={handleChangeNote}
                          />
                        )}
                      {conf.configName === "Hệ số giờ theo ca" &&
                        conf.data.length > 0 &&
                        conf.checked &&
                        conf.data.map((shift, i) => (
                          <div className="details" key={i}>
                            <div className="additional-items-fc">
                              <div className="additional-items-in">
                                <div className="additional-items-name">
                                  {shift.tenca}
                                </div>
                                <div className="additional-items-list-fl">
                                  {shift.khunggio.map((timeSlot, j) => (
                                    <div
                                      className="additional-items-list1"
                                      key={j}
                                    >
                                      <div className="left">
                                        <div className="name">
                                          <div className="time-line">
                                            {timeSlot.from} - {timeSlot.to}
                                          </div>
                                          {timeSlot.name} (
                                          {timeSlot.salaryType == 1
                                            ? "Tính vào lương cơ bản"
                                            : timeSlot.salaryType == 2
                                            ? "Tính vào lương tăng ca"
                                            : "Không lương"}
                                          )
                                        </div>
                                        <div className="details">
                                          {timeSlot.details}
                                        </div>
                                      </div>
                                      <div className="right">
                                        <input
                                          type="number"
                                          value={timeSlot.heso}
                                          onChange={(e) =>
                                            handleHesoChange(
                                              dayIndex,
                                              i,
                                              j,
                                              parseFloat(e.target.value)
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhanloaiNgay;
