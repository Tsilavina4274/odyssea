import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationProps {
  title: string;
  description: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  time?: string;
  action?: {
    label: string;
    href: string;
  };
}

export const Notification = ({ title, description, type = 'info', time, action }: NotificationProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4" />;
      case 'warning':
        return <TrendingUp className="w-4 h-4" />;
      case 'error':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`notification-enter ${getTypeStyles()} hover-lift`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-full">
            {getIcon()}
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs opacity-90">{description}</p>
            {time && <p className="text-xs opacity-70">{time}</p>}
          </div>
          {action && (
            <Link to={action.href}>
              <Button size="sm" variant="ghost" className="h-auto p-1">
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export const StatCard = ({ title, value, change, trend = 'neutral', icon, description }: StatCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="card-elevated hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {change && (
          <p className={`text-xs ${getTrendColor()} flex items-center gap-1 mt-2`}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
  variant?: 'default' | 'featured';
}

export const ActionCard = ({ title, description, action, icon, variant = 'default' }: ActionCardProps) => {
  const cardClass = variant === 'featured' 
    ? 'card-interactive gradient-border odyssea-gradient'
    : 'card-interactive';

  return (
    <Card className={cardClass}>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link to={action.href}>
          <Button 
            className={variant === 'featured' ? 'w-full' : 'w-full'} 
            variant={variant === 'featured' ? 'default' : 'outline'}
          >
            {action.label}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.label} 
          className="bg-card rounded-lg p-4 border animate-fade-in hover-lift"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-sm text-muted-foreground">{stat.label}</div>
          <div className="text-2xl font-bold mt-1">{stat.value}</div>
          {stat.change && (
            <div className={`text-xs mt-1 ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {stat.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default {
  Notification,
  StatCard,
  ActionCard,
  QuickStats
};