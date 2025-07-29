import { useSeoMeta } from '@unhead/react';
import { Image, Eye, Heart, Download, Share, Grid, List, Plus } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const { user } = useCurrentUser();

  useSeoMeta({
    title: 'Gallery - CypherNet Digital Art Collective',
    description: 'Showcase of digital art, cypherpunk aesthetics, and creative works celebrating digital freedom.',
  });

  const categories = [
    { id: 'all', label: 'All Works', count: 89 },
    { id: 'digital-art', label: 'Digital Art', count: 34 },
    { id: 'photography', label: 'Photography', count: 22 },
    { id: 'glitch', label: 'Glitch Art', count: 18 },
    { id: 'cyberpunk', label: 'Cyberpunk', count: 15 },
  ];

  // Mock gallery items - in real app this would come from Nostr
  const works = [
    {
      id: '1',
      title: 'Digital Resistance',
      description: 'A visual representation of the fight for digital freedom, featuring encrypted data streams and anonymous networks.',
      artist: 'CyberArtist',
      artistPubkey: 'npub1artist123...',
      category: 'digital-art',
      tags: ['resistance', 'encryption', 'freedom'],
      createdAt: '2024-01-15',
      views: 1247,
      likes: 89,
      downloads: 23,
      featured: true,
      resolution: '3840x2160',
      fileSize: '2.4 MB',
      format: 'PNG',
      license: 'CC BY-SA',
    },
    {
      id: '2',
      title: 'Matrix Code Rain',
      description: 'Classic green code rain effect with hidden messages about privacy and surveillance.',
      artist: 'MatrixMaker',
      artistPubkey: 'npub1matrix456...',
      category: 'glitch',
      tags: ['matrix', 'code', 'surveillance'],
      createdAt: '2024-01-14',
      views: 892,
      likes: 67,
      downloads: 45,
      featured: false,
      resolution: '1920x1080',
      fileSize: '1.8 MB',
      format: 'GIF',
      license: 'CC0',
    },
    {
      id: '3',
      title: 'Neon Cityscape',
      description: 'Cyberpunk cityscape with neon lights and digital billboards promoting freedom and privacy.',
      artist: 'NeonDreamer',
      artistPubkey: 'npub1neon789...',
      category: 'cyberpunk',
      tags: ['neon', 'city', 'cyberpunk'],
      createdAt: '2024-01-12',
      views: 1456,
      likes: 124,
      downloads: 67,
      featured: true,
      resolution: '2560x1440',
      fileSize: '3.1 MB',
      format: 'JPG',
      license: 'CC BY',
    },
    {
      id: '4',
      title: 'Anonymous Portrait',
      description: 'Stylized portrait representing digital anonymity and the power of pseudonymous identity.',
      artist: 'PixelRebel',
      artistPubkey: 'npub1pixel012...',
      category: 'digital-art',
      tags: ['anonymous', 'portrait', 'identity'],
      createdAt: '2024-01-10',
      views: 734,
      likes: 56,
      downloads: 34,
      featured: false,
      resolution: '1080x1080',
      fileSize: '1.2 MB',
      format: 'PNG',
      license: 'CC BY-NC',
    },
    {
      id: '5',
      title: 'Encrypted Data Visualization',
      description: 'Beautiful visualization of encrypted data packets flowing through decentralized networks.',
      artist: 'DataViz',
      artistPubkey: 'npub1dataviz345...',
      category: 'digital-art',
      tags: ['data', 'encryption', 'network'],
      createdAt: '2024-01-08',
      views: 623,
      likes: 41,
      downloads: 19,
      featured: false,
      resolution: '4096x2304',
      fileSize: '4.2 MB',
      format: 'PNG',
      license: 'CC BY-SA',
    },
    {
      id: '6',
      title: 'Glitched Freedom',
      description: 'Glitch art piece representing the disruption of surveillance systems and digital liberation.',
      artist: 'GlitchMaster',
      artistPubkey: 'npub1glitch678...',
      category: 'glitch',
      tags: ['glitch', 'freedom', 'disruption'],
      createdAt: '2024-01-06',
      views: 445,
      likes: 32,
      downloads: 15,
      featured: false,
      resolution: '1920x1080',
      fileSize: '2.7 MB',
      format: 'PNG',
      license: 'CC0',
    },
  ];

  const filteredWorks = works.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || work.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredWorks = works.filter(work => work.featured);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-500 glow-green mb-4">
            DIGITAL GALLERY
          </h1>
          <p className="text-lg text-green-400/70 font-mono max-w-2xl mx-auto">
            Celebrating digital freedom through art and creativity
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            <Input
              placeholder="Search artworks, artists, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-green-500/30 text-green-400 placeholder:text-green-500/50 font-mono"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`font-mono ${
                viewMode === 'grid'
                  ? "bg-green-500 text-black"
                  : "border-green-500/30 text-green-400 hover:border-green-500/60"
              }`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`font-mono ${
                viewMode === 'list'
                  ? "bg-green-500 text-black"
                  : "border-green-500/30 text-green-400 hover:border-green-500/60"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
            {user && (
              <Button className="bg-green-500 hover:bg-green-400 text-black font-mono font-bold">
                <Plus className="h-4 w-4 mr-2" />
                Upload
              </Button>
            )}
          </div>
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

        {/* Featured Works */}
        {featuredWorks.length > 0 && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-mono font-bold text-green-500 glow-green mb-6">
              FEATURED WORKS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredWorks.map(work => (
                <Card key={work.id} className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border-green-500/50 border-glow hover:border-glow-yellow transition-all duration-300 cursor-pointer group" onClick={() => setSelectedWork(work)}>
                  <CardContent className="p-0">
                    <div className="aspect-square bg-black/30 rounded-t border-b border-green-500/30 flex items-center justify-center relative overflow-hidden">
                      <Image className="h-16 w-16 text-green-500/50 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-yellow-500 text-black font-mono font-bold text-xs">
                          FEATURED
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 flex items-center space-x-2 text-xs text-green-400/70 font-mono">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{work.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{work.likes}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-mono font-bold text-green-500 mb-2 line-clamp-1">
                        {work.title}
                      </h3>
                      <p className="text-green-400/70 font-mono text-sm mb-3 line-clamp-2">
                        {work.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
                        <span>{work.artist}</span>
                        <span>{work.resolution}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Gallery */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Gallery Content */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWorks.filter(work => !work.featured || selectedCategory !== 'all').map(work => (
                  <Card key={work.id} className="bg-black/50 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:border-glow cursor-pointer group" onClick={() => setSelectedWork(work)}>
                    <CardContent className="p-0">
                      <div className="aspect-square bg-black/30 rounded-t border-b border-green-500/30 flex items-center justify-center relative overflow-hidden">
                        <Image className="h-12 w-12 text-green-500/50 group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute top-2 right-2 flex items-center space-x-2 text-xs text-green-400/70 font-mono">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{work.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{work.likes}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-mono font-bold text-green-500 mb-2 line-clamp-1">
                          {work.title}
                        </h3>
                        <p className="text-green-400/70 font-mono text-sm mb-3 line-clamp-2">
                          {work.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
                          <span>{work.artist}</span>
                          <span>{work.format}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredWorks.filter(work => !work.featured || selectedCategory !== 'all').map(work => (
                  <Card key={work.id} className="bg-black/50 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:border-glow cursor-pointer" onClick={() => setSelectedWork(work)}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-black/30 rounded border border-green-500/30 flex items-center justify-center flex-shrink-0">
                          <Image className="h-8 w-8 text-green-500/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-mono font-bold text-green-500 mb-2">
                            {work.title}
                          </h3>
                          <p className="text-green-400/70 font-mono text-sm mb-3 line-clamp-2">
                            {work.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-green-400/70 font-mono">
                            <div className="flex items-center space-x-4">
                              <span>{work.artist}</span>
                              <span>{work.resolution}</span>
                              <span>{work.fileSize}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{work.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{work.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Download className="h-3 w-3" />
                                <span>{work.downloads}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Loading State */}
            {filteredWorks.length === 0 && (
              <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-black/50 border-green-500/30">
                    <CardContent className="p-0">
                      {viewMode === 'grid' ? (
                        <>
                          <Skeleton className="aspect-square bg-green-500/20 rounded-t" />
                          <div className="p-4 space-y-2">
                            <Skeleton className="h-5 w-3/4 bg-green-500/20" />
                            <Skeleton className="h-4 w-full bg-green-500/20" />
                            <Skeleton className="h-4 w-1/2 bg-green-500/20" />
                          </div>
                        </>
                      ) : (
                        <div className="p-4 flex gap-4">
                          <Skeleton className="w-24 h-24 bg-green-500/20 rounded" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4 bg-green-500/20" />
                            <Skeleton className="h-4 w-full bg-green-500/20" />
                            <Skeleton className="h-4 w-1/2 bg-green-500/20" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gallery Stats */}
            <Card className="bg-black/50 border-green-500/30">
              <CardContent className="p-4">
                <h3 className="text-green-500 font-mono text-lg font-bold mb-4">
                  GALLERY STATS
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-green-400/70">Total Works</span>
                    <span className="text-green-500 font-bold">89</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-green-400/70">Artists</span>
                    <span className="text-green-500 font-bold">34</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-green-400/70">Total Views</span>
                    <span className="text-green-500 font-bold">45.2K</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-green-400/70">Downloads</span>
                    <span className="text-green-500 font-bold">2.8K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-black/50 border-green-500/30">
              <CardContent className="p-4">
                <h3 className="text-green-500 font-mono text-lg font-bold mb-4">
                  POPULAR TAGS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['cyberpunk', 'glitch', 'neon', 'matrix', 'encryption', 'freedom', 'digital', 'anonymous'].map(tag => (
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

            {/* Top Artists */}
            <Card className="bg-black/50 border-green-500/30">
              <CardContent className="p-4">
                <h3 className="text-green-500 font-mono text-lg font-bold mb-4">
                  TOP ARTISTS
                </h3>
                <div className="space-y-3">
                  {['CyberArtist', 'NeonDreamer', 'MatrixMaker', 'PixelRebel'].map((artist, i) => (
                    <div key={artist} className="flex items-center justify-between text-sm font-mono">
                      <span className="text-green-400/70">{i + 1}. {artist}</span>
                      <span className="text-green-500">{Math.floor(Math.random() * 20) + 5} works</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Artwork Detail Modal */}
        <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black border-green-500/30">
            {selectedWork && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-green-500 font-mono glow-green">
                    {selectedWork.title}
                  </DialogTitle>
                  <div className="flex items-center space-x-4 text-sm text-green-400/70 font-mono">
                    <span>by {selectedWork.artist}</span>
                    <span>{selectedWork.createdAt}</span>
                    <span>{selectedWork.resolution}</span>
                    <span>{selectedWork.fileSize}</span>
                  </div>
                </DialogHeader>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="aspect-square bg-black/30 rounded border border-green-500/30 flex items-center justify-center mb-4">
                      <Image className="h-24 w-24 text-green-500/50" />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-square bg-black/30 rounded border border-green-500/30 flex items-center justify-center">
                          <Image className="h-6 w-6 text-green-500/50" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-mono font-bold text-green-500 mb-3">Description</h3>
                      <p className="text-green-400/80 font-mono leading-relaxed">
                        {selectedWork.description}
                      </p>
                    </div>

                    <Separator className="bg-green-500/30" />

                    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                      <div>
                        <span className="text-green-400/70">Format:</span>
                        <span className="text-green-500 ml-2">{selectedWork.format}</span>
                      </div>
                      <div>
                        <span className="text-green-400/70">License:</span>
                        <span className="text-green-500 ml-2">{selectedWork.license}</span>
                      </div>
                      <div>
                        <span className="text-green-400/70">Views:</span>
                        <span className="text-green-500 ml-2">{selectedWork.views}</span>
                      </div>
                      <div>
                        <span className="text-green-400/70">Downloads:</span>
                        <span className="text-green-500 ml-2">{selectedWork.downloads}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedWork.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-green-500 hover:bg-green-400 text-black font-mono font-bold">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="border-green-500/30 text-green-400 hover:border-green-500/60 font-mono">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-green-500/30 text-green-400 hover:border-green-500/60 font-mono">
                        <Share className="h-4 w-4" />
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

export default Gallery;