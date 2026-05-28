import React from 'react';

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function StylizedWord({ text, className, style }: Props) {
  const u = text.toUpperCase();
  if (!u) return null;

  const big: React.CSSProperties = { fontSize: '1.22em', lineHeight: 1, verticalAlign: 'baseline' };

  if (u.length === 1) return <span className={className} style={style}><span style={big}>{u}</span></span>;

  return (
    <span className={className} style={style}>
      <span style={big}>{u[0]}</span>
      {u.slice(1)}
    </span>
  );
}
