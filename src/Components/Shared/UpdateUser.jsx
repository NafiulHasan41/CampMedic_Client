import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/Utility/imageUpload";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const UpdateUser = () => {
    const { user , updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: user.displayName // Set default value for userName
        }
    });

    const onSubmit = async (data) => {
        const imageFile = data.photoURL[0];

        try {
            let imageURL;
            if (imageFile) {
                imageURL = await imageUpload(imageFile);
            }

            console.log('Submitted userName:', data.userName);  // Debug log
            const url = imageURL ? imageURL : user.photoURL;

            await updateUserProfile(data.userName, url);
            const userInfo = {
                name: data.userName,
                email: user.email,
            };

            console.log('UserInfo being sent:', userInfo);  // Debug log
            const res = await axiosSecure.patch('/user-update', userInfo);

            if (res.data.acknowledged) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error('Error in submission:', error);  // Debug log
            Swal.fire(error.message);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                Update User
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">User Name</span>
                    </label>
                    <input type="text" {...register('userName', { required: true })} name="userName" placeholder="User Name"
                        className="input input-bordered" />
                    {errors.userName && <span className="text-red-600">UserName is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">photoURL</span>
                    </label>
                    <div className="flex">
                        <input {...register('photoURL')} type="file" className="" />
                        <img className="w-24 h-24 my-2" src={user.photoURL} alt="" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn bg-cyan-400 hover:scale-110" type="submit" value="Update" />
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
