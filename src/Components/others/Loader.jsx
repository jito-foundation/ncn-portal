import logo from "../../Assets/logo.svg"

const Loader = (props) => {
    const { type } = props;
    if (type === "fixed") {
        return (
            <div className="fixed-loading-wrapper">
                <div className="loader-wrapp">
                    <div className="loader-logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="loader"></div>
                </div>
            </div>
        )
    } 
    else if (type === "webLoader") {
        return (
            <div className="fixed-loading-wrapper web-loader">
                <div className="loader-wrapp">
                    <div className="loader-logo">
                    <img src={logo} alt="" />
                    </div>
                    <div className="loader"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="loading-wrapper">
            <div className="loader-wrapp">
                <div className="loader-logo">
                <img src={logo} alt="" />
                </div>
                <div className="loader"></div>
            </div>
        </div>
    )
}

export default Loader
