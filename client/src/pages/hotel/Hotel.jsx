import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReservationModal, setOpenReservationModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()
  
  const {dates, options} = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = (dayDifference(dates[0].endDate, dates[0].startDate) || 1);
  

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/163106139.jpg?k=5179f41194fd40bfb3bbb5bcb5a49d863213f4dde4ac9fc00062c679769c7d6d&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236518168.jpg?k=6cf52ef69fa5d5f4547d3435a0473361b45e0316df5eea0ff7238c58faa04168&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/130384608.jpg?k=6b3766c1428936ff7e0016d4d36c8e060fbdfb503591d53d339933e3a556323f&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/130955398.jpg?k=b6675d8d2a7142f156bd75a481d3c7b2d17aac2ebd268868d8f6ac0c42366594&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/130386499.jpg?k=96460462df970fa835facec7dfb4131e743eb095229ca1c1a39269f573bdd600&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max300/233310988.jpg?k=77f2b89d80cb4b83dc0917c385dfa1cdfff5184d67f6714496bdd04fc47d6e8c&o=&hp=1"
  //   }
  // ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  }

  const handleClick = () =>{
    if(user) {
      setOpenReservationModal(true);
    }
    else {
      navigate("/login")
    }
  }

  return (
    <div className="">
      <Navbar />
      <Header type="list" />

      {loading ? "Loading..." :
        (<div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("l")} />

          </div>}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ₹{data.cheapestPrice} and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">
                  {data.title}
                </h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Situated in the best rated area in Agra, this hotel has an excellent location score of 9.0
                </span>
                <h2>
                  <b>₹{days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
        )
      }
      {openReservationModal && <Reserve setOpen={setOpenReservationModal} hotelId={id} />}
    </div>
  )
}

export default Hotel