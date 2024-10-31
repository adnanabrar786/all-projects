import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CatAccordion from "../CatAccordion";
import CatModel from "../CatModel/CatModel";
import CatTypes from "../CatTypes";

interface Props {
  category_filter_option: any;
}

const FilterProducts = ({ category_filter_option }: Props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    subcategory
  );

  const [selectedSearchByTypes, setSelectedSearchByTypes] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (category) {
      setSelectedSearchByTypes("");
    }
  }, [category]);

  return (
    <>
      <CatAccordion
        category_filter_option={category_filter_option}
        selectedSearchByTypes={selectedSearchByTypes}
        setSelectedSearchByTypes={setSelectedSearchByTypes}
      />

      <CatModel
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedSearchByTypes={selectedSearchByTypes}
        setSelectedSearchByTypes={setSelectedSearchByTypes}
      />
      <CatTypes
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedSearchByTypes={selectedSearchByTypes}
        setSelectedSearchByTypes={setSelectedSearchByTypes}
      />
    </>
  );
};

export default FilterProducts;
