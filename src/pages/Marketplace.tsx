import { useSeoMeta } from '@unhead/react';
import { ShoppingCart, Shield, Search, Plus, Star, Clock, MapPin, Eye, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);
  const { user } = useCurrentUser();

  useSeoMeta({
    title: 'Marketplace - CypherNet Secure Trading',
    description: 'Anonymous, decentralized marketplace for secure trading. Privacy tools, hardware, and digital services.',
  });

  const categories = [
    { id: 'all', label: 'All Items', count: 156 },
    { id: 'hardware', label: 'Hardware', count: 42 },
    { id: 'software', label: 'Software', count: 38 },
    { id: 'services', label: 'Services', count: 29 },
    { id: 'books', label: 'Books', count: 24 },
    { id: 'tools', label: 'Privacy Tools', count: 23 },
  ];

  // Mock marketplace items - in real app this would come from Nostr
  const items = [
    {
      id: '1',
      title: 'Hardware Security Key - YubiKey 5 NFC',
      description: 'Military-grade hardware authentication device. Supports FIDO2, WebAuthn, OTP, and PIV. Never used, sealed package.',
      price: '0.00125 BTC',
      priceUsd: '$45',
      seller: 'CryptoVendor',
      sellerPubkey: 'npub1vendor123...',
      rating: 4.9,
      reviews: 127,
      location: 'Anonymous',
      category: 'hardware',
      tags: ['security', 'authentication', 'yubikey'],
      images: ['/api/placeholder/400/300'],
      listedAt: '2024-01-15',
      views: 234,
      featured: true,
      condition: 'New',
      shipping: 'Worldwide',
    },
    {
      id: '2',
      title: 'Encrypted Communication Service - 1 Year',
      description: 'Premium encrypted messaging service with perfect forward secrecy. No logs, no metadata, complete anonymity.',
      price: '0.002 BTC',
      priceUsd: '$72',
      seller: 'SecureComms',
      sellerPubkey: 'npub1secure456...',
      rating: 5.0,
      reviews: 89,
      location: 'Digital',
      category: 'services',
      tags: ['encryption', 'messaging', 'privacy'],
      images: ['/api/placeholder/400/300'],
      listedAt: '2024-01-14',
      views: 156,
      featured: false,
      condition: 'Digital',
      shipping: 'Instant',
    },
    {
      id: '3',
      title: 'The Cypherpunk Handbook - Physical Copy',
      description: 'Rare first edition of the definitive guide to digital privacy and cryptography. Excellent condition.',
      price: '0.0008 BTC',
      priceUsd: '$29',
      seller: 'BookCollector',
      sellerPubkey: 'npub1books789...',
      rating: 4.7,
      reviews: 45,
      location: 'EU',
      category: 'books',
      tags: ['cypherpunk', 'privacy', 'rare'],
      images: ['/api/placeholder/400/300'],
      listedAt: '2024-01-12',
      views: 89,
      featured: false,
      condition: 'Excellent',
      shipping: 'EU Only',
    },
    {
      id: '4',
      title: 'Custom VPN Router - Pre-configured',
      description: 'High-performance router pre-configured with VPN, Tor, and privacy tools. Plug and play anonymity.',
      price: '0.0035 BTC',
      priceUsd: '$126',
      seller: 'TechAnon',
      sellerPubkey: 'npub1tech012...',
      rating: 4.8,
      reviews: 67,
      location: 'US',
      category: 'hardware',
      tags: ['vpn', 'router', 'privacy', 'tor'],
      images: ['/api/placeholder/400/300'],
      listedAt: '2024-01-10',
      views: 178,
      featured: false,
      condition: 'New',
      shipping: 'US/CA',
    },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredItems = items.filter(item => item.featured);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-500 glow-green mb-4">
            SECURE MARKETPLACE
          </h1>
          <p className="text-lg text-green-400/70 font-mono max-w-2xl mx-auto">
            Anonymous trading for the digital underground
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            <Input
              placeholder="Search items, sellers, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-green-500/30 text-green-400 placeholder:text-green-500/50 font-mono"
            />
          </div>
          {user && (
            <Button className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold">
              <Plus className="h-4 w-4 mr-2" />
              List Item
            </Button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(({ id, label, count }) => (
            <Button
              key={id}
              variant={selectedCategory === id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(id)}
              className={`font-mono ${
                selectedCategory === id
                  ? "bg-green-500 text-black"
                  : "border-green-500/30 text-green-400 hover:border-green-500/60"
              }`}
            >
              {label} ({count})
            </Button>
          ))}
        </div>

        {/* Featured Items */}
        {featuredItems.length > 0 && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-mono font-bold text-green-500 glow-green mb-6">
              FEATURED ITEMS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map(item => (
                <Card key={item.id} className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border-green-500/50 border-glow hover:border-glow-yellow transition-all duration-300 cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-yellow-500 text-black font-mono font-bold text-xs">
                        FEATURED
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-green-400/70 font-mono">
                        <Eye className="h-3 w-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <div className="aspect-video bg-black/30 rounded border border-green-500/30 mb-3 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-green-500/50" />
                    </div>
                    <CardTitle className="text-lg text-green-500 font-mono line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-400/70 font-mono text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xl font-mono font-bold text-green-500 glow-green">
                          {item.price}
                        </div>
                        <div className="text-sm text-green-400/70 font-mono">
                          ≈ {item.priceUsd}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-mono">{item.rating}</span>
                        </div>
                        <div className="text-xs text-green-400/70 font-mono">
                          {item.reviews} reviews
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
                      <span>{item.seller}</span>
                      <span>{item.condition}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.filter(item => !item.featured || selectedCategory !== 'all').map(item => (
                <Card key={item.id} className="bg-black/50 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:border-glow cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                        {categories.find(c => c.id === item.category)?.label}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-green-400/70 font-mono">
                        <Eye className="h-3 w-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <div className="aspect-video bg-black/30 rounded border border-green-500/30 mb-3 flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-green-500/50" />
                    </div>
                    <CardTitle className="text-base text-green-500 font-mono line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-400/70 font-mono text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-mono font-bold text-green-500">
                          {item.price}
                        </div>
                        <div className="text-xs text-green-400/70 font-mono">
                          ≈ {item.priceUsd}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-yellow-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="font-mono">{item.rating}</span>
                        </div>
                        <div className="text-xs text-green-400/70 font-mono">
                          {item.reviews} reviews
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
                      <span>{item.seller}</span>
                      <span>{item.condition}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loading State */}
            {filteredItems.length === 0 && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-black/50 border-green-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-5 w-16 bg-green-500/20" />
                        <Skeleton className="h-4 w-12 bg-green-500/20" />
                      </div>
                      <Skeleton className="aspect-video bg-green-500/20 rounded mb-3" />
                      <Skeleton className="h-5 w-3/4 bg-green-500/20" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2 bg-green-500/20" />
                      <Skeleton className="h-4 w-2/3 mb-3 bg-green-500/20" />
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-20 bg-green-500/20" />
                        <Skeleton className="h-4 w-16 bg-green-500/20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Stats */}
            <Card className="bg-black/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-500 font-mono text-lg">
                  MARKET STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Active Listings</span>
                  <span className="text-green-500 font-mono font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Verified Sellers</span>
                  <span className="text-green-500 font-mono font-bold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Completed Trades</span>
                  <span className="text-green-500 font-mono font-bold">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Avg Rating</span>
                  <span className="text-green-500 font-mono font-bold">4.8/5</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-black/50 border-yellow-500/30 border-glow-yellow">
              <CardHeader>
                <CardTitle className="text-yellow-500 font-mono text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>SECURITY</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-green-400/70 font-mono">
                  <p>• Always use escrow services</p>
                  <p>• Verify seller reputation</p>
                  <p>• Use encrypted communications</p>
                  <p>• Never share personal info</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-black/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-500 font-mono text-lg">
                  TRENDING
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['hardware', 'encryption', 'vpn', 'privacy', 'security', 'bitcoin', 'tor', 'anonymous'].map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:border-green-500/60 cursor-pointer font-mono text-xs"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Item Detail Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-green-500/30">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-green-500 font-mono glow-green">
                    {selectedItem.title}
                  </DialogTitle>
                  <div className="flex items-center space-x-4 text-sm text-green-400/70 font-mono">
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{selectedItem.rating} ({selectedItem.reviews} reviews)</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedItem.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedItem.listedAt}</span>
                    </span>
                  </div>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="aspect-square bg-black/30 rounded border border-green-500/30 mb-4 flex items-center justify-center">
                      <ShoppingCart className="h-16 w-16 text-green-500/50" />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-square bg-black/30 rounded border border-green-500/30 flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-green-500/50" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-3xl font-mono font-bold text-green-500 glow-green mb-2">
                        {selectedItem.price}
                      </div>
                      <div className="text-lg text-green-400/70 font-mono">
                        ≈ {selectedItem.priceUsd}
                      </div>
                    </div>

                    <Separator className="bg-green-500/30" />

                    <div>
                      <h3 className="text-lg font-mono font-bold text-green-500 mb-3">Description</h3>
                      <p className="text-green-400/80 font-mono leading-relaxed">
                        {selectedItem.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                      <div>
                        <span className="text-green-400/70">Condition:</span>
                        <span className="text-green-500 ml-2">{selectedItem.condition}</span>
                      </div>
                      <div>
                        <span className="text-green-400/70">Shipping:</span>
                        <span className="text-green-500 ml-2">{selectedItem.shipping}</span>
                      </div>
                      <div>
                        <span className="text-green-400/70">Seller:</span>
                        <span className="text-green-500 ml-2">{selectedItem.seller}</span>
                      </div>
                      <div>
                        <span className="text-green-400/70">Views:</span>
                        <span className="text-green-500 ml-2">{selectedItem.views}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-green-500 hover:bg-green-400 text-black font-mono font-bold">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>
                      <Button variant="outline" className="w-full border-green-500/30 text-green-400 hover:border-green-500/60 font-mono">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask Question
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Marketplace;