import Hero from './Hero';
import DropRibbon from './DropRibbon';
import ProductGrid from './ProductGrid';
import EditorialReel from './EditorialReel';
import TactileHub from './TactileHub';
import GlobalSourcingMap from './GlobalSourcingMap';
import NewArrivalsMarquee from '../../components/NewArrivalsMarquee';
import AccessoriesSpotlight from './AccessoriesSpotlight';

export default function Home() {
  return (
    <div className="bg-silk-cream">
      <Hero />
      <DropRibbon />
      <NewArrivalsMarquee />
      <ProductGrid />
      <AccessoriesSpotlight />
      <EditorialReel />
      <GlobalSourcingMap />
      <TactileHub />
    </div>
  );
}
