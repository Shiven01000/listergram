import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GraduationCap } from "lucide-react";

const towers = ['Henday', 'Mackenzie', 'Schaffer', 'Kelsey', 'Assiniboia'];
const programs = [
  'Engineering', 'Business', 'Science', 'Arts', 'Medicine', 'Nursing', 
  'Education', 'Computing Science', 'Psychology', 'Political Science', 'Other'
];
const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year', 'Graduate Student', 'PhD Student'];

export const AuthScreen = () => {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    tower: '',
    floor: 1,
    program: '',
    yearOfStudy: ''
  });

  const validateUofAEmail = (email: string) => {
    return email.endsWith('@ualberta.ca');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateUofAEmail(signInData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please use your @ualberta.ca email address.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome Back!",
        description: "You've successfully signed in to Listergram."
      });
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!validateUofAEmail(signUpData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please use your @ualberta.ca email address.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (signUpData.floor < 1 || signUpData.floor > 20) {
      toast({
        title: "Invalid Floor",
        description: "Floor must be between 1 and 20.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    const metadata = {
      full_name: signUpData.fullName,
      username: signUpData.username,
      tower: signUpData.tower,
      floor: signUpData.floor,
      program: signUpData.program,
      year_of_study: signUpData.yearOfStudy
    };

    const { error } = await signUp(signUpData.email, signUpData.password, metadata);

    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome to Listergram!",
        description: "Please check your email to verify your account."
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Listergram</h1>
          </div>
          <CardTitle className="text-xl">Lister Hall Community</CardTitle>
          <CardDescription>Connect with fellow UofA students</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">University Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your.name@ualberta.ca"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Doe"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      placeholder="john_doe123"
                      value={signUpData.username}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">University Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.name@ualberta.ca"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-tower">Tower</Label>
                    <Select onValueChange={(value) => setSignUpData(prev => ({ ...prev, tower: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tower" />
                      </SelectTrigger>
                      <SelectContent>
                        {towers.map(tower => (
                          <SelectItem key={tower} value={tower}>{tower}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-floor">Floor</Label>
                    <Input
                      id="signup-floor"
                      type="number"
                      min="1"
                      max="20"
                      value={signUpData.floor}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, floor: parseInt(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-program">Program</Label>
                  <Select onValueChange={(value) => setSignUpData(prev => ({ ...prev, program: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map(program => (
                        <SelectItem key={program} value={program}>{program}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-year">Year of Study</Label>
                  <Select onValueChange={(value) => setSignUpData(prev => ({ ...prev, yearOfStudy: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};