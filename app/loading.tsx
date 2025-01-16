import Image from "next/image";
import loader from "@/assets/loader.gif";
const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
            }}
        >
            <Image src={loader} height={150} width={150} alt='loading...' />
        </div>
    );
};

export default Loading;
