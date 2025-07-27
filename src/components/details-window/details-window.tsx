import type { DetailsWindowProps } from './details-window.types';
import './details-window.css';

export function DetailsWindow({ data, onClose }: DetailsWindowProps) {
  return (
    <div className="description">
      <div className="close-button-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="gender">
        <span>Gender:</span>
        <span>
          {data?.gender === undefined
            ? '-'
            : data.gender === null
              ? 'Unknown'
              : data.gender}
        </span>
      </div>
      <div className="height">
        <span>Height:</span>
        <span>
          {data?.height === undefined
            ? '-'
            : data.height === null
              ? 'Unknown'
              : data.height}{' '}
          cm
        </span>
      </div>
      <div className="mass">
        <span>Mass:</span>
        <span>
          {data?.mass === undefined
            ? '-'
            : data.mass === null
              ? 'Unknown'
              : data.mass}{' '}
          kg
        </span>
      </div>
      <div className="birth-year">
        <span>Birth Year:</span>
        <span>
          {data?.birth_year === undefined
            ? '-'
            : data.birth_year === null
              ? 'Unknown'
              : data.birth_year}
        </span>
      </div>
      <div className="hair-color">
        <span>Hair Color:</span>
        <span>
          {data?.hair_color === undefined
            ? '-'
            : data.hair_color === null
              ? 'Unknown'
              : data.hair_color}
        </span>
      </div>
      <div className="eye-color">
        <span>Eye Color:</span>
        <span>
          {data?.eye_color === undefined
            ? '-'
            : data.eye_color === null
              ? 'Unknown'
              : data.eye_color}
        </span>
      </div>
      <div className="skin-color">
        <span>Skin Color:</span>
        <span>
          {data?.skin_color === undefined
            ? '-'
            : data.skin_color === null
              ? 'Unknown'
              : data.skin_color}
        </span>
      </div>
    </div>
  );
}
