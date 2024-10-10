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
import { AppleIcon, GithubIcon } from "lucide-react";
import { useAuthCard } from "../hooks/useAuthCard";
import { Link } from "react-router-dom";
import Grid from "@/components/class/grid";
import { ShowErrors } from "./showErrors";
import { Separator } from "@/components/ui/separator";
import GoogleAuthButton from "./googleAuthButton";

export default function AuthCard() {
  const { formData, errors, setActiveTab, handleInputChange, handleSubmit } =
    useAuthCard();

  return (
    <div className="flex flex-col gap-4">
      <ShowErrors errors={errors} />

      <Tabs
        defaultValue="login"
        className="border-b"
        onValueChange={setActiveTab}
      >
        <Card className="w-full max-w-md rounded-md shadow-sm shadow-gray-700">
          <TabsContent value="register">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details below to get started.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="username"
                  className={` ${errors.username ? "text-red-500" : ""}`}
                >
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className={` ${errors.email ? "text-red-500" : ""}`}
                >
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className={` ${errors.password ? "text-red-500" : ""}`}
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full ${
                    errors.password ? "border-red-500" : ""
                  }`}
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
              <Grid gap={4} mdcols={1} className="w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Register
                </Button>
                <Separator className="" />
                <div className="flex justify-center ">
                  <a className=" h-5 text-center text-sm">
                    Already Registered?
                  </a>
                  <TabsList className=" h-5 bg-transparent text-blue-500 hover:underline ">
                    <TabsTrigger value="login">Log in</TabsTrigger>
                  </TabsList>
                </div>
              </Grid>
            </CardFooter>
          </TabsContent>

          <TabsContent value="login">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid gap={4}>
                <Grid gap={2}>
                  <Label
                    htmlFor="email"
                    className={` ${errors.email ? "text-red-500" : ""}`}
                  >
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </Grid>

                <Grid gap={2}>
                  <div className="flex items-center">
                    <Label
                      htmlFor="password"
                      className={` ${errors.password ? "text-red-500" : ""}`}
                    >
                      Password
                    </Label>

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
                    className={`mt-1 block w-full ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                </Grid>
                <Grid gap={4} mdcols={2}>
                  <GoogleAuthButton />
                  <Button variant="outline">
                    <AppleIcon className="mr-2 h-4 w-4" />
                    Sign in with Apple
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <CardFooter>
              <Grid gap={4} mdcols={1} className="w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Sign in
                </Button>
                <Separator className="" />
                <div className="flex justify-center ">
                  <a className=" h-5 text-center text-sm">
                    Don't have an account?
                  </a>
                  <TabsList className=" h-5 bg-transparent text-blue-500 hover:underline">
                    <TabsTrigger value="register">Register now</TabsTrigger>
                  </TabsList>
                </div>
              </Grid>
            </CardFooter>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
