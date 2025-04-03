
import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import WhiteboardHub from '@/components/whiteboard/WhiteboardHub';

const Whiteboard = () => {
  return (
    <DashboardLayout 
      title="Kitchen Whiteboard"
      description="Collaborate and communicate with your team"
    >
      <WhiteboardHub />
    </DashboardLayout>
  );
};

export default Whiteboard;
