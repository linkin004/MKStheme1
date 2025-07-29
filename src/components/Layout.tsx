import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black matrix-bg">
      <Navigation />
      <main className="relative">
        {children}
      </main>
      <footer className="border-t border-green-500/30 bg-black/90 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-green-400/70 font-mono text-sm">
                Decentralized. Encrypted. Unstoppable.
              </p>
              <p className="text-green-500/50 font-mono text-xs mt-1">
                Built on Nostr Protocol
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-green-400/70 font-mono text-sm">
                Vibed with{' '}
                <a 
                  href="https://soapbox.pub/mkstack" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:glow-yellow transition-all duration-300"
                >
                  MKStack
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}