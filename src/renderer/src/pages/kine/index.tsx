import { FC } from "react";
import './index.css';
import HeatMap from './component/HeatMap';
import KLine from './component/Kline';

const Kline: FC = () => {
  return (
    <>
        <div className="kline-box">
            <div className="content">
                <KLine/>
            </div>
            <div className="bg">
                <HeatMap/>
            </div>
        </div>
    </>
  )
}

export default Kline;