import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { VehicleCard } from "@/components/VehicleCard";
import { NotificationPanel } from "@/components/NotificationPanel";
import { Button } from "@/components/ui/button";
import jaguarImage from "@/assets/jaguar-e-type.jpg";
import mercedesImage from "@/assets/mercedes-300sl.jpg";
import ferrariImage from "@/assets/ferrari-250gt.jpg";
import porscheImage from "@/assets/porsche-911.jpg";
import mustangImage from "@/assets/ford-mustang.jpg";
import astonImage from "@/assets/aston-martin-db4.jpg";

const vehicles = [
  {
    id: "1",
    name: "1967 Jaguar E-Type",
    image: jaguarImage,
    status: "available" as const,
    location: "Bandra Residence",
    lastSeen: "2 hours ago",
  },
  {
    id: "2",
    name: "1955 Mercedes 300SL",
    image: mercedesImage,
    status: "in-use" as const,
    location: "Worli Sea Link",
    lastSeen: "15 minutes ago",
  },
  {
    id: "3",
    name: "1961 Ferrari 250 GT",
    image: ferrariImage,
    status: "outside-zone" as const,
    location: "Pune Highway",
    lastSeen: "5 minutes ago",
  },
  {
    id: "4",
    name: "1973 Porsche 911",
    image: porscheImage,
    status: "scheduled" as const,
    location: "Juhu Residence",
    lastSeen: "1 hour ago",
  },
  {
    id: "5",
    name: "1969 Ford Mustang",
    image: mustangImage,
    status: "available" as const,
    location: "Worli Residence",
    lastSeen: "3 hours ago",
  },
  {
    id: "6",
    name: "1958 Aston Martin DB4",
    image: astonImage,
    status: "in-use" as const,
    location: "Bandra-Worli Sea Link",
    lastSeen: "30 minutes ago",
  },
];

const filterButtons = [
  { label: "All Vehicles", value: "all" },
  { label: "Available", value: "available" },
  { label: "In Use", value: "in-use" },
  { label: "Alerts Only", value: "outside-zone" },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredVehicles =
    activeFilter === "all"
      ? vehicles
      : vehicles.filter((v) => v.status === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onNotificationClick={() => setIsNotificationOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">
                My Collection
              </h1>

              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2">
                {filterButtons.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={activeFilter === filter.value ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Vehicle grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  name={vehicle.name}
                  image={vehicle.image}
                  status={vehicle.status}
                  location={vehicle.location}
                  lastSeen={vehicle.lastSeen}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default Index;
