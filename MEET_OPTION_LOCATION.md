# 🎥 Meet Option Location Guide

## 📍 **Where to Find the Meet/Online Class Option**

### **For Teachers:**
1. **Login** to the ePathshala system as a teacher
2. **Navigate** to the Teacher Dashboard
3. **Look for** the "Online Classes" tab at the top of the dashboard
4. **Click** on the "Online Classes" tab (with video camera icon)
5. **Access** the OnlineClassManager component with full functionality:
   - Create new online classes
   - Start/stop video sessions
   - Manage participant lists
   - Copy invite links
   - View class status

### **For Students:**
1. **Login** to the ePathshala system as a student
2. **Navigate** to the Student Dashboard
3. **Look for** the "Join Online Classes" tab at the top of the dashboard
4. **Click** on the "Join Online Classes" tab (with video camera icon)
5. **Access** the OnlineClassJoiner component to:
   - Browse available online classes
   - Join classes by room ID
   - View class schedules
   - Copy invite links

## 🔧 **Technical Implementation**

### **Files Modified:**
- `epathshala-Web/src/pages/dashboard/TeacherDashboard.jsx`
  - Added tabs with "Online Classes" option
  - Integrated OnlineClassManager component
  - Added VideoCallIcon for visual indication

- `epathshala-Web/src/pages/dashboard/StudentDashboard.jsx`
  - Added tabs with "Join Online Classes" option
  - Integrated OnlineClassJoiner component
  - Added VideoCallIcon for visual indication

### **Components Used:**
- **OnlineClassManager.jsx** - Teacher interface for managing online classes
- **OnlineClassJoiner.jsx** - Student interface for joining online classes
- **JitsiMeet.jsx** - Core video conferencing component

## 🎯 **Features Available**

### **Teacher Features:**
- ✅ Create new online classes
- ✅ Schedule classes with details
- ✅ Start/stop video sessions
- ✅ Manage participant limits
- ✅ Copy invite links
- ✅ View class status and participants
- ✅ Custom room names

### **Student Features:**
- ✅ Browse available online classes
- ✅ Join classes by room ID
- ✅ View class schedules
- ✅ Copy invite links
- ✅ Real-time participant tracking

### **Video Features:**
- ✅ High-quality video conferencing
- ✅ Audio controls (mute/unmute)
- ✅ Video controls (camera on/off)
- ✅ Screen sharing capability
- ✅ Chat during meetings
- ✅ Participant management
- ✅ Custom UI controls

## 🚀 **How to Use**

### **For Teachers:**
1. Click "Online Classes" tab
2. Click "Create New Class" button
3. Fill in class details (title, subject, description, time)
4. Click "Create" to create the class
5. Click "Start Class" to begin the video session
6. Share the invite link with students

### **For Students:**
1. Click "Join Online Classes" tab
2. Browse available classes or enter a room ID
3. Click "Join Class" to enter the video session
4. Use the video controls to manage audio/video
5. Participate in the online class

## 📱 **Visual Indicators**

- **Video Camera Icon** (🎥) appears next to the "Online Classes" tab
- **Material-UI Tabs** provide clear navigation
- **Responsive design** works on all devices
- **Intuitive interface** with clear buttons and actions

## 🔗 **Integration Points**

- **Jitsi Meet External API** for video conferencing
- **Spring Boot Backend** for class management
- **React Frontend** for user interface
- **Material-UI** for consistent design
- **JWT Authentication** for secure access

---

**Status**: ✅ **FULLY IMPLEMENTED AND READY TO USE**

The meet option is now fully integrated into both Teacher and Student dashboards with complete video conferencing capabilities using Jitsi Meet! 