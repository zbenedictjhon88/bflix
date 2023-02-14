import ReactLoading from "react-loading";

function Loading(props) {
    return (
        <>
            <div className="loading">
                <ReactLoading type="bubbles" color="blue" height={50} width={50} className="load" />
            </div>
        </>
    );
}

export default Loading;