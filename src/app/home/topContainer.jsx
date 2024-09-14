import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const TopContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm gửi sự kiện "minimize" tới Electron
  const handleMinimize = () => {
    window.electron.send("minimize");
  };
  const handleMaximize = () => {
    window.electron.send("maximize");
  };
  const handleExit = () => {
    window.electron.send("exit");
  };

  // Hàm tìm kiếm với debounce
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term) {
        console.log("Tìm kiếm:", term);
      }
      // Thực hiện tìm kiếm tại đây
    }, 500), // Thời gian chờ 0.5 giây
    []
  );

  useEffect(() => {
    // Sử dụng debounce khi searchTerm thay đổi
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    // Ctrl + F
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        const searchInput = document.getElementById("search-items");
        if (searchInput) {
          searchInput.focus(); // Đưa tiêu điểm vào ô tìm kiếm
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Hàm xử lý sự thay đổi trong ô tìm kiếm
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="top-container">
      <div className="left-navigation">
        <div className="logo">
          <div className="picture">
            <i className="fa-solid fa-helicopter-symbol"></i>
          </div>
          <div className="name">iWorks</div>
        </div>
      </div>
      <div className="right-navigation">
        <div className="search-bar">
          <div className="search-box">
            <label htmlFor="search-items">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input
              id="search-items"
              type="text"
              placeholder="Tìm kiếm..."
              spellCheck="false"
              value={searchTerm}
              onChange={handleSearchChange} // Gọi hàm khi giá trị thay đổi
            />
          </div>
        </div>
        <div className="status-bar">
          <div className="items">
            <div className="logo">
              <i className="fa-brands fa-elementor"></i>
            </div>
            <div className="name">Tài liệu</div>
          </div>
          <div className="items">
            <div className="logo">
              <i className="fa-solid fa-cloud"></i>
            </div>
            <div className="name">Cập nhật</div>
          </div>
          <div className="items">
            <div className="logo">
              <i className="fa-solid fa-bug"></i>
            </div>
            <div className="name">Báo lỗi</div>
          </div>
        </div>
        <div className="options-bar">
          <div className="items">
            <div className="logo">
              <i className="fa-regular fa-bell"></i>
            </div>
            <div className="value">0</div>
          </div>
          <div className="items">
            <div className="logo">
              <i className="fa-solid fa-wifi"></i>
            </div>
            <div className="value">10</div>
          </div>
          <div className="items">
            <div className="logo">
              <i className="fa-solid fa-gear"></i>
            </div>
          </div>
        </div>
        {/* Kiểm tra nếu có window.electron */}
        {window.electron ? (
          <div className="tools-bar">
            <div className="items" onClick={handleMinimize}>
              <i className="fa-solid fa-minus"></i>
            </div>
            <div className="items" onClick={handleMaximize}>
              <i className="fa-regular fa-window-restore"></i>
            </div>
            <div className="items close" onClick={handleExit}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        ) : (
          <div className="tools-bar"></div>
        )}
      </div>
    </div>
  );
};

export default TopContainer;
