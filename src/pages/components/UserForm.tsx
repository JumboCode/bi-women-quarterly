import {useState} from 'react';
import ReactDOM from 'react-dom/client';

export function MyForm() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [bio, setBio] = useState("");
  // const [socMedia, setSocMedia] = useState("");
  
  
  
  const [user, setUser] = useState({name : "",
                                    email : "",
                                    bio : "",
                                    socMedia : ""})

                                  
                                
  //TODO: what should the type of e be?
  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name] : e.target.value});
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert(`The name you entered was: ${user.name}`);
    alert(`The email you entered was: ${user.email}`);
    alert(`The bio you entered was: ${user.bio}`);
    alert(`The social media accounts you entered were: ${user.socMedia}`);
  }                       
  return (
      <form onSubmit={handleSubmit}>
        <label>Enter your pen name:
          <input type="text" 
                 value={user.name}
                 name="name"
                 onChange={(e)=> {setUser(e.target.value)}} />
        </label>
        <br></br>
        <label>Enter your email address:
          <input type="text"/>
        </label>
        <br></br>
        <label>Enter a short biography:
          <input type="text" />
        </label>
        <br></br>
        <label>Enter any social media accounts:
          <input type="text" />
        </label>
      </form>
    )
}