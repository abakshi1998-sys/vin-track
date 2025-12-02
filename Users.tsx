import { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { AddUserModal } from '../users/AddUserModal';

const users = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '',
    initials: 'JD',
    role: 'Owner',
    accessLevel: 'Full Access',
    lastActive: '2 mins ago',
    email: 'john@vintrack.com'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: '',
    initials: 'SW',
    role: 'Family',
    accessLevel: 'View & Drive',
    lastActive: '1 hour ago',
    email: 'sarah@email.com'
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: '',
    initials: 'MC',
    role: 'Driver',
    accessLevel: 'Drive Only',
    lastActive: '3 hours ago',
    email: 'michael@email.com'
  },
  {
    id: 4,
    name: 'Robert Kumar',
    avatar: '',
    initials: 'RK',
    role: 'Maintenance',
    accessLevel: 'Service Records',
    lastActive: '1 day ago',
    email: 'robert@email.com'
  }
];

const roleConfig = {
  Owner: 'bg-[#D97706] text-white',
  Family: 'bg-[#10B981] text-white',
  Driver: 'bg-[#3B82F6] text-white',
  Maintenance: 'bg-[#1E40AF] text-white'
};

export function Users() {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>User Management</h1>
          <p className="text-gray-600">Manage access and permissions for your team</p>
        </div>
        <Button 
          className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
          onClick={() => setShowAddUser(true)}
        >
          <Plus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-[#1E40AF] text-white">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleConfig[user.role as keyof typeof roleConfig]}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.accessLevel}</TableCell>
                <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>View Activity</DropdownMenuItem>
                      <DropdownMenuItem>Change Permissions</DropdownMenuItem>
                      <DropdownMenuItem className="text-[#EF4444]">Remove User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddUserModal open={showAddUser} onClose={() => setShowAddUser(false)} />
    </div>
  );
}
