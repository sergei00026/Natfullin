"use client";

import { Input } from "@/shared/ui/shadcn/input";

interface MapLocationPickerProps {
  address: string;
  latitude: string;
  longitude: string;
  onAddressChange: (value: string) => void;
  onLatitudeChange: (value: string) => void;
  onLongitudeChange: (value: string) => void;
  disabled?: boolean;
}

export const MapLocationPicker = ({
  address,
  disabled,
  latitude,
  longitude,
  onAddressChange,
  onLatitudeChange,
  onLongitudeChange,
}: MapLocationPickerProps) => {
  const hasCoordinates = latitude.length > 0 && longitude.length > 0;
  const mapUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&z=14&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(address || "Moscow")}&z=12&output=embed`;

  return (
    <div className="space-y-3">
      <Input disabled={disabled} onChange={(event) => onAddressChange(event.target.value)} placeholder="Address" value={address} />
      <div className="grid grid-cols-2 gap-3">
        <Input disabled={disabled} onChange={(event) => onLatitudeChange(event.target.value)} placeholder="Latitude" value={latitude} />
        <Input disabled={disabled} onChange={(event) => onLongitudeChange(event.target.value)} placeholder="Longitude" value={longitude} />
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <iframe className="h-56 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapUrl} title="Map preview" />
      </div>
    </div>
  );
};
