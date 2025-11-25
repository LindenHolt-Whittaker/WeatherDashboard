import { WeatherData, TemperatureUnit } from "../types/weather";
import { convertTemp, formatTime } from "../lib/utils";
import styles from "./DayOverview.module.css";

interface DayOverviewProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export default function DayOverview({ weather, unit }: DayOverviewProps) {
  const maxTemp = convertTemp(weather.tempmax, unit);
  const minTemp = convertTemp(weather.tempmin, unit);

  return (
    <div className={styles.dayOverview}>
      <h2>Day Overview</h2>

      <div className={styles.overviewGrid}>
        <div className={styles.statCard}>
          <h3>Humidity</h3>
          <div className={styles.statValue}>{Math.round(weather.humidity)}%</div>
          <div className={styles.progressBarContainer}>
            <span className={styles.progressPercentage}>%</span>
            <div className={styles.progressBar}>
              {/* Color coding: green for higher values (>50%), yellow for lower values */}
              <div
                className={`${styles.progressFill} ${
                  weather.humidity > 50 ? styles.green : styles.yellow
                }`}
                style={{ width: `${weather.humidity}%` }}
              />
            </div>
            <div className={styles.progressLabels}>
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <h3>Cloud Cover</h3>
          <div className={styles.statValue}>{Math.round(weather.cloudcover)}%</div>
          <div className={styles.progressBarContainer}>
            <span className={styles.progressPercentage}>%</span>
            <div className={styles.progressBar}>
              {/* Color coding: green for higher values (>50%), yellow for lower values */}
              <div
                className={`${styles.progressFill} ${
                  weather.cloudcover > 50 ? styles.green : styles.yellow
                }`}
                style={{ width: `${weather.cloudcover}%` }}
              />
            </div>
            <div className={styles.progressLabels}>
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailCard}>
          <div className={styles.detailLabel}>Max temp.</div>
          <div className={styles.detailValueContainer}>
            <span className={styles.detailValue}>{Math.round(maxTemp)}</span>
            <span className={styles.detailValueUnit}>°{unit}</span>
          </div>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailLabel}>Min temp.</div>
          <div className={styles.detailValueContainer}>
            <span className={styles.detailValue}>{Math.round(minTemp)}</span>
            <span className={styles.detailValueUnit}>°{unit}</span>
          </div>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailLabel}>Sunrise</div>
          <div className={styles.detailValue}>{formatTime(weather.sunrise)}</div>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailLabel}>Sunset</div>
          <div className={styles.detailValue}>{formatTime(weather.sunset)}</div>
        </div>
      </div>
    </div>
  );
}
