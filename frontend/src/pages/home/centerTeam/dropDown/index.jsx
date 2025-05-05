import { useEffect, useRef } from "react";
import { homeStore } from "@/domain/home/store/home.store";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Select, Divider, Space, Input } from "antd";
import mapLogo from "@/assets/img/map.png";
import styles from "./index.module.less";
const DropDownCom = () => {
  const selectIndex = homeStore((state) => state.selectIndex);
  const getLocsList = homeStore((state) => state.getLocsList);
  const locList = homeStore((state) => state.locList);
  const sports = homeStore((state) => state.sports);
  const createLoc = homeStore((state) => state.createLoc);
  const addLocLoading = homeStore((state) => state.addLocLoading);
  const setModalState = homeStore((state) => state.setModalState);
  const selectLocId = homeStore((state) => state.selectLocId);
  const changeSelectLocId = homeStore((state) => state.changeSelectLocId);
  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null);

  const createTeam = () => {
    const inputValue = autoCompleteRef?.current?.input?.value ?? "";
    console.log("Selected or input value:", inputValue);
    setModalState(true);
  };

  const addItem = () => {
    const inputValue = (inputRef.current?.input?.value ?? "")?.trim(); 
    if (inputValue) {
      createLoc(inputValue);
    }
  };

  useEffect(() => {
    getLocsList();
  }, [selectIndex, sports?.length]);
  return (
    <div className={styles.center}>
      <img src={mapLogo} alt="map" className={styles.map_logo} />
      <Select
        style={{ width: 400, marginRight: 20, height: 40 }}
        value={selectLocId ?? ""}
        placeholder="click to choose location"
        onChange={changeSelectLocId}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <Space style={{ padding: "0 8px 4px" }}>
              <Input
                ref={inputRef}
                placeholder="Please enter location"
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" loading={addLocLoading} icon={<PlusOutlined />} onClick={addItem}>
                Add new location
              </Button>
            </Space>
          </>
        )}
        options={locList}
      />
      <Button type="primary" className={styles.create_team_button} onClick={createTeam}>
        create team
      </Button>
    </div>
  );
};
export default DropDownCom;
