import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=agra,shimla,jaipur");
    return (

        <div className="featured">
            {loading ? ("Loading please wait") : (
                <>
                    <div className="featuredItem">
                        <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/city/540x270/684499.webp?k=05c9fc4396edfc04f1e0f3d00ffbe182ebd969c9d83857a8e10a4e046fae21cd&o=" alt="agra" />
                        <div className="featuredTitles">
                            <h1>Agra</h1>
                            <h2> { data[0] } Properties</h2>
                        </div>
                    </div>

                    <div className="featuredItem">
                        <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/city/540x270/684655.webp?k=2afb45c7a46dedbc5b5b360599dbbb7a7165ac823b22dd66d7602ea4c49de1c4&o=" alt="jaipur" />
                        <div className="featuredTitles">
                            <h1>Jaipur</h1>
                            <h2> {data[2]} Properties</h2>
                        </div>
                    </div>



                    <div className="featuredItem">
                        <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/city/540x270/652858.webp?k=6dd48a72530871fd853668bb725953584d60a188c1884f5f3bc005573ce6f486&o=" alt="leh" />
                        <div className="featuredTitles">
                            <h1>Shimla</h1>
                            <h2> {data[1]} Properties</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Featured