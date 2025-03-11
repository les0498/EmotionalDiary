import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [selectedEmotionId, setSelectedEmotionId] = useState("all"); 

  const onChangeSortType = (e)=>{
    setSortType(e.target.value);
  };

  const onChangeEmotion = (e) => {
    setSelectedEmotionId(e.target.value); 
  };

  const getProcessedData = () => {
    const sortedData = data.toSorted((a, b) => {
      return sortType === "oldest"
        ? Number(a.createdDate) - Number(b.createdDate)
        : Number(b.createdDate) - Number(a.createdDate);
    });

    if (selectedEmotionId === "all") return sortedData;
    
    return sortedData.filter((item) => item.emotionId ===  Number(selectedEmotionId));
    
  };

  const processedData = getProcessedData();


  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <select onChange={onChangeEmotion}>
          <option value={"all"}>전체</option>
          <option value={"1"}>완전 좋음</option>
          <option value={"2"}>좋음</option>
          <option value={"3"}>그럭저럭</option>
          <option value={"4"}>나쁨</option>
          <option value={"5"}>끔찍함</option>
        </select>
        <Button
          onClick={()=> nav("/new")}
          text={"새 일기 쓰기"} 
          type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {processedData.map((item)=>(
          <DiaryItem key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default DiaryList;