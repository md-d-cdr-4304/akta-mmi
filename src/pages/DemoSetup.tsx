import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function DemoSetup() {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const createDemoUsers = async () => {
    setIsCreating(true);
    try {
      // Create admin user
      const { data: adminData, error: adminError } = await supabase.auth.signUp({
        email: 'admin@akta.com',
        password: 'admin123',
        options: {
          data: {
            full_name: 'Admin User'
          }
        }
      });

      if (adminError) throw adminError;

      // Assign admin role
      if (adminData.user) {
        await supabase.from('user_roles').insert({
          user_id: adminData.user.id,
          role: 'admin'
        });
      }

      // Create kiosk users
      const kioskUsers = [
        { email: 'kiosk001@akta.com', name: 'Downtown Fresh Market' },
        { email: 'kiosk002@akta.com', name: 'Mall Central Kiosk' },
        { email: 'kiosk003@akta.com', name: 'Airport Terminal Kiosk' }
      ];

      for (const kiosk of kioskUsers) {
        const { data: kioskData, error: kioskError } = await supabase.auth.signUp({
          email: kiosk.email,
          password: 'kiosk123',
          options: {
            data: {
              full_name: kiosk.name
            }
          }
        });

        if (kioskError) throw kioskError;

        // Assign kiosk role
        if (kioskData.user) {
          await supabase.from('user_roles').insert({
            user_id: kioskData.user.id,
            role: 'kiosk_user'
          });
        }
      }

      toast.success('Demo users created successfully!');
      navigate('/admin-login');
    } catch (error: any) {
      console.error('Error creating demo users:', error);
      toast.error(error.message || 'Failed to create demo users');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-soft">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-xl text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Demo Setup</h1>
        <p className="text-muted-foreground mb-6">
          Create demo users for testing the application
        </p>
        
        <Button 
          onClick={createDemoUsers} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Creating Users...' : 'Create Demo Users'}
        </Button>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl text-left">
          <p className="text-xs text-muted-foreground font-medium mb-2">Demo credentials that will be created:</p>
          <p className="text-xs text-muted-foreground">Admin: admin@akta.com / admin123</p>
          <p className="text-xs text-muted-foreground">Kiosk: kiosk001@akta.com / kiosk123</p>
        </div>
      </div>
    </div>
  );
}
