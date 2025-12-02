import { X, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

interface Alert {
  id: number;
  vehicle: string;
  type: 'geofence' | 'speed' | 'maintenance';
  message: string;
  location: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

const alerts: Alert[] = [
  {
    id: 1,
    vehicle: '1955 Mercedes 300SL',
    type: 'geofence',
    message: 'Vehicle has left the designated safe zone',
    location: 'Pune (125km from Mumbai)',
    time: '5 mins ago',
    severity: 'high'
  },
  {
    id: 2,
    vehicle: '1961 Jaguar E-Type',
    type: 'speed',
    message: 'Speed exceeded 100 km/h on highway',
    location: 'NH-8, approaching Delhi',
    time: '15 mins ago',
    severity: 'medium'
  },
  {
    id: 3,
    vehicle: '1964 Aston Martin DB5',
    type: 'maintenance',
    message: 'Service due in 500km',
    location: 'Service Center, Bangalore',
    time: '1 hour ago',
    severity: 'low'
  }
];

interface AlertPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AlertPanel({ open, onClose }: AlertPanelProps) {
  const severityConfig = {
    high: 'bg-[#EF4444]',
    medium: 'bg-[#D97706]',
    low: 'bg-[#3B82F6]'
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <AlertTriangle className="text-[#D97706]" size={24} />
            Active Alerts
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="mb-1">{alert.vehicle}</h4>
                  <Badge className={`${severityConfig[alert.severity]} text-white`}>
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X size={18} />
                </Button>
              </div>

              <p className="text-gray-700 mb-3">{alert.message}</p>

              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{alert.time}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                  View Location
                </Button>
                <Button variant="outline" className="flex-1">
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
