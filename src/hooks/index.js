import {useState, useEffect} from 'react';

//모바일 체크 768보다 이하이면 true, 이상 false
export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        isMobileChk();
        window.addEventListener( "resize", isMobileChk );
        return () =>  window.removeEventListener( "resize", isMobileChk );
    },[]);
    const isMobileChk = () => {
        setIsMobile( window.innerWidth <= 768 );
    };
    return [isMobile];
};
