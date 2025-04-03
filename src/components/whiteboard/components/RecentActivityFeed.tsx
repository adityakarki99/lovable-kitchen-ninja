
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { recentActivityData } from '../data/WhiteboardTemplates';

const RecentActivityFeed: React.FC = () => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
      <Card>
        <CardContent className="p-4">
          {recentActivityData.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="flex items-center py-3">
                <div className="h-8 w-8 rounded-full bg-kitchen-muted flex items-center justify-center text-kitchen-foreground mr-3">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium">{activity.board}</span>
                  </p>
                  <p className="text-xs text-kitchen-muted-foreground">{activity.time}</p>
                </div>
              </div>
              {index < recentActivityData.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivityFeed;
