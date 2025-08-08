import React from 'react';
import NotificationCenter from '@/components/NotificationCenter';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotificationCenter />
      </div>
    </div>
  );
};

export default Notifications;
