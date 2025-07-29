import { useSeoMeta } from '@unhead/react';
import { Shield, Lock, Globe, Zap, ArrowRight, Code, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  useSeoMeta({
    title: 'CypherNet - Decentralized Freedom Network',
    description: 'A cypherpunk platform for true digital freedom. Decentralized articles, secure marketplace, and encrypted communications built on Nostr.',
  });

  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Military-grade encryption protects your communications and transactions from surveillance.',
    },
    {
      icon: Globe,
      title: 'Decentralized Network',
      description: 'No central authority. No single point of failure. True peer-to-peer freedom.',
    },
    {
      icon: Shield,
      title: 'Anonymous by Design',
      description: 'Your privacy is paramount. Operate with complete anonymity and security.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built on Nostr protocol for instant, censorship-resistant communications.',
    },
  ];

  const stats = [
    { label: 'Active Nodes', value: '2,847', icon: Globe },
    { label: 'Encrypted Messages', value: '1.2M+', icon: Lock },
    { label: 'Anonymous Users', value: '15,432', icon: Users },
    { label: 'Uptime', value: '99.97%', icon: Zap },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6">
              <span className="text-green-500 glow-green glitch">CYPHER</span>
              <span className="text-yellow-500 glow-yellow">NET</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-400/80 mb-8 font-mono leading-relaxed">
              The last bastion of digital freedom.<br />
              <span className="text-green-500">Decentralized. Encrypted. Unstoppable.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold neon-border"
              >
                <Link to="/articles" className="flex items-center space-x-2">
                  <span>Enter the Matrix</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-mono font-bold"
              >
                <Link to="/marketplace" className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Secure Trade</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-green-500/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="h-8 w-8 text-green-500 mx-auto mb-3 glow-green" />
                <div className="text-2xl md:text-3xl font-mono font-bold text-green-500 glow-green">
                  {value}
                </div>
                <div className="text-sm text-green-400/70 font-mono mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-green-500 glow-green mb-4">
              FORTRESS FEATURES
            </h2>
            <p className="text-lg text-green-400/70 font-mono max-w-2xl mx-auto">
              Built for those who refuse to compromise on freedom and privacy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="bg-black/50 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:border-glow">
                <CardHeader className="text-center">
                  <Icon className="h-12 w-12 text-green-500 mx-auto mb-4 glow-green" />
                  <CardTitle className="text-green-500 font-mono text-lg">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-400/70 font-mono text-sm leading-relaxed text-center">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-green-500 glow-green mb-6">
              JOIN THE RESISTANCE
            </h2>
            <p className="text-lg text-green-400/80 font-mono mb-8 leading-relaxed">
              Every message encrypted. Every transaction anonymous. Every voice uncensored.<br />
              <span className="text-yellow-500">The future of freedom starts here.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold border-glow"
              >
                <Link to="/articles" className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Read Manifesto</span>
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-green-500 text-green-500 hover:bg-green-500/10 font-mono font-bold"
              >
                <Link to="/gallery" className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>View Gallery</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;