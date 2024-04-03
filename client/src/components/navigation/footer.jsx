import React from "react";
import { ContactMail,Timelapse,Phone,Email} from "@mui/icons-material";


const Footer = () =>{
    return(
       <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    WAVES
                </div> 
                <div className="wrapper">
                    <div className="left">
                        <h2> Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <ContactMail/>
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Some street 222</div>
                                </div>
                            </div>
                            <div className="tag">
                                <Timelapse/>
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>2782782849</div>
                                </div>
                            </div>
                            <div className="tag">
                                <Phone/>
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>Always closed</div>
                                </div>
                            </div>
                            <div className="tag">
                                <Email/>
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>francis@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2> Be the first to know</h2>
                        <div>
                            <div>
                                Lorem ipsum  dolor sit amet, consectetur adipiscing elit. 
                                Donec in velit nec lorem tempus commodo. Proin necvelit nec lorem tempus commodo. 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </footer>
    )
}
export default Footer;