import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  const imgArr = [
    "https://cf.bstatic.com/xdata/images/hotel/max500/16379302.jpg?k=55494e13bb009658f0b7114e816e647c36c26851bf214b6fbc2f05558f9edf86&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max500/74529578.jpg?k=a7fcefd47d7271daf44f6ce78a215b9505f9f8e5cac3af093b78b9c489fd8461&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max500/39615603.jpg?k=ffa7f14b1c5235c8883662876734f832a596de617cd8380ce1025fb21bc92df9&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max500/77765526.jpg?k=af77ae28b7b1118e4982d1d4c72ec3b370e171ac653d2aec569a75db55669445&o=",
  ];
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img className="fpImage" src={item.photos[0]} alt=" " />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ₹{item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
