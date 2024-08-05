import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppleIcon, ChromeIcon, GithubIcon } from "lucide-react";
import { useAuthCard } from "../hooks/useAuthCard";
import { Link } from "react-router-dom";
import Grid from "@/components/class/grid";

export default function AuthCard() {
  const { formData, error, setActiveTab, handleInputChange, handleSubmit } =
    useAuthCard();

  return (
    <Card className="w-full max-w-md rounded-none">
      <Tabs
        defaultValue="register"
        className="border-b"
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full bg-primary text-secondary h-14 justify-between rounded-none">
          <TabsTrigger value="register" className="w-1/2  h-full rounded-none">
            Register
          </TabsTrigger>
          <TabsTrigger value="login" className="w-1/2  h-full rounded-none">
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <GithubIcon className="mr-2 h-4 w-4" />
                Register with Github
              </Button>
              <Button variant="outline">
                <AppleIcon className="mr-2 h-4 w-4" />
                Register with Apple
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Register
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </CardFooter>
        </TabsContent>
        <TabsContent value="login">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Grid gap={4}>
              <Grid gap={2}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid gap={2}>
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid gap={4} mdcols={2}>
                <Button variant="outline">
                  <ChromeIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
                <Button variant="outline">
                  <AppleIcon className="mr-2 h-4 w-4" />
                  Sign in with Apple
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Sign in
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
