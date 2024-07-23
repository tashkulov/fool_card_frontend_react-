<<<<<<< HEAD
import { useEffect } from 'react';

const useOutsideClick = (ref: any, callback: () => void) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, []);
};

export default useOutsideClick
=======
import { useEffect } from 'react';

const useOutsideClick = (ref: any, callback: () => void) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, []);
};

export default useOutsideClick
>>>>>>> 21d851925464cc27aef99cc603aa18814cbf6369
