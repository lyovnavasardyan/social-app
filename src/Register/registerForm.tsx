
import './registerForm.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Form {
    name:string,
    email:string,
    password:string
}

// enum networkcodes  {
//   success = 200,
//   error =  400
//   badRequest = 4545
// };

const schema = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Name must be at least 3 characters')
        .matches(/^(?!^\d+$)[\w\s]+$/, 'Name cannot contain only numbers')
        .required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const RegisterForm: React.FC = ()=>{
    
    
    const {register,handleSubmit,formState:{errors}} = useForm<Form>({
        resolver:yupResolver(schema)
    });

    const navigate = useNavigate();

    const whenSubmit = async(data: Form) => {
         
      try{
        const response = await axios.post('https://pinetech.org/api/auth/register ',{
            name:data.name,
            email:data.email,
            password:data.password
        },{
           headers: {
            'Content-Type': 'application/json'
            
           }
        })

        if(response.status === 200 || response.status ===201){ 
            // todo  create enum file  for error codes
            //store urls in env files 
            navigate('/registered', { state: data });
                console.log(data);
        }else{
            console.error('Registration failed:',response.data)
        }
      }catch(error){
        console.error('Error during registration',error)
      } 
     // navigate('/registered', { state: data });
            //    console.log(data);
};
return (
    <div>
        <div className="header-container">
            <h1>Welcome to the main page, if you already have an account please</h1>
            <button className="sign-in-button" onClick={()=>navigate('/login')}>Sign In</button>
        </div>
        <form onSubmit={handleSubmit(whenSubmit)} className="form-container">
            <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" {...register('name', { required: "Name is required" })} />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" {...register('email', { required: "Email is required" })} />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" {...register('password', { required: "Password is required" })} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <button className="submit-button" type="submit">Register</button>
        </form>
    </div>
);
}

export default RegisterForm;