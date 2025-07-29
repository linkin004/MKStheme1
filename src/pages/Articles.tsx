import { useSeoMeta } from '@unhead/react';
import { Clock, User, MessageSquare, Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { CommentsSection } from '@/components/comments/CommentsSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const { user } = useCurrentUser();

  useSeoMeta({
    title: 'Articles - CypherNet Freedom Library',
    description: 'Decentralized articles on libertarian philosophy, cryptography, privacy, and digital freedom.',
  });

  const categories = [
    { id: 'all', label: 'All Articles', count: 42 },
    { id: 'crypto', label: 'Cryptography', count: 12 },
    { id: 'privacy', label: 'Privacy', count: 8 },
    { id: 'libertarian', label: 'Libertarian', count: 15 },
    { id: 'tech', label: 'Technology', count: 7 },
  ];

  // Mock articles data - in real app this would come from Nostr
  const articles = [
    {
      id: '1',
      title: 'The Cypherpunk Manifesto: Privacy in the Digital Age',
      excerpt: 'Privacy is necessary for an open society in the electronic age. We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy...',
      author: 'Eric Hughes',
      authorPubkey: 'npub1cypherpunk123...',
      publishedAt: '2024-01-15',
      readTime: '8 min',
      category: 'libertarian',
      tags: ['privacy', 'manifesto', 'cypherpunk'],
      comments: 23,
      featured: true,
    },
    {
      id: '2',
      title: 'Cryptographic Protocols for Decentralized Networks',
      excerpt: 'An in-depth analysis of modern cryptographic protocols that enable truly decentralized communication networks without central authorities...',
      author: 'Anonymous',
      authorPubkey: 'npub1anon456...',
      publishedAt: '2024-01-12',
      readTime: '12 min',
      category: 'crypto',
      tags: ['cryptography', 'protocols', 'decentralization'],
      comments: 15,
      featured: false,
    },
    {
      id: '3',
      title: 'Digital Sovereignty: Reclaiming Your Data',
      excerpt: 'In an age of surveillance capitalism, true digital sovereignty means having complete control over your data, communications, and digital identity...',
      author: 'CyberLibertarian',
      authorPubkey: 'npub1cyber789...',
      publishedAt: '2024-01-10',
      readTime: '6 min',
      category: 'privacy',
      tags: ['sovereignty', 'data', 'freedom'],
      comments: 31,
      featured: false,
    },
    {
      id: '4',
      title: 'Building Unstoppable Applications on Nostr',
      excerpt: 'A technical guide to developing censorship-resistant applications using the Nostr protocol and decentralized infrastructure...',
      author: 'DevAnon',
      authorPubkey: 'npub1dev012...',
      publishedAt: '2024-01-08',
      readTime: '15 min',
      category: 'tech',
      tags: ['nostr', 'development', 'censorship-resistance'],
      comments: 8,
      featured: false,
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(article => article.featured);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-500 glow-green mb-4">
            FREEDOM LIBRARY
          </h1>
          <p className="text-lg text-green-400/70 font-mono max-w-2xl mx-auto">
            Uncensored knowledge for the digital resistance
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            <Input
              placeholder="Search articles, tags, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-green-500/30 text-green-400 placeholder:text-green-500/50 font-mono"
            />
          </div>
          {user && (
            <Button className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold">
              <Plus className="h-4 w-4 mr-2" />
              Publish Article
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {featuredArticle && selectedCategory === 'all' && (
              <Card className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 border-green-500/50 border-glow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-yellow-500 text-black font-mono font-bold">
                      FEATURED
                    </Badge>
                    <div className="flex items-center space-x-4 text-sm text-green-400/70 font-mono">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{featuredArticle.comments}</span>
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-green-500 font-mono hover:glow-green transition-all duration-300 cursor-pointer">
                    {featuredArticle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-400/80 font-mono mb-4 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredArticle.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-green-400/70 font-mono">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                      <span>•</span>
                      <span>{featuredArticle.publishedAt}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold"
                      onClick={() => setSelectedArticle(featuredArticle)}
                    >
                      Read Article
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Articles List */}
            <div className="space-y-6">
              {filteredArticles.filter(article => !article.featured || selectedCategory !== 'all').map(article => (
                <Card key={article.id} className="bg-black/50 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:border-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                        {categories.find(c => c.id === article.category)?.label}
                      </Badge>
                      <div className="flex items-center space-x-4 text-sm text-green-400/70 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{article.comments}</span>
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-green-500 font-mono hover:glow-green transition-all duration-300 cursor-pointer">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-400/80 font-mono mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-green-400/70 font-mono">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.publishedAt}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500/30 text-green-400 hover:border-green-500/60 font-mono"
                        onClick={() => setSelectedArticle(article)}
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loading State */}
            {filteredArticles.length === 0 && (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-black/50 border-green-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-6 w-20 bg-green-500/20" />
                        <Skeleton className="h-4 w-24 bg-green-500/20" />
                      </div>
                      <Skeleton className="h-6 w-3/4 bg-green-500/20" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2 bg-green-500/20" />
                      <Skeleton className="h-4 w-2/3 mb-4 bg-green-500/20" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-32 bg-green-500/20" />
                        <Skeleton className="h-8 w-20 bg-green-500/20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-black/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-500 font-mono text-lg">
                  NETWORK STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Total Articles</span>
                  <span className="text-green-500 font-mono font-bold">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Active Writers</span>
                  <span className="text-green-500 font-mono font-bold">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Comments</span>
                  <span className="text-green-500 font-mono font-bold">1,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 font-mono text-sm">Uptime</span>
                  <span className="text-green-500 font-mono font-bold">99.97%</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-black/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-500 font-mono text-lg">
                  POPULAR TAGS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['privacy', 'cryptography', 'decentralization', 'freedom', 'nostr', 'bitcoin', 'surveillance', 'censorship'].map(tag => (
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

        {/* Article Modal */}
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-green-500/30">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-green-500 font-mono glow-green">
                    {selectedArticle.title}
                  </DialogTitle>
                  <div className="flex items-center space-x-4 text-sm text-green-400/70 font-mono">
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{selectedArticle.author}</span>
                    </span>
                    <span>{selectedArticle.publishedAt}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedArticle.readTime}</span>
                    </span>
                  </div>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-green-400/80 font-mono leading-relaxed text-lg">
                      {selectedArticle.excerpt}
                    </p>
                    <p className="text-green-400/80 font-mono leading-relaxed">
                      This is where the full article content would be displayed. In a real implementation,
                      this would be fetched from Nostr events and rendered with proper markdown support.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <CommentsSection
                    root={new URL(`https://cyphernet.example/articles/${selectedArticle.id}`)}
                    title="Discussion"
                    emptyStateMessage="Start the conversation"
                    emptyStateSubtitle="Share your thoughts on this article"
                  />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Articles;