import Lottie from 'react-lottie';
import animationData from '../assets/lotties/nothing-found-4.json';

// region Of course This Animation Component Can Be Reused
export default function NoGoalsAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={300}
                width={300}
            />
        </div>
    );
}
// endregion