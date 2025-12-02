import { useState } from 'react';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const auctions = [
  {
    id: 1,
    name: '1961 Jaguar E-Type',
    image: 'https://images.unsplash.com/photo-1641035854263-797cec88bb8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjBlLXR5cGV8ZW58MXx8fHwxNzYyMTcyNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'LIVE',
    currentBid: '₹65,00,000',
    location: 'Mumbai, Maharashtra',
    distance: '5 km',
    auctionHouse: "Sotheby's",
    endDate: '2 hours left'
  },
  {
    id: 2,
    name: '1955 Mercedes 300SL',
    image: 'https://images.unsplash.com/photo-1651853063084-d806fb6796af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGNsYXNzaWMlMjBjYXJ8ZW58MXx8fHwxNzYyMTcyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'UPCOMING',
    currentBid: '₹1,25,00,000',
    location: 'Bangalore, Karnataka',
    distance: '980 km',
    auctionHouse: "Christie's",
    endDate: 'Nov 10, 2025'
  },
  {
    id: 3,
    name: '1967 Porsche 911',
    image: 'https://images.unsplash.com/photo-1656360389435-338934433d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JzY2hlJTIwOTExJTIwY2xhc3NpY3xlbnwxfHx8fDE3NjIxNzI1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'LIVE',
    currentBid: '₹42,00,000',
    location: 'Delhi, NCR',
    distance: '1,420 km',
    auctionHouse: 'RM Auctions',
    endDate: '5 hours left'
  },
  {
    id: 4,
    name: '1963 Ferrari 250 GTO',
    image: 'https://images.unsplash.com/photo-1747586047806-3591a5f12695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyYXJpJTIwdmludGFnZSUyMHJlZHxlbnwxfHx8fDE3NjIxNzI1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'UPCOMING',
    currentBid: '₹3,50,00,000',
    location: 'Pune, Maharashtra',
    distance: '150 km',
    auctionHouse: 'Bonhams',
    endDate: 'Nov 15, 2025'
  },
  {
    id: 5,
    name: '1964 Aston Martin DB5',
    image: 'https://images.unsplash.com/photo-1658485959228-f293eb2d4a0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3RvbiUyMG1hcnRpbiUyMGNsYXNzaWN8ZW58MXx8fHwxNzYyMTcyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'LIVE',
    currentBid: '₹85,00,000',
    location: 'Chennai, Tamil Nadu',
    distance: '1,340 km',
    auctionHouse: "Sotheby's",
    endDate: '1 hour left'
  },
  {
    id: 6,
    name: '1970 Chevrolet Chevelle',
    image: 'https://images.unsplash.com/photo-1652727743972-5fd1483a23ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnxlbnwxfHx8fDE3NjIxMzU1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'UPCOMING',
    currentBid: '₹28,00,000',
    location: 'Hyderabad, Telangana',
    distance: '720 km',
    auctionHouse: 'Barrett-Jackson',
    endDate: 'Nov 20, 2025'
  },
];

const auctionHouses = [
  "Sotheby's",
  "Christie's",
  'RM Auctions',
  'Bonhams',
  'Barrett-Jackson'
];

export function Auctions() {
  const [radius, setRadius] = useState([500]);
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);

  const toggleAuctionHouse = (house: string) => {
    setSelectedHouses(prev =>
      prev.includes(house)
        ? prev.filter(h => h !== house)
        : [...prev, house]
    );
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar Filters */}
      <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <h2 className="mb-6">Search Filters</h2>

        <div className="space-y-6">
          {/* Location Radius */}
          <div>
            <Label>Location Radius</Label>
            <div className="mt-2">
              <Slider
                value={radius}
                onValueChange={setRadius}
                max={2000}
                step={50}
                className="mb-2"
              />
              <div className="flex justify-between text-gray-600">
                <span>0 km</span>
                <span>{radius[0]} km</span>
                <span>2000 km</span>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Label>Auction Date</Label>
            <div className="space-y-2 mt-2">
              <Input type="date" />
              <Input type="date" />
            </div>
          </div>

          {/* Make/Model */}
          <div>
            <Label>Make/Model</Label>
            <Input placeholder="Search by make or model" className="mt-2" />
          </div>

          {/* Price Range */}
          <div>
            <Label>Price Range (₹)</Label>
            <div className="space-y-2 mt-2">
              <Input placeholder="Min price" />
              <Input placeholder="Max price" />
            </div>
          </div>

          {/* Auction Houses */}
          <div>
            <Label>Auction Houses</Label>
            <div className="space-y-2 mt-2">
              {auctionHouses.map((house) => (
                <div key={house} className="flex items-center space-x-2">
                  <Checkbox
                    id={house}
                    checked={selectedHouses.includes(house)}
                    onCheckedChange={() => toggleAuctionHouse(house)}
                  />
                  <Label htmlFor={house} className="cursor-pointer">
                    {house}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90">
            Apply Filters
          </Button>
        </div>
      </aside>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6">
            <h1>Auction Search</h1>
            <p className="text-gray-600">Discover vintage cars at auctions near you</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {auctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={auction.image}
                    alt={auction.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      auction.status === 'LIVE'
                        ? 'bg-[#EF4444] text-white'
                        : 'bg-[#D97706] text-white'
                    }`}
                  >
                    {auction.status === 'LIVE' && (
                      <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                    )}
                    {auction.status}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="mb-3">{auction.name}</h3>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-gray-600">Current Bid</div>
                      <div className="text-[#10B981] flex items-center gap-1">
                        <TrendingUp size={18} />
                        {auction.currentBid}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600">
                        {auction.status === 'LIVE' ? 'Ends' : 'Starts'}
                      </div>
                      <div>{auction.endDate}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{auction.location}</span>
                      <span className="text-gray-400">• {auction.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{auction.auctionHouse}</span>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${
                      auction.status === 'LIVE'
                        ? 'bg-[#EF4444] hover:bg-[#EF4444]/90'
                        : 'bg-[#1E40AF] hover:bg-[#1E40AF]/90'
                    }`}
                  >
                    {auction.status === 'LIVE' ? 'Place Bid Now' : 'Set Alert'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
