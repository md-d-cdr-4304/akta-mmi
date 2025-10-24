import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Store, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function KioskLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message || 'Invalid credentials');
      } else {
        toast.success('Welcome back!');
        navigate('/kiosk');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #047857 0%, #10b981 100%)' }}>
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-success flex items-center justify-center mb-4">
            <Store className="w-8 h-8 text-success-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Kiosk Portal</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to manage your kiosk inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="kiosk001@akta.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-success hover:bg-success/90" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Admin user?{' '}
            <a href="/admin-login" className="text-success hover:underline font-medium">
              Sign in here
            </a>
          </p>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground font-medium mb-1">Demo Credentials:</p>
          <p className="text-xs text-muted-foreground">Email: kiosk001@akta.com</p>
          <p className="text-xs text-muted-foreground">Password: kiosk123</p>
          <p className="text-xs text-muted-foreground mt-2">Other kiosks: kiosk002@akta.com, kiosk003@akta.com</p>
        </div>
      </div>
    </div>
  );
}
