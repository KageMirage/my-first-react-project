import HomeLink from './catalogElement/homeButton';
import H2Text from './catalogElement/h2Text';
import Menu from './catalogElement/catalogMenu/menu';
import FilterProduct from './catalogElement/FilterProduct';

function Catalog() {
  return (
    <div className="max-w-300 mx-auto px-4 py-6 font-sans">
      <HomeLink />
      <H2Text />
      <div className="flex flex-col md:flex-row items-start gap-[18.6px] mt-6">
        <Menu />
        <FilterProduct />
      </div>
    </div>
  );
}

export default Catalog;