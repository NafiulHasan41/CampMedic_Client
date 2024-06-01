import CampCard from "./CampCard";


const PopularMedicalCamp = () => {
    return (
        <div>

            <div>
            <h1 className="  text-xl md:text-4xl font-semibold  md:font-bold text-center text-[#40E0D0] capitalize lg:text-3xl my-8 md:my-16">---  Popular Medical Camps --- </h1>

            <div className=" border-b-2 border-[#40E0D0] w-[50%] mx-auto mb-10"></div>
            </div>

            <div className=" p-2 md:p-10">
                <CampCard/>
            </div>
            
        </div>
    );
};

export default PopularMedicalCamp;