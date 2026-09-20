import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Hero } from '@/components/Hero';
import { Heritage } from '@/components/Heritage';
import { SaffronCollections } from '@/components/SaffronCollections';
import { RugCollection } from '@/components/RugCollection';
import { KhatamCollection } from '@/components/KhatamCollection';
import { MinakariCollection } from '@/components/MinakariCollection';
import { TabloFarsh } from '@/components/TabloFarsh';
import { Checkout } from '@/components/Checkout';
import { Contact, Footer } from '@/components/Contact';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-espresso-950">
        <Navbar />
        <CartDrawer />

        <main>
          <Hero />
          <Heritage />
          <SaffronCollections />
          <RugCollection />
          <TabloFarsh />
          <KhatamCollection />
          <MinakariCollection />
          <Checkout />
          <Contact />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;