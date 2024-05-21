import './Greeting.css';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Form {
    email:string,
    password:string
}

const Greeting: React.FC = () => {

    const {register,handleSubmit,formState:{errors}} = useForm<Form>()
    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();
    function whenSubmit(data:Form){
        navigate('/logedin',{state:{data}})
        console.log(data);
    }

    return (
        <div className="greeting-container">
            <div>
                <p className="greeting-message">Successfully Registered</p>
                <p className="greeting-subtext">Welcome to our page, {data.name}!</p>
                <p className="greeting-message">Please sign in</p>

                <form onSubmit={handleSubmit(whenSubmit)}>

                    <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" {...register('email', { required: "Email is required" })} />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}

                    <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type='password' {...register('password', { required: "password is required" })} />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                    <button className='sign-in' >Sign in</button>
            </div>
            </div>
                </form>
            </div>
        </div>
    )
};

export default Greeting;