import { useState, useRef, useEffect } from "react";

const Timer = () => {
    const [timerHours, setTimerHours] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
  
    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date('June 10, 2024 00:00:00').getTime();
        interval.current = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            if (distance < 0) {
                // stop our timer
                clearInterval(interval.current);
            } else {
                // update timer
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
       
        }, 1000);

    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    }, []); // Specify an empty dependency array to run this effect only once

    return (
        <div className='md:px-4 p-4 text-center max-w-screen-2xl mx-auto mt-10 md:mx-40 2xl:m-auto'>
            <h4 className='md:text-2xl text-4xl font-bold text-white leading-relaxed'>EXPIRES IN</h4>
            <div className='flex flex-row md:flex-row justify-center mt-5 items-center gap-10'>
                <span>
                    <p className='text-xl  font-bold text-white leading-relaxed'>{timerHours}</p>
                    <br />
                    <p className='text-sm  font-bold text-white leading-relaxed'>HRS</p>
                </span>
                <span>
                    <p className='text-xl  font-bold text-white leading-relaxed'>{timerMinutes}</p>
                    <br />
                    <p className='text-sm  font-bold text-white leading-relaxed'>MIN</p>
                </span>
                <span>
                    <p className='text-xl  font-bold text-white leading-relaxed'>{timerSeconds}</p>
                    <br />
                    <p className='text-sm  font-bold text-white leading-relaxed'>SEC</p>
                </span>
            </div>
        </div>
    );
};

export default Timer;
