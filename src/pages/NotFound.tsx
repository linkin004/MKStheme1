import { useSeoMeta } from "@unhead/react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useSeoMeta({
    title: "404 - Access Denied | CypherNet",
    description: "The requested resource could not be found in the network. Return to the secure zone.",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-4 glow-red" />
            <h1 className="text-6xl font-mono font-bold mb-4 text-red-500 glow-red glitch">
              404
            </h1>
            <h2 className="text-2xl font-mono font-bold mb-4 text-green-500">
              ACCESS DENIED
            </h2>
            <p className="text-lg text-green-400/70 font-mono mb-2">
              The requested resource does not exist
            </p>
            <p className="text-sm text-green-400/50 font-mono mb-8">
              Path: <code className="bg-black/50 px-2 py-1 rounded">{location.pathname}</code>
            </p>
          </div>

          <div className="space-y-4">
            <Button
              asChild
              className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold w-full"
            >
              <Link to="/" className="flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Return to Base</span>
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:border-green-500/60 font-mono"
              >
                <Link to="/articles">Articles</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:border-green-500/60 font-mono"
              >
                <Link to="/marketplace">Market</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-xs text-green-500/50 font-mono">
            ERROR_CODE: RESOURCE_NOT_FOUND<br />
            TIMESTAMP: {new Date().toISOString()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
