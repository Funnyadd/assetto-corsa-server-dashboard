import { useOverlay } from "./OverlayContext";

const Overlay = () => {
    const { isOverlayVisible } = useOverlay()

    return isOverlayVisible ? <div className="overlay"></div> : null
}

export default Overlay;