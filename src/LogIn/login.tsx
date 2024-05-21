import './login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Form {
    email:string,
    password:string
}

const LogIn: React.FC = () => {

    const {register,handleSubmit,formState:{errors}} = useForm<Form>()
   

    const navigate = useNavigate();
    function whenSubmit(data:Form){
        navigate('/logedin',{ state: { data } })
        console.log(data);
    }

    return (
        <div className="login-container">
            <div>
                <p className="login-message">Welcome Log In Page</p>
                <p className="login-subtext">Please enter your details!</p>
                

                <form onSubmit={handleSubmit(whenSubmit)}>

                    <div className="login-form-group">
                    <label className="login-form-label">Email</label>
                    <input className="login-form-input" {...register('email', { required: "Email is required" })} />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}

                    <div className="login-form-group">
                    <label className="login-form-label">Password</label>
                    <input className="login-form-input" type='password' {...register('password', { required: "Password is required" })} />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                    <button className='login-sign-in-button' >Sign in</button>
            </div>
            </div>
                </form>
            </div>
        </div>
    )
};

export default LogIn;

