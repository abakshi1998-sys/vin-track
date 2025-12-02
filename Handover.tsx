import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const vehicles = [
  {
    id: 1,
    name: '1967 Porsche 911',
    image: 'https://images.unsplash.com/photo-1656360389435-338934433d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JzY2hlJTIwOTExJTIwY2xhc3NpY3xlbnwxfHx8fDE3NjIxNzI1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: '1961 Jaguar E-Type',
    image: 'https://images.unsplash.com/photo-1641035854263-797cec88bb8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjBlLXR5cGV8ZW58MXx8fHwxNzYyMTcyNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: '1955 Mercedes 300SL',
    image: 'https://images.unsplash.com/photo-1651853063084-d806fb6796af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGNsYXNzaWMlMjBjYXJ8ZW58MXx8fHwxNzYyMTcyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const recipients = [
  { id: 1, name: 'Sarah Williams', role: 'Family Member' },
  { id: 2, name: 'Michael Chen', role: 'Driver' },
  { id: 3, name: 'Robert Kumar', role: 'Maintenance' },
];

const templates = [
  {
    id: 1,
    name: 'Family Outing',
    description: 'Weekend trip with family members',
    color: 'border-[#10B981]'
  },
  {
    id: 2,
    name: 'Long Distance',
    description: 'Interstate travel with detailed checks',
    color: 'border-[#3B82F6]'
  },
  {
    id: 3,
    name: 'Service Drop-off',
    description: 'Maintenance and service handover',
    color: 'border-[#D97706]'
  },
  {
    id: 4,
    name: 'Event Display',
    description: 'Car show or exhibition setup',
    color: 'border-[#1E40AF]'
  },
];

export function Handover() {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const steps = [
    'Select Vehicle',
    'Choose Recipient',
    'Trip Details',
    'SOP Template',
    'Preview & Sign'
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>SOP Generator</h1>
        <p className="text-gray-600">Create handover documentation for vehicle transfers</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isCompleted = stepNumber < step;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-[#10B981] text-white'
                      : isActive
                      ? 'bg-[#1E40AF] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : stepNumber}
                </div>
                <div className={`mt-2 ${isActive ? '' : 'text-gray-500'}`}>
                  {label}
                </div>
              </div>
              {stepNumber < steps.length && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    stepNumber < step ? 'bg-[#10B981]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="max-w-5xl mx-auto">
        {step === 1 && (
          <div>
            <h2 className="mb-6">Select Vehicle</h2>
            <div className="grid grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`cursor-pointer transition-all overflow-hidden ${
                    selectedVehicle === vehicle.id
                      ? 'ring-4 ring-[#1E40AF]'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <ImageWithFallback
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3>{vehicle.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-6">Choose Recipient</h2>
            <div className="space-y-3 max-w-2xl">
              {recipients.map((recipient) => (
                <Card
                  key={recipient.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedRecipient === recipient.id
                      ? 'ring-4 ring-[#1E40AF] bg-blue-50'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedRecipient(recipient.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3>{recipient.name}</h3>
                      <p className="text-gray-600">{recipient.role}</p>
                    </div>
                    {selectedRecipient === recipient.id && (
                      <Check className="text-[#1E40AF]" size={24} />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-6">Trip Details</h2>
            <div className="max-w-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <Label>Trip Purpose</Label>
                <Input placeholder="e.g., Family vacation, Car show" />
              </div>

              <div>
                <Label>Destination</Label>
                <Input placeholder="Enter destination address" />
              </div>

              <div>
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any special instructions or requirements..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-6">Select SOP Template</h2>
            <div className="grid grid-cols-2 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    selectedTemplate === template.id
                      ? `ring-4 ring-[#1E40AF] ${template.color}`
                      : `${template.color} hover:shadow-lg`
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h3 className="mb-2">{template.name}</h3>
                  <p className="text-gray-600">{template.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-6">Document Preview & Signature</h2>
            <div className="max-w-3xl">
              <Card className="p-6 mb-6">
                <h3 className="mb-4">Handover Document</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Vehicle:</strong> {vehicles.find(v => v.id === selectedVehicle)?.name}</p>
                  <p><strong>Recipient:</strong> {recipients.find(r => r.id === selectedRecipient)?.name}</p>
                  <p><strong>Template:</strong> {templates.find(t => t.id === selectedTemplate)?.name}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </Card>

              <div>
                <Label>Signature</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
                  <canvas
                    className="w-full h-40 border border-gray-200 rounded cursor-crosshair"
                    onMouseDown={(e) => {
                      const canvas = e.currentTarget;
                      const ctx = canvas.getContext('2d');
                      if (!ctx) return;
                      
                      ctx.strokeStyle = '#1E40AF';
                      ctx.lineWidth = 2;
                      ctx.lineCap = 'round';
                      
                      let drawing = false;
                      
                      const draw = (e: MouseEvent) => {
                        if (!drawing) return;
                        const rect = canvas.getBoundingClientRect();
                        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                        ctx.stroke();
                      };
                      
                      canvas.addEventListener('mousemove', draw);
                      canvas.addEventListener('mouseup', () => {
                        drawing = false;
                        canvas.removeEventListener('mousemove', draw);
                      });
                      
                      drawing = true;
                      ctx.beginPath();
                      const rect = canvas.getBoundingClientRect();
                      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                    }}
                  />
                  <p className="text-center text-gray-500 mt-2">Sign above</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>

          <Button
            className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
            onClick={() => {
              if (step < 5) {
                setStep(step + 1);
              } else {
                alert('SOP Document Generated!');
              }
            }}
          >
            {step === 5 ? 'Generate SOP' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
