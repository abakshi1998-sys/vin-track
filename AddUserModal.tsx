import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const vehicles = [
  '1967 Porsche 911',
  '1961 Jaguar E-Type',
  '1955 Mercedes 300SL',
  '1963 Ferrari 250 GTO',
  '1964 Aston Martin DB5',
  '1970 Chevrolet Chevelle'
];

export function AddUserModal({ open, onClose }: AddUserModalProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('driver');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    setStep(1);
    setSelectedRole('driver');
    setSelectedVehicles([]);
    onClose();
  };

  const toggleVehicle = (vehicle: string) => {
    setSelectedVehicles(prev => 
      prev.includes(vehicle) 
        ? prev.filter(v => v !== vehicle)
        : [...prev, vehicle]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s <= step ? 'bg-[#1E40AF] text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-[#1E40AF]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3>Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input placeholder="Enter phone number" />
              </div>
            </div>

            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="Enter email address" />
            </div>

            <div>
              <Label>Profile Photo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-gray-400">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <h3>Select Role</h3>
            
            <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="owner" id="owner" />
                  <div className="flex-1">
                    <Label htmlFor="owner" className="cursor-pointer">
                      <div>Owner</div>
                      <div className="text-gray-500">Full access to all vehicles and settings</div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="family" id="family" />
                  <div className="flex-1">
                    <Label htmlFor="family" className="cursor-pointer">
                      <div>Family Member</div>
                      <div className="text-gray-500">View and drive designated vehicles</div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="driver" id="driver" />
                  <div className="flex-1">
                    <Label htmlFor="driver" className="cursor-pointer">
                      <div>Driver</div>
                      <div className="text-gray-500">Drive only, limited access to settings</div>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <div className="flex-1">
                    <Label htmlFor="maintenance" className="cursor-pointer">
                      <div>Maintenance</div>
                      <div className="text-gray-500">Access to service records only</div>
                    </Label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Permissions */}
        {step === 3 && (
          <div className="space-y-4">
            <h3>Set Permissions</h3>
            
            <div>
              <h4 className="mb-3">Vehicle Access</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle} className="flex items-center space-x-2">
                    <Checkbox 
                      id={vehicle}
                      checked={selectedVehicles.includes(vehicle)}
                      onCheckedChange={() => toggleVehicle(vehicle)}
                    />
                    <Label htmlFor={vehicle} className="cursor-pointer">
                      {vehicle}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border rounded-lg p-4">
              <h4>Additional Permissions</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <div>View Live Location</div>
                  <div className="text-gray-500">Allow user to track vehicles in real-time</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div>Receive Alerts</div>
                  <div className="text-gray-500">Send notifications for vehicle alerts</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div>Manage Service Records</div>
                  <div className="text-gray-500">Add and edit maintenance history</div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div>Generate Reports</div>
                  <div className="text-gray-500">Create usage and maintenance reports</div>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={step === 1 ? onClose : handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button 
            className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
            onClick={step === 3 ? handleComplete : handleNext}
          >
            {step === 3 ? 'Add User' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
