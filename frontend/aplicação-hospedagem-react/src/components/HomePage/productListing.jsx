import { useNavigate, useLocation } from "react-router-dom";
import {HiArrowNarrowRight} from "react-icons/hi"
import ProductCard from "./ProductCard"


const ProductListing = ({ products = [] }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleViewAll = () =>{

        navigate('/produtos')
        window.scrollTo({top: 0, behavior: "smooth" })


        const isHomePage = location.pathname === "/"

    }

    
    return(

        
        <section className="featured-section">

            <div className="featured-header">

                <h2>Produtos em destaque:</h2>

                {isHomePage && (
                    <button
                        onClick={handleViewAll}
                        className="view-all-button"
                    >
                        Ver todos
                        <HiArrowNarrowRight className="arrow-icon" />
                    </button>
                )}

            </div>

            <div className="featured-grid">

                {Array.isArray(products) && products.map((product) => (
                    <ProductCard
                        key={product.id ?? product.name}
                        product={product}
                    />
                ))}

            </div>

        </section>

        
        );

}

export default ProductListing