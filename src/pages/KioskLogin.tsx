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
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full max-w-md p-10 glass-effect rounded-3xl shadow-glow backdrop-blur-xl relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg hover-lift">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Kiosk Portal</h1>
          <p className="text-white/80 text-sm">Sign in to manage your kiosk inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="kiosk001@akta.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
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
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover-lift" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <p className="text-sm text-white/80">
            Admin user?{' '}
            <a href="/admin-login" className="text-white font-semibold hover:underline transition-all">
              Sign in here
            </a>
          </p>
          <p className="text-sm text-white/80">
            Need demo users?{' '}
            <a href="/demo-setup" className="text-white font-semibold hover:underline transition-all">
              Set up demo accounts
            </a>
          </p>
        </div>

        <div className="mt-6 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <p className="text-xs text-white/90 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-white/80">Email: kiosk001@akta.com</p>
          <p className="text-xs text-white/80">Password: kiosk123</p>
          <p className="text-xs text-white/80 mt-2">Other kiosks: kiosk002@akta.com, kiosk003@akta.com</p>
        </div>
      </div>
    </div>
  );
}
