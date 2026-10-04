import React from 'react';

interface CivicPhotoPanelProps {
  image: string;
  alt: string;
  label: string;
  caption: string;
}

export const CivicPhotoPanel: React.FC<CivicPhotoPanelProps> = ({ image, alt, label, caption }) => (
  <figure className="govuk-photo-panel">
    <img src={image} alt={alt} loading="lazy" />
    <figcaption><span>{label}</span><strong>{caption}</strong></figcaption>
  </figure>
);
