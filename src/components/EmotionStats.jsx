import "./EmotionStats.css";
import { getEmotionImage } from "../util/get-emotion-image";

const getEmotionStats = (data) => {
  const stats = data.reduce((acc, item) => {
    acc[item.emotionId] = (acc[item.emotionId] || 0) + 1;
    return acc;
  }, {});
  return stats;
};

const emotionColors = {
  1: "rgb(100, 201, 100)",
  2: " rgb(157, 215, 114)",
  3: "rgb(253, 206, 23)",
  4: "rgb(253, 132, 70)",
  5: "rgb(253, 86, 95)",
}

const EmotionStats = ({ data, month }) => {
  const stats = getEmotionStats(data);

  return (
    <div className="emotion-stats">
      <h3>📊 {month}월 감정별 통계</h3>
      {[
        { id: 1, label: "완전 좋음" },
        { id: 2, label: "좋음" },
        { id: 3, label: "그럭저럭" },
        { id: 4, label: "나쁨" },
        { id: 5, label: "끔찍함" },
      ].map(({ id, label }) => {
        return (<div key={id} className="emotion-bar">
          <div className="emotion-info">
            <img src={getEmotionImage(id)} alt={label} className="emotion-img" />
            <span>{label} ({stats[id] || 0}개)</span>
          </div>
          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${(stats[id] || 0) * 20}%`,
                backgroundColor: emotionColors[id],
              }}>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default EmotionStats;