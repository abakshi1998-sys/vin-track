import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { AlertPanel } from '../dashboard/AlertPanel';

const vehicles = [
  {
    id: 1,
    name: '1967 Porsche 911',
    image: 'https://images.unsplash.com/photo-1656360389435-338934433d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JzY2hlJTIwOTExJTIwY2xhc3NpY3xlbnwxfHx8fDE3NjIxNzI1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Garage, Mumbai',
    lastUpdate: '2 mins ago'
  },
  {
    id: 2,
    name: '1961 Jaguar E-Type',
    image: 'https://images.unsplash.com/photo-1641035854263-797cec88bb8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjBlLXR5cGV8ZW58MXx8fHwxNzYyMTcyNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'In Use',
    location: 'En route to Delhi',
    lastUpdate: '15 mins ago'
  },
  {
    id: 3,
    name: '1955 Mercedes 300SL',
    image: 'https://images.unsplash.com/photo-1651853063084-d806fb6796af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGNsYXNzaWMlMjBjYXJ8ZW58MXx8fHwxNzYyMTcyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Outside Zone',
    location: 'Pune (125km away)',
    lastUpdate: '5 mins ago'
  },
  {
    id: 4,
    name: '1963 Ferrari 250 GTO',
    image: 'https://images.unsplash.com/photo-1747586047806-3591a5f12695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyYXJpJTIwdmludGFnZSUyMHJlZHxlbnwxfHx8fDE3NjIxNzI1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Showroom, Mumbai',
    lastUpdate: '1 hour ago'
  },
  {
    id: 5,
    name: '1964 Aston Martin DB5',
    image: 'https://images.unsplash.com/photo-1658485959228-f293eb2d4a0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3RvbiUyMG1hcnRpbiUyMGNsYXNzaWN8ZW58MXx8fHwxNzYyMTcyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'In Use',
    location: 'Service Center, Bangalore',
    lastUpdate: '30 mins ago'
  },
  {
    id: 6,
    name: '1970 Chevrolet Chevelle',
    image: 'https://images.unsplash.com/photo-1652727743972-5fd1483a23ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnxlbnwxfHx8fDE3NjIxMzU1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Available',
    location: 'Garage, Mumbai',
    lastUpdate: '45 mins ago'
  }
];

const statusConfig = {
  'Available': { color: 'bg-[#10B981] text-white', variant: 'default' as const },
  'In Use': { color: 'bg-[#3B82F6] text-white', variant: 'default' as const },
  'Outside Zone': { color: 'bg-[#EF4444] text-white', variant: 'default' as const }
};

export function Dashboard() {
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1>Tracking Dashboard</h1>
        <p className="text-gray-600">Monitor your vintage car collection in real-time</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <ImageWithFallback 
                src={vehicle.image} 
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3>{vehicle.name}</h3>
                <Badge className={statusConfig[vehicle.status as keyof typeof statusConfig].color}>
                  {vehicle.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{vehicle.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{vehicle.lastUpdate}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => vehicle.status === 'Outside Zone' && setShowAlerts(true)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <AlertPanel open={showAlerts} onClose={() => setShowAlerts(false)} />
    </div>
  );
}
