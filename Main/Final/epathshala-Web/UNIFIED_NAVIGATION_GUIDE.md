# Unified Navigation System Guide

## Overview

The `UnifiedNavigation` component is a comprehensive solution that combines the sidebar and navbar into a single, role-based navigation system. This eliminates the need for separate components and ensures consistency across all user roles.

## Key Features

### 🎯 **Role-Based Navigation**
- **ADMIN**: Complete admin panel with user management, academic calendar, and system settings
- **STUDENT**: Academic tools, assignments, exams, grades, and resources
- **TEACHER**: Teaching tools, class management, and student oversight
- **PARENT**: Child progress tracking and leave approval management

### 🎨 **Visual Design**
- **Role-Specific Colors**: Each role has its own color theme
  - Admin: Red (`#d32f2f`)
  - Student: Blue (`#1976d2`)
  - Teacher: Green (`#388e3c`)
  - Parent: Orange (`#f57c00`)
- **Responsive Design**: Adapts seamlessly from mobile to desktop
- **Collapsible Sidebar**: Save space with collapsible navigation
- **Active State Indicators**: Clear visual feedback for current page

### 📱 **Mobile Optimization**
- **Hamburger Menu**: Mobile-friendly navigation drawer
- **Touch-Friendly**: Optimized for touch interactions
- **Backdrop Overlay**: Prevents accidental navigation

### 🔧 **Technical Features**
- **State Persistence**: Remembers sidebar collapse state
- **Notifications**: Real-time notification badges
- **User Menu**: Profile, settings, and logout options
- **Smooth Transitions**: Animated state changes

## Components

### 1. UnifiedNavigation
The main component that provides the complete navigation experience.

```jsx
import { UnifiedNavigation } from '../components/layout';

<UnifiedNavigation>
  {/* Your page content */}
</UnifiedNavigation>
```

### 2. UnifiedDashboardLayout
A wrapper component that includes authentication and role-based access control.

```jsx
import { UnifiedDashboardLayout } from '../components/layout';

// For role-specific pages
<UnifiedDashboardLayout requiredRole="ADMIN">
  <AdminDashboard />
</UnifiedDashboardLayout>

// For general authenticated pages
<UnifiedDashboardLayout>
  <SomePage />
</UnifiedDashboardLayout>
```

## Usage Examples

### Basic Usage
```jsx
import React from 'react';
import { UnifiedNavigation } from '../components/layout';

const MyPage = () => {
  return (
    <UnifiedNavigation>
      <div>Your page content here</div>
    </UnifiedNavigation>
  );
};
```

### Role-Specific Layout
```jsx
import React from 'react';
import { UnifiedDashboardLayout } from '../components/layout';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  return (
    <UnifiedDashboardLayout requiredRole="ADMIN">
      <AdminDashboard />
    </UnifiedDashboardLayout>
  );
};
```

### Route Integration
```jsx
// In your AppRoutes.jsx
<Route 
  path="/admin/dashboard" 
  element={
    <UnifiedDashboardLayout requiredRole="ADMIN">
      <AdminDashboard />
    </UnifiedDashboardLayout>
  } 
/>
```

## Menu Structure

### Admin Menu
```
📊 Dashboard
  ├── Overview
  └── Summary

👥 User Management
  ├── Add Student
  ├── Add Teacher
  ├── Add Parent
  └── Assign Teacher

📚 Academic
  ├── Academic Calendar
  ├── Online Classes
  └── Session Management

⚙️ System
  └── Reset Password
```

### Student Menu
```
📊 Dashboard
  └── Overview

📚 Academic
  ├── Assignments
  ├── Exams
  ├── Grades
  └── Attendance

🔧 Resources
  ├── Online Classes
  ├── Calendar
  └── Forum

📝 Requests
  └── Leave Requests
```

### Teacher Menu
```
📊 Dashboard
  └── Overview

👨‍🏫 Teaching
  ├── Assignments
  ├── Exams
  ├── Grades
  └── Attendance

🔧 Resources
  ├── Online Classes
  └── Calendar

📋 Management
  └── Leave Requests
```

### Parent Menu
```
📊 Dashboard
  └── Overview

👨‍👩‍👧‍👦 Child Progress
  ├── Progress Tracking
  └── Calendar

📋 Management
  └── Leave Approvals
```

## Props and Configuration

### UnifiedNavigation Props
```jsx
<UnifiedNavigation>
  {children} // React nodes to render in the main content area
</UnifiedNavigation>
```

### UnifiedDashboardLayout Props
```jsx
<UnifiedDashboardLayout requiredRole="ADMIN">
  {children} // React nodes to render in the main content area
</UnifiedDashboardLayout>
```

- `requiredRole` (optional): Restricts access to specific user roles
  - `"ADMIN"` - Admin only
  - `"STUDENT"` - Student only
  - `"TEACHER"` - Teacher only
  - `"PARENT"` - Parent only
  - `null` - Any authenticated user

## State Management

### Local Storage
- `unifiedNavCollapsed`: Stores sidebar collapse state
- `user`: Stores user authentication data
- `notifications`: Stores user notifications

### State Variables
- `mobileOpen`: Controls mobile drawer visibility
- `collapsed`: Controls sidebar collapse state
- `expandedSections`: Controls section expansion in sidebar
- `anchorEl`: Controls user menu visibility
- `notifications`: Stores notification data

## Responsive Behavior

### Desktop (md and up)
- **Sidebar**: Permanent drawer with collapse/expand functionality
- **Navbar**: Fixed top bar with logo, notifications, and user menu
- **Content**: Adjusts width based on sidebar state

### Mobile (xs to sm)
- **Sidebar**: Temporary drawer with hamburger menu trigger
- **Navbar**: Fixed top bar with hamburger menu and essential elements
- **Content**: Full width with proper spacing

## Customization

### Adding New Menu Items
To add new menu items, modify the `roleMenus` object in `UnifiedNavigation.jsx`:

```jsx
const roleMenus = {
  ADMIN: {
    // ... existing config
    sections: [
      // ... existing sections
      {
        title: 'New Section',
        items: [
          { text: 'New Item', icon: NewIcon, path: '/admin/new-path' },
        ]
      }
    ]
  }
};
```

### Changing Role Colors
Modify the `color` property in the role configuration:

```jsx
ADMIN: {
  title: 'Admin Panel',
  icon: AdminIcon,
  color: '#your-custom-color', // Change this
  // ...
}
```

### Custom Icons
Import and use any Material-UI icon:

```jsx
import { CustomIcon } from '@mui/icons-material';

// Then use in menu items
{ text: 'Custom Item', icon: CustomIcon, path: '/custom-path' }
```

## Migration Guide

### From Separate Components
If you're migrating from separate `Navbar` and `Sidebar` components:

1. **Replace Layout Components**:
   ```jsx
   // Old
   <AdminDashboardLayout>
     <Navbar />
     <Sidebar />
     <Content />
   </AdminDashboardLayout>

   // New
   <UnifiedDashboardLayout requiredRole="ADMIN">
     <Content />
   </UnifiedDashboardLayout>
   ```

2. **Update Routes**:
   ```jsx
   // Old
   <Route path="/admin" element={<AdminDashboardLayout><AdminDashboard /></AdminDashboardLayout>} />

   // New
   <Route path="/admin" element={<UnifiedDashboardLayout requiredRole="ADMIN"><AdminDashboard /></UnifiedDashboardLayout>} />
   ```

3. **Remove Old Imports**:
   ```jsx
   // Remove these imports
   import Navbar from './Navbar';
   import Sidebar from './Sidebar';
   import AdminDashboardLayout from './AdminDashboardLayout';
   ```

## Benefits

### 🚀 **Performance**
- Single component reduces bundle size
- Optimized re-renders
- Efficient state management

### 🛠️ **Maintenance**
- Centralized navigation logic
- Consistent behavior across roles
- Easy to update and extend

### 🎨 **User Experience**
- Consistent visual design
- Smooth transitions
- Intuitive navigation

### 📱 **Responsive**
- Mobile-first design
- Touch-friendly interactions
- Adaptive layouts

## Troubleshooting

### Common Issues

1. **Sidebar Not Collapsing**
   - Check localStorage for `unifiedNavCollapsed`
   - Verify click handler is working

2. **Role-Based Access Not Working**
   - Ensure `requiredRole` prop is set correctly
   - Check user authentication state

3. **Mobile Menu Not Opening**
   - Verify `isMobile` responsive hook
   - Check drawer variant is set to "temporary"

4. **Notifications Not Showing**
   - Check API endpoint `/api/notifications/user`
   - Verify user authentication

### Debug Tips
- Use browser dev tools to inspect component state
- Check console for error messages
- Verify localStorage values
- Test responsive behavior with browser dev tools

## Future Enhancements

### Planned Features
- [ ] Breadcrumb navigation
- [ ] Search functionality
- [ ] Keyboard shortcuts
- [ ] Dark mode support
- [ ] Custom themes per user
- [ ] Advanced notification system
- [ ] Quick actions menu
- [ ] Recent pages history

### Extension Points
- Custom menu item renderers
- Role-based feature flags
- Dynamic menu loading
- Custom navigation patterns
