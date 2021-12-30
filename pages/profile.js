import jwt from "jsonwebtoken";
import { useEffect ,useState} from "react";
import Head from "next/head"                        
import Navbar from "../components/navbar";

export default function Profilepage () {
    const [raw, setraw] = useState({})
    const [loading, setloading] = useState(true);

    useEffect(() => {
        
        const token=localStorage.getItem("token");
        if(token){
            setloading(false);
        }
        let obj=jwt.decode(token);
        // console.log(obj,"obj")
        setraw(obj);
        // const {username,email,password}=obj;
    }, [])
    if(loading){
        if(raw==null){
            return(
                <h1>please sign up first</h1>
            )
        }
        else{

            return(
                <h1>loading...</h1>
                )
            }
    }
    else{
        return(
            <>
            <Navbar/>
            <Head>
                <link rel="stylesheet" href="testing.css" />
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
{/*                 
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script> */}
    <title className="capitalize">Profile</title>

    
            </Head>
            <section className="py-5 my-5">
		<div className="container">
			<h1 className="mb-5">Profile </h1>
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
                
				
				<div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
					<div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div className="row">
							
							<div className="col-md-6">
								<div className="form-group">
								  	<label>Username</label>
                                      <h3>
                                          {raw.username}
                                      </h3>
								  	{/* <input type="text" className="form-control" value={raw.username} /> */}
								</div>
							</div>

						
						
						</div>
    						<div className="row">
							
							<div className="col-md-6">
								<div className="form-group">
								  	<label>Email</label>
                                      <h3>
                                          {raw.email}
                                      </h3>
								  	{/* <input type="text" className="form-control" value={raw.email} /> */}
								</div>
							</div>

						
						
						</div>
                      
						
				</div>
				</div>
			</div>
		</div>
	</section>
            
           </>
            
           
        )

    }
    
}