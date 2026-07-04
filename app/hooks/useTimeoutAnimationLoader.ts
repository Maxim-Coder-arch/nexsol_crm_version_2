import { useState } from "react"

const useTimeoutAnimationLoader = () => {
    const [state, setState] = useState<boolean>(false);
    setTimeout(() => setState(true), 600);
    return state;
}

export default useTimeoutAnimationLoader;