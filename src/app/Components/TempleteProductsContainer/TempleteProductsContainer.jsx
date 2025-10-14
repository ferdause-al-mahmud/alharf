"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@mui/material';
import FilterMenu from '@/app/Components/FilterMenu';
import ProductsContainer from '@/app/Components/ProductsContainer/ProductsContainer';

const TempleteProductsContainer = ({ products: fetchedProducts, currentPage, basePath }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { products, totalPages } = fetchedProducts;
    const [page, setPage] = useState(currentPage || 1);
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
    const [availability, setAvailability] = useState('');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    useEffect(() => {
    }, [sortBy, minPrice, maxPrice]);

    const applyPriceFilter = () => {
        setPage(1);
        router.push(`${basePath}?sortBy=${sortBy}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    };

    const resetFilters = () => {
        setSortBy('');
        setAvailability('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1); // Reset to page 1
        router.push(`${basePath}`);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage); // Update page state
        router.push(`${basePath}?page=${newPage}&sortBy=${sortBy}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    };

    // Handle sorting change
    const handleSortChange = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy); // Update sorting state
        setPage(1); // Reset to page 1 on sort change
        router.push(`${basePath}?sortBy=${newSortBy}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    };

    return (
        <div>
            <FilterMenu
                sortBy={sortBy}
                setSortBy={setSortBy}
                availability={availability}
                setAvailability={setAvailability}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                applyPriceFilter={applyPriceFilter}
                resetFilters={resetFilters}
                handleSortChange={handleSortChange}
            />

            <ProductsContainer products={products} />

            <div className="flex justify-center items-center mt-6">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                    color="primary"
                    variant="outlined"
                />
            </div>
        </div>
    );
};

export default TempleteProductsContainer;
