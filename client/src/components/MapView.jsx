
import React from 'react';

const MapView = ({ path, obstacles, rooms = [], goal, GRID_WIDTH = 40, GRID_HEIGHT = 30 }) => {
  const cellSize = 16; 
  const width = GRID_WIDTH * cellSize;
  const height = GRID_HEIGHT * cellSize;

  const isPath = (x, y) => path.some(p => p.x === x && p.y === y);
  const isObstacle = (x, y) => obstacles.some(o => o.x === x && o.y === y);

  return (
    <div className="glass-panel" style={{ overflow: 'auto', textAlign: 'center', background: '#FFFFFF', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', fontFamily: "'Manrope', sans-serif" }}>
          Advanced Library Navigation System
        </h2>
        <div style={{ width: '40px', height: '4px', background: 'var(--primary)', margin: '0.5rem auto' }}></div>
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block', background: '#FFFFFF', padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB' }}>
        <svg 
           width={width} 
           height={height} 
           viewBox={`0 0 ${width} ${height}`}
           style={{ backgroundColor: '#FFFBEB' }} // Very Light Yellow for walkable distance
        >
          {/* 1. ROOM BACKGROUNDS (Slightly opaque to show yellow walkable path underneath) */}
          {rooms.map((room, idx) => (
            <React.Fragment key={idx}>
              <rect 
                x={room.x * cellSize} 
                y={room.y * cellSize} 
                width={room.w * cellSize} 
                height={room.h * cellSize} 
                fill={room.color.replace('1)', '0.3)')} 
                stroke="#F3F4F6"
                strokeWidth="0.5"
              />
              <text 
                x={(room.x + room.w/2) * cellSize} 
                y={(room.y + room.h/2) * cellSize} 
                fill="#9CA3AF" 
                fontSize="11" 
                fontWeight="800" 
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ pointerEvents: 'none', letterSpacing: '0.1rem', opacity: 0.5 }}
              >
                {room.name}
              </text>
            </React.Fragment>
          ))}

          {/* 2. GRID LINES */}
          {Array.from({ length: GRID_WIDTH + 1 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * cellSize} y1={0} x2={i * cellSize} y2={height} stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: GRID_HEIGHT + 1 }).map((_, i) => (
            <line key={`h-${i}`} x1={0} y1={i * cellSize} x2={width} y2={i * cellSize} stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
          ))}

          {/* 3. WALLS & RACKS (Dark Grey) */}
          {obstacles.map((obs, idx) => (
            <rect 
              key={idx}
              x={obs.x * cellSize + 1}
              y={obs.y * cellSize + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              fill="#374151" 
              rx="2"
            />
          ))}

          {/* 4. ENTRANCE GATE */}
          <rect x={18 * cellSize} y={29 * cellSize} width={4 * cellSize} height={cellSize} fill="#10B981" rx="2" />
          <text x={20 * cellSize} y={29.7 * cellSize} fill="white" fontSize="9" fontWeight="800" textAnchor="middle">ENTRANCE</text>

          {/* 5. PATH LINE (Yellow Dashed with Glow) */}
          {path.length > 0 && (
            <g>
              <polyline
                points={path.map(p => `${p.x * cellSize + cellSize/2},${p.y * cellSize + cellSize/2}`).join(' ')}
                fill="none"
                stroke="#facc15" 
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              <polyline
                points={path.map(p => `${p.x * cellSize + cellSize/2},${p.y * cellSize + cellSize/2}`).join(' ')}
                fill="none"
                stroke="#facc15" 
                strokeWidth="4"
                strokeDasharray="6, 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* 6. START & GOAL Markers (Circles) */}
          {path.length > 0 && (
            <circle cx={20 * cellSize + cellSize / 2} cy={28 * cellSize + cellSize / 2} r={cellSize / 2} fill="#10B981" />
          )}
          {goal && (
            <circle cx={goal.x * cellSize + cellSize / 2} cy={goal.y * cellSize + cellSize / 2} r={cellSize / 2} fill="#EF4444">
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>


      
      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', padding: '1.25rem', background: '#F9FAFB', borderRadius: '12px' }}>
        <LegendItem boxColor="#FFFBEB" label="Walkable Area" />
        <LegendItem boxColor="#374151" label="Racks / Shelves" />
        <LegendItem boxColor="#facc15" label={`Path (${path.length} steps)`} line />
        <LegendItem boxColor="#10B981" label="Entrance" circle />
        <LegendItem boxColor="#EF4444" label="Target Book" circle />
      </div>
    </div>
  );
};

const LegendItem = ({ boxColor, label, line = false, circle = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {line && <div style={{ width: '8px', height: '2px', background: '#D1D5DB' }}></div>}
      <div style={{ 
        width: 18, 
        height: 18, 
        background: boxColor, 
        border: line ? `1px dashed ${boxColor}` : '1px solid #E5E7EB',
        borderRadius: circle ? '50%' : '2px' 
      }}></div>
      {line && <div style={{ width: '8px', height: '2px', background: '#D1D5DB' }}></div>}
    </div>
    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#4B5563' }}>{label}</span>
  </div>
);

export default MapView;
